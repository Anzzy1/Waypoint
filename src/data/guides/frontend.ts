import type { LessonGuide } from './types';

/** Foundations + frontend lessons. */
export const FRONTEND_GUIDES: Record<string, LessonGuide> = {
  'how-internet-works': {
    simple: "When you open a website, your computer asks another computer (a server) for files, and the server sends them back over the internet.",
    uses: ["Understand why a site is slow or down", "Make sense of words like DNS, HTTP and HTTPS", "Debug network errors in your own apps"],
    example: {
      file: "Terminal",
      code: `curl -I https://example.com`,
      output: `HTTP/2 200
content-type: text/html; charset=UTF-8
cache-control: max-age=604800
server: ECS (sac/2575)`,
      note: "You asked example.com for a page. The server answered with status 200 (OK) and some headers describing the file.",
    },
    steps: [
      { t: "Clients and servers", d: "Your browser is the client. It asks. The server is a computer somewhere that answers. Every device online has an IP address, like a phone number, and a port tells it which program to talk to.", try: "Search “what is my IP” and look at your own public IP address." },
      { t: "DNS: the internet’s phonebook", d: "People remember names like google.com, computers need numbers. DNS turns the name into an IP address before anything else happens.", try: "Run nslookup google.com in your terminal and look at the IP it returns." },
      { t: "HTTP requests and responses", d: "The browser sends a request (GET this page). The server sends a response with a status code: 200 means OK, 404 means not found, 500 means the server broke.", try: "Open DevTools → Network tab, reload any site, and click a request to see its status and headers." },
      { t: "HTTPS keeps it private", d: "HTTPS is HTTP inside an encrypted tunnel (TLS). The padlock in the address bar means nobody in between can read or change the data.", try: "Click the padlock on any site and view its certificate." },
      { t: "How the browser shows the page", d: "The browser downloads HTML, then the CSS and JavaScript it links to, builds the page and paints it on screen.", try: "In the Network tab, sort by type and count how many CSS, JS and image files one page loads." },
    ],
    project: "Write a one-page explanation (with your own drawing) of what happens between typing a URL and seeing the page. Explain it out loud to a friend.",
  },

  terminal: {
    simple: "The terminal lets you control your computer by typing commands instead of clicking.",
    uses: ["Run and install developer tools", "Move, create and search files fast", "Work on remote servers that have no screen"],
    example: {
      file: "Terminal",
      code: `mkdir my-project
cd my-project
echo "hello" > notes.txt
ls
cat notes.txt`,
      output: `notes.txt
hello`,
      note: "Make a folder, go inside it, write a file, list the files, then print the file.",
    },
    steps: [
      { t: "Moving around", d: "pwd shows where you are, ls lists files, cd goes into a folder (cd .. goes back up). mkdir makes a folder; mv, cp and rm move, copy and delete.", try: "Make a folder called practice, create three empty files inside it with touch, then delete one." },
      { t: "Pipes and searching", d: "The | symbol sends one command’s output into another. grep finds lines that match a word. > saves output to a file.", try: "Run ls | grep txt to list only the .txt files in a folder." },
      { t: "Environment variables and PATH", d: "Variables store settings like API keys. PATH is the list of folders the terminal searches for commands, which is why installed tools “just work”.", try: "Run echo $PATH (Mac/Linux) or echo %PATH% (Windows) and read the folders." },
      { t: "Running scripts and getting help", d: "You don’t need to memorise flags. Add --help to almost any command, or use man on Mac/Linux, to see what it can do.", try: "Run ls --help and find the flag that shows hidden files." },
    ],
    project: "Play the first 5 levels of OverTheWire: Bandit using only the terminal.",
  },

  git: {
    simple: "Git saves snapshots of your code so you can go back in time, and GitHub stores those snapshots online so you can share and work with others.",
    uses: ["Never lose work again", "Try ideas safely on a branch", "Collaborate on real projects and show your portfolio"],
    example: {
      file: "Terminal",
      code: `git init
git add index.html
git commit -m "Add homepage"
git log --oneline`,
      output: `a1b2c3d Add homepage`,
      note: "Start tracking a folder, stage a file, save a snapshot (a commit), then view the history.",
    },
    steps: [
      { t: "Save snapshots", d: "git init starts tracking a folder. git add picks which changes to include, git commit saves them with a message. git status and git diff show what changed.", try: "Make a folder, add a file, commit it, edit it, and run git diff to see the change." },
      { t: "Branches and merging", d: "A branch is a separate line of work. Build a feature on a branch, then merge it back. If two branches changed the same line you get a conflict, which you fix by hand.", try: "Create a branch, change a line, switch back to main, change the same line, then merge and fix the conflict." },
      { t: "Push your code to GitHub", d: "A remote is a copy of your repo online. push uploads your commits, pull downloads others’, clone copies a whole repo to your computer.", try: "Create a GitHub repo and push your practice project to it." },
      { t: "Pull requests", d: "On a team you don’t push to main directly. You open a pull request so others can review your changes before they’re merged.", try: "Open a pull request on your own repo from a branch, review it yourself, then merge it." },
    ],
    project: "Put one of your projects in its own GitHub repo with at least 5 meaningful commits and a README. Then do the same for every project you build from now on.",
  },

  dsa: {
    simple: "Data structures are ways to organise data, and algorithms are step-by-step recipes for working with it efficiently.",
    uses: ["Write code that stays fast with lots of data", "Pass technical interviews", "Pick the right tool (list, map, set) for a problem"],
    example: {
      file: "two_sum.py",
      code: `def two_sum(nums, target):
    seen = {}                      # value -> index
    for i, n in enumerate(nums):
        if target - n in seen:
            return [seen[target - n], i]
        seen[n] = i

print(two_sum([2, 7, 11, 15], 9))`,
      output: `[0, 1]`,
      note: "Using a hash map (dict) finds the pair in one pass, O(n), instead of checking every pair, O(n²).",
    },
    steps: [
      { t: "Big-O: how code scales", d: "Big-O describes how much slower code gets as input grows. O(1) stays the same, O(n) grows in step with the data, O(n²) gets very slow fast.", try: "Write a loop inside a loop over a list and say out loud why it is O(n²)." },
      { t: "Arrays, strings and hash maps", d: "Arrays keep order. Hash maps (dict/object/Map) find things by key instantly. Sets remember what you’ve already seen.", try: "Solve “Contains Duplicate” on LeetCode with a set." },
      { t: "Stacks, queues and linked lists", d: "A stack is last-in-first-out (like undo). A queue is first-in-first-out (like a line at a shop). Linked lists chain items together with pointers.", try: "Solve “Valid Parentheses” using a stack." },
      { t: "Trees, graphs, BFS and DFS", d: "Trees and graphs model connections (folders, maps, friends). BFS explores level by level, DFS goes deep first.", try: "Draw a small tree on paper and write the order BFS and DFS would visit it." },
    ],
    project: "Solve 15 easy problems on NeetCode’s roadmap, 3 per pattern, and write one sentence about each solution.",
  },

  html: {
    simple: "HTML is the skeleton of every web page. It tells the browser what each piece of content is: a heading, a paragraph, an image, a link.",
    uses: ["Build the structure of any website", "Make pages search engines and screen readers understand", "Create forms that collect user input"],
    example: {
      file: "index.html",
      code: `<!doctype html>
<html lang="en">
  <head>
    <title>My first page</title>
  </head>
  <body>
    <h1>Hello, I'm Sam</h1>
    <p>I'm learning web development.</p>
    <a href="https://github.com">My GitHub</a>
  </body>
</html>`,
      output: `Hello, I'm Sam            (big heading)
I'm learning web development.
My GitHub                 (blue link)`,
      note: "Save this as index.html and double-click it. Your browser shows the page.",
    },
    steps: [
      { t: "The page skeleton", d: "Every page has the same frame: doctype, html, head (info about the page, like the title) and body (what you see).", try: "Create index.html with the example above and open it in your browser." },
      { t: "Meaningful tags", d: "Use tags that describe content: header, nav, main, section, article, footer. They help screen readers and Google understand your page.", try: "Wrap your page in header, main and footer tags." },
      { t: "Links, images, lists and tables", d: "a makes links, img shows images (always add alt text), ul/ol make lists, and table shows rows and columns of data.", try: "Add a list of your 3 favourite foods and one image with alt text." },
      { t: "Forms", d: "Forms collect input. Each input needs a label. Attributes like required and type=\"email\" give free validation.", try: "Build a contact form with name, email and message that won’t submit if empty." },
    ],
    project: "Build a one-page “About me” site with a header, a photo, a list of skills and a contact form. HTML only.",
  },

  css: {
    simple: "CSS is the styling of a web page: colors, fonts, spacing and layout.",
    uses: ["Make plain HTML look professional", "Control spacing and layout precisely", "Build a consistent look across a whole site"],
    example: {
      file: "styles.css",
      code: `.card {
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 12px;
  font-family: system-ui, sans-serif;
}

.card h2 {
  color: #1f6b45;
  margin: 0 0 8px;
}`,
      note: "Every element with class=\"card\" gets padding, a border and rounded corners. Its h2 turns green.",
    },
    steps: [
      { t: "Selectors and the cascade", d: "A selector picks which elements to style (p, .card, #main). When two rules clash, the more specific one wins, and later rules beat earlier ones.", try: "Style all paragraphs grey, then make one with a class red. Explain why the class wins." },
      { t: "The box model", d: "Every element is a box: content, then padding (inside space), border, then margin (outside space). Most layout bugs are box-model bugs.", try: "Give a div padding, border and margin, then inspect it in DevTools to see each layer." },
      { t: "Colors, fonts and units", d: "Use rem for font sizes (scales with user settings), % and vw/vh for sizes relative to the parent or screen.", try: "Set your body font to 1rem and headings to 2rem, then change the browser zoom." },
      { t: "CSS variables", d: "Custom properties like --brand: #1f6b45 let you reuse values. Change one variable and the whole site updates.", try: "Put your 3 brand colors in variables and use them everywhere." },
    ],
    project: "Style your “About me” page with a color palette, a nice font and consistent spacing using CSS variables.",
  },

  responsive: {
    simple: "Flexbox and Grid are CSS tools for arranging things in rows, columns and grids, and responsive design makes your page look good on every screen size.",
    uses: ["Build navbars, card grids and page layouts", "Make sites that work on phones and desktops", "Stop fighting with floats and margins"],
    example: {
      file: "layout.css",
      code: `.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}

@media (max-width: 600px) {
  .nav { flex-direction: column; }
}`,
      note: "Cards fill as many columns as fit (each at least 220px wide). On small screens the nav stacks vertically.",
    },
    steps: [
      { t: "Flexbox for rows and columns", d: "display: flex lines children up in a row. justify-content spaces them along the row, align-items lines them up across it, gap adds space between.", try: "Build a navbar: logo on the left, links on the right, using flexbox." },
      { t: "Grid for 2D layouts", d: "Grid controls rows and columns at once. repeat(auto-fit, minmax(...)) makes a card grid that adapts without media queries.", try: "Make a grid of 6 cards that becomes 1 column on a phone." },
      { t: "Media queries, mobile first", d: "Write styles for small screens first, then add @media rules for bigger screens. Phones are most of your visitors.", try: "Open DevTools device mode and test your page at 375px wide." },
      { t: "Fluid sizes with clamp()", d: "clamp(min, preferred, max) makes text and spacing grow smoothly with the screen instead of jumping.", try: "Set your h1 to font-size: clamp(28px, 5vw, 56px) and resize the window." },
    ],
    project: "Rebuild the layout of a real landing page you like (navbar, hero, 3-column features, footer) and make it work on a phone.",
  },

  javascript: {
    simple: "JavaScript is the programming language that makes web pages interactive: buttons, menus, games and live data.",
    uses: ["Make pages react to clicks and typing", "Build full apps in the browser", "Use it on servers too, with Node.js"],
    example: {
      file: "app.js",
      code: `const prices = [12, 5, 30, 8];

const expensive = prices.filter((p) => p > 10);
const total = prices.reduce((sum, p) => sum + p, 0);

console.log("Expensive:", expensive);
console.log("Total:", total);`,
      output: `Expensive: [ 12, 30 ]
Total: 55`,
      note: "filter keeps items that pass a test; reduce combines a list into one value.",
    },
    steps: [
      { t: "Variables, types and decisions", d: "Store values with const (won’t change) and let (will change). Values have types: numbers, strings, booleans. Use if/else and loops to make decisions and repeat.", try: "Write a program that prints FizzBuzz from 1 to 30." },
      { t: "Functions and scope", d: "Functions are reusable blocks of code. Scope decides where a variable can be seen. A closure is a function that remembers variables from where it was made.", try: "Write a makeCounter() function that returns a function counting up each time it’s called." },
      { t: "Arrays and objects", d: "Arrays are ordered lists, objects are labelled data. map transforms every item, filter keeps some, reduce combines them.", try: "Given a list of products with prices, get the names of products under $20 using filter and map." },
      { t: "Modern syntax", d: "Destructuring pulls values out ({ name } = user), spread copies (...arr), and modules let you split code into files with import/export.", try: "Split your code into two files and import a function from one into the other." },
    ],
    project: "Build a tip calculator and a to-do list in plain JavaScript (no libraries).",
  },

  dom: {
    simple: "The DOM is the browser’s live model of your page. JavaScript changes the DOM to update what the user sees.",
    uses: ["Show and hide things when users click", "Validate forms before they’re sent", "Remember user settings between visits"],
    example: {
      file: "app.js",
      code: `const button = document.querySelector("#like");
const count = document.querySelector("#count");
let likes = 0;

button.addEventListener("click", () => {
  likes++;
  count.textContent = likes;
});`,
      note: "Find the button and the counter on the page, then add 1 and update the text on every click.",
    },
    steps: [
      { t: "Find and create elements", d: "document.querySelector finds an element using a CSS selector. createElement and append add new ones to the page.", try: "Add a new list item to a ul with JavaScript." },
      { t: "Events", d: "addEventListener runs code when something happens (click, input, submit). Events bubble up to parents, so one listener on a list can handle all its items.", try: "Make clicking any list item strike it through, using one listener on the ul." },
      { t: "Forms and input", d: "Listen for submit, call event.preventDefault() to stop the page reload, then read the input values.", try: "Build a form that shows a friendly error if the email field has no @." },
      { t: "Saving data in the browser", d: "localStorage keeps small bits of data even after the browser closes. Store objects with JSON.stringify and read them with JSON.parse.", try: "Make your to-do list remember its items after a refresh." },
    ],
    project: "Build a to-do app with add, delete, mark done, filter (all/active/done) and saving to localStorage.",
  },

  'async-js': {
    simple: "Asynchronous JavaScript lets your code wait for slow things, like loading data from a server, without freezing the page.",
    uses: ["Load data from APIs (weather, movies, your backend)", "Show loading spinners and error messages", "Do several things at once"],
    example: {
      file: "app.js",
      code: `async function getUser() {
  try {
    const res = await fetch("https://api.github.com/users/octocat");
    if (!res.ok) throw new Error("Request failed");
    const user = await res.json();
    console.log(user.name, "has", user.public_repos, "repos");
  } catch (err) {
    console.log("Something went wrong:", err.message);
  }
}
getUser();`,
      output: `The Octocat has 8 repos`,
      note: "fetch asks GitHub for data. await waits for it without blocking the page. try/catch handles failures.",
    },
    steps: [
      { t: "The event loop", d: "JavaScript does one thing at a time. Slow work (timers, network) is handed off, and its callback runs later when the main code is free.", try: "Predict the order of console.log calls around a setTimeout(…, 0), then run it." },
      { t: "Promises and async/await", d: "A promise is a value that arrives later. async/await lets you write that waiting code top-to-bottom. Always wrap it in try/catch.", try: "Rewrite a .then() chain using async/await." },
      { t: "fetch and JSON", d: "fetch(url) gets data from an API. res.json() turns the response into a JavaScript object. Use method: \"POST\" to send data.", try: "Fetch a random joke from an open API and show it on a page." },
      { t: "Loading, empty and error states", d: "Real apps always show what’s happening: a spinner while loading, a message when there’s no data, and a friendly error when it fails.", try: "Add all three states to your joke app (turn off Wi-Fi to test the error)." },
    ],
    project: "Build a weather app: search a city, call a free weather API, show results with loading and error states.",
  },

  tooling: {
    simple: "npm installs code other people wrote, and tools like Vite turn your project into a fast website.",
    uses: ["Use thousands of free libraries", "Start new projects in seconds", "Build optimised files for production"],
    example: {
      file: "Terminal",
      code: `npm create vite@latest my-app
cd my-app
npm install
npm run dev`,
      output: `  VITE ready in 312 ms
  ➜  Local:   http://localhost:5173/`,
      note: "Create a new project, install its packages, then start a dev server that reloads as you save.",
    },
    steps: [
      { t: "package.json", d: "This file lists your project’s dependencies (code it needs to run) and devDependencies (tools only needed while building).", try: "Open package.json in a Vite project and find both lists." },
      { t: "Scripts and versions", d: "npm run dev / build run the scripts in package.json. Versions like ^1.2.3 follow semver: major.minor.patch.", try: "Add your own script to package.json and run it." },
      { t: "Vite", d: "Vite gives you a dev server with instant reload and builds small, fast files for production. Secrets go in .env files, never in code.", try: "Run npm run build and look at the files in the dist folder." },
    ],
    project: "Move one of your plain HTML/JS projects into a Vite project and deploy the built version.",
  },

  typescript: {
    simple: "TypeScript is JavaScript with labels for your data, so your editor catches mistakes before you run the code.",
    uses: ["Catch bugs while typing, not in production", "Get better autocomplete in your editor", "Work on large codebases with confidence"],
    example: {
      file: "user.ts",
      code: `type User = {
  name: string;
  age: number;
};

function greet(user: User) {
  return "Hi " + user.name;
}

greet({ name: "Ana", age: 21 });   // ok
greet({ name: "Ana" });            // error`,
      output: `error TS2345: Property 'age' is missing in type '{ name: string; }'`,
      note: "TypeScript knows a User needs an age, so it flags the second call before the code even runs.",
    },
    steps: [
      { t: "Basic types", d: "Label values as string, number, boolean or arrays. Use type or interface to describe the shape of an object.", try: "Create a Product type and a function that takes one and returns its price with tax." },
      { t: "Unions and narrowing", d: "A union means “one of these”: string | null. Checking it with if (x !== null) narrows the type so TypeScript knows which one you have.", try: "Write a function that accepts string | number and handles each case." },
      { t: "Generics", d: "Generics are placeholders for types, so one function works for many types safely, like Array<T>.", try: "Write a first<T>(items: T[]) function that returns the first item with the right type." },
      { t: "Typing real data", d: "Type function parameters, return values and API responses so data from the server is checked too.", try: "Add types to your weather app’s API response." },
    ],
    project: "Convert one of your JavaScript projects to TypeScript with zero errors and no use of any.",
  },

  react: {
    simple: "React is a library for building user interfaces out of small, reusable pieces called components.",
    uses: ["Build interactive apps like dashboards and social feeds", "Reuse UI pieces across a whole app", "It’s the most requested frontend skill in job posts"],
    example: {
      file: "Counter.jsx",
      code: `import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}`,
      note: "useState stores the count. Clicking updates it, and React redraws the button with the new number.",
    },
    steps: [
      { t: "Components, JSX and props", d: "A component is a function that returns UI written in JSX (HTML-like syntax). Props pass data into a component, like arguments.", try: "Make a ProfileCard component and render it 3 times with different names." },
      { t: "State", d: "useState stores data that changes. When state changes, React re-renders. If two components need the same data, move it up to their parent.", try: "Build a counter with + and − buttons and a reset." },
      { t: "Effects", d: "useEffect runs code after render, mostly to sync with outside systems like fetching data. Many things don’t need an effect; calculate them during render instead.", try: "Fetch a list of users when a component loads and show them." },
      { t: "Lists, keys and forms", d: "Render lists with map and give each item a unique key. Controlled inputs keep their value in state.", try: "Build a search box that filters a list as you type." },
    ],
    project: "Rebuild your to-do app in React with components, state and localStorage.",
  },

  'state-routing': {
    simple: "Routing gives your React app multiple pages, and state tools share data between components and cache data from the server.",
    uses: ["Build multi-page apps without page reloads", "Share the logged-in user across the app", "Load and cache server data with less code"],
    example: {
      file: "App.jsx",
      code: `import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Link to="/">Home</Link> <Link to="/about">About</Link>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}`,
      note: "Clicking a Link changes the URL and shows a different component, with no full page reload.",
    },
    steps: [
      { t: "Client-side routing", d: "React Router maps URLs to components. Links switch pages instantly, and URL params (/user/:id) pass data through the address.", try: "Add Home, About and a /product/:id page to an app." },
      { t: "Sharing state", d: "Context passes data down without threading props through every level. For bigger apps, a small store like Zustand is simpler.", try: "Store a light/dark theme in context and toggle it from any page." },
      { t: "Server state with TanStack Query", d: "Data from an API is different from UI state. TanStack Query fetches, caches, retries and refreshes it for you.", try: "Replace a useEffect fetch with useQuery and notice the built-in loading and error states." },
    ],
    project: "Build a small store: product list, product detail pages, and a cart shared across pages.",
  },

  tailwind: {
    simple: "Tailwind lets you style elements with small ready-made classes right in your HTML, instead of writing separate CSS files.",
    uses: ["Style UIs very fast", "Keep spacing and colors consistent", "Use pre-built accessible components (shadcn/ui)"],
    example: {
      file: "Card.jsx",
      code: `<div className="rounded-xl border p-4 shadow-sm">
  <h2 className="text-lg font-bold text-green-700">Pro plan</h2>
  <p className="mt-1 text-gray-600">$12 / month</p>
  <button className="mt-4 rounded-lg bg-black px-4 py-2 text-white">
    Choose
  </button>
</div>`,
      note: "Each class does one thing: p-4 adds padding, rounded-xl rounds corners, text-lg sets font size.",
    },
    steps: [
      { t: "Utility classes", d: "Instead of writing CSS, combine small classes: flex, p-4, text-center. Prefixes like md: and hover: handle screen sizes and states.", try: "Rebuild a card you made in CSS using only Tailwind classes." },
      { t: "Design tokens", d: "Tokens are your fixed set of colors, spacing and font sizes. Using only those values keeps the whole app consistent.", try: "Add your brand color to the Tailwind theme and use it." },
      { t: "Component libraries", d: "shadcn/ui and Radix give you buttons, dialogs and menus that are accessible out of the box. Copy them in and customise.", try: "Add a shadcn/ui Dialog to a page." },
    ],
    project: "Build a pricing page with 3 plans, fully responsive, using Tailwind and one shadcn/ui component.",
  },

  accessibility: {
    simple: "Accessibility (a11y) means making your site usable for everyone, including people who use screen readers, keyboards or have low vision.",
    uses: ["Reach more users (about 1 in 6 people has a disability)", "Meet legal requirements many companies must follow", "Get better SEO and cleaner code"],
    example: {
      file: "good-vs-bad.html",
      code: `<!-- bad: not focusable, no meaning -->
<div onclick="save()">Save</div>

<!-- good: works with keyboard and screen readers -->
<button type="button" onclick="save()">Save</button>

<img src="dog.jpg" alt="A golden retriever catching a ball">`,
      note: "A real button can be reached with Tab and pressed with Enter. Alt text describes the image for screen readers.",
    },
    steps: [
      { t: "Semantic HTML first", d: "Using the right element (button, nav, main, label) gives you accessibility for free. Most a11y bugs come from div soup.", try: "Find every clickable div in a project and replace it with a button or link." },
      { t: "Keyboard navigation", d: "Everything must work with Tab, Enter and Escape. Focus must be visible, and it should move sensibly when dialogs open and close.", try: "Unplug your mouse and try to use your own site." },
      { t: "ARIA, carefully", d: "ARIA attributes add meaning when HTML can’t. The first rule of ARIA: don’t use it if a native element does the job.", try: "Add aria-label to an icon-only button." },
      { t: "Contrast, alt text and labels", d: "Text needs enough contrast against its background. Images need alt text. Every input needs a label.", try: "Run Lighthouse’s accessibility audit and fix every issue it finds." },
    ],
    project: "Get one of your projects to a 100 Lighthouse accessibility score and test it with a screen reader for 10 minutes.",
  },

  performance: {
    simple: "Web performance is about making pages load fast and respond instantly.",
    uses: ["Keep visitors from leaving (slow sites lose users)", "Rank higher on Google", "Make apps feel smooth on cheap phones"],
    example: {
      file: "App.jsx",
      code: `import { lazy, Suspense } from "react";

// only downloaded when the user opens the chart
const Chart = lazy(() => import("./Chart"));

export default function Dashboard() {
  return (
    <Suspense fallback={<p>Loading chart…</p>}>
      <Chart />
    </Suspense>
  );
}`,
      note: "Lazy loading splits big code into a separate file that loads only when needed, so the first page is faster.",
    },
    steps: [
      { t: "Core Web Vitals", d: "LCP: how fast the main content shows. INP: how fast the page reacts to taps. CLS: how much the layout jumps around.", try: "Check a site you use on PageSpeed Insights and read its three scores." },
      { t: "Measure before fixing", d: "Lighthouse gives a report card. The DevTools Performance panel shows exactly what the browser spent time on.", try: "Run Lighthouse on your project and write down the top 3 suggestions." },
      { t: "Load less, later", d: "Split code so each page only loads what it needs, lazy-load images below the fold, and compress images.", try: "Add loading=\"lazy\" to images and lazy-load one heavy component." },
    ],
    project: "Take one of your projects from its current Lighthouse performance score to 90+ and write down what each fix changed.",
  },

  'frontend-testing': {
    simple: "Tests are small programs that check your app still works, so you can change code without breaking things.",
    uses: ["Catch bugs before users do", "Refactor without fear", "Look professional to employers"],
    example: {
      file: "Counter.test.jsx",
      code: `import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Counter from "./Counter";

test("counts clicks", async () => {
  render(<Counter />);
  await userEvent.click(screen.getByRole("button"));
  expect(screen.getByRole("button")).toHaveTextContent("Clicked 1 times");
});`,
      output: `✓ counts clicks (24 ms)`,
      note: "The test clicks the button like a user would and checks the text changed.",
    },
    steps: [
      { t: "Unit tests", d: "Unit tests check one small function. Vitest and Jest run them and tell you what passed or failed.", try: "Write 3 tests for a formatPrice() function, including an edge case." },
      { t: "Component tests", d: "Testing Library renders a component and interacts with it the way a user would: by finding text and roles, not class names.", try: "Test that your to-do app adds an item when the form is submitted." },
      { t: "End-to-end tests", d: "Playwright opens a real browser and clicks through your whole app, like a robot user.", try: "Write one Playwright test that loads your homepage and clicks a link." },
    ],
    project: "Add tests to your to-do or store app: 5 unit tests, 3 component tests and 1 end-to-end test, all passing.",
  },

  nextjs: {
    simple: "Next.js is a framework built on React that adds pages, server code and fast loading out of the box.",
    uses: ["Build full websites and apps with one tool", "Get great SEO with server rendering", "Write backend code next to your frontend"],
    example: {
      file: "app/page.tsx",
      code: `// runs on the server: no useEffect, no loading spinner
export default async function Page() {
  const res = await fetch("https://api.github.com/repos/vercel/next.js");
  const repo = await res.json();

  return <h1>Next.js has {repo.stargazers_count} stars</h1>;
}`,
      note: "This component fetches data on the server and sends ready-made HTML to the browser.",
    },
    steps: [
      { t: "File-based routing", d: "Each folder in app/ becomes a URL. page.tsx is the page, layout.tsx wraps pages with shared UI like a navbar.", try: "Create /, /about and /blog/[slug] pages." },
      { t: "Server vs Client Components", d: "Components run on the server by default (fast, can read databases). Add \"use client\" only when you need state or click handlers.", try: "Make a server page that renders a small client-side like button." },
      { t: "Rendering and caching", d: "Pages can be built ahead of time (static), on each request (dynamic), or cached and refreshed. Pick based on how often data changes.", try: "Build a blog page that is generated statically from a list of posts." },
      { t: "Server Actions and route handlers", d: "Server Actions run server code straight from a form. Route handlers (route.ts) create API endpoints.", try: "Make a form that saves a message using a Server Action." },
    ],
    project: "Build a blog with a home page, post pages, and a contact form handled by a Server Action. Deploy it on Vercel.",
  },

  'deploy-web': {
    simple: "Deploying means putting your app on the internet so anyone can open it with a link.",
    uses: ["Share your projects with employers", "Get a real URL and custom domain", "Update your site automatically when you push code"],
    example: {
      file: "Terminal",
      code: `npm install -g vercel
vercel`,
      output: `Production: https://my-app.vercel.app`,
      note: "One command uploads your project and gives you a live link. Connecting GitHub redeploys on every push.",
    },
    steps: [
      { t: "Static hosting", d: "Vercel, Netlify and GitHub Pages host sites for free. Connect your GitHub repo and every push goes live automatically.", try: "Deploy one of your projects on Vercel or Netlify." },
      { t: "Environment variables", d: "API keys and secrets go in the host’s settings, never in your code or GitHub. Your code reads them at build or run time.", try: "Add an environment variable on your host and read it in your app." },
      { t: "Domains and HTTPS", d: "Buy a domain, point its DNS at your host, and HTTPS is set up for you.", try: "Connect a custom domain (or a free subdomain) to a deployed project." },
    ],
    project: "Deploy one of your projects and put the live link in its README. Then do the same for every portfolio project.",
  },
};
