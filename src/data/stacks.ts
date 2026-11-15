/**
 * Tech stack per role: what each technology is, why employers want it, and how in-demand it is.
 *
 * Demand levels are an editorial summary of the sources in STACK_SOURCES (job-posting analyses and
 * developer surveys), not exact counts. Review them once a year: update STACK_UPDATED when you do.
 */

export type Demand = 'core' | 'high' | 'rising' | 'optional';

export const DEMAND: Record<Demand, { label: string; hint: string }> = {
  core: { label: 'Must know', hint: 'Shows up in most job posts for this role. Learn it first.' },
  high: { label: 'In demand', hint: 'Common in job posts. Expected for many jobs, but not all.' },
  rising: { label: 'Growing', hint: 'Demand is climbing fast. A good edge once the basics are solid.' },
  optional: { label: 'Good to know', hint: 'Alternatives or niche tools. Learn them when a job needs them.' },
};

export interface Tech {
  name: string;
  /** what it is, in plain words */
  what: string;
  /** why companies hire for it / where it's used */
  why: string;
  demand: Demand;
  /** lesson id in topics.ts, if there is one */
  topic?: string;
}

export interface StackGroup {
  title: string;
  note?: string;
  items: Tech[];
}

export interface RoleStack {
  roadmap: string;
  /** the most common combination you'll see in job posts */
  typical: string[];
  summary: string;
  groups: StackGroup[];
}

export const STACK_UPDATED = 'November 2026';

/* ---------- shared entries ---------- */
const git: Tech = {
  name: 'Git & GitHub',
  what: 'Git tracks every change to your code so you can undo mistakes and work on features in parallel. GitHub hosts Git projects online for teams to review and share code.',
  why: 'Every software team uses version control. Employers also look at your GitHub profile to see real projects.',
  demand: 'core',
  topic: 'git',
};

const aiTools: Tech = {
  name: 'AI coding assistants',
  what: 'Tools like Claude Code, GitHub Copilot, Cursor and Codex that write, explain and review code with you, from your editor or terminal.',
  why: 'Most developers now use them daily, and many job posts ask for AI fluency. The skill employers want is checking and fixing AI output, not just accepting it.',
  demand: 'rising',
  topic: 'how-to-learn',
};

const docker: Tech = {
  name: 'Docker',
  what: 'Packages an app with everything it needs (runtime, libraries, config) into a container that runs the same on any machine.',
  why: 'Ends "it works on my machine". Almost every company deploys with containers, so it appears in most backend and DevOps posts.',
  demand: 'core',
  topic: 'docker',
};

const sql: Tech = {
  name: 'SQL & PostgreSQL',
  what: 'SQL is the language for asking questions of relational databases. PostgreSQL is the most popular open-source database that speaks it.',
  why: 'SQL is one of the most requested skills in all tech job posts. Almost every app stores data in a relational database.',
  demand: 'core',
  topic: 'sql',
};

const typescript: Tech = {
  name: 'TypeScript',
  what: 'JavaScript with types. You describe the shape of your data, and the editor catches mistakes before you run the code.',
  why: 'It has become the default for professional JavaScript work, frontend and backend. Most new React and Node jobs expect it.',
  demand: 'core',
  topic: 'typescript',
};

const cicd: Tech = {
  name: 'CI/CD (GitHub Actions)',
  what: 'Pipelines that automatically test, build and deploy your code every time you push. GitHub Actions is the most widely used.',
  why: 'Teams ship many times a day and rely on automation to catch bugs. Knowing how to read and fix a pipeline is expected.',
  demand: 'high',
  topic: 'ci-cd',
};

const aws: Tech = {
  name: 'AWS (or Azure / Google Cloud)',
  what: 'Cloud platforms that rent you servers, databases, storage and hundreds of managed services. AWS is the largest, Azure is strong in enterprises.',
  why: 'Cloud skills are among the most requested in job posts. Learn one provider well; the ideas carry over to the others.',
  demand: 'high',
  topic: 'cloud',
};

/* ---------- per role ---------- */
export const stacks: RoleStack[] = [
  {
    roadmap: 'frontend',
    typical: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Vitest / Playwright'],
    summary:
      'React with TypeScript dominates frontend job posts. Next.js is the most common way to ship React apps, and Tailwind is the most common way to style them.',
    groups: [
      {
        title: 'Languages',
        items: [
          {
            name: 'HTML & CSS',
            what: 'HTML gives a page its structure (headings, buttons, forms). CSS controls how it looks: layout, colours, spacing, responsiveness.',
            why: 'Every web job needs them. Weak CSS is one of the most common gaps interviewers notice in juniors who jumped straight to frameworks.',
            demand: 'core',
            topic: 'html',
          },
          {
            name: 'JavaScript',
            what: 'The programming language of the browser. It makes pages interactive and fetches data from servers.',
            why: 'Still one of the most used languages in the world. Every frontend framework is JavaScript underneath.',
            demand: 'core',
            topic: 'javascript',
          },
          typescript,
        ],
      },
      {
        title: 'UI frameworks',
        note: 'Learn React first: it has by far the most jobs. Pick up others only if your local market asks for them.',
        items: [
          {
            name: 'React',
            what: 'A library for building interfaces out of reusable components. Data flows in, the UI updates automatically.',
            why: 'The most requested frontend framework in job posts by a wide margin, and the base for Next.js and React Native.',
            demand: 'core',
            topic: 'react',
          },
          {
            name: 'Next.js',
            what: 'A framework on top of React that adds routing, server rendering and backend code in the same project.',
            why: 'The most common way companies ship React to production, especially startups. Good for SEO and speed.',
            demand: 'high',
            topic: 'nextjs',
          },
          {
            name: 'Angular',
            what: 'A full framework from Google with everything built in: routing, forms, HTTP and dependency injection.',
            why: 'Popular in large enterprises, banks and government. Fewer startup jobs, but steady corporate demand.',
            demand: 'optional',
          },
          {
            name: 'Vue / Nuxt',
            what: 'An approachable component framework (Vue) and its full-stack companion (Nuxt).',
            why: 'Strong in some regions and agencies. Skills move over easily if you already know React.',
            demand: 'optional',
          },
        ],
      },
      {
        title: 'Styling',
        items: [
          {
            name: 'Tailwind CSS',
            what: 'A CSS framework where you style elements with small utility classes like flex, p-4 and text-lg right in your markup.',
            why: 'The most popular styling approach in new React and Next.js projects. You still need real CSS knowledge to use it well.',
            demand: 'high',
            topic: 'tailwind',
          },
          {
            name: 'Component libraries (shadcn/ui, MUI)',
            what: 'Ready-made, accessible buttons, dialogs, menus and forms you can drop into your app and customise.',
            why: 'Teams rarely build every component from scratch. shadcn/ui in particular is growing fast in new projects.',
            demand: 'rising',
          },
        ],
      },
      {
        title: 'Data & state',
        items: [
          {
            name: 'TanStack Query',
            what: 'Handles fetching, caching and refreshing server data in React, including loading and error states.',
            why: 'Replaces a lot of hand-written fetch code. Common in modern React codebases.',
            demand: 'high',
            topic: 'state-routing',
          },
          {
            name: 'Zustand / Redux Toolkit',
            what: 'Libraries for state that many components share, like the logged-in user or a shopping cart.',
            why: 'Redux is in many older, larger codebases you may join. Zustand is the lighter choice in newer apps.',
            demand: 'optional',
            topic: 'state-routing',
          },
        ],
      },
      {
        title: 'Tools & quality',
        items: [
          git,
          {
            name: 'Vite, npm & ESLint',
            what: 'Vite runs your dev server and bundles your app. npm installs packages. ESLint and Prettier catch errors and keep formatting consistent.',
            why: 'This is the daily toolchain. Juniors who can set it up and fix build errors stand out.',
            demand: 'high',
            topic: 'tooling',
          },
          {
            name: 'Testing (Vitest, Testing Library, Playwright)',
            what: 'Vitest runs unit tests, Testing Library tests components like a user would, and Playwright tests full flows in a real browser.',
            why: 'Production teams expect tests. Having them in your portfolio projects is a strong hiring signal.',
            demand: 'high',
            topic: 'frontend-testing',
          },
          {
            name: 'Accessibility & performance',
            what: 'Making sites usable with keyboards and screen readers, and fast to load (Core Web Vitals, Lighthouse).',
            why: 'Often a legal requirement, and it directly affects revenue and SEO. Many juniors skip it, so it sets you apart.',
            demand: 'high',
            topic: 'accessibility',
          },
          aiTools,
        ],
      },
    ],
  },
  {
    roadmap: 'backend',
    typical: ['Node.js + TypeScript or Python', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
    summary:
      'Backend jobs split by language, but the rest of the stack is very consistent: SQL databases, Docker, a cloud provider and CI/CD. Python and Java appear in the most backend job posts overall; Node.js is the easiest path if you know JavaScript.',
    groups: [
      {
        title: 'Languages',
        note: 'Pick ONE and go deep. Switching languages later is easy once you understand backend concepts.',
        items: [
          {
            name: 'Node.js + TypeScript',
            what: 'Runs JavaScript on the server, so you can use one language for frontend and backend.',
            why: 'Very common in startups and full-stack teams. This roadmap uses it.',
            demand: 'core',
            topic: 'nodejs',
          },
          {
            name: 'Python',
            what: 'A readable, general-purpose language used for web backends, automation, data and AI.',
            why: 'The most named programming language in job posts overall, and the language of AI work.',
            demand: 'core',
            topic: 'python',
          },
          {
            name: 'Java (Spring Boot)',
            what: 'A mature, strongly typed language. Spring Boot is the standard framework for Java web services.',
            why: 'Huge demand in banks, enterprises and large companies. Very stable job market.',
            demand: 'high',
          },
          {
            name: 'C# (.NET)',
            what: 'Microsoft’s language and platform for web APIs (ASP.NET Core), desktop apps and games.',
            why: 'Strong in enterprises and companies that use Microsoft and Azure.',
            demand: 'high',
          },
          {
            name: 'Go',
            what: 'A simple, fast language from Google built for networked services and cloud tools.',
            why: 'Growing in infrastructure, cloud and high-performance backend teams. Docker and Kubernetes are written in Go.',
            demand: 'rising',
          },
        ],
      },
      {
        title: 'Frameworks & APIs',
        items: [
          {
            name: 'REST APIs & HTTP',
            what: 'The standard way apps talk to servers: URLs for resources, methods like GET and POST, JSON data and status codes.',
            why: 'The core of nearly every backend job. Interviewers often ask you to design a REST API.',
            demand: 'core',
            topic: 'http-apis',
          },
          {
            name: 'Express / Fastify / NestJS',
            what: 'Node.js frameworks for routing requests and structuring a server. NestJS adds more structure for big teams.',
            why: 'The most common Node backend frameworks in job posts.',
            demand: 'high',
            topic: 'server-framework',
          },
          {
            name: 'FastAPI / Django',
            what: 'Python’s leading web frameworks. FastAPI is modern and fast for APIs; Django is batteries-included.',
            why: 'FastAPI has grown quickly thanks to AI products. Django runs many established sites.',
            demand: 'high',
          },
          {
            name: 'GraphQL & gRPC',
            what: 'Alternatives to REST. GraphQL lets clients ask for exactly the data they need; gRPC is a fast binary protocol between services.',
            why: 'Used in specific companies and microservice setups. Learn REST well first.',
            demand: 'optional',
          },
        ],
      },
      {
        title: 'Data',
        items: [
          sql,
          {
            name: 'ORMs (Prisma, Drizzle, SQLAlchemy)',
            what: 'Libraries that let you work with database tables as code objects and manage schema changes (migrations).',
            why: 'Most teams use one. Still learn raw SQL: ORMs hide slow queries that you will need to debug.',
            demand: 'high',
            topic: 'orm',
          },
          {
            name: 'Redis',
            what: 'A super-fast in-memory data store used for caching, sessions, rate limiting and queues.',
            why: 'The go-to tool for making slow endpoints fast. Appears in many backend job posts.',
            demand: 'high',
            topic: 'nosql-caching',
          },
          {
            name: 'MongoDB',
            what: 'A document database that stores flexible JSON-like records instead of tables.',
            why: 'Used in some startups and Node stacks. PostgreSQL has more jobs overall.',
            demand: 'optional',
            topic: 'nosql-caching',
          },
          {
            name: 'Message queues (Kafka, RabbitMQ)',
            what: 'Systems that pass jobs and events between services so work can happen in the background.',
            why: 'Needed once systems grow: emails, payments, data pipelines. Common in mid-level posts.',
            demand: 'optional',
            topic: 'realtime-queues',
          },
        ],
      },
      {
        title: 'Security',
        items: [
          {
            name: 'Authentication (sessions, JWT, OAuth)',
            what: 'How users log in and stay logged in, including "Sign in with Google" (OAuth).',
            why: 'Every app has users. Getting auth wrong is a serious security risk, so employers check for it.',
            demand: 'core',
            topic: 'auth',
          },
          {
            name: 'Web security (OWASP Top 10)',
            what: 'The most common ways apps get hacked (SQL injection, XSS, broken access control) and how to prevent them.',
            why: 'Security skills are increasingly listed in job posts. One leaked database can sink a company.',
            demand: 'high',
            topic: 'security',
          },
        ],
      },
      {
        title: 'Shipping & running',
        items: [
          docker,
          aws,
          cicd,
          {
            name: 'Observability (logs, metrics, OpenTelemetry)',
            what: 'Seeing what your service does in production: structured logs, metrics dashboards and request traces.',
            why: 'Teams expect you to debug live issues, not just write code. OpenTelemetry is becoming the standard.',
            demand: 'rising',
            topic: 'observability',
          },
          git,
          aiTools,
        ],
      },
    ],
  },
  {
    roadmap: 'fullstack',
    typical: ['TypeScript', 'React + Next.js', 'Node.js', 'PostgreSQL', 'Vercel / Docker'],
    summary:
      'The most hired full-stack combination is "TypeScript everywhere": React or Next.js on the frontend, Node.js on the backend, PostgreSQL for data. Managed platforms like Vercel and Supabase are common in startups.',
    groups: [
      {
        title: 'Languages',
        items: [
          typescript,
          {
            name: 'JavaScript',
            what: 'The language that runs in every browser, and on servers through Node.js.',
            why: 'The base of the whole full-stack JavaScript ecosystem.',
            demand: 'core',
            topic: 'javascript',
          },
          sql,
        ],
      },
      {
        title: 'Frontend',
        items: [
          {
            name: 'React',
            what: 'A component-based library for building user interfaces.',
            why: 'The most requested frontend framework, and the default in full-stack job posts.',
            demand: 'core',
            topic: 'react',
          },
          {
            name: 'Next.js',
            what: 'A React framework with server rendering, routing and API routes in one project.',
            why: 'Lets one developer build the UI and the backend together. Very popular for full-stack roles.',
            demand: 'core',
            topic: 'nextjs',
          },
          {
            name: 'Tailwind CSS',
            what: 'Utility-first CSS classes for fast, consistent styling.',
            why: 'The default styling choice in most new Next.js projects.',
            demand: 'high',
            topic: 'tailwind',
          },
        ],
      },
      {
        title: 'Backend & data',
        items: [
          {
            name: 'Node.js',
            what: 'JavaScript on the server: APIs, background jobs and scripts.',
            why: 'Lets full-stack developers stay in one language across the whole app.',
            demand: 'core',
            topic: 'nodejs',
          },
          {
            name: 'REST APIs',
            what: 'How your frontend and backend exchange data over HTTP using JSON.',
            why: 'You will design and consume APIs every day as a full-stack developer.',
            demand: 'core',
            topic: 'http-apis',
          },
          {
            name: 'Prisma / Drizzle',
            what: 'TypeScript ORMs that give you type-safe database queries and migrations.',
            why: 'The most common way TypeScript teams talk to PostgreSQL.',
            demand: 'high',
            topic: 'orm',
          },
          {
            name: 'Auth (Auth.js, Clerk, sessions)',
            what: 'Libraries and services that handle sign-up, login, sessions and social login for you.',
            why: 'Every product needs it. Knowing when to use a library and how it works underneath is a key skill.',
            demand: 'high',
            topic: 'auth',
          },
          {
            name: 'Supabase / Firebase',
            what: 'Backend-as-a-service platforms: a hosted database, auth, file storage and realtime features in one place.',
            why: 'Startups use them to ship fast. Supabase (built on PostgreSQL) is growing quickly.',
            demand: 'rising',
          },
        ],
      },
      {
        title: 'Shipping',
        items: [
          {
            name: 'Vercel / Netlify',
            what: 'Hosting platforms that deploy your app automatically on every push to GitHub.',
            why: 'The fastest way to get a full-stack app live. Common in startups.',
            demand: 'high',
            topic: 'deploy-web',
          },
          { ...docker, demand: 'high' },
          cicd,
          git,
          aiTools,
        ],
      },
    ],
  },
  {
    roadmap: 'ai',
    typical: ['Python', 'LLM APIs (Claude, GPT, Gemini)', 'RAG + vector database', 'Evals', 'FastAPI'],
    summary:
      'AI is now one of the most requested skills in tech job posts. This path covers both sides of the job: how models learn (machine learning) and building products on top of large language models. Python is the main language; software engineering basics still matter most.',
    groups: [
      {
        title: 'Languages & data',
        items: [
          {
            name: 'Python',
            what: 'The main language of AI and data work: readable, with huge libraries for ML and LLMs.',
            why: 'Almost every AI job post lists it. It is also the most named language in tech job posts overall.',
            demand: 'core',
            topic: 'python',
          },
          {
            name: 'NumPy & pandas',
            what: 'Libraries for working with numbers (NumPy) and tables of data (pandas) in Python.',
            why: 'You will clean and inspect data constantly, even when working with LLMs.',
            demand: 'high',
            topic: 'data-tools',
          },
          {
            name: 'TypeScript',
            what: 'Typed JavaScript, used for AI features inside web products.',
            why: 'Many AI products ship in Next.js. Python + TypeScript is a very employable combination.',
            demand: 'high',
            topic: 'typescript',
          },
          { ...sql, demand: 'high' },
        ],
      },
      {
        title: 'Working with LLMs',
        items: [
          {
            name: 'LLM APIs (Anthropic, OpenAI, Google)',
            what: 'Calling models like Claude, GPT and Gemini from code: sending messages, streaming replies, using tools and getting structured output.',
            why: 'The core skill of the role. Most AI products are built on these APIs.',
            demand: 'core',
            topic: 'llm-basics',
          },
          {
            name: 'Prompt & context engineering',
            what: 'Writing clear instructions and choosing what information to give a model so it answers reliably.',
            why: 'Small prompt changes make big quality differences. Employers want people who test prompts, not guess.',
            demand: 'core',
            topic: 'prompting',
          },
          {
            name: 'RAG & vector databases (pgvector, Pinecone, Qdrant)',
            what: 'Retrieval-augmented generation: search your own documents for relevant chunks, then give them to the model to answer from.',
            why: 'The most common pattern for company chatbots and search. Appears in most AI engineer posts.',
            demand: 'high',
            topic: 'rag',
          },
          {
            name: 'Agents, tool use & MCP',
            what: 'Letting a model take actions: call APIs, run code, browse. MCP (Model Context Protocol) is a standard way to connect models to tools and data.',
            why: 'The fastest-growing area of AI work right now.',
            demand: 'rising',
            topic: 'agents',
          },
          {
            name: 'LangChain / LangGraph / AI SDKs',
            what: 'Frameworks that provide building blocks for LLM apps: chains, agents, memory and integrations.',
            why: 'Frequently listed in job posts. Learn the raw API first so you understand what the framework does.',
            demand: 'high',
            topic: 'llm-apps',
          },
        ],
      },
      {
        title: 'Quality & production',
        items: [
          {
            name: 'Evals',
            what: 'Automated tests for AI output: datasets of questions with checks that score answers, so you know if a change helped or hurt.',
            why: 'What separates demos from real products. Strongly valued by teams hiring AI engineers.',
            demand: 'high',
            topic: 'evals',
          },
          {
            name: 'FastAPI',
            what: 'A modern Python framework for building APIs quickly.',
            why: 'The most common way to put a Python AI feature behind an API.',
            demand: 'high',
          },
          {
            name: 'LLM observability (Langfuse, LangSmith)',
            what: 'Tools that record every prompt, response, cost and latency so you can debug and improve AI features.',
            why: 'Growing fast as companies move AI features into production.',
            demand: 'rising',
            topic: 'mlops',
          },
          docker,
          git,
        ],
      },
      {
        title: 'Machine learning foundations',
        note: 'Needed for ML engineer roles and fine-tuning. For LLM product work, a working understanding is enough.',
        items: [
          {
            name: 'PyTorch',
            what: 'The leading library for building and training neural networks.',
            why: 'The standard in research and most ML engineering roles.',
            demand: 'high',
            topic: 'deep-learning',
          },
          {
            name: 'Hugging Face',
            what: 'A hub of open models and datasets, with libraries to run and fine-tune them.',
            why: 'Where teams find and deploy open-source models.',
            demand: 'high',
            topic: 'deep-learning',
          },
          {
            name: 'scikit-learn',
            what: 'Classic machine learning in Python: regression, classification, clustering.',
            why: 'Still used for many business problems where an LLM would be overkill.',
            demand: 'optional',
            topic: 'ml-fundamentals',
          },
        ],
      },
    ],
  },
  {
    roadmap: 'devops',
    typical: ['Linux', 'Docker', 'Kubernetes', 'Terraform', 'AWS', 'GitHub Actions'],
    summary:
      'DevOps and platform job posts are very consistent: Linux, containers, Kubernetes, Infrastructure as Code and one major cloud. Observability and security skills are increasingly expected.',
    groups: [
      {
        title: 'Foundations',
        items: [
          {
            name: 'Linux',
            what: 'The operating system almost every server runs. You manage it from the command line.',
            why: 'Non-negotiable for DevOps. Interviews often include live Linux troubleshooting.',
            demand: 'core',
            topic: 'linux',
          },
          {
            name: 'Networking',
            what: 'How machines talk: IPs, DNS, ports, load balancers, firewalls, TLS.',
            why: 'Most production outages involve networking. You need it to debug them.',
            demand: 'core',
            topic: 'networking',
          },
          {
            name: 'Bash & Python scripting',
            what: 'Writing small programs to automate repetitive tasks on servers and in pipelines.',
            why: 'Automation is the job. Python is the most common choice beyond simple shell scripts.',
            demand: 'core',
            topic: 'scripting',
          },
          git,
        ],
      },
      {
        title: 'Containers & orchestration',
        items: [
          docker,
          {
            name: 'Kubernetes',
            what: 'A system that runs and manages many containers across many servers: scaling, restarts, rollouts.',
            why: 'The industry standard for running containers at scale. Listed in a large share of DevOps posts.',
            demand: 'core',
            topic: 'kubernetes',
          },
          {
            name: 'Helm',
            what: 'A package manager for Kubernetes that bundles app configs into reusable charts.',
            why: 'Most teams deploying to Kubernetes use it.',
            demand: 'high',
            topic: 'kubernetes',
          },
        ],
      },
      {
        title: 'Cloud & Infrastructure as Code',
        items: [
          { ...aws, demand: 'core' },
          {
            name: 'Terraform / OpenTofu',
            what: 'Describe your servers, databases and networks in code files, then create or change them with one command.',
            why: 'The most requested IaC tool. Clicking around a cloud console does not scale.',
            demand: 'core',
            topic: 'iac',
          },
          {
            name: 'Ansible',
            what: 'Automates configuring servers: installing packages, editing config files, restarting services.',
            why: 'Common in companies with their own servers and in hybrid setups.',
            demand: 'optional',
            topic: 'iac',
          },
        ],
      },
      {
        title: 'Delivery & reliability',
        items: [
          { ...cicd, demand: 'core' },
          {
            name: 'GitOps (Argo CD, Flux)',
            what: 'Git becomes the source of truth for what runs in production, and a tool syncs the cluster to match it.',
            why: 'A fast-growing way to deploy to Kubernetes safely.',
            demand: 'rising',
          },
          {
            name: 'Prometheus & Grafana',
            what: 'Prometheus collects metrics from your systems; Grafana turns them into dashboards and alerts.',
            why: 'The most common open-source monitoring stack.',
            demand: 'high',
            topic: 'observability',
          },
          {
            name: 'SRE practices',
            what: 'Site Reliability Engineering: SLOs, error budgets, incident response and blameless post-mortems.',
            why: 'Companies want people who keep systems reliable, not just deploy them.',
            demand: 'high',
            topic: 'sre',
          },
          {
            name: 'DevSecOps & platform engineering',
            what: 'Building security scanning and self-service internal tools into the delivery process.',
            why: 'Two of the fastest-growing directions for DevOps careers.',
            demand: 'rising',
          },
          aiTools,
        ],
      },
    ],
  },
  {
    roadmap: 'mobile',
    typical: ['TypeScript', 'React Native + Expo', 'or Flutter', 'Firebase / Supabase', 'App Store & Play Store'],
    summary:
      'Most mobile jobs are either cross-platform (React Native or Flutter, one codebase for iOS and Android) or native (Swift for iOS, Kotlin for Android). This roadmap uses React Native, which lets you reuse JavaScript and React skills.',
    groups: [
      {
        title: 'Cross-platform',
        note: 'Pick one. React Native if you know React; Flutter if you are starting fresh and like its tooling.',
        items: [
          {
            name: 'React Native + Expo',
            what: 'Build real native iOS and Android apps with React and TypeScript. Expo adds tooling, builds and over-the-air updates.',
            why: 'Popular with companies that already use React on the web. Shares skills with frontend roles.',
            demand: 'high',
            topic: 'react-native',
          },
          {
            name: 'Flutter (Dart)',
            what: 'Google’s toolkit for building iOS, Android, web and desktop apps from one codebase in the Dart language.',
            why: 'Very popular for cross-platform apps, with strong demand in many regions.',
            demand: 'high',
          },
          typescript,
        ],
      },
      {
        title: 'Native',
        items: [
          {
            name: 'Swift + SwiftUI (iOS)',
            what: 'Apple’s language and modern UI framework for iPhone, iPad and Mac apps.',
            why: 'Required for iOS-specialist roles, which often pay well.',
            demand: 'high',
            topic: 'native-intro',
          },
          {
            name: 'Kotlin + Jetpack Compose (Android)',
            what: 'Google’s preferred language and modern UI toolkit for Android apps.',
            why: 'Required for Android-specialist roles. Android has the most users worldwide.',
            demand: 'high',
            topic: 'native-intro',
          },
        ],
      },
      {
        title: 'App building blocks',
        items: [
          {
            name: 'Navigation (Expo Router, React Navigation)',
            what: 'Moving between screens: stacks, tabs and deep links.',
            why: 'Every app has multiple screens. Getting navigation right is a core mobile skill.',
            demand: 'core',
            topic: 'mobile-navigation',
          },
          {
            name: 'Data, storage & offline',
            what: 'Fetching from APIs, caching with TanStack Query, and storing data on the device (SQLite, MMKV).',
            why: 'Phones lose connection. Apps that work offline feel professional.',
            demand: 'high',
            topic: 'mobile-data',
          },
          {
            name: 'Device features',
            what: 'Push notifications, camera, location, biometrics and permissions.',
            why: 'What makes a mobile app more than a website. Push notifications appear in most mobile posts.',
            demand: 'high',
            topic: 'native-features',
          },
          {
            name: 'Firebase / Supabase',
            what: 'Ready-made backends for mobile: auth, database, file storage, push and analytics.',
            why: 'Most small and mid-size apps use one instead of building a backend from scratch.',
            demand: 'high',
          },
        ],
      },
      {
        title: 'Quality & release',
        items: [
          {
            name: 'Mobile testing (Jest, Maestro, Detox)',
            what: 'Unit tests for logic, plus end-to-end tests that tap through your app on a simulator.',
            why: 'App store releases are slow to fix, so teams test before shipping.',
            demand: 'optional',
            topic: 'mobile-testing',
          },
          {
            name: 'App Store & Play Store release',
            what: 'Signing, building (EAS), store listings, review guidelines and staged rollouts.',
            why: 'Shipping a real app to the stores is one of the strongest portfolio signals for mobile jobs.',
            demand: 'core',
            topic: 'app-store',
          },
          git,
          aiTools,
        ],
      },
    ],
  },
];

stacks.push(
  {
    roadmap: 'cloud',
    typical: ['AWS or Azure', 'Terraform', 'Linux', 'Docker + Kubernetes', 'Python'],
    summary:
      'Cloud job posts are split almost evenly between AWS and Azure, so learn one well; the ideas transfer. Infrastructure as code (Terraform) and containers (Kubernetes) are close to baseline requirements, and security and cost skills set strong candidates apart.',
    groups: [
      {
        title: 'Cloud platforms',
        note: 'Pick ONE platform to learn deeply. AWS has the most jobs overall; Azure is strong in enterprises and government.',
        items: [
          {
            name: 'AWS',
            what: 'Amazon Web Services: the largest cloud, with services for computing, storage, databases, networking and AI.',
            why: 'Appears in close to half of cloud engineer job posts. The broadest job market of any cloud.',
            demand: 'core',
            topic: 'cloud',
          },
          {
            name: 'Microsoft Azure',
            what: 'Microsoft’s cloud, tightly integrated with Windows, Active Directory and Office 365.',
            why: 'Appears about as often as AWS in cloud posts, especially in large companies and government.',
            demand: 'core',
            topic: 'cloud',
          },
          {
            name: 'Google Cloud',
            what: 'Google’s cloud, known for data, analytics, Kubernetes (GKE) and AI services.',
            why: 'A smaller share of jobs, but popular with data-heavy companies and startups.',
            demand: 'optional',
            topic: 'cloud',
          },
        ],
      },
      {
        title: 'Foundations',
        items: [
          {
            name: 'Linux',
            what: 'The operating system almost every cloud server runs.',
            why: 'You’ll SSH into machines, read logs and fix servers. Expected in nearly every cloud role.',
            demand: 'core',
            topic: 'linux',
          },
          {
            name: 'Networking',
            what: 'IP addresses, DNS, subnets, ports, firewalls and load balancing.',
            why: 'Cloud networking (VPCs) is where most beginners get stuck and where many outages start.',
            demand: 'core',
            topic: 'cloud-networking',
          },
          {
            name: 'Bash & Python scripting',
            what: 'Small programs that automate repetitive work on servers and in the cloud.',
            why: 'Automation is the job. Python also powers most cloud SDKs and serverless functions.',
            demand: 'high',
            topic: 'scripting',
          },
        ],
      },
      {
        title: 'Infrastructure as code',
        items: [
          {
            name: 'Terraform / OpenTofu',
            what: 'Describe your cloud setup in code files, then create or change it with one command.',
            why: 'The most requested IaC tool in cloud posts. Clicking around a console doesn’t scale or repeat.',
            demand: 'core',
            topic: 'iac',
          },
          {
            name: 'CloudFormation / Bicep',
            what: 'The built-in IaC languages of AWS (CloudFormation) and Azure (Bicep).',
            why: 'Common in companies that stick to a single cloud.',
            demand: 'optional',
            topic: 'iac',
          },
        ],
      },
      {
        title: 'Containers',
        items: [
          {
            name: 'Docker',
            what: 'Packages an app and everything it needs into a container that runs the same anywhere.',
            why: 'How most apps are shipped to the cloud today.',
            demand: 'core',
            topic: 'docker',
          },
          {
            name: 'Kubernetes (EKS / AKS / GKE)',
            what: 'Runs and manages many containers across many servers. Each cloud offers a managed version.',
            why: 'Listed in about a third of cloud engineer posts, and often missing from junior résumés.',
            demand: 'high',
            topic: 'kubernetes',
          },
        ],
      },
      {
        title: 'Security',
        items: [
          {
            name: 'IAM & least privilege',
            what: 'Controlling exactly who and what can access each cloud resource.',
            why: 'Misconfigured permissions cause many real breaches. Every cloud interview asks about it.',
            demand: 'core',
            topic: 'cloud-security',
          },
          {
            name: 'Secrets & encryption',
            what: 'Storing passwords and keys in a secrets manager, and encrypting data at rest and in transit.',
            why: 'Cloud security skills are among the best paid in cloud job data.',
            demand: 'high',
            topic: 'cloud-security',
          },
        ],
      },
      {
        title: 'Delivery & operations',
        items: [
          { ...cicd, demand: 'high' },
          {
            name: 'Serverless (Lambda / Azure Functions)',
            what: 'Run code in response to events without managing any servers.',
            why: 'A fast, cheap way to build many cloud features. Common in modern cloud teams.',
            demand: 'high',
            topic: 'serverless',
          },
          {
            name: 'Observability (CloudWatch, Prometheus)',
            what: 'Logs, metrics, alerts and dashboards that show what your systems are doing.',
            why: 'Observability and incident response appear among the top-paying cloud skills.',
            demand: 'high',
            topic: 'observability',
          },
          {
            name: 'FinOps & cost control',
            what: 'Tracking and reducing the cloud bill: budgets, alerts, right-sizing and cleanup.',
            why: 'Companies are under pressure to cut cloud spend. Engineers who save money stand out.',
            demand: 'rising',
            topic: 'cloud-architecture',
          },
          git,
          aiTools,
        ],
      },
    ],
  },
  {
    roadmap: 'agents',
    typical: ['Python', 'LLM APIs (Claude, GPT, Gemini)', 'MCP', 'LangGraph / Agent SDKs', 'Evals'],
    summary:
      'Agentic AI is the fastest-growing part of AI hiring. In job posts, LLM skills, Python, evals and agent experience lead, and MCP is climbing fast. Most openings want some experience, so pair this path with solid programming basics.',
    groups: [
      {
        title: 'Languages',
        items: [
          {
            name: 'Python',
            what: 'The main language for AI work, with the richest libraries for LLMs and agents.',
            why: 'Named in most AI engineer job posts.',
            demand: 'core',
            topic: 'python',
          },
          { ...typescript, why: 'Many agents live inside web products. TypeScript agent SDKs are widely used.', demand: 'high' },
        ],
      },
      {
        title: 'Models & tools',
        items: [
          {
            name: 'LLM APIs (Anthropic, OpenAI, Google)',
            what: 'Calling models from code, including tool calling: letting the model ask your code to run a function.',
            why: 'LLM skills top AI job posts. Tool calling is the heart of every agent.',
            demand: 'core',
            topic: 'llm-basics',
          },
          {
            name: 'MCP (Model Context Protocol)',
            what: 'An open standard for connecting models to tools and data through reusable servers.',
            why: 'One of the most requested skills in agentic job trackers, and growing quickly.',
            demand: 'high',
            topic: 'mcp',
          },
          {
            name: 'Prompt & context engineering',
            what: 'Writing instructions and choosing which information the model sees at each step.',
            why: 'Agents fail mostly from bad context. Employers want people who test prompts, not guess.',
            demand: 'core',
            topic: 'prompting',
          },
        ],
      },
      {
        title: 'Agent frameworks',
        note: 'Learn the agent loop by hand first. Frameworks are easier once you know what they automate.',
        items: [
          {
            name: 'LangGraph',
            what: 'A framework for building agents as graphs of steps, with state, branching and retries.',
            why: 'One of the most used agent frameworks in job posts.',
            demand: 'high',
            topic: 'agent-frameworks',
          },
          {
            name: 'OpenAI Agents SDK / Claude Agent SDK',
            what: 'Official toolkits from model providers for building tool-using and multi-agent apps.',
            why: 'Increasingly common in new agent projects.',
            demand: 'rising',
            topic: 'agent-frameworks',
          },
          {
            name: 'Multi-agent patterns',
            what: 'Several specialised agents working together: a planner hands work to helpers.',
            why: 'Used for complex tasks like research, coding and customer support.',
            demand: 'rising',
            topic: 'agent-frameworks',
          },
        ],
      },
      {
        title: 'Memory & knowledge',
        items: [
          {
            name: 'RAG & vector databases (pgvector, Pinecone, Qdrant)',
            what: 'Searching your own documents for relevant facts and feeding them to the agent.',
            why: 'How agents answer from company knowledge instead of guessing.',
            demand: 'high',
            topic: 'rag',
          },
        ],
      },
      {
        title: 'Quality & safety',
        items: [
          {
            name: 'Evals',
            what: 'Automated tests that score agent behaviour, so you know whether a change helped.',
            why: 'Asked for in over half of AI engineer posts in one 2026 analysis. What separates demos from products.',
            demand: 'core',
            topic: 'evals',
          },
          {
            name: 'Guardrails & prompt-injection defence',
            what: 'Limiting what agents can do, sandboxing tools and requiring approval for risky actions.',
            why: 'An agent with tools can cause real damage. Companies need engineers who make it safe.',
            demand: 'high',
            topic: 'agent-safety',
          },
          {
            name: 'Tracing & observability (Langfuse, LangSmith)',
            what: 'Recording every step, tool call, cost and error an agent makes.',
            why: 'You can’t fix an agent you can’t see. Growing fast as agents reach production.',
            demand: 'rising',
            topic: 'mlops',
          },
        ],
      },
      {
        title: 'Ship it',
        items: [
          {
            name: 'FastAPI',
            what: 'A modern Python framework for putting your agent behind an API.',
            why: 'The most common way to serve Python AI apps.',
            demand: 'high',
          },
          { ...docker, demand: 'high' },
          aws,
          {
            name: 'AI coding agents (Claude Code, Cursor)',
            what: 'Coding agents you work alongside every day, and the tools your own agents may plug into.',
            why: 'Agentic engineers are expected to be fluent users of agentic tools themselves.',
            demand: 'core',
            topic: 'agentic-coding',
          },
        ],
      },
    ],
  },
  {
    roadmap: 'software',
    typical: ['Python', 'Java (Spring Boot)', 'Git & GitHub', 'SQL & PostgreSQL', 'Unit testing'],
    summary:
      'Software engineer job posts ask for one main language used well, plus the fundamentals that work in every language: data structures, clean and tested code, Git, SQL and basic system design. Companies care more about how you solve problems than which language you used to learn.',
    groups: [
      {
        title: 'One main language',
        note: 'Pick ONE and go deep. The concepts transfer, so a second language takes weeks, not months.',
        items: [
          {
            name: 'Python',
            what: 'A readable, general-purpose language used for backends, automation, data and AI.',
            why: 'One of the most requested languages overall, and the easiest to read in coding interviews.',
            demand: 'core',
            topic: 'python',
          },
          {
            name: 'Java (Spring Boot)',
            what: 'A strongly typed language that runs large enterprise systems, banks and Android apps.',
            why: 'Very common in big companies and their technical interviews.',
            demand: 'high',
          },
          {
            name: 'C# (.NET)',
            what: 'Microsoft’s typed language for business apps, cloud services and games (Unity).',
            why: 'Strong demand in enterprises and companies built on Microsoft tools.',
            demand: 'high',
          },
          typescript,
        ],
      },
      {
        title: 'Fundamentals',
        items: [
          {
            name: 'Data structures & algorithms',
            what: 'Arrays, hash maps, trees, graphs and Big-O: how to store and process data efficiently.',
            why: 'The core of most technical interviews, and what makes code fast at scale.',
            demand: 'core',
            topic: 'dsa',
          },
          {
            name: 'OOP & design patterns',
            what: 'Organising code into classes with clear responsibilities, using proven design solutions.',
            why: 'Most large codebases are object-oriented, and design questions come up in interviews.',
            demand: 'high',
            topic: 'oop',
          },
          {
            name: 'Clean code & refactoring',
            what: 'Readable names, small functions, and improving code safely without changing its behaviour.',
            why: 'Teams spend more time reading code than writing it. Reviewers notice messy code immediately.',
            demand: 'high',
            topic: 'clean-code',
          },
        ],
      },
      {
        title: 'Quality & teamwork',
        items: [
          {
            name: 'Unit testing',
            what: 'Automated tests with tools like pytest, JUnit or Jest that check your code works.',
            why: 'Expected on almost every professional team. Untested code rarely passes review.',
            demand: 'core',
            topic: 'testing-fundamentals',
          },
          git,
          {
            name: 'Code review & pull requests',
            what: 'Proposing changes in small pull requests and reviewing teammates’ code.',
            why: 'How every team ships code. Good reviewers are trusted with more responsibility fast.',
            demand: 'high',
            topic: 'code-review',
          },
          {
            name: 'Agile & Scrum',
            what: 'Working in short cycles with tickets, sprints and stand-ups.',
            why: 'Most software teams work this way, and job posts often mention it.',
            demand: 'high',
            topic: 'sdlc-agile',
          },
          aiTools,
        ],
      },
      {
        title: 'Building real systems',
        items: [
          sql,
          {
            name: 'REST APIs',
            what: 'How programs talk to each other over HTTP with JSON.',
            why: 'Almost every app today is built from APIs, so every engineer works with them.',
            demand: 'core',
            topic: 'http-apis',
          },
          {
            name: 'System design',
            what: 'Planning systems with load balancers, caches, databases and queues so they scale.',
            why: 'Asked in interviews for mid-level and senior roles, and useful from day one.',
            demand: 'high',
            topic: 'system-design',
          },
          { ...docker, demand: 'high' },
          { ...cicd, demand: 'high' },
        ],
      },
    ],
  },
  {
    roadmap: 'qa',
    typical: ['Playwright', 'TypeScript', 'Postman', 'Jira', 'GitHub Actions'],
    summary:
      'QA job posts ask for solid manual testing skills (test cases, bug reports, exploratory testing) and, more and more, automation: Playwright, Cypress or Selenium for the web, Postman or code for APIs, and running tests in CI. Automation skills are what move testers into higher-paid SDET roles.',
    groups: [
      {
        title: 'Testing skills',
        note: 'The foundation of every QA job, manual or automated.',
        items: [
          {
            name: 'Test design & test cases',
            what: 'Choosing what to test with techniques like boundary values and equivalence classes, and writing clear test cases.',
            why: 'Asked about in almost every QA interview. Good test design finds more bugs with fewer tests.',
            demand: 'core',
            topic: 'test-design',
          },
          {
            name: 'Bug reporting',
            what: 'Writing reports with exact steps, expected vs actual results and evidence.',
            why: 'The main thing a tester delivers. Clear reports get bugs fixed fast.',
            demand: 'core',
            topic: 'bug-reports',
          },
          {
            name: 'Exploratory testing',
            what: 'Learning and testing an app at the same time, guided by a mission.',
            why: 'Finds the bugs scripts miss. Valued by teams that move fast.',
            demand: 'high',
            topic: 'exploratory-testing',
          },
          {
            name: 'ISTQB Foundation (CTFL)',
            what: 'The most recognised entry-level software testing certificate.',
            why: 'Often listed as a plus in job posts, especially at larger companies and outsourcing firms.',
            demand: 'optional',
            topic: 'qa-career',
          },
        ],
      },
      {
        title: 'UI automation',
        note: 'Pick ONE tool. Playwright is growing fastest; Selenium is still common in older codebases.',
        items: [
          {
            name: 'Playwright',
            what: 'Microsoft’s browser automation tool: fast, reliable, all browsers, with a recorder and trace viewer.',
            why: 'The fastest-growing web testing tool, used for new test suites at many companies.',
            demand: 'core',
            topic: 'ui-automation',
          },
          {
            name: 'Cypress',
            what: 'A JavaScript end-to-end testing tool that runs inside the browser with a friendly UI.',
            why: 'Widely used in frontend teams, so it appears in many job posts.',
            demand: 'high',
            topic: 'ui-automation',
          },
          {
            name: 'Selenium',
            what: 'The original browser automation tool, with bindings for Java, Python, C# and more.',
            why: 'Still found in many large and older test suites, especially with Java.',
            demand: 'high',
            topic: 'ui-automation',
          },
          { ...typescript, why: 'Playwright and Cypress tests are mostly written in TypeScript or JavaScript.', demand: 'core' },
        ],
      },
      {
        title: 'APIs, data & performance',
        items: [
          {
            name: 'Postman',
            what: 'An app for sending API requests, saving them in collections and adding test scripts.',
            why: 'The most common API testing tool in QA job posts.',
            demand: 'core',
            topic: 'api-testing',
          },
          { ...sql, why: 'Testers check that the data saved in the database is correct.', demand: 'high' },
          {
            name: 'k6',
            what: 'A load testing tool where you write tests in JavaScript.',
            why: 'Performance testing is a valued extra, and k6 is a modern, popular choice.',
            demand: 'rising',
            topic: 'performance-testing',
          },
          {
            name: 'Chrome DevTools',
            what: 'The browser tools for console errors, network requests, storage and device testing.',
            why: 'Used daily to investigate bugs and write better reports.',
            demand: 'core',
            topic: 'devtools-for-testers',
          },
        ],
      },
      {
        title: 'Team tools',
        items: [
          {
            name: 'Jira',
            what: 'The most common tool for tracking bugs, stories and sprints.',
            why: 'Appears in a large share of QA job posts. You’ll file and track bugs here every day.',
            demand: 'core',
            topic: 'bug-reports',
          },
          git,
          { ...cicd, why: 'Automated tests run in CI pipelines on every change, so testers set them up and keep them green.', demand: 'high' },
          aiTools,
        ],
      },
    ],
  },
);

/** Skills that show up across almost every developer role. */
export const EVERY_ROLE: { name: string; why: string }[] = [
  { name: 'Git & GitHub', why: 'Every team uses it, and your GitHub is your portfolio.' },
  { name: 'SQL', why: 'One of the most requested hard skills in tech job posts overall.' },
  { name: 'Cloud basics', why: 'AWS and other cloud skills appear across backend, DevOps, AI and full-stack posts.' },
  { name: 'AI fluency', why: 'Using AI tools well, and checking their output, is now asked for in most roles.' },
  { name: 'Communication', why: 'The most requested skill in job posts of all, ahead of any technology.' },
];

export const STACK_SOURCES = [
  { label: 'Stack Overflow Developer Survey 2026', url: 'https://stackoverflow.blog/2026/10/06/the-results-of-the-2026-developer-survey-are-here/' },
  { label: 'Oxylabs: most in-demand programming languages (≈1M US job posts)', url: 'https://oxylabs.io/press-area/most-in-demand-programming-languages' },
  { label: 'Qarera: skills in 360,000+ job postings, 2026', url: 'https://dev.to/nitin_singh_44dfd28c4929f/we-counted-the-skills-in-360000-job-postings-ai-was-the-most-requested-hard-skill-1146' },
  { label: 'Revelio Labs: how much programming skills still matter', url: 'https://www.reveliolabs.com/news/tech/in-the-age-of-vibe-coding-how-much-do-programming-skills-still-matter' },
  { label: 'TechRepublic: the fastest-growing tech jobs of 2026', url: 'https://www.techrepublic.com/article/news-fastest-growing-tech-jobs-2026/' },
  { label: 'Agentic AI hiring growth in 2026 (citing Stanford AI Index)', url: 'https://jobsbyculture.com/blog/agentic-ai-hiring-boom-2026' },
  { label: 'Agentic AI Jobs Index, September 2026', url: 'https://www.getreadyforagents.com/jobs/report/2026-09/' },
  { label: 'What 390 AI engineer job posts require (2026)', url: 'https://dev.to/ali_82f3409ed625e8ba8515b/ai-engineer-roadmap-2026-what-390-job-postings-actually-require-3jdo' },
  { label: 'Cloud engineer skills in 3,548 job posts (2026)', url: 'https://dev.to/gnana_6392e836fd500a957dc/cloud-engineer-skills-in-2026-breadth-gets-hired-depth-gets-paid-2bok' },
];

export function getStack(roadmapId: string | undefined) {
  return stacks.find((s) => s.roadmap === roadmapId);
}
