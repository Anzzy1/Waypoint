import { useCallback, useEffect, useState, type CSSProperties } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useProgress } from '../hooks/useProgress';
import { estimateFinish, usePlan } from '../hooks/usePlan';
import { roadmaps, topicIdsOf } from '../data/roadmaps';
import { topics } from '../data/topics';
import { AI_PROMPTS, AI_RULES, DONE_CHECKS, HABITS, LESSON_RECIPE, LOOP, QUIZ } from '../data/method';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Close, Hammer, Play } from '../components/Icons';
import { Glyph, type GlyphKey } from '../components/Art';
import LearnArt, { useReducedMotion } from '../components/LearnArt';

const STEPS: { title: string; sub: string; glyph: GlyphKey; tldr: string }[] = [
  { title: 'Welcome', sub: 'What this is', glyph: 'compass', tldr: 'Ten minutes now saves you months of studying the wrong way.' },
  { title: 'Study traps', sub: 'Spot what slows you', glyph: 'eye', tldr: 'Some habits feel productive but don’t build skill. Find yours.' },
  { title: 'The loop', sub: 'A 5-step method', glyph: 'refresh', tldr: 'Learn a little, then spend most of your time using it.' },
  { title: 'One lesson', sub: 'A study session', glyph: 'checklist', tldr: 'Every lesson follows the same short recipe. About 2 hours.' },
  { title: 'Using AI', sub: 'Tutor, not autopilot', glyph: 'chat', tldr: 'Let AI explain and quiz you. Don’t let it think for you.' },
  { title: 'Your plan', sub: 'Hours & finish date', glyph: 'gauge', tldr: 'Pick one path and a weekly rhythm you can actually keep.' },
  { title: 'Quick check', sub: '4 short questions', glyph: 'sparkle', tldr: 'Answer all four correctly to unlock your roadmap.' },
];

const WHY = [
  { g: 'eye' as GlyphKey, t: 'Recall beats re-reading', d: 'Pulling it out of your head is what makes it stick.' },
  { g: 'bolt' as GlyphKey, t: 'Struggle is the practice', d: 'Problems slightly beyond you are how skills grow.' },
  { g: 'speech' as GlyphKey, t: 'Explaining shows the gaps', d: 'The “I get it” feeling hides them. Teaching doesn’t.' },
  { g: 'refresh' as GlyphKey, t: 'Spacing beats cramming', d: 'Short reviews over days stop you forgetting.' },
];

/** How far the learner has got through the quick start (steps finished with "Next"). Saved in the browser. */
const REACHED_KEY = 'waypoint.quickstartReached.v1';
// answers to the trap game and the loop steps already opened, so coming back shows results instead of a blank game
const TRAPS_KEY = 'waypoint.quickstartTraps.v1';
function readJSON<T>(key: string, ok: (v: unknown) => v is T, fallback: T): T {
  try {
    const v = JSON.parse(localStorage.getItem(key) || 'null');
    return ok(v) ? v : fallback;
  } catch {
    return fallback;
  }
}
function writeJSON(key: string, v: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(v));
  } catch {
    /* storage blocked: the game still works, it just won't be remembered */
  }
}
function readReached() {
  try {
    const n = Number(localStorage.getItem(REACHED_KEY));
    return Number.isFinite(n) && n > 0 ? Math.min(n, STEPS.length) : 0;
  } catch {
    return 0;
  }
}

const DONE_ICONS = [<Hammer size={20} key="h" />, <Glyph name="speech" size={20} key="s" />, <Glyph name="checklist" size={20} key="c" />];

function Video({ id, title, by }: { id: string; title: string; by: string }) {
  return (
    <a className="mini-video" href={`https://www.youtube.com/watch?v=${id}`} target="_blank" rel="noreferrer">
      <span className="mini-thumb">
        <img src={`https://i.ytimg.com/vi/${id}/mqdefault.jpg`} alt="" loading="lazy" />
        <span className="video-play"><Play size={14} /></span>
      </span>
      <span className="mini-text">
        <span className="mono small faint">Optional video · {by}</span>
        <b>{title}</b>
      </span>
      <ArrowUpRight size={16} className="res-arrow" />
    </a>
  );
}

/* ---------- Step 1: study-trap card game ---------- */
function TrapGame({ onReady }: { onReady: (ready: boolean) => void }) {
  const total = HABITS.length;
  const [answers, setAnswers] = useState<Record<number, boolean>>(() => {
    const saved = readJSON(TRAPS_KEY, (v): v is Record<string, boolean> => !!v && typeof v === 'object' && !Array.isArray(v), {});
    const clean: Record<number, boolean> = {};
    for (const [k, v] of Object.entries(saved)) if (Number(k) < total && typeof v === 'boolean') clean[Number(k)] = v;
    return clean;
  });
  // every trap answered last time: open straight on the results
  const [idx, setIdx] = useState(() => {
    const open = HABITS.findIndex((_, i) => !(i in answers));
    return open === -1 ? total : open;
  });
  useEffect(() => writeJSON(TRAPS_KEY, answers), [answers]);
  // first trap not answered yet: you can't jump past it, so every card gets read
  const firstOpen = HABITS.findIndex((_, i) => !(i in answers));
  const finished = idx >= total && firstOpen === -1;
  const mine = HABITS.map((h, i) => ({ ...h, i })).filter((h) => answers[h.i]);

  // Next unlocks only once all 8 are answered (and locks again on "Play again")
  useEffect(() => onReady(finished), [finished, onReady]);

  if (finished) {
    return (
      <div className="trap-summary">
        <div className="trap-score">
          <span className="trap-score-num">{mine.length}<small>/{total}</small></span>
          <div>
            <b>{mine.length === 0 ? 'No traps. Nice!' : mine.length <= 2 ? 'Only a couple. Easy fixes.' : 'Very normal. All of these are fixable.'}</b>
            <p className="muted small">
              {mine.length === 0 ? 'Here are all eight anyway, so you can spot them later.' : 'Here’s what to do instead. The next steps show you how.'}
            </p>
          </div>
        </div>
        <ul className="fix-list">
          {(mine.length ? mine : HABITS.map((h, i) => ({ ...h, i }))).map((h, n) => (
            <li key={h.i} style={{ '--i': n } as CSSProperties}>
              <span className="fix-tag mono">{h.name}</span>
              <p>{h.fix}</p>
            </li>
          ))}
        </ul>
        <button className="link-btn small" onClick={() => { setIdx(0); setAnswers({}); }}>
          ↺ Play again
        </button>
      </div>
    );
  }

  const h = HABITS[idx];
  const answered = idx in answers;
  const answer = (yes: boolean) => setAnswers((a) => ({ ...a, [idx]: yes }));

  return (
    <div className="trap-game">
      <div className="trap-dots" aria-label={`Trap ${idx + 1} of ${total}`}>
        {HABITS.map((_, i) => (
          <button
            key={i}
            className={`trap-dot${i === idx ? ' now' : ''}${i in answers ? (answers[i] ? ' yes' : ' no') : ''}`}
            onClick={() => setIdx(i)}
            disabled={i !== idx && !(i in answers) && i !== firstOpen}
            aria-label={`Trap ${i + 1}`}
          />
        ))}
      </div>

      <div className="trap-card" key={idx}>
        <span className="trap-count mono">Trap {idx + 1} of {total}</span>
        <span className="trap-name">{h.name}</span>
        <p className="trap-quote">“{h.bad}”</p>

        {!answered ? (
          <div className="trap-ask">
            <span className="muted small">Do you do this?</span>
            <div className="trap-btns">
              <button className="btn btn-ghost trap-yes" onClick={() => answer(true)}>
                <Check size={16} /> Yes, that’s me
              </button>
              <button className="btn btn-ghost trap-no" onClick={() => answer(false)}>
                <Close size={16} /> No, not me
              </button>
            </div>
          </div>
        ) : (
          <div className="trap-fix">
            <span className="trap-fix-head">
              <span className="trap-fix-icon"><Check size={13} /></span>
              {answers[idx] ? 'Here’s the fix' : 'Good. Keep doing the opposite'}
            </span>
            <p>{h.fix}</p>
            <button className="btn btn-primary trap-next" onClick={() => setIdx(firstOpen === -1 ? total : firstOpen)}>
              {firstOpen === -1 ? 'See my results' : 'Next trap'} <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- Step 2: learning-loop wheel ---------- */
const RING = 2 * Math.PI * 40;

function LoopWheel() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(!reduced);
  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => setActive((a) => (a + 1) % LOOP.length), 3800);
    return () => clearInterval(t);
  }, [auto]);

  const pick = (i: number) => {
    setAuto(false);
    setActive(i);
  };
  const s = LOOP[active];

  return (
    <div className="wheel-wrap">
      <div className="wheel">
        <svg viewBox="0 0 100 100" className="wheel-ring" aria-hidden>
          <circle cx="50" cy="50" r="40" className="wheel-track" />
          <circle
            cx="50"
            cy="50"
            r="40"
            className="wheel-progress"
            transform="rotate(-90 50 50)"
            style={{ strokeDasharray: `${((active + 1) / LOOP.length) * RING} ${RING}` }}
          />
          <g className="wheel-orbit">
            <circle cx="50" cy="10" r="1.6" className="wheel-orbit-dot" />
          </g>
        </svg>
        <div className="wheel-center">
          <Glyph name="refresh" size={22} />
          <span className="mono small">repeat for<br />every topic</span>
        </div>
        {LOOP.map((l, i) => {
          const a = ((-90 + i * 72) * Math.PI) / 180;
          return (
            <button
              key={l.t}
              className={`wheel-node${i === active ? ' on' : ''}${i < active ? ' past' : ''}`}
              style={{ left: `${50 + 40 * Math.cos(a)}%`, top: `${50 + 40 * Math.sin(a)}%` }}
              onClick={() => pick(i)}
              aria-pressed={i === active}
            >
              <span className="mono">{i + 1}</span> {l.short}
            </button>
          );
        })}
      </div>

      <div className="wheel-detail" key={active} aria-live="polite">
        <span className="kicker">Step {active + 1} of 5</span>
        <h3>{s.t}</h3>
        <p className="muted">{s.d}</p>
        <div className="wheel-detail-nav">
          <button className="icon-btn" onClick={() => pick((active + 4) % 5)} aria-label="Previous step"><ArrowLeft size={16} /></button>
          <button className="icon-btn" onClick={() => pick((active + 1) % 5)} aria-label="Next step"><ArrowRight size={16} /></button>
          {auto && <span className="mono small faint">auto-playing · tap a step</span>}
        </div>
      </div>
    </div>
  );
}

/* ---------- Step 4: prompt with copy button ---------- */
function PromptCard({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard blocked: the text is still selectable */
    }
  };
  return (
    <li className="prompt">
      <p className="mono">{text}</p>
      <button className={`prompt-copy${copied ? ' done' : ''}`} onClick={copy}>
        {copied ? <><Check size={12} /> Copied</> : 'Copy'}
      </button>
    </li>
  );
}

export default function Learn() {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const { isDone, setDone, countDone } = useProgress();
  const { plan, update } = usePlan();

  const alreadyDone = isDone('how-to-learn');
  // steps are ticked only once they're finished with "Next"; later steps stay locked until then
  const [reachedRaw, setReached] = useState(readReached);
  const reached = alreadyDone ? STEPS.length : reachedRaw;
  const maxOpen = Math.min(reached, STEPS.length - 1);
  const step = Math.min(Math.max(Number(params.get('step')) || 0, 0), maxOpen);
  const go = (n: number) => {
    setParams({ step: String(n) });
    window.scrollTo({ top: 0 });
  };
  const next = () => {
    const r = Math.max(reachedRaw, step + 1);
    setReached(r);
    try {
      localStorage.setItem(REACHED_KEY, String(r));
    } catch {
      /* ignore */
    }
    go(step + 1);
  };

  // steps with questions to answer (the trap game) keep Next locked until they're done;
  // read-only steps like the loop wheel don't
  const TASK: Record<number, string> = { 1: 'Answer all 8 traps first' };
  const [readySteps, setReadySteps] = useState<number[]>([]);
  const setReady = useCallback(
    (ready: boolean) => setReadySteps((v) => (ready ? (v.includes(step) ? v : [...v, step]) : v.filter((x) => x !== step))),
    [step],
  );
  // always finish the activity on screen first, even when coming back to a step
  const canNext = !(step in TASK) || readySteps.includes(step);

  const [answers, setAnswers] = useState<Record<number, number>>({});
  const correct = QUIZ.filter((q, i) => answers[i] === q.answer).length;
  const quizPassed = correct === QUIZ.length;

  // plan estimate
  const rm = roadmaps.find((r) => r.id === plan.roadmap) ?? roadmaps[0];
  const ids = topicIdsOf(rm);
  const remaining = ids.filter((t) => !isDone(t)).reduce((s, t) => s + (topics[t]?.hours ?? 0), 0);
  // projects and review take roughly as long as the lessons themselves
  const est = estimateFinish(remaining * 1.6, plan.hours);
  const perDay = Math.round((plan.hours / 6) * 60);

  const finish = () => {
    setDone('how-to-learn', true);
    navigate(`/roadmap/${rm.id}`);
  };

  const meta = STEPS[step];
  const recipeMins = LESSON_RECIPE.filter((r) => r.min > 0);
  const totalMins = recipeMins.reduce((s, r) => s + r.min, 0);

  return (
    <section className="onboard">
      <div className="container onboard-grid">
        {/* sidebar: every step at a glance (desktop) */}
        <aside className="ob-side" aria-label="Quick start steps">
          <div className="ob-side-head">
            <span className="kicker">Quick start · 10 min</span>
            <div className="ob-side-bar"><span style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} /></div>
          </div>
          <ol className="ob-steps">
            {STEPS.map((s, i) => (
              <li key={s.title}>
                <button
                  className={`ob-step${i === step ? ' now' : ''}${i < reached && i !== step ? ' past' : ''}${i > maxOpen ? ' locked' : ''}`}
                  onClick={() => go(i)}
                  disabled={i > maxOpen}
                  aria-current={i === step ? 'step' : undefined}
                  title={i > maxOpen ? 'Finish the steps before this one first' : undefined}
                >
                  <span className="ob-step-icon">
                    {i < reached && i !== step ? <Check size={14} /> : i > maxOpen ? <Glyph name="lock" size={14} /> : <Glyph name={s.glyph} size={16} />}
                  </span>
                  <span className="ob-step-text">
                    <b>{s.title}</b>
                    <span>{i < reached && i !== step ? 'Done' : i > maxOpen ? 'Locked' : s.sub}</span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </aside>

        <div className="ob-main">
          {/* compact progress (phones and tablets) */}
          <div className="ob-mobile-steps">
            <div className="ob-mobile-top">
              <span className="kicker">Step {step + 1} of {STEPS.length}</span>
              <span className="mono small faint">~10 min</span>
            </div>
            <div className="ob-mobile-bars">
              {STEPS.map((s, i) => (
                <button
                  key={s.title}
                  className={i === step ? 'now' : i < reached ? 'past' : ''}
                  onClick={() => go(i)}
                  disabled={i > maxOpen}
                  aria-label={`Go to step ${i + 1}: ${s.title}${i > maxOpen ? ' (locked)' : ''}`}
                />
              ))}
            </div>
          </div>

          <article className="onboard-card" key={step}>
            <header className="ob-head">
              <div className="ob-head-text">
                <span className="ob-chip"><Glyph name={meta.glyph} size={14} /> {meta.title}</span>
                <h1 className="ob-title">
                  {[
                    'Learn how to learn, in 10 minutes',
                    'Spot your study traps',
                    'The Learning Loop',
                    'How to study one lesson',
                    'Use AI as a tutor, not an autopilot',
                    'Make your plan',
                    'Quick check',
                  ][step]}
                </h1>
                <p className="ob-tldr"><span className="mono">In short</span>{meta.tldr}</p>
              </div>
              <div className="ob-head-art"><LearnArt step={step} /></div>
            </header>

            {/* 0 · Welcome */}
            {step === 0 && (
              <>
                <p className="ob-lead">
                  Most people whose progress stalls don’t lack talent. They study in a way that <em>feels</em> productive
                  but doesn’t build skill. Here’s what we’ll do together:
                </p>
                <div className="ob-grid">
                  {[
                    { t: 'Spot your traps', d: 'A quick yes/no game about your study habits.', time: '2 min', g: 'eye' as GlyphKey },
                    { t: 'Learn the method', d: 'The 5-step loop and how to study one lesson.', time: '4 min', g: 'refresh' as GlyphKey },
                    { t: 'Make a plan', d: 'Choose a path, set your hours, see your finish date.', time: '3 min', g: 'gauge' as GlyphKey },
                  ].map((c, i) => (
                    // a preview of what's ahead, not a shortcut: learners go through the steps in order
                    <div key={c.t} className="ob-mini" style={{ '--i': i } as CSSProperties}>
                      <span className="ob-mini-top">
                        <span className="ob-mini-icon"><Glyph name={c.g} size={18} /></span>
                        <span className="mono small faint">Part {i + 1} · {c.time}</span>
                      </span>
                      <b>{c.t}</b>
                      <span className="muted small">{c.d}</span>
                    </div>
                  ))}
                </div>
                <Video id="O96fE1E-rf8" title="Learning How to Learn" by="Barbara Oakley · TEDx" />
                {alreadyDone && (
                  <p className="ob-note">
                    <Check size={14} /> You’ve already finished the quick start. Go through it again anytime.
                  </p>
                )}
              </>
            )}

            {/* 1 · Study traps */}
            {step === 1 && (
              <>
                <p className="ob-lead">
                  We’ll show you 8 common habits. For each one, just answer <b>yes</b> or <b>no</b>. Then you’ll see the
                  better way to do it. Nobody else sees your answers.
                </p>
                <TrapGame onReady={setReady} />
              </>
            )}

            {/* 2 · The loop */}
            {step === 2 && (
              <>
                <p className="ob-lead">For every topic, go round these 5 steps. Tap a step to read what it means.</p>
                <LoopWheel />
                <div className="split">
                  <div className="split-bar">
                    <span className="split-in">20%<small>take it in</small></span>
                    <span className="split-do">80%<small>use it</small></span>
                  </div>
                  <p className="muted small">Watching and reading is the small part. Building, debugging and explaining is the big part.</p>
                </div>
                <div className="why-grid">
                  {WHY.map((w, i) => (
                    <div key={w.t} className="why-card" style={{ '--i': i } as CSSProperties}>
                      <span className="why-icon"><Glyph name={w.g} size={18} /></span>
                      <b>{w.t}</b>
                      <span className="muted small">{w.d}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* 3 · One lesson */}
            {step === 3 && (
              <>
                <p className="ob-lead">Do this with every lesson on the site. One lesson takes one or two evenings.</p>
                <div className="time-bar" aria-hidden>
                  {recipeMins.map((r, i) => (
                    <span key={r.t} className={`time-seg seg-${i}`} style={{ flexGrow: r.min, '--i': i } as CSSProperties}>
                      <small className="mono">{r.min}m</small>
                    </span>
                  ))}
                </div>
                <p className="mono small faint time-total">≈ {Math.round(totalMins / 6) / 10} hours of focused work</p>
                <ol className="recipe">
                  {LESSON_RECIPE.map((r, i) => (
                    <li key={r.t} style={{ '--i': i } as CSSProperties} className={r.min === 0 ? 'last' : `seg-${i}`}>
                      <span className="recipe-node mono">{r.min === 0 ? <Check size={14} /> : i + 1}</span>
                      <div className="recipe-body">
                        <div className="recipe-top">
                          <b>{r.t}</b>
                          <span className="recipe-time mono">{r.time}</span>
                        </div>
                        <p className="muted small">{r.d}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                <div className="done-box">
                  <span className="kicker">The finish line · a lesson is done only when</span>
                  <ul className="done-cards">
                    {DONE_CHECKS.map((c, i) => (
                      <li key={c}>
                        <span className="done-icon">{DONE_ICONS[i]}</span>
                        {c}
                      </li>
                    ))}
                  </ul>
                  <p className="small muted">Every lesson panel asks you to tick these three before you can mark it complete.</p>
                </div>
              </>
            )}

            {/* 4 · AI */}
            {step === 4 && (
              <>
                <div className="study-note">
                  <span className="kicker">What research found · Anthropic, 2026</span>
                  <p>
                    Learners who let AI write the code <b>remembered less</b>. Learners who used AI to <b>understand</b>{' '}
                    the code remembered far more.
                  </p>
                  <a className="inline-link small" href="https://www.anthropic.com/research/AI-assistance-coding-skills" target="_blank" rel="noreferrer">
                    Read the study <ArrowUpRight size={12} />
                  </a>
                </div>
                <div className="ai-grid">
                  {[true, false].map((ok) => (
                    <div key={String(ok)} className={`ai-col ${ok ? 'ok' : 'no'}`}>
                      <span className="ai-col-head">
                        <span className="ai-icon">{ok ? <Check size={13} /> : <Close size={13} />}</span>
                        {ok ? 'Do' : 'Don’t'}
                      </span>
                      <ul>
                        {AI_RULES.filter((r) => r.ok === ok).map((r) => (
                          <li key={r.t}>{r.t}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="prompts-block">
                  <span className="kicker">Prompts you can copy</span>
                  <ul className="prompts">
                    {AI_PROMPTS.map((p) => <PromptCard key={p} text={p} />)}
                  </ul>
                </div>
                <Video id="HTUh0OO6Kmo" title="What AI does to the minds of novice coders" by="JetBrains Academy" />
              </>
            )}

            {/* 5 · Plan */}
            {step === 5 && (
              <>
                <div className="plan-block">
                  <span className="plan-q"><span className="plan-q-num mono">1</span> Pick ONE path and stick with it</span>
                  <div className="plan-roadmaps" role="radiogroup" aria-label="Choose a roadmap">
                    {roadmaps.map((r) => {
                      const rIds = topicIdsOf(r);
                      const d = countDone(rIds);
                      const on = plan.roadmap === r.id;
                      return (
                        <button
                          key={r.id}
                          role="radio"
                          aria-checked={on}
                          className={`plan-option${on ? ' on' : ''}`}
                          onClick={() => update({ roadmap: r.id })}
                        >
                          <span className="plan-radio">{on && <Check size={11} />}</span>
                          <span className="plan-option-text">
                            <b>{r.title}</b>
                            <span className="small muted">{d > 0 ? `${d}/${rIds.length} done` : r.duration}</span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="plan-block">
                  <label className="hours">
                    <span className="hours-top">
                      <span className="plan-q"><span className="plan-q-num mono">2</span> Hours per week</span>
                      <span className="hours-val mono">{plan.hours}h</span>
                    </span>
                    <input
                      type="range"
                      min={3}
                      max={30}
                      step={1}
                      value={plan.hours}
                      onChange={(e) => update({ hours: Number(e.target.value) })}
                    />
                    <span className="hours-scale mono small faint">
                      <span>3h casual</span>
                      <span>10h steady</span>
                      <span>30h full-time</span>
                    </span>
                  </label>
                </div>

                <div className="week" aria-label={`About ${perDay} minutes a day, six days a week, one rest day`}>
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d, i) => (
                    <div key={d} className={`week-day${i === 6 ? ' rest' : ''}`}>
                      <span className="week-col">
                        <span className="week-fill" style={{ height: i === 6 ? 0 : `${Math.min(100, (perDay / 300) * 100 + 12)}%`, '--i': i } as CSSProperties} />
                        {i === 6 && <span className="week-zz">zz</span>}
                      </span>
                      <span className="mono small">{d}</span>
                      <span className="mono week-min">{i === 6 ? 'rest' : `${perDay}m`}</span>
                    </div>
                  ))}
                </div>

                <div className="plan-result">
                  <div>
                    <span className="kicker">Estimated finish</span>
                    <div className="plan-date">{est.date}</div>
                    <span className="small muted">~{est.weeks} weeks, including projects and review</span>
                  </div>
                  <div>
                    <span className="kicker">Your rhythm</span>
                    <div className="plan-rhythm">≈ {perDay} min a day</div>
                    <span className="small muted">6 days a week. Rest is part of learning.</span>
                  </div>
                </div>
              </>
            )}

            {/* 6 · Quiz */}
            {step === 6 && (
              <>
                <div className={`quiz-score${quizPassed ? ' passed' : ''}`}>
                  <div className="quiz-score-dots">
                    {QUIZ.map((q, i) => (
                      <span key={q.q} className={answers[i] === undefined ? '' : answers[i] === q.answer ? 'right' : 'wrong'} />
                    ))}
                  </div>
                  <b>{quizPassed ? 'All correct! Your roadmap is unlocked.' : `${correct} of ${QUIZ.length} correct`}</b>
                  {!quizPassed && <span className="small muted">Wrong answer? Just pick another.</span>}
                </div>
                <ol className="quiz">
                  {QUIZ.map((q, qi) => {
                    const picked = answers[qi];
                    return (
                      <li key={q.q} className="quiz-q">
                        <span className="quiz-num mono">Question {qi + 1}</span>
                        <b>{q.q}</b>
                        <div className="quiz-options">
                          {q.options.map((o, oi) => {
                            const state = picked === oi ? (oi === q.answer ? 'right' : 'wrong') : '';
                            return (
                              <button
                                key={o}
                                className={`quiz-opt ${state}`}
                                onClick={() => setAnswers((a) => ({ ...a, [qi]: oi }))}
                                aria-pressed={picked === oi}
                              >
                                <span className="quiz-mark mono">
                                  {state === 'right' ? <Check size={13} /> : state === 'wrong' ? <Close size={13} /> : 'ABC'[oi]}
                                </span>
                                {o}
                              </button>
                            );
                          })}
                        </div>
                        {picked !== undefined && (
                          <p className={`quiz-why ${picked === q.answer ? 'right' : 'wrong'}`}>
                            <b>{picked === q.answer ? 'Correct. ' : 'Not quite. '}</b>
                            {q.why}
                          </p>
                        )}
                      </li>
                    );
                  })}
                </ol>
              </>
            )}
          </article>

          {/* footer nav: sticks to the bottom of the screen */}
          <div className="onboard-foot">
            <button className="btn btn-ghost" onClick={() => go(step - 1)} disabled={step === 0}>
              <ArrowLeft size={16} /> Back
            </button>
            {step < STEPS.length - 1 && <span className="foot-next mono small faint">Next: {STEPS[step + 1].title}</span>}
            {step < STEPS.length - 1 ? (
              <button className="btn btn-primary" onClick={next} disabled={!canNext}>
                {step === 0 ? 'Let’s start' : canNext ? 'Next' : TASK[step]} {canNext && <ArrowRight size={16} />}
              </button>
            ) : (
              <button className="btn btn-primary" onClick={finish} disabled={!quizPassed}>
                {quizPassed ? `Start ${rm.title}` : `Get ${QUIZ.length}/${QUIZ.length} to unlock`} <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
