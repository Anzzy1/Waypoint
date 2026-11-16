/** The roadmap the learner opened most recently, so the home page can offer to continue it. Device-only. */
const KEY = 'waypoint.lastRoadmap.v1';

export function readLastRoadmap(): string | null {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

export function saveLastRoadmap(id: string) {
  try {
    localStorage.setItem(KEY, id);
  } catch {
    /* storage blocked: the home page falls back to the roadmap with the most progress */
  }
}
