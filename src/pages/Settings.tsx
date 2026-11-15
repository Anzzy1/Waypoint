import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useProgress } from '../hooks/useProgress';
import { estimateFinish, usePlan } from '../hooks/usePlan';
import { roadmaps, topicIdsOf } from '../data/roadmaps';
import { topics } from '../data/topics';
import { GOALS, HEADLINE_MAX, LEVELS, NAME_MAX, avatarSrc, cleanGithub, readProfile, type Profile } from '../lib/profile';
import { useTheme, type ThemePref } from '../lib/theme';
import { clearLocal } from '../lib/sync';
import Avatar from '../components/Avatar';
import { ChoiceChips, CountedField, PhotoPicker } from '../components/ProfileBits';
import { Glyph, type GlyphKey } from '../components/Art';
import { ArrowLeft, Check, Moon, Sun } from '../components/Icons';

const SECTIONS: { id: string; label: string; glyph: GlyphKey }[] = [
  { id: 'profile', label: 'Profile', glyph: 'speech' },
  { id: 'learning', label: 'Learning plan', glyph: 'gauge' },
  { id: 'appearance', label: 'Appearance', glyph: 'eye' },
  { id: 'account', label: 'Account', glyph: 'lock' },
  { id: 'danger', label: 'Danger zone', glyph: 'shield' },
];

const THEMES: { id: ThemePref; label: string }[] = [
  { id: 'light', label: 'Light' },
  { id: 'dark', label: 'Dark' },
  { id: 'system', label: 'System' },
];

type Draft = Pick<Profile, 'name' | 'avatarMode' | 'avatarUrl' | 'color' | 'headline' | 'level' | 'goal' | 'github'>;
const draftOf = (p: Profile): Draft => ({
  name: p.name, avatarMode: p.avatarMode, avatarUrl: p.avatarUrl, color: p.color, headline: p.headline, level: p.level, goal: p.goal, github: p.github,
});

export default function Settings() {
  const auth = useAuth();
  if (auth.loading) return <section className="settings"><div className="container"><p className="muted">Loading your settings…</p></div></section>;
  if (!auth.user) return <Navigate to="/login" replace />;
  return <SettingsInner key={auth.user.id} />;
}

function Row({ title, desc, children, stack }: { title: string; desc?: string; children: ReactNode; stack?: boolean }) {
  return (
    <div className={`set-row${stack ? ' stack' : ''}`}>
      <div className="set-row-text">
        <b>{title}</b>
        {desc && <span>{desc}</span>}
      </div>
      <div className="set-row-control">{children}</div>
    </div>
  );
}

function SettingsInner() {
  const auth = useAuth();
  const user = auth.user!;
  const saved = useMemo(() => draftOf(readProfile(user)), [user]);
  const [draft, setDraft] = useState<Draft>(saved);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [active, setActive] = useState('profile');
  const { plan, update: updatePlan } = usePlan();
  const { isDone } = useProgress();
  const theme = useTheme();
  const [confirmReset, setConfirmReset] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteText, setDeleteText] = useState('');
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const dirty = JSON.stringify({ ...draft, github: cleanGithub(draft.github), name: draft.name.trim(), headline: draft.headline.trim() }) !== JSON.stringify(saved);
  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => setDraft((d) => ({ ...d, [k]: v }));
  const shownName = draft.name.trim() || saved.name;

  // highlight the section in view
  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(`set-${s.id}`)).filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (vis) setActive(vis.target.id.replace('set-', ''));
      },
      { rootMargin: '-90px 0px -55% 0px' },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 2600);
    return () => window.clearTimeout(t);
  }, [toast]);

  // warn before leaving with unsaved profile changes
  useEffect(() => {
    if (!dirty) return;
    const onBefore = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener('beforeunload', onBefore);
    return () => window.removeEventListener('beforeunload', onBefore);
  }, [dirty]);

  const save = async () => {
    if (!draft.name.trim()) {
      setError('Your name can’t be empty.');
      return;
    }
    setSaving(true);
    setError(null);
    const err = await auth.updateProfile({ ...draft, github: cleanGithub(draft.github) });
    setSaving(false);
    if (err) setError(err);
    else {
      setDraft((d) => ({ ...d, name: d.name.trim(), headline: d.headline.trim(), github: cleanGithub(d.github) }));
      setToast('Profile saved');
    }
  };

  const jump = (id: string) => {
    setActive(id);
    document.getElementById(`set-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const current = roadmaps.find((r) => r.id === plan.roadmap) ?? roadmaps[0];
  const left = topicIdsOf(current).filter((t) => !isDone(t)).reduce((s, t) => s + (topics[t]?.hours ?? 0), 0);
  const est = estimateFinish(left * 1.6, plan.hours);
  const providers = (user.app_metadata?.providers as string[] | undefined) ?? [user.app_metadata?.provider ?? 'email'];

  return (
    <section className="settings">
      <div className="container settings-inner">
        <header className="settings-head">
          <Link to="/account" className="auth-back-btn"><ArrowLeft size={15} /> Your account</Link>
          <h1>Settings</h1>
          <p className="muted">Your profile, learning plan, and how Waypoint looks.</p>
        </header>

        <div className="settings-layout">
          <nav className="settings-nav" aria-label="Settings sections">
            {SECTIONS.map((s) => (
              <button key={s.id} type="button" className={`settings-nav-btn${active === s.id ? ' on' : ''}${s.id === 'danger' ? ' danger' : ''}`} onClick={() => jump(s.id)} aria-current={active === s.id ? 'true' : undefined}>
                <Glyph name={s.glyph} size={16} />
                {s.label}
              </button>
            ))}
          </nav>

          <div className="settings-main">
            {/* ---------- profile ---------- */}
            <section id="set-profile" className="set-card" style={{ '--i': 0 } as CSSProperties}>
              <div className="set-card-head">
                <h2>Profile</h2>
                <p className="muted small">How you appear on Waypoint.</p>
              </div>
              <div className="set-profile-hero">
                <Avatar src={avatarSrc(draft, user)} name={shownName} color={draft.color} size={80} />
                <div>
                  <b className="set-profile-name">{shownName}</b>
                  <span className="muted small">{draft.headline.trim() || 'No headline yet'}</span>
                </div>
              </div>
              <Row title="Profile photo" desc="Google photo, your own, or colourful initials." stack>
                <PhotoPicker user={user} name={shownName} value={draft} onChange={(v) => setDraft((d) => ({ ...d, ...v }))} />
              </Row>
              <Row title="Display name" desc="What we call you." stack>
                <CountedField label="Name" value={draft.name} max={NAME_MAX} onChange={(v) => set('name', v)} />
              </Row>
              <Row title="Headline" desc="A short line under your name." stack>
                <CountedField label="Headline" value={draft.headline} max={HEADLINE_MAX} onChange={(v) => set('headline', v)} placeholder="e.g. Aspiring frontend developer" />
              </Row>
              <Row title="Experience" desc="Where you’re starting from." stack>
                <ChoiceChips label="Experience" options={LEVELS} value={draft.level} onChange={(v) => set('level', v)} />
              </Row>
              <Row title="Goal" desc="Why you’re learning." stack>
                <ChoiceChips label="Goal" options={GOALS} value={draft.goal} onChange={(v) => set('goal', v)} />
              </Row>
              <Row title="GitHub" desc="Optional. Shown as a link on your account page." stack>
                <CountedField label="GitHub username" value={draft.github} max={39} prefix="github.com/" onChange={(v) => set('github', v)} placeholder="username" />
              </Row>
            </section>

            {/* ---------- learning ---------- */}
            <section id="set-learning" className="set-card" style={{ '--i': 1 } as CSSProperties}>
              <div className="set-card-head">
                <h2>Learning plan</h2>
                <p className="muted small">Changes here save right away.</p>
              </div>
              <Row title="Current roadmap" desc="The path shown on your account page.">
                <select className="set-select" value={plan.roadmap} onChange={(e) => { updatePlan({ roadmap: e.target.value }); setToast('Plan updated'); }}>
                  {roadmaps.map((r) => <option key={r.id} value={r.id}>{r.title}</option>)}
                </select>
              </Row>
              <Row title="Hours per week" desc={`At this pace you’ll finish around ${est.date}.`}>
                <div className="stepper" role="group" aria-label="Hours per week">
                  <button type="button" onClick={() => updatePlan({ hours: Math.max(1, plan.hours - 1) })} disabled={plan.hours <= 1} aria-label="Fewer hours">−</button>
                  <span className="mono"><b>{plan.hours}</b>h</span>
                  <button type="button" onClick={() => updatePlan({ hours: Math.min(40, plan.hours + 1) })} disabled={plan.hours >= 40} aria-label="More hours">+</button>
                </div>
              </Row>
            </section>

            {/* ---------- appearance ---------- */}
            <section id="set-appearance" className="set-card" style={{ '--i': 2 } as CSSProperties}>
              <div className="set-card-head">
                <h2>Appearance</h2>
                <p className="muted small">Saved on this device.</p>
              </div>
              <div className="theme-tiles" role="radiogroup" aria-label="Theme">
                {THEMES.map((t) => (
                  <button key={t.id} type="button" role="radio" aria-checked={theme.pref === t.id} className={`theme-tile${theme.pref === t.id ? ' on' : ''}`} onClick={() => theme.setPref(t.id)}>
                    <span className={`theme-preview tp-${t.id}`} aria-hidden>
                      <i /><i /><i />
                    </span>
                    <span className="theme-tile-label">
                      {t.id === 'light' ? <Sun size={15} /> : t.id === 'dark' ? <Moon size={15} /> : <Glyph name="phone" size={15} />}
                      {t.label}
                      {theme.pref === t.id && <Check size={13} className="theme-tile-check" />}
                    </span>
                  </button>
                ))}
              </div>
            </section>

            {/* ---------- account ---------- */}
            <section id="set-account" className="set-card" style={{ '--i': 3 } as CSSProperties}>
              <div className="set-card-head">
                <h2>Account</h2>
              </div>
              <Row title="Email" desc="Used to log in with a code.">
                <span className="set-value">{user.email}</span>
              </Row>
              <Row title="Sign-in methods">
                <span className="set-badges">
                  {providers.map((p) => (
                    <span key={p} className="chip chip-good"><Check size={12} /> {p === 'email' ? 'Email code' : p[0].toUpperCase() + p.slice(1)}</span>
                  ))}
                </span>
              </Row>
              <Row title="Progress sync" desc="Lessons, plan and badges are saved to your account.">
                <span className={`sync-pill sync-${auth.sync}`}><span className="sync-dot" aria-hidden />{auth.sync === 'synced' ? 'Up to date' : auth.sync === 'syncing' ? 'Saving…' : auth.sync === 'error' ? 'Couldn’t save' : 'Off'}</span>
              </Row>
              <Row title="Log out" desc="Your progress stays in your account.">
                <button type="button" className="btn btn-ghost" onClick={() => auth.signOut()}>Log out</button>
              </Row>
            </section>

            {/* ---------- danger ---------- */}
            <section id="set-danger" className="set-card set-danger" style={{ '--i': 4 } as CSSProperties}>
              <div className="set-card-head">
                <h2>Danger zone</h2>
                <p className="muted small">These can’t be undone.</p>
              </div>
              <Row title="Reset all progress" desc="Untick every lesson on every roadmap.">
                {confirmReset ? (
                  <span className="danger-confirm">
                    <button type="button" className="btn btn-ghost" onClick={() => setConfirmReset(false)}>Cancel</button>
                    <button type="button" className="btn btn-danger" onClick={() => { clearLocal(); setConfirmReset(false); setToast('Progress reset'); }}>Yes, reset</button>
                  </span>
                ) : (
                  <button type="button" className="btn btn-ghost" onClick={() => setConfirmReset(true)}>Reset progress</button>
                )}
              </Row>
              <Row title="Delete account" desc="Delete your account, photo and everything saved in it.">
                {!deleteOpen && <button type="button" className="btn btn-ghost danger-text" onClick={() => setDeleteOpen(true)}>Delete account</button>}
              </Row>
              {deleteOpen && (
                <div className="delete-box">
                  <label className="field">
                    <span>Type <b>DELETE</b> to confirm</span>
                    <input value={deleteText} onChange={(e) => setDeleteText(e.target.value)} autoComplete="off" />
                  </label>
                  {deleteError && <div className="auth-alert bad">{deleteError}</div>}
                  <span className="danger-confirm">
                    <button type="button" className="btn btn-ghost" onClick={() => { setDeleteOpen(false); setDeleteText(''); }}>Cancel</button>
                    <button type="button" className="btn btn-danger" disabled={deleteText !== 'DELETE'} onClick={async () => setDeleteError(await auth.deleteAccount())}>Delete forever</button>
                  </span>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>

      {/* sticky save bar while the profile has unsaved edits */}
      <div className={`save-bar${dirty ? ' show' : ''}`} aria-hidden={!dirty}>
        <div className="save-bar-inner">
          <span className="save-bar-text">{error ? <span className="danger-text">{error}</span> : 'You have unsaved changes'}</span>
          <span className="save-bar-actions">
            <button type="button" className="btn btn-ghost" tabIndex={dirty ? 0 : -1} disabled={saving} onClick={() => { setDraft(saved); setError(null); }}>Discard</button>
            <button type="button" className="btn btn-primary" tabIndex={dirty ? 0 : -1} disabled={saving} onClick={save}>{saving ? 'Saving…' : 'Save changes'}</button>
          </span>
        </div>
      </div>

      {toast && (
        <div className="ob-toast" role="status">
          <span className="ob-toast-check"><Check size={14} /></span>
          {toast}
        </div>
      )}
    </section>
  );
}
