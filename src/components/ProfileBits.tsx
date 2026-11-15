import { useRef, useState, type CSSProperties } from 'react';
import type { User } from '@supabase/supabase-js';
import { COLORS, googlePhoto, uploadAvatar, type AvatarMode } from '../lib/profile';
import Avatar from './Avatar';
import { Check } from './Icons';

export interface PhotoValue {
  avatarMode: AvatarMode;
  avatarUrl: string | null;
  color: string;
}

const UploadIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M12 16V4M7 9l5-5 5 5" />
    <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
  </svg>
);

/** Choose a profile photo: the Google one, an uploaded one, or initials on a colour. */
export function PhotoPicker({ user, name, value, onChange }: { user: User; name: string; value: PhotoValue; onChange: (v: PhotoValue) => void }) {
  const google = googlePhoto(user);
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pick = async (file: File | undefined) => {
    if (!file) return;
    setBusy(true);
    setError(null);
    const res = await uploadAvatar(user.id, file);
    setBusy(false);
    if (fileRef.current) fileRef.current.value = '';
    if (res.error) {
      setError(res.error);
      return;
    }
    onChange({ ...value, avatarMode: 'upload', avatarUrl: res.url ?? null });
  };

  const options: { mode: AvatarMode; title: string; desc: string; src: string | null }[] = [
    ...(google ? [{ mode: 'google' as const, title: 'Google photo', desc: 'The one on your Google account', src: google }] : []),
    {
      mode: 'upload',
      title: value.avatarUrl ? 'My photo' : 'Upload a photo',
      desc: value.avatarUrl ? 'Tap “Upload new” to replace it' : 'JPG, PNG or WebP',
      src: value.avatarUrl,
    },
    { mode: 'initials', title: 'Colourful initials', desc: 'Your initials on a colour you pick', src: null },
  ];

  return (
    <div className="photo-picker">
      <div className="photo-options" role="radiogroup" aria-label="Profile photo">
        {options.map((o, i) => {
          const on = value.avatarMode === o.mode;
          return (
            <button
              key={o.mode}
              type="button"
              role="radio"
              aria-checked={on}
              className={`photo-option${on ? ' on' : ''}`}
              style={{ '--i': i } as CSSProperties}
              onClick={() => {
                if (o.mode === 'upload' && !value.avatarUrl) fileRef.current?.click();
                else onChange({ ...value, avatarMode: o.mode });
              }}
            >
              <span className="photo-option-art">
                {o.mode === 'upload' && !o.src ? (
                  <span className="photo-upload-art">{busy ? <span className="spinner" /> : <UploadIcon />}</span>
                ) : (
                  <Avatar src={o.src} name={name} color={value.color} size={52} />
                )}
              </span>
              <span className="photo-option-text">
                <b>{o.title}</b>
                <span>{o.desc}</span>
              </span>
              <span className="photo-option-tick" aria-hidden>{on && <Check size={12} />}</span>
            </button>
          );
        })}
      </div>

      {value.avatarMode === 'upload' && value.avatarUrl && (
        <button type="button" className="btn btn-ghost photo-upload-btn" disabled={busy} onClick={() => fileRef.current?.click()}>
          {busy ? <span className="spinner" /> : <UploadIcon />} {busy ? 'Uploading…' : 'Upload new photo'}
        </button>
      )}

      {value.avatarMode === 'initials' && (
        <div className="swatches" role="radiogroup" aria-label="Avatar colour">
          {COLORS.map((c) => (
            <button
              key={c.id}
              type="button"
              role="radio"
              aria-checked={value.color === c.id}
              aria-label={c.id}
              className={`swatch${value.color === c.id ? ' on' : ''}`}
              style={{ '--av-a': c.a, '--av-b': c.b } as CSSProperties}
              onClick={() => onChange({ ...value, color: c.id })}
            >
              {value.color === c.id && <Check size={14} />}
            </button>
          ))}
        </div>
      )}

      {busy && !value.avatarUrl && <p className="small muted">Uploading your photo…</p>}
      {error && <div className="auth-alert bad" role="alert">{error}</div>}
      <input ref={fileRef} type="file" accept="image/png,image/jpeg,image/webp,image/gif" hidden onChange={(e) => pick(e.target.files?.[0])} />
    </div>
  );
}

/** A row of pill buttons where one (or none) can be picked. Tapping the picked one again clears it. */
export function ChoiceChips<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { id: T; label: string; desc?: string }[];
  value: T | null;
  onChange: (v: T | null) => void;
}) {
  return (
    <div className={`chips${options.some((o) => o.desc) ? ' chips-cards' : ''}`} role="radiogroup" aria-label={label}>
      {options.map((o, i) => {
        const on = value === o.id;
        return (
          <button
            key={o.id}
            type="button"
            role="radio"
            aria-checked={on}
            className={`chip-btn${on ? ' on' : ''}`}
            style={{ '--i': i } as CSSProperties}
            onClick={() => onChange(on ? null : o.id)}
          >
            <span className="chip-btn-tick" aria-hidden>{on && <Check size={11} />}</span>
            <span className="chip-btn-text">
              <b>{o.label}</b>
              {o.desc && <span>{o.desc}</span>}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/** Text input with a live character count. */
export function CountedField({
  label,
  hint,
  value,
  max,
  onChange,
  placeholder,
  prefix,
  autoFocus,
  id,
}: {
  label: string;
  hint?: string;
  value: string;
  max: number;
  onChange: (v: string) => void;
  placeholder?: string;
  prefix?: string;
  autoFocus?: boolean;
  id?: string;
}) {
  return (
    <label className="field pf-field">
      <span className="field-top">
        <span>{label}</span>
        <span className="mono small faint pf-count">{value.length}/{max}</span>
      </span>
      <span className={`pf-input${prefix ? ' has-prefix' : ''}`}>
        {prefix && <span className="pf-prefix mono">{prefix}</span>}
        <input id={id} value={value} maxLength={max} placeholder={placeholder} autoFocus={autoFocus} onChange={(e) => onChange(e.target.value)} />
      </span>
      {hint && <span className="pf-hint">{hint}</span>}
    </label>
  );
}
