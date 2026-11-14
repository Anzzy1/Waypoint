import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useProgress } from '../hooks/useProgress';
import { topics } from '../data/topics';
import { Glyph } from './Art';
import { ArrowRight, Check, Close } from './Icons';
import LearnArt from './LearnArt';
import AuthForm from './AuthForm';

const WELCOME_KEY = 'waypoint.welcomeSeen.v1';
const NUDGE_KEY = 'waypoint.nudgeLevel.v1';
/** set once someone has logged in on this device: they know about accounts, so no more prompts */
const HAD_ACCOUNT_KEY = 'waypoint.hadAccount.v1';
/** Guests get a “save your progress” nudge after this many finished lessons (once each). */
const MILESTONES = [3, 10, 25];
const LESSON_IDS = Object.keys(topics).filter((t) => t !== 'how-to-learn');

const get = (k: string) => {
  try {
    return localStorage.getItem(k);
  } catch {
    return null;
  }
};
const set = (k: string, v: string) => {
  try {
    localStorage.setItem(k, v);
  } catch {
    /* ignore */
  }
};

const PERKS = [
  { g: 'refresh' as const, t: 'On every device' },
  { g: 'checklist' as const, t: 'Track every roadmap' },
  { g: 'shield' as const, t: 'Never lose progress' },
];

const BENEFITS = [
  { g: 'checklist' as const, t: 'Track every roadmap', d: 'Each lesson you finish is saved to your account, with your progress shown on every roadmap.' },
  { g: 'refresh' as const, t: 'Continue on any device', d: 'Start on your laptop and keep going on your phone. Your progress follows you.' },
  { g: 'gauge' as const, t: 'Keep your plan and finish date', d: 'Your weekly hours and estimated finish date are saved with your account.' },
  { g: 'shield' as const, t: 'Never lose your work', d: 'Clearing your browser or switching computers no longer wipes your progress.' },
];
const HOW = [
  'Continue with Google, or type your email',
  'Using email? We send you a 6-digit code to type in. No password to remember',
  'Your progress is saved, and you can log in on any device',
];

/** The detail panel beside the form: why log in and how it works. */
function FormInfo({ step }: { step: 'email' | 'code' }) {
  const code = step === 'code';
  return (
    <aside className="am-info">
      <span className="kicker">{code ? 'Almost there' : 'Why log in?'}</span>
      <h3 className="am-info-title">{code ? 'One code and you’re in' : 'Turn your roadmap into a plan you can keep'}</h3>
      <p className="am-info-lead">
        {code
          ? 'The code is valid for a few minutes. Once you type it, your progress here is saved to your account right away.'
          : 'Waypoint works without logging in, but then your progress only lives in this browser. Logging in keeps it safe. First time? Your free account is created automatically.'}
      </p>
      <ul className="am-benefits">
        {BENEFITS.map((b, i) => (
          <li key={b.t} style={{ '--i': i } as CSSProperties}>
            <span className="am-benefit-icon"><Glyph name={b.g} size={18} /></span>
            <span>
              <b>{b.t}</b>
              <span>{b.d}</span>
            </span>
          </li>
        ))}
      </ul>
      {!code && (
        <div className="am-how">
          <span className="kicker">How it works</span>
          <ol>
            {HOW.map((h, i) => (
              <li key={h}>
                <span className="am-how-num mono">{i + 1}</span>
                {h}
              </li>
            ))}
          </ol>
        </div>
      )}
      <p className="am-privacy">
        <Glyph name="lock" size={14} /> We only store your email and your learning progress. No ads, no spam, and you can delete
        your account anytime.
      </p>
    </aside>
  );
}

/** The sign-up pop-up plus the rules for when it appears on its own. Rendered once, inside the router. */
export default function AuthModalHost() {
  const auth = useAuth();
  const { countDone } = useProgress();
  const { pathname } = useLocation();
  const panelRef = useRef<HTMLDivElement>(null);
  const { modal, openAuth, closeAuth, user, loading } = auth;
  const [formStep, setFormStep] = useState<'email' | 'code'>('email');

  // prompts only make sense when accounts work (or while developing the site)
  const prompts = auth.enabled || import.meta.env.DEV;
  const quietPage = pathname.startsWith('/login') || pathname.startsWith('/account');
  const done = countDone(LESSON_IDS);

  useEffect(() => {
    if (user) set(HAD_ACCOUNT_KEY, '1');
  }, [user]);

  /* ---------- first visit: “create an account or just explore?” ---------- */
  useEffect(() => {
    // returning guests who already have progress get the nudge below instead
    if (!prompts || loading || user || quietPage || get(WELCOME_KEY) || get(HAD_ACCOUNT_KEY) || done >= MILESTONES[0]) return;
    const t = window.setTimeout(() => {
      if (document.querySelector('.auth-modal-root, .celebrate-root')) return;
      set(WELCOME_KEY, '1');
      openAuth({ view: 'welcome' });
    }, 1400);
    return () => window.clearTimeout(t);
  }, [prompts, loading, user, quietPage, done, openAuth]);

  /* ---------- guest is really using it: nudge at 3, 10 and 25 lessons ---------- */
  useEffect(() => {
    if (!prompts || loading || user || get(HAD_ACCOUNT_KEY)) return;
    const level = Number(get(NUDGE_KEY)) || 0;
    let reached = -1;
    MILESTONES.forEach((m, i) => {
      if (done >= m) reached = i;
    });
    if (reached < level) return;
    // wait until no other pop-up (stage celebration, this one) is on screen
    const iv = window.setInterval(() => {
      if (document.querySelector('.auth-modal-root, .celebrate-root')) return;
      window.clearInterval(iv);
      set(NUDGE_KEY, String(reached + 1));
      openAuth({ view: 'nudge', count: done });
    }, 1200);
    return () => window.clearInterval(iv);
  }, [done, prompts, loading, user, openAuth]);

  /* ---------- pop-up behaviour: Escape, focus, scroll lock ---------- */
  useEffect(() => {
    if (!modal) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panelRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeAuth();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [modal, closeAuth]);

  if (!modal) return null;

  return (
    <div className="auth-modal-root">
      <div className="auth-modal-backdrop" onClick={closeAuth} />
      <div
        ref={panelRef}
        className={`auth-modal auth-modal-${modal.view === 'login' ? 'form' : modal.view}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={modal.view === 'login' ? 'auth-title' : 'auth-modal-title'}
        tabIndex={-1}
        key={modal.view}
      >
        <button className="icon-btn auth-modal-close" onClick={closeAuth} aria-label="Close">
          <Close />
        </button>

        {modal.view === 'welcome' && (
          <div className="am-welcome">
            <div className="am-art"><LearnArt step={0} /></div>
            <h2 id="auth-modal-title" className="am-title">Welcome to Waypoint</h2>
            <p className="muted am-sub">Free, step-by-step roadmaps to become a developer. How would you like to start?</p>
            <div className="am-choices">
              <button className="am-choice am-choice-main" onClick={() => openAuth({ view: 'login' })} style={{ '--i': 0 } as CSSProperties}>
                <span className="am-choice-icon"><Glyph name="checklist" size={20} /></span>
                <span className="am-choice-text">
                  <b>Log in to track your roadmap <span className="am-badge mono">Recommended</span></b>
                  <span>Use Google or your email. Your progress is saved on every device.</span>
                </span>
                <ArrowRight size={18} className="am-choice-arrow" />
              </button>
              <button className="am-choice" onClick={closeAuth} style={{ '--i': 1 } as CSSProperties}>
                <span className="am-choice-icon"><Glyph name="compass" size={20} /></span>
                <span className="am-choice-text">
                  <b>Just explore the roadmaps</b>
                  <span>Look around first. You can log in anytime.</span>
                </span>
                <ArrowRight size={18} className="am-choice-arrow" />
              </button>
            </div>
          </div>
        )}

        {modal.view === 'nudge' && (
          <div className="am-nudge">
            <div className="am-count" aria-hidden>
              <span className="am-count-num">{modal.count}</span>
              <span className="am-count-check"><Check size={14} /></span>
            </div>
            <h2 id="auth-modal-title" className="am-title">Nice work! {modal.count} lessons done</h2>
            <p className="muted am-sub">
              Right now your progress is saved <b>only in this browser</b>. If you clear it or switch devices, it’s gone.
              Log in to keep it safe. It only takes a few seconds.
            </p>
            <ul className="am-perks">
              {PERKS.map((p, i) => (
                <li key={p.t} style={{ '--i': i } as CSSProperties}>
                  <Glyph name={p.g} size={16} /> {p.t}
                </li>
              ))}
            </ul>
            <div className="am-actions">
              <button className="btn btn-primary btn-lg" onClick={() => openAuth({ view: 'login' })}>
                Log in to keep my progress <ArrowRight size={16} />
              </button>
              <button className="btn btn-ghost btn-lg" onClick={closeAuth}>Not now</button>
            </div>
          </div>
        )}

        {modal.view === 'login' && (
          <div className="am-split">
            <FormInfo step={formStep} />
            <div className="am-form">
              <AuthForm onStepChange={setFormStep} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
