import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import { TopicIcon } from './TechLogo';
import RoleArt from './RoleArt';
import { Check } from './Icons';
import { roadmaps } from '../data/roadmaps';
import { topics } from '../data/topics';
import { useProgress } from '../hooks/useProgress';
import { usePlan } from '../hooks/usePlan';

type Hit =
  | { kind: 'lesson'; id: string; title: string; sub: string; to: string; score: number }
  | { kind: 'roadmap'; id: string; title: string; sub: string; to: string; score: number };

const MAX = 8;
const norm = (s: string) => s.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '');

/** First roadmap a lesson appears in, preferring the learner's own plan. */
function homeOf(topicId: string, planRoadmap: string) {
  const has = (r: (typeof roadmaps)[number]) => r.stages.some((s) => s.topics.includes(topicId));
  return (roadmaps.find((r) => r.id === planRoadmap && has(r)) ?? roadmaps.find(has))!;
}

/** Title prefix beats a word inside the title, which beats a match in the lesson's text. */
function scoreOf(q: string, title: string, body: string) {
  const t = norm(title);
  if (t.startsWith(q)) return 100 - t.length / 100;
  if (t.split(/[^a-z0-9]+/).some((w) => w.startsWith(q))) return 70;
  if (t.includes(q)) return 50;
  if (norm(body).includes(q)) return 20;
  return 0;
}

export function search(query: string, planRoadmap: string): Hit[] {
  const words = norm(query).trim().split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  const hits: Hit[] = [];
  // every word must match somewhere; the score is the sum, so better matches rise
  const rank = (title: string, body: string) => {
    let total = 0;
    for (const w of words) {
      const s = scoreOf(w, title, body);
      if (!s) return 0;
      total += s;
    }
    return total;
  };
  for (const r of roadmaps) {
    const score = rank(r.title, `${r.tagline} ${r.role}`);
    if (score) hits.push({ kind: 'roadmap', id: r.id, title: r.title, sub: `Roadmap · ${r.tagline}`, to: `/roadmap/${r.id}`, score: score + 5 });
  }
  for (const t of Object.values(topics)) {
    const score = rank(t.title, `${t.summary} ${t.points.join(' ')}`);
    if (!score) continue;
    const home = homeOf(t.id, planRoadmap);
    hits.push({ kind: 'lesson', id: t.id, title: t.title, sub: `Lesson · ${home.title} · ~${t.hours}h`, to: `/roadmap/${home.id}?lesson=${t.id}`, score });
  }
  return hits.sort((a, b) => b.score - a.score || a.title.localeCompare(b.title)).slice(0, MAX);
}

const SUGGESTIONS = ['Git', 'React', 'SQL', 'Docker', 'Python', 'Testing'];

/** Find any lesson or roadmap by name or topic. Opened from the nav or with Ctrl/⌘+K. */
export default function SearchDialog({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();
  const { isDone } = useProgress();
  const { plan } = usePlan();
  const [q, setQ] = useState('');
  const [sel, setSel] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const hits = useMemo(() => search(q, plan.roadmap), [q, plan.roadmap]);

  // the dialog focuses its panel on open; move focus on to the input right after
  useEffect(() => {
    const t = window.setTimeout(() => input.current?.focus(), 0);
    return () => window.clearTimeout(t);
  }, []);
  useEffect(() => setSel(0), [q]);

  const go = (h: Hit) => {
    onClose();
    navigate(h.to);
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown' && hits.length) {
      e.preventDefault();
      setSel((s) => (s + 1) % hits.length);
    } else if (e.key === 'ArrowUp' && hits.length) {
      e.preventDefault();
      setSel((s) => (s - 1 + hits.length) % hits.length);
    } else if (e.key === 'Enter' && hits[sel]) {
      e.preventDefault();
      go(hits[sel]);
    }
  };

  return (
    <Modal label="Search lessons" onClose={onClose}>
      <div className="search">
        <label className="search-field">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            ref={input}
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={onKey}
            placeholder="Search lessons and roadmaps…"
            aria-label="Search lessons and roadmaps"
            role="combobox"
            aria-expanded={hits.length > 0}
            aria-controls="search-results"
            aria-activedescendant={hits[sel] ? `search-hit-${sel}` : undefined}
            autoComplete="off"
            spellCheck={false}
          />
        </label>

        {q.trim() === '' ? (
          <div className="search-empty">
            <span className="kicker">Try</span>
            <div className="search-suggest">
              {SUGGESTIONS.map((s) => (
                <button key={s} type="button" className="chip" onClick={() => setQ(s)}>{s}</button>
              ))}
            </div>
          </div>
        ) : hits.length === 0 ? (
          <p className="search-none muted">No lessons match “{q.trim()}”. Try a shorter word, like “test” or “api”.</p>
        ) : (
          <ul className="search-results" id="search-results" role="listbox" aria-label="Results">
            {hits.map((h, i) => (
              <li
                key={`${h.kind}-${h.id}`}
                id={`search-hit-${i}`}
                role="option"
                aria-selected={i === sel}
                className={`search-hit${i === sel ? ' on' : ''}`}
                onMouseMove={() => setSel(i)}
                onClick={() => go(h)}
              >
                {h.kind === 'lesson' ? <TopicIcon id={h.id} /> : <span className="search-role"><RoleArt role={h.id} /></span>}
                <span className="search-text">
                  <b>{h.title}</b>
                  <span className="small muted">{h.sub}</span>
                </span>
                {h.kind === 'lesson' && isDone(h.id) && (
                  <span className="chip chip-good search-done"><Check size={12} /> Done</span>
                )}
              </li>
            ))}
          </ul>
        )}
        <p className="search-keys mono faint small hide-sm">↑ ↓ to move · Enter to open · Esc to close</p>
      </div>
    </Modal>
  );
}
