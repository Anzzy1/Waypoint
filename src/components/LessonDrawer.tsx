import { lazy, Suspense, useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { DONE_CHECKS } from '../data/method';
import { GUIDES, type GuideStep } from '../data/guides';
import type { Resource, ResourceKind, Topic } from '../data/types';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Clock, Close, Hammer, Play } from './Icons';
import { Glyph, type GlyphKey } from './Art';
import { TopicIcon } from './TechLogo';
import CodeWindow from './CodeWindow';
import { notifyLocalChange, onReload } from '../lib/sync';

// diagrams live in their own chunk, loaded the first time a lesson opens
const LessonFigure = lazy(() => import('./diagrams'));

const kindLabel: Record<ResourceKind, string> = {
  video: 'Video',
  docs: 'Docs',
  course: 'Course',
  practice: 'Practice',
  article: 'Article',
  book: 'Book',
};
const kindGlyph: Record<ResourceKind, GlyphKey> = {
  video: 'eye',
  docs: 'checklist',
  course: 'layers',
  practice: 'bolt',
  article: 'speech',
  book: 'checklist',
};
const USE_GLYPHS: GlyphKey[] = ['sparkle', 'bolt', 'layers'];
const DONE_ICONS = [<Hammer size={18} key="h" />, <Glyph name="speech" size={18} key="s" />, <Glyph name="checklist" size={18} key="c" />];

/* ---------- "got it" state per lesson step, saved in the browser ---------- */
const STEPS_KEY = 'waypoint.steps.v1';
function readSteps(): Record<string, number[]> {
  try {
    return JSON.parse(localStorage.getItem(STEPS_KEY) || '{}') ?? {};
  } catch {
    return {};
  }
}
function useStepProgress(topicId: string) {
  const [all, setAll] = useState(readSteps);
  useEffect(() => onReload(() => setAll(readSteps())), []);
  const got = new Set(all[topicId] ?? []);
  const toggle = useCallback(
    (i: number) =>
      setAll((prev) => {
        const cur = new Set(prev[topicId] ?? []);
        if (cur.has(i)) cur.delete(i);
        else cur.add(i);
        const next = { ...prev, [topicId]: [...cur] };
        try {
          localStorage.setItem(STEPS_KEY, JSON.stringify(next));
          notifyLocalChange();
        } catch {
          /* storage blocked: progress just isn't remembered */
        }
        return next;
      }),
    [topicId],
  );
  return { got, toggle };
}

const ytId = (url: string) => url.match(/[?&]v=([\w-]{11})/)?.[1];

function ResourceCard({ r, featured }: { r: Resource; featured?: boolean }) {
  const id = r.kind === 'video' ? ytId(r.url) : undefined;
  return (
    <a className={`lres${featured ? ' lres-featured' : ''}`} href={r.url} target="_blank" rel="noreferrer">
      {id ? (
        <span className="lres-thumb">
          <img src={`https://i.ytimg.com/vi/${id}/mqdefault.jpg`} alt="" loading="lazy" />
          <span className="video-play"><Play size={14} /></span>
        </span>
      ) : (
        <span className={`lres-icon kind-${r.kind}`}>
          {r.kind === 'video' ? <Play size={16} /> : <Glyph name={kindGlyph[r.kind]} size={18} />}
        </span>
      )}
      <span className="lres-text">
        <span className={`kind kind-${r.kind}`}>{kindLabel[r.kind]}</span>
        <b>{r.label}</b>
      </span>
      <ArrowUpRight size={16} className="res-arrow" />
    </a>
  );
}

function Section({ id, title, kicker, children }: { id: string; title: string; kicker: string; children: ReactNode }) {
  return (
    <section className="lsec" id={id}>
      <span className="kicker">{kicker}</span>
      <h2 className="lsec-title">{title}</h2>
      {children}
    </section>
  );
}

interface Props {
  topic: Topic;
  stageLabel: string;
  position: number;
  total: number;
  done: boolean;
  onToggle: () => void;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}

/** Full-screen lesson view (kept under its old name so the roadmap page needs no changes). */
export default function LessonDrawer({ topic, stageLabel, position, total, done, onToggle, onClose, onPrev, onNext }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const guide = GUIDES[topic.id];

  // lock page scroll + close on Escape
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  // the "definition of done" self-check, reset per lesson
  const [checks, setChecks] = useState(() => DONE_CHECKS.map(() => false));
  const allChecked = checks.every(Boolean);

  // when switching lessons, reset scroll, focus and checks
  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0);
    rootRef.current?.focus();
    setChecks(DONE_CHECKS.map(() => false));
  }, [topic.id]);

  const steps: GuideStep[] = guide?.steps ?? topic.points.map((p) => ({ t: p, d: '', try: '' }));
  const { got, toggle } = useStepProgress(topic.id);
  const gotCount = steps.filter((_, i) => got.has(i)).length;

  const videos = topic.resources.filter((r) => r.kind === 'video');
  const reading = topic.resources.filter((r) => r.kind !== 'video');
  const starters = [videos[0], reading[0]].filter(Boolean) as Resource[];
  const more = topic.resources.filter((r) => !starters.includes(r));

  const sections = [
    { id: 'l-overview', label: 'Overview' },
    ...(guide?.example ? [{ id: 'l-see', label: 'See it' }] : []),
    { id: 'l-steps', label: `Step-by-step (${steps.length})` },
    { id: 'l-resources', label: 'Where to learn' },
    ...(guide ? [{ id: 'l-project', label: 'Mini project' }] : []),
    ...(!topic.guide ? [{ id: 'l-finish', label: 'Finish line' }] : []),
  ];

  // highlight the section in view
  const [active, setActive] = useState(sections[0].id);
  useEffect(() => {
    const root = scrollRef.current;
    if (!root || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { root, rootMargin: '0px 0px -60% 0px' },
    );
    root.querySelectorAll('.lsec, .lhero').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [topic.id]);
  const jump = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <div ref={rootRef} tabIndex={-1} className="lesson-root" role="dialog" aria-modal="true" aria-labelledby="lesson-title">
      <header className="lesson-top">
        <button className="btn btn-ghost lesson-back" onClick={onClose}>
          <ArrowLeft size={16} /> <span className="hide-sm">Back to roadmap</span>
        </button>
        <div className="lesson-top-mid">
          <span className="mono small faint">{stageLabel} · Lesson {position} of {total}</span>
          <div className="lesson-top-bar" aria-hidden><span style={{ width: `${(position / total) * 100}%` }} /></div>
        </div>
        <button className="icon-btn" onClick={onClose} aria-label="Close lesson">
          <Close />
        </button>
      </header>

      <div className="lesson-scroll" ref={scrollRef}>
        <div className="lesson-layout">
          <nav className="lesson-toc" aria-label="On this page">
            <span className="kicker">On this page</span>
            <ol>
              {sections.map((s) => (
                <li key={s.id}>
                  <button className={active === s.id ? 'on' : ''} onClick={() => jump(s.id)}>{s.label}</button>
                </li>
              ))}
            </ol>
            <div className="toc-progress">
              <span className="mono small">{gotCount}/{steps.length} steps</span>
              <div className="toc-bar"><span style={{ width: `${(gotCount / steps.length) * 100}%` }} /></div>
            </div>
          </nav>

          <article className="lesson-page" key={topic.id}>
            {/* hero */}
            <div className="lhero" id="l-overview">
              <div className="lhero-icon"><TopicIcon id={topic.id} /></div>
              <h1 id="lesson-title" className="lhero-title">{topic.title}</h1>
              <div className="meta-row">
                <span className="chip"><Clock size={14} /> About {topic.hours} {topic.hours === 1 ? 'hour' : 'hours'}</span>
                <span className="chip">{steps.length} steps</span>
                {done && <span className="chip chip-good"><Check size={13} /> Completed</span>}
              </div>
              {guide && (
                <p className="lhero-simple">
                  <span className="lhero-tag mono">In plain words</span>
                  {guide.simple}
                </p>
              )}
              <p className="lhero-summary">{topic.summary}</p>
              {guide && (
                <div className="uses">
                  <span className="kicker">Once you learn it, you can</span>
                  <ul>
                    {guide.uses.map((u, i) => (
                      <li key={u} style={{ '--i': i } as CSSProperties}>
                        <span className="uses-icon"><Glyph name={USE_GLYPHS[i]} size={18} /></span>
                        {u}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {topic.guide && (
                <Link to={topic.guide} className="btn btn-primary btn-lg lesson-guide-btn">
                  {done ? 'Revisit the quick start' : 'Open the quick start · 10 min'} <ArrowRight size={16} />
                </Link>
              )}
            </div>

            {/* what it looks like */}
            {guide?.example && (
              <Section id="l-see" kicker="See it" title="Here’s what it actually looks like">
                <CodeWindow file={guide.example.file} code={guide.example.code} output={guide.example.output} />
                <p className="see-note"><Glyph name="eye" size={16} /> {guide.example.note}</p>
                <Suspense fallback={null}>
                  <LessonFigure key={topic.id} topicId={topic.id} />
                </Suspense>
              </Section>
            )}

            {/* steps */}
            <Section id="l-steps" kicker="Your plan" title="What to learn, step by step">
              <p className="lsec-lead">
                {guide ? (
                  <>
                    Go through these in order. Read the step, do the <b>Try it</b> task, then press <b>I understand this
                    step</b> once you could explain it to a friend.
                  </>
                ) : (
                  <>The quick start covers these parts. Tick each one off as you finish it.</>
                )}
              </p>
              <div className="steps-progress">
                <div className="steps-bar"><span style={{ width: `${(gotCount / steps.length) * 100}%` }} /></div>
                <span className="mono small">{gotCount} of {steps.length} understood</span>
              </div>
              <ol className="lsteps">
                {steps.map((s, i) => {
                  const on = got.has(i);
                  return (
                    <li key={s.t} className={`lstep${on ? ' on' : ''}`} style={{ '--i': i } as CSSProperties}>
                      <span className="lstep-num mono">{on ? <Check size={16} /> : i + 1}</span>
                      <div className="lstep-body">
                        <h3>{s.t}</h3>
                        {s.d && <p className="lstep-d">{s.d}</p>}
                        {s.try && (
                          <div className="lstep-try">
                            <span className="lstep-try-tag mono"><Hammer size={13} /> Try it</span>
                            <p>{s.try}</p>
                          </div>
                        )}
                        <button className={`lstep-got${on ? ' on' : ''}`} onClick={() => toggle(i)} aria-pressed={on}>
                          {on ? <><Check size={14} /> Got it</> : 'I understand this step'}
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </Section>

            {/* resources */}
            <Section id="l-resources" kicker="Where to learn" title="Pick one video and one guide">
              <p className="lsec-lead">You don’t need all of these. Start with the two below, and only open another if something doesn’t click.</p>
              {starters.length > 0 && (
                <div className="lres-start">
                  <span className="lres-start-tag mono">Start here</span>
                  <div className="lres-grid">
                    {starters.map((r) => <ResourceCard key={r.url} r={r} featured />)}
                  </div>
                </div>
              )}
              {more.length > 0 && (
                <>
                  <span className="kicker lres-more-title">More options</span>
                  <div className="lres-list">
                    {more.map((r) => <ResourceCard key={r.url} r={r} />)}
                  </div>
                </>
              )}
            </Section>

            {/* project */}
            {guide && (
              <Section id="l-project" kicker="Prove it" title="Your mini project">
                <div className="lproject">
                  <span className="lproject-icon"><Hammer size={22} /></span>
                  <div>
                    <p>{guide.project}</p>
                    <span className="small muted">Build it without following a tutorial. Getting stuck and figuring it out is where the learning happens.</span>
                  </div>
                </div>
              </Section>
            )}

            {/* finish line */}
            {!topic.guide && (
              <Section id="l-finish" kicker="Finish line" title={done ? 'You finished this lesson' : 'Ready to mark it complete?'}>
                {done ? (
                  <p className="lsec-lead">Nice work. Come back in a week and try the mini project again from memory. That’s what makes it stick.</p>
                ) : (
                  <>
                    <p className="lsec-lead">Tap each sentence that is true for you. When all three are true, you can complete the lesson.</p>
                    <div className="finish-list">
                      {DONE_CHECKS.map((c, i) => (
                        <button
                          key={c}
                          className={`finish-item${checks[i] ? ' on' : ''}`}
                          aria-pressed={checks[i]}
                          onClick={() => setChecks((prev) => prev.map((v, j) => (j === i ? !v : v)))}
                        >
                          <span className="finish-icon">{checks[i] ? <Check size={18} /> : DONE_ICONS[i]}</span>
                          <span className="finish-text">{c}</span>
                          <span className="finish-state mono">{checks[i] ? 'Yes' : 'Not yet'}</span>
                        </button>
                      ))}
                    </div>
                    {!allChecked && (
                      <button className="link-btn small" onClick={onToggle}>
                        I already know this. Mark it complete anyway
                      </button>
                    )}
                  </>
                )}
              </Section>
            )}
          </article>
        </div>
      </div>

      <footer className="lesson-foot">
        <button className="btn btn-ghost" onClick={onPrev} disabled={!onPrev} aria-label="Previous lesson">
          <ArrowLeft size={16} /> <span className="hide-sm">Previous</span>
        </button>
        <button
          className={`btn grow ${done ? 'btn-done' : 'btn-primary'}`}
          onClick={onToggle}
          disabled={!done && !allChecked && !topic.guide}
        >
          {done ? (
            <>
              <Check size={16} /> Completed. Tap to undo
            </>
          ) : allChecked || topic.guide ? (
            'Mark as complete'
          ) : (
            `Finish line: ${checks.filter(Boolean).length}/${DONE_CHECKS.length}`
          )}
        </button>
        <button className="btn btn-ghost" onClick={onNext} disabled={!onNext} aria-label="Next lesson">
          <span className="hide-sm">Next</span> <ArrowRight size={16} />
        </button>
      </footer>
    </div>
  );
}
