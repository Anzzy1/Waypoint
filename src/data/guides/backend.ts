import type { LessonGuide } from './types';

/** Backend + full-stack lessons. */
export const BACKEND_GUIDES: Record<string, LessonGuide> = {
  nodejs: {
    simple: "Node.js lets you run JavaScript outside the browser, so you can build servers, tools and scripts with the language you already know.",
    uses: ["Build web servers and APIs", "Write command-line tools and scripts", "Use one language for frontend and backend"],
    example: {
      file: "server.js",
      code: `import http from "node:http";

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Hello from Node!" }));
});

server.listen(3000, () => console.log("Running on http://localhost:3000"));`,
      output: `Running on http://localhost:3000`,
      note: "A tiny web server. Open the link and your browser shows the JSON message.",
    },
    steps: [
      { t: "The Node runtime and modules", d: "Run a file with node app.js. Split code into modules with import/export, and install packages from npm.", try: "Write a script that prints today’s date, then run it with node." },
      { t: "The event loop", d: "Node handles many requests at once by never waiting around: slow work like reading files happens in the background while other code runs.", try: "Read a file with fs.readFile and log something before it finishes. Notice the order." },
      { t: "Files, paths and environment", d: "fs reads and writes files, path builds file paths safely on any OS, and process.env reads settings like PORT and API keys.", try: "Write a script that counts the lines in a text file passed as an argument." },
      { t: "A raw HTTP server", d: "Before using frameworks, build a server with the http module so you see what frameworks do for you.", try: "Make a server that returns different text for / and /about." },
    ],
    project: "Build a command-line notes app: node notes.js add \"buy milk\", list, and delete, saving to a JSON file.",
  },

  python: {
    simple: "Python is a programming language that reads almost like plain English. It’s used for websites, automation, data and AI.",
    uses: ["Automate boring tasks (renaming files, filling spreadsheets)", "Build backends and APIs with FastAPI or Django", "Work in data science and AI, where Python is the main language"],
    example: {
      file: "grades.py",
      code: `students = {"Ana": 91, "Ben": 78, "Cara": 85}

for name, score in students.items():
    result = "pass" if score >= 80 else "keep practising"
    print(f"{name}: {score} ({result})")

average = sum(students.values()) / len(students)
print("Class average:", round(average, 1))`,
      output: `Ana: 91 (pass)
Ben: 78 (keep practising)
Cara: 85 (pass)
Class average: 84.7`,
      note: "A dictionary stores names and scores. The loop prints each one, then Python calculates the average.",
    },
    steps: [
      { t: "Install Python and run your first file", d: "Install Python 3 from python.org (or use your package manager), open VS Code, create hello.py with print(\"Hello\") and run python hello.py in the terminal.", try: "Write a program that asks your name with input() and greets you." },
      { t: "Variables, types and decisions", d: "Store values in variables. The basic types are numbers (int, float), text (str) and True/False (bool). Use if/elif/else to make decisions and for/while loops to repeat.", try: "Write a number-guessing game: the computer picks 1–10, you guess until right." },
      { t: "Lists, dicts and sets", d: "A list is an ordered collection [1, 2, 3]. A dict maps keys to values {\"name\": \"Ana\"}. A set holds unique items. Comprehensions build lists in one line: [x * 2 for x in nums].", try: "Count how many times each word appears in a sentence using a dict." },
      { t: "Functions, classes and modules", d: "Functions (def) package reusable code. Classes group data and behaviour together, like a BankAccount with deposit(). Modules let you split code into files and import them.", try: "Make a BankAccount class with deposit, withdraw and a balance that can’t go below zero." },
      { t: "Virtual environments and packages", d: "A virtual environment keeps each project’s packages separate. Create one with python -m venv .venv (or use uv), activate it, then pip install what you need.", try: "Create a venv, install the requests package and fetch a web page." },
      { t: "Files, errors and the standard library", d: "open() reads and writes files. try/except handles errors without crashing. Python ships with useful modules: csv, json, datetime, pathlib.", try: "Read a CSV of expenses and print the total per category." },
    ],
    project: "Build a command-line expense tracker: add expenses, list them, show totals per category, and save everything to a JSON file.",
  },

  'http-apis': {
    simple: "An API is how programs talk to each other. A REST API uses URLs and HTTP methods so your frontend or mobile app can get and save data on a server.",
    uses: ["Connect your frontend to your database", "Let mobile apps and other services use your backend", "Design endpoints other developers enjoy using"],
    example: {
      file: "API design",
      code: `GET    /api/books          → list books
GET    /api/books/42       → one book
POST   /api/books          → create a book
PATCH  /api/books/42       → update part of a book
DELETE /api/books/42       → delete a book`,
      output: `HTTP/1.1 201 Created
{ "id": 43, "title": "Dune" }`,
      note: "URLs name things (books), methods say what to do. Status codes report the result: 201 means created.",
    },
    steps: [
      { t: "HTTP in depth", d: "Methods: GET reads, POST creates, PUT/PATCH update, DELETE removes. Status codes: 2xx success, 4xx your fault (400 bad input, 401 not logged in, 404 missing), 5xx server fault.", try: "Use Bruno or Postman to call a public API and read the status and headers." },
      { t: "Designing clean URLs", d: "URLs are nouns (/users/7/orders), not verbs (/getUserOrders). Keep them plural and predictable.", try: "Design the endpoints for a library app with books, members and loans on paper." },
      { t: "Validation and pagination", d: "Never trust input: check it and return 400 with a clear message. Large lists are split into pages (?page=2&limit=20) and can be filtered (?genre=scifi).", try: "Sketch the response for GET /books?page=2&limit=10, including total count." },
      { t: "Idempotency and versioning", d: "Calling GET, PUT or DELETE twice should have the same effect as once. Version your API (/v1/) so changes don’t break existing apps.", try: "Explain why POST /orders clicked twice can create two orders, and one way to prevent it." },
    ],
    project: "Design and document a full REST API for a to-do or library app in an OpenAPI file, then build it in the next lesson.",
  },

  'server-framework': {
    simple: "A backend framework (Express, FastAPI, Django) gives you ready-made tools for building APIs, so you don’t write a raw server by hand.",
    uses: ["Build real APIs quickly", "Validate requests and handle errors cleanly", "Organise backend code so teams can work on it"],
    example: {
      file: "main.py",
      code: `from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Book(BaseModel):
    title: str
    year: int

books: list[Book] = []

@app.post("/books", status_code=201)
def add_book(book: Book):
    books.append(book)
    return book`,
      output: `POST /books {"title": "Dune", "year": "soon"}
→ 422 Unprocessable: year must be an integer`,
      note: "FastAPI checks the request body against the Book model automatically and rejects bad data.",
    },
    steps: [
      { t: "Routes and middleware", d: "A route connects a URL and method to a function. Middleware runs before every request, for logging, auth or CORS.", try: "Build GET /health that returns {\"ok\": true}, plus middleware that logs every request." },
      { t: "Validate every request", d: "Zod (Node) or Pydantic (Python) describe what valid input looks like and reject anything else with a clear error.", try: "Reject a book with an empty title or a year in the future." },
      { t: "Errors and logging", d: "Catch errors in one place and return consistent JSON errors. Log what happened so you can debug later, but never log passwords.", try: "Make a missing book return 404 with {\"error\": \"Book not found\"}." },
      { t: "Project structure", d: "Split code into routes, services (business logic) and data access. Keep settings in environment variables.", try: "Move your routes into their own file and read the port from an env variable." },
    ],
    project: "Build the library API you designed: CRUD for books with validation, error handling and logging.",
  },

  sql: {
    simple: "SQL is the language for asking questions of a database: “give me all orders from this week”. Relational databases like PostgreSQL store data in tables.",
    uses: ["Store and query your app’s data safely", "Answer business questions with data", "It’s required in almost every backend and data job"],
    example: {
      file: "query.sql",
      code: `SELECT customers.name, COUNT(orders.id) AS order_count
FROM customers
JOIN orders ON orders.customer_id = customers.id
WHERE orders.created_at > '2026-01-01'
GROUP BY customers.name
ORDER BY order_count DESC
LIMIT 3;`,
      output: ` name  | order_count
-------+------------
 Ana   |          12
 Ben   |           9
 Cara  |           7`,
      note: "Join two tables, filter to this year, count orders per customer, and show the top 3.",
    },
    steps: [
      { t: "Querying data", d: "SELECT picks columns, WHERE filters rows, JOIN combines tables, GROUP BY summarises, ORDER BY sorts.", try: "Do the first 10 lessons of SQLBolt." },
      { t: "Designing tables", d: "Each table has a primary key (unique id). Foreign keys link tables. Normalisation means storing each fact once, so data doesn’t get out of sync.", try: "Design tables for a blog: users, posts and comments, with their keys." },
      { t: "Indexes and speed", d: "An index is like a book’s index: it makes lookups fast. EXPLAIN shows how the database runs your query.", try: "Run EXPLAIN on a query before and after adding an index on the WHERE column." },
      { t: "Transactions", d: "A transaction groups changes so they all succeed or all fail. Moving money from one account to another must never half-happen.", try: "Write a BEGIN … COMMIT transfer between two accounts, then try ROLLBACK." },
    ],
    project: "Design a database for your library app in PostgreSQL and write 10 queries that answer real questions (most borrowed book, overdue loans…).",
  },

  orm: {
    simple: "An ORM lets you work with your database using your programming language’s objects instead of writing raw SQL for everything.",
    uses: ["Write database code faster and with type safety", "Track database changes with migrations", "Avoid common performance traps"],
    example: {
      file: "schema.prisma",
      code: `model User {
  id    Int    @id @default(autoincrement())
  email String @unique
  posts Post[]
}

model Post {
  id       Int    @id @default(autoincrement())
  title    String
  author   User   @relation(fields: [authorId], references: [id])
  authorId Int
}`,
      note: "Describe your tables once. Prisma creates the database tables and a typed client for querying them.",
    },
    steps: [
      { t: "Models and schemas", d: "You describe tables as models in code. The ORM generates the SQL and gives you functions like user.findMany().", try: "Define User and Post models in Prisma or SQLAlchemy." },
      { t: "Migrations and seeding", d: "A migration is a versioned change to your database (add a column). Seeding fills it with sample data for development.", try: "Add a createdAt column with a migration, then write a seed script with 10 posts." },
      { t: "Relations and the N+1 problem", d: "Loading 50 posts and then each author separately makes 51 queries. Ask the ORM to include related data in one query instead.", try: "Turn on query logging, trigger an N+1, then fix it with include / joinedload." },
    ],
    project: "Replace the in-memory data in your library API with a real database using an ORM, migrations and seed data.",
  },

  'nosql-caching': {
    simple: "NoSQL databases store data in flexible shapes like documents or key-value pairs, and caching keeps frequently used data in fast memory.",
    uses: ["Store flexible data like user settings or logs", "Make slow pages fast with a Redis cache", "Count things in real time (likes, rate limits)"],
    example: {
      file: "cache.js",
      code: `async function getProduct(id) {
  const cached = await redis.get("product:" + id);
  if (cached) return JSON.parse(cached);         // fast path

  const product = await db.product.findUnique({ where: { id } });
  await redis.set("product:" + id, JSON.stringify(product), { EX: 60 });
  return product;
}`,
      note: "Check Redis first. If it’s missing, read the database and save a copy that expires after 60 seconds.",
    },
    steps: [
      { t: "Document databases", d: "MongoDB stores JSON-like documents. Great when data shapes vary, but you lose some of SQL’s guarantees and joins.", try: "Store and query a few user profiles with different fields in MongoDB Atlas’s free tier." },
      { t: "Redis and its data types", d: "Redis keeps data in memory, so it’s very fast. Besides strings it has lists, sets, sorted sets (leaderboards) and counters.", try: "Build a page-view counter with INCR." },
      { t: "Caching strategies", d: "Cache-aside: check cache, fall back to the database, store the result. TTL makes entries expire. Invalidation means deleting stale data when it changes.", try: "Cache a slow API endpoint and measure the speed before and after." },
    ],
    project: "Add Redis caching and a rate limiter (max 100 requests per minute per IP) to your library API.",
  },

  auth: {
    simple: "Authentication checks who you are (logging in). Authorization checks what you’re allowed to do (admin vs regular user).",
    uses: ["Add sign-up and login to any app", "Protect private data and admin pages", "Offer “Sign in with Google”"],
    example: {
      file: "auth.js",
      code: `import bcrypt from "bcrypt";

// sign up: never store the real password
const hash = await bcrypt.hash(password, 12);
await db.user.create({ data: { email, passwordHash: hash } });

// log in: compare against the stored hash
const ok = await bcrypt.compare(attempt, user.passwordHash);
if (!ok) throw new Error("Wrong email or password");`,
      note: "Passwords are stored as one-way hashes. Even if the database leaks, the real passwords aren’t exposed.",
    },
    steps: [
      { t: "Hash passwords", d: "Never store plain passwords. Hash them with bcrypt or argon2, which are slow on purpose so they’re hard to crack.", try: "Hash the same password twice and notice the hashes differ (salting)." },
      { t: "Sessions vs JWTs", d: "A session stores who’s logged in on the server and gives the browser a cookie. A JWT is a signed token the client sends with each request. Sessions are simpler and easier to revoke.", try: "Build login with a session cookie (httpOnly, secure)." },
      { t: "OAuth and “Sign in with Google”", d: "OAuth lets users log in with another account without giving you their password. OpenID Connect adds who they are.", try: "Add GitHub or Google login using a library like Auth.js." },
      { t: "Roles and permissions", d: "Give users roles (user, admin) and check them on the server before every protected action. Never trust the frontend to hide things.", try: "Make DELETE /books admin-only and test it with a normal account." },
    ],
    project: "Add sign-up, login, logout and an admin role to your library API.",
  },

  security: {
    simple: "Web security is about stopping attackers from stealing data or breaking your app, by avoiding a short list of common mistakes.",
    uses: ["Keep user data safe", "Avoid the bugs that make the news", "Pass security reviews at work"],
    example: {
      file: "db.js",
      code: `// BAD: SQL injection: attacker types  ' OR '1'='1
db.query("SELECT * FROM users WHERE email = '" + email + "'");

// GOOD: parameterised: input is always treated as data
db.query("SELECT * FROM users WHERE email = $1", [email]);`,
      note: "Gluing user input into SQL lets attackers rewrite your query. Parameters keep input as plain data.",
    },
    steps: [
      { t: "The OWASP Top 10", d: "OWASP lists the most common web vulnerabilities. Knowing them covers most real-world attacks.", try: "Read the OWASP Top 10 summary and write one sentence about each item." },
      { t: "SQL injection", d: "Never build SQL by joining strings with user input. Use parameterised queries or an ORM.", try: "Find a string-built query in old code (or write one) and fix it." },
      { t: "XSS, CSRF and CORS", d: "XSS: attacker’s script runs on your page (escape output, never use innerHTML with user input). CSRF: tricking a logged-in user’s browser (use SameSite cookies). CORS controls which sites may call your API.", try: "Try PortSwigger’s free XSS lab." },
      { t: "Secrets and HTTPS", d: "API keys go in environment variables or a secrets manager, never in Git. Always use HTTPS.", try: "Search your GitHub repos for leaked keys and rotate any you find." },
    ],
    project: "Do a security review of your library API using the OWASP checklist and fix at least 3 issues.",
  },

  'backend-testing': {
    simple: "Backend tests automatically check that your API returns the right data and handles bad input, every time you change the code.",
    uses: ["Ship changes without breaking things", "Catch bugs in edge cases", "Make your API trustworthy for other developers"],
    example: {
      file: "test_books.py",
      code: `from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_add_book():
    res = client.post("/books", json={"title": "Dune", "year": 1965})
    assert res.status_code == 201
    assert res.json()["title"] == "Dune"

def test_rejects_bad_year():
    res = client.post("/books", json={"title": "X", "year": "soon"})
    assert res.status_code == 422`,
      output: `2 passed in 0.31s`,
      note: "The tests call your API like a real client and check the status codes and data.",
    },
    steps: [
      { t: "Kinds of tests", d: "Unit tests check one function. Integration tests check pieces working together (API + database). End-to-end tests check the whole system.", try: "Write 3 unit tests for a function that calculates late fees." },
      { t: "Testing endpoints", d: "Supertest (Node) or TestClient (Python) send fake requests to your app without starting a real server.", try: "Test that GET /books/999 returns 404." },
      { t: "Test databases and fixtures", d: "Use a separate test database, reset it before each test, and use fixtures to create known sample data.", try: "Write a fixture that creates 3 books before a test." },
    ],
    project: "Reach 80% test coverage on your library API, including error cases.",
  },

  'realtime-queues': {
    simple: "Real-time features push updates to users instantly (chat, notifications), and background jobs do slow work later so users don’t wait.",
    uses: ["Build chat and live notifications", "Send emails and process uploads in the background", "Connect services reliably with message queues"],
    example: {
      file: "server.js",
      code: `import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (socket) => {
  socket.on("message", (msg) => {
    // send the message to everyone connected
    wss.clients.forEach((client) => client.send(msg.toString()));
  });
});`,
      note: "A minimal chat server: every message one user sends is broadcast to all connected users instantly.",
    },
    steps: [
      { t: "WebSockets and SSE", d: "Normal HTTP is ask-then-answer. WebSockets keep a two-way connection open. Server-Sent Events are a simpler one-way stream from server to browser.", try: "Build a chat page where two browser tabs see each other’s messages." },
      { t: "Job queues and workers", d: "Put slow tasks (emails, image resizing) in a queue. A separate worker process picks them up. BullMQ (Node) and Celery (Python) are popular.", try: "Queue a fake “send welcome email” job that takes 5 seconds, so sign-up responds instantly." },
      { t: "Message brokers", d: "RabbitMQ and Kafka pass messages between services reliably, so one service can go down without losing data.", try: "Draw how an order service and an email service could talk through a queue." },
    ],
    project: "Add live notifications (WebSocket) and a background job queue for emails to one of your apps.",
  },

  'system-design': {
    simple: "System design is planning how a big app is built from parts (servers, databases, caches) so it stays fast and reliable with millions of users.",
    uses: ["Pass senior and mid-level interviews", "Make good architecture decisions", "Understand how big apps like YouTube work"],
    example: {
      file: "Design sketch",
      code: `Users
  │
  ▼
CDN (images, JS)        ← static files served close to users
  │
Load balancer           ← spreads traffic
  │
App servers ×3          ← stateless, add more when busy
  │        │
Redis    PostgreSQL     ← cache + primary database
         └─ read replicas`,
      note: "A typical web app at scale: each layer has one job, and every layer can grow on its own.",
    },
    steps: [
      { t: "Scaling up vs out", d: "Vertical scaling buys a bigger machine. Horizontal scaling adds more machines, which needs stateless servers.", try: "Explain why storing sessions in server memory breaks when you add a second server." },
      { t: "Load balancers, CDNs and caches", d: "Load balancers spread traffic. CDNs serve files from servers near users. Caches avoid repeating slow work.", try: "Draw where a CDN and a cache would sit in a photo-sharing app." },
      { t: "Replication and sharding", d: "Replicas copy the database for more reads and backups. Sharding splits data across databases when one can’t hold it all.", try: "Explain how you might shard a users table." },
      { t: "CAP and consistency", d: "When the network fails, a distributed system must choose between being consistent and being available. Know which your app needs.", try: "Decide whether a bank balance and a like counter need strong or eventual consistency." },
    ],
    project: "Design a URL shortener on paper: API, database schema, caching and how it handles 10,000 requests per second. Explain it in 10 minutes.",
  },

  'fullstack-arch': {
    simple: "Full-stack architecture is how you organise the frontend, backend and database of an app so they fit together cleanly.",
    uses: ["Pick the right structure for a new project", "Share types between frontend and backend", "Ship faster with backend-as-a-service tools"],
    example: {
      file: "shared/schema.ts",
      code: `import { z } from "zod";

// one schema used by both the form and the API
export const SignupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type Signup = z.infer<typeof SignupSchema>;`,
      note: "Define the rules once. The frontend uses it to validate the form and the backend uses it to validate the request.",
    },
    steps: [
      { t: "Monolith vs separate apps vs services", d: "Start with one app (a monolith). Split into a separate frontend and API, or microservices, only when you have a real reason.", try: "List the pros and cons of a monolith for a 2-person startup." },
      { t: "Type-safe APIs", d: "tRPC or shared Zod schemas give you types from the database all the way to the UI, so a backend change shows errors in the frontend immediately.", try: "Share one Zod schema between a form and an API route." },
      { t: "Monorepos", d: "A monorepo holds frontend, backend and shared code in one repo. Turborepo and pnpm workspaces manage it.", try: "Set up a pnpm workspace with apps/web, apps/api and packages/shared." },
      { t: "Backend-as-a-service", d: "Supabase and Firebase give you a database, auth and storage without writing a backend. Great for prototypes.", try: "Build a guestbook with Supabase auth and database in an afternoon." },
    ],
    project: "Build a full-stack app (frontend + API + database + auth) in a monorepo with shared types, and deploy it.",
  },
};
