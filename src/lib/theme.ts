import { useEffect, useState } from 'react';

/** Light, dark, or follow the device. Shared by the nav toggle and the Settings page. */
export type ThemePref = 'light' | 'dark' | 'system';

const KEY = 'waypoint.theme';
const EVENT = 'waypoint:theme';
const media = () => window.matchMedia('(prefers-color-scheme: dark)');

export function readThemePref(): ThemePref {
  try {
    const t = localStorage.getItem(KEY);
    if (t === 'light' || t === 'dark') return t;
  } catch {
    /* ignore */
  }
  return 'system';
}

export function resolveTheme(pref: ThemePref): 'light' | 'dark' {
  return pref === 'system' ? (media().matches ? 'dark' : 'light') : pref;
}

export function setThemePref(pref: ThemePref) {
  try {
    localStorage.setItem(KEY, pref);
  } catch {
    /* ignore */
  }
  // "system" removes the override so the CSS media query decides
  if (pref === 'system') delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme = pref;
  window.dispatchEvent(new Event(EVENT));
}

export function useTheme() {
  const [pref, setPref] = useState<ThemePref>(readThemePref);
  const [resolved, setResolved] = useState(() => resolveTheme(readThemePref()));
  useEffect(() => {
    const sync = () => {
      const p = readThemePref();
      setPref(p);
      setResolved(resolveTheme(p));
    };
    const mq = media();
    window.addEventListener(EVENT, sync);
    mq.addEventListener('change', sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      mq.removeEventListener('change', sync);
    };
  }, []);
  return { pref, resolved, setPref: setThemePref };
}
