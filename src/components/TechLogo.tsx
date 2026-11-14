import { useState } from 'react';
import { LOGOS } from '../data/logos';
import { TOPIC_ICONS } from '../data/topicIcons';
import { Glyph } from './Art';

export const CDN = 'https://cdn.jsdelivr.net/npm/devicon@2.16.0/icons/';

/** Unique Devicon paths for a list of tech names, in order (names without a brand logo are skipped). */
export function logoPathsFor(names: string[]): string[] {
  return [...new Set(names.flatMap((n) => LOGOS[n]?.logos ?? []))];
}

function initials(name: string) {
  return name
    .replace(/\(.*?\)/g, '')
    .split(/[\s/+&,]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join('');
}

/** Icon tile for a lesson (logo or glyph), used on the roadmap page's lesson tiles. */
export function TopicIcon({ id }: { id: string }) {
  const icon = TOPIC_ICONS[id];
  const [failed, setFailed] = useState(false);
  if (icon && 'logo' in icon && !failed) {
    return (
      <span className="logo-tile topic-icon" aria-hidden>
        <img src={`${CDN}${icon.logo}.svg`} alt="" loading="lazy" decoding="async" onError={() => setFailed(true)} />
      </span>
    );
  }
  return (
    <span className="logo-tile logo-glyph topic-icon" aria-hidden>
      <Glyph name={icon && 'glyph' in icon ? icon.glyph : 'sparkle'} size={20} />
    </span>
  );
}

/**
 * Logo tile for a technology: real logos (up to two, overlapped) when the tech has a brand,
 * a drawn glyph for concepts, initials if a logo fails to load. Purely decorative: the name
 * is always shown next to it, so images use empty alt text.
 */
export default function TechLogo({ name, size = 'lg' }: { name: string; size?: 'lg' | 'sm' }) {
  const spec = LOGOS[name];
  const [failed, setFailed] = useState(false);
  const logos = !failed ? spec?.logos ?? [] : [];

  if (logos.length) {
    return (
      <span className={`tech-logo tech-logo-${size}${logos.length > 1 ? ' tech-logo-duo' : ''}`} aria-hidden>
        {logos.slice(0, 2).map((path) => (
          <span key={path} className="logo-tile">
            <img src={`${CDN}${path}.svg`} alt="" loading="lazy" decoding="async" onError={() => setFailed(true)} />
          </span>
        ))}
      </span>
    );
  }

  return (
    <span className={`tech-logo tech-logo-${size}`} aria-hidden>
      <span className="logo-tile logo-glyph">
        {spec?.glyph ? <Glyph name={spec.glyph} size={size === 'lg' ? 20 : 12} /> : <b>{initials(name)}</b>}
      </span>
    </span>
  );
}
