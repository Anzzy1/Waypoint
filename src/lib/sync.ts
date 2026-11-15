/**
 * Everything a learner owns lives in localStorage under these keys. When they're logged in,
 * the same snapshot is mirrored to one row in Supabase (table `user_data`).
 *
 * Hooks call `notifyLocalChange()` after they write, so the sync manager can push.
 * The sync manager calls `writeLocal()` after a pull, which fires `waypoint:reload`
 * so every hook re-reads its key.
 */
export const KEYS = {
  progress: 'waypoint.progress.v1',
  plan: 'waypoint.plan.v1',
  steps: 'waypoint.steps.v1',
  celebrated: 'waypoint.celebrated.v1',
} as const;

export interface Snapshot {
  progress: string[];
  plan: { roadmap: string; hours: number } | null;
  steps: Record<string, number[]>;
  celebrated: string[];
}

const CHANGE = 'waypoint:change';
const RELOAD = 'waypoint:reload';

function read<T>(key: string, fallback: T): T {
  try {
    const v = JSON.parse(localStorage.getItem(key) || 'null');
    return v ?? fallback;
  } catch {
    return fallback;
  }
}

export function readLocal(): Snapshot {
  const plan = read<Snapshot['plan']>(KEYS.plan, null);
  return {
    progress: read<string[]>(KEYS.progress, []),
    plan: plan && typeof plan.roadmap === 'string' && typeof plan.hours === 'number' ? plan : null,
    steps: read<Record<string, number[]>>(KEYS.steps, {}),
    celebrated: read<string[]>(KEYS.celebrated, []),
  };
}

export function writeLocal(s: Snapshot) {
  try {
    localStorage.setItem(KEYS.progress, JSON.stringify(s.progress));
    if (s.plan) localStorage.setItem(KEYS.plan, JSON.stringify(s.plan));
    else localStorage.removeItem(KEYS.plan);
    localStorage.setItem(KEYS.steps, JSON.stringify(s.steps));
    localStorage.setItem(KEYS.celebrated, JSON.stringify(s.celebrated));
  } catch {
    /* storage blocked */
  }
  window.dispatchEvent(new Event(RELOAD));
}

/** Clean up whatever came back from the server so a malformed row can't break the app. */
export function normalise(raw: unknown): Snapshot {
  const r = (raw && typeof raw === 'object' ? raw : {}) as Partial<Snapshot>;
  const strings = (a: unknown) => (Array.isArray(a) ? a.filter((x): x is string => typeof x === 'string') : []);
  const steps: Record<string, number[]> = {};
  if (r.steps && typeof r.steps === 'object') {
    for (const [k, v] of Object.entries(r.steps)) {
      if (Array.isArray(v)) steps[k] = v.filter((n): n is number => typeof n === 'number');
    }
  }
  const plan = r.plan && typeof r.plan.roadmap === 'string' && typeof r.plan.hours === 'number' ? r.plan : null;
  return { progress: strings(r.progress), plan, steps, celebrated: strings(r.celebrated) };
}

/** First login on a device: keep everything from both sides, nothing is lost. */
export function merge(local: Snapshot, remote: Snapshot): Snapshot {
  const union = (a: string[], b: string[]) => [...new Set([...a, ...b])];
  const steps: Record<string, number[]> = { ...remote.steps };
  for (const [k, v] of Object.entries(local.steps)) steps[k] = [...new Set([...(steps[k] ?? []), ...v])];
  return {
    progress: union(remote.progress, local.progress),
    plan: remote.plan ?? local.plan,
    steps,
    celebrated: union(remote.celebrated, local.celebrated),
  };
}

export const notifyLocalChange = () => window.dispatchEvent(new Event(CHANGE));

export function onLocalChange(cb: () => void) {
  window.addEventListener(CHANGE, cb);
  return () => window.removeEventListener(CHANGE, cb);
}

export function onReload(cb: () => void) {
  window.addEventListener(RELOAD, cb);
  return () => window.removeEventListener(RELOAD, cb);
}

export function clearLocal() {
  writeLocal({ progress: [], plan: null, steps: {}, celebrated: [] });
}

/** "Reset progress": untick every lesson but keep the learner's plan, then push so the
 *  account copy is cleared too (otherwise the next pull would bring the old ticks back). */
export function resetProgress() {
  writeLocal({ ...readLocal(), progress: [], steps: {}, celebrated: [] });
  notifyLocalChange();
}
