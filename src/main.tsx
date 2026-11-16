import { lazy, StrictMode, Suspense, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom';
import { ProgressProvider } from './hooks/useProgress';
import Nav from './components/Nav';
import { Footer } from './components/Bits';
import { RevealManager } from './components/Motion';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';
import RoadmapPage from './pages/RoadmapPage';
import NotFound from './pages/NotFound';
import ProfileSetupHost from './components/ProfileSetup';
import { AuthProvider } from './hooks/useAuth';
import AuthModalHost from './components/AuthModal';

// pages people rarely land on first are loaded on demand, keeping the first download small
const Learn = lazy(() => import('./pages/Learn'));
const Stacks = lazy(() => import('./pages/Stacks'));
const Login = lazy(() => import('./pages/Login'));
const Account = lazy(() => import('./pages/Account'));
const Settings = lazy(() => import('./pages/Settings'));
const AiWorkflow = lazy(() => import('./pages/AiWorkflow'));

const PageLoading = () => (
  <section className="section page-loading" aria-busy="true">
    <div className="container"><p className="muted">Loading…</p></div>
  </section>
);

/** A crash on one page shouldn't follow the learner to the next one. */
function Pages() {
  const { pathname } = useLocation();
  return (
    <ErrorBoundary resetKey={pathname}>
      <Suspense fallback={<PageLoading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/roadmap/:id" element={<RoadmapPage />} />
          <Route path="/stack" element={<Stacks />} />
          <Route path="/stack/:id" element={<Stacks />} />
          <Route path="/ai" element={<AiWorkflow />} />
          <Route path="/login" element={<Login />} />
          <Route path="/account" element={<Account />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}
import './styles.css';
import './profile.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  const prev = useRef(pathname);
  // braces matter: newer Chrome returns a Promise from scrollTo, and React would treat it as a cleanup fn
  useEffect(() => {
    // switching roles on the Tech Stacks page keeps your place; every other navigation starts at the top
    const withinStacks = prev.current.startsWith('/stack') && pathname.startsWith('/stack');
    prev.current = pathname;
    if (!withinStacks) window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// HashRouter so the site works on any static host without rewrite rules
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProgressProvider>
      <AuthProvider>
      <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ScrollToTop />
        <RevealManager />
        <Nav />
        <main>
          <Pages />
        </main>
        <Footer />
        <AuthModalHost />
        <ProfileSetupHost />
      </HashRouter>
      </AuthProvider>
    </ProgressProvider>
  </StrictMode>,
);
