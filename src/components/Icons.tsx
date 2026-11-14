type P = { size?: number; className?: string };

const base = (size = 18) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
});

export const ArrowUpRight = ({ size, className }: P) => (
  <svg {...base(size)} className={className}><path d="M7 17 17 7M8 7h9v9" /></svg>
);
export const ArrowRight = ({ size, className }: P) => (
  <svg {...base(size)} className={className ? `i-arrow-r ${className}` : 'i-arrow-r'}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const ArrowLeft = ({ size, className }: P) => (
  <svg {...base(size)} className={className}><path d="M19 12H5M11 18l-6-6 6-6" /></svg>
);
export const Check = ({ size, className }: P) => (
  <svg {...base(size)} strokeWidth={3} className={className}><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
);
export const Close = ({ size, className }: P) => (
  <svg {...base(size)} className={className}><path d="M6 6l12 12M18 6 6 18" /></svg>
);
export const Clock = ({ size, className }: P) => (
  <svg {...base(size)} className={className}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
);
export const Play = ({ size, className }: P) => (
  <svg {...base(size)} className={className}><path d="M7 5v14l12-7z" fill="currentColor" /></svg>
);
export const Sun = ({ size, className }: P) => (
  <svg {...base(size)} className={className}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);
export const Moon = ({ size, className }: P) => (
  <svg {...base(size)} className={className}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
);
export const Hammer = ({ size, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="m15 12-8.4 8.4a2.1 2.1 0 0 1-3-3L12 9" />
    <path d="M17.6 15 22 10.6M20 12.6l-1.2-1.2a2 2 0 0 1-.6-1.4V8.8l-2.3-2.3A6 6 0 0 0 11.7 5H9l.9.8A6.2 6.2 0 0 1 12 10.5V12l2 2h1.2a2 2 0 0 1 1.4.6l1.2 1.2" />
  </svg>
);

export const Logo = ({ size = 28 }: P) => (
  <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
    <rect width="32" height="32" rx="8" fill="var(--primary)" />
    <path d="M9 23V16a4 4 0 0 1 4-4h6a4 4 0 0 0 4-4" fill="none" stroke="var(--on-primary)" strokeWidth="2.6" strokeLinecap="round" />
    <circle cx="9" cy="23" r="2.6" fill="var(--on-primary)" />
    <circle cx="23" cy="8" r="2.6" fill="#7fd49a" />
  </svg>
);
