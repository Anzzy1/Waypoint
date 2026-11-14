import type { LessonGuide } from './types';
import { FRONTEND_GUIDES } from './frontend';
import { BACKEND_GUIDES } from './backend';
import { DEVOPS_GUIDES } from './devops';
import { AI_GUIDES } from './ai';
import { MOBILE_GUIDES } from './mobile';

export type { LessonGuide, GuideStep } from './types';

/** Step-by-step lesson content, keyed by topic id. */
export const GUIDES: Record<string, LessonGuide> = {
  ...FRONTEND_GUIDES,
  ...BACKEND_GUIDES,
  ...DEVOPS_GUIDES,
  ...AI_GUIDES,
  ...MOBILE_GUIDES,
};
