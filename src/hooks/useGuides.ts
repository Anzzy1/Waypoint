import { useEffect, useState } from 'react';
import type { LessonGuide } from '../data/guides';

type Guides = Record<string, LessonGuide>;

/**
 * Lesson content is the biggest part of the site, so it lives in its own chunk and is fetched the
 * first time a roadmap page needs it (instead of on every first visit to the home page).
 */
let cache: Guides | null = null;
let pending: Promise<Guides> | null = null;

export function loadGuides(): Promise<Guides> {
  if (cache) return Promise.resolve(cache);
  pending ??= import('../data/guides').then((m) => (cache = m.GUIDES));
  return pending;
}

/** The guides once loaded (null for a moment on first use). */
export function useGuides(): Guides | null {
  const [guides, setGuides] = useState<Guides | null>(cache);
  useEffect(() => {
    if (guides) return;
    let live = true;
    loadGuides().then(
      (g) => live && setGuides(g),
      () => {
        pending = null; // offline / failed chunk: try again next time
      },
    );
    return () => {
      live = false;
    };
  }, [guides]);
  return guides;
}
