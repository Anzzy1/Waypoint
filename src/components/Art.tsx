/**
 * Small hand-drawn glyphs and section illustrations, all in the site's line-art style.
 * Colours come from CSS classes (.art-*) so everything follows the light/dark theme.
 */

const glyphPaths = {
  api: <><path d="M4 8h13l-3-3M20 16H7l3 3" /></>,
  shield: <><path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6l-7-3Z" /><path d="m9 12 2 2 4-4" /></>,
  lock: <><rect x="5" y="10" width="14" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /><circle cx="12" cy="15" r="1.2" /></>,
  sparkle: <><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" /></>,
  chat: <><path d="M4 5h16v10H9l-5 4V5Z" /><path d="M8 9h8M8 12h5" /></>,
  search: <><ellipse cx="10" cy="6" rx="6" ry="2.5" /><path d="M4 6v8c0 1.4 2.7 2.5 6 2.5M16 6v4" /><circle cx="17" cy="16" r="3" /><path d="m19.2 18.2 2 2" /></>,
  nodes: <><circle cx="6" cy="6" r="2.2" /><circle cx="18" cy="6" r="2.2" /><circle cx="12" cy="18" r="2.2" /><circle cx="12" cy="11" r="1.6" /><path d="M7.7 7.5 10.7 10M16.3 7.5 13.3 10M12 12.6v3.2" /></>,
  layers: <><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 13 9 5 9-5" /></>,
  checklist: <><path d="M9 6h11M9 12h11M9 18h11" /><path d="m3.5 6 1.5 1.5L7.5 5M3.5 12l1.5 1.5 2.5-2.5M3.5 18l1.5 1.5 2.5-2.5" /></>,
  eye: <><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" /><circle cx="12" cy="12" r="2.8" /></>,
  network: <><rect x="9" y="3" width="6" height="5" rx="1" /><rect x="3" y="16" width="6" height="5" rx="1" /><rect x="15" y="16" width="6" height="5" rx="1" /><path d="M12 8v4M6 16v-4h12v4" /></>,
  gauge: <><path d="M4 17a8 8 0 1 1 16 0" /><path d="m12 17 4-5" /><circle cx="12" cy="17" r="1.3" /></>,
  access: <><circle cx="12" cy="4.5" r="1.8" /><path d="M5 8.5c4 1 10 1 14 0M12 9.5V14M12 14l-3 6M12 14l3 6" /></>,
  refresh: <><path d="M20 11a8 8 0 0 0-14-4.5L4 9M4 4v5h5M4 13a8 8 0 0 0 14 4.5l2-2.5M20 20v-5h-5" /></>,
  compass: <><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" /></>,
  phone: <><rect x="7" y="2.5" width="10" height="19" rx="2.5" /><path d="M11 18.5h2" /><circle cx="17" cy="6" r="3" className="art-accent-fill" /></>,
  cloud: <><path d="M7 18a4.5 4.5 0 0 1-.5-9A6 6 0 0 1 18 8.5a4.5 4.5 0 0 1-.5 9.5H7Z" /></>,
  branch: <><circle cx="6" cy="5" r="2" /><circle cx="6" cy="19" r="2" /><circle cx="18" cy="8" r="2" /><path d="M6 7v10M18 10c0 4-6 3-11.5 7.5" /></>,
  database: <><ellipse cx="12" cy="5.5" rx="7" ry="2.5" /><path d="M5 5.5v13c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-13M5 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5" /></>,
  speech: <><path d="M3 5h11v8H7l-4 3V5Z" /><path d="M10 16h7l4 3v-9h-3" /></>,
  bolt: <><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.8 3 2.8 15 0 18M12 3c-2.8 3-2.8 15 0 18" /></>,
  terminal: <><rect x="3" y="4" width="18" height="16" rx="2.5" /><path d="m7 9 3 3-3 3M12.5 15H17" /></>,
  puzzle: <><path d="M10 4a2 2 0 1 1 4 0v2h4v4h-2a2 2 0 1 0 0 4h2v4h-4v-2a2 2 0 1 0-4 0v2H6v-4H4a2 2 0 1 1 0-4h2V6h4V4Z" /></>,
  tree: <><rect x="9" y="3" width="6" height="4" rx="1" /><rect x="3" y="17" width="6" height="4" rx="1" /><rect x="15" y="17" width="6" height="4" rx="1" /><path d="M12 7v5M6 17v-2.5h12V17M12 12v2.5" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  brain: <><path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 6 1V5a2.5 2.5 0 0 0-3-1ZM15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-6 1" /></>,
  chart: <><path d="M4 20V4M4 20h16" /><path d="m7 15 4-4 3 3 5-6" /></>,
} as const;

export type GlyphKey = keyof typeof glyphPaths;

export function Glyph({ name, size = 20 }: { name: GlyphKey; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {glyphPaths[name]}
    </svg>
  );
}

/* ---------- "How it works" step illustrations (viewBox 120x80) ---------- */

function StepMap() {
  return (
    <svg viewBox="0 0 120 80" className="art step-art" aria-hidden>
      <path className="art-soft" d="M10 18 40 8l40 10 30-10v54L80 72 40 62 10 72Z" />
      <path className="art-line" d="M40 8v54M80 18v54" />
      <path className="art-line art-dash" d="M22 58c10-14 22-6 32-18s24-6 34-20" />
      <g className="art-bob">
        <path className="art-accent-fill" d="M88 6c-6 0-10 4.5-10 10 0 7 10 16 10 16s10-9 10-16c0-5.5-4-10-10-10Z" />
        <circle cx="88" cy="16" r="3.5" className="art-bg-fill" />
      </g>
    </svg>
  );
}

function StepBook() {
  return (
    <svg viewBox="0 0 120 80" className="art step-art" aria-hidden>
      <path className="art-card" d="M60 20c-12-8-28-9-42-6v52c14-3 30-2 42 6 12-8 28-9 42-6V14c-14-3-30-2-42 6Z" />
      <path className="art-line" d="M60 20v52" />
      <path className="art-line art-faint" d="M26 28c9-1 18 0 26 4M26 38c9-1 18 0 26 4M26 48c9-1 18 0 26 4" />
      <g className="art-type">
        <path className="art-accent-stroke" d="M68 32c8-4 17-5 26-4M68 42c8-4 17-5 26-4" />
      </g>
      <path className="art-accent-fill art-pop" d="m98 6 2.2 4.6 5 .7-3.6 3.5.9 5-4.5-2.4-4.5 2.4.9-5-3.6-3.5 5-.7Z" />
    </svg>
  );
}

function StepBuild() {
  return (
    <svg viewBox="0 0 120 80" className="art step-art" aria-hidden>
      <rect className="art-card" x="14" y="44" width="30" height="22" rx="3" />
      <rect className="art-card" x="46" y="44" width="30" height="22" rx="3" />
      <rect className="art-card art-drop" x="30" y="20" width="30" height="22" rx="3" />
      <circle className="art-accent-fill art-pop" cx="96" cy="34" r="14" />
      <path className="art-bg-stroke art-pop" d="m89 34 5 5 9-10" />
    </svg>
  );
}

export function StepArt({ step }: { step: number }) {
  return step === 0 ? <StepMap /> : step === 1 ? <StepBook /> : <StepBuild />;
}

/* ---------- 404 illustration ---------- */
export function LostArt() {
  return (
    <svg viewBox="0 0 320 160" className="art lost-art" aria-hidden>
      <path className="art-line art-dash art-draw" d="M20 130c40-10 50-50 90-50s50 40 90 30 40-50 70-60" />
      <circle className="art-card" cx="20" cy="130" r="7" />
      <g className="art-bob">
        <rect className="art-card" x="258" y="18" width="44" height="44" rx="10" />
        <text x="280" y="50" textAnchor="middle" className="art-q">?</text>
      </g>
      <path className="art-line" d="M280 62v40" />
    </svg>
  );
}
