import { useState, type ReactNode } from 'react';
import { Check } from './Icons';

/**
 * An editor-style window for lesson examples, with light syntax colouring and an output panel.
 * Stays dark in both themes, like a real code editor.
 */

type Mode = 'hash' | 'slash' | 'sql' | 'html' | 'term' | 'plain';

function modeFor(file: string): Mode {
  const f = file.toLowerCase();
  if (f === 'terminal') return 'term';
  if (/\.(py|sh|ya?ml|tf)\b|dockerfile/.test(f)) return 'hash';
  if (/\.(jsx?|tsx?|swift|prisma|css|json)\b/.test(f)) return 'slash';
  if (/\.sql\b/.test(f)) return 'sql';
  if (/\.html\b/.test(f)) return 'html';
  return 'plain';
}

const KEYWORDS = new Set(
  (
    'def return if else elif for in while import from as class with try except raise lambda async await pass ' +
    'const let var function export default new true false True False None null undefined type interface extends ' +
    'struct private public some this self of throw catch finally ' +
    'SELECT FROM WHERE JOIN ON GROUP BY ORDER LIMIT DESC ASC AND OR COUNT BEGIN COMMIT ROLLBACK INSERT INTO UPDATE DELETE ' +
    'model resource provider jobs steps runs-on uses run name on with ' +
    'FROM WORKDIR COPY RUN EXPOSE CMD set'
  ).split(' '),
);

const TOKEN: Record<Exclude<Mode, 'term' | 'plain'>, RegExp> = {
  hash: /(#.*)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|\b(\d+(?:\.\d+)?)\b|([A-Za-z_][\w-]*)/g,
  slash: /(\/\/.*)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`[^`]*`)|\b(\d+(?:\.\d+)?)\b|([A-Za-z_]\w*)/g,
  sql: /(--.*)|('(?:[^'\\]|\\.)*')|\b(\d+(?:\.\d+)?)\b|([A-Za-z_]\w*)/g,
  html: /(<!--.*?-->)|("(?:[^"\\]|\\.)*")|(<\/?[\w!-]+)|(\/?>)/g,
};

function highlightLine(line: string, mode: Mode): ReactNode {
  if (mode === 'plain') return line;
  if (mode === 'term') {
    // first word of each command is the program name
    const m = line.match(/^(\s*)(\S+)(.*)$/);
    return m ? <>{m[1]}<span className="tk-cmd">{m[2]}</span>{m[3]}</> : line;
  }
  const re = new RegExp(TOKEN[mode].source, 'g');
  const out: ReactNode[] = [];
  let last = 0;
  let k = 0;
  for (let m = re.exec(line); m; m = re.exec(line)) {
    if (m.index > last) out.push(line.slice(last, m.index));
    const [whole, comment, str, third, fourth] = m;
    let cls = '';
    if (comment) cls = 'tk-com';
    else if (str) cls = 'tk-str';
    else if (mode === 'html') cls = 'tk-key';
    else if (third) cls = 'tk-num';
    else if (fourth && KEYWORDS.has(fourth)) cls = 'tk-key';
    else if (fourth && line[m.index + whole.length] === '(') cls = 'tk-fn';
    out.push(cls ? <span key={k++} className={cls}>{whole}</span> : whole);
    last = m.index + whole.length;
  }
  if (last < line.length) out.push(line.slice(last));
  return out;
}

export default function CodeWindow({ file, code, output }: { file: string; code: string; output?: string }) {
  const mode = modeFor(file);
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard blocked */
    }
  };

  return (
    <div className="codewin">
      <div className="codewin-bar">
        <span className="codewin-dots" aria-hidden><i /><i /><i /></span>
        <span className="codewin-file mono">{file}</span>
        <button className={`codewin-copy${copied ? ' done' : ''}`} onClick={copy}>
          {copied ? <><Check size={12} /> Copied</> : 'Copy'}
        </button>
      </div>
      <pre className={`codewin-code${mode === 'term' ? ' is-term' : ''}`}>
        <code>
          {code.split('\n').map((line, i) => (
            <span className="codewin-line" key={i}>
              {highlightLine(line, mode)}
              {'\n'}
            </span>
          ))}
        </code>
      </pre>
      {output && (
        <div className="codewin-out">
          <span className="codewin-out-tag mono">Output</span>
          <pre>{output}</pre>
        </div>
      )}
    </div>
  );
}
