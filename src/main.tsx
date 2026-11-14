import { StrictMode, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom';
import { ProgressProvider } from './hooks/useProgress';
import Nav from './components/Nav';
import { Footer } from './components/Bits';
import { RevealManager } from './components/Motion';
import Home from './pages/Home';
import RoadmapPage from './pages/RoadmapPage';
import NotFound from './pages/NotFound';
import Learn from './pages/Learn';
import Stacks from './pages/Stacks';
import Login from './pages/Login';
import Account from './pages/Account';
import { AuthProvider } from './hooks/useAuth';
import AuthModalHost from './components/AuthModal';
import AiWorkflow from './pages/AiWorkflow';
import './styles.css';

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
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/roadmap/:id" element={<RoadmapPage />} />
            <Route path="/stack" element={<Stacks />} />
            <Route path="/stack/:id" element={<Stacks />} />
            <Route path="/ai" element={<AiWorkflow />} />
            <Route path="/login" element={<Login />} />
            <Route path="/account" element={<Account />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <AuthModalHost />
      </HashRouter>
      </AuthProvider>
    </ProgressProvider>
  </StrictMode>,
);
