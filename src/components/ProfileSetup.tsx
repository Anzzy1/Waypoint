import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from 'react';
import { useAuth } from '../hooks/useAuth';
import { GOALS, LEVELS, NAME_MAX, HEADLINE_MAX, avatarSrc, readProfile, suggestedNames, type Goal, type Level } from '../lib/profile';
import Avatar from './Avatar';
import { ChoiceChips, CountedField, PhotoPicker, type PhotoValue } from './ProfileBits';
import { ArrowLeft, ArrowRight, Check } from './Icons';

const STEPS = ['Your name', 'Your photo', 'About you'];

/**
 * First login: a short, friendly setup — what to call you, your photo, and (optionally) where you're
 * starting from. Shown once per account; "Skip" also counts as done so it never nags.
 */
export default function ProfileSetupHost() {
  const { user, loading } = useAuth();
  const [doneName, setDoneName] = useState<string | null>(null);
  const needed = !loading && !!user && !readProfile(user).onboarded;
  return (
    <>
      {needed && <ProfileSetup key={user.id} onDone={setDoneName} />}
      {doneName && <SetupDone name={doneName} onClose={() => setDoneName(null)} />}
    </>
  );
}

function ProfileSetup({ onDone }: { onDone: (name: string) => void }) {
  const auth = useAuth();
  const user = auth.user!;
  const start = readProfile(user);
  const [step, setStep] = useState(0);
  const [name, setName] = useState(start.name);
  const [photo, setPhoto] = useState<PhotoValue>({ avatarMode: start.avatarMode, avatarUrl: start.avatarUrl, color: start.color });
  const [level, setLevel] = useState<Level | null>(start.level);
  const [goal, setGoal] = useState<Goal | null>(start.goal);
  const [headline, setHeadline] = useState(start.headline);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const panel = useRef<HTMLDivElement>(null);
  const suggestions = suggestedNames(user);
  const shown = name.trim() || start.name;

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panel.current?.focus();
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const finish = async (skip = false) => {
    setBusy(true);
    setError(null);
    const err = await auth.updateProfile(
      skip ? { onboarded: true } : { name: shown, ...photo, level, goal, headline, onboarded: true },
    );
    setBusy(false);
    if (err) {
      setError(err);
      return;
    }
    // saving flips `onboarded`, so the host removes this pop-up and shows the toast
    if (!skip) onDone(shown);
  };

  const next = (e?: FormEvent) => {
    e?.preventDefault();
    if (step === 0 && !name.trim()) return;
    if (step < STEPS.length - 1) setStep(step + 1);
    else finish();
  };

  return (
    <div className="auth-modal-root ob-root">
      <div className="auth-modal-backdrop" />
      <div ref={panel} className="auth-modal ob" role="dialog" aria-modal="true" aria-labelledby="ob-title" tabIndex={-1}>
          <form onSubmit={next} className="ob-form">
            <div className="ob-top">
              <div className="ps-steps" aria-label={`Step ${step + 1} of ${STEPS.length}`}>
                {STEPS.map((s, i) => (
                  <span key={s} className={`ps-step${i < step ? ' done' : ''}${i === step ? ' on' : ''}`}>
                    <i />
                    <span className="ps-step-label">{s}</span>
                  </span>
                ))}
              </div>
              <button type="button" className="link-btn small ob-skip" disabled={busy} onClick={() => finish(true)}>
                Skip for now
              </button>
            </div>

            {/* live preview: what others will see */}
            <div className="ob-card" aria-hidden>
              <Avatar src={avatarSrc(photo, user)} name={shown} color={photo.color} size={64} className="ob-card-av" />
              <div className="ob-card-text">
                <b>{shown}</b>
                <span>{headline.trim() || (level ? LEVELS.find((l) => l.id === level)?.label : 'Waypoint learner')}</span>
              </div>
              <span className="ob-card-tag mono">Preview</span>
            </div>

            <div className="ob-body" key={step}>
              {step === 0 && (
                <>
                  <h2 id="ob-title" className="ps-title">What should we call you?</h2>
                  <p className="muted ob-sub">This is the name you’ll see on your account and around Waypoint.</p>
                  <CountedField label="Your name" value={name} max={NAME_MAX} onChange={setName} placeholder="e.g. Sam" autoFocus />
                  {suggestions.length > 1 && (
                    <div className="ob-suggest">
                      <span className="small faint">Quick pick:</span>
                      {suggestions.map((s) => (
                        <button key={s} type="button" className={`ob-suggest-btn${name === s ? ' on' : ''}`} onClick={() => setName(s)}>
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}

              {step === 1 && (
                <>
                  <h2 id="ob-title" className="ps-title">Pick your profile photo</h2>
                  <p className="muted ob-sub">Use your Google photo, upload your own, or go with colourful initials. You can change it anytime.</p>
                  <PhotoPicker user={user} name={shown} value={photo} onChange={setPhoto} />
                </>
              )}

              {step === 2 && (
                <>
                  <h2 id="ob-title" className="ps-title">A bit about you</h2>
                  <p className="muted ob-sub">Optional. It helps us cheer you on and shows on your profile.</p>
                  <div className="ob-group">
                    <span className="ob-label">Where are you starting from?</span>
                    <ChoiceChips label="Experience" options={LEVELS} value={level} onChange={setLevel} />
                  </div>
                  <div className="ob-group">
                    <span className="ob-label">What’s your goal?</span>
                    <ChoiceChips label="Goal" options={GOALS} value={goal} onChange={setGoal} />
                  </div>
                  <CountedField label="Short headline" value={headline} max={HEADLINE_MAX} onChange={setHeadline} placeholder="e.g. Aspiring frontend developer" />
                </>
              )}
            </div>

            {error && <div className="auth-alert bad" role="alert">{error}</div>}

            <div className="ob-actions">
              {step > 0 ? (
                <button type="button" className="btn btn-ghost" onClick={() => setStep(step - 1)} disabled={busy}>
                  <ArrowLeft size={16} /> Back
                </button>
              ) : (
                <span />
              )}
              <button className="btn btn-primary btn-lg" disabled={busy || (step === 0 && !name.trim())}>
                {busy ? 'Saving…' : step < STEPS.length - 1 ? 'Continue' : 'Finish setup'}
                {!busy && (step < STEPS.length - 1 ? <ArrowRight size={16} /> : <Check size={15} />)}
              </button>
            </div>
          </form>
      </div>
    </div>
  );
}

/** Small "all set" toast after the setup closes. */
function SetupDone({ name, onClose }: { name: string; onClose: () => void }) {
  useEffect(() => {
    const t = window.setTimeout(onClose, 4200);
    return () => window.clearTimeout(t);
  }, [onClose]);
  return (
    <div className="ob-toast" role="status" style={{ '--i': 0 } as CSSProperties}>
      <span className="ob-toast-check"><Check size={14} /></span>
      You’re all set, {name.split(' ')[0]}!
    </div>
  );
}
