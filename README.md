# Waypoint: Developer Roadmaps

Step-by-step learning roadmaps for ten developer roles: **Frontend, Backend, Full-Stack, AI & ML Engineer, DevOps,
Mobile, Cloud, AI Agent Engineer, Software Engineer and QA / Test Automation Engineer**.
Each stage has short lessons, hand-picked videos and docs, a project to build, and a checklist that saves your progress.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## How it's organised

| Path | What it holds |
| --- | --- |
| `src/data/topics.ts` | The lesson library: summary, key points and resources for every topic |
| `src/data/roadmaps.ts` | Roadmaps → stages → topic ids, plus a project per stage |
| `src/data/guides/` | Step-by-step lesson content: plain explanation, code example, steps, mini project |
| `src/hooks/useProgress.tsx` | Checked-off lessons, saved to `localStorage` |
| `src/hooks/useAuth.tsx` | Login (Supabase) and syncing progress to the user's account |
| `src/lib/sync.ts` | Which `localStorage` keys are synced, and how device + account data merge |
| `src/pages/` | Home page and roadmap page |
| `src/components/LessonDrawer.tsx` | The full-screen lesson page |
| `src/styles.css` | Design tokens (light and dark) and all styles |

Topics are shared between roadmaps, so completing **Git** in Frontend also marks it done in Backend.

### Add a lesson or a roadmap

1. Add a topic object to `src/data/topics.ts` with a unique `id`.
2. Reference that `id` in a stage's `topics` array in `src/data/roadmaps.ts`.

Video links that don't point to one specific video open a YouTube search for a trusted creator (for example, "Kevin Powell flexbox"), so they never go dead.

## Accounts (optional)

Logging in is optional: without it the site works fully and saves progress in the browser. Learners log in with
**Google**, or with their **email and a 6-digit code** (no passwords). There is no separate sign-up: the first login
creates the account. Their progress, plan and badges then sync across devices.

1. Create a free project at [supabase.com](https://supabase.com).
2. In **SQL Editor**, run `supabase/schema.sql`. It creates the `user_data` table with row-level security (each user
   can only read and write their own row) and the `delete_my_account` function used by the Account page.
   Then run `supabase/avatars.sql` too. It creates the `avatars` storage bucket for profile photos people upload.
3. Copy `.env.example` to `.env` and fill in **Project URL** and **anon public key** from **Project Settings → API**.
   The anon key is safe to ship to the browser; never put the `service_role` key here.
4. **Email codes:** in **Authentication → Email Templates**, put the code in both the **Magic Link** and the
   **Confirm signup** templates (new accounts get Confirm signup), for example:
   `<h2>Your Waypoint login code</h2><p>Enter this code to log in: <b>{{ .Token }}</b></p>`.
   Supabase sends a link by default; with `{{ .Token }}` in the template it sends the 6-digit code the site asks for.
   Set **Authentication → Sign In / Providers → Email → Email OTP Length** to `6` (the site shows 6 boxes).
   Supabase's built-in email service is limited to a few emails per hour, so set up custom SMTP
   (in the Authentication email settings) before launch.
5. **Google:** in **Authentication → Providers → Google**, turn it on and paste the client ID and secret from the
   Google Cloud console (OAuth client of type "Web application", with the callback URL Supabase shows you).
6. In **Authentication → URL Configuration**, set the Site URL to your deployed URL and add it (plus
   `http://localhost:5173` for development) to **Redirect URLs**.
7. On your host (Vercel, Netlify…), add the same two `VITE_SUPABASE_…` variables and redeploy.

When someone logs in for the first time on a device, the progress already in their browser is merged into their account,
so nothing is lost. Logging out clears that device's copy (it stays safe in the account), so the next person to log in
on a shared computer doesn't inherit it. On their first login, people set up a profile (name, photo, level and goal), which they can change
later on the Settings page. Guests see a welcome pop-up on their first visit and a reminder after 3, 10 and 25 finished lessons.

## Deploy

The site uses hash routing and `base: './'`, so the `dist/` folder runs on any static host (Vercel, Netlify, GitHub Pages) with no extra configuration.

The live site is hosted on **Vercel**, which redeploys on every push to `main`. The `VITE_SUPABASE_…` variables are set in the Vercel project settings.

**Link previews:** set `VITE_SITE_URL` to the site's public address (for example `https://waypoint.vercel.app/`) in the
host's environment variables. The build then adds the canonical link and the `og:image` / `og:url` tags that LinkedIn,
X and Slack need to show the preview card (`public/og.png`, 1200×630). Without it, those tags are left out.
