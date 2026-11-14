import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { getRoadmap, hoursOf, roadmaps, topicIdsOf } from '../data/roadmaps';
import { topics } from '../data/topics';
import { DIAGRAM_IDS } from '../data/topicIcons';
import { useProgress } from '../hooks/useProgress';
import { estimateFinish, usePlan } from '../hooks/usePlan';
import { Checkbox, ProgressBar } from '../components/Bits';
import LessonDrawer from '../components/LessonDrawer';
import { ArrowLeft, ArrowRight, Check } from '../components/Icons';
import { CountUp } from '../components/Motion';
import RoleArt from '../components/RoleArt';
import { Glyph, StepArt } from '../components/Art';
import { TopicIcon } from '../components/TechLogo';
import { ProgressRing, RoadmapCelebration, StageCelebration, StageMedal, Trophy, useCelebrated } from '../components/Rewards';
import NotFound from './NotFound';

type Celebration = { kind: 'stage'; stage: number } | { kind: 'roadmap' } | null;

/* the two AI paths are easy to confuse, so both pages explain the difference side by side */
const AI_PATHS = [
  {
    id: 'ai',
    motto: 'Make AI smart',
    points: ['Learn how models learn: math, machine learning, PyTorch', 'Build LLM features, chatbots and “chat with your docs” (RAG)', 'Great if you like data, research or ML roles'],
  },
  {
    id: 'agents',
    motto: 'Make AI do things',
    points: ['Use existing models (Claude, GPT, Gemini), no training needed', 'Give them tools with MCP, build agent loops, keep them safe', 'Great if you want the newest, fastest-growing area'],
  },
];

function AiCompare({ current }: { current: string }) {
  const paths = AI_PATHS.map((p) => ({ ...p, rm: getRoadmap(p.id)! }));
  const [a, b] = paths.map((p) => new Set(topicIdsOf(p.rm)));
  const shared = [...a].filter((t) => b.has(t)).length;
  return (
    <div className="compare" data-reveal>
      <div className="compare-head">
        <span className="kicker">Not sure which AI path is for you?</span>
        <p className="small muted">They share {shared} lessons, so switching later never costs you progress.</p>
      </div>
      <div className="compare-grid">
        {paths.map((p) => {
          const here = p.id === current;
          return (
            <div key={p.id} className={`compare-col${here ? ' is-here' : ''}`}>
              <div className="compare-top">
                <RoleArt role={p.id} className="compare-art" />
                <div>
                  <span className="compare-motto">{p.motto}</span>
                  <b className="compare-name">{p.rm.title}</b>
                </div>
                {here && <span className="badge compare-here">You’re here</span>}
              </div>
              <ul>
                {p.points.map((pt) => (
                  <li key={pt}>
                    <Check size={13} /> {pt}
                  </li>
                ))}
              </ul>
              {!here && (
                <Link to={`/roadmap/${p.id}`} className="btn btn-ghost compare-go">
                  See the {p.rm.title} roadmap <ArrowRight size={15} />
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const pad = (n: number) => String(n).padStart(2, '0');

export default function RoadmapPage() {
  const { id } = useParams();
  const rm = getRoadmap(id);
  const [params, setParams] = useSearchParams();
  const { isDone, toggle, reset, countDone, setDone } = useProgress();
  const { plan, saved: planSaved } = usePlan();
  const celebrated = useCelebrated();
  const [celebration, setCelebration] = useState<Celebration>(null);
  const journeyRef = useRef<HTMLOListElement>(null);

  // flat, ordered list of lessons with their stage for drawer prev/next
  const order = useMemo(() => {
    if (!rm) return [];
    const seen = new Set<string>();
    const out: { id: string; stage: number }[] = [];
    rm.stages.forEach((s, si) =>
      s.topics.forEach((t) => {
        if (!seen.has(t) && topics[t]) {
          seen.add(t);
          out.push({ id: t, stage: si });
        }
      }),
    );
    return out;
  }, [rm]);

  const openId = params.get('lesson');
  const setLesson = useCallback(
    (lessonId: string | null) => {
      const next = new URLSearchParams(params);
      if (lessonId) next.set('lesson', lessonId);
      else next.delete('lesson');
      setParams(next, { replace: true });
    },
    [params, setParams],
  );
  const closeLesson = useCallback(() => setLesson(null), [setLesson]);
  const closeCelebration = useCallback(() => setCelebration(null), []);

  // first stage that isn't finished yet = "you are here"
  const currentStage = rm ? rm.stages.findIndex((s) => s.topics.some((t) => topics[t] && !isDone(t))) : -1;

  // keep the current stop visible in the journey strip on small screens
  useEffect(() => {
    const el = journeyRef.current?.querySelector<HTMLElement>('.journey-stop.is-current');
    const strip = journeyRef.current?.parentElement;
    if (el && strip && strip.scrollWidth > strip.clientWidth) {
      strip.scrollLeft = el.offsetLeft - strip.clientWidth / 2 + el.offsetWidth / 2;
    }
  }, [currentStage]);

  if (!rm) return <NotFound />;

  const ids = topicIdsOf(rm);
  const done = countDone(ids);
  const pct = ids.length ? done / ids.length : 0;
  const nextUp = ids.find((t) => !isDone(t));
  const onboarded = isDone('how-to-learn');
  const remainingHours = ids.filter((t) => !isDone(t)).reduce((s, t) => s + topics[t].hours, 0);
  const est = estimateFinish(remainingHours * 1.6, plan.hours);
  const stageIds = rm.stages.map((s) => s.topics.filter((t) => topics[t]));
  const stageEarned = stageIds.map((s) => s.every((t) => isDone(t)));

  const openIndex = order.findIndex((o) => o.id === openId);
  const open = openIndex >= 0 ? order[openIndex] : null;

  /**
   * Toggle a lesson; if this tick finishes a stage or the whole roadmap, celebrate (once per stage/roadmap).
   * Computed from the state *before* the toggle, so celebrations only follow the learner's own action.
   */
  const completeLesson = (tid: string) => {
    const willBeDone = !isDone(tid);
    toggle(tid);
    if (!willBeDone) return;
    const doneAfter = (t: string) => t === tid || isDone(t);
    const allKey = `${rm.id}:all`;
    if (ids.every(doneAfter)) {
      if (!celebrated.has(allKey)) {
        celebrated.mark(allKey);
        stageIds.forEach((_, si) => celebrated.mark(`${rm.id}:${si}`));
        setCelebration({ kind: 'roadmap' });
      }
      return;
    }
    const si = stageIds.findIndex((s) => s.includes(tid) && s.every(doneAfter));
    if (si >= 0 && !celebrated.has(`${rm.id}:${si}`)) {
      celebrated.mark(`${rm.id}:${si}`);
      setCelebration({ kind: 'stage', stage: si });
    }
  };

  const scrollToStage = (si: number) =>
    document.getElementById(`stage-${si}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const startStage = (si: number) => {
    setCelebration(null);
    scrollToStage(si);
    const first = stageIds[si]?.find((t) => !isDone(t)) ?? stageIds[si]?.[0];
    if (first) setTimeout(() => setLesson(first), 450);
  };

  const onReset = () => {
    if (window.confirm(`Reset all progress for ${rm.title}? Lessons shared with other roadmaps will also be unchecked.`)) {
      reset(ids);
    }
  };

  // roadmaps the learner could take next, ordered by the head start shared lessons give them
  const others = roadmaps
    .filter((r) => r.id !== rm.id)
    .map((r) => {
      const rIds = topicIdsOf(r);
      return { id: r.id, title: r.title, pct: rIds.length ? countDone(rIds) / rIds.length : 0 };
    })
    .sort((a, b) => b.pct - a.pct)
    .slice(0, 3);

  return (
    <>
      <section className="rm-hero">
        <div className="container">
          <Link to="/" className="crumb mono small rise">
            <ArrowLeft size={14} /> All roadmaps
          </Link>
          <div className="rm-hero-grid">
            <div className="rise rise-1">
              <RoleArt role={rm.id} className="rm-hero-art" />
              <h1 className="rm-title">{rm.title}</h1>
              <p className="rm-lead">{rm.role}</p>
              <div className="meta-row">
                {rm.hot && (
                  <span className="chip chip-good" title={rm.hot.note}>
                    <Glyph name="bolt" size={12} /> In demand
                  </span>
                )}
                <span className="chip">{rm.level}</span>
                <span className="chip">{rm.duration}</span>
                <span className="chip">{rm.stages.length} stages</span>
                <span className="chip">~{hoursOf(rm)} hours</span>
              </div>
              <ul className="outcomes">
                {rm.outcomes.map((o) => (
                  <li key={o}>
                    <Check size={15} /> {o}
                  </li>
                ))}
              </ul>
              <Link to={`/stack/${rm.id}`} className="rm-stack-link small">
                See the tech stack companies hire for <ArrowRight size={14} />
              </Link>
            </div>

            <aside className="progress-card rise rise-2">
              <span className="kicker">Your progress</span>
              <div className="big-pct">
                <CountUp value={Math.round(pct * 100)} duration={1100} />
                <span>%</span>
              </div>
              <ProgressBar value={pct} label={`${rm.title} progress`} />
              <p className="small muted">
                {done} of {ids.length} lessons completed
              </p>
              <div className="hero-medals" aria-label={`${stageEarned.filter(Boolean).length} of ${rm.stages.length} stage badges earned`}>
                {rm.stages.map((s, si) => (
                  <span key={s.title} title={`Stage ${si + 1}: ${s.title}${stageEarned[si] ? ' (earned)' : ''}`}>
                    <StageMedal n={si + 1} earned={stageEarned[si]} size={26} />
                  </span>
                ))}
              </div>
              {nextUp && planSaved && (
                <p className="small muted plan-line">
                  At <b>{plan.hours}h/week</b>: about {est.weeks} weeks left · finish around <b>{est.date}</b>{' '}
                  <Link to="/learn?step=5" className="inline-link">edit</Link>
                </p>
              )}
              {!onboarded ? (
                <Link to="/learn" className="btn btn-primary full">
                  Start with the quick start · 10 min <ArrowRight size={16} />
                </Link>
              ) : nextUp ? (
                <button className="btn btn-primary full" onClick={() => setLesson(nextUp)}>
                  {done === 0 ? 'Start' : 'Continue'}: {topics[nextUp].title} <ArrowRight size={16} />
                </button>
              ) : (
                <button className="complete-note" onClick={() => setCelebration({ kind: 'roadmap' })}>
                  <Trophy size={28} /> Roadmap complete. See your trophy
                </button>
              )}
              {done > 0 && (
                <button className="link-btn small" onClick={onReset}>
                  Reset progress
                </button>
              )}
            </aside>
          </div>
        </div>
      </section>

      {/* journey map: the whole path at a glance */}
      <section className="journey-section">
        <div className="container">
          <div className="journey-scroll">
            <ol className="journey" ref={journeyRef} style={{ '--n': rm.stages.length, '--fill': pct } as CSSProperties}>
              {rm.stages.map((s, si) => {
                const current = si === currentStage;
                return (
                  <li key={s.title} className={`journey-stop${stageEarned[si] ? ' is-earned' : ''}${current ? ' is-current' : ''}`}>
                    <button
                      onClick={() => scrollToStage(si)}
                      aria-label={`Stage ${si + 1}: ${s.title}${stageEarned[si] ? ', complete' : current ? ', you are here' : ''}`}
                    >
                      <span className="journey-medal">
                        <StageMedal n={si + 1} earned={stageEarned[si]} size={44} />
                      </span>
                      {current && <span className="journey-here">You are here</span>}
                      <span className="journey-label">{s.title}</span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      <section className="section stages-section">
        <div className="container">
          {(rm.id === 'ai' || rm.id === 'agents') && <AiCompare current={rm.id} />}
          {!onboarded && (
            <div className="gate">
              <span className="gate-badge" aria-hidden>
                <Glyph name="bolt" size={22} />
              </span>
              <div className="gate-text">
                <h2>New here? Start with the 10-minute quick start</h2>
                <p className="muted">
                  Learn the simple study method this roadmap is built on, and get your personal finish date.
                </p>
              </div>
              <div className="gate-actions">
                <Link to="/learn" className="btn btn-primary">
                  Show me how <ArrowRight size={16} />
                </Link>
                <button className="link-btn small" onClick={() => setDone('how-to-learn', true)}>
                  Skip, I already know how to study
                </button>
              </div>
            </div>
          )}

          <div className={`stages${onboarded ? '' : ' timeline-locked'}`} aria-disabled={!onboarded}>
            {rm.stages.map((stage, si) => {
              const sIds = stageIds[si];
              const sDone = countDone(sIds);
              const sHours = sIds.reduce((h, t) => h + topics[t].hours, 0);
              const status = stageEarned[si] ? 'done' : sDone > 0 ? 'active' : 'todo';
              return (
                <section key={stage.title} id={`stage-${si}`} className={`stage-block stage-${status}`} data-reveal>
                  <header className="stage-block-head">
                    <StageMedal n={si + 1} earned={stageEarned[si]} size={64} />
                    <div className="stage-block-titles">
                      <span className="kicker">
                        Stage {pad(si + 1)} · {sIds.length} lessons · ~{sHours}h
                      </span>
                      <h2>{stage.title}</h2>
                      <p className="muted">{stage.summary}</p>
                    </div>
                    <ProgressRing value={sDone} total={sIds.length} />
                  </header>

                  <ul className="lesson-grid">
                    {sIds.map((tid) => {
                      const t = topics[tid];
                      const d = isDone(tid);
                      return (
                        <li key={tid} className={`lesson-tile${d ? ' is-done' : ''}`} data-topic={tid}>
                          <button className="lesson-open" onClick={() => setLesson(tid)}>
                            <TopicIcon id={tid} />
                            <span className="lesson-text">
                              <b>{t.title}</b>
                              <span className="mono lesson-meta">
                                ~{t.hours}h · {t.resources.length} resources
                                {DIAGRAM_IDS.has(tid) && <span className="lesson-pic"> · with diagram</span>}
                              </span>
                            </span>
                          </button>
                          <Checkbox checked={d} onChange={() => completeLesson(tid)} label={`Mark ${t.title} complete`} />
                        </li>
                      );
                    })}
                  </ul>

                  {stage.project && (
                    <div className="stage-project">
                      <StepArt step={2} />
                      <div>
                        <span className="kicker">Stage project</span>
                        <p className="stage-project-brief">{stage.project}</p>
                        <p className="small muted">
                          {stageEarned[si] ? (
                            <>
                              <Check size={13} /> {stage.title} badge earned
                            </>
                          ) : (
                            <>Finish every lesson above to earn the {stage.title} badge.</>
                          )}
                        </p>
                      </div>
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        </div>
      </section>

      {open && (
        <LessonDrawer
          topic={topics[open.id]}
          stageLabel={`Stage ${pad(open.stage + 1)}`}
          position={openIndex + 1}
          total={order.length}
          done={isDone(open.id)}
          onToggle={() => completeLesson(open.id)}
          onClose={closeLesson}
          onPrev={openIndex > 0 ? () => setLesson(order[openIndex - 1].id) : undefined}
          onNext={openIndex < order.length - 1 ? () => setLesson(order[openIndex + 1].id) : undefined}
        />
      )}

      {celebration?.kind === 'stage' && (
        <StageCelebration
          stageNumber={celebration.stage + 1}
          stageTitle={rm.stages[celebration.stage].title}
          roadmapTitle={rm.title}
          pct={pct}
          nextTitle={rm.stages[celebration.stage + 1]?.title}
          onNext={rm.stages[celebration.stage + 1] ? () => startStage(celebration.stage + 1) : undefined}
          onClose={closeCelebration}
        />
      )}
      {celebration?.kind === 'roadmap' && (
        <RoadmapCelebration
          roadmapTitle={rm.title}
          stages={rm.stages.length}
          lessons={ids.length}
          hours={hoursOf(rm)}
          projects={rm.stages.filter((s) => s.project).length}
          others={others}
          onClose={closeCelebration}
        />
      )}
    </>
  );
}
