import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import type { User } from '@supabase/supabase-js';
import { siteUrl, supabase } from '../lib/supabase';
import { clearLocal, merge, normalise, onLocalChange, readLocal, writeLocal } from '../lib/sync';
import { avatarSrc, colorOf, initialsOf, readProfile, removeOldAvatars, saveProfile, type Profile } from '../lib/profile';

export type SyncStatus = 'off' | 'syncing' | 'synced' | 'error';

/** What the login pop-up shows: the first-visit welcome, the “keep your progress” nudge, or the login form. */
export type AuthModal = { view: 'welcome' } | { view: 'nudge'; count: number } | { view: 'login' };

interface AuthCtx {
  /** false when Supabase isn't configured (no .env): login UI explains how to set it up */
  enabled: boolean;
  /** true until the first session check finishes */
  loading: boolean;
  user: User | null;
  sync: SyncStatus;
  lastSynced: Date | null;
  /** Google login (redirects away and back) */
  signInWithGoogle: () => Promise<string | null>;
  /** email login, step 1: email a 6-digit code (creates the account if it's new) */
  sendCode: (email: string) => Promise<string | null>;
  /** email login, step 2: check the code */
  verifyCode: (email: string, code: string) => Promise<string | null>;
  signOut: () => Promise<void>;
  /** save profile fields (name, photo, headline…); returns an error message or null */
  updateProfile: (patch: Partial<Profile>) => Promise<string | null>;
  deleteAccount: () => Promise<string | null>;
  modal: AuthModal | null;
  openAuth: (m: AuthModal) => void;
  closeAuth: () => void;
}

const Ctx = createContext<AuthCtx | null>(null);
const RETURN_KEY = 'waypoint.authReturn';
const TABLE = 'user_data';

/** Turn Supabase's raw email errors into something a learner can act on. */
function friendlySendError(msg: string) {
  const m = msg.toLowerCase();
  if (m.includes('rate limit') || m.includes('security purposes') || m.includes('seconds')) {
    return 'Too many tries for now. Wait a minute, then send a new code.';
  }
  if (m.includes('invalid') && m.includes('email')) return 'That email address doesn’t look right. Check it and try again.';
  if (m.includes('sending') || m.includes('smtp') || m.includes('email')) {
    return 'We couldn’t send the email right now. Try again in a moment, or continue with Google.';
  }
  return msg;
}

/** Remember which page to come back to after the Google redirect. */
function rememberReturn() {
  try {
    const here = window.location.hash.replace(/^#/, '') || '/';
    sessionStorage.setItem(RETURN_KEY, here.startsWith('/login') ? '/account' : here);
  } catch {
    /* ignore */
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(!!supabase);
  const [sync, setSync] = useState<SyncStatus>('off');
  const [lastSynced, setLastSynced] = useState<Date | null>(null);
  const [modal, setModal] = useState<AuthModal | null>(null);

  // logging in from the pop-up closes it
  useEffect(() => {
    if (user) setModal(null);
  }, [user]);
  const lastPushed = useRef<string>('');
  const applying = useRef(false);
  /** a local change is waiting to be pushed: don't let a pull overwrite it */
  const pending = useRef(false);

  /* ---------- session ---------- */
  useEffect(() => {
    if (!supabase) return;
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
      // came back from Google: drop ?code=… and return to the page they started on
      if (event === 'SIGNED_IN' && window.location.search) {
        let back = '/account';
        try {
          back = sessionStorage.getItem(RETURN_KEY) || back;
          sessionStorage.removeItem(RETURN_KEY);
        } catch {
          /* ignore */
        }
        window.history.replaceState(null, '', `${window.location.pathname}#${back}`);
        window.dispatchEvent(new PopStateEvent('popstate'));
      }
    });
    return () => data.subscription.unsubscribe();
  }, []);

  /* ---------- sync ---------- */
  const push = useCallback(async (uid: string) => {
    if (!supabase) return;
    const snap = readLocal();
    const body = JSON.stringify(snap);
    if (body === lastPushed.current) return;
    setSync('syncing');
    const updated_at = new Date().toISOString();
    const { error } = await supabase.from(TABLE).upsert({ user_id: uid, data: snap, updated_at });
    if (error) {
      setSync('error');
      return;
    }
    lastPushed.current = body;
    setSync('synced');
    setLastSynced(new Date(updated_at));
  }, []);

  const uid = user?.id ?? null;

  // on login: pull the account's data and merge it with this device's progress
  useEffect(() => {
    if (!supabase || !uid) {
      setSync('off');
      return;
    }
    let cancelled = false;
    (async () => {
      setSync('syncing');
      const { data, error } = await supabase.from(TABLE).select('data').eq('user_id', uid).maybeSingle();
      if (cancelled) return;
      if (error) {
        setSync('error');
        return;
      }
      const merged = merge(readLocal(), normalise(data?.data));
      applying.current = true;
      writeLocal(merged);
      applying.current = false;
      lastPushed.current = '';
      await push(uid);
    })();
    return () => {
      cancelled = true;
    };
  }, [uid, push]);

  // every local change (tick a lesson, change the plan…) is pushed a moment later
  useEffect(() => {
    if (!uid) return;
    let t = 0;
    const off = onLocalChange(() => {
      if (applying.current) return;
      window.clearTimeout(t);
      pending.current = true;
      t = window.setTimeout(() => {
        pending.current = false;
        push(uid);
      }, 900);
    });
    return () => {
      off();
      window.clearTimeout(t);
      pending.current = false;
    };
  }, [uid, push]);

  // coming back to the tab: pick up changes made on another device
  useEffect(() => {
    if (!supabase || !uid) return;
    const onVisible = async () => {
      if (document.visibilityState !== 'visible' || !supabase || pending.current) return;
      const { data } = await supabase.from(TABLE).select('data, updated_at').eq('user_id', uid).maybeSingle();
      if (!data || pending.current) return;
      const remote = normalise(data.data);
      const body = JSON.stringify(remote);
      if (body === lastPushed.current) return;
      applying.current = true;
      writeLocal(remote);
      applying.current = false;
      lastPushed.current = body;
      setSync('synced');
      const at = new Date(data.updated_at as string);
      setLastSynced(Number.isNaN(at.getTime()) ? new Date() : at);
    };
    document.addEventListener('visibilitychange', onVisible);
    return () => document.removeEventListener('visibilitychange', onVisible);
  }, [uid]);

  /* ---------- actions ---------- */
  const value = useMemo<AuthCtx>(
    () => ({
      enabled: !!supabase,
      loading,
      user,
      sync,
      lastSynced,
      signInWithGoogle: async () => {
        if (!supabase) return 'Login is not set up yet.';
        rememberReturn();
        const { error } = await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: siteUrl() } });
        return error?.message ?? null;
      },
      sendCode: async (email) => {
        if (!supabase) return 'Login is not set up yet.';
        const { error } = await supabase.auth.signInWithOtp({ email, options: { shouldCreateUser: true } });
        return error ? friendlySendError(error.message) : null;
      },
      verifyCode: async (email, code) => {
        if (!supabase) return 'Login is not set up yet.';
        const { error } = await supabase.auth.verifyOtp({ email, token: code, type: 'email' });
        return error?.message ?? null;
      },
      signOut: async () => {
        await supabase?.auth.signOut();
        lastPushed.current = '';
      },
      updateProfile: async (patch) => {
        if (!user) return 'You’re not logged in.';
        const res = await saveProfile(user, patch);
        if (res.user) setUser(res.user);
        return res.error ?? null;
      },
      modal,
      openAuth: setModal,
      closeAuth: () => setModal(null),
      deleteAccount: async () => {
        if (!supabase) return 'Login is not set up yet.';
        if (user) await removeOldAvatars(user.id, null);
        const { error } = await supabase.rpc('delete_my_account');
        if (error) return error.message;
        await supabase.auth.signOut();
        clearLocal();
        return null;
      },
    }),
    [loading, user, sync, lastSynced, modal],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}

/** Display name, initials, photo and colour for the avatar. */
export function profileOf(user: User) {
  const p = readProfile(user);
  return { name: p.name, initials: initialsOf(p.name), avatar: avatarSrc(p, user), color: colorOf(p.color), profile: p };
}
