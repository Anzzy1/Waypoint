import { useEffect, useState, type CSSProperties } from 'react';
import { colorOf, initialsOf } from '../lib/profile';

/**
 * Round profile picture: the photo when there is one, otherwise initials on a colour gradient.
 * A photo that fails to load (expired Google link, deleted file) falls back to the initials.
 */
export default function Avatar({ src, name, color, size = 36, className = '' }: { src: string | null; name: string; color: string; size?: number; className?: string }) {
  const [broken, setBroken] = useState(false);
  useEffect(() => setBroken(false), [src]);
  const c = colorOf(color);
  const style = { '--av-size': `${size}px`, '--av-a': c.a, '--av-b': c.b } as CSSProperties;
  return (
    <span className={`avatar ${className}`} style={style} aria-hidden>
      {src && !broken ? (
        <img src={src} alt="" referrerPolicy="no-referrer" onError={() => setBroken(true)} />
      ) : (
        <span className="avatar-initials">{initialsOf(name)}</span>
      )}
    </span>
  );
}
