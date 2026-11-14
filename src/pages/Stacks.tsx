import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { roadmaps, topicIdsOf } from '../data/roadmaps';
import { topics } from '../data/topics';
import { DEMAND, EVERY_ROLE, STACK_SOURCES, STACK_UPDATED, getStack, type Demand, type Tech } from '../data/stacks';
import { SplitWords } from '../components/Motion';
import TechLogo from '../components/TechLogo';
import { Glyph } from '../components/Art';
import { EVERY_ROLE_GLYPH } from '../data/logos';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from '../components/Icons';
import RoleArt from '../components/RoleArt';

const FILTERS: (Demand | 'all')[] = ['all', 'core', 'high', 'rising', 'optional'];
const i = (n: number) => ({ '--i': n }) as CSSProperties;

/** Link to the lesson for a tech, preferring the roadmap being viewed. */
function lessonHref(topicId: string | undefined, roadmapId: string) {
  if (!topicId || !topics[topicId]) return null;
  const rm =
    roadmaps.find((r) => r.id === roadmapId && topicIdsOf(r).includes(topicId)) ??
    roadmaps.find((r) => topicIdsOf(r).includes(topicId));
  return rm ? `/roadmap/${rm.id}?lesson=${topicId}` : null;
}

function DemandBadge({ demand }: { demand: Demand }) {
  return (
    <span className={`demand demand-${demand}`} title={DEMAND[demand].hint}>
      {DEMAND[demand].label}
    </span>
  );
}

function TechCard({ tech, roadmapId, index }: { tech: Tech; roadmapId: string; index: number }) {
  const href = lessonHref(tech.topic, roadmapId);
  return (
    <article className="tech-card" data-reveal style={i(index)}>
      <div className="tech-head">
        <TechLogo name={tech.name} />
        <h4>{tech.name}</h4>
        <DemandBadge demand={tech.demand} />
      </div>
      <p className="tech-what">{tech.what}</p>
      <p className="tech-why">
        <span className="kicker">Why it gets you hired</span>
        {tech.why}
      </p>
      {href && (
        <Link to={href} className="tech-link small">
          Learn it: {topics[tech.topic!].title}
          <ArrowRight size={14} />
        </Link>
      )}
    </article>
  );
}

/** Tool and must-know counts for a role, from stacks.ts (same numbers as the home toolkit cards). */
function roleStats(roleId: string) {
  const items = getStack(roleId)?.groups.flatMap((g) => g.items) ?? [];
  return {
    tools: new Set(items.map((t) => t.name)).size,
    must: new Set(items.filter((t) => t.demand === 'core').map((t) => t.name)).size,
  };
}

const shortTitle = (title: string) => title.replace(' Developer', '').replace(' Engineer', '');

/** Step 1: a visual grid of roles, so it's obvious there's a choice to make. */
function RolePicker({ active, onPick }: { active: string; onPick: () => void }) {
  return (
    <div className="role-picker rise" style={i(6)} id="role-picker">
      <div className="role-picker-head">
        <h2 className="role-picker-title">
          <span className="step-badge mono" aria-hidden>1</span> Choose a role to explore
        </h2>
        <span className="small muted">{roadmaps.length} roles · tap one to see its tools</span>
      </div>
      <nav className="role-grid" aria-label="Choose a role">
        {roadmaps.map((r) => {
          const on = r.id === active;
          const s = roleStats(r.id);
          return (
            <Link
              key={r.id}
              to={`/stack/${r.id}`}
              className={`role-card${on ? ' is-on' : ''}`}
              aria-current={on ? 'page' : undefined}
              onClick={onPick}
            >
              {on && (
                <span className="role-card-on">
                  <Check size={11} /> Viewing
                </span>
              )}
              <RoleArt role={r.id} className="role-card-art" />
              <span className="role-card-text">
                <b>
                  {shortTitle(r.title)}
                  {r.hot && (
                    <>
                      <span className="role-hot" title="In demand right now" aria-hidden />
                      <span className="sr-only"> (in demand)</span>
                    </>
                  )}
                </b>
                <span className="mono role-card-meta">
                  <span className="nowrap">{s.tools} tools ·</span> <span className="nowrap">{s.must} must-know</span>
                </span>
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

/** Slim bar that sticks under the navbar once the picker scrolls away, so switching stays one tap away. */
function RoleBar({ active, visible, onPick }: { active: string; visible: boolean; onPick: () => void }) {
  const navigate = useNavigate();
  const idx = roadmaps.findIndex((r) => r.id === active);
  const prev = roadmaps[(idx - 1 + roadmaps.length) % roadmaps.length];
  const next = roadmaps[(idx + 1) % roadmaps.length];
  const rm = roadmaps[idx];
  const s = roleStats(active);

  // switch role and land at the start of the new toolkit
  const go = (id: string) => {
    onPick();
    navigate(`/stack/${id}`);
    setTimeout(() => document.getElementById('toolkit-start')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
  };

  return (
    <div className={`role-bar${visible ? ' is-visible' : ''}`} aria-hidden={!visible}>
      <div className="container role-bar-inner">
        <span className="role-bar-now">
          <RoleArt role={active} className="role-bar-art" />
          <span>
            <span className="small faint role-bar-label">Viewing</span>
            <b>{shortTitle(rm.title)}</b>
            <span className="mono small faint role-bar-meta"> · {s.tools} tools</span>
          </span>
        </span>
        <span className="role-bar-actions">
          <button className="role-bar-arrow" onClick={() => go(prev.id)} aria-label={`Previous role: ${prev.title}`} tabIndex={visible ? 0 : -1}>
            <ArrowLeft size={16} />
          </button>
          <button className="role-bar-arrow" onClick={() => go(next.id)} aria-label={`Next role: ${next.title}`} tabIndex={visible ? 0 : -1}>
            <ArrowRight size={16} />
          </button>
          <button
            className="btn btn-primary role-bar-change"
            tabIndex={visible ? 0 : -1}
            onClick={() => document.getElementById('role-picker')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
          >
            Change role
          </button>
        </span>
      </div>
    </div>
  );
}

export default function Stacks() {
  const { id } = useParams();
  const stack = getStack(id);
  const [filter, setFilter] = useState<Demand | 'all'>('all');
  // show the sticky role bar once the picker has scrolled out of view
  const pickerWatch = useRef<HTMLDivElement>(null);
  const [barVisible, setBarVisible] = useState(false);
  useEffect(() => {
    const el = pickerWatch.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([e]) => setBarVisible(!e.isIntersecting && e.boundingClientRect.top < 0));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (!stack) return <Navigate to="/stack/frontend" replace />;
  const rm = roadmaps.find((r) => r.id === stack.roadmap)!;

  // de-duplicated "must know" list for the hiring snapshot
  const mustKnow = [...new Set(stack.groups.flatMap((g) => g.items.filter((t) => t.demand === 'core').map((t) => t.name)))];

  let cardIndex = 0;

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="kicker rise" style={i(0)}>
            Tech stacks · updated {STACK_UPDATED}
          </span>
          <h1 className="page-title">
            <SplitWords text="What companies hire for right now" start={1} />
          </h1>
          <p className="page-lead rise" style={i(5)}>
            The technologies each role actually uses, what every one of them is, and how often employers ask for it.
            Learn the <b>Must know</b> skills first. They get you through the door.
          </p>
          <RolePicker active={stack.roadmap} onPick={() => setFilter('all')} />
          <div ref={pickerWatch} aria-hidden />
        </div>
      </section>

      <RoleBar active={stack.roadmap} visible={barVisible} onPick={() => setFilter('all')} />

      <section className="section stack-section" id="toolkit-start">
        <div className="container">
          <p className="toolkit-lead" key={`lead-${stack.roadmap}`}>
            <span className="step-badge mono" aria-hidden>2</span> Here’s the <b>{rm.title}</b> toolkit
            <span className="toolkit-lead-arrow" aria-hidden>↓</span>
          </p>
          <div className="stack-overview" key={stack.roadmap}>
            <div>
              <span className="kicker">{rm.title} · the typical 2026 stack</span>
              <p className="stack-typical">
                {stack.typical.map((t, n) => (
                  <span key={t} className="stack-chip-wrap">
                    {n > 0 && <span className="stack-plus" style={i(n)}>+</span>}
                    <span className="stack-chip mono" style={i(n)}>
                      <TechLogo name={t} size="sm" />
                      {t}
                    </span>
                  </span>
                ))}
              </p>
              <p className="muted stack-summary">{stack.summary}</p>
              <Link to={`/roadmap/${rm.id}`} className="btn btn-primary stack-cta">
                Follow the {rm.title} roadmap <ArrowRight size={16} />
              </Link>
            </div>
            <aside className="hire-card">
              <span className="kicker">Most hired: must know</span>
              <ol>
                {mustKnow.map((name, n) => (
                  <li key={name} style={i(n)}>
                    <span className="hire-check">
                      <Check size={12} />
                    </span>
                    <TechLogo name={name} size="sm" />
                    {name}
                  </li>
                ))}
              </ol>
            </aside>
          </div>

          <div className="demand-legend" role="group" aria-label="Filter by demand">
            {FILTERS.map((f) => (
              <button
                key={f}
                className={`filter-chip${filter === f ? ' active' : ''}`}
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
              >
                {f === 'all' ? 'All' : DEMAND[f].label}
              </button>
            ))}
            {filter !== 'all' && <span className="small muted legend-hint">{DEMAND[filter].hint}</span>}
          </div>

          {/* keyed so cards re-enter with a stagger when the role or filter changes */}
          <div className="stack-groups" key={`${stack.roadmap}-${filter}`}>
            {stack.groups.map((g) => {
              const items = g.items.filter((t) => filter === 'all' || t.demand === filter);
              if (!items.length) return null;
              return (
                <div key={g.title} className="stack-group">
                  <h3 className="stack-group-title" data-reveal>
                    {g.title}
                  </h3>
                  {g.note && (
                    <p className="stack-note small" data-reveal>
                      {g.note}
                    </p>
                  )}
                  <div className="tech-grid">
                    {items.map((t, n) => {
                      cardIndex++;
                      return <TechCard key={t.name} tech={t} roadmapId={stack.roadmap} index={n} />;
                    })}
                  </div>
                </div>
              );
            })}
            {cardIndex === 0 && <p className="muted">No technologies at this level for this role.</p>}
          </div>
        </div>
      </section>

      <section className="section section-line">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="kicker">// Every role</span>
            <h2>Hired in every role</h2>
            <p className="muted">Whichever path you pick, these show up in job posts again and again.</p>
          </div>
          <div className="every-grid">
            {EVERY_ROLE.map((s, n) => (
              <div key={s.name} className="every-card" data-reveal style={i(n)}>
                <span className="every-top">
                  <span className="every-glyph">
                    <Glyph name={EVERY_ROLE_GLYPH[s.name] ?? 'sparkle'} size={20} />
                  </span>
                  <span className="every-num mono">{String(n + 1).padStart(2, '0')}</span>
                </span>
                <b>{s.name}</b>
                <span className="muted small">{s.why}</span>
              </div>
            ))}
          </div>

          <div className="stack-footer">
            <div className="why-box" data-reveal>
              <span className="kicker">Check your own market</span>
              <ul className="points">
                <li>Demand differs by country and city. Search 20 junior job posts for your role where you want to work.</li>
                <li>Tally every technology they mention. The top five are your real must-knows.</li>
                <li>Don’t chase every tool. Strong fundamentals plus the top five beats a long list of shallow skills.</li>
              </ul>
            </div>
            <div className="sources" data-reveal style={i(1)}>
              <span className="kicker">How we rate demand</span>
              <p className="small muted">
                Demand levels summarise job-posting analyses and developer surveys from 2026. They are guidance, not exact
                counts, and are reviewed yearly.
              </p>
              <ul>
                {STACK_SOURCES.map((s) => (
                  <li key={s.url}>
                    <a href={s.url} target="_blank" rel="noreferrer" className="small">
                      {s.label}
                      <ArrowUpRight size={13} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
