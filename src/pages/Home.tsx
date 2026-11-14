import { useEffect, type CSSProperties } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { roadmaps, topicIdsOf } from '../data/roadmaps';
import { topics } from '../data/topics';
import { useProgress } from '../hooks/useProgress';
import { ProgressBar } from '../components/Bits';
import { CountUp, SplitWords } from '../components/Motion';
import RoleArt from '../components/RoleArt';
import { Glyph, StepArt } from '../components/Art';
import { estimateFinish, usePlan } from '../hooks/usePlan';
import { stacks, EVERY_ROLE } from '../data/stacks';
import { EVERY_ROLE_GLYPH } from '../data/logos';
import { CDN, logoPathsFor } from '../components/TechLogo';
import { ArrowRight, Check } from '../components/Icons';

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

const i = (n: number) => ({ '--i': n }) as CSSProperties;

// real numbers from the content, so the stats never go stale
const topicList = Object.values(topics);
const STATS = [
  { value: roadmaps.length, label: 'career roadmaps' },
  { value: topicList.length, label: 'focused lessons' },
  { value: topicList.reduce((s, t) => s + t.resources.length, 0), label: 'hand-picked resources' },
  { value: 100, suffix: '%', label: 'free, no sign-up' },
];

function HeroVisual() {
  const steps = [
    { t: 'HTML & CSS', s: 'Stage 02 · 3 lessons' },
    { t: 'JavaScript', s: 'Stage 03 · 3 lessons' },
    { t: 'React', s: 'Stage 05 · 3 lessons' },
  ];
  return (
    <div className="hero-visual" aria-hidden>
      <span className="float-chip f1">git commit -m "day 1"</span>
      <span className="float-chip f2"><Check size={12} /> Flexbox Froggy</span>
      <span className="float-chip f3">▶ React in 100s</span>

      <div className="hv-card">
        <div className="hv-head">
          <span className="mono">frontend.roadmap</span>
          <span className="hv-dots"><i /><i /><i /></span>
        </div>
        <ol className="hv-steps">
          {steps.map((st, n) => (
            <li key={st.t} className={`hv-step n${n + 1}`}>
              <span className="hv-node">{String(n + 1).padStart(2, '0')}</span>
              <span className="hv-text">
                <b>{st.t}</b>
                <small>{st.s}</small>
              </span>
              <span className="hv-seg"><span /></span>
            </li>
          ))}
          <li className="hv-step hv-final">
            <span className="hv-node"><Check size={14} /></span>
            <span className="hv-text">
              <b>Job-ready</b>
              <small>Portfolio shipped</small>
            </span>
          </li>
        </ol>
        <div className="hv-progress">
          <span className="mono">progress</span>
          <div className="hv-bar"><span /></div>
        </div>
      </div>
    </div>
  );
}

const QS_BENEFITS = [
  'Spot the habits that slow you down',
  'One simple method for every lesson',
  'Your personal plan and finish date',
];

/** A personal plan preview with real numbers: the hook is "click to get YOUR date". */
function PlanPreview() {
  const { plan } = usePlan();
  const { isDone } = useProgress();
  const rm = roadmaps.find((r) => r.id === plan.roadmap) ?? roadmaps[0];
  const remaining = topicIdsOf(rm)
    .filter((t) => !isDone(t))
    .reduce((s, t) => s + (topics[t]?.hours ?? 0), 0);
  // same estimate as the quick start itself: projects and review take ~60% extra
  const est = estimateFinish(remaining * 1.6, plan.hours);
  const rows = ['Study habits checked', 'Lesson method learned', 'Weekly plan set'];

  return (
    <div className="qs-plan" aria-hidden>
      <div className="qs-plan-head">
        <span className="mono small faint">your-plan.md</span>
        <span className="qs-plan-chip mono">{plan.hours}h / week</span>
      </div>
      <div className="qs-plan-role">{rm.title}</div>
      <div className="qs-plan-finish">
        <span className="small muted">Finish around</span>
        <b>{est.date}</b>
      </div>
      <ul className="qs-plan-rows">
        {rows.map((r, n) => (
          <li key={r} style={i(n)}>
            <span className="qs-tick">
              <Check size={12} />
            </span>
            {r}
          </li>
        ))}
      </ul>
      <div className="qs-plan-ready" style={i(3)}>
        Your finish date is ready <ArrowRight size={14} />
      </div>
    </div>
  );
}

function QuickStart({ done }: { done: boolean }) {
  if (done) {
    return (
      <Link to="/learn" className="qs-done" data-reveal>
        <span className="qs-done-icon">
          <Check size={16} />
        </span>
        <span>
          <b>Quick start done.</b> <span className="muted">Revisit it anytime to refresh the method.</span>
        </span>
        <ArrowRight size={16} />
      </Link>
    );
  }
  return (
    <div className="qs-card" data-reveal>
      <div className="qs-copy">
        <span className="kicker qs-kicker">Quick start · 10 minutes</span>
        <h2 className="qs-title">Make every lesson stick.</h2>
        <p className="qs-lead">
          Coding isn’t the hard part. Studying the right way is. Learn how in 10 minutes, before your first lesson.
        </p>
        <ul className="qs-benefits">
          {QS_BENEFITS.map((b) => (
            <li key={b}>
              <span className="qs-check">
                <Check size={13} />
              </span>
              {b}
            </li>
          ))}
        </ul>
        <div className="qs-cta">
          <Link to="/learn" className="btn btn-primary btn-lg">
            Show me how <ArrowRight size={16} />
          </Link>
          <span className="small muted">10 minutes · free · no sign-up</span>
        </div>
      </div>
      <PlanPreview />
    </div>
  );
}

/** The roles current hiring data backs most strongly, with an honest caveat and a link to the sources. */
function HotNow() {
  const hot = roadmaps.filter((r) => r.hot).sort((a, b) => a.hot!.rank - b.hot!.rank);
  if (!hot.length) return null;
  return (
    <div className="hot" data-reveal>
      <div className="hot-head">
        <span className="kicker">In demand · 2026</span>
        <p className="small muted">
          Strong demand, but most openings want some experience. Build the fundamentals first.{' '}
          <Link to="/stack" className="inline-link">
            See sources
          </Link>
        </p>
      </div>
      <div className="hot-grid">
        {hot.map((r, n) => (
          <Link key={r.id} to={`/roadmap/${r.id}`} className="hot-card" style={i(n)}>
            <RoleArt role={r.id} className="hot-art" />
            <span className="hot-text">
              <b>{r.title}</b>
              <span className="small muted">{r.hot!.note}</span>
              <span className="hot-go">
                View roadmap <ArrowRight size={14} />
              </span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

/**
 * "Peek inside every toolkit": one card per role with a closed deck of real logos
 * that fans open on hover. All counts come from stacks.ts.
 */
function ToolkitShowcase() {
  return (
    <section id="toolkits" className="section toolkit-section">
      <div className="container">
        <div className="section-head" data-reveal>
          <span className="kicker">// Tech stacks</span>
          <h2>Peek inside every developer’s toolkit</h2>
          <p className="muted">
            Before you pick a path, see the tools each role uses every day, what each one does, and which ones get you
            hired.
          </p>
        </div>

        <div className="toolkit-grid">
          {stacks.map((s, n) => {
            const rm = roadmaps.find((r) => r.id === s.roadmap)!;
            const items = s.groups.flatMap((g) => g.items);
            const tools = new Set(items.map((t) => t.name)).size;
            const mustKnow = new Set(items.filter((t) => t.demand === 'core').map((t) => t.name)).size;
            // typical stack first, topped up from the rest of the role's tools so every deck has 5 logos
            const deck = logoPathsFor([...s.typical, ...items.map((t) => t.name)]).slice(0, 5);
            return (
              <Link key={s.roadmap} to={`/stack/${s.roadmap}`} className="toolkit-card" data-reveal style={i(n)}>
                <div className="toolkit-deck" aria-hidden>
                  {deck.map((path, k) => (
                    <span key={path} className="logo-tile toolkit-tile" style={{ '--n': k, '--c': deck.length } as CSSProperties}>
                      <img src={`${CDN}${path}.svg`} alt="" loading="lazy" decoding="async" />
                    </span>
                  ))}
                </div>
                <h3>{rm.title.replace(' Developer', '').replace(' Engineer', '')}</h3>
                <p className="muted">{rm.tagline}</p>
                <div className="toolkit-meta">
                  <span className="toolkit-chip">{mustKnow} must-knows</span>
                  <span className="small faint">{tools} tools explained</span>
                  <span className="toolkit-open">
                    Open toolkit <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="toolkit-every" data-reveal>
          <span className="kicker">Hired in every role</span>
          <ul>
            {EVERY_ROLE.map((s) => (
              <li key={s.name} title={s.why}>
                <Glyph name={EVERY_ROLE_GLYPH[s.name] ?? 'sparkle'} size={15} />
                {s.name}
              </li>
            ))}
          </ul>
          <Link to="/stack" className="btn btn-ghost toolkit-all">
            Explore all tech stacks <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { countDone, isDone } = useProgress();
  const onboarded = isDone('how-to-learn');
  const location = useLocation();

  // allow the nav to deep-link to a section of this page
  useEffect(() => {
    const target = (location.state as { scrollTo?: string } | null)?.scrollTo;
    if (target) setTimeout(() => scrollToId(target), 50);
  }, [location]);

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <h1 className="hero-title">
              <SplitWords text="Know exactly what to learn" start={1} />{' '}
              <span className="word hl" style={i(6)}>
                next.
                <svg className="hl-line" viewBox="0 0 200 20" preserveAspectRatio="none" aria-hidden>
                  <path d="M3 14 C 50 5, 120 4, 197 10" />
                </svg>
              </span>
            </h1>
            <p className="hero-lead rise" style={i(8)}>
              Step-by-step roadmaps for the most in-demand developer roles. Every stage has short lessons, hand-picked
              videos and docs, a project to build, and a checklist that remembers your progress.
            </p>
            <div className="hero-cta rise" style={i(9)}>
              <button className="btn btn-primary btn-lg" onClick={() => scrollToId('roadmaps')}>
                Pick a roadmap <ArrowRight size={16} />
              </button>
              <Link to="/learn" className="btn btn-ghost btn-lg">
                Try the 10-min quick start
              </Link>
            </div>
          </div>
          <HeroVisual />
        </div>

        <div className="container">
          <dl className="stats">
            {STATS.map((s, n) => (
              <div key={s.label} className="stat" data-reveal style={i(n)}>
                <dt className="mono small faint">{s.label}</dt>
                <dd>
                  <CountUp value={s.value} suffix={s.suffix} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section before-start">
        <div className="container">
          <QuickStart done={onboarded} />
        </div>
      </section>

      <section id="roadmaps" className="section">
        <div className="container">
          <HotNow />
          <div className="section-head" data-reveal>
            <span className="kicker">// Roadmaps</span>
            <h2>Choose your path</h2>
            <p className="muted">
              Each roadmap goes from zero to job-ready. Shared skills like Git or TypeScript sync across paths, so switching
              later never costs you progress.
            </p>
          </div>

          <div className="rm-grid">
            {roadmaps.map((rm, n) => {
              const ids = topicIdsOf(rm);
              const done = countDone(ids);
              const pct = ids.length ? done / ids.length : 0;
              return (
                <Link key={rm.id} to={`/roadmap/${rm.id}`} className="rm-card" data-reveal style={i(n)}>
                  <RoleArt role={rm.id} className="rm-card-art" />
                  <span className="rm-card-body">
                    <span className="rm-card-head">
                      <b className="rm-card-title">{rm.title}</b>
                      {pct === 1 ? (
                        <span className="badge badge-hot badge-done">
                          <Check size={11} /> Completed
                        </span>
                      ) : (
                        rm.hot && (
                          <span className="badge badge-hot">
                            <Glyph name="bolt" size={11} /> In demand
                          </span>
                        )
                      )}
                    </span>
                    <span className="rm-card-tag">{rm.tagline}</span>
                    <span className="mono rm-card-meta">
                      {ids.length} lessons · <span className="nowrap">{rm.duration}</span>
                    </span>
                    <span className="rm-card-foot">
                      <ProgressBar value={pct} label={`${rm.title} progress`} />
                      <span className="rm-go">
                        {done === 0 ? 'Start' : pct === 1 ? 'Review' : `${done}/${ids.length}`}
                        <ArrowRight size={14} />
                      </span>
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>

        </div>
      </section>

      <ToolkitShowcase />

      <section id="how" className="section section-line">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="kicker">// How it works</span>
            <h2>Learn in small, finishable steps</h2>
          </div>
          <div className="steps">
            {[
              ['Pick a path', 'Choose the role you want. Each roadmap is ordered so every stage builds on the last.'],
              ['Learn each lesson', 'Open a lesson for a short explanation, the key concepts, and the best videos, docs and exercises for it.'],
              ['Build, then check it off', 'Finish the stage project, tick your lessons, and watch the roadmap fill in until you’re job-ready.'],
            ].map(([t, d], n) => (
              <div key={t} className="step" data-reveal style={i(n)}>
                <StepArt step={n} />
                <span className="step-num mono">{String(n + 1).padStart(2, '0')}</span>
                <h3>{t}</h3>
                <p className="muted">{d}</p>
              </div>
            ))}
          </div>

          <Link to="/ai" className="ai-promo" data-reveal>
            <span className="ai-promo-icon" aria-hidden>
              <Glyph name="terminal" size={22} />
            </span>
            <span className="ai-promo-text">
              <b>Learn to work with AI coding tools</b>
              <span className="small muted">Claude Code, Copilot, Codex and Cursor: how to set them up, and the skills that make them useful.</span>
            </span>
            <span className="ai-promo-go">
              AI workflow <ArrowRight size={15} />
            </span>
          </Link>
        </div>
      </section>

      <section className="section section-line cta-band">
        <div className="container cta-inner" data-reveal>
          <h2>The best time to start was yesterday.</h2>
          <p className="muted">The second best is the first lesson. It takes about ten minutes.</p>
          <Link to="/learn" className="btn btn-primary btn-lg">
            Start your first lesson <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
