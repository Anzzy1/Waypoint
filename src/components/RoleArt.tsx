/**
 * One small illustrated scene per roadmap, in the same line-art style as the diagrams.
 * Decorative (aria-hidden): the roadmap title is always next to it.
 */
import type { ReactElement } from 'react';
const Frontend = () => (
  <>
    <rect x="44" y="14" width="152" height="94" rx="10" className="art-card" />
    <path d="M44 32h152" className="art-line" />
    <circle cx="56" cy="23" r="3" className="art-dot" />
    <circle cx="66" cy="23" r="3" className="art-dot" />
    <circle cx="76" cy="23" r="3" className="art-dot" />
    <rect x="58" y="42" width="72" height="12" rx="3" className="art-ink" />
    <rect x="58" y="60" width="96" height="6" rx="3" className="art-soft" />
    <rect x="58" y="71" width="80" height="6" rx="3" className="art-soft" />
    <rect x="58" y="84" width="40" height="14" rx="7" className="art-accent-fill" />
    <rect x="146" y="42" width="38" height="38" rx="6" className="art-soft" />
    <path d="M152 74l9-11 7 8 5-5 9 8" className="art-line" />
    <path className="art-cursor art-nudge" d="M104 88v18l5-5 5 9 4-2-5-9h7z" />
  </>
);

const Backend = () => (
  <>
    {[18, 46, 74].map((y, i) => (
      <g key={y}>
        <rect x="40" y={y} width="88" height="24" rx="5" className="art-card" />
        <path d={`M52 ${y + 12}h36`} className="art-line art-faint" />
        <circle cx="112" cy={y + 12} r="3.5" className="art-accent-fill art-blink" style={{ animationDelay: `${i * 0.4}s` }} />
      </g>
    ))}
    <path d="M132 60h28" className="art-line art-dash art-flow" />
    <path d="m156 55 6 5-6 5" className="art-line" />
    <ellipse cx="190" cy="34" rx="24" ry="8" className="art-card" />
    <path d="M166 34v52c0 4.4 10.7 8 24 8s24-3.6 24-8V34" className="art-card" />
    <path d="M166 52c0 4.4 10.7 8 24 8s24-3.6 24-8M166 70c0 4.4 10.7 8 24 8s24-3.6 24-8" className="art-line" />
  </>
);

const Fullstack = () => (
  <>
    <rect x="60" y="10" width="120" height="30" rx="7" className="art-card" />
    <rect x="72" y="20" width="40" height="10" rx="3" className="art-ink" />
    <rect x="148" y="19" width="22" height="12" rx="6" className="art-accent-fill" />
    <rect x="60" y="46" width="120" height="30" rx="7" className="art-card" />
    <path d="M74 61h50" className="art-line art-faint" />
    <circle cx="164" cy="61" r="3.5" className="art-accent-fill art-blink" />
    <rect x="60" y="82" width="120" height="30" rx="7" className="art-card" />
    <ellipse cx="120" cy="97" rx="18" ry="6" className="art-line" />
    <path d="M38 25v72" className="art-line art-dash" />
    <circle cx="38" cy="25" r="5" className="art-accent-fill art-travel" />
    <text x="196" y="29" className="art-label">UI</text>
    <text x="196" y="65" className="art-label">API</text>
    <text x="196" y="101" className="art-label">DB</text>
  </>
);

const Ai = () => (
  <>
    <path d="M30 22h96a10 10 0 0 1 10 10v34a10 10 0 0 1-10 10H62l-18 14V76H30a10 10 0 0 1-10-10V32a10 10 0 0 1 10-10Z" className="art-card" />
    <rect x="34" y="38" width="80" height="7" rx="3.5" className="art-soft" />
    <rect x="34" y="52" width="58" height="7" rx="3.5" className="art-soft" />
    <g className="art-type">
      <circle cx="102" cy="56" r="2.5" className="art-dot" />
      <circle cx="110" cy="56" r="2.5" className="art-dot" />
      <circle cx="118" cy="56" r="2.5" className="art-dot" />
    </g>
    {[
      [168, 30], [206, 44], [176, 74], [214, 92], [150, 96],
    ].map(([x, y], i, all) => (
      <g key={i}>
        {all.slice(i + 1).map(([x2, y2]) => (
          <path key={`${x2}${y2}`} d={`M${x} ${y}L${x2} ${y2}`} className="art-line art-faint" />
        ))}
      </g>
    ))}
    {[
      [168, 30], [206, 44], [176, 74], [214, 92], [150, 96],
    ].map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r={i === 2 ? 7 : 5} className={i === 2 ? 'art-accent-fill art-blink' : 'art-card'} />
    ))}
  </>
);

const LOOP = 'M120 60c-18-26-58-26-58 0s40 26 58 0 58-26 58 0-40 26-58 0Z';
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const Devops = () => (
  <>
    <path d={LOOP} className="art-line art-thick" />
    {/* SMIL follows the curve in every browser; reduced motion gets a still dot */}
    {reducedMotion() ? (
      <circle cx="120" cy="60" r="6" className="art-accent-fill" />
    ) : (
      <circle r="6" className="art-accent-fill">
        <animateMotion dur="5s" repeatCount="indefinite" path={LOOP} />
      </circle>
    )}
    <text x="62" y="102" className="art-label" textAnchor="middle">build</text>
    <text x="120" y="102" className="art-label" textAnchor="middle">test</text>
    <text x="178" y="102" className="art-label" textAnchor="middle">deploy</text>
    <text x="62" y="24" className="art-label" textAnchor="middle">plan</text>
    <text x="178" y="24" className="art-label" textAnchor="middle">monitor</text>
  </>
);

const Mobile = () => (
  <>
    <rect x="88" y="6" width="64" height="110" rx="12" className="art-card" />
    <path d="M112 14h16" className="art-line" />
    {[26, 52, 78].map((y, i) => (
      <g key={y}>
        <rect x="96" y={y} width="48" height="20" rx="5" className={i === 0 ? 'art-ink' : 'art-soft'} />
      </g>
    ))}
    <g className="art-notify">
      <rect x="150" y="18" width="70" height="26" rx="8" className="art-card art-shadow" />
      <circle cx="162" cy="31" r="5" className="art-accent-fill" />
      <rect x="172" y="27" width="38" height="7" rx="3.5" className="art-soft" />
    </g>
    <rect x="22" y="70" width="56" height="26" rx="8" className="art-card" />
    <path d="M32 83h20" className="art-line art-faint" />
    <circle cx="66" cy="83" r="4" className="art-accent-fill art-blink" />
  </>
);

const ORBIT = 'M120 60m-92 0a92 30 0 1 0 184 0a92 30 0 1 0-184 0';

const Cloud = () => (
  <>
    <path d="M78 64a20 20 0 0 1 4-39.6A28 28 0 0 1 136 22a22 22 0 0 1 26 21 18 18 0 0 1-2 36H86a16 16 0 0 1-8-15Z" className="art-card" />
    <path d="M100 52h44M100 62h28" className="art-line art-faint" />
    {[60, 108, 156].map((x, i) => (
      <g key={x}>
        <path d={`M${x + 12} 79v10`} className="art-line art-dash" />
        <rect x={x} y="90" width="24" height="18" rx="4" className="art-card" />
        <circle cx={x + 17} cy="99" r="2.5" className="art-accent-fill art-blink" style={{ animationDelay: `${i * 0.5}s` }} />
      </g>
    ))}
    <path d={ORBIT} className="art-line art-faint art-dash" />
    {reducedMotion() ? (
      <circle cx="212" cy="60" r="5" className="art-accent-fill" />
    ) : (
      <circle r="5" className="art-accent-fill">
        <animateMotion dur="6s" repeatCount="indefinite" path={ORBIT} />
      </circle>
    )}
  </>
);

const Agents = () => {
  const tools: [number, number, string][] = [
    [40, 26, 'search'],
    [200, 26, 'code'],
    [40, 94, 'data'],
    [200, 94, 'email'],
  ];
  return (
    <>
      {tools.map(([x, y]) => (
        <path key={`${x}${y}`} d={`M120 60L${x} ${y}`} className="art-line art-faint art-dash art-flow" />
      ))}
      {tools.map(([x, y, label]) => (
        <g key={label}>
          <rect x={x - 26} y={y - 12} width="52" height="24" rx="7" className="art-card" />
          <text x={x} y={y + 4} textAnchor="middle" className="art-label">{label}</text>
        </g>
      ))}
      <rect x="96" y="36" width="48" height="48" rx="14" className="art-ink" />
      <path d="M120 46v6M120 68v6M110 60h-6M136 60h-6M113 53l-3-3M130 70l-3-3M127 53l3-3M110 70l3-3" className="art-bg-stroke" style={{ strokeWidth: 2 }} />
      <circle cx="120" cy="60" r="4" className="art-accent-fill art-blink" />
    </>
  );
};

const SCENES: Record<string, () => ReactElement> = {
  cloud: Cloud,
  agents: Agents,
  frontend: Frontend,
  backend: Backend,
  fullstack: Fullstack,
  ai: Ai,
  devops: Devops,
  mobile: Mobile,
};

export default function RoleArt({ role, className = '' }: { role: string; className?: string }) {
  const Scene = SCENES[role];
  if (!Scene) return null;
  return (
    <svg viewBox="0 0 240 120" className={`art role-art ${className}`} aria-hidden>
      <Scene />
    </svg>
  );
}
