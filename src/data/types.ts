export type ResourceKind = 'video' | 'docs' | 'course' | 'practice' | 'article' | 'book';

export interface Resource {
  label: string;
  url: string;
  kind: ResourceKind;
}

/** A single lesson. Topics live in one shared library so progress syncs across roadmaps. */
export interface Topic {
  id: string;
  title: string;
  /** rough hours to get comfortable */
  hours: number;
  summary: string;
  points: string[];
  resources: Resource[];
  /** optional in-app page with the full guide for this lesson */
  guide?: string;
}

export interface Stage {
  title: string;
  summary: string;
  topics: string[];
  project?: string;
}

export interface Roadmap {
  id: string;
  title: string;
  tagline: string;
  role: string;
  level: string;
  duration: string;
  outcomes: string[];
  stages: Stage[];
  /** set when hiring data shows strong current demand; `note` is a short, sourced evidence line */
  hot?: { note: string; rank: number };
}
