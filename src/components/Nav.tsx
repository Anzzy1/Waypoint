import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Logo, Moon, Sun } from './Icons';
import { Glyph, type GlyphKey } from './Art';
import { profileOf, useAuth } from '../hooks/useAuth';
import { useTheme } from '../lib/theme';
import Avatar from './Avatar';

const LINKS: { to: string; label: string; desc: string; glyph: GlyphKey; match: (p: string) => boolean }[] = [
  { to: '/', label: 'Roadmaps', desc: 'Step-by-step career paths', glyph: 'compass', match: (p) => p === '/' || p.startsWith('/roadmap') },
  { to: '/learn', label: 'How to learn', desc: 'Study method + weekly plan', glyph: 'sparkle', match: (p) => p.startsWith('/learn') },
  { to: '/stack', label: 'Tech stacks', desc: 'What companies hire for', glyph: 'layers', match: (p) => p.startsWith('/stack') },
  { to: '/ai', label: 'AI workflow', desc: 'AI coding tools, setup and skills', glyph: 'terminal', match: (p) => p.startsWith('/ai') },
];

export default function Nav() {
  const { pathname } = useLocation();
  const { user, loading, openAuth, signOut } = useAuth();
  const me = user ? profileOf(user) : null;
  const { resolved: theme, setPref: setTheme } = useTheme();
  const [menu, setMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [pill, setPill] = useState<CSSProperties>({ opacity: 0 });

  const shellRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const active = LINKS.findIndex((l) => l.match(pathname));
  const next = theme === 'dark' ? 'light' : 'dark';

  // account menu: close on navigation, Escape and outside clicks
  useEffect(() => setMenu(false), [pathname]);
  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenu(false);
    const onDown = (e: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenu(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onDown);
    };
  }, [menu]);

  // bar tightens once the page scrolls; the progress line is written straight to the DOM
  // so scrolling never re-renders the nav
  const progressRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // segmented control: the raised "selected" tab sits on the current page and slides when it changes
  useLayoutEffect(() => {
    const measure = () => {
      const el = active >= 0 ? linksRef.current?.children[active + 1] : null;
      if (!(el instanceof HTMLElement)) {
        setPill((p) => ({ ...p, opacity: 0 }));
        return;
      }
      setPill({
        opacity: 1,
        width: el.offsetWidth,
        height: el.offsetHeight,
        transform: `translate(${el.offsetLeft}px, ${el.offsetTop}px)`,
      });
    };
    measure();
    window.addEventListener('resize', measure);
    document.fonts?.ready.then(measure).catch(() => {});
    return () => window.removeEventListener('resize', measure);
  }, [active]);

  // mobile menu: close on navigation, Escape and outside taps; focus the first link on open
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    panelRef.current?.querySelector<HTMLElement>('a')?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onDown = (e: PointerEvent) => {
      if (shellRef.current && !shellRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onDown);
    };
  }, [open]);

  return (
    <header className={`nav${scrolled ? ' nav-scrolled' : ''}${open ? ' nav-open' : ''}`}>
      <span className="nav-progress" ref={progressRef} aria-hidden />
      <div className="nav-shell container" ref={shellRef}>
        <div className="nav-capsule">
          <Link to="/" className="brand" aria-label="Waypoint home">
            <Logo size={26} />
            <span className="brand-text">Waypoint</span>
          </Link>

          <nav className="nav-links" aria-label="Primary" ref={linksRef}>
            <span className="nav-pill" style={pill} aria-hidden />
            {LINKS.map((l, i) => (
              <Link
                key={l.to}
                to={l.to}
                className={`nav-link${i === active ? ' active' : ''}`}
                aria-current={i === active ? 'page' : undefined}
              >
                <Glyph name={l.glyph} size={16} />
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="nav-actions">
            <button className="nav-icon" onClick={() => setTheme(next)} aria-label={`Switch to ${next} mode`}>
              <span key={theme} className="theme-icon">
                {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
              </span>
            </button>
            {!loading &&
              (me ? (
                <div className="nav-me" ref={menuRef}>
                  <button className="nav-avatar" onClick={() => setMenu((m) => !m)} aria-expanded={menu} aria-haspopup="menu" aria-label="Account menu" title={me.name}>
                    <Avatar src={me.avatar} name={me.name} color={me.color.id} size={36} />
                  </button>
                  {menu && (
                    <div className="nav-menu" role="menu">
                      <div className="nav-menu-who">
                        <Avatar src={me.avatar} name={me.name} color={me.color.id} size={40} />
                        <span>
                          <b>{me.name}</b>
                          <span className="small muted">{user?.email}</span>
                        </span>
                      </div>
                      <Link to="/account" role="menuitem" className="nav-menu-item"><Glyph name="checklist" size={16} /> Your progress</Link>
                      <Link to="/settings" role="menuitem" className="nav-menu-item"><Glyph name="puzzle" size={16} /> Profile &amp; settings</Link>
                      <button role="menuitem" className="nav-menu-item" onClick={() => { setMenu(false); signOut(); }}>
                        <Glyph name="lock" size={16} /> Log out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button className="nav-login" onClick={() => openAuth({ view: 'login' })}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
                  </svg>
                  Log in
                </button>
              ))}
            <Link to="/learn" className="btn btn-primary nav-cta">
              Start learning <ArrowRight size={15} />
            </Link>
            <button
              className="nav-icon nav-menu-btn"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="nav-panel"
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              <span className="burger" aria-hidden>
                <i />
                <i />
              </span>
            </button>
          </div>
        </div>

        {open && (
          <div className="nav-panel" id="nav-panel" ref={panelRef}>
            {LINKS.map((l, i) => (
              <Link
                key={l.to}
                to={l.to}
                className={`nav-panel-link${i === active ? ' active' : ''}`}
                aria-current={i === active ? 'page' : undefined}
                style={{ '--i': i } as CSSProperties}
                onClick={() => setOpen(false)}
              >
                <span className="nav-panel-glyph">
                  <Glyph name={l.glyph} size={18} />
                </span>
                <span className="nav-panel-text">
                  <b>{l.label}</b>
                  <span className="small muted">{l.desc}</span>
                </span>
              </Link>
            ))}
            <Link
              to={me ? '/account' : pathname}
              className="nav-panel-link"
              style={{ '--i': LINKS.length } as CSSProperties}
              onClick={(e) => {
                setOpen(false);
                if (!me) {
                  e.preventDefault();
                  openAuth({ view: 'login' });
                }
              }}
            >
              <span className="nav-panel-glyph nav-panel-me">
                {me ? <Avatar src={me.avatar} name={me.name} color={me.color.id} size={38} /> : <Glyph name="lock" size={18} />}
              </span>
              <span className="nav-panel-text">
                <b>{me ? 'Your account' : 'Log in'}</b>
                <span className="small muted">{me ? `${me.name} · progress and settings` : 'Track your roadmap on every device'}</span>
              </span>
            </Link>
            <Link to="/learn" className="btn btn-primary nav-panel-cta" style={{ '--i': LINKS.length + 1 } as CSSProperties} onClick={() => setOpen(false)}>
              Start learning <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
