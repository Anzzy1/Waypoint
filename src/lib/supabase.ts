import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/**
 * The Supabase client, or null when the project isn't configured yet (no .env).
 * Without it the site still works fully as a guest; only login is unavailable.
 *
 * PKCE flow: after Google/GitHub/email links, Supabase returns to `?code=...` (a query
 * string), which doesn't clash with the HashRouter's `#/route`.
 */
export const supabase: SupabaseClient | null =
  url && anonKey
    ? createClient(url, anonKey, {
        auth: { flowType: 'pkce', persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
      })
    : null;

/** Where Supabase should send people back to: this page, without any hash route or query. */
export function siteUrl(extraQuery = '') {
  return `${window.location.origin}${window.location.pathname}${extraQuery}`;
}
