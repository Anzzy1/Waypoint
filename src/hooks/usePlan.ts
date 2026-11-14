import { useCallback, useEffect, useState } from 'react';
import { notifyLocalChange, onReload } from '../lib/sync';

const KEY = 'waypoint.plan.v1';

export interface Plan {
  roadmap: string;
  hours: number; // per week
}

const DEFAULT_PLAN: Plan = { roadmap: 'frontend', hours: 7 };

function readPlan(): Plan | null {
  try {
    const p = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (p && typeof p.roadmap === 'string' && typeof p.hours === 'number') return p;
  } catch {
    /* ignore */
  }
  return null;
}

/** The learner's weekly plan, saved in localStorage. `saved` is false until they set one. */
export function usePlan() {
  const [stored, setStored] = useState<Plan | null>(readPlan);
  useEffect(() => onReload(() => setStored(readPlan())), []);

  const update = useCallback((patch: Partial<Plan>) => {
    setStored((prev) => {
      const next = { ...(prev ?? DEFAULT_PLAN), ...patch };
      try {
        localStorage.setItem(KEY, JSON.stringify(next));
        notifyLocalChange();
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  return { plan: stored ?? DEFAULT_PLAN, saved: stored !== null, update };
}

export function estimateFinish(remainingHours: number, hoursPerWeek: number) {
  const weeks = Math.max(1, Math.ceil(remainingHours / Math.max(1, hoursPerWeek)));
  const date = new Date(Date.now() + weeks * 7 * 24 * 3600 * 1000);
  return {
    weeks,
    date: date.toLocaleDateString(undefined, { month: 'long', year: 'numeric' }),
  };
}
