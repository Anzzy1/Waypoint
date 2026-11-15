import type { GlyphKey } from '../components/Art';

/**
 * Visual for each tech name used in stacks.ts.
 * `logos` are Devicon paths (icons/<path>.svg, pinned version in TechLogo.tsx); up to two are shown.
 * Concepts without a brand get a drawn `glyph` instead.
 */
export interface LogoSpec {
  logos?: string[];
  glyph?: GlyphKey;
}

export const LOGOS: Record<string, LogoSpec> = {
  /* languages */
  'HTML & CSS': { logos: ['html5/html5-original', 'css3/css3-original'] },
  JavaScript: { logos: ['javascript/javascript-original'] },
  TypeScript: { logos: ['typescript/typescript-original'] },
  Python: { logos: ['python/python-original'] },
  'Node.js': { logos: ['nodejs/nodejs-original'] },
  'Node.js + TypeScript': { logos: ['nodejs/nodejs-original', 'typescript/typescript-original'] },
  'Node.js + TypeScript or Python': { logos: ['nodejs/nodejs-original', 'python/python-original'] },
  'Java (Spring Boot)': { logos: ['java/java-original', 'spring/spring-original'] },
  'C# (.NET)': { logos: ['csharp/csharp-original', 'dotnetcore/dotnetcore-original'] },
  Go: { logos: ['go/go-original-wordmark'] },
  'Swift + SwiftUI (iOS)': { logos: ['swift/swift-original'] },
  'Kotlin + Jetpack Compose (Android)': { logos: ['kotlin/kotlin-original', 'jetpackcompose/jetpackcompose-original'] },
  'Flutter (Dart)': { logos: ['flutter/flutter-original', 'dart/dart-original'] },
  'or Flutter': { logos: ['flutter/flutter-original'] },

  /* frontend */
  React: { logos: ['react/react-original'] },
  'React + Next.js': { logos: ['react/react-original', 'nextjs/nextjs-original'] },
  'Next.js': { logos: ['nextjs/nextjs-original'] },
  Angular: { logos: ['angular/angular-original'] },
  'Vue / Nuxt': { logos: ['vuejs/vuejs-original'] },
  'Tailwind CSS': { logos: ['tailwindcss/tailwindcss-original'] },
  'Component libraries (shadcn/ui, MUI)': { logos: ['materialui/materialui-original'] },
  'TanStack Query': { glyph: 'refresh' },
  'Zustand / Redux Toolkit': { logos: ['redux/redux-original'] },
  'Vite, npm & ESLint': { logos: ['vitejs/vitejs-original', 'eslint/eslint-original'] },
  'Testing (Vitest, Testing Library, Playwright)': { logos: ['vitest/vitest-original', 'playwright/playwright-original'] },
  'Vitest / Playwright': { logos: ['vitest/vitest-original', 'playwright/playwright-original'] },
  'Accessibility & performance': { glyph: 'access' },

  /* backend & data */
  'REST APIs & HTTP': { glyph: 'api' },
  'REST APIs': { glyph: 'api' },
  'Express / Fastify / NestJS': { logos: ['express/express-original', 'nestjs/nestjs-original'] },
  'FastAPI / Django': { logos: ['fastapi/fastapi-original', 'django/django-plain'] },
  FastAPI: { logos: ['fastapi/fastapi-original'] },
  'GraphQL & gRPC': { logos: ['graphql/graphql-plain'] },
  'SQL & PostgreSQL': { logos: ['postgresql/postgresql-original'] },
  PostgreSQL: { logos: ['postgresql/postgresql-original'] },
  'ORMs (Prisma, Drizzle, SQLAlchemy)': { logos: ['prisma/prisma-original', 'sqlalchemy/sqlalchemy-original'] },
  'Prisma / Drizzle': { logos: ['prisma/prisma-original'] },
  Redis: { logos: ['redis/redis-original'] },
  MongoDB: { logos: ['mongodb/mongodb-original'] },
  'Message queues (Kafka, RabbitMQ)': { logos: ['apachekafka/apachekafka-original', 'rabbitmq/rabbitmq-original'] },
  'Authentication (sessions, JWT, OAuth)': { glyph: 'lock' },
  'Auth (Auth.js, Clerk, sessions)': { glyph: 'lock' },
  'Web security (OWASP Top 10)': { glyph: 'shield' },
  'Supabase / Firebase': { logos: ['supabase/supabase-original', 'firebase/firebase-original'] },
  'Firebase / Supabase': { logos: ['firebase/firebase-original', 'supabase/supabase-original'] },

  /* shipping & ops */
  'Git & GitHub': { logos: ['git/git-original', 'github/github-original'] },
  Docker: { logos: ['docker/docker-original'] },
  'Vercel / Docker': { logos: ['vercel/vercel-original', 'docker/docker-original'] },
  'Vercel / Netlify': { logos: ['vercel/vercel-original', 'netlify/netlify-original'] },
  'AWS (or Azure / Google Cloud)': { logos: ['amazonwebservices/amazonwebservices-original-wordmark', 'azure/azure-original'] },
  AWS: { logos: ['amazonwebservices/amazonwebservices-original-wordmark'] },
  'CI/CD (GitHub Actions)': { logos: ['githubactions/githubactions-original'] },
  'GitHub Actions': { logos: ['githubactions/githubactions-original'] },
  'Observability (logs, metrics, OpenTelemetry)': { logos: ['opentelemetry/opentelemetry-original'] },
  Linux: { logos: ['linux/linux-original'] },
  Networking: { glyph: 'network' },
  'Bash & Python scripting': { logos: ['bash/bash-original', 'python/python-original'] },
  Kubernetes: { logos: ['kubernetes/kubernetes-original'] },
  Helm: { logos: ['helm/helm-original'] },
  'Terraform / OpenTofu': { logos: ['terraform/terraform-original'] },
  Terraform: { logos: ['terraform/terraform-original'] },
  Ansible: { logos: ['ansible/ansible-original'] },
  'GitOps (Argo CD, Flux)': { logos: ['argocd/argocd-original'] },
  'Prometheus & Grafana': { logos: ['prometheus/prometheus-original', 'grafana/grafana-original'] },
  'SRE practices': { glyph: 'gauge' },
  'DevSecOps & platform engineering': { glyph: 'shield' },

  /* AI */
  'NumPy & pandas': { logos: ['numpy/numpy-original', 'pandas/pandas-original'] },
  'LLM APIs (Anthropic, OpenAI, Google)': { glyph: 'sparkle' },
  'LLM APIs (Claude, GPT, Gemini)': { glyph: 'sparkle' },
  'Prompt & context engineering': { glyph: 'chat' },
  'RAG & vector databases (pgvector, Pinecone, Qdrant)': { glyph: 'search' },
  'RAG + vector database': { glyph: 'search' },
  'Agents, tool use & MCP': { glyph: 'nodes' },
  'LangChain / LangGraph / AI SDKs': { glyph: 'layers' },
  Evals: { glyph: 'checklist' },
  'LLM observability (Langfuse, LangSmith)': { glyph: 'eye' },
  PyTorch: { logos: ['pytorch/pytorch-original'] },
  'Hugging Face': { glyph: 'layers' },
  'scikit-learn': { logos: ['scikitlearn/scikitlearn-original'] },
  'AI coding assistants': { glyph: 'sparkle' },

  /* cloud */
  'AWS or Azure': { logos: ['amazonwebservices/amazonwebservices-original-wordmark', 'azure/azure-original'] },
  'Microsoft Azure': { logos: ['azure/azure-original'] },
  'Google Cloud': { logos: ['googlecloud/googlecloud-original'] },
  'Docker + Kubernetes': { logos: ['docker/docker-original', 'kubernetes/kubernetes-original'] },
  'CloudFormation / Bicep': { logos: ['amazonwebservices/amazonwebservices-original-wordmark', 'azure/azure-original'] },
  'Kubernetes (EKS / AKS / GKE)': { logos: ['kubernetes/kubernetes-original'] },
  'IAM & least privilege': { glyph: 'lock' },
  'Secrets & encryption': { glyph: 'shield' },
  'Serverless (Lambda / Azure Functions)': { glyph: 'bolt' },
  'Observability (CloudWatch, Prometheus)': { logos: ['prometheus/prometheus-original', 'grafana/grafana-original'] },
  'FinOps & cost control': { glyph: 'gauge' },

  /* agents */
  MCP: { glyph: 'nodes' },
  'MCP (Model Context Protocol)': { glyph: 'nodes' },
  'LangGraph / Agent SDKs': { glyph: 'layers' },
  LangGraph: { glyph: 'layers' },
  'OpenAI Agents SDK / Claude Agent SDK': { glyph: 'sparkle' },
  'Multi-agent patterns': { glyph: 'network' },
  'Guardrails & prompt-injection defence': { glyph: 'shield' },
  'Tracing & observability (Langfuse, LangSmith)': { glyph: 'eye' },
  'AI coding agents (Claude Code, Cursor)': { glyph: 'sparkle' },

  /* software engineering */
  'Data structures & algorithms': { glyph: 'puzzle' },
  'OOP & design patterns': { logos: ['unifiedmodelinglanguage/unifiedmodelinglanguage-original'] },
  'Clean code & refactoring': { glyph: 'sparkle' },
  'Unit testing': { logos: ['pytest/pytest-original', 'junit/junit-original'] },
  'Code review & pull requests': { glyph: 'speech' },
  'Agile & Scrum': { glyph: 'refresh' },
  'System design': { glyph: 'network' },

  /* QA & test automation */
  'Test design & test cases': { glyph: 'tree' },
  'Bug reporting': { logos: ['jira/jira-original'] },
  'Exploratory testing': { glyph: 'compass' },
  'ISTQB Foundation (CTFL)': { glyph: 'checklist' },
  Playwright: { logos: ['playwright/playwright-original'] },
  Cypress: { logos: ['cypressio/cypressio-original'] },
  Selenium: { logos: ['selenium/selenium-original'] },
  Postman: { logos: ['postman/postman-original'] },
  k6: { logos: ['k6/k6-original'] },
  'Chrome DevTools': { logos: ['chrome/chrome-original'] },
  Jira: { logos: ['jira/jira-original'] },

  /* mobile */
  'React Native + Expo': { logos: ['react/react-original'] },
  'Navigation (Expo Router, React Navigation)': { glyph: 'compass' },
  'Data, storage & offline': { logos: ['sqlite/sqlite-original'] },
  'Device features': { glyph: 'phone' },
  'Mobile testing (Jest, Maestro, Detox)': { logos: ['jest/jest-plain'] },
  'App Store & Play Store release': { logos: ['apple/apple-original', 'android/android-original'] },
  'App Store & Play Store': { logos: ['apple/apple-original', 'android/android-original'] },
};

/** Glyphs for the "Hired in every role" cards. */
export const EVERY_ROLE_GLYPH: Record<string, GlyphKey> = {
  'Git & GitHub': 'branch',
  SQL: 'database',
  'Cloud basics': 'cloud',
  'AI fluency': 'sparkle',
  Communication: 'speech',
};
