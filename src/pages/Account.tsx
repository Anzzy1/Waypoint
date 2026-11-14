import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { profileOf, useAuth } from '../hooks/useAuth';
import { useProgress } from '../hooks/useProgress';
import { estimateFinish, usePlan } from '../hooks/usePlan';
import { roadmaps, topicIdsOf } from '../data/roadmaps';
import { topics } from '../data/topics';
import { ProgressBar } from '../components/Bits';
import { ArrowRight, Check } from '../components/Icons';
import { clearLocal } from '../lib/sync';

function timeAgo(d: Date | null) {
  if (!d || Number.isNaN(d.getTime())) return '';
  const s = Math.round((Date.now() - d.getTime()) / 1000);
  if (s < 10) return 'just now';
  if (s < 60) return `${s}s ago`;
  if (s < 3600) return `${Math.round(s / 60)} min ago`;
  return d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

export default function Account() {
  const auth = useAuth();
  const { countDone, isDone } = useProgress();
  const { plan } = usePlan();
  const [confirmReset, setConfirmReset] = useState(false);
  const [deleteText, setDeleteText] = useState('');
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (auth.loading) return <section className="account"><div className="container"><p className="muted">Loading your account…</p></div></section>;
  if (!auth.user) return <Navigate to="/login" replace />;

  const { name, initials, avatar } = profileOf(auth.user);
  const providers = (auth.user.app_metadata?.providers as string[] | undefined) ?? [auth.user.app_metadata?.provider ?? 'email'];

  const rows = roadmaps.map((r) => {
    const ids = topicIdsOf(r);
    const done = countDone(ids);
    const left = ids.filter((t) => !isDone(t)).reduce((s, t) => s + (topics[t]?.hours ?? 0), 0);
    // the shared quick start lesson doesn't count as starting a roadmap
    const real = ids.filter((t) => t !== 'how-to-learn' && isDone(t)).length;
    return { r, ids, done, real, pct: ids.length ? done / ids.length : 0, left };
  });
  const started = rows.filter((x) => x.real > 0);
  const current = rows.find((x) => x.r.id === plan.roadmap) ?? rows[0];
  const est = estimateFinish(current.left * 1.6, plan.hours);
  const totalDone = new Set(rows.flatMap((x) => x.ids.filter((t) => isDone(t)))).size;

  const syncLabel = {
    off: 'Not syncing',
    syncing: 'Saving…',
    synced: `Saved to your account ${timeAgo(auth.lastSynced)}`,
    error: 'Couldn’t save. Check your connection',
  }[auth.sync];

  return (
    <section className="account">
      <div className="container account-inner">
        <header className="account-head">
          <span className="account-avatar">{avatar ? <img src={avatar} alt="" referrerPolicy="no-referrer" /> : initials}</span>
          <div className="account-who">
            <span className="kicker">Your account</span>
            <h1>Hi, {name.split(' ')[0]}</h1>
            <span className="muted small">
              {auth.user.email} · signed in with {providers.map((p) => (p === 'email' ? 'email' : p[0].toUpperCase() + p.slice(1))).join(', ')}
            </span>
          </div>
          <span className={`sync-pill sync-${auth.sync}`}>
            <span className="sync-dot" aria-hidden />
            {syncLabel}
          </span>
        </header>

        <div className="account-stats">
          <div><b>{totalDone}</b><span className="muted small">lessons completed</span></div>
          <div><b>{started.length}</b><span className="muted small">roadmaps with progress</span></div>
          <div><b>{plan.hours}h</b><span className="muted small">weekly goal</span></div>
        </div>

        <div className="account-grid">
          <div className="account-card account-plan">
            <span className="kicker">Current plan</span>
            <h2>{current.r.title}</h2>
            <ProgressBar value={current.pct} label={`${current.r.title} progress`} />
            <p className="muted small">
              {current.done} of {current.ids.length} lessons · {plan.hours} hours a week · finish around <b>{est.date}</b>
            </p>
            <div className="account-actions">
              <Link to={`/roadmap/${current.r.id}`} className="btn btn-primary">
                Continue learning <ArrowRight size={16} />
              </Link>
              <Link to="/learn?step=5" className="btn btn-ghost">Change plan</Link>
            </div>
          </div>

          <div className="account-card">
            <span className="kicker">Your roadmaps</span>
            {started.length === 0 ? (
              <p className="muted">You haven’t started a roadmap yet. <Link to="/" className="inline-link">Pick one</Link> and tick your first lesson.</p>
            ) : (
              <ul className="account-roadmaps">
                {started.map(({ r, ids, done, pct }) => (
                  <li key={r.id}>
                    <Link to={`/roadmap/${r.id}`}>
                      <span className="account-rm-top">
                        <b>{r.title}</b>
                        {r.id === plan.roadmap && <span className="chip chip-good"><Check size={12} /> Current</span>}
                        <span className="mono small faint">{done}/{ids.length}</span>
                      </span>
                      <ProgressBar value={pct} label={`${r.title} progress`} />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="account-card account-danger">
          <span className="kicker">Manage your data</span>
          <div className="danger-row">
            <div>
              <b>Log out</b>
              <p className="muted small">Your progress stays saved in your account. This device keeps a copy too.</p>
            </div>
            <button className="btn btn-ghost" onClick={() => auth.signOut()}>Log out</button>
          </div>
          <div className="danger-row">
            <div>
              <b>Reset all progress</b>
              <p className="muted small">Untick every lesson on every roadmap. This can’t be undone.</p>
            </div>
            {confirmReset ? (
              <span className="danger-confirm">
                <button className="btn btn-ghost" onClick={() => setConfirmReset(false)}>Cancel</button>
                <button className="btn btn-danger" onClick={() => { clearLocal(); setConfirmReset(false); }}>Yes, reset</button>
              </span>
            ) : (
              <button className="btn btn-ghost" onClick={() => setConfirmReset(true)}>Reset progress</button>
            )}
          </div>
          <div className="danger-row">
            <div>
              <b>Delete account</b>
              <p className="muted small">Permanently delete your account and everything saved in it.</p>
            </div>
            {!deleteOpen && <button className="btn btn-ghost danger-text" onClick={() => setDeleteOpen(true)}>Delete account</button>}
          </div>
          {deleteOpen && (
            <div className="delete-box">
              <label className="field">
                <span>Type <b>DELETE</b> to confirm</span>
                <input value={deleteText} onChange={(e) => setDeleteText(e.target.value)} autoComplete="off" />
              </label>
              {error && <div className="auth-alert bad">{error}</div>}
              <span className="danger-confirm">
                <button className="btn btn-ghost" onClick={() => { setDeleteOpen(false); setDeleteText(''); }}>Cancel</button>
                <button
                  className="btn btn-danger"
                  disabled={deleteText !== 'DELETE'}
                  onClick={async () => setError(await auth.deleteAccount())}
                >
                  Delete forever
                </button>
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
