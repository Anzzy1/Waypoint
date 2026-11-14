import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { notifyLocalChange, onReload } from '../lib/sync';

const KEY = 'waypoint.progress.v1';

function load(): Set<string> {
  try {
    const raw = localStorage.getItem(KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return new Set(Array.isArray(arr) ? arr : []);
  } catch {
    return new Set();
  }
}

interface ProgressCtx {
  isDone: (id: string) => boolean;
  toggle: (id: string) => void;
  setDone: (id: string, value: boolean) => void;
  reset: (ids: string[]) => void;
  countDone: (ids: string[]) => number;
}

const Ctx = createContext<ProgressCtx | null>(null);

/** Completed lessons live in localStorage. Topic ids are shared, so finishing "Git"
 *  in one roadmap marks it done in every roadmap that includes it. */
export function ProgressProvider({ children }: { children: ReactNode }) {
  const [done, setDoneSet] = useState<Set<string>>(load);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify([...done]));
      notifyLocalChange();
    } catch {
      /* storage unavailable (private mode): progress just won't persist */
    }
  }, [done]);

  // keep multiple open tabs in sync
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) setDoneSet(load());
    };
    window.addEventListener('storage', onStorage);
    // the account sync replaced local data
    const offReload = onReload(() => setDoneSet(load()));
    return () => {
      window.removeEventListener('storage', onStorage);
      offReload();
    };
  }, []);

  const setDone = useCallback((id: string, value: boolean) => {
    setDoneSet((prev) => {
      if (prev.has(id) === value) return prev;
      const next = new Set(prev);
      if (value) next.add(id);
      else next.delete(id);
      return next;
    });
  }, []);

  const value = useMemo<ProgressCtx>(
    () => ({
      isDone: (id) => done.has(id),
      toggle: (id) => setDone(id, !done.has(id)),
      setDone,
      reset: (ids) =>
        setDoneSet((prev) => {
          const next = new Set(prev);
          ids.forEach((id) => next.delete(id));
          return next;
        }),
      countDone: (ids) => ids.filter((id) => done.has(id)).length,
    }),
    [done, setDone],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useProgress() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useProgress must be used inside <ProgressProvider>');
  return ctx;
}
