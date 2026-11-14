import { useState, type CSSProperties, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { AI_SOURCES, AI_UPDATED, CONCEPTS, HARNESSES, SETUP, SKILL_CATEGORIES, SKILLS, WORKFLOW, type Skill, type SkillCategory } from '../data/aiWorkflow';
import { DEMAND } from '../data/stacks';
import { AI_RULES } from '../data/method';
import CodeBlock from '../components/CodeBlock';
import Modal from '../components/Modal';
import { SplitWords } from '../components/Motion';
import { Glyph, type GlyphKey } from '../components/Art';
import { ArrowRight, ArrowUpRight, Check, Close } from '../components/Icons';

const i = (n: number) => ({ '--i': n }) as CSSProperties;

function Ext({ href, children, className = '' }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className={`ai-ext ${className}`}>
      {children}
      <ArrowUpRight size={13} />
    </a>
  );
}

/** Brand mark drawn as a mask so it takes the brand colour; falls back to the monogram. */
function HarnessLogo({ h }: { h: (typeof HARNESSES)[number] }) {
  const [failed, setFailed] = useState(false);
  if (!h.logo || failed) {
    return (
      <span className="harness-mark mono" aria-hidden>
        {h.mark}
      </span>
    );
  }
  return (
    <span className="harness-logo" aria-hidden>
      {/* hidden probe image: if the CDN can't serve the logo, show the monogram instead */}
      <img src={h.logo.url} alt="" onError={() => setFailed(true)} hidden />
      <span className="harness-logo-mark" style={{ '--logo': `url(${h.logo.url})`, '--c': h.logo.color } as CSSProperties} />
    </span>
  );
}

const CATEGORY_GLYPH: Record<SkillCategory, GlyphKey> = { plan: 'compass', tokens: 'gauge', design: 'sparkle', collection: 'layers' };

function SkillCard({ s, n }: { s: Skill; n: number }) {
  const [open, setOpen] = useState(false);
  const category = SKILL_CATEGORIES.find((c) => c.id === s.category)!.label;
  const head = (
    <div className="skill-head">
      <span className="skill-icon" aria-hidden>
        <Glyph name={CATEGORY_GLYPH[s.category]} size={18} />
      </span>
      <div className="skill-titles">
        <b className="skill-name">{s.name}</b>
        <span className="skill-tag">{s.tagline}</span>
      </div>
    </div>
  );
  return (
    <article className="skill" data-reveal style={i(n)}>
      {head}
      <div className="skill-meta small">
        <span className="skill-cat">{category}</span>
        <span className="faint">by {s.author}</span>
      </div>
      <div className="skill-actions">
        <button className="skill-more" aria-haspopup="dialog" onClick={() => setOpen(true)}>
          Read more <ArrowRight size={14} />
        </button>
        <Ext href={s.repo} className="skill-repo small">GitHub</Ext>
      </div>

      {/* details open in a centred dialog, so the grid never shifts */}
      {open && (
        <Modal label={`${s.name}: details`} onClose={() => setOpen(false)}>
          <div className="skill-modal">
            {head}
            <div className="skill-meta small">
              <span className="skill-cat">{category}</span>
              <span className="faint">by {s.author}</span>
            </div>
            <p className="skill-modal-what">{s.what}</p>
            <dl className="skill-facts">
              <div>
                <dt className="kicker">Use it when</dt>
                <dd>{s.useWhen}</dd>
              </div>
              <div>
                <dt className="kicker">How to use it</dt>
                <dd>{s.howToUse}</dd>
              </div>
            </dl>
            <div>
              <span className="kicker skill-install-label">Install</span>
              <CodeBlock commands={s.install} />
            </div>
            <p className="skill-watch small">
              <b>Watch out:</b> {s.watchOut}
            </p>
            <Ext href={s.repo} className="btn btn-ghost skill-modal-repo">
              View {s.name} on GitHub
            </Ext>
          </div>
        </Modal>
      )}
    </article>
  );
}

function SkillBrowser() {
  const [cat, setCat] = useState<SkillCategory | 'all'>('all');
  const shown = SKILLS.filter((s) => cat === 'all' || s.category === cat);
  return (
    <>
      <div className="skill-tabs" role="group" aria-label="Filter skills by category">
        {SKILL_CATEGORIES.map((c) => {
          const count = c.id === 'all' ? SKILLS.length : SKILLS.filter((s) => s.category === c.id).length;
          return (
            <button key={c.id} className={`filter-chip${cat === c.id ? ' active' : ''}`} aria-pressed={cat === c.id} onClick={() => setCat(c.id)}>
              {c.label} <span className="skill-count">{count}</span>
            </button>
          );
        })}
      </div>
      {/* keyed so the cards re-enter when the category changes */}
      <div className="skill-grid" key={cat}>
        {shown.map((s, n) => (
          <SkillCard key={s.name} s={s} n={n} />
        ))}
      </div>
    </>
  );
}

export default function AiWorkflow() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="kicker rise" style={i(0)}>
            AI workflow · updated {AI_UPDATED}
          </span>
          <h1 className="page-title">
            <SplitWords text="Work with AI like a pro" start={1} />
          </h1>
          <p className="page-lead rise" style={i(5)}>
            The AI coding tools companies use, how to set them up, and the skills that make them work <em>for</em> you,
            not <em>instead</em> of you.
          </p>
          <nav className="ai-jump rise" style={i(6)} aria-label="On this page">
            {[
              ['#tools', 'The tools'],
              ['#concepts', 'Key ideas'],
              ['#setup', 'Set up Claude Code'],
              ['#skills', 'Skills to install'],
              ['#workflow', 'A good workflow'],
            ].map(([href, label]) => (
              <a key={href} href={href} onClick={(e) => { e.preventDefault(); document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }); }}>
                {label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* 1. the tools */}
      <section id="tools" className="section ai-section">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="kicker">// The tools</span>
            <h2>The AI coding tools developers use most</h2>
            <p className="muted">These are called <b>harnesses</b>: the app around the AI model that lets it read your project, edit files and run commands.</p>
          </div>
          <div className="harness-grid">
            {HARNESSES.map((h, n) => (
              <article key={h.name} className="harness" data-reveal style={i(n)}>
                <div className="harness-head">
                  <HarnessLogo h={h} />
                  <div className="harness-titles">
                    <b>{h.name}</b>
                    <span className="small faint">{h.kind}</span>
                  </div>
                  <span className={`demand demand-${h.demand}`}>{DEMAND[h.demand].label}</span>
                </div>
                {h.usage && <span className="harness-usage mono">{h.usage}</span>}
                <p className="harness-what">{h.what}</p>
                <p className="small muted"><b>Best for:</b> {h.bestFor}</p>
                <div className="harness-start">
                  {h.install ? <CodeBlock commands={h.install} /> : h.download && <Ext href={h.download.url} className="btn btn-ghost">{h.download.label}</Ext>}
                </div>
                <Ext href={h.docs} className="harness-docs small">Official docs</Ext>
              </article>
            ))}
          </div>
          <p className="small faint ai-source">Usage: share of developers using AI agents who use each tool, Stack Overflow Developer Survey 2026. “Good to know” tools weren’t ranked separately.</p>
        </div>
      </section>

      {/* 2. concepts */}
      <section id="concepts" className="section section-line ai-section">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="kicker">// Key ideas</span>
            <h2>Ideas every AI tool shares</h2>
            <p className="muted">Learn these once and you can use any harness. The names differ a little between tools, the ideas don’t.</p>
          </div>
          <div className="concept-grid">
            {CONCEPTS.map((c, n) => (
              <article key={c.name} className="concept" data-reveal style={i(n)}>
                <span className="concept-glyph"><Glyph name={c.glyph} size={20} /></span>
                <b>{c.name}</b>
                <p className="small muted">{c.what}</p>
                <code className="concept-example">{c.example}</code>
                <div className="concept-links">
                  <Ext href={c.link.url} className="small">{c.link.label}</Ext>
                  {c.lesson && (
                    <Link to={c.lesson} className="small ai-lesson">
                      Lesson <ArrowRight size={13} />
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. setup */}
      <section id="setup" className="section section-line ai-section">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="kicker">// Set up</span>
            <h2>Set up Claude Code in 6 steps</h2>
            <p className="muted">
              The most used harness, step by step. Codex, Gemini CLI and OpenCode work almost the same way: install, open your
              project, add a rules file, plan first.
            </p>
          </div>
          <ol className="setup">
            {SETUP.map((s, n) => (
              <li key={s.title} className="setup-step" data-reveal style={i(n)}>
                <span className="setup-num mono">{String(n + 1).padStart(2, '0')}</span>
                <div className="setup-body">
                  <h3>{s.title}</h3>
                  <p className="muted">{s.body}</p>
                  {/* the install step offers one command per OS as tabs; other steps show each command */}
                  {n === 0 ? <CodeBlock commands={s.commands} /> : s.commands.map((c) => <CodeBlock key={c.label} commands={[c]} />)}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 4. skills */}
      <section id="skills" className="section section-line ai-section">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="kicker">// Skills</span>
            <h2>Skills worth installing</h2>
            <p className="muted">Skills teach your agent a better way to work. Start with one, learn what it changes, then add more.</p>
          </div>
          <SkillBrowser />

          <div className="ai-safety" data-reveal>
            <span className="kicker">Stay safe with skills and plugins</span>
            <ul className="points">
              <li><b>Install from the official repo only.</b> Popular skills have many copycat forks; use the links on this page.</li>
              <li><b>Read a skill before installing it.</b> It runs with your agent’s permissions, so treat it like any code you run.</li>
              <li><b>Keep it small.</b> Every skill and MCP server uses some of the agent’s context. Remove what you don’t use.</li>
            </ul>
            <Ext href="https://github.com/hesreallyhim/awesome-claude-code" className="small">Find more in the curated awesome-claude-code list</Ext>
          </div>
        </div>
      </section>

      {/* 5. workflow */}
      <section id="workflow" className="section section-line ai-section">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="kicker">// Workflow</span>
            <h2>A workflow that keeps you learning</h2>
            <p className="muted">The tool matters less than the loop. This is how professionals work with coding agents, and how you keep your own skills growing.</p>
          </div>
          <ol className="flow">
            {WORKFLOW.map((w, n) => (
              <li key={w.t} className="flow-step" data-reveal style={i(n)}>
                <span className="flow-num mono">{n + 1}</span>
                <b>{w.t}</b>
                <span className="small muted">{w.d}</span>
              </li>
            ))}
          </ol>

          <div className="ai-rules-grid">
            <div className="card-plain" data-reveal>
              <span className="kicker">While you’re learning</span>
              <ul className="ai-rules">
                {AI_RULES.map((r) => (
                  <li key={r.t} className={r.ok ? 'ok' : 'no'}>
                    <span className="ai-icon">{r.ok ? <Check size={13} /> : <Close size={13} />}</span>
                    {r.t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-plain ai-next" data-reveal style={i(1)}>
              <span className="kicker">Go deeper</span>
              <Link to="/roadmap/agents?lesson=agentic-coding" className="ai-next-link">
                <b>Lesson: AI-Native Development</b>
                <span className="small muted">Working with coding agents, and reviewing what they write</span>
                <ArrowRight size={16} />
              </Link>
              <Link to="/learn" className="ai-next-link">
                <b>Quick start: how to study smart</b>
                <span className="small muted">Use AI as a tutor, not an autopilot</span>
                <ArrowRight size={16} />
              </Link>
              <Link to="/roadmap/agents" className="ai-next-link">
                <b>AI Agent Engineer roadmap</b>
                <span className="small muted">Build your own agents, tools and MCP servers</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="sources ai-sources" data-reveal>
            <span className="kicker">Sources</span>
            <ul>
              {AI_SOURCES.map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noreferrer" className="small">
                    {s.label}
                    <ArrowUpRight size={13} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
