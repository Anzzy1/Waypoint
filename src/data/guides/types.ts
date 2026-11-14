/** Beginner-friendly, step-by-step content shown when a learner opens a lesson. */
export interface GuideStep {
  /** short step title */
  t: string;
  /** plain-language explanation of what to learn and why */
  d: string;
  /** a tiny hands-on exercise */
  try: string;
}

export interface LessonGuide {
  /** one plain sentence: what is this? */
  simple: string;
  /** three things you can do with it once you know it */
  uses: [string, string, string];
  /** what it actually looks like: a real snippet, plus optional output */
  example?: { file: string; code: string; output?: string; note: string };
  steps: GuideStep[];
  /** a small project that proves you learned it */
  project: string;
}
