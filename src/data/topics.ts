import type { Resource, Topic } from './types';

/* ---------- resource helpers ----------
 * Video links that aren't a specific known video point to a YouTube search scoped to
 * a trusted creator, so they never go dead when a video is re-uploaded.
 */
const yt = (q: string) => `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;
const v = (label: string, query: string): Resource => ({ label, url: yt(query), kind: 'video' });
const vd = (label: string, url: string): Resource => ({ label, url, kind: 'video' });
const d = (label: string, url: string): Resource => ({ label, url, kind: 'docs' });
const c = (label: string, url: string): Resource => ({ label, url, kind: 'course' });
const p = (label: string, url: string): Resource => ({ label, url, kind: 'practice' });
const a = (label: string, url: string): Resource => ({ label, url, kind: 'article' });
const b = (label: string, url: string): Resource => ({ label, url, kind: 'book' });

const list: Topic[] = [
  /* ================= FOUNDATIONS ================= */
  {
    id: 'how-to-learn',
    title: 'Quick Start: How to Study Smart',
    hours: 1,
    guide: '/learn',
    summary:
      'How you study matters as much as what you study. This short guided setup checks your current habits, teaches the Learning Loop every roadmap here is built on, shows exactly how to work through one lesson, explains how to use AI without losing your skills, and helps you make a weekly plan.',
    points: [
      'Find the study habits that slow you down, and what to do instead',
      'The Learning Loop: learn a little → build alone → struggle → explain → review',
      'Exactly how to study one lesson, and when it counts as done',
      'Using AI as a tutor, not an autopilot',
      'A weekly plan with an estimated finish date',
    ],
    resources: [
      vd('Learning How to Learn — Barbara Oakley (TEDx)', 'https://www.youtube.com/watch?v=O96fE1E-rf8'),
      vd('What AI does to the minds of novice coders (JetBrains Academy)', 'https://www.youtube.com/watch?v=HTUh0OO6Kmo'),
      vd('How to Learn To Code In 2026 (Jason Ku)', 'https://www.youtube.com/watch?v=wnMQJxEV0Lc'),
      vd('How to escape Tutorial Hell, with proof (Raw Coding)', 'https://www.youtube.com/watch?v=kUY4Z7YLTMU'),
      a('Anthropic — How AI assistance impacts coding skill formation', 'https://www.anthropic.com/research/AI-assistance-coding-skills'),
      c('Learning How to Learn (free Coursera course)', 'https://www.coursera.org/learn/learning-how-to-learn'),
    ],
  },
  {
    id: 'how-internet-works',
    title: 'How the Internet & the Web Work',
    hours: 3,
    summary:
      'Before writing code for the web, understand what happens when you type a URL: DNS turns a name into an IP address, your browser opens a TCP/TLS connection, sends an HTTP request, and a server sends back HTML, CSS and JavaScript to render. This mental model makes every later topic (performance, APIs, security, deployment) easier to reason about.',
    points: [
      'Clients, servers, IP addresses and ports',
      'DNS: how domain names resolve to IPs',
      'HTTP requests and responses, methods and status codes',
      'HTTPS and TLS at a high level',
      'What a browser does to render a page',
    ],
    resources: [
      a('Cloudflare Learning — What is DNS?', 'https://www.cloudflare.com/learning/dns/what-is-dns/'),
      d('MDN — HTTP overview', 'https://developer.mozilla.org/en-US/docs/Web/HTTP'),
      v('How the Internet Works (Code.org series)', 'code.org how the internet works'),
      v('What happens when you type a URL (ByteByteGo)', 'ByteByteGo what happens when you type a URL into your browser'),
    ],
  },
  {
    id: 'terminal',
    title: 'The Command Line',
    hours: 4,
    summary:
      'Developers live in the terminal: running dev servers, installing packages, using Git and connecting to servers. Get comfortable navigating the filesystem, chaining commands together and reading help pages without reaching for the mouse.',
    points: [
      'Navigating: pwd, ls, cd, mkdir, rm, mv, cp',
      'Pipes, redirection and grep',
      'Environment variables and your PATH',
      'Running scripts and reading --help / man pages',
    ],
    resources: [
      c('The Missing Semester of Your CS Education (MIT)', 'https://missing.csail.mit.edu/'),
      p('OverTheWire: Bandit — learn the shell by playing', 'https://overthewire.org/wargames/bandit/'),
      c('Linux Journey', 'https://linuxjourney.com/'),
      v('Command line crash course', 'command line crash course for beginners'),
    ],
  },
  {
    id: 'git',
    title: 'Git & GitHub',
    hours: 6,
    summary:
      'Git tracks every change to your code so you can experiment safely, undo mistakes and collaborate. GitHub hosts your repositories, and it doubles as your public portfolio: employers will look at it.',
    points: [
      'init, add, commit, status, log, diff',
      'Branches, merging and resolving conflicts',
      'Remotes: clone, push, pull, fetch',
      'Pull requests and the code review workflow',
      'Good commit messages and .gitignore',
    ],
    resources: [
      p('Learn Git Branching (interactive)', 'https://learngitbranching.js.org/'),
      b('Pro Git (free book)', 'https://git-scm.com/book/en/v2'),
      d('GitHub Docs — Get started', 'https://docs.github.com/en/get-started'),
      v('Git & GitHub crash course (freeCodeCamp)', 'freeCodeCamp git and github crash course'),
    ],
  },
  {
    id: 'dsa',
    title: 'Data Structures & Algorithms',
    hours: 20,
    summary:
      'You don’t need a CS degree, but knowing arrays, hash maps, stacks, trees and Big-O lets you write efficient code and pass technical interviews. Focus on recognising patterns rather than memorising solutions.',
    points: [
      'Big-O time and space complexity',
      'Arrays, strings, hash maps and sets',
      'Stacks, queues and linked lists',
      'Trees, graphs, BFS and DFS',
      'Sorting, binary search and recursion',
    ],
    resources: [
      p('NeetCode roadmap & problem list', 'https://neetcode.io/roadmap'),
      p('VisuAlgo — see algorithms animate', 'https://visualgo.net/en'),
      c('CS50x — Harvard’s intro to CS (free)', 'https://cs50.harvard.edu/x/'),
      v('Data structures: easy to advanced (freeCodeCamp)', 'freeCodeCamp data structures easy to advanced course'),
    ],
  },

  /* ================= FRONTEND ================= */
  {
    id: 'html',
    title: 'HTML & Semantic Markup',
    hours: 6,
    summary:
      'HTML is the skeleton of every web page. Learn to structure content with the right elements (headings, lists, links, forms, images) because semantic HTML is the foundation of accessibility, SEO and maintainable CSS.',
    points: [
      'Document structure: doctype, head, body, meta tags',
      'Semantic elements: header, nav, main, section, article, footer',
      'Links, images, lists and tables',
      'Forms: inputs, labels and validation attributes',
      'Basic SEO and Open Graph tags',
    ],
    resources: [
      c('web.dev — Learn HTML', 'https://web.dev/learn/html'),
      d('MDN — HTML reference', 'https://developer.mozilla.org/en-US/docs/Web/HTML'),
      c('freeCodeCamp — Responsive Web Design', 'https://www.freecodecamp.org/learn'),
      v('HTML & CSS full course (SuperSimpleDev)', 'SuperSimpleDev HTML CSS full course'),
    ],
  },
  {
    id: 'css',
    title: 'CSS Fundamentals',
    hours: 10,
    summary:
      'CSS controls how everything looks. Master the box model, selectors and the cascade first. Most “CSS is broken” moments come from not understanding specificity, inheritance, or how width and margin actually work.',
    points: [
      'Selectors, specificity and the cascade',
      'The box model, display and positioning',
      'Colors, typography and units (rem, %, vh)',
      'Custom properties (CSS variables)',
      'Transitions and simple animations',
    ],
    resources: [
      c('web.dev — Learn CSS', 'https://web.dev/learn/css'),
      d('MDN — CSS', 'https://developer.mozilla.org/en-US/docs/Web/CSS'),
      v('Kevin Powell — CSS for beginners', 'Kevin Powell CSS for beginners'),
      v('CSS in 100 seconds (Fireship)', 'Fireship CSS in 100 seconds'),
    ],
  },
  {
    id: 'responsive',
    title: 'Flexbox, Grid & Responsive Design',
    hours: 8,
    summary:
      'Modern layouts are built with Flexbox (one dimension) and CSS Grid (two dimensions). Combine them with media queries and fluid units so your pages work everywhere from a 320px phone to a 4K monitor. Design mobile-first.',
    points: [
      'Flexbox: direction, justify, align, wrap, gap',
      'CSS Grid: template columns/rows, areas, auto-fit + minmax',
      'Media queries and mobile-first thinking',
      'Fluid type and spacing with clamp()',
      'Responsive images',
    ],
    resources: [
      p('Flexbox Froggy', 'https://flexboxfroggy.com/'),
      p('Grid Garden', 'https://cssgridgarden.com/'),
      a('CSS-Tricks — A Complete Guide to Flexbox', 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/'),
      a('CSS-Tricks — A Complete Guide to CSS Grid', 'https://css-tricks.com/complete-guide-css-grid-layout/'),
      v('Kevin Powell — responsive layouts', 'Kevin Powell responsive layout flexbox grid'),
    ],
  },
  {
    id: 'javascript',
    title: 'JavaScript Fundamentals',
    hours: 25,
    summary:
      'JavaScript makes pages interactive and runs across the whole web stack. Spend real time here: strong fundamentals make React, Node and everything after far easier.',
    points: [
      'Variables, types, operators and control flow',
      'Functions, scope, closures and this',
      'Arrays and objects; map, filter and reduce',
      'ES modules, destructuring, spread, template literals',
      'Errors and debugging with DevTools',
    ],
    resources: [
      b('javascript.info — The Modern JavaScript Tutorial', 'https://javascript.info/'),
      d('MDN — JavaScript Guide', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide'),
      b('Eloquent JavaScript (free book)', 'https://eloquentjavascript.net/'),
      v('JavaScript full course (freeCodeCamp)', 'freeCodeCamp JavaScript full course for beginners'),
    ],
  },
  {
    id: 'dom',
    title: 'The DOM & Browser APIs',
    hours: 8,
    summary:
      'The DOM is the browser’s live tree of your page. Selecting elements, reacting to events and updating the page with plain JavaScript shows you what frameworks like React do for you under the hood.',
    points: [
      'Selecting and creating elements',
      'Events, bubbling and event delegation',
      'Forms and input handling',
      'localStorage and sessionStorage',
      'Timers, IntersectionObserver and other Web APIs',
    ],
    resources: [
      d('MDN — Introduction to the DOM', 'https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction'),
      b('javascript.info — Browser: Document, Events, Interfaces', 'https://javascript.info/ui'),
      p('JavaScript30 — 30 vanilla JS projects', 'https://javascript30.com/'),
      v('Web Dev Simplified — DOM crash course', 'Web Dev Simplified JavaScript DOM crash course'),
    ],
  },
  {
    id: 'async-js',
    title: 'Asynchronous JavaScript & APIs',
    hours: 8,
    summary:
      'Almost every real app talks to a server. Understand the event loop, Promises and async/await, then use fetch to load and send JSON, handling loading and error states properly.',
    points: [
      'The event loop and callbacks',
      'Promises, async/await and error handling',
      'fetch, JSON and HTTP methods',
      'Loading, empty and error UI states',
      'CORS basics',
    ],
    resources: [
      d('MDN — Using Fetch', 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch'),
      b('javascript.info — Promises, async/await', 'https://javascript.info/async'),
      v('What the heck is the event loop? (Philip Roberts)', 'Philip Roberts what the heck is the event loop anyway'),
      v('Async/await explained (Fireship)', 'Fireship async await JavaScript'),
    ],
  },
  {
    id: 'tooling',
    title: 'npm, Bundlers & Dev Tooling',
    hours: 4,
    summary:
      'Real projects use packages and build tools. Learn how npm manages dependencies, what a bundler like Vite does, and how linters and formatters keep a codebase clean.',
    points: [
      'package.json; dependencies vs devDependencies',
      'npm scripts and semantic versioning',
      'Vite: dev server, builds and environment variables',
      'ESLint and Prettier',
    ],
    resources: [
      d('npm Docs', 'https://docs.npmjs.com/'),
      d('Vite Guide', 'https://vite.dev/guide/'),
      d('ESLint — Getting started', 'https://eslint.org/docs/latest/use/getting-started'),
      v('Vite in 100 seconds (Fireship)', 'Fireship Vite in 100 seconds'),
    ],
  },
  {
    id: 'typescript',
    title: 'TypeScript',
    hours: 10,
    summary:
      'TypeScript adds types to JavaScript so your editor catches bugs before your users do. It’s now the default in most professional codebases, frontend and backend.',
    points: [
      'Basic types, interfaces and type aliases',
      'Unions, narrowing and literal types',
      'Generics',
      'Typing functions, objects and API responses',
      'tsconfig and strict mode',
    ],
    resources: [
      d('TypeScript Handbook', 'https://www.typescriptlang.org/docs/handbook/intro.html'),
      d('React TypeScript Cheatsheet', 'https://react-typescript-cheatsheet.netlify.app/'),
      p('Type Challenges', 'https://github.com/type-challenges/type-challenges'),
      v('Matt Pocock — TypeScript for beginners', 'Matt Pocock TypeScript tutorial beginners'),
    ],
  },
  {
    id: 'react',
    title: 'React',
    hours: 25,
    summary:
      'React is the most widely used UI library. Think in components: small, reusable pieces that take props, hold state and re-render when data changes. Learn the core hooks deeply before adding extra libraries.',
    points: [
      'JSX, components and props',
      'State with useState, and lifting state up',
      'Effects (useEffect), and when you don’t need them',
      'Lists, keys, forms and controlled inputs',
      'Custom hooks and composition',
    ],
    resources: [
      d('react.dev — Learn React (official)', 'https://react.dev/learn'),
      c('Full Stack Open — Parts 1 & 2', 'https://fullstackopen.com/en/'),
      v('Net Ninja — React tutorial', 'Net Ninja React tutorial for beginners'),
      v('React in 100 seconds (Fireship)', 'Fireship React in 100 seconds'),
    ],
  },
  {
    id: 'state-routing',
    title: 'Routing, State & Data Fetching',
    hours: 10,
    summary:
      'Larger apps need client-side routing, shared state, and a smart way to fetch and cache server data. Learn when local state is enough and when a library actually helps.',
    points: [
      'Client-side routing with React Router',
      'Context vs global stores (Zustand, Redux Toolkit)',
      'Server state and caching with TanStack Query',
      'The URL as state: params and search params',
    ],
    resources: [
      d('React Router docs', 'https://reactrouter.com/'),
      d('TanStack Query docs', 'https://tanstack.com/query/latest'),
      d('Zustand', 'https://github.com/pmndrs/zustand'),
      d('Redux Toolkit — Essentials tutorial', 'https://redux.js.org/tutorials/essentials/part-1-overview-concepts'),
      v('React Query in 100 seconds (Fireship)', 'Fireship React Query in 100 seconds'),
    ],
  },
  {
    id: 'tailwind',
    title: 'Styling at Scale: Tailwind & Design Systems',
    hours: 6,
    summary:
      'Teams need consistent styling. Utility-first CSS like Tailwind, component libraries and design tokens let you build polished interfaces quickly while keeping them consistent.',
    points: [
      'Utility-first CSS with Tailwind',
      'Design tokens: color, spacing and type scales',
      'Component libraries (shadcn/ui, Radix)',
      'CSS Modules and scoped styles',
    ],
    resources: [
      d('Tailwind CSS docs', 'https://tailwindcss.com/docs'),
      d('shadcn/ui', 'https://ui.shadcn.com/'),
      d('Radix Primitives', 'https://www.radix-ui.com/primitives'),
      v('Tailwind CSS crash course', 'Tailwind CSS crash course'),
    ],
  },
  {
    id: 'accessibility',
    title: 'Web Accessibility (a11y)',
    hours: 6,
    summary:
      'Accessible sites work for everyone: keyboard users, screen reader users, people with low vision. It’s a legal requirement in many places and a mark of a strong frontend developer.',
    points: [
      'Semantic HTML and landmarks',
      'Keyboard navigation and focus management',
      'ARIA: when (and when not) to use it',
      'Color contrast, alt text and form labels',
      'Testing with Lighthouse, axe and a real screen reader',
    ],
    resources: [
      c('web.dev — Learn Accessibility', 'https://web.dev/learn/accessibility'),
      d('MDN — Accessibility', 'https://developer.mozilla.org/en-US/docs/Web/Accessibility'),
      d('W3C — WCAG overview', 'https://www.w3.org/WAI/standards-guidelines/wcag/'),
      v('Kevin Powell — accessibility', 'Kevin Powell web accessibility'),
    ],
  },
  {
    id: 'performance',
    title: 'Web Performance',
    hours: 5,
    summary:
      'Fast sites keep users and rank higher. Measure with Core Web Vitals, then fix the usual suspects: heavy JavaScript, unoptimised images and render-blocking resources.',
    points: [
      'Core Web Vitals: LCP, INP, CLS',
      'Lighthouse and the DevTools Performance panel',
      'Code splitting and lazy loading',
      'Image formats, sizing and caching',
    ],
    resources: [
      c('web.dev — Learn Performance', 'https://web.dev/learn/performance'),
      a('web.dev — Web Vitals', 'https://web.dev/articles/vitals'),
      d('Chrome DevTools — Performance', 'https://developer.chrome.com/docs/devtools/performance'),
      v('Core Web Vitals explained', 'Chrome for Developers core web vitals explained'),
    ],
  },
  {
    id: 'frontend-testing',
    title: 'Frontend Testing',
    hours: 6,
    summary:
      'Tests let you change code with confidence. Start with unit tests for logic, component tests that interact like a real user, and a few end-to-end tests for critical flows.',
    points: [
      'Unit testing with Vitest or Jest',
      'Component tests with Testing Library',
      'End-to-end tests with Playwright',
      'What to test, and what not to',
    ],
    resources: [
      d('Vitest guide', 'https://vitest.dev/guide/'),
      d('Testing Library docs', 'https://testing-library.com/docs/'),
      d('Playwright — Getting started', 'https://playwright.dev/docs/intro'),
      v('React Testing Library tutorial', 'Web Dev Simplified React testing library'),
    ],
  },
  {
    id: 'nextjs',
    title: 'Next.js & Full-Stack React',
    hours: 12,
    summary:
      'Meta-frameworks like Next.js add routing, server rendering, data loading and API endpoints to React. They’re the default way to ship production React today, and they blur the line between frontend and backend.',
    points: [
      'File-based routing and layouts',
      'Server vs Client Components',
      'SSR, static generation and caching',
      'Server Actions and route handlers',
      'Deploying to Vercel',
    ],
    resources: [
      c('Next.js Learn (official course)', 'https://nextjs.org/learn'),
      d('Next.js docs', 'https://nextjs.org/docs'),
      v('Next.js full course', 'Next.js full course for beginners'),
      v('Next.js in 100 seconds (Fireship)', 'Fireship Next.js in 100 seconds'),
    ],
  },
  {
    id: 'deploy-web',
    title: 'Deploying Web Apps',
    hours: 3,
    summary:
      'A project isn’t done until it’s live. Deploy static sites and full-stack apps, connect a custom domain and manage environment variables safely.',
    points: [
      'Static hosting: Vercel, Netlify, GitHub Pages',
      'Environment variables and secrets',
      'Custom domains, DNS and HTTPS',
      'Preview deployments per pull request',
    ],
    resources: [
      d('Vercel docs', 'https://vercel.com/docs'),
      d('Netlify docs', 'https://docs.netlify.com/'),
      d('GitHub Pages docs', 'https://docs.github.com/en/pages'),
      v('Deploy a website for free', 'deploy website for free vercel netlify tutorial'),
    ],
  },

  /* ================= BACKEND ================= */
  {
    id: 'nodejs',
    title: 'Node.js',
    hours: 12,
    summary:
      'Node.js runs JavaScript on the server, so you can use one language across the stack. Learn its module system, the event loop, files and streams, and how to build an HTTP server from scratch.',
    points: [
      'Modules, npm and the Node runtime',
      'The event loop and non-blocking I/O',
      'fs, path, streams and process.env',
      'Building a raw HTTP server',
      'Error handling and async patterns',
    ],
    resources: [
      d('Node.js — Learn', 'https://nodejs.org/en/learn'),
      c('Full Stack Open — Part 3', 'https://fullstackopen.com/en/part3'),
      v('Traversy Media — Node.js crash course', 'Traversy Media Node.js crash course'),
      v('Node.js in 100 seconds (Fireship)', 'Fireship Node.js in 100 seconds'),
    ],
  },
  {
    id: 'python',
    title: 'Python',
    hours: 15,
    summary:
      'Python is readable, versatile, and the language of AI, data and a lot of backend work. Learn the core language well (data types, functions, classes and the standard library) plus virtual environments and packages.',
    points: [
      'Syntax, data types and control flow',
      'Lists, dicts, sets and comprehensions',
      'Functions, classes and modules',
      'Virtual environments and pip / uv',
      'Files, exceptions and the standard library',
    ],
    resources: [
      d('The official Python tutorial', 'https://docs.python.org/3/tutorial/'),
      c('CS50’s Introduction to Programming with Python', 'https://cs50.harvard.edu/python/'),
      b('Automate the Boring Stuff with Python', 'https://automatetheboringstuff.com/'),
      v('Corey Schafer — Python tutorials', 'Corey Schafer Python beginner tutorial'),
    ],
  },
  {
    id: 'http-apis',
    title: 'HTTP & REST API Design',
    hours: 6,
    summary:
      'APIs are how frontends, mobile apps and services talk to your backend. Learn HTTP in depth and design clean, predictable REST endpoints with proper status codes, validation and versioning.',
    points: [
      'HTTP methods, headers, status codes and cookies',
      'Resource-oriented URL design',
      'Validation, pagination and filtering',
      'Idempotency and versioning',
      'Documenting with OpenAPI; testing with Postman or Bruno',
    ],
    resources: [
      d('MDN — HTTP', 'https://developer.mozilla.org/en-US/docs/Web/HTTP'),
      a('Microsoft — Web API design best practices', 'https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design'),
      d('OpenAPI — Learn', 'https://learn.openapis.org/'),
      v('REST APIs explained (ByteByteGo)', 'ByteByteGo REST API explained'),
    ],
  },
  {
    id: 'server-framework',
    title: 'Backend Frameworks',
    hours: 12,
    summary:
      'Frameworks give you routing, middleware and structure so you can focus on business logic. Pick one ecosystem (Express or Fastify for Node, FastAPI or Django for Python) and build real CRUD APIs with it.',
    points: [
      'Routing, controllers and middleware',
      'Request validation (Zod / Pydantic)',
      'Error handling and logging',
      'Project structure and configuration',
      'Other options: NestJS, Django, Go, Spring',
    ],
    resources: [
      d('Express docs', 'https://expressjs.com/'),
      d('Fastify docs', 'https://fastify.dev/docs/latest/'),
      d('FastAPI tutorial', 'https://fastapi.tiangolo.com/tutorial/'),
      v('Traversy Media — Express crash course', 'Traversy Media Express crash course'),
    ],
  },
  {
    id: 'sql',
    title: 'SQL & Relational Databases',
    hours: 15,
    summary:
      'Most applications store their data in a relational database like PostgreSQL. SQL is one of the most valuable and longest-lasting skills you can learn: design tables, write queries and understand indexes.',
    points: [
      'SELECT, WHERE, JOINs and GROUP BY',
      'Schema design, keys and normalisation',
      'Indexes and query performance (EXPLAIN)',
      'Transactions and ACID',
      'PostgreSQL specifics',
    ],
    resources: [
      p('SQLBolt — interactive lessons', 'https://sqlbolt.com/'),
      d('PostgreSQL tutorial (official)', 'https://www.postgresql.org/docs/current/tutorial.html'),
      p('PostgreSQL Exercises', 'https://pgexercises.com/'),
      v('SQL full course (freeCodeCamp)', 'freeCodeCamp SQL full course'),
    ],
  },
  {
    id: 'orm',
    title: 'ORMs & Migrations',
    hours: 4,
    summary:
      'ORMs and query builders map database tables to code, and migrations version-control your schema. Learn one well, and learn when to drop down to raw SQL.',
    points: [
      'Defining models and schemas',
      'Migrations and seeding',
      'Relations and the N+1 problem',
      'Raw SQL escape hatches',
    ],
    resources: [
      d('Prisma docs', 'https://www.prisma.io/docs'),
      d('Drizzle ORM docs', 'https://orm.drizzle.team/docs/overview'),
      d('SQLAlchemy tutorial', 'https://docs.sqlalchemy.org/en/20/tutorial/'),
      v('Prisma crash course', 'Prisma ORM crash course'),
    ],
  },
  {
    id: 'nosql-caching',
    title: 'NoSQL & Caching',
    hours: 6,
    summary:
      'Not everything fits neatly in tables. Document stores like MongoDB and key-value stores like Redis solve specific problems, especially caching, sessions, rate limiting and queues.',
    points: [
      'Document databases (MongoDB)',
      'Key-value stores and Redis data types',
      'Caching strategies: cache-aside, TTL, invalidation',
      'Choosing SQL vs NoSQL',
    ],
    resources: [
      d('Redis docs', 'https://redis.io/docs/latest/'),
      c('MongoDB University (free)', 'https://learn.mongodb.com/'),
      v('Redis in 100 seconds (Fireship)', 'Fireship Redis in 100 seconds'),
      v('Caching strategies (ByteByteGo)', 'ByteByteGo caching strategies'),
    ],
  },
  {
    id: 'auth',
    title: 'Authentication & Authorization',
    hours: 8,
    summary:
      'Almost every app needs users. Learn to store passwords safely, manage sessions or tokens and add social login with OAuth, and understand how authorization (what a user may do) differs from authentication (who they are).',
    points: [
      'Password hashing (bcrypt / argon2)',
      'Sessions and cookies vs JWTs',
      'OAuth 2.0 and OpenID Connect',
      'Role-based access control',
      'Auth providers: Auth.js, Clerk, Supabase Auth',
    ],
    resources: [
      d('OWASP — Authentication Cheat Sheet', 'https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html'),
      a('JWT.io — Introduction', 'https://jwt.io/introduction'),
      a('OAuth 2.0 Simplified', 'https://www.oauth.com/'),
      v('Session vs token authentication (ByteByteGo)', 'ByteByteGo session vs JWT authentication'),
    ],
  },
  {
    id: 'security',
    title: 'Web Security Basics',
    hours: 5,
    summary:
      'Security is everyone’s job. Know the OWASP Top 10 and how to defend against the common attacks (injection, XSS, CSRF, broken access control) and how to handle secrets.',
    points: [
      'The OWASP Top 10',
      'SQL injection and parameterised queries',
      'XSS, CSRF and CORS',
      'Secrets management and HTTPS everywhere',
      'Rate limiting and input validation',
    ],
    resources: [
      d('OWASP Top Ten', 'https://owasp.org/www-project-top-ten/'),
      d('OWASP Cheat Sheet Series', 'https://cheatsheetseries.owasp.org/'),
      p('PortSwigger Web Security Academy (free)', 'https://portswigger.net/web-security'),
      v('OWASP Top 10 explained', 'OWASP top 10 explained for developers'),
    ],
  },
  {
    id: 'backend-testing',
    title: 'Testing Backends',
    hours: 5,
    summary:
      'Backends hold the important logic and data, so tests matter. Write unit tests for logic, integration tests against a real database, and API tests for your endpoints.',
    points: [
      'Unit vs integration vs end-to-end tests',
      'Testing HTTP endpoints (Supertest / TestClient)',
      'Test databases and fixtures',
      'Mocking external services',
    ],
    resources: [
      d('Vitest guide', 'https://vitest.dev/guide/'),
      d('pytest — Getting started', 'https://docs.pytest.org/en/stable/getting-started.html'),
      d('Supertest', 'https://github.com/ladjs/supertest'),
      v('Node.js API testing', 'Node.js API testing tutorial'),
    ],
  },
  {
    id: 'realtime-queues',
    title: 'Real-time & Background Jobs',
    hours: 5,
    summary:
      'Some work shouldn’t happen inside a request: sending emails, processing uploads, generating reports. And some features need live updates. Learn queues, workers and WebSockets.',
    points: [
      'WebSockets and Server-Sent Events',
      'Job queues and workers (BullMQ, Celery)',
      'Message brokers: RabbitMQ and Kafka basics',
      'Cron jobs and retries',
    ],
    resources: [
      d('MDN — WebSockets API', 'https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API'),
      d('Socket.IO docs', 'https://socket.io/docs/v4/'),
      d('BullMQ docs', 'https://docs.bullmq.io/'),
      d('RabbitMQ tutorials', 'https://www.rabbitmq.com/tutorials'),
      v('Message queues explained (ByteByteGo)', 'ByteByteGo message queue explained'),
    ],
  },
  {
    id: 'system-design',
    title: 'System Design',
    hours: 15,
    summary:
      'System design is how you plan software that handles real traffic: load balancers, caches, databases, queues, and how they fit together. It’s essential for mid and senior roles, and for interviews.',
    points: [
      'Scalability: vertical vs horizontal',
      'Load balancing, CDNs and caching layers',
      'Database replication and sharding',
      'The CAP theorem and consistency',
      'Designing common systems (URL shortener, chat, news feed)',
    ],
    resources: [
      b('The System Design Primer', 'https://github.com/donnemartin/system-design-primer'),
      b('Designing Data-Intensive Applications', 'https://dataintensive.net/'),
      v('ByteByteGo — system design', 'ByteByteGo system design'),
      v('Hussein Nasser — backend engineering', 'Hussein Nasser backend engineering'),
    ],
  },
  {
    id: 'fullstack-arch',
    title: 'Full-Stack Architecture',
    hours: 6,
    summary:
      'Connect the pieces: how the frontend, API, database, auth and hosting fit together. Learn when a simple monolith is right, how type-safe APIs and monorepos help, and when a backend-as-a-service saves weeks.',
    points: [
      'Monolith vs separate frontend/backend vs services',
      'Type-safe APIs (tRPC, shared Zod schemas)',
      'Monorepos (Turborepo, pnpm workspaces)',
      'Backend-as-a-service: Supabase, Firebase',
      'Payments, email and file uploads as services',
    ],
    resources: [
      d('tRPC docs', 'https://trpc.io/docs'),
      d('Supabase docs', 'https://supabase.com/docs'),
      d('Turborepo docs', 'https://turborepo.com/docs'),
      c('Full Stack Open', 'https://fullstackopen.com/en/'),
      v('Build a full-stack app', 'full stack app tutorial Next.js Postgres'),
    ],
  },

  /* ================= DEVOPS & CLOUD ================= */
  {
    id: 'linux',
    title: 'Linux & Servers',
    hours: 10,
    summary:
      'Most servers run Linux. Go beyond basic commands: users and permissions, processes, services, package managers, logs and SSH. This is the daily toolkit of anyone running software in production.',
    points: [
      'Filesystem hierarchy and permissions',
      'Processes, signals and systemd services',
      'Package managers (apt, dnf)',
      'SSH, keys and remote servers',
      'Logs and troubleshooting (journalctl, top, df)',
    ],
    resources: [
      c('Linux Journey', 'https://linuxjourney.com/'),
      p('OverTheWire: Bandit', 'https://overthewire.org/wargames/bandit/'),
      v('NetworkChuck — Linux for beginners', 'NetworkChuck Linux for beginners'),
      v('Linux full course (freeCodeCamp)', 'freeCodeCamp Linux full course'),
    ],
  },
  {
    id: 'networking',
    title: 'Networking for Engineers',
    hours: 8,
    summary:
      'When something breaks in production, it’s often the network. Understand IP addressing, DNS, TCP vs UDP, ports, firewalls, proxies and load balancers.',
    points: [
      'The OSI and TCP/IP models',
      'IP addresses, subnets and CIDR',
      'DNS records (A, CNAME, MX, TXT)',
      'TCP vs UDP, ports and TLS',
      'Proxies, reverse proxies and load balancers',
    ],
    resources: [
      a('Cloudflare Learning Center', 'https://www.cloudflare.com/learning/'),
      b('High Performance Browser Networking (free)', 'https://hpbn.co/'),
      v('Computer networking course (freeCodeCamp)', 'freeCodeCamp computer networking full course'),
      v('NetworkChuck — networking basics', 'NetworkChuck networking basics'),
    ],
  },
  {
    id: 'scripting',
    title: 'Shell Scripting & Automation',
    hours: 6,
    summary:
      'DevOps is about automating repetitive work. Write Bash scripts for glue tasks and Python for anything more complex, and pick up tools like cron, jq and make.',
    points: [
      'Bash variables, loops and conditionals',
      'Exit codes and set -euo pipefail',
      'Text processing: grep, sed, awk, jq',
      'Python for automation',
      'Scheduling with cron',
    ],
    resources: [
      d('BashGuide (Greg’s Wiki)', 'https://mywiki.wooledge.org/BashGuide'),
      p('ShellCheck — lint your scripts', 'https://www.shellcheck.net/'),
      b('Automate the Boring Stuff with Python', 'https://automatetheboringstuff.com/'),
      v('Bash scripting full course', 'Bash scripting full course beginners'),
    ],
  },
  {
    id: 'docker',
    title: 'Docker & Containers',
    hours: 8,
    summary:
      'Containers package your app with everything it needs, so it runs the same on your laptop, in CI and in production. Docker is now a baseline skill for backend and DevOps engineers.',
    points: [
      'Images vs containers',
      'Writing Dockerfiles; layers and caching',
      'Volumes and networking',
      'Docker Compose for multi-service apps',
      'Multi-stage builds and small images',
    ],
    resources: [
      d('Docker — Get started', 'https://docs.docker.com/get-started/'),
      p('Play with Docker', 'https://labs.play-with-docker.com/'),
      v('TechWorld with Nana — Docker tutorial', 'TechWorld with Nana Docker tutorial for beginners'),
      v('Docker in 100 seconds (Fireship)', 'Fireship Docker in 100 seconds'),
    ],
  },
  {
    id: 'ci-cd',
    title: 'CI/CD Pipelines',
    hours: 6,
    summary:
      'Continuous Integration runs your tests and checks on every push; Continuous Delivery ships passing code automatically. Good pipelines make teams faster and releases boring, in a good way.',
    points: [
      'CI basics: build, lint and test on every PR',
      'GitHub Actions workflows, jobs and secrets',
      'Build artifacts and container registries',
      'Deployment strategies: blue-green, canary, rollbacks',
    ],
    resources: [
      d('GitHub Actions docs', 'https://docs.github.com/en/actions'),
      d('GitLab CI/CD docs', 'https://docs.gitlab.com/ee/ci/'),
      v('TechWorld with Nana — GitHub Actions', 'TechWorld with Nana GitHub Actions tutorial'),
      v('CI/CD explained (ByteByteGo)', 'ByteByteGo CI CD pipeline explained'),
    ],
  },
  {
    id: 'cloud',
    title: 'Cloud Fundamentals (AWS)',
    hours: 15,
    summary:
      'Companies run on AWS, Azure and Google Cloud. Learn the core building blocks (compute, storage, databases, networking and IAM) on one provider; the concepts transfer to the others.',
    points: [
      'IAM: users, roles and least privilege',
      'Compute: EC2, containers (ECS) and serverless (Lambda)',
      'Storage and databases: S3, RDS, DynamoDB',
      'Networking: VPCs, subnets and security groups',
      'Cost awareness and the free tier',
    ],
    resources: [
      c('AWS Skill Builder (free courses)', 'https://skillbuilder.aws/'),
      d('AWS — Getting started', 'https://aws.amazon.com/getting-started/'),
      v('AWS Cloud Practitioner course (freeCodeCamp)', 'freeCodeCamp AWS Certified Cloud Practitioner'),
      v('AWS services explained (Fireship)', 'Fireship AWS services explained'),
    ],
  },
  {
    id: 'kubernetes',
    title: 'Kubernetes',
    hours: 15,
    summary:
      'Kubernetes orchestrates containers across many machines: scheduling, scaling, self-healing and rolling updates. It’s complex, so learn it once you’re comfortable with Docker and Linux.',
    points: [
      'Pods, Deployments and Services',
      'ConfigMaps, Secrets and volumes',
      'Ingress and networking',
      'Scaling and health checks',
      'Helm charts and kubectl fluency',
    ],
    resources: [
      d('Kubernetes Basics (official tutorial)', 'https://kubernetes.io/docs/tutorials/kubernetes-basics/'),
      p('Killercoda — free Kubernetes playgrounds', 'https://killercoda.com/'),
      v('TechWorld with Nana — Kubernetes for beginners', 'TechWorld with Nana Kubernetes tutorial for beginners'),
      v('Kubernetes in 100 seconds (Fireship)', 'Fireship Kubernetes explained in 100 seconds'),
    ],
  },
  {
    id: 'iac',
    title: 'Infrastructure as Code',
    hours: 8,
    summary:
      'Clicking around a cloud console doesn’t scale. Infrastructure as Code describes servers, networks and databases in versioned files, so environments are reproducible and reviewable.',
    points: [
      'Declarative vs imperative',
      'Terraform: providers, resources, state and modules',
      'The plan/apply workflow and remote state',
      'Configuration management (Ansible) basics',
    ],
    resources: [
      c('HashiCorp — Terraform tutorials', 'https://developer.hashicorp.com/terraform/tutorials'),
      d('OpenTofu docs', 'https://opentofu.org/docs/'),
      d('Ansible — Getting started', 'https://docs.ansible.com/ansible/latest/getting_started/index.html'),
      v('Terraform course (freeCodeCamp)', 'freeCodeCamp Terraform course'),
    ],
  },
  {
    id: 'observability',
    title: 'Monitoring & Observability',
    hours: 6,
    summary:
      'You can’t fix what you can’t see. Collect metrics, logs and traces, build dashboards, and set up alerts that wake you only for things that truly matter.',
    points: [
      'Metrics, logs and traces',
      'Prometheus and Grafana',
      'Structured logging',
      'OpenTelemetry',
      'Alerting on symptoms, not causes',
    ],
    resources: [
      d('Prometheus — Overview', 'https://prometheus.io/docs/introduction/overview/'),
      d('Grafana docs', 'https://grafana.com/docs/grafana/latest/'),
      d('OpenTelemetry docs', 'https://opentelemetry.io/docs/'),
      v('TechWorld with Nana — Prometheus', 'TechWorld with Nana Prometheus monitoring'),
    ],
  },
  {
    id: 'sre',
    title: 'Reliability & SRE Practices',
    hours: 5,
    summary:
      'Site Reliability Engineering treats reliability as an engineering problem: define SLOs, manage error budgets, run calm incident responses and learn from blameless postmortems.',
    points: [
      'SLIs, SLOs and error budgets',
      'Incident response and on-call',
      'Blameless postmortems',
      'Capacity planning and chaos engineering',
    ],
    resources: [
      b('Google SRE books (free online)', 'https://sre.google/books/'),
      a('The Twelve-Factor App', 'https://12factor.net/'),
      v('What is SRE?', 'site reliability engineering explained Google'),
    ],
  },

  /* ================= AI ================= */
  {
    id: 'math-ml',
    title: 'Math for Machine Learning',
    hours: 20,
    summary:
      'You don’t need a math PhD, but linear algebra, calculus and probability are the language of ML. Aim for intuition: what a vector, a gradient and a probability distribution actually mean.',
    points: [
      'Vectors, matrices and dot products',
      'Derivatives, gradients and the chain rule',
      'Probability, distributions and Bayes’ rule',
      'Statistics: mean, variance and hypothesis testing',
    ],
    resources: [
      vd('3Blue1Brown — Essence of Linear Algebra', 'https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab'),
      vd('3Blue1Brown — Essence of Calculus', 'https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr'),
      c('Khan Academy — Statistics & Probability', 'https://www.khanacademy.org/math/statistics-probability'),
      v('StatQuest — statistics fundamentals', 'StatQuest statistics fundamentals'),
    ],
  },
  {
    id: 'data-tools',
    title: 'NumPy, pandas & Data Wrangling',
    hours: 10,
    summary:
      'Real ML work is mostly data work. Learn to load, clean, explore and visualise data with NumPy, pandas and Matplotlib in Jupyter notebooks.',
    points: [
      'NumPy arrays and vectorised operations',
      'pandas DataFrames: filter, group and join',
      'Cleaning missing and messy data',
      'Plotting with Matplotlib / Seaborn',
      'Jupyter notebooks',
    ],
    resources: [
      d('NumPy — absolute beginners guide', 'https://numpy.org/doc/stable/user/absolute_beginners.html'),
      d('pandas — Getting started', 'https://pandas.pydata.org/docs/getting_started/index.html'),
      p('Kaggle Learn — Pandas & Data Visualization', 'https://www.kaggle.com/learn'),
      v('Corey Schafer — pandas tutorials', 'Corey Schafer pandas tutorial'),
    ],
  },
  {
    id: 'ml-fundamentals',
    title: 'Machine Learning Fundamentals',
    hours: 25,
    summary:
      'Learn how machines learn from data: supervised vs unsupervised learning, training vs testing, and classic models like linear regression, decision trees and clustering. scikit-learn makes all of these easy to try.',
    points: [
      'Supervised vs unsupervised learning',
      'Regression, classification and clustering',
      'Train / validation / test splits and overfitting',
      'Metrics: accuracy, precision/recall, RMSE',
      'Feature engineering with scikit-learn',
    ],
    resources: [
      c('Machine Learning Specialization (Andrew Ng)', 'https://www.coursera.org/specializations/machine-learning-introduction'),
      c('Google — Machine Learning Crash Course', 'https://developers.google.com/machine-learning/crash-course'),
      d('scikit-learn — Getting started', 'https://scikit-learn.org/stable/getting_started.html'),
      p('Kaggle — Intro to Machine Learning', 'https://www.kaggle.com/learn/intro-to-machine-learning'),
      v('StatQuest — machine learning', 'StatQuest machine learning'),
    ],
  },
  {
    id: 'deep-learning',
    title: 'Deep Learning & PyTorch',
    hours: 30,
    summary:
      'Neural networks power modern AI. Understand how they learn through backpropagation and gradient descent, then build and train them in PyTorch, the framework used by most research and industry teams.',
    points: [
      'Neurons, layers and activation functions',
      'Backpropagation and gradient descent',
      'PyTorch tensors, autograd and training loops',
      'CNNs for images; embeddings for text',
      'Regularisation, GPUs and experiment tracking',
    ],
    resources: [
      vd('3Blue1Brown — Neural Networks', 'https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi'),
      c('Andrej Karpathy — Neural Networks: Zero to Hero', 'https://karpathy.ai/zero-to-hero.html'),
      c('fast.ai — Practical Deep Learning for Coders', 'https://course.fast.ai/'),
      d('PyTorch — Learn the Basics', 'https://pytorch.org/tutorials/beginner/basics/intro.html'),
    ],
  },
  {
    id: 'llm-basics',
    title: 'How LLMs & Transformers Work',
    hours: 10,
    summary:
      'Large language models are transformers trained to predict the next token. Knowing how tokenization, attention, context windows, pre-training and fine-tuning work helps you use them well and understand their limits.',
    points: [
      'Tokens, embeddings and attention',
      'The transformer architecture',
      'Pre-training, fine-tuning and RLHF',
      'Context windows, temperature and sampling',
      'Hallucinations and other limitations',
    ],
    resources: [
      vd('Andrej Karpathy — Let’s build GPT from scratch', 'https://www.youtube.com/watch?v=kCc8FmEb1nY'),
      a('The Illustrated Transformer (Jay Alammar)', 'https://jalammar.github.io/illustrated-transformer/'),
      c('Hugging Face — Learn', 'https://huggingface.co/learn'),
      v('3Blue1Brown — transformers explained visually', '3Blue1Brown transformers explained visually'),
    ],
  },
  {
    id: 'prompting',
    title: 'Prompt Engineering',
    hours: 5,
    summary:
      'How you instruct a model changes results dramatically. Learn to write clear, structured prompts with context, examples and output formats, and to iterate on them against test cases.',
    points: [
      'Clear instructions, roles and context',
      'Few-shot examples',
      'Step-by-step reasoning',
      'Structured outputs (JSON, XML tags)',
      'Iterating with test cases',
    ],
    resources: [
      d('Anthropic — Prompt engineering overview', 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview'),
      a('Prompt Engineering Guide', 'https://www.promptingguide.ai/'),
      d('OpenAI — Prompt engineering', 'https://platform.openai.com/docs/guides/prompt-engineering'),
      c('DeepLearning.AI — short courses', 'https://www.deeplearning.ai/short-courses/'),
    ],
  },
  {
    id: 'llm-apps',
    title: 'Building with LLM APIs',
    hours: 10,
    summary:
      'Most AI engineering is integrating models into products. Call LLM APIs, stream responses, manage tokens and costs, and use structured output and tool (function) calling to connect models to your code.',
    points: [
      'Calling APIs: messages, system prompts and parameters',
      'Streaming responses to a UI',
      'Tool / function calling',
      'Cost, latency and rate limits',
      'SDKs: Anthropic, OpenAI, Vercel AI SDK',
    ],
    resources: [
      d('Anthropic API docs', 'https://docs.anthropic.com/'),
      d('OpenAI API docs', 'https://platform.openai.com/docs'),
      d('Vercel AI SDK docs', 'https://ai-sdk.dev/docs'),
      v('Build an AI chatbot app', 'build AI chatbot app with LLM API tutorial'),
    ],
  },
  {
    id: 'rag',
    title: 'Embeddings, Vector DBs & RAG',
    hours: 10,
    summary:
      'Retrieval-Augmented Generation lets a model answer from your own data. Turn documents into embeddings, store them in a vector database, retrieve the most relevant chunks and pass them to the model.',
    points: [
      'Embeddings and semantic similarity',
      'Chunking strategies',
      'Vector databases: pgvector, Chroma, Pinecone',
      'Hybrid search and re-ranking',
      'Evaluating retrieval quality',
    ],
    resources: [
      a('Pinecone Learn — vector search & RAG', 'https://www.pinecone.io/learn/'),
      d('pgvector', 'https://github.com/pgvector/pgvector'),
      d('Chroma docs', 'https://docs.trychroma.com/'),
      v('What is RAG? (IBM Technology)', 'IBM Technology what is retrieval augmented generation'),
    ],
  },
  {
    id: 'agents',
    title: 'AI Agents & Tool Use',
    hours: 10,
    summary:
      'Agents are LLMs that use tools in a loop to complete multi-step tasks. Start with simple workflows, add tools carefully, and learn standards like the Model Context Protocol (MCP).',
    points: [
      'Workflows vs autonomous agents',
      'Tool design and the agent loop',
      'Memory and planning',
      'The Model Context Protocol (MCP)',
      'Human-in-the-loop and safety limits',
    ],
    resources: [
      a('Anthropic — Building effective agents', 'https://www.anthropic.com/research/building-effective-agents'),
      d('Model Context Protocol', 'https://modelcontextprotocol.io/'),
      d('LangGraph docs', 'https://langchain-ai.github.io/langgraph/'),
      v('AI agents explained', 'AI agents explained tool use tutorial'),
    ],
  },
  {
    id: 'evals',
    title: 'Evals, Safety & Responsible AI',
    hours: 6,
    summary:
      'LLM outputs are non-deterministic, so you need evaluations to know whether a change made things better or worse. Build test sets, grade automatically or with an LLM judge, and add guardrails for safety, privacy and bias.',
    points: [
      'Building eval datasets',
      'Code-based vs LLM-as-judge grading',
      'Guardrails, prompt injection and data privacy',
      'Bias, fairness and responsible deployment',
    ],
    resources: [
      a('Hamel Husain — Your AI Product Needs Evals', 'https://hamel.dev/blog/posts/evals/'),
      d('Anthropic — Create strong empirical evaluations', 'https://docs.anthropic.com/en/docs/test-and-evaluate/develop-tests'),
      d('OWASP — Top 10 for LLM Applications', 'https://genai.owasp.org/'),
      v('LLM evaluation tutorial', 'LLM evaluation evals tutorial'),
    ],
  },
  {
    id: 'mlops',
    title: 'Deploying Models & MLOps',
    hours: 10,
    summary:
      'A model is only valuable in production. Serve models behind APIs, containerise them, monitor drift and cost, and automate retraining. This is the engineering side of AI.',
    points: [
      'Serving models with FastAPI',
      'Hugging Face Hub and model formats',
      'Docker and GPU deployment',
      'Monitoring drift, latency and cost',
      'Experiment tracking (MLflow, Weights & Biases)',
    ],
    resources: [
      c('Made With ML — MLOps course', 'https://madewithml.com/'),
      d('Hugging Face Transformers docs', 'https://huggingface.co/docs/transformers/index'),
      d('MLflow docs', 'https://mlflow.org/docs/latest/index.html'),
      v('MLOps full course', 'MLOps full course'),
    ],
  },

  /* ================= MOBILE ================= */
  {
    id: 'mobile-basics',
    title: 'Mobile Development Fundamentals',
    hours: 4,
    summary:
      'Mobile apps differ from websites: they’re installed, work offline, ask for permissions and follow platform conventions. Understand native vs cross-platform options and the app lifecycle before you pick a stack.',
    points: [
      'Native (Swift / Kotlin) vs cross-platform (React Native, Flutter)',
      'The app lifecycle and backgrounding',
      'Screen sizes, safe areas and gestures',
      'Permissions and privacy',
      'App store ecosystems',
    ],
    resources: [
      d('Apple — Human Interface Guidelines', 'https://developer.apple.com/design/human-interface-guidelines'),
      d('Material Design 3', 'https://m3.material.io/'),
      d('React Native — Introduction', 'https://reactnative.dev/docs/getting-started'),
      v('React Native vs Flutter vs native', 'React Native vs Flutter vs native which to learn'),
    ],
  },
  {
    id: 'react-native',
    title: 'React Native & Expo',
    hours: 20,
    summary:
      'React Native lets you build real native iOS and Android apps with React. Expo is the recommended way to start: it handles tooling, native modules and builds so you can focus on the app itself.',
    points: [
      'Core components: View, Text, Image, ScrollView, FlatList',
      'Styling with StyleSheet and Flexbox',
      'Expo CLI and Expo Go on your phone',
      'Platform-specific code',
      'Debugging with Expo dev tools',
    ],
    resources: [
      d('React Native docs', 'https://reactnative.dev/docs/getting-started'),
      c('Expo — official tutorial', 'https://docs.expo.dev/tutorial/introduction/'),
      v('notJust.dev — React Native tutorial', 'notJust dev React Native tutorial'),
      v('React Native in 100 seconds (Fireship)', 'Fireship React Native in 100 seconds'),
    ],
  },
  {
    id: 'mobile-navigation',
    title: 'Navigation & App Structure',
    hours: 6,
    summary:
      'Mobile navigation uses stacks, tabs and drawers instead of URLs. Learn Expo Router (file-based) or React Navigation, deep linking, and how to structure screens and auth flows.',
    points: [
      'Stack, tab and drawer navigators',
      'Expo Router file-based routing',
      'Passing params between screens',
      'Deep links and universal links',
      'Auth flows and protected screens',
    ],
    resources: [
      d('Expo Router docs', 'https://docs.expo.dev/router/introduction/'),
      d('React Navigation docs', 'https://reactnavigation.org/docs/getting-started'),
      v('Expo Router tutorial (Simon Grimm)', 'Simon Grimm Expo Router tutorial'),
    ],
  },
  {
    id: 'mobile-data',
    title: 'Data, Storage & Offline',
    hours: 8,
    summary:
      'Mobile networks are unreliable, so apps must cache data and keep working offline. Fetch from APIs efficiently, store data locally and keep it in sync with the server.',
    points: [
      'Fetching data with TanStack Query',
      'AsyncStorage, SecureStore and MMKV',
      'Local databases with SQLite',
      'Offline-first and sync strategies',
      'Backends: Supabase and Firebase',
    ],
    resources: [
      d('Expo SQLite', 'https://docs.expo.dev/versions/latest/sdk/sqlite/'),
      d('Expo SecureStore', 'https://docs.expo.dev/versions/latest/sdk/securestore/'),
      d('TanStack Query — React Native', 'https://tanstack.com/query/latest/docs/framework/react/react-native'),
      d('Supabase docs', 'https://supabase.com/docs'),
      v('Offline-first React Native', 'React Native offline first tutorial'),
    ],
  },
  {
    id: 'native-features',
    title: 'Device Features & Native APIs',
    hours: 8,
    summary:
      'The best apps use what phones do well: camera, location, notifications, haptics and biometrics. Learn to request permissions gracefully and use Expo’s native modules.',
    points: [
      'Camera, image picker and media library',
      'Location and maps',
      'Push and local notifications',
      'Haptics, biometrics and sensors',
      'Writing a native module (advanced)',
    ],
    resources: [
      d('Expo SDK reference', 'https://docs.expo.dev/versions/latest/'),
      d('Expo — Push notifications overview', 'https://docs.expo.dev/push-notifications/overview/'),
      v('Expo notifications tutorial', 'Expo push notifications tutorial React Native'),
    ],
  },
  {
    id: 'mobile-ui',
    title: 'Mobile UI, Gestures & Animation',
    hours: 8,
    summary:
      'Mobile users expect smooth 60fps interactions. Follow platform design guidelines, use gestures naturally, and build performant animations that run on the UI thread.',
    points: [
      'iOS HIG and Material Design conventions',
      'Reanimated for performant animation',
      'Gesture Handler: swipes, pans and pinches',
      'List performance (FlashList)',
      'Dark mode and accessibility',
    ],
    resources: [
      d('React Native Reanimated', 'https://docs.swmansion.com/react-native-reanimated/'),
      d('React Native Gesture Handler', 'https://docs.swmansion.com/react-native-gesture-handler/'),
      d('FlashList', 'https://shopify.github.io/flash-list/'),
      v('William Candillon — Can it be done in React Native?', 'William Candillon Can it be done in React Native'),
    ],
  },
  {
    id: 'mobile-testing',
    title: 'Testing & Debugging Mobile Apps',
    hours: 5,
    summary:
      'Test logic and components with Jest and React Native Testing Library, automate real user flows end-to-end, and catch crashes in production with error reporting.',
    points: [
      'Jest and React Native Testing Library',
      'End-to-end tests with Maestro or Detox',
      'Profiling with React DevTools',
      'Crash reporting with Sentry',
    ],
    resources: [
      d('React Native Testing Library', 'https://callstack.github.io/react-native-testing-library/'),
      d('Maestro — mobile UI testing', 'https://maestro.mobile.dev/'),
      d('Sentry for React Native', 'https://docs.sentry.io/platforms/react-native/'),
      v('React Native testing tutorial', 'React Native testing library tutorial'),
    ],
  },
  {
    id: 'app-store',
    title: 'Building & Publishing to App Stores',
    hours: 5,
    summary:
      'Shipping is a skill of its own: app signing, store listings, review guidelines and over-the-air updates. EAS Build and Submit make it manageable for both iOS and Android.',
    points: [
      'EAS Build and app signing',
      'App Store Connect and Google Play Console',
      'Store listings, screenshots and privacy labels',
      'Review guidelines and common rejections',
      'Over-the-air updates (EAS Update)',
    ],
    resources: [
      d('EAS Build', 'https://docs.expo.dev/build/introduction/'),
      d('EAS Submit', 'https://docs.expo.dev/submit/introduction/'),
      d('App Store Review Guidelines', 'https://developer.apple.com/app-store/review/guidelines/'),
      v('Publish an Expo app to the stores', 'publish Expo app to App Store and Google Play EAS'),
    ],
  },
  {
    id: 'native-intro',
    title: 'Going Native: Swift & Kotlin',
    hours: 15,
    summary:
      'Learning the native platforms makes you a stronger mobile developer: you’ll understand what React Native wraps and be able to write native modules. SwiftUI and Jetpack Compose are declarative and feel familiar after React.',
    points: [
      'Swift basics and SwiftUI',
      'Kotlin basics and Jetpack Compose',
      'Xcode and Android Studio',
      'Bridging native code into React Native',
    ],
    resources: [
      c('Apple — SwiftUI tutorials', 'https://developer.apple.com/tutorials/swiftui'),
      c('Android — Jetpack Compose course', 'https://developer.android.com/courses/jetpack-compose/course'),
      c('100 Days of SwiftUI (Hacking with Swift)', 'https://www.hackingwithswift.com/100/swiftui'),
      v('Kotlin course (freeCodeCamp)', 'freeCodeCamp Kotlin course'),
    ],
  },

  /* ================= AI-NATIVE & AGENTS ================= */
  {
    id: 'agentic-coding',
    title: 'AI-Native Development: Working with Coding Agents',
    hours: 6,
    summary:
      'Coding agents like Claude Code, Cursor and GitHub Copilot can now plan, edit many files and run tests for you. Employers increasingly expect developers to use them well. That does not mean letting them think for you: it means writing a clear spec, letting the agent draft, and then reviewing every change like a senior developer would. The skill that gets you hired is judging AI output, not producing it.',
    points: [
      'The loop: write a short spec → let the agent draft → review the diff → test → refine',
      'Give agents context: project rules files (like CLAUDE.md), clear tasks, small steps',
      'Reviewing AI code: read every line, spot missing edge cases, security holes and invented APIs',
      'Tests as guardrails: ask for tests first, and never merge code you can’t explain',
      'When to switch the agent off: while learning a new concept, write it by hand first',
    ],
    resources: [
      d('Claude Code — overview', 'https://docs.claude.com/en/docs/claude-code/overview'),
      a('Anthropic — Claude Code best practices', 'https://www.anthropic.com/engineering/claude-code-best-practices'),
      d('GitHub Copilot docs', 'https://docs.github.com/en/copilot'),
      d('Cursor docs', 'https://cursor.com/docs'),
      a('Anthropic — How AI assistance impacts coding skill formation', 'https://www.anthropic.com/research/AI-assistance-coding-skills'),
      v('Agentic coding workflow, explained', 'agentic coding workflow Claude Code tutorial'),
    ],
  },
  {
    id: 'mcp',
    title: 'Model Context Protocol (MCP)',
    hours: 6,
    summary:
      'MCP is an open standard for connecting AI models to tools and data: files, databases, calendars, APIs. Instead of writing custom glue for every app, you build an MCP server once and any MCP-capable client (like Claude or an IDE) can use it. It is one of the most requested skills in agentic AI job posts.',
    points: [
      'Clients, servers and the three building blocks: tools, resources and prompts',
      'Build a small MCP server that exposes one tool and one resource',
      'Connect your server to a client and watch the model call it',
      'Security: scope what a server can do, and never expose secrets',
    ],
    resources: [
      d('MCP — introduction', 'https://modelcontextprotocol.io/docs/getting-started/intro'),
      d('MCP specification', 'https://modelcontextprotocol.io/specification/latest'),
      p('Reference MCP servers (GitHub)', 'https://github.com/modelcontextprotocol/servers'),
      v('Build an MCP server from scratch', 'build MCP server tutorial model context protocol'),
    ],
  },
  {
    id: 'agent-frameworks',
    title: 'Agent Frameworks & Orchestration',
    hours: 10,
    summary:
      'An agent is a loop: the model decides what to do, calls a tool, looks at the result and decides again until the goal is met. Frameworks handle the plumbing (state, retries, hand-offs between agents) so you can focus on behaviour. Learn the loop by hand first, then pick up a framework.',
    points: [
      'The agent loop: goal → think → act (tool call) → observe → repeat',
      'Workflows vs agents: use a fixed workflow when you can, an agent when you must',
      'Frameworks: LangGraph, the OpenAI Agents SDK and the Claude Agent SDK',
      'Multi-agent patterns: planner + workers, hand-offs, and shared memory',
      'State, retries and stopping conditions so agents don’t loop forever',
    ],
    resources: [
      a('Anthropic — Building effective agents', 'https://www.anthropic.com/engineering/building-effective-agents'),
      d('LangGraph docs', 'https://langchain-ai.github.io/langgraph/'),
      d('OpenAI Agents SDK', 'https://openai.github.io/openai-agents-python/'),
      d('Claude Agent SDK', 'https://docs.claude.com/en/api/agent-sdk/overview'),
      v('Build an AI agent from scratch', 'build AI agent from scratch python tool calling loop'),
    ],
  },
  {
    id: 'agent-safety',
    title: 'Guardrails, Security & Human-in-the-Loop',
    hours: 6,
    summary:
      'An agent that can take actions can also take the wrong ones. Prompt injection, over-broad permissions and runaway costs are the biggest risks. Safe agents use least-privilege tools, sandboxes, approval steps for anything risky, and limits on time and spend.',
    points: [
      'Prompt injection: why text from the web or a file can hijack your agent',
      'Least-privilege tools, sandboxes and read-only defaults',
      'Human approval for risky actions (payments, emails, deleting data)',
      'Rate limits, budgets and logging every action for review',
      'The OWASP Top 10 for LLM applications',
    ],
    resources: [
      d('OWASP Top 10 for LLM applications', 'https://genai.owasp.org/llm-top-10/'),
      a('Simon Willison — prompt injection series', 'https://simonwillison.net/series/prompt-injection/'),
      a('Anthropic — Building effective agents (guardrails)', 'https://www.anthropic.com/engineering/building-effective-agents'),
      v('Prompt injection explained', 'prompt injection explained LLM agents security'),
    ],
  },

  /* ================= CLOUD ================= */
  {
    id: 'cloud-networking',
    title: 'Cloud Networking: VPCs, Subnets & Load Balancers',
    hours: 8,
    summary:
      'In the cloud you build your own private network. A VPC is your slice of the cloud, subnets split it into public and private zones, security groups act as firewalls, and load balancers spread traffic across servers. Most cloud outages and security leaks trace back to networking mistakes.',
    points: [
      'VPCs, CIDR blocks and public vs private subnets',
      'Route tables, internet gateways and NAT',
      'Security groups and network ACLs as firewalls',
      'Load balancers, DNS (Route 53 / Azure DNS) and CDNs',
    ],
    resources: [
      d('AWS — What is Amazon VPC?', 'https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html'),
      d('Azure — Virtual networks overview', 'https://learn.microsoft.com/en-us/azure/virtual-network/virtual-networks-overview'),
      d('Google Cloud — VPC overview', 'https://cloud.google.com/vpc/docs/overview'),
      v('AWS VPC explained', 'AWS VPC subnets explained beginner'),
    ],
  },
  {
    id: 'cloud-security',
    title: 'Cloud Security & IAM',
    hours: 8,
    summary:
      'Identity and Access Management (IAM) decides who and what can touch your cloud resources. The golden rule is least privilege: give every person and service only the permissions it needs. Leaked access keys and public storage buckets are still the most common cloud breaches.',
    points: [
      'Users, groups, roles and policies',
      'Least privilege, and roles instead of long-lived access keys',
      'Secrets managers instead of passwords in code',
      'Encryption at rest and in transit, and audit logs (CloudTrail)',
    ],
    resources: [
      d('AWS — IAM security best practices', 'https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html'),
      c('AWS Skill Builder (free courses)', 'https://skillbuilder.aws/'),
      v('AWS IAM explained', 'AWS IAM roles policies explained beginner'),
      v('Cloud security fundamentals', 'cloud security fundamentals for beginners'),
    ],
  },
  {
    id: 'serverless',
    title: 'Serverless & Managed Services',
    hours: 8,
    summary:
      'Serverless lets you run code without managing servers: you upload a function and the cloud runs it when an event happens, charging only for the time it runs. Combined with managed databases and queues, it’s a fast way to build. Know its limits too: cold starts, time limits and costs at very high volume.',
    points: [
      'Functions as a service: AWS Lambda and Azure Functions',
      'Event-driven design: triggers from uploads, queues and HTTP',
      'Managed databases, queues and storage',
      'When not to use serverless: long jobs, steady heavy traffic',
    ],
    resources: [
      d('AWS Lambda — developer guide', 'https://docs.aws.amazon.com/lambda/latest/dg/welcome.html'),
      d('Azure Functions overview', 'https://learn.microsoft.com/en-us/azure/azure-functions/functions-overview'),
      v('Serverless explained', 'serverless explained AWS Lambda beginner'),
    ],
  },
  {
    id: 'cloud-architecture',
    title: 'Cloud Architecture, Cost & Certifications',
    hours: 10,
    summary:
      'Good cloud engineers design systems that stay up, stay secure and don’t burn money. The Well-Architected frameworks give you a checklist, FinOps teaches you to watch the bill, and an entry-level certification (AWS Cloud Practitioner or Azure AZ-900) is a common way to prove the basics to employers.',
    points: [
      'The Well-Architected pillars: reliability, security, cost, performance, operations, sustainability',
      'High availability: multiple availability zones, backups and failover',
      'Cost control: budgets, alerts, right-sizing and turning things off',
      'A first certification: AWS Cloud Practitioner or Azure Fundamentals (AZ-900)',
      'Portfolio project: the Cloud Resume Challenge',
    ],
    resources: [
      d('AWS Well-Architected Framework', 'https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html'),
      a('FinOps Foundation — What is FinOps?', 'https://www.finops.org/introduction/what-is-finops/'),
      c('AWS Certified Cloud Practitioner', 'https://aws.amazon.com/certification/certified-cloud-practitioner/'),
      c('Microsoft — Azure Fundamentals (AZ-900)', 'https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/'),
      p('The Cloud Resume Challenge', 'https://cloudresumechallenge.dev/'),
    ],
  },

  /* ================= SOFTWARE ENGINEERING ================= */
  {
    id: 'programming-fundamentals',
    title: 'Programming Fundamentals',
    hours: 20,
    summary:
      'Every language is built on the same few ideas: values and variables, decisions, loops, functions and collections. Learn to break a problem into small steps and turn those steps into code. Once this clicks, picking up a second language takes weeks, not months.',
    points: [
      'Variables, types and expressions',
      'Conditions (if/else) and loops (for/while)',
      'Functions: inputs, outputs and keeping them small',
      'Lists and dictionaries (arrays and maps)',
      'Breaking a problem into steps before you code (pseudocode)',
    ],
    resources: [
      c('CS50x — Harvard’s free intro to computer science', 'https://cs50.harvard.edu/x/'),
      d('The Python Tutorial (official)', 'https://docs.python.org/3/tutorial/'),
      p('Exercism — Python track (free, with mentors)', 'https://exercism.org/tracks/python'),
      v('Python for beginners (freeCodeCamp)', 'freeCodeCamp Python for beginners full course'),
    ],
  },
  {
    id: 'debugging',
    title: 'Debugging',
    hours: 6,
    summary:
      'Developers spend more time reading and fixing code than writing it. Debugging is a skill you can learn: read the error, reproduce the bug, form a guess, test it with prints or a debugger, and fix the cause instead of the symptom.',
    points: [
      'Reading error messages and stack traces from the bottom up',
      'Reproducing a bug reliably before fixing it',
      'Breakpoints, stepping and watching variables in a debugger',
      'Narrowing it down: print debugging, logging and git bisect',
      'Rubber-duck debugging and asking good questions',
    ],
    resources: [
      a('Eric Lippert — How to debug small programs', 'https://ericlippert.com/2014/03/05/how-to-debug-small-programs/'),
      d('VS Code — Debugging', 'https://code.visualstudio.com/docs/debugtest/debugging'),
      d('Python — pdb, the built-in debugger', 'https://docs.python.org/3/library/pdb.html'),
      v('Debugging Python in VS Code', 'VS Code debugging python tutorial breakpoints'),
    ],
  },
  {
    id: 'cs-basics',
    title: 'How Computers Work (CS Basics)',
    hours: 10,
    summary:
      'You don’t need a degree, but knowing what happens under your code helps you write faster programs and understand error messages. Learn how data is stored in binary, how memory and the CPU work together, and what the operating system does for your program.',
    points: [
      'Binary, bits, bytes and how text and numbers are stored',
      'CPU, memory (RAM) and storage: why some things are slow',
      'Processes, threads and what the operating system manages',
      'Compiled vs interpreted languages',
      'Stack vs heap memory, and what a memory leak is',
    ],
    resources: [
      v('Crash Course Computer Science', 'Crash Course Computer Science playlist'),
      a('Teach Yourself Computer Science', 'https://teachyourselfcs.com/'),
      c('Nand2Tetris — build a computer from first principles', 'https://www.nand2tetris.org/'),
      b('Operating Systems: Three Easy Pieces (free book)', 'https://pages.cs.wisc.edu/~remzi/OSTEP/'),
    ],
  },
  {
    id: 'oop',
    title: 'Object-Oriented Programming & SOLID',
    hours: 10,
    summary:
      'Object-oriented programming groups data and the code that works on it into classes. It’s how most large codebases in Java, C#, Python and TypeScript are organised. The SOLID principles are five simple rules that keep those classes small and easy to change.',
    points: [
      'Classes, objects, attributes and methods',
      'Encapsulation: hide details behind a clear interface',
      'Inheritance vs composition (prefer composition)',
      'Polymorphism: different objects, same method name',
      'SOLID: single responsibility, open/closed, Liskov, interface segregation, dependency inversion',
    ],
    resources: [
      d('Python — Classes (official tutorial)', 'https://docs.python.org/3/tutorial/classes.html'),
      a('Real Python — Object-oriented programming in Python', 'https://realpython.com/python3-object-oriented-programming/'),
      a('DigitalOcean — SOLID: the first five principles', 'https://www.digitalocean.com/community/conceptual-articles/s-o-l-i-d-the-first-five-principles-of-object-oriented-design'),
      v('Python OOP tutorial (Corey Schafer)', 'Corey Schafer python OOP tutorial classes and instances'),
    ],
  },
  {
    id: 'clean-code',
    title: 'Clean Code & Refactoring',
    hours: 8,
    summary:
      'Code is read far more often than it is written. Clean code uses clear names, small functions and no surprises. Refactoring means improving the structure of code without changing what it does, in small safe steps, with tests to catch mistakes.',
    points: [
      'Names that explain intent; functions that do one thing',
      'Code smells: long functions, duplication, magic numbers, deep nesting',
      'Refactoring in small steps: extract function, rename, simplify conditions',
      'Following a style guide and letting a formatter and linter enforce it',
      'Comments explain why, not what',
    ],
    resources: [
      a('Refactoring.Guru — Code smells', 'https://refactoring.guru/refactoring/smells'),
      a('Refactoring.Guru — Refactoring techniques', 'https://refactoring.guru/refactoring/techniques'),
      d('PEP 8 — Python style guide', 'https://peps.python.org/pep-0008/'),
      d('Google style guides (many languages)', 'https://google.github.io/styleguide/'),
      v('Clean code tips', 'clean code tips refactoring beginners'),
    ],
  },
  {
    id: 'design-patterns',
    title: 'Design Patterns',
    hours: 8,
    summary:
      'Design patterns are proven solutions to problems that come up again and again, with names every developer recognises. You don’t need all 23 classic patterns. Learn the handful you’ll actually meet (Strategy, Factory, Observer, Adapter, Decorator) and when NOT to use them.',
    points: [
      'Why patterns exist: a shared vocabulary for common designs',
      'Creational: Factory and Builder',
      'Structural: Adapter and Decorator',
      'Behavioural: Strategy and Observer',
      'Avoiding over-engineering: use a pattern only when the problem appears',
    ],
    resources: [
      a('Refactoring.Guru — Design patterns (with examples)', 'https://refactoring.guru/design-patterns'),
      a('Python design patterns guide', 'https://python-patterns.guide/'),
      a('Patterns.dev — modern web patterns', 'https://www.patterns.dev/'),
      v('10 design patterns explained (Fireship)', 'Fireship 10 design patterns explained in 10 minutes'),
    ],
  },
  {
    id: 'testing-fundamentals',
    title: 'Testing Fundamentals & TDD',
    hours: 10,
    summary:
      'Automated tests let you change code without fear. Learn the test pyramid (many fast unit tests, fewer integration tests, a few end-to-end tests), how to write good assertions, how to replace slow parts with fakes, and the test-first rhythm of TDD.',
    points: [
      'Unit, integration and end-to-end tests: the test pyramid',
      'Arrange, act, assert: the shape of a good test',
      'Test runners and assertions (pytest, Jest, JUnit)',
      'Mocks, stubs and fakes for databases and APIs',
      'Test-driven development: red, green, refactor',
    ],
    resources: [
      a('Martin Fowler — The practical test pyramid', 'https://martinfowler.com/articles/practical-test-pyramid.html'),
      d('pytest — Get started', 'https://docs.pytest.org/en/stable/getting-started.html'),
      d('Python — unittest.mock', 'https://docs.python.org/3/library/unittest.mock.html'),
      a('Martin Fowler — Test-driven development', 'https://martinfowler.com/bliki/TestDrivenDevelopment.html'),
      v('pytest tutorial for beginners', 'pytest tutorial for beginners'),
    ],
  },
  {
    id: 'code-review',
    title: 'Code Review & Pull Requests',
    hours: 4,
    summary:
      'On a team, no code goes live without another person reading it. Learn to write small pull requests with clear descriptions and commit messages, review other people’s code kindly and usefully, and respond to feedback without taking it personally.',
    points: [
      'Small, focused pull requests with a clear description',
      'Good commit messages',
      'What reviewers look for: correctness, readability, tests, security',
      'Writing kind, specific review comments',
      'Reviewing AI-generated code with extra care',
    ],
    resources: [
      d('Google — Code review developer guide', 'https://google.github.io/eng-practices/review/'),
      d('GitHub — About pull request reviews', 'https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews'),
      a('How to write a Git commit message', 'https://cbea.ms/git-commit/'),
      a('Conventional Comments — clearer review comments', 'https://conventionalcomments.org/'),
    ],
  },
  {
    id: 'software-architecture',
    title: 'Software Architecture Basics',
    hours: 8,
    summary:
      'Architecture is how a codebase is split into parts and how those parts talk to each other. Good structure keeps a growing app easy to change. Start with layers and modules inside one app (a monolith) before you reach for microservices.',
    points: [
      'Layers: presentation, business logic and data access',
      'Modules, boundaries and keeping dependencies one-way',
      'Monolith vs microservices, and why most apps should start as a monolith',
      'Configuration and secrets: the Twelve-Factor App',
      'Drawing your system with simple diagrams (the C4 model)',
    ],
    resources: [
      a('Martin Fowler — Software architecture guide', 'https://martinfowler.com/architecture/'),
      a('The Twelve-Factor App', 'https://12factor.net/'),
      a('The C4 model for software diagrams', 'https://c4model.com/'),
      v('Software architecture patterns explained', 'software architecture patterns explained layered monolith microservices'),
    ],
  },
  {
    id: 'sdlc-agile',
    title: 'How Teams Build Software (SDLC & Agile)',
    hours: 5,
    summary:
      'Software is built in a loop: plan, build, test, release, learn. Most teams work in an Agile way (often Scrum or Kanban) with short cycles, a board of tickets and regular check-ins. Knowing this vocabulary makes your first job much less confusing.',
    points: [
      'The software development life cycle (SDLC)',
      'Agile, Scrum (sprints, stand-ups, retros) and Kanban',
      'Tickets, user stories and acceptance criteria',
      'Branching workflows: GitHub flow and feature branches',
      'Writing docs people actually read: READMEs and decision records',
    ],
    resources: [
      a('The Agile Manifesto', 'https://agilemanifesto.org/'),
      d('The Scrum Guide', 'https://scrumguides.org/scrum-guide.html'),
      a('Atlassian — Agile coach', 'https://www.atlassian.com/agile'),
      d('GitHub flow', 'https://docs.github.com/en/get-started/using-github/github-flow'),
      d('Write the Docs — documentation guide', 'https://www.writethedocs.org/guide/'),
    ],
  },
  {
    id: 'tech-interviews',
    title: 'Technical Interviews',
    hours: 20,
    summary:
      'Most software jobs test you with coding problems, a system design talk and behavioural questions. Practise by pattern (two pointers, sliding window, BFS/DFS) instead of memorising answers, think out loud, and prepare short stories about your projects.',
    points: [
      'Common problem patterns: hashing, two pointers, sliding window, BFS/DFS',
      'Thinking out loud: clarify, plan, code, test',
      'Big-O of your solution, and how to improve it',
      'Behavioural questions with the STAR method',
      'Take-home projects and talking about your portfolio',
    ],
    resources: [
      a('Tech Interview Handbook (free)', 'https://www.techinterviewhandbook.org/'),
      p('NeetCode — problems grouped by pattern', 'https://neetcode.io/'),
      p('LeetCode', 'https://leetcode.com/'),
      v('How to solve coding interview problems (NeetCode)', 'NeetCode how to solve coding interview problems'),
    ],
  },

  /* ================= QA & TEST AUTOMATION ================= */
  {
    id: 'qa-fundamentals',
    title: 'Software Testing Fundamentals',
    hours: 8,
    summary:
      'Testing is checking that software does what it should, and finding where it doesn’t, before users do. Learn the vocabulary every QA job uses: test levels, test types, the testing life cycle, and why testing early is cheaper than testing late.',
    points: [
      'Why testing matters: errors, defects and failures',
      'Test levels: unit, integration, system and acceptance',
      'Test types: functional, regression, smoke, usability, performance, security',
      'The software testing life cycle (STLC) and where QA fits in Agile teams',
      'Manual vs automated testing, and the test pyramid',
    ],
    resources: [
      c('ISTQB Certified Tester Foundation Level (syllabus)', 'https://www.istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/'),
      a('Martin Fowler — The practical test pyramid', 'https://martinfowler.com/articles/practical-test-pyramid.html'),
      a('Ministry of Testing — community and learning', 'https://www.ministryoftesting.com/'),
      v('Software testing full course (freeCodeCamp)', 'freeCodeCamp software testing course manual testing'),
    ],
  },
  {
    id: 'test-design',
    title: 'Test Design & Test Cases',
    hours: 8,
    summary:
      'You can’t test every possible input, so testers use techniques to pick the few inputs most likely to find bugs. Learn equivalence partitioning, boundary values and decision tables, and how to write test cases anyone on the team can follow.',
    points: [
      'Equivalence partitioning: one test per group of similar inputs',
      'Boundary value analysis: bugs hide at the edges',
      'Decision tables and state transitions for complex rules',
      'Writing test cases: title, preconditions, steps, expected result',
      'Test plans and test coverage',
    ],
    resources: [
      a('Guru99 — Equivalence partitioning & boundary values', 'https://www.guru99.com/equivalence-partitioning-boundary-value-analysis.html'),
      a('Guru99 — Decision table testing', 'https://www.guru99.com/decision-table-testing.html'),
      a('Guru99 — How to write test cases', 'https://www.guru99.com/test-case.html'),
      p('The Internet — practice pages for testers', 'https://the-internet.herokuapp.com/'),
    ],
  },
  {
    id: 'bug-reports',
    title: 'Bug Reports & Bug Tracking',
    hours: 4,
    summary:
      'A bug that nobody can reproduce never gets fixed. A great bug report has a clear title, exact steps, expected vs actual results, and evidence like screenshots or logs. Learn severity vs priority and how bugs move through a tracker like Jira.',
    points: [
      'Title, steps to reproduce, expected and actual result',
      'Evidence: screenshots, screen recordings, console logs, environment',
      'Severity (how bad) vs priority (how soon)',
      'The bug life cycle: new, in progress, fixed, verified, closed',
      'Working in Jira or GitHub Issues',
    ],
    resources: [
      d('Mozilla — Bug writing guidelines', 'https://bugzilla.mozilla.org/page.cgi?id=bug-writing.html'),
      d('Atlassian — What is an issue in Jira?', 'https://support.atlassian.com/jira-software-cloud/docs/what-is-an-issue/'),
      p('Sauce Demo — a practice shop to test', 'https://www.saucedemo.com/'),
      v('How to write a good bug report', 'how to write a good bug report QA'),
    ],
  },
  {
    id: 'exploratory-testing',
    title: 'Exploratory Testing',
    hours: 5,
    summary:
      'Scripted test cases only find the bugs you thought of. Exploratory testing means learning the app, designing tests and running them at the same time, guided by a mission and a time limit. It’s where testers find the strangest and most valuable bugs.',
    points: [
      'Charters: a short mission like “explore checkout with invalid cards”',
      'Time-boxed sessions and taking notes as you go',
      'Heuristics: try zero, one, many, too long, special characters, going back',
      'Testing like different users: new, impatient, on a slow phone',
      'Turning findings into bug reports and new test cases',
    ],
    resources: [
      a('Martin Fowler — Exploratory testing', 'https://martinfowler.com/bliki/ExploratoryTesting.html'),
      b('Explore It! by Elisabeth Hendrickson', 'https://pragprog.com/titles/ehxta/explore-it/'),
      p('Sauce Demo — practice shop', 'https://www.saucedemo.com/'),
      v('Exploratory testing explained', 'exploratory testing explained charters sessions'),
    ],
  },
  {
    id: 'devtools-for-testers',
    title: 'Browser DevTools for Testers',
    hours: 4,
    summary:
      'The browser’s developer tools show what users can’t see: errors in the console, every request to the server, saved data and how the page behaves on a phone. Testers who use DevTools write far better bug reports.',
    points: [
      'Console: spotting JavaScript errors and warnings',
      'Network: requests, status codes, slow calls and failed APIs',
      'Elements: inspecting the page and finding good selectors',
      'Application: cookies, localStorage and sessions',
      'Device mode and network throttling for mobile and slow connections',
    ],
    resources: [
      d('Chrome DevTools documentation', 'https://developer.chrome.com/docs/devtools'),
      d('Chrome DevTools — Network panel', 'https://developer.chrome.com/docs/devtools/network'),
      d('Firefox DevTools user docs', 'https://firefox-source-docs.mozilla.org/devtools-user/'),
      v('Chrome DevTools for testers', 'Chrome DevTools tutorial for QA testers'),
    ],
  },
  {
    id: 'ui-automation',
    title: 'UI Test Automation (Playwright)',
    hours: 15,
    summary:
      'UI automation makes a real browser click, type and check the page for you, so regression tests run in minutes instead of days. Playwright is the fastest-growing tool for this: it waits for elements automatically, runs in every browser and has a test recorder.',
    points: [
      'Setting up Playwright Test with TypeScript',
      'Locators: find elements by role, label and text, like a user would',
      'Actions and assertions that wait automatically',
      'Running tests headless, in several browsers, and in parallel',
      'Debugging with the trace viewer and codegen; Cypress and Selenium as alternatives',
    ],
    resources: [
      d('Playwright — Getting started', 'https://playwright.dev/docs/intro'),
      d('Playwright — Locators', 'https://playwright.dev/docs/locators'),
      d('Cypress documentation', 'https://docs.cypress.io/'),
      d('Selenium documentation', 'https://www.selenium.dev/documentation/'),
      v('Playwright tutorial for beginners', 'Playwright TypeScript tutorial for beginners'),
    ],
  },
  {
    id: 'automation-design',
    title: 'Test Automation Design',
    hours: 8,
    summary:
      'A test suite is code, and it rots like code. Good suites use page objects to avoid repetition, fixtures for setup, independent tests that run in any order, and no fixed waits. The goal is tests that fail only when something is really broken.',
    points: [
      'Page Object Model: one class per page, tests read like steps',
      'Fixtures and test data: every test sets up what it needs',
      'Independent tests that can run in any order and in parallel',
      'Flaky tests: why they happen and how to fix them (no sleep calls)',
      'Choosing what to automate, and what to keep manual',
    ],
    resources: [
      d('Playwright — Page object models', 'https://playwright.dev/docs/pom'),
      d('Playwright — Fixtures', 'https://playwright.dev/docs/test-fixtures'),
      d('Playwright — Best practices', 'https://playwright.dev/docs/best-practices'),
      a('Martin Fowler — Eradicating non-determinism in tests', 'https://martinfowler.com/articles/nonDeterminism.html'),
      c('Test Automation University (free courses)', 'https://testautomationu.applitools.com/'),
    ],
  },
  {
    id: 'api-testing',
    title: 'API Testing',
    hours: 8,
    summary:
      'Most of an app’s logic sits behind its API, and API tests are faster and more stable than UI tests. Learn to send requests, check status codes, response bodies and error cases with Postman or Bruno, then automate them in code.',
    points: [
      'REST basics: methods, URLs, headers, JSON bodies',
      'Status codes and what each one should mean',
      'Testing error cases: missing fields, wrong types, no login',
      'Collections, environments and variables in Postman or Bruno',
      'Automating API tests in code with Playwright’s request API',
    ],
    resources: [
      d('Postman — Learning Center', 'https://learning.postman.com/docs/introduction/overview/'),
      d('Bruno — open-source API client', 'https://docs.usebruno.com/'),
      d('Playwright — API testing', 'https://playwright.dev/docs/api-testing'),
      d('MDN — HTTP response status codes', 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status'),
      p('Restful Booker — a practice API for testers', 'https://restful-booker.herokuapp.com/'),
    ],
  },
  {
    id: 'performance-testing',
    title: 'Performance & Load Testing',
    hours: 6,
    summary:
      'An app that works for one user can fall over with a thousand. Performance testing measures speed under load and finds the breaking point before launch day does. k6 lets you write load tests in JavaScript; Lighthouse checks how fast a page feels.',
    points: [
      'Load, stress, spike and soak tests',
      'Key numbers: response time (p95), throughput and error rate',
      'Writing a k6 script with thresholds',
      'Page speed: Lighthouse and Core Web Vitals',
      'Reading results and reporting where the bottleneck is',
    ],
    resources: [
      d('Grafana k6 documentation', 'https://grafana.com/docs/k6/latest/'),
      d('Lighthouse overview', 'https://developer.chrome.com/docs/lighthouse/overview'),
      d('Apache JMeter', 'https://jmeter.apache.org/'),
      v('k6 load testing tutorial', 'k6 load testing tutorial beginners'),
    ],
  },
  {
    id: 'qa-career',
    title: 'QA Career: Certification & Portfolio',
    hours: 5,
    summary:
      'Testers get hired by showing their work. A public portfolio with a test plan, bug reports and automated suites beats a list of tools on a CV. The ISTQB Foundation certificate is often asked for, and SDET roles are the next step for testers who code.',
    points: [
      'The ISTQB Foundation Level certificate and when it helps',
      'A portfolio repo: test plan, bug reports, UI and API suites, CI badge',
      'QA job titles: QA analyst, QA engineer, automation engineer, SDET',
      'Common QA interview questions and live testing exercises',
      'Growing into SDET, DevOps or development',
    ],
    resources: [
      c('ISTQB Certified Tester Foundation Level', 'https://www.istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/'),
      c('Test Automation University (free courses)', 'https://testautomationu.applitools.com/'),
      a('Ministry of Testing — community and learning', 'https://www.ministryoftesting.com/'),
      v('How to get a QA job with no experience', 'how to get a QA tester job with no experience portfolio'),
    ],
  },
];

export const topics: Record<string, Topic> = Object.fromEntries(list.map((t) => [t.id, t]));
