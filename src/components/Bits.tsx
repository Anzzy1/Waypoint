import { Check, Logo } from './Icons';

export function ProgressBar({ value, label }: { value: number; label?: string }) {
  const pct = Math.round(value * 100);
  return (
    <div
      className={`bar${pct === 100 ? ' bar-done' : ''}`}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pct}
      aria-label={label ?? 'Progress'}
    >
      <span style={{ width: `${pct}%` }} />
    </div>
  );
}

export function Checkbox({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <label className="check">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="check-box" aria-hidden>
        <Check size={14} />
      </span>
      <span className="sr-only">{label}</span>
    </label>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="brand">
          <Logo size={22} />
          <span>Waypoint</span>
        </div>
        <p className="muted small">
          Free developer roadmaps. Progress is saved in your browser. Resources link to their original creators.
        </p>
        <p className="mono faint small">© {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
