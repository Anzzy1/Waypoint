import { Fragment, useEffect, useRef, useState, type CSSProperties } from 'react';
import { useLocation } from 'react-router-dom';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Reveals every `[data-reveal]` element as it scrolls into view by setting `data-revealed`.
 * (An attribute, not a class: React rewrites `className` on re-render, which used to hide
 * revealed elements again, e.g. a roadmap stage whose status class changed.)
 * The hidden state lives in CSS under `html.reveal-ready`, so without JS (or with
 * reduced motion) everything simply stays visible.
 */
export function RevealManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    const root = document.getElementById('root');
    if (!root || !('IntersectionObserver' in window)) return;
    document.documentElement.classList.add('reveal-ready');

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.setAttribute('data-revealed', '');
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0, rootMargin: '0px 0px -8% 0px' },
    );
    const scan = () => root.querySelectorAll('[data-reveal]:not([data-revealed])').forEach((el) => io.observe(el));
    scan();
    // catch elements that mount later: tab/filter changes, lazy sections
    const mo = new MutationObserver(scan);
    mo.observe(root, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}

/** Counts from 0 to `value` once it scrolls into view. */
export function CountUp({ value, duration = 1400, suffix = '' }: { value: number; duration?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(() => (prefersReducedMotion() ? value : 0));

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !('IntersectionObserver' in window)) {
      setN(value);
      return;
    }
    let raf = 0;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        setN(Math.round(value * (1 - Math.pow(1 - t, 3)))); // ease-out cubic
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className="count-up">
      {n.toLocaleString()}
      {suffix}
    </span>
  );
}

/** Splits text into words that rise in one after another (see `.word` in styles.css). */
export function SplitWords({ text, start = 0 }: { text: string; start?: number }) {
  const words = text.split(' ');
  return (
    <>
      {/* the space sits outside the span: inline-block boxes drop trailing whitespace */}
      {words.map((w, i) => (
        <Fragment key={`${w}-${i}`}>
          <span className="word" style={{ '--i': start + i } as CSSProperties}>
            {w}
          </span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </>
  );
}
