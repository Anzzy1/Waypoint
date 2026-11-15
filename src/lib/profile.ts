import type { User } from '@supabase/supabase-js';
import { supabase } from './supabase';

/**
 * A learner's public-facing profile: the name we call them, their photo and a few facts about them.
 * Stored in Supabase `user_metadata.waypoint` (small, so it fits in the login token). Uploaded photos
 * live in the `avatars` storage bucket (see supabase/avatars.sql).
 */
const META_KEY = 'waypoint';
const BUCKET = 'avatars';

export type AvatarMode = 'google' | 'upload' | 'initials';
export type Level = 'new' | 'basics' | 'working';
export type Goal = 'first-job' | 'switch' | 'school' | 'level-up' | 'projects';

export interface Profile {
  name: string;
  avatarMode: AvatarMode;
  /** public URL of an uploaded photo */
  avatarUrl: string | null;
  /** colour of the initials avatar, a key of COLORS */
  color: string;
  headline: string;
  level: Level | null;
  goal: Goal | null;
  github: string;
  /** finished (or skipped) the first-login setup */
  onboarded: boolean;
}

export const COLORS = [
  { id: 'mint', a: '#7fd49a', b: '#1f6b45' },
  { id: 'ocean', a: '#7cc4ff', b: '#1d4ed8' },
  { id: 'sunset', a: '#ffb86b', b: '#e8455c' },
  { id: 'grape', a: '#c4a5ff', b: '#6d3fd1' },
  { id: 'lemon', a: '#ffd76a', b: '#d97706' },
  { id: 'slate', a: '#a7bac4', b: '#37474f' },
] as const;

export const LEVELS: { id: Level; label: string; desc: string }[] = [
  { id: 'new', label: 'Just starting', desc: 'New to coding, or close to it' },
  { id: 'basics', label: 'Know the basics', desc: 'Built a few small things' },
  { id: 'working', label: 'Already a developer', desc: 'Learning a new area' },
];

export const GOALS: { id: Goal; label: string }[] = [
  { id: 'first-job', label: 'Get my first dev job' },
  { id: 'switch', label: 'Switch careers' },
  { id: 'school', label: 'For school' },
  { id: 'level-up', label: 'Level up at work' },
  { id: 'projects', label: 'Build my own projects' },
];

export const NAME_MAX = 40;
export const HEADLINE_MAX = 80;

const text = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

/** The photo from their Google account, if they logged in with Google. */
export function googlePhoto(user: User): string | null {
  const m = user.user_metadata ?? {};
  const fromMeta = m.avatar_url || m.picture;
  if (typeof fromMeta === 'string' && fromMeta) return fromMeta;
  const d = user.identities?.find((i) => i.provider === 'google')?.identity_data ?? {};
  const fromIdentity = d.avatar_url || d.picture;
  return typeof fromIdentity === 'string' && fromIdentity ? fromIdentity : null;
}

/** Names to offer as one-tap choices: full name, first name, the part of the email before @. */
export function suggestedNames(user: User): string[] {
  const m = user.user_metadata ?? {};
  const full = text(m.full_name || m.name, NAME_MAX);
  const first = full.split(/\s+/)[0] ?? '';
  const fromEmail = (user.email?.split('@')[0] ?? '').replace(/[._-]+/g, ' ').replace(/\d+$/, '').trim();
  const nice = fromEmail ? fromEmail[0].toUpperCase() + fromEmail.slice(1) : '';
  const seen = new Set<string>();
  return [first, full, nice]
    .filter((n) => n.length > 0 && !seen.has(n.toLowerCase()) && seen.add(n.toLowerCase()))
    .slice(0, 3);
}

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export function readProfile(user: User): Profile {
  const m = user.user_metadata ?? {};
  const raw = (m[META_KEY] && typeof m[META_KEY] === 'object' ? m[META_KEY] : {}) as Record<string, unknown>;
  const photo = googlePhoto(user);
  const mode = raw.avatarMode === 'google' || raw.avatarMode === 'upload' || raw.avatarMode === 'initials' ? raw.avatarMode : photo ? 'google' : 'initials';
  return {
    name: text(raw.name, NAME_MAX) || suggestedNames(user)[0] || 'Learner',
    avatarMode: mode,
    avatarUrl: typeof raw.avatarUrl === 'string' && raw.avatarUrl ? raw.avatarUrl : null,
    color: COLORS.some((c) => c.id === raw.color) ? (raw.color as string) : COLORS[hash(user.id) % COLORS.length].id,
    headline: text(raw.headline, HEADLINE_MAX),
    level: LEVELS.some((l) => l.id === raw.level) ? (raw.level as Level) : null,
    goal: GOALS.some((g) => g.id === raw.goal) ? (raw.goal as Goal) : null,
    github: cleanGithub(typeof raw.github === 'string' ? raw.github : ''),
    onboarded: raw.onboarded === true,
  };
}

/** The image to show for this profile, or null for the initials avatar. */
export function avatarSrc(p: Pick<Profile, 'avatarMode' | 'avatarUrl'>, user: User): string | null {
  if (p.avatarMode === 'upload') return p.avatarUrl;
  if (p.avatarMode === 'google') return googlePhoto(user);
  return null;
}

export function initialsOf(name: string) {
  return (
    name
      .split(/[\s._-]+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0]!.toUpperCase())
      .join('') || '?'
  );
}

export function colorOf(id: string) {
  return COLORS.find((c) => c.id === id) ?? COLORS[0];
}

/** Accepts "octocat", "@octocat" or a github.com link; keeps only a valid username. */
export function cleanGithub(v: string) {
  return v
    .trim()
    .replace(/^https?:\/\/(www\.)?github\.com\//i, '')
    .replace(/^@/, '')
    .split(/[/?#]/)[0]
    .replace(/[^A-Za-z0-9-]/g, '')
    .slice(0, 39);
}

export async function saveProfile(user: User, patch: Partial<Profile>): Promise<{ user?: User; error?: string }> {
  if (!supabase) return { error: 'Login is not set up yet.' };
  const next: Profile = { ...readProfile(user), ...patch };
  next.name = text(next.name, NAME_MAX) || readProfile(user).name;
  next.headline = text(next.headline, HEADLINE_MAX);
  next.github = cleanGithub(next.github);
  const { data, error } = await supabase.auth.updateUser({ data: { [META_KEY]: next } });
  if (error) return { error: error.message };
  if (data.user && next.avatarMode === 'upload') void removeOldAvatars(user.id, next.avatarUrl);
  return { user: data.user ?? undefined };
}

/* ---------- photo upload ---------- */

/** Crop to a centred square and shrink to 256px, so uploads are small and load fast. */
async function toSquare(file: File, size = 256): Promise<Blob> {
  const bmp = await createImageBitmap(file);
  const s = Math.min(bmp.width, bmp.height);
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('no canvas');
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(bmp, (bmp.width - s) / 2, (bmp.height - s) / 2, s, s, 0, 0, size, size);
  bmp.close?.();
  const as = (type: string, q: number) => new Promise<Blob | null>((r) => canvas.toBlob(r, type, q));
  const webp = await as('image/webp', 0.86);
  if (webp && webp.type === 'image/webp') return webp;
  const jpg = await as('image/jpeg', 0.88);
  if (!jpg) throw new Error('encode failed');
  return jpg;
}

export async function uploadAvatar(uid: string, file: File): Promise<{ url?: string; error?: string }> {
  if (!supabase) return { error: 'Login is not set up yet.' };
  if (!file.type.startsWith('image/')) return { error: 'Please choose an image (JPG, PNG or WebP).' };
  if (file.size > 10 * 1024 * 1024) return { error: 'That image is bigger than 10 MB. Please choose a smaller one.' };
  let blob: Blob;
  try {
    blob = await toSquare(file);
  } catch {
    return { error: 'We couldn’t read that image. Try a JPG or PNG.' };
  }
  const path = `${uid}/${Date.now()}.${blob.type === 'image/webp' ? 'webp' : 'jpg'}`;
  const bucket = supabase.storage.from(BUCKET);
  const { error } = await bucket.upload(path, blob, { contentType: blob.type, cacheControl: '31536000', upsert: false });
  if (error) {
    return {
      error: /bucket not found|not found/i.test(error.message)
        ? 'Photo uploads aren’t switched on yet. Run supabase/avatars.sql in the Supabase SQL Editor.'
        : /row-level security|policy|unauthorized/i.test(error.message)
          ? 'Photo uploads aren’t allowed yet. Run supabase/avatars.sql in the Supabase SQL Editor.'
          : error.message,
    };
  }
  return { url: bucket.getPublicUrl(path).data.publicUrl };
}

/** Delete this user's uploaded photos except `keepUrl` (all of them when it's null). Best effort. */
export async function removeOldAvatars(uid: string, keepUrl: string | null) {
  if (!supabase) return;
  try {
    const bucket = supabase.storage.from(BUCKET);
    const { data } = await bucket.list(uid);
    const old = (data ?? []).map((f) => `${uid}/${f.name}`).filter((p) => !keepUrl || !keepUrl.endsWith(`/${p}`));
    if (old.length) await bucket.remove(old);
  } catch {
    /* ignore */
  }
}
