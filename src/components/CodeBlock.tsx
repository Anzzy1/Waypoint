import { useEffect, useId, useState } from 'react';
import type { Command } from '../data/aiWorkflow';
import { Check } from './Icons';

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // older browsers / insecure contexts: fall back to a hidden textarea
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    return ok;
  }
}

/** Dark terminal-style block with a Copy button; several commands become tabs (e.g. per OS). */
export default function CodeBlock({ commands }: { commands: Command[] }) {
  const [tab, setTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const id = useId();
  const cmd = commands[Math.min(tab, commands.length - 1)];

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(t);
  }, [copied]);

  return (
    <div className="code">
      <div className="code-bar">
        {commands.length > 1 ? (
          <div className="code-tabs" role="tablist" aria-label="Choose a variant">
            {commands.map((c, i) => (
              <button
                key={c.label}
                role="tab"
                id={`${id}-tab-${i}`}
                aria-selected={i === tab}
                aria-controls={`${id}-panel`}
                className={`code-tab${i === tab ? ' active' : ''}`}
                onClick={() => setTab(i)}
              >
                {c.label}
              </button>
            ))}
          </div>
        ) : (
          <span className="code-label">{cmd.label}</span>
        )}
        <button className="code-copy" onClick={async () => setCopied(await copyText(cmd.code))} aria-live="polite">
          {copied ? (
            <>
              <Check size={13} /> Copied
            </>
          ) : (
            'Copy'
          )}
        </button>
      </div>
      <pre id={`${id}-panel`} role={commands.length > 1 ? 'tabpanel' : undefined} aria-labelledby={commands.length > 1 ? `${id}-tab-${tab}` : undefined}>
        <code>{cmd.code}</code>
      </pre>
    </div>
  );
}
