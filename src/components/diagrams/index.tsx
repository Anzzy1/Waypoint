/**
 * Concept diagrams shown in the lesson drawer ("See it").
 * Hand-drawn SVG; colours come from .dg-* classes in styles.css so they follow the theme,
 * and motion is CSS so the global reduced-motion rule switches it off.
 * Every viewBox is 460 wide so text stays readable when the drawer is phone-width.
 */
import { createContext, useContext, useId, type CSSProperties, type FC, type ReactNode } from 'react';

const Markers = createContext({ ink: '', good: '' });
const v = (n: number) => ({ '--i': n }) as CSSProperties;

function Svg({ h, label, children }: { h: number; label: string; children: ReactNode }) {
  const id = useId().replace(/:/g, '');
  const ink = `ai${id}`;
  const good = `ag${id}`;
  return (
    <svg viewBox={`0 0 460 ${h}`} className="dg" role="img" aria-label={label}>
      <defs>
        <marker id={ink} viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 10 5 0 10z" className="dg-head" />
        </marker>
        <marker id={good} viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 10 5 0 10z" className="dg-head-good" />
        </marker>
      </defs>
      <Markers.Provider value={{ ink, good }}>{children}</Markers.Provider>
    </svg>
  );
}

function Arrow({ d, good, className = '' }: { d: string; good?: boolean; className?: string }) {
  const m = useContext(Markers);
  return <path d={d} className={`dg-line ${good ? 'dg-good-s' : ''} ${className}`} markerEnd={`url(#${good ? m.good : m.ink})`} />;
}

function T({ x, y, c = 'dg-l', a = 'middle', children, style }: { x: number; y: number; c?: string; a?: 'start' | 'middle' | 'end'; children: ReactNode; style?: CSSProperties }) {
  return (
    <text x={x} y={y} className={c} textAnchor={a} style={style}>
      {children}
    </text>
  );
}

function Badge({ x, y, n }: { x: number; y: number; n: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={9} className="dg-good" />
      <T x={x} y={y + 4} c="dg-badge">
        {n}
      </T>
    </g>
  );
}

/* 1 ─ How the internet works */
const Internet: FC = () => (
  <Svg h={262} label="Your browser asks a DNS server for the site's address, then requests the page from the web server, which sends back HTML, CSS and JavaScript.">
    {/* DNS */}
    <rect x={14} y={10} width={128} height={56} rx={10} className="dg-box" />
    <T x={78} y={34} c="dg-t">DNS server</T>
    <T x={78} y={52}>the phone book</T>
    <rect x={164} y={24} width={128} height={28} rx={14} className="dg-good-bg" />
    <T x={228} y={42} c="dg-c dg-good-t">93.184.216.34</T>

    {/* browser */}
    <rect x={14} y={110} width={128} height={86} rx={10} className="dg-box" />
    <path d="M14 128h128" className="dg-line dg-faint" />
    <circle cx={26} cy={119} r={2.6} className="dg-dot" />
    <circle cx={35} cy={119} r={2.6} className="dg-dot" />
    <circle cx={44} cy={119} r={2.6} className="dg-dot" />
    <T x={78} y={158} c="dg-t">Your browser</T>
    <T x={78} y={176}>example.com</T>

    {/* server */}
    <rect x={318} y={110} width={128} height={86} rx={10} className="dg-box" />
    <path d="M334 132h96M334 148h96" className="dg-line dg-faint" />
    <circle cx={424} cy={140} r={3} className="dg-good dg-pulse" />
    <T x={382} y={170} c="dg-t">Web server</T>
    <T x={382} y={186}>stores the site</T>

    <Arrow d="M58 108V70" />
    <Arrow d="M98 68v38" good />
    <Arrow d="M146 140h168" />
    <Arrow d="M314 168H146" good />
    <Badge x={44} y={89} n={1} />
    <Badge x={112} y={89} n={2} />
    <T x={250} y={130} c="dg-c">GET /</T>
    {['HTML', 'CSS', 'JS'].map((f, i) => (
      <g key={f}>
        <rect x={176 + i * 38} y={176} width={34} height={20} rx={5} className="dg-soft" />
        <T x={193 + i * 38} y={190} c="dg-l dg-tiny">{f}</T>
      </g>
    ))}
    <Badge x={180} y={140} n={3} />
    <Badge x={300} y={168} n={4} />

    <circle r={5} className="dg-packet" />

    <T x={14} y={226} a="start">1 Where is example.com?</T>
    <T x={14} y={246} a="start">2 DNS replies with the IP</T>
    <T x={244} y={226} a="start">3 Browser asks for the page</T>
    <T x={244} y={246} a="start">4 Server sends the files</T>
  </Svg>
);

/* 2 ─ The command line */
const Terminal: FC = () => (
  <Svg h={226} label="A terminal running pwd, cd projects and ls, next to the folder tree it moves through.">
    <rect x={10} y={10} width={236} height={206} rx={10} className="dg-term" />
    {[26, 38, 50].map((x) => (
      <circle key={x} cx={x} cy={26} r={4} className="dg-term-dot" />
    ))}
    {[
      ['$', ' pwd'],
      ['', '/home/ana'],
      ['$', ' cd projects'],
      ['$', ' ls'],
      ['', 'site/   notes.md'],
      ['$', ''],
    ].map(([p, t], i) => (
      <text key={i} x={24} y={58 + i * 24} className="dg-term-t" xmlSpace="preserve">
        {p && <tspan className="dg-term-p">{p}</tspan>}
        <tspan className={p ? '' : 'dg-term-o'}>{t}</tspan>
      </text>
    ))}
    <rect x={38} y={166} width={9} height={16} className="dg-good dg-blink" />

    {/* folder tree */}
    <path d="M276 52v28h16M296 88v28h16M316 124v28h16M316 124v60h16" className="dg-line dg-faint" />
    <rect x={302} y={102} width={110} height={26} rx={7} className="dg-good-bg dg-pulse" />
    {[
      [262, 50, 'home/'],
      [282, 86, 'ana/'],
      [302, 122, 'projects/'],
      [322, 158, 'site/'],
      [322, 190, 'notes.md'],
    ].map(([x, y, n]) => (
      <g key={n as string}>
        {String(n).endsWith('/') ? (
          <path d={`M${x} ${(y as number) - 9}h5l2 2h7v9h-14z`} className="dg-folder" />
        ) : (
          <rect x={x as number} y={(y as number) - 10} width={11} height={13} rx={1.5} className="dg-soft" />
        )}
        <T x={(x as number) + 20} y={y as number} c="dg-c" a="start">
          {n}
        </T>
      </g>
    ))}
    <T x={420} y={120} c="dg-l dg-good-t" a="start">◀</T>
    <T x={350} y={216} c="dg-l">you are in projects/</T>
  </Svg>
);

/* 3 ─ Git */
const Git: FC = () => (
  <Svg h={206} label="A main branch with a feature branch that splits off, gets three commits, and merges back.">
    <path d="M20 140h420" className="dg-line dg-thick" />
    <path d="M120 140c30 0 30-70 64-70h146c30 0 30 70 50 70" className="dg-line dg-thick dg-good-s" />
    {[
      [50, 140, 'init', false],
      [120, 140, 'readme', false],
      [250, 140, 'fix typo', false],
    ].map(([x, y, m], i) => (
      <g key={m as string}>
        <circle cx={x as number} cy={y as number} r={9} className="dg-box dg-pop" style={v(i)} />
        <T x={x as number} y={168}>{m}</T>
      </g>
    ))}
    {[
      [200, 'form'],
      [265, 'validate'],
      [322, 'tests'],
    ].map(([x, m], i) => (
      <g key={m as string}>
        <circle cx={x as number} cy={70} r={9} className="dg-box dg-good-s dg-pop" style={v(i + 3)} />
        <T x={x as number} y={98} c="dg-l dg-good-t">{m}</T>
      </g>
    ))}
    <circle cx={380} cy={140} r={11} className="dg-good dg-pop" style={v(6)} />
    <T x={380} y={168} c="dg-l dg-good-t">merge</T>
    <T x={440} y={128} a="end" c="dg-c">main</T>
    <T x={262} y={46} c="dg-c dg-good-t">feature/login</T>
    <T x={14} y={198} a="start">● commit = a saved snapshot · branch = a safe place to try ideas</T>
  </Svg>
);

/* 4 ─ HTML: the web trio */
function MiniPage({ x, mode }: { x: number; mode: 'html' | 'css' | 'js' }) {
  const wire = mode === 'html';
  return (
    <g transform={`translate(${x} 0)`} className="dg-fade" style={v(mode === 'html' ? 0 : mode === 'css' ? 1 : 2)}>
      <rect x={0} y={10} width={140} height={150} rx={10} className="dg-box" />
      <rect x={14} y={26} width={112} height={18} rx={4} className={wire ? 'dg-wire' : 'dg-ink'} />
      {[56, 68, 80].map((y, i) => (
        <rect key={y} x={14} y={y} width={[112, 98, 70][i]} height={6} rx={3} className={wire ? 'dg-wire' : 'dg-soft-fill'} />
      ))}
      <rect x={14} y={100} width={60} height={24} rx={wire ? 3 : 12} className={wire ? 'dg-wire' : 'dg-good'} />
      {wire ? (
        <>
          <T x={70} y={39} c="dg-l dg-tiny">&lt;h1&gt;</T>
          <T x={126} y={93} c="dg-l dg-tiny" a="end">&lt;p&gt;</T>
          <T x={44} y={116} c="dg-l dg-tiny">&lt;button&gt;</T>
        </>
      ) : (
        <>
          <T x={44} y={116} c="dg-badge">♥ Like</T>
          {mode === 'js' && (
            <>
              <circle cx={44} cy={112} r={16} className="dg-ripple" />
              <T x={104} y={117} c="dg-c dg-good-t">13</T>
              <T x={104} y={100} c="dg-l dg-good-t dg-float">+1</T>
              <path d="M58 118l0 16 4-4 4 7 3-1.5-4-7h6z" className="dg-cursor" />
            </>
          )}
        </>
      )}
    </g>
  );
}
const Html: FC = () => (
  <Svg h={212} label="The same page three times: HTML is the skeleton, CSS is the skin, JavaScript is the muscles that make it react.">
    <MiniPage x={8} mode="html" />
    <MiniPage x={160} mode="css" />
    <MiniPage x={312} mode="js" />
    {[
      [78, 'HTML', 'the skeleton: structure'],
      [230, 'CSS', 'the skin: looks'],
      [382, 'JavaScript', 'the muscles: actions'],
    ].map(([x, t, d]) => (
      <g key={t as string}>
        <T x={x as number} y={184} c="dg-t">{t}</T>
        <T x={x as number} y={202}>{d}</T>
      </g>
    ))}
  </Svg>
);

/* 5 ─ CSS box model */
const Css: FC = () => (
  <Svg h={232} label="The CSS box model: content inside padding, inside a border, inside margin.">
    <rect x={40} y={10} width={380} height={212} rx={12} className="dg-margin dg-fade" style={v(3)} />
    <rect x={80} y={40} width={300} height={152} rx={8} className="dg-border dg-fade" style={v(2)} />
    <rect x={110} y={66} width={240} height={100} rx={4} className="dg-padding dg-fade" style={v(1)} />
    <rect x={150} y={92} width={160} height={48} rx={4} className="dg-box dg-fade" style={v(0)} />
    <T x={230} y={121} c="dg-t">content</T>
    <T x={52} y={30} a="start" c="dg-l dg-warn-t">margin · space outside</T>
    <T x={94} y={58} a="start" c="dg-l">border · the edge</T>
    <T x={122} y={84} a="start" c="dg-l dg-good-t">padding · space inside</T>
    <T x={230} y={212} c="dg-l dg-warn-t">margin pushes other boxes away</T>
  </Svg>
);

/* 6 ─ Responsive design */
const Responsive: FC = () => (
  <Svg h={222} label="The same layout as one column on a phone, two on a tablet and three on a desktop.">
    {/* phone */}
    <rect x={14} y={40} width={74} height={136} rx={12} className="dg-box" />
    {[56, 88, 120].map((y, i) => (
      <rect key={y} x={24} y={y} width={54} height={26} rx={4} className="dg-soft dg-fade" style={v(i)} />
    ))}
    {/* tablet */}
    <rect x={108} y={24} width={126} height={152} rx={12} className="dg-box" />
    {[
      [120, 42], [176, 42], [120, 86], [176, 86],
    ].map(([x, y], i) => (
      <rect key={`${x}${y}`} x={x} y={y} width={46} height={36} rx={4} className="dg-soft dg-fade" style={v(i + 1)} />
    ))}
    <rect x={120} y={130} width={102} height={30} rx={4} className="dg-good-bg dg-fade" style={v(5)} />
    {/* desktop */}
    <rect x={256} y={24} width={190} height={124} rx={8} className="dg-box" />
    <path d="M336 148v14M316 166h70" className="dg-line" />
    {[270, 328, 386].map((x, i) => (
      <rect key={x} x={x} y={40} width={46} height={40} rx={4} className="dg-soft dg-fade" style={v(i + 2)} />
    ))}
    <rect x={270} y={92} width={162} height={40} rx={4} className="dg-good-bg dg-fade" style={v(6)} />
    {[
      [51, 'Phone', '1 column'],
      [171, 'Tablet', '2 columns'],
      [351, 'Desktop', '3 columns'],
    ].map(([x, t, d]) => (
      <g key={t as string}>
        <T x={x as number} y={196} c="dg-t">{t}</T>
        <T x={x as number} y={213}>{d}</T>
      </g>
    ))}
  </Svg>
);

/* 7 ─ JavaScript: event → function → update */
const JavaScript: FC = () => (
  <Svg h={182} label="A user clicks a button, the click event runs your function, and the page updates.">
    <rect x={14} y={28} width={96} height={40} rx={20} className="dg-good dg-glow" style={v(0)} />
    <T x={62} y={53} c="dg-badge">♥ Like</T>
    <path d="M84 52l0 16 4-4 4 7 3-1.5-4-7h6z" className="dg-cursor" />
    <T x={62} y={96}>1 · user clicks</T>

    <Arrow d="M114 48h50" />
    <T x={139} y={40} c="dg-l dg-tiny">click</T>

    <rect x={168} y={12} width={156} height={74} rx={8} className="dg-term dg-glow" style={v(1)} />
    {['function like() {', '  count++', '  render()', '}'].map((l, i) => (
      <text key={i} x={180} y={34 + i * 16} className="dg-term-t dg-term-sm" xmlSpace="preserve">
        {l}
      </text>
    ))}
    <T x={246} y={104}>2 · your function runs</T>

    <Arrow d="M328 48h14" />
    <rect x={346} y={22} width={100} height={52} rx={8} className="dg-box dg-glow" style={v(2)} />
    <T x={396} y={54} c="dg-t">♥ 13</T>
    <T x={420} y={40} c="dg-l dg-good-t dg-float">+1</T>
    <T x={396} y={96}>3 · page updates</T>

    <rect x={14} y={124} width={432} height={36} rx={8} className="dg-soft" />
    <T x={230} y={147} c="dg-c">button.addEventListener('click', like)</T>
  </Svg>
);

/* 8 ─ The DOM */
const Dom: FC = () => {
  const nodes: [string, number, number, number, boolean][] = [
    ['document', 340, 14, 84, false],
    ['body', 340, 64, 64, false],
    ['h1', 280, 118, 52, true],
    ['ul', 400, 118, 52, false],
    ['li', 368, 172, 48, false],
    ['li', 426, 172, 48, false],
  ];
  const edges = ['M340 40v24', 'M340 90 280 118', 'M340 90 400 118', 'M400 144 368 172', 'M400 144 426 172'];
  return (
    <Svg h={226} label="HTML code on the left becomes a tree of objects, the DOM, that JavaScript can find and change.">
      <rect x={10} y={10} width={180} height={196} rx={10} className="dg-soft" />
      <rect x={18} y={48} width={130} height={22} rx={5} className="dg-good-bg dg-pulse" />
      {['<body>', '  <h1>Hi!</h1>', '  <ul>', '    <li>Tea</li>', '    <li>Cake</li>', '  </ul>', '</body>'].map((l, i) => (
        <text key={i} x={24} y={38 + i * 25} className="dg-c" xmlSpace="preserve">
          {l}
        </text>
      ))}
      <Arrow d="M196 110h44" />
      <T x={218} y={100} c="dg-l dg-tiny">builds</T>
      {edges.map((d) => (
        <path key={d} d={d} className="dg-line dg-faint" />
      ))}
      {nodes.map(([n, cx, y, w, hl], i) => (
        <g key={`${n}${i}`}>
          <rect x={cx - w / 2} y={y} width={w} height={26} rx={13} className={hl ? 'dg-good dg-pulse' : 'dg-box'} />
          <T x={cx} y={y + 17} c={hl ? 'dg-badge' : 'dg-c'}>{n}</T>
        </g>
      ))}
      <T x={336} y={220} c="dg-l dg-good-t">document.querySelector('h1')</T>
    </Svg>
  );
};

/* 9 ─ Async JavaScript */
const Async: FC = () => (
  <Svg h={222} label="Blocking code freezes the page while it waits. With async and await the page stays usable while data loads.">
    <T x={14} y={24} a="start" c="dg-t">Blocking</T>
    <rect x={14} y={34} width={220} height={28} rx={6} className="dg-warn-bg dg-grow" />
    <T x={24} y={53} a="start" c="dg-l dg-warn-t">fetch data… page frozen</T>
    <rect x={238} y={34} width={130} height={28} rx={6} className="dg-soft dg-grow" style={{ '--d': '1.25s' } as CSSProperties} />
    <T x={248} y={53} a="start">then show page</T>

    <T x={14} y={100} a="start" c="dg-t">Async with await</T>
    <rect x={14} y={110} width={220} height={28} rx={6} className="dg-good-bg dg-grow" />
    <T x={24} y={129} a="start" c="dg-l dg-good-t">await fetch() · pending</T>
    <rect x={14} y={144} width={220} height={28} rx={6} className="dg-soft dg-grow" />
    <T x={24} y={163} a="start">page stays usable</T>
    <rect x={238} y={110} width={150} height={28} rx={6} className="dg-good dg-grow" style={{ '--d': '1.25s' } as CSSProperties} />
    <T x={248} y={129} a="start" c="dg-badge dg-badge-l">resolved → show data</T>

    <Arrow d="M14 198h428" />
    <T x={442} y={216} a="end">time</T>
  </Svg>
);

/* 10 ─ React */
const React_: FC = () => (
  <Svg h={232} label="React components form a tree. State lives in App and flows down to children as props; the UI is a function of state.">
    <rect x={150} y={10} width={160} height={48} rx={10} className="dg-box" />
    <T x={230} y={31} c="dg-t">App</T>
    <T x={230} y={49} c="dg-l dg-good-t dg-pulse">state: likes = 3</T>

    <path d="M200 58 84 96" className="dg-line dg-faint" />
    <path d="M260 58 355 96" className="dg-line dg-good-s dg-flow" />
    <path d="M330 132 275 170" className="dg-line dg-faint" />
    <path d="M380 132 396 170" className="dg-line dg-good-s dg-flow" />
    <T x={330} y={80} c="dg-l dg-good-t">props</T>
    <T x={410} y={156} c="dg-l dg-good-t">props</T>

    {[
      [30, 96, 108, 'Header'],
      [290, 96, 130, 'Post'],
      [214, 170, 122, 'LikeButton'],
      [346, 170, 100, 'Counter'],
    ].map(([x, y, w, n]) => (
      <g key={n as string}>
        <rect x={x as number} y={y as number} width={w as number} height={36} rx={9} className={n === 'Counter' ? 'dg-box dg-good-s' : 'dg-box'} />
        <T x={(x as number) + (w as number) / 2} y={(y as number) + 23} c="dg-c">{n}</T>
      </g>
    ))}
    <T x={396} y={224} c="dg-l dg-good-t">shows 3</T>
    <rect x={14} y={176} width={168} height={34} rx={8} className="dg-good-bg" />
    <T x={98} y={198} c="dg-c dg-good-t">UI = f(state)</T>
  </Svg>
);

/* 11 ─ HTTP & APIs */
const Http: FC = () => (
  <Svg h={234} label="A request with a method, URL and headers goes to the server, which answers with a status code and JSON.">
    <rect x={10} y={10} width={196} height={118} rx={10} className="dg-box" />
    <T x={24} y={32} a="start" c="dg-l dg-tiny">REQUEST</T>
    <rect x={24} y={42} width={42} height={22} rx={5} className="dg-good" />
    <T x={45} y={57} c="dg-badge">GET</T>
    <T x={74} y={58} a="start" c="dg-c">/api/notes/42</T>
    <T x={24} y={90} a="start">Accept: application/json</T>
    <T x={24} y={110} a="start">Auth: Bearer ••••••</T>

    <Arrow d="M210 56h36" className="dg-flow" />
    <Arrow d="M246 98h-36" good className="dg-flow" />

    <rect x={250} y={10} width={200} height={118} rx={10} className="dg-box" />
    <T x={264} y={32} a="start" c="dg-l dg-tiny">RESPONSE</T>
    <rect x={264} y={42} width={66} height={22} rx={5} className="dg-good-bg" />
    <T x={297} y={57} c="dg-c dg-good-t">200 OK</T>
    <T x={264} y={90} a="start" c="dg-c">{'{ "id": 42,'}</T>
    <T x={264} y={110} a="start" c="dg-c">{'  "title": "Buy milk" }'}</T>

    {[
      ['2xx', 'success: it worked', 'dg-good-bg', 'dg-good-t'],
      ['4xx', 'client error: check your request', 'dg-warn-bg', 'dg-warn-t'],
      ['5xx', 'server error: not your fault', 'dg-bad-bg', 'dg-bad-t'],
    ].map(([code, d, bg, t], i) => (
      <g key={code}>
        <rect x={10} y={148 + i * 28} width={46} height={22} rx={5} className={bg} />
        <T x={33} y={163 + i * 28} c={`dg-c ${t}`}>{code}</T>
        <T x={66} y={163 + i * 28} a="start">{d}</T>
      </g>
    ))}
  </Svg>
);

/* 12 ─ SQL JOIN */
function Table({ x, title, cols, widths, rows, hl, good }: { x: number; title: string; cols: string[]; widths: number[]; rows: string[][]; hl?: number; good?: boolean }) {
  const w = widths.reduce((a, b) => a + b, 0);
  return (
    <g>
      <T x={x} y={70} a="start" c="dg-t">{title}</T>
      <rect x={x} y={78} width={w} height={24 * (rows.length + 1)} rx={6} className="dg-box" />
      <rect x={x} y={78} width={w} height={24} rx={6} className={good ? 'dg-good-bg' : 'dg-soft'} />
      {rows.map((_, r) => (
        <path key={r} d={`M${x} ${102 + r * 24}h${w}`} className="dg-line dg-faint" />
      ))}
      {cols.map((c, ci) => {
        const cx = x + widths.slice(0, ci).reduce((a, b) => a + b, 0);
        return (
          <g key={c}>
            {hl === ci && <rect x={cx + 2} y={104} width={widths[ci] - 4} height={24 * rows.length - 4} rx={4} className="dg-good-bg" />}
            <T x={cx + 8} y={95} a="start" c="dg-l dg-tiny">{c}</T>
            {rows.map((row, r) => (
              <T key={r} x={cx + 8} y={119 + r * 24} a="start" c={`dg-c${good ? ' dg-fade' : ''}`} style={good ? v(r + 2) : undefined}>
                {row[ci]}
              </T>
            ))}
          </g>
        );
      })}
    </g>
  );
}
const Sql: FC = () => (
  <Svg h={212} label="A JOIN matches rows from the users table to rows in the orders table where users.id equals orders.user_id.">
    <rect x={10} y={6} width={440} height={46} rx={8} className="dg-term" />
    <text x={22} y={25} className="dg-term-t dg-term-sm">
      <tspan className="dg-term-p">SELECT</tspan> users.name, orders.total <tspan className="dg-term-p">FROM</tspan> users
    </text>
    <text x={22} y={43} className="dg-term-t dg-term-sm">
      <tspan className="dg-term-p">JOIN</tspan> orders <tspan className="dg-term-p">ON</tspan> users.id = orders.user_id
    </text>
    <Table x={10} title="users" cols={['id', 'name']} widths={[40, 80]} rows={[['1', 'Ana'], ['2', 'Ben'], ['3', 'Cy']]} hl={0} />
    <Table x={166} title="orders" cols={['id', 'user_id', 'total']} widths={[40, 66, 50]} rows={[['10', '1', '$20'], ['11', '3', '$15'], ['12', '1', '$8']]} hl={1} />
    <Table x={344} title="result" cols={['name', 'total']} widths={[56, 50]} rows={[['Ana', '$20'], ['Cy', '$15'], ['Ana', '$8']]} good />
    <path d="M130 114C150 114 150 114 166 114M130 114C150 114 150 162 166 162M130 162C150 162 150 138 166 138" className="dg-line dg-good-s dg-flow" />
    <T x={10} y={204} a="start">JOIN pairs each order with the user whose id matches its user_id</T>
  </Svg>
);

/* 13 ─ The agent loop */
const LOOP_PATH = 'M240 47a78 78 0 1 1-0.01 0Z';
const AgentLoop: FC = () => {
  const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const stations: [number, number, string, string][] = [
    [240, 47, 'Think', 'plan the next step'],
    [308, 164, 'Act', 'call a tool'],
    [172, 164, 'Observe', 'read the result'],
  ];
  return (
    <Svg h={252} label="An agent loops: think about the next step, act by calling a tool, observe the result, and repeat until the goal is met, then answer.">
      <rect x={10} y={104} width={88} height={42} rx={10} className="dg-box" />
      <T x={54} y={130} c="dg-t">Goal</T>
      <Arrow d="M100 125h58" />

      <path d={LOOP_PATH} className="dg-line dg-faint dg-dash-loop" />
      {still ? (
        <circle cx={240} cy={47} r={6} className="dg-good" />
      ) : (
        <circle r={6} className="dg-good">
          <animateMotion dur="5s" repeatCount="indefinite" path={LOOP_PATH} />
        </circle>
      )}

      {stations.map(([cx, cy, t, d]) => (
        <g key={t}>
          <rect x={cx - 48} y={cy - 16} width={96} height={32} rx={16} className="dg-box" />
          <T x={cx} y={cy + 5} c="dg-t">{t}</T>
          <T x={cx} y={t === 'Think' ? cy - 24 : cy + 32}>{d}</T>
        </g>
      ))}

      {['search', 'code', 'files'].map((tool, i) => (
        <g key={tool}>
          <rect x={366} y={136 + i * 28} width={70} height={22} rx={6} className="dg-soft" />
          <T x={401} y={151 + i * 28} c="dg-l dg-tiny">{tool}</T>
        </g>
      ))}
      <path d="M356 164h8" className="dg-line dg-faint" />

      <rect x={352} y={20} width={98} height={42} rx={10} className="dg-good-bg" />
      <T x={401} y={46} c="dg-t dg-good-t">Answer ✓</T>
      <Arrow d="M290 42h58" good />
      <T x={319} y={58} c="dg-l dg-tiny dg-good-t">goal met?</T>

      <T x={230} y={246}>Repeats until the goal is met, a limit is hit, or a human approves.</T>
    </Svg>
  );
};

/** Lazy-loaded by the lesson drawer; renders nothing for lessons without a diagram yet. */
export default function LessonFigure({ topicId }: { topicId: string }) {
  const d = DIAGRAMS[topicId];
  if (!d) return null;
  return (
    <figure className="lesson-figure">
      <span className="kicker">See it</span>
      <div className="lesson-figure-art">
        <d.Figure />
      </div>
      <figcaption className="small muted">{d.caption}</figcaption>
    </figure>
  );
}

export const DIAGRAMS: Record<string, { Figure: FC; caption: string }> = {
  'how-internet-works': { Figure: Internet, caption: 'Every page load is a short conversation: find the address, ask for the page, receive the files.' },
  terminal: { Figure: Terminal, caption: 'Each command moves you around (cd) or looks around (ls, pwd) the same folders you see in your file explorer.' },
  git: { Figure: Git, caption: 'Work on a branch so main always stays working, then merge when your feature is done.' },
  html: { Figure: Html, caption: 'Same page, three layers. Start with solid HTML structure; CSS and JavaScript build on top of it.' },
  css: { Figure: Css, caption: 'Every element is a box. Most layout bugs are a padding, border or margin you didn’t expect.' },
  responsive: { Figure: Responsive, caption: 'One codebase, many screens. Design mobile-first, then add columns as space grows.' },
  javascript: { Figure: JavaScript, caption: 'Most front-end JavaScript follows this loop: something happens, your function runs, the page changes.' },
  dom: { Figure: Dom, caption: 'The browser turns your HTML into a tree of objects. JavaScript finds a node and changes it.' },
  'async-js': { Figure: Async, caption: 'Waiting for the network takes time. await lets the page keep working until the data arrives.' },
  react: { Figure: React_, caption: 'Change the state and React redraws every component that uses it. Data flows down, events flow up.' },
  'http-apis': { Figure: Http, caption: 'An API call is a request and a response. The status code tells you what happened before you read the body.' },
  sql: { Figure: Sql, caption: 'Tables link through ids. A JOIN follows those links to combine rows into one result.' },
  agents: { Figure: AgentLoop, caption: 'An agent is just a loop around a model. Your job is choosing its tools, its limits and when it should stop.' },
};
