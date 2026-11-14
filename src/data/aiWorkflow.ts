/**
 * Content for the "AI workflow" page. Every URL and install command here was checked against the
 * project's own docs or README (November 2026). Update AI_UPDATED when you re-check them.
 */
import type { GlyphKey } from '../components/Art';
import type { Demand } from './stacks';

export const AI_UPDATED = 'November 2026';

export interface Command {
  label: string;
  code: string;
}

export interface Harness {
  name: string;
  mark: string; // monogram fallback if the logo fails to load
  /** brand mark from Simple Icons (CC0), drawn in the brand's official colour */
  logo?: { url: string; color: string };
  kind: string;
  usage?: string;
  demand: Demand;
  what: string;
  bestFor: string;
  install?: Command[];
  download?: { label: string; url: string };
  docs: string;
}

export const HARNESSES: Harness[] = [
  {
    name: 'Claude Code',
    mark: 'CC',
    logo: { url: 'https://cdn.jsdelivr.net/npm/simple-icons@16.37.0/icons/claude.svg', color: '#D97757' },
    kind: 'Terminal agent · IDE extensions',
    usage: 'Used by 66% of AI-agent users',
    demand: 'core',
    what: 'Anthropic’s coding agent. It reads your whole project, edits many files, runs commands and tests, and works through a plan with you.',
    bestFor: 'Multi-file features, refactors and fixing bugs across a codebase.',
    install: [{ label: 'Mac / Linux', code: 'curl -fsSL https://claude.ai/install.sh | bash' }],
    docs: 'https://code.claude.com/docs/en/overview',
  },
  {
    name: 'GitHub Copilot',
    mark: 'GH',
    logo: { url: 'https://cdn.jsdelivr.net/npm/simple-icons@16.37.0/icons/githubcopilot.svg', color: '#000000' },
    kind: 'Editor assistant · cloud coding agent',
    usage: 'Used by 59%',
    demand: 'core',
    what: 'AI inside VS Code and other editors: completions, chat and an agent mode. Its coding agent can also take a GitHub issue and open a pull request.',
    bestFor: 'Teams already on GitHub, and help while you type.',
    download: { label: 'Copilot docs & setup', url: 'https://docs.github.com/en/copilot' },
    docs: 'https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent',
  },
  {
    name: 'OpenAI Codex',
    mark: 'Cx',
    logo: { url: 'https://cdn.jsdelivr.net/npm/simple-icons@13.21.0/icons/openai.svg', color: '#412991' },
    kind: 'Terminal agent · cloud agent',
    usage: 'Used by ~30%',
    demand: 'high',
    what: 'OpenAI’s open-source coding agent for the terminal, with a cloud version that works on tasks in the background.',
    bestFor: 'Developers in the OpenAI / ChatGPT ecosystem.',
    install: [{ label: 'npm', code: 'npm install -g @openai/codex' }],
    docs: 'https://developers.openai.com/codex',
  },
  {
    name: 'Cursor',
    mark: 'Cu',
    logo: { url: 'https://cdn.jsdelivr.net/npm/simple-icons@16.37.0/icons/cursor.svg', color: '#000000' },
    kind: 'AI-first code editor',
    usage: 'Used by 26%',
    demand: 'high',
    what: 'A code editor built around AI (based on VS Code), with an agent that edits across files and project rules you can share with your team.',
    bestFor: 'People who prefer working in an editor over a terminal.',
    download: { label: 'Download Cursor', url: 'https://cursor.com/download' },
    docs: 'https://cursor.com/docs',
  },
  {
    name: 'Google Antigravity',
    mark: 'Ag',
    logo: { url: 'https://cdn.jsdelivr.net/npm/simple-icons@16.37.0/icons/google.svg', color: '#4285F4' },
    kind: 'Agent-first IDE',
    usage: 'Used by 16%',
    demand: 'rising',
    what: 'Google’s agent-first development environment, where you hand tasks to agents and review their results.',
    bestFor: 'Trying agent-first workflows with Gemini models.',
    download: { label: 'Get Antigravity', url: 'https://antigravity.google' },
    docs: 'https://antigravity.google',
  },
  {
    name: 'Gemini CLI',
    mark: 'Gm',
    logo: { url: 'https://cdn.jsdelivr.net/npm/simple-icons@16.37.0/icons/googlegemini.svg', color: '#8E75B2' },
    kind: 'Open-source terminal agent',
    demand: 'optional',
    what: 'Google’s open-source agent for the terminal, powered by Gemini, with a generous free tier.',
    bestFor: 'Learning terminal agents for free.',
    install: [{ label: 'npm', code: 'npm install -g @google/gemini-cli' }],
    docs: 'https://github.com/google-gemini/gemini-cli',
  },
  {
    name: 'OpenCode',
    mark: 'OC',
    logo: { url: 'https://cdn.jsdelivr.net/npm/simple-icons@16.37.0/icons/opencode.svg', color: '#000000' },
    kind: 'Open-source terminal agent',
    demand: 'optional',
    what: 'An open-source coding agent that works with many model providers, including local models.',
    bestFor: 'Choosing your own model, or keeping everything open source.',
    install: [{ label: 'Mac / Linux', code: 'curl -fsSL https://opencode.ai/v2/install | bash' }],
    docs: 'https://opencode.ai',
  },
];

export interface Concept {
  name: string;
  glyph: GlyphKey;
  what: string;
  example: string;
  link: { label: string; url: string };
  lesson?: string; // in-app lesson link
}

export const CONCEPTS: Concept[] = [
  {
    name: 'Rules & memory files',
    glyph: 'checklist',
    what: 'A file in your project the agent reads every session: your commands, conventions and “never do this” rules.',
    example: 'CLAUDE.md · AGENTS.md (the cross-tool standard) · Cursor rules',
    link: { label: 'AGENTS.md standard', url: 'https://agents.md' },
  },
  {
    name: 'Plan first',
    glyph: 'compass',
    what: 'Ask the agent for a plan, read it, fix it, and only then let it write code. The single habit that prevents the most bad output.',
    example: 'Claude Code: press Shift+Tab to switch to plan mode',
    link: { label: 'Claude Code workflows', url: 'https://code.claude.com/docs/en/common-workflows' },
  },
  {
    name: 'Skills',
    glyph: 'sparkle',
    what: 'Reusable instructions (a SKILL.md file plus helpers) the agent loads only when a task needs them, like a recipe card.',
    example: 'A “write commit messages” or “review code” skill',
    link: { label: 'Skills docs', url: 'https://code.claude.com/docs/en/skills' },
  },
  {
    name: 'MCP servers',
    glyph: 'nodes',
    what: 'Plug-ins that give the agent new tools and data: a browser, your database, GitHub, Figma, your calendar.',
    example: 'claude mcp add playwright -- npx @playwright/mcp@latest',
    link: { label: 'MCP in Claude Code', url: 'https://code.claude.com/docs/en/mcp' },
    lesson: '/roadmap/agents?lesson=mcp',
  },
  {
    name: 'Subagents',
    glyph: 'network',
    what: 'Helper agents with their own fresh context for a side task (searching, reviewing), so your main conversation stays clean.',
    example: 'A “code reviewer” subagent that checks every change',
    link: { label: 'Subagents docs', url: 'https://code.claude.com/docs/en/sub-agents' },
  },
  {
    name: 'Hooks',
    glyph: 'bolt',
    what: 'Commands that run automatically at set moments, such as running the formatter after every edit. Rules the agent can’t forget.',
    example: 'Run Prettier after each file edit',
    link: { label: 'Hooks docs', url: 'https://code.claude.com/docs/en/hooks' },
  },
  {
    name: 'Plugins & marketplaces',
    glyph: 'layers',
    what: 'Bundles of skills, subagents, hooks and MCP servers you install in one command from a marketplace (a Git repo).',
    example: '/plugin install <name>@<marketplace>',
    link: { label: 'Plugins docs', url: 'https://code.claude.com/docs/en/plugins' },
  },
];

export interface Step {
  title: string;
  body: string;
  commands: Command[];
}

/** Claude Code setup, from the official quickstart. */
export const SETUP: Step[] = [
  {
    title: 'Install Claude Code',
    body: 'Pick the command for your computer and paste it into a terminal. When it finishes, open a new terminal and run claude --version to check it worked.',
    commands: [
      { label: 'Mac / Linux', code: 'curl -fsSL https://claude.ai/install.sh | bash' },
      { label: 'Windows (PowerShell)', code: 'irm https://claude.ai/install.ps1 | iex' },
      { label: 'Homebrew', code: 'brew install --cask claude-code' },
      { label: 'WinGet', code: 'winget install Anthropic.ClaudeCode' },
    ],
  },
  {
    title: 'Open your project and start it',
    body: 'Go into your project folder and run claude. The first time, it asks you to log in with your Claude account or an API key.',
    commands: [{ label: 'Terminal', code: 'cd my-project\nclaude' }],
  },
  {
    title: 'Create your rules file',
    body: 'Run /init. Claude reads your project and writes a CLAUDE.md. Open it and edit it: add how to run and test the app, your conventions, and things it must never do. Keep it short: every line is read in every session.',
    commands: [{ label: 'Inside Claude Code', code: '/init' }],
  },
  {
    title: 'Plan before any code',
    body: 'Press Shift+Tab to switch to plan mode, then describe what you want. Read the plan, push back on anything unclear, and approve it before code is written.',
    commands: [{ label: 'Example prompt', code: 'Plan how to add a dark-mode toggle to the settings page.\nAsk me questions first. Don’t write code yet.' }],
  },
  {
    title: 'Add skills and tools (optional)',
    body: 'Install a skill pack like Superpowers (below), and connect MCP servers for extra tools, for example a real browser the agent can test your app in.',
    commands: [
      { label: 'Skill pack', code: '/plugin install superpowers@claude-plugins-official' },
      { label: 'MCP server (terminal)', code: 'claude mcp add playwright -- npx @playwright/mcp@latest' },
    ],
  },
  {
    title: 'Review, test, commit',
    body: 'Read every change before you accept it, and ask “why?” about any line you can’t explain. Run the tests, then commit in small steps so you can always undo.',
    commands: [{ label: 'Terminal', code: 'git diff\nnpm test\ngit commit -m "Add dark-mode toggle"' }],
  },
];

export type SkillCategory = 'plan' | 'tokens' | 'design' | 'collection';

export const SKILL_CATEGORIES: { id: SkillCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'plan', label: 'Plan & think' },
  { id: 'tokens', label: 'Save tokens' },
  { id: 'design', label: 'Design' },
  { id: 'collection', label: 'Collections' },
];

export interface Skill {
  name: string;
  tagline: string;
  category: SkillCategory;
  author: string;
  repo: string;
  what: string;
  useWhen: string;
  howToUse: string;
  install: Command[];
  watchOut: string;
}

/** Repo links, descriptions and install commands come from each project's own GitHub page / README. */
export const SKILLS: Skill[] = [
  /* ---------- plan & think ---------- */
  {
    name: 'Superpowers',
    tagline: 'Makes the AI plan before it codes',
    category: 'plan',
    author: 'Jesse Vincent (obra)',
    repo: 'https://github.com/obra/superpowers',
    what: 'A complete working method for coding agents: it brainstorms with you, writes a spec you approve in small chunks, turns it into a step-by-step plan, then builds it with test-driven development and subagents that review each other’s work.',
    useWhen: 'Starting a new feature or project, when you want the AI to think before it types.',
    howToUse: 'After installing, just describe what you want to build. The skills trigger on their own: answer its questions, approve the design, then say “go” to run the plan.',
    install: [
      { label: 'Claude Code', code: '/plugin install superpowers@claude-plugins-official' },
      { label: 'Gemini CLI', code: 'gemini extensions install https://github.com/obra/superpowers' },
    ],
    watchOut: 'It can work on its own for a long time. Keep reading what it produces: autonomy is not a reason to stop reviewing.',
  },
  {
    name: 'Karpathy guidelines',
    tagline: 'Better default behaviour in one file',
    category: 'plan',
    author: 'multica-ai',
    repo: 'https://github.com/multica-ai/andrej-karpathy-skills',
    what: 'A single CLAUDE.md file of guidelines that improves how Claude Code behaves, based on Andrej Karpathy’s observations about the common mistakes AI makes when it writes code.',
    useWhen: 'You want better behaviour straight away, with nothing new to learn.',
    howToUse: 'Install the plugin, or read the CLAUDE.md and copy the guidelines that fit into your own project’s rules file.',
    install: [{ label: 'Claude Code', code: '/plugin marketplace add forrestchang/andrej-karpathy-skills\n/plugin install andrej-karpathy-skills@karpathy-skills' }],
    watchOut: 'It’s a set of rules, not magic. Read it once so you know what it asks the AI to do.',
  },
  {
    name: 'ponytail',
    tagline: 'Less code, simpler solutions',
    category: 'plan',
    author: 'Dietrich Gebert',
    repo: 'https://github.com/DietrichGebert/ponytail',
    what: '“Makes your AI agent think like the laziest senior dev in the room.” It pushes the agent toward the simplest thing that works: reuse existing code, prefer built-in features, and skip abstractions nobody asked for.',
    useWhen: 'The AI keeps over-engineering: extra files, layers and libraries for a small task.',
    howToUse: 'After installing it shapes how the agent approaches every task. Ask as usual and expect smaller, plainer changes.',
    install: [{ label: 'Claude Code', code: '/plugin marketplace add DietrichGebert/ponytail\n/plugin install ponytail@ponytail' }],
    watchOut: 'Install only from the DietrichGebert account: copycat forks exist. And if you genuinely need something built to scale, say so in your request.',
  },
  /* ---------- save tokens ---------- */
  {
    name: 'caveman',
    tagline: 'Shorter AI replies, fewer tokens',
    category: 'tokens',
    author: 'Julius Brussee',
    repo: 'https://github.com/JuliusBrussee/caveman',
    what: 'Makes the agent answer in short, telegraphic sentences while leaving code, commands and errors untouched. It also includes /caveman-compress to shrink memory files like CLAUDE.md, and /caveman-stats to see your real token use.',
    useWhen: 'Long sessions, or when you keep hitting usage limits. Turn it off (/caveman off) while you’re learning something new and want full explanations.',
    howToUse: 'After installing it’s on by default. Use /caveman to change the level, /caveman off to stop, and /caveman-help to see every command.',
    install: [
      { label: 'Claude Code', code: '/plugin marketplace add JuliusBrussee/caveman\n/plugin install caveman@caveman' },
      { label: 'Any agent', code: 'npx skills add JuliusBrussee/caveman -g' },
    ],
    watchOut: 'Savings vary: the repo claims up to 65% fewer output tokens, independent testers report around 15–25% off the total. Its command-line tool sends anonymous usage stats by default; run “caveman telemetry off” to stop that.',
  },
  {
    name: 'rtk (Rust Token Killer)',
    tagline: 'Shrinks command output before the AI reads it',
    category: 'tokens',
    author: 'rtk-ai',
    repo: 'https://github.com/rtk-ai/rtk',
    what: 'A small local tool that sits between your agent and the terminal. It compresses the output of common commands (test runs, git, builds) before the AI reads it, reducing token use by 60–90% on those commands. Single binary, no network access.',
    useWhen: 'Your agent runs lots of tests, builds and git commands, and long logs eat your context.',
    howToUse: 'Install it, then run rtk init -g once. That adds a hook so your agent’s shell commands go through rtk automatically.',
    install: [
      { label: 'Homebrew', code: 'brew install rtk\nrtk init -g' },
      { label: 'Mac / Linux', code: 'curl -fsSL https://raw.githubusercontent.com/rtk-ai/rtk/refs/heads/master/install.sh | sh\nrtk init -g' },
    ],
    watchOut: 'It only shortens shell commands, not Claude’s built-in Read and Grep tools. It trims output on purpose, so run a command without rtk when you need the full log. Output from failed commands is saved to disk.',
  },
  /* ---------- design ---------- */
  {
    name: 'frontend-design',
    tagline: 'Interfaces without the generic “AI look”',
    category: 'design',
    author: 'Anthropic (official plugin)',
    repo: 'https://github.com/anthropics/claude-plugins-official',
    what: 'Anthropic’s official plugin for creating distinctive, production-grade frontend interfaces with high design quality, avoiding generic AI aesthetics.',
    useWhen: 'Building landing pages, dashboards or any UI where looks matter.',
    howToUse: 'Install it, then ask for a page or component as usual. The skill kicks in for frontend work.',
    install: [{ label: 'Claude Code', code: '/plugin install frontend-design@claude-plugins-official' }],
    watchOut: 'Good taste still needs a human check: compare the result with your design or brand.',
  },
  {
    name: 'UI UX Pro Max',
    tagline: 'Design know-how for professional UI',
    category: 'design',
    author: 'nextlevelbuilder',
    repo: 'https://github.com/nextlevelbuilder/ui-ux-pro-max-skill',
    what: 'A skill that gives the agent design intelligence for building professional UI/UX across platforms: layout, colour, typography and component choices.',
    useWhen: 'You’re building a product UI and want more consistent, polished design decisions.',
    howToUse: 'Install it and describe the screen you want. Ask it to explain its design choices so you learn the reasoning too.',
    install: [{ label: 'Claude Code', code: '/plugin marketplace add nextlevelbuilder/ui-ux-pro-max-skill\n/plugin install ui-ux-pro-max@ui-ux-pro-max-skill' }],
    watchOut: 'It’s a large skill. Great for UI work; remove it on backend-only projects to save context.',
  },
  /* ---------- collections ---------- */
  {
    name: 'Anthropic’s official skills',
    tagline: 'Example skills to learn from',
    category: 'collection',
    author: 'Anthropic',
    repo: 'https://github.com/anthropics/skills',
    what: 'Official example skills, including working with Word, PDF and Excel documents, plus examples that show how a good skill is written.',
    useWhen: 'You want ready-made document skills, or you want to learn how to write your own skill by reading good ones.',
    howToUse: 'Install a pack, then mention it in your request, for example: “Use the PDF skill to extract the form fields from form.pdf”.',
    install: [{ label: 'Claude Code', code: '/plugin marketplace add anthropics/skills\n/plugin install document-skills@anthropic-agent-skills' }],
    watchOut: 'Install only what you’ll use: every installed skill adds a little to the agent’s context.',
  },
  {
    name: 'Skills for Real Engineers',
    tagline: 'Matt Pocock’s everyday engineering skills',
    category: 'collection',
    author: 'Matt Pocock',
    repo: 'https://github.com/mattpocock/skills',
    what: 'The skills Matt Pocock uses every day “to do real engineering, not vibe coding”. Small, composable and easy to adapt, and they work with any model.',
    useWhen: 'You want proven, lightweight skills you can read in minutes and make your own.',
    howToUse: 'Install the set, then open the skills folder and adapt them to how you work. They’re designed to be edited.',
    install: [
      { label: 'Claude Code', code: 'claude plugin install mattpocock-skills@claude-plugins-official' },
      { label: 'Other agents', code: 'npx skills@latest add mattpocock/skills' },
    ],
    watchOut: 'Treat them as a starting point, not a rulebook. The value is in adapting them.',
  },
  {
    name: 'Everything Claude Code',
    tagline: 'A big all-in-one toolkit',
    category: 'collection',
    author: 'affaan-m',
    repo: 'https://github.com/affaan-m/ECC',
    what: 'A large system of skills, memory, security checks and research-first workflows for Claude Code, Codex, OpenCode, Cursor and more.',
    useWhen: 'You’re comfortable with the basics and want to see how far a harness setup can go.',
    howToUse: 'Install it, browse what it adds with /plugin list, and keep the parts you actually use.',
    install: [{ label: 'Claude Code', code: '/plugin marketplace add https://github.com/affaan-m/ECC\n/plugin install ecc@ecc' }],
    watchOut: 'It’s big. Every skill costs context, so beginners should start with one small skill instead.',
  },
];

export const WORKFLOW = [
  { t: 'Write a spec', d: 'Two or three sentences: what you want, and what “done” looks like.' },
  { t: 'Get a plan', d: 'Plan mode. Read it and fix it before any code.' },
  { t: 'Let it draft', d: 'Small steps. One feature at a time.' },
  { t: 'Review the diff', d: 'Read every line. Ask “why?” about anything unclear.' },
  { t: 'Test it', d: 'Run the tests and try the feature yourself.' },
  { t: 'Commit', d: 'Small commits, so any mistake is one undo away.' },
];

export const AI_SOURCES = [
  { label: 'Stack Overflow Developer Survey 2026: AI coding agents', url: 'https://survey.stackoverflow.co/2026/ai/data/ai-code-agent' },
  { label: 'Claude Code docs: features overview', url: 'https://code.claude.com/docs/en/features-overview' },
  { label: 'obra/superpowers (GitHub)', url: 'https://github.com/obra/superpowers' },
  { label: 'JuliusBrussee/caveman (GitHub)', url: 'https://github.com/JuliusBrussee/caveman' },
  { label: 'anthropics/skills (GitHub)', url: 'https://github.com/anthropics/skills' },
  { label: 'awesome-claude-code: a curated list of more skills and tools', url: 'https://github.com/hesreallyhim/awesome-claude-code' },
  { label: 'rtk-ai/rtk (GitHub)', url: 'https://github.com/rtk-ai/rtk' },
  { label: 'DietrichGebert/ponytail (GitHub)', url: 'https://github.com/DietrichGebert/ponytail' },
  { label: 'Simple Icons: brand logos (CC0)', url: 'https://simpleicons.org' },
];
