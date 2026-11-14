import { useEffect, useRef, useState, type ClipboardEvent, type FormEvent, type KeyboardEvent } from 'react';
import { useAuth } from '../hooks/useAuth';
import { ArrowLeft, ArrowRight } from './Icons';

const CODE_LEN = 6;
const RESEND_SECONDS = 60; // Supabase allows one email code per minute

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden>
    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
    <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
  </svg>
);

/**
 * Log in with Google, or with an emailed 6-digit code. There is no separate sign-up:
 * the first login creates the account. Shared by the pop-up and the /login page.
 */
export default function AuthForm({ onStepChange }: { onStepChange?: (step: 'email' | 'code') => void }) {
  const auth = useAuth();
  const [step, setStep] = useState<'email' | 'code'>('email');
  const [email, setEmail] = useState('');
  const [digits, setDigits] = useState<string[]>(() => Array(CODE_LEN).fill(''));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [wait, setWait] = useState(0);
  const boxes = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => onStepChange?.(step), [step, onStepChange]);

  // resend countdown
  useEffect(() => {
    if (wait <= 0) return;
    const t = window.setTimeout(() => setWait((w) => w - 1), 1000);
    return () => window.clearTimeout(t);
  }, [wait]);

  const google = async () => {
    setBusy(true);
    setError(null);
    const err = await auth.signInWithGoogle();
    if (err) {
      setError(err);
      setBusy(false);
    }
  };

  const send = async (e?: FormEvent) => {
    e?.preventDefault();
    setBusy(true);
    setError(null);
    const err = await auth.sendCode(email.trim());
    setBusy(false);
    if (err) {
      setError(err);
      return;
    }
    setDigits(Array(CODE_LEN).fill(''));
    setStep('code');
    setWait(RESEND_SECONDS);
    window.setTimeout(() => boxes.current[0]?.focus(), 50);
  };

  const verify = async (code: string) => {
    setBusy(true);
    setError(null);
    const err = await auth.verifyCode(email.trim(), code);
    setBusy(false);
    if (err) {
      setError(err.toLowerCase().includes('expired') || err.toLowerCase().includes('invalid') ? 'That code is wrong or has expired. Check the email or send a new code.' : err);
      setDigits(Array(CODE_LEN).fill(''));
      boxes.current[0]?.focus();
    }
    // on success the pop-up closes itself (the user is now logged in)
  };

  const setDigit = (i: number, raw: string) => {
    const v = raw.replace(/\D/g, '');
    if (!v) {
      setDigits((d) => d.map((x, j) => (j === i ? '' : x)));
      return;
    }
    // typing several digits at once (autofill) spreads them across the boxes
    const next = [...digits];
    v.slice(0, CODE_LEN - i).split('').forEach((ch, k) => (next[i + k] = ch));
    setDigits(next);
    const filled = next.join('');
    if (filled.length === CODE_LEN) verify(filled);
    else boxes.current[Math.min(i + v.length, CODE_LEN - 1)]?.focus();
  };

  const onKey = (i: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) boxes.current[i - 1]?.focus();
    if (e.key === 'ArrowLeft' && i > 0) boxes.current[i - 1]?.focus();
    if (e.key === 'ArrowRight' && i < CODE_LEN - 1) boxes.current[i + 1]?.focus();
  };

  const onPaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const v = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, CODE_LEN);
    if (!v) return;
    e.preventDefault();
    setDigit(0, v);
  };

  if (step === 'code') {
    return (
      <div className="auth-form-wrap">
        <button type="button" className="auth-back-btn" onClick={() => { setStep('email'); setError(null); }}>
          <ArrowLeft size={15} /> Use a different email
        </button>
        <h2 className="auth-title" id="auth-title">Check your email</h2>
        <p className="muted auth-sub">
          We sent a 6-digit code to <b className="auth-email">{email}</b>. Type it below to log in.
        </p>
        <div className="code-boxes" role="group" aria-label="6-digit code">
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => (boxes.current[i] = el)}
              className={`code-box${d ? ' filled' : ''}`}
              inputMode="numeric"
              autoComplete={i === 0 ? 'one-time-code' : 'off'}
              maxLength={i === 0 ? CODE_LEN : 1}
              value={d}
              disabled={busy}
              aria-label={`Digit ${i + 1}`}
              onChange={(e) => setDigit(i, e.target.value)}
              onKeyDown={(e) => onKey(i, e)}
              onPaste={onPaste}
              onFocus={(e) => e.target.select()}
            />
          ))}
        </div>
        {busy && <p className="small muted auth-checking">Checking your code…</p>}
        {error && <div className="auth-alert bad" role="alert">{error}</div>}
        <div className="auth-resend">
          <span className="small muted">Didn’t get it? Check your spam folder, or</span>
          <button type="button" className="link-btn small" disabled={wait > 0 || busy} onClick={() => send()}>
            {wait > 0 ? `send a new code in ${wait}s` : 'send a new code'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-form-wrap">
      <h2 className="auth-title" id="auth-title">Log in to Waypoint</h2>
      <p className="muted auth-sub">New here? Logging in creates your free account automatically. No password needed.</p>

      {!auth.enabled && (
        <div className="auth-alert warn">
          Login isn’t switched on for this site yet (the Supabase keys are missing, see the README). You can keep using
          everything as a guest.
        </div>
      )}

      <button type="button" className="btn btn-ghost auth-google" onClick={google} disabled={busy || !auth.enabled}>
        <GoogleIcon /> Continue with Google
      </button>

      <div className="auth-or"><span>or log in with your email</span></div>

      <form className="auth-form" onSubmit={send}>
        <label className="field">
          <span>Email address</span>
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </label>
        {error && <div className="auth-alert bad" role="alert">{error}</div>}
        <button className="btn btn-primary btn-lg auth-submit" disabled={busy || !auth.enabled}>
          {busy ? 'Sending…' : 'Email me a code'} {!busy && <ArrowRight size={16} />}
        </button>
        <p className="small faint auth-hint">We’ll email you a 6-digit code. Type it here and you’re in.</p>
      </form>
    </div>
  );
}
