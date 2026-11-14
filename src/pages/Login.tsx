import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Glyph } from '../components/Art';
import { Check } from '../components/Icons';
import AuthForm from '../components/AuthForm';

const PERKS = [
  { g: 'refresh' as const, t: 'Your progress on every device', d: 'Start on your laptop, keep going on your phone.' },
  { g: 'checklist' as const, t: 'Track your roadmaps', d: 'See every path you started and switch your plan anytime.' },
  { g: 'shield' as const, t: 'Never lose your work', d: 'Clearing your browser no longer wipes your progress.' },
];

/** Full-page login, for direct links. Everywhere else the login pop-up is used. */
export default function Login() {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.user) navigate('/account', { replace: true });
  }, [auth.user, navigate]);

  return (
    <section className="auth">
      <div className="container auth-grid">
        <aside className="auth-side">
          <span className="kicker">Waypoint account</span>
          <h2>Keep your learning in one place</h2>
          <ul className="auth-perks">
            {PERKS.map((p, i) => (
              <li key={p.t} style={{ animationDelay: `${i * 90 + 120}ms` }}>
                <span className="auth-perk-icon"><Glyph name={p.g} size={18} /></span>
                <span>
                  <b>{p.t}</b>
                  <span className="muted small">{p.d}</span>
                </span>
              </li>
            ))}
          </ul>
          <p className="small muted auth-guest">
            <Check size={13} /> Logging in is optional. Everything works without it, and the progress you already have here moves
            into your account when you log in.
          </p>
        </aside>

        <div className="auth-card">
          <AuthForm />
        </div>
      </div>
    </section>
  );
}
