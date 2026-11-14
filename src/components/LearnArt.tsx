/**
 * Animated line-art for the "How to learn" quick start, one per step.
 * Same visual language as Art.tsx: colours come from .art-* classes, motion from .la-* classes
 * (all switched off by the global prefers-reduced-motion rule).
 */
import { useEffect, useState } from 'react';

export function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setReduced(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return reduced;
}

const ROUTE = 'M20 100C48 100 40 66 72 66S106 36 134 30';

/** A traveller walks a winding route to the flag. */
function WelcomeArt() {
  const reduced = useReducedMotion();
  return (
    <svg viewBox="0 0 160 120" className="art la-art" aria-hidden>
      <circle cx="84" cy="62" r="52" className="art-soft" />
      <path d={ROUTE} className="art-line art-dash art-flow" />
      <circle cx="20" cy="100" r="5" className="art-card art-pop" />
      <circle cx="72" cy="66" r="5" className="art-card art-pop" style={{ animationDelay: '0.7s' }} />
      <path d="M134 30V6" className="art-line" />
      <path d="M134 6h20l-5 6 5 6h-20Z" className="art-accent-fill la-wave" />
      {reduced ? (
        <circle cx="72" cy="66" r="6" className="art-ink" />
      ) : (
        <circle r="6" className="art-ink">
          <animateMotion dur="4.5s" repeatCount="indefinite" path={ROUTE} keyPoints="0;1;1" keyTimes="0;0.8;1" calcMode="linear" />
        </circle>
      )}
    </svg>
  );
}

/** A "bad habit" card gets replaced by a "better way" card. */
function TrapsArt() {
  return (
    <svg viewBox="0 0 160 120" className="art la-art" aria-hidden>
      <g transform="rotate(-8 50 56)">
        <rect x="14" y="26" width="76" height="58" rx="9" className="art-soft" />
        <path d="M26 46h40M26 58h30" className="art-line art-faint" />
        <circle cx="74" cy="70" r="9" className="la-bad-fill" />
        <path d="m70.5 66.5 7 7m0-7-7 7" className="art-bg-stroke" />
      </g>
      <g className="la-slide">
        <rect x="58" y="40" width="86" height="64" rx="10" className="art-card art-shadow" />
        <path d="M72 60h44M72 72h32M72 84h38" className="art-line" />
        <circle cx="130" cy="44" r="11" className="art-accent-fill la-pulse" />
        <path d="m125 44 3.5 3.5 6.5-7" className="art-bg-stroke" />
      </g>
    </svg>
  );
}

/** Two arrows chasing each other round a loop. */
function LoopArt() {
  return (
    <svg viewBox="0 0 160 120" className="art la-art" aria-hidden>
      <circle cx="80" cy="60" r="50" className="art-soft" />
      <g className="la-spin">
        <path d="M48 46a36 36 0 0 1 56-14" className="art-line art-thick" />
        <path d="m100 24 6 8-10 3" className="art-line art-thick" />
        <path d="M112 74a36 36 0 0 1-56 14" className="art-accent-stroke" style={{ strokeWidth: 3 }} />
        <path d="m60 96-6-8 10-3" className="art-accent-stroke" style={{ strokeWidth: 3 }} />
      </g>
      <circle cx="80" cy="60" r="12" className="art-card" />
      <circle cx="80" cy="60" r="4" className="art-ink la-pulse" />
    </svg>
  );
}

/** A code window fills line by line while a clock ticks. */
function LessonArt() {
  return (
    <svg viewBox="0 0 160 120" className="art la-art" aria-hidden>
      <rect x="10" y="20" width="104" height="80" rx="10" className="art-card" />
      <path d="M10 36h104" className="art-line art-faint" />
      <circle cx="20" cy="28" r="2.2" className="art-dot" />
      <circle cx="28" cy="28" r="2.2" className="art-dot" />
      <circle cx="36" cy="28" r="2.2" className="art-dot" />
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x={22 + (i % 2) * 10}
          y={48 + i * 12}
          width={[56, 44, 60, 30][i]}
          height="5"
          rx="2.5"
          className={i === 3 ? 'art-accent-fill la-type' : 'art-ink la-type'}
          style={{ animationDelay: `${i * 0.5}s` }}
        />
      ))}
      <circle cx="124" cy="78" r="26" className="art-card art-shadow" />
      <path d="M124 60v4M124 92v4M106 78h4M138 78h4" className="art-line art-faint" />
      <path d="M124 78V64" className="art-line art-thick la-tick" />
      <circle cx="124" cy="78" r="3" className="art-accent-fill" />
    </svg>
  );
}

/** A learner asks, the AI tutor answers with a hint, the learner gets it. */
function ChatArt() {
  return (
    <svg viewBox="0 0 160 120" className="art la-art" aria-hidden>
      <g className="la-msg" style={{ animationDelay: '0s' }}>
        <rect x="58" y="8" width="92" height="26" rx="12" className="art-card" />
        <path d="M70 21h50" className="art-line" />
        <circle cx="136" cy="21" r="3" className="art-ink" />
      </g>
      <g className="la-msg" style={{ animationDelay: '1s' }}>
        <rect x="10" y="44" width="100" height="30" rx="12" className="art-soft" />
        <circle cx="24" cy="59" r="7" className="art-accent-fill" />
        <path d="m21 59 2 2 4-4" className="art-bg-stroke" style={{ strokeWidth: 2 }} />
        <path d="M38 55h58M38 64h40" className="art-line art-faint" />
      </g>
      <g className="la-msg" style={{ animationDelay: '2s' }}>
        <rect x="78" y="84" width="72" height="26" rx="12" className="art-card" />
        <path d="m94 97 4 4 8-8" className="art-accent-stroke" />
        <path d="M114 97h22" className="art-line" />
      </g>
    </svg>
  );
}

/** A week calendar fills day by day, with Sunday off. */
function PlanArt() {
  return (
    <svg viewBox="0 0 160 120" className="art la-art" aria-hidden>
      <rect x="12" y="14" width="136" height="94" rx="12" className="art-card" />
      <path d="M12 38h136" className="art-line art-faint" />
      <path d="M44 8v12M116 8v12" className="art-line art-thick" />
      {Array.from({ length: 7 }, (_, i) => {
        const x = 22 + (i % 4) * 30;
        const y = i < 4 ? 48 : 78;
        return i === 6 ? (
          <text key={i} x={x + 10} y={y + 15} textAnchor="middle" className="art-label">zz</text>
        ) : (
          <rect key={i} x={x} y={y} width="20" height="20" rx="5" className="art-accent-fill la-fill" style={{ animationDelay: `${i * 0.35}s` }} />
        );
      })}
    </svg>
  );
}

/** A medal with sparkles. */
function QuizArt() {
  return (
    <svg viewBox="0 0 160 120" className="art la-art" aria-hidden>
      <path d="m66 10 10 34M94 10 84 44" className="art-line art-thick" />
      <g className="art-bob">
        <circle cx="80" cy="70" r="30" className="art-card art-shadow" />
        <circle cx="80" cy="70" r="20" className="art-accent-fill" />
        <path d="m71 70 6 6 12-12" className="art-bg-stroke" />
      </g>
      {[
        [30, 40],
        [130, 34],
        [124, 96],
        [36, 96],
      ].map(([x, y], i) => (
        <path
          key={i}
          d={`M${x} ${y - 7}v14M${x - 7} ${y}h14`}
          className="art-line la-sparkle"
          style={{ animationDelay: `${i * 0.4}s` }}
        />
      ))}
    </svg>
  );
}

const ARTS = [WelcomeArt, TrapsArt, LoopArt, LessonArt, ChatArt, PlanArt, QuizArt];

export default function LearnArt({ step }: { step: number }) {
  const A = ARTS[step] ?? WelcomeArt;
  return <A />;
}
