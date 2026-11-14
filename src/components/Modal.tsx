import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { Close } from './Icons';

/**
 * Centred dialog: closes on Escape, backdrop click or the close button; moves focus in and
 * returns it to the opener afterwards; locks page scroll while open. Rendered in a portal so
 * no card or grid around the opener ever moves.
 */
export default function Modal({ label, onClose, children }: { label: string; onClose: () => void; children: ReactNode }) {
  const panel = useRef<HTMLDivElement>(null);
  const close = useRef(onClose);
  close.current = onClose;

  useEffect(() => {
    const before = document.activeElement as HTMLElement | null;
    panel.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close.current();
      // keep Tab inside the dialog
      if (e.key === 'Tab' && panel.current) {
        const items = panel.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && (document.activeElement === first || document.activeElement === panel.current)) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      before?.focus?.();
    };
  }, []);

  return createPortal(
    <div className="modal-root">
      <div className="modal-backdrop" onClick={() => close.current()} />
      <div ref={panel} className="modal" role="dialog" aria-modal="true" aria-label={label} tabIndex={-1}>
        <button className="icon-btn modal-close" onClick={() => close.current()} aria-label="Close">
          <Close />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
}
