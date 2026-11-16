/**
 * Motivation layer for the roadmap page: stage medals, progress rings, and the celebration dialogs
 * shown when a learner finishes a stage or a whole roadmap.
 */
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { notifyLocalChange, onReload } from '../lib/sync';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Close } from './Icons';
import { useLayer } from '../lib/layers';

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- medal ---------- */
export function StageMedal({ n, earned, size = 56, animate = false }: { n: number; earned: boolean; size?: number; animate?: boolean }) {
  return (
    <svg
      width={size}
      height={(size * 72) / 64}
      viewBox="0 0 64 72"
      className={`medal${earned ? ' medal-earned' : ''}${animate ? ' medal-animate' : ''}`}
      aria-hidden
    >
      <path d="M20 44 14 70l10-6 6 8 4-24Z" className="medal-ribbon" />
      <path d="M44 44 50 70l-10-6-6 8-4-24Z" className="medal-ribbon" />
      <circle cx="32" cy="30" r="26" className="medal-disc" />
      <circle cx="32" cy="30" r="19" className="medal-ring" />
      {earned ? (
        <path d="m23 30 6.5 6.5L42 23" className="medal-check" />
      ) : (
        <text x="32" y="36.5" textAnchor="middle" className="medal-num">
          {n}
        </text>
      )}
    </svg>
  );
}

/* ---------- progress ring ---------- */
export function ProgressRing({ value, total, size = 48 }: { value: number; total: number; size?: number }) {
  const pct = total ? value / total : 0;
  return (
    <span className={`ring${pct === 1 ? ' ring-done' : ''}`} style={{ width: size, height: size }} role="img" aria-label={`${value} of ${total} lessons done`}>
      <svg viewBox="0 0 40 40" width={size} height={size} aria-hidden>
        <circle cx="20" cy="20" r="16" className="ring-track" />
        <circle cx="20" cy="20" r="16" className="ring-fill" pathLength={100} strokeDasharray="100" strokeDashoffset={100 - pct * 100} />
      </svg>
      <span className="ring-label mono">
        {value}/{total}
      </span>
    </span>
  );
}

/* ---------- trophy ---------- */
export function Trophy({ size = 120 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" className="trophy" aria-hidden>
      <path d="M38 20h44v26a22 22 0 0 1-44 0V20Z" className="trophy-cup" />
      <path d="M38 28H26a12 12 0 0 0 12 18M82 28h12a12 12 0 0 1-12 18" className="trophy-handle" />
      <path d="M54 68h12v14H54z" className="trophy-cup" />
      <rect x="40" y="82" width="40" height="12" rx="3" className="trophy-cup" />
      <rect x="34" y="94" width="52" height="10" rx="3" className="trophy-base" />
      <path d="m60 30 3.5 7 7.7 1.1-5.6 5.4 1.3 7.7L60 47.6l-6.9 3.6 1.3-7.7-5.6-5.4 7.7-1.1Z" className="trophy-star" />
    </svg>
  );
}

/* ---------- confetti (CSS only) ---------- */
export function Confetti({ pieces = 40 }: { pieces?: number }) {
  const bits = useMemo(
    () =>
      Array.from({ length: pieces }, (_, k) => ({
        x: Math.round((Math.random() * 2 - 1) * 260),
        y: Math.round(180 + Math.random() * 240),
        r: Math.round(Math.random() * 720 - 360),
        d: Math.round(Math.random() * 180),
        c: k % 4,
        w: 6 + Math.round(Math.random() * 6),
      })),
    [pieces],
  );
  if (reducedMotion()) return null;
  return (
    <div className="confetti" aria-hidden>
      {bits.map((b, k) => (
        <i
          key={k}
          className={`confetti-bit cb-${b.c}`}
          style={{ '--x': `${b.x}px`, '--y': `${b.y}px`, '--r': `${b.r}deg`, '--d': `${b.d}ms`, width: b.w, height: b.w * 0.45 } as CSSProperties}
        />
      ))}
    </div>
  );
}

/* ---------- dialog shell ---------- */
function Celebration({ label, onClose, big, children }: { label: string; onClose: () => void; big?: boolean; children: ReactNode }) {
  const panel = useRef<HTMLDivElement>(null);
  // latest onClose without re-running the focus effect on every parent render
  const close = useRef(onClose);
  close.current = onClose;
  useLayer(true, () => close.current());
  useEffect(() => {
    const before = document.activeElement as HTMLElement | null;
    panel.current?.focus();
    return () => before?.focus?.();
  }, []);
  return (
    <div className="celebrate-root">
      <div className="celebrate-backdrop" onClick={onClose} />
      {/* confetti lives outside the scrollable panel, so flying pieces never create scrollbars */}
      <div className={`celebrate-wrap${big ? ' celebrate-big' : ''}`}>
        <Confetti pieces={big ? 70 : 40} />
        <div ref={panel} className="celebrate" role="dialog" aria-modal="true" aria-label={label} tabIndex={-1}>
          <button className="icon-btn celebrate-close" onClick={onClose} aria-label="Close">
            <Close />
          </button>
          {children}
        </div>
      </div>
    </div>
  );
}

export function StageCelebration(props: {
  stageNumber: number;
  stageTitle: string;
  roadmapTitle: string;
  pct: number;
  nextTitle?: string;
  onNext?: () => void;
  onClose: () => void;
}) {
  const { stageNumber, stageTitle, roadmapTitle, pct, nextTitle, onNext, onClose } = props;
  return (
    <Celebration label={`Stage ${stageNumber} complete`} onClose={onClose}>
      <div className="celebrate-medal">
        <StageMedal n={stageNumber} earned size={92} animate />
      </div>
      <span className="kicker">Stage {String(stageNumber).padStart(2, '0')} complete</span>
      <h2 className="celebrate-title">{stageTitle} badge earned</h2>
      <p className="muted">
        Nice work. You’re <b>{Math.round(pct * 100)}%</b> of the way through {roadmapTitle}.
      </p>
      <div className="celebrate-bar">
        <span style={{ width: `${Math.round(pct * 100)}%` }} />
      </div>
      <div className="celebrate-actions">
        {nextTitle && onNext ? (
          <button className="btn btn-primary" onClick={onNext}>
            Start next stage: {nextTitle} <ArrowRight size={16} />
          </button>
        ) : null}
        <button className="btn btn-ghost" onClick={onClose}>
          Keep reviewing
        </button>
      </div>
    </Celebration>
  );
}

export function RoadmapCelebration(props: {
  roadmapTitle: string;
  stages: number;
  lessons: number;
  hours: number;
  projects: number;
  others: { id: string; title: string; pct: number }[];
  onClose: () => void;
}) {
  const { roadmapTitle, stages, lessons, hours, projects, others, onClose } = props;
  return (
    <Celebration label={`${roadmapTitle} roadmap complete`} onClose={onClose} big>
      <div className="celebrate-trophy">
        <Trophy />
      </div>
      <span className="kicker">Roadmap complete</span>
      <h2 className="celebrate-title">You finished the {roadmapTitle} roadmap</h2>
      <p className="muted">Every stage, every lesson. That takes real consistency. Be proud of this one.</p>
      <div className="celebrate-medals" aria-label={`${stages} of ${stages} stage badges earned`}>
        {Array.from({ length: stages }, (_, k) => (
          <span key={k} style={{ '--i': k } as CSSProperties}>
            <StageMedal n={k + 1} earned size={34} />
          </span>
        ))}
      </div>
      <dl className="celebrate-stats">
        <div>
          <dt className="mono small faint">lessons</dt>
          <dd>{lessons}</dd>
        </div>
        <div>
          <dt className="mono small faint">hours of study</dt>
          <dd>~{hours}</dd>
        </div>
        <div>
          <dt className="mono small faint">projects</dt>
          <dd>{projects}</dd>
        </div>
      </dl>
      <div className="celebrate-next">
        <span className="kicker">What’s next</span>
        <ul>
          <li>
            <Link to="/stack" onClick={onClose}>
              See the tech stack companies hire for <ArrowRight size={14} />
            </Link>
          </li>
          {others.map((o) => (
            <li key={o.id}>
              <Link to={`/roadmap/${o.id}`} onClick={onClose}>
                Start {o.title}
                {o.pct > 0 && <span className="celebrate-head-start"> · {Math.round(o.pct * 100)}% done already</span>}
                <ArrowRight size={14} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <button className="btn btn-primary celebrate-done" onClick={onClose}>
        <Check size={16} /> Done
      </button>
    </Celebration>
  );
}

/* ---------- remember what has been celebrated ---------- */
const KEY = 'waypoint.celebrated.v1';
function loadCelebrated(): Set<string> {
  try {
    const arr = JSON.parse(localStorage.getItem(KEY) || '[]');
    return new Set(Array.isArray(arr) ? arr : []);
  } catch {
    return new Set();
  }
}

/** Each stage and roadmap celebrates once; keys look like "frontend:2" or "frontend:all". */
export function useCelebrated() {
  const [set, setSet] = useState<Set<string>>(loadCelebrated);
  useEffect(() => onReload(() => setSet(loadCelebrated())), []);
  const mark = useCallback((key: string) => {
    setSet((prev) => {
      if (prev.has(key)) return prev;
      const next = new Set(prev);
      next.add(key);
      try {
        localStorage.setItem(KEY, JSON.stringify([...next]));
        notifyLocalChange();
      } catch {
        /* storage unavailable: celebrations may repeat, which is harmless */
      }
      return next;
    });
  }, []);
  return { has: (key: string) => set.has(key), mark };
}
