import { useEffect, useRef } from 'react';

/**
 * Overlays (lesson view, dialogs, celebrations, the login pop-up) can stack: a stage celebration
 * opens on top of the lesson that finished the stage. Two rules keep that sane:
 *  - Escape closes only the top overlay, not every overlay that happens to listen for it.
 *  - Page scroll stays locked until the *last* overlay closes. (Each overlay saving and restoring
 *    `body.style.overflow` itself breaks when they close out of order and can leave the page stuck.)
 */
const stack: { current: () => void }[] = [];
let locks = 0;
let savedOverflow = '';

function onKey(e: KeyboardEvent) {
  if (e.key !== 'Escape' || !stack.length) return;
  e.preventDefault();
  stack[stack.length - 1].current();
}

function lockScroll() {
  if (locks++ === 0) {
    savedOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }
  return () => {
    if (--locks === 0) document.body.style.overflow = savedOverflow;
  };
}

/** Register an overlay while `active`: locks page scroll, and `onEscape` runs only when it's on top. */
export function useLayer(active: boolean, onEscape?: () => void) {
  const handler = useRef<() => void>(() => {});
  handler.current = onEscape ?? (() => {});

  useEffect(() => {
    if (!active) return;
    const entry = { current: () => handler.current() };
    stack.push(entry);
    if (stack.length === 1) document.addEventListener('keydown', onKey);
    const unlock = lockScroll();
    return () => {
      const i = stack.indexOf(entry);
      if (i >= 0) stack.splice(i, 1);
      if (!stack.length) document.removeEventListener('keydown', onKey);
      unlock();
    };
  }, [active]);
}
