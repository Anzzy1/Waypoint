import type { LessonGuide } from './types';

/** QA and test automation. Automation examples use Playwright + TypeScript. */
export const QA_GUIDES: Record<string, LessonGuide> = {
  'qa-fundamentals': {
    simple: 'A tester is the app’s first real user: you try it on purpose, in every way people might, to catch problems before customers do.',
    uses: ['Stop bugs from reaching customers', 'Speak the same language as developers and QA teams', 'Decide what to test first when time is short'],
    example: {
      file: 'test-types.md',
      code: `Feature: Login

Smoke test     → Can I open the login page and log in at all?
Functional     → Wrong password shows "Incorrect email or password"
Regression     → Old features still work after the new release
Usability      → Is the error message clear? Can I use only the keyboard?
Security       → Is the account locked after 5 wrong tries?
Performance    → Does login take under 2 seconds with 500 users?`,
      note: 'One feature, many kinds of tests. Each one asks a different question, and a QA engineer picks which ones matter most.',
    },
    steps: [
      { t: 'Errors, defects and failures', d: 'A person makes an error, which leaves a defect (bug) in the code, which causes a failure when someone uses the app. Testing finds failures and helps prevent defects. It can show bugs exist, but never prove there are none.', try: 'Think of an app bug you’ve met. Describe the failure you saw and guess the defect behind it.' },
      { t: 'Test levels', d: 'Unit tests check one small piece, integration tests check parts working together, system tests check the whole app, and acceptance tests check it meets the user’s needs. QA usually owns system and acceptance testing.', try: 'For an online shop, write one example test at each of the four levels.' },
      { t: 'Test types', d: 'Functional tests check what the app does. Non-functional tests check how well (speed, security, usability). Smoke tests are a quick “does it run?”, and regression tests check that old features still work after changes.', try: 'Pick any app and write one smoke test and three regression tests for it.' },
      { t: 'Testing in a real team', d: 'In Agile teams, QA joins from the start: reviewing requirements, asking “what if…?” questions, and testing each story in the sprint. Finding a bug in a requirement is far cheaper than finding it in production.', try: 'Read a user story (or write one) and list five questions a tester would ask before coding starts.' },
    ],
    project: 'Write a one-page test strategy for a food-delivery app: what to test, which test levels and types, what to automate, and what the risks are.',
  },

  'test-design': {
    simple: 'Instead of typing random values into a form, you pick a handful of smart ones, like the edges of a rule, where mistakes usually hide.',
    uses: ['Find more bugs with fewer tests', 'Write test cases anyone on the team can run', 'Show your thinking clearly in QA interviews'],
    example: {
      file: 'age-field-tests.md',
      code: `Rule: Age must be 18 to 60 (whole numbers)

Equivalence classes        Boundary values
  < 18   → invalid           17 → rejected
  18–60  → valid             18 → accepted
  > 60   → invalid           60 → accepted
  "abc"  → invalid           61 → rejected

TC-01  Enter 18 in Age, submit  → Form accepted
TC-02  Enter 17 in Age, submit  → "Age must be 18 to 60"
TC-03  Leave Age empty, submit  → "Age is required"`,
      note: 'Three groups and four edge values replace hundreds of random tries. Bugs love boundaries, like a check written as > 18 instead of >= 18.',
    },
    steps: [
      { t: 'Equivalence partitioning', d: 'Split inputs into groups the app should treat the same way (valid ages, too young, too old, not a number). Test one value from each group, because if one works, the rest of the group probably does too.', try: 'List the equivalence classes for a password field: 8–20 characters, at least one number.' },
      { t: 'Boundary value analysis', d: 'Test right at the edges of each group, and just outside them (17, 18, 60, 61). Developers often get < and <= mixed up, so boundaries are where bugs hide.', try: 'Write the boundary values for “free shipping on orders of ₱500 or more”.' },
      { t: 'Decision tables', d: 'When several conditions combine (member? coupon? over ₱1000?), list every combination in a table with the expected result. It exposes missing rules and contradictions.', try: 'Make a decision table for a discount: members get 10%, coupons give 5%, and they can’t be combined.' },
      { t: 'Writing test cases', d: 'A good test case has an ID, a title, preconditions, numbered steps, test data and one expected result. Anyone should be able to run it without asking you questions. Group them in a test plan.', try: 'Write five test cases for a login form in a spreadsheet, using the format above.' },
    ],
    project: 'Write a test plan and at least 20 test cases for a real signup form (name, email, password, age), using equivalence classes, boundary values and one decision table.',
  },

  'bug-reports': {
    simple: 'A bug report tells developers exactly what went wrong and how to make it happen again, so they can fix it quickly.',
    uses: ['Get your bugs fixed instead of closed as “can’t reproduce”', 'Earn developers’ trust with clear, complete reports', 'Track bugs from found to fixed in Jira or GitHub Issues'],
    example: {
      file: 'BUG-231.md',
      code: `Title: Checkout total ignores 10% coupon when cart has 1 item

Environment: Chrome 131, Windows 11, staging, user test01
Severity: High    Priority: High

Steps to reproduce
1. Log in as test01
2. Add "Running Shoes" (₱2,000) to the cart
3. Go to checkout and apply coupon SAVE10

Expected: Total shows ₱1,800
Actual:   Total stays ₱2,000; message says "Coupon applied"

Evidence: screen recording, console has no errors,
          POST /api/coupon returns 200 with discount: 0
Notes: Works when the cart has 2+ items`,
      note: 'A specific title, exact steps, expected vs actual, and evidence. The last note is gold: it tells the developer where to look.',
    },
    steps: [
      { t: 'The parts of a good report', d: 'A short, specific title (what, where, when), environment, numbered steps from a clear starting point, expected result, actual result, and evidence. One bug per report.', try: 'Rewrite the title “checkout broken” into a specific one for any bug you can imagine.' },
      { t: 'Evidence', d: 'Attach a screenshot or short screen recording, the console errors, the failing network request, and the test data you used. Evidence turns “works on my machine” into a quick fix.', try: 'Record a 20-second screen capture of any app and note the browser and OS version.' },
      { t: 'Severity vs priority', d: 'Severity is how bad the impact is (crash, data loss, typo). Priority is how soon to fix it, which depends on business needs. A typo in the company name on the home page is low severity but high priority.', try: 'Give severity and priority to: app crashes on an old Android version; wrong colour on a button; payment charged twice.' },
      { t: 'Bug life cycle and trackers', d: 'Bugs move through states: new → triaged → in progress → fixed → verified → closed (or reopened). Learn to file, search, link and verify bugs in Jira or GitHub Issues.', try: 'Create a free Jira or GitHub project and file three bugs with labels and severity.' },
    ],
    project: 'Explore the Sauce Demo shop (saucedemo.com, try the “problem_user” login) and write 10 complete bug reports with steps, expected/actual results and evidence.',
  },

  'exploratory-testing': {
    simple: 'Exploratory testing means learning an app and testing it at the same time, following your curiosity with a clear goal and a time limit.',
    uses: ['Find bugs that scripted test cases miss', 'Learn a new app quickly', 'Test well even when there are no written requirements'],
    example: {
      file: 'session-notes.md',
      code: `Charter: Explore the cart with unusual quantities
         to find calculation and validation bugs
Time box: 45 minutes     Tester: you     Build: 2.4.1

Notes
10:02  Qty 0 → item stays in cart with ₱0 line  (BUG?)
10:09  Qty 999 → accepted, no stock check        (BUG)
10:15  Qty "-1" via keyboard → total goes negative (BUG, high)
10:24  Back button after checkout → cart reappears (question)

Bugs: 3    Questions: 1    Ideas: test coupon + qty 999`,
      note: 'A charter gives the session a mission, the time box keeps it focused, and timestamped notes turn into bug reports afterwards.',
    },
    steps: [
      { t: 'Write a charter', d: 'A charter is a one-line mission: “Explore <area> with <resources> to discover <kind of problems>”. It keeps you focused without a script.', try: 'Write three charters for a food-delivery app: one for search, one for payment, one for the map.' },
      { t: 'Time-boxed sessions', d: 'Explore for 30–90 minutes with no interruptions, taking quick timestamped notes of what you tried, what you saw and what seems wrong. Stop when the time is up and review.', try: 'Run one 30-minute session on any website using your charter and keep notes.' },
      { t: 'Use heuristics', d: 'Heuristics are quick ideas to try: zero, one, many; very long text; emojis and special characters; going back and refreshing; double-clicking; slow network; switching language.', try: 'Try ten heuristics on one form and note anything strange.' },
      { t: 'Think like different users', d: 'Be a first-time user, an impatient user, someone on an old phone, someone using only a keyboard, and someone trying to cheat the system. Each one finds different bugs.', try: 'Use a website for 10 minutes with only the keyboard (Tab, Enter, Esc). What breaks?' },
    ],
    project: 'Run three 45-minute exploratory sessions on a demo app with different charters, then turn your notes into a summary report with bugs found, risks and ideas for automated tests.',
  },

  'devtools-for-testers': {
    simple: 'Browser DevTools show what happens behind a web page: errors, network requests, saved data and how it looks on other devices.',
    uses: ['Find out if a bug is in the frontend or the backend', 'Add console errors and failed requests to your bug reports', 'Test mobile layouts and slow connections from your laptop'],
    example: {
      file: 'console',
      code: `// Open DevTools: F12 (or Ctrl+Shift+I / Cmd+Option+I)

// Console: check what the app saved for this user
localStorage

// Read the cookies the page can see
document.cookie

// Find every button without an accessible name
[...document.querySelectorAll("button")]
  .filter((b) => !b.textContent.trim() && !b.getAttribute("aria-label"))`,
      note: 'You can type JavaScript straight into the Console to inspect the page. Testers use it to check stored data and spot problems quickly.',
    },
    steps: [
      { t: 'Console', d: 'The Console shows JavaScript errors and warnings in red and yellow. Always check it while testing; an error here often explains a broken button. Copy the error text into your bug report.', try: 'Open the Console on five websites you use and note which ones show errors.' },
      { t: 'Network', d: 'The Network tab lists every request: URL, method, status code, time and response. A 500 means the server failed; a 400 means the app sent bad data. This tells you whether to blame the frontend or backend.', try: 'Submit a form on any site and find its request in the Network tab. What status and response did it get?' },
      { t: 'Elements and Application', d: 'Elements lets you inspect the HTML and CSS of anything on the page, which helps you find selectors for automation. Application shows cookies, localStorage and session data you can clear to test as a new user.', try: 'Clear a site’s cookies and localStorage, then reload. What changed?' },
      { t: 'Device mode and throttling', d: 'Device mode shows the page at phone sizes. Network throttling slows the connection to “Slow 4G” so you can see loading states, timeouts and double-submits.', try: 'Test a checkout or signup on “Slow 4G” in device mode and look for missing loading indicators.' },
    ],
    project: 'Find and report three bugs on a demo site using only DevTools: one console error, one failing or slow network request, and one mobile layout problem.',
  },

  'ui-automation': {
    simple: 'You write a short script that acts like a robot user: it opens the site, fills in forms, presses buttons and tells you if anything looks wrong.',
    uses: ['Re-run hundreds of checks on every release automatically', 'Test in Chrome, Firefox and Safari at once', 'Move from manual tester to automation engineer'],
    example: {
      file: 'tests/login.spec.ts',
      code: `import { test, expect } from "@playwright/test";

test("user can log in and see products", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Products")).toBeVisible();
});`,
      output: `$ npx playwright test
Running 1 test using 1 worker
  ✓  1 tests/login.spec.ts › user can log in and see products (1.2s)
  1 passed (2.0s)`,
      note: 'Playwright finds elements the way a user would (by placeholder, role and text) and waits for them automatically, so there are no fragile sleep calls.',
    },
    steps: [
      { t: 'Set up Playwright', d: 'Run npm init playwright@latest in an empty folder. It installs the test runner, browsers and an example test. Run npx playwright test, then npx playwright show-report to see the results.', try: 'Set up Playwright and run the example test in headed mode with --headed.' },
      { t: 'Locators', d: 'Find elements like a user would: getByRole, getByLabel, getByPlaceholder and getByText. Avoid long CSS or XPath paths that break when the design changes.', try: 'Use npx playwright codegen on a website and look at which locators it chooses.' },
      { t: 'Actions and assertions', d: 'Actions (click, fill, check) and web-first assertions (toBeVisible, toHaveText, toHaveURL) wait automatically until the page is ready. Every test should end by checking a result, not just clicking.', try: 'Write a test that adds a product to the Sauce Demo cart and checks the cart badge shows 1.' },
      { t: 'Run, debug and compare tools', d: 'Run tests in parallel and in several browsers, and use the trace viewer to replay failures step by step. Cypress and Selenium do the same job; the ideas transfer if a company uses them.', try: 'Make a test fail on purpose, run it with --trace on, and open the trace to find why.' },
    ],
    project: 'Automate the Sauce Demo shop with Playwright: login (valid and locked-out user), add to cart, remove from cart, and full checkout, running in Chromium and Firefox.',
  },

  'automation-design': {
    simple: 'Test automation design is organising test code so it stays reliable and easy to update as the app grows.',
    uses: ['Change one file instead of fifty when the UI changes', 'Stop flaky tests that fail at random', 'Build a suite the whole team trusts'],
    example: {
      file: 'pages/LoginPage.ts',
      code: `import { type Page, expect } from "@playwright/test";

export class LoginPage {
  constructor(private page: Page) {}

  async open() {
    await this.page.goto("https://www.saucedemo.com/");
  }

  async login(user: string, password: string) {
    await this.page.getByPlaceholder("Username").fill(user);
    await this.page.getByPlaceholder("Password").fill(password);
    await this.page.getByRole("button", { name: "Login" }).click();
  }

  async expectError(text: string) {
    await expect(this.page.locator("[data-test=error]")).toContainText(text);
  }
}

// in a test:  await login.login("locked_out_user", "secret_sauce");
//             await login.expectError("locked out");`,
      note: 'The page object keeps all the login locators in one place. Tests read like plain steps, and a UI change means updating one file.',
    },
    steps: [
      { t: 'Page Object Model', d: 'Create one class per page with methods for what a user can do there (login, addToCart). Tests call those methods instead of repeating locators, so they read like test cases.', try: 'Turn your login test into a LoginPage class like the example.' },
      { t: 'Fixtures and test data', d: 'Each test should set up exactly what it needs: a fresh user, a known cart. Playwright fixtures share setup (like a logged-in page) without tests depending on each other.', try: 'Write a fixture that gives every test an already logged-in page.' },
      { t: 'Kill flaky tests', d: 'Flaky tests pass and fail at random, so people stop trusting them. Causes: fixed waits, tests sharing data, animations and test order. Fix them with auto-waiting assertions, isolated data and no sleep calls.', try: 'Find a waitForTimeout in a test and replace it with an assertion that waits for the real condition.' },
      { t: 'What to automate', d: 'Automate stable, repeated, high-value checks (login, checkout, critical APIs). Keep exploratory, one-off and visual-judgement testing manual. Push checks down to faster API and unit tests where you can.', try: 'List 10 tests for a shop and mark each one: automate UI, automate API, or keep manual.' },
    ],
    project: 'Refactor your Sauce Demo suite to use page objects and a logged-in fixture, make every test independent, and run it 10 times in a row with zero flaky failures.',
  },

  'api-testing': {
    simple: 'API testing checks the requests and responses behind an app directly, without clicking through the UI.',
    uses: ['Test business logic faster and more reliably than UI tests', 'Find backend bugs before the frontend is even built', 'Prepare test data quickly for UI tests'],
    example: {
      file: 'tests/booking-api.spec.ts',
      code: `import { test, expect } from "@playwright/test";

const API = "https://restful-booker.herokuapp.com";

test("a booking returns the right shape", async ({ request }) => {
  const list = await request.get(\`\${API}/booking\`);
  const [{ bookingid }] = await list.json();   // take the first booking

  const res = await request.get(\`\${API}/booking/\${bookingid}\`, {
    headers: { Accept: "application/json" },
  });
  expect(res.status()).toBe(200);

  const body = await res.json();
  expect(body).toHaveProperty("firstname");
  expect(typeof body.totalprice).toBe("number");
});

test("unknown booking returns 404", async ({ request }) => {
  const res = await request.get(\`\${API}/booking/999999999\`);
  expect(res.status()).toBe(404);
});`,
      note: 'One happy-path test checks the status and the shape of the data; one error test checks the API fails the right way. Error cases find most API bugs.',
    },
    steps: [
      { t: 'How REST APIs work', d: 'A request has a method (GET, POST, PUT, DELETE), a URL, headers and sometimes a JSON body. The response has a status code and usually a JSON body. Every action in a web app is one of these underneath.', try: 'Watch the Network tab while you use a web app and identify one GET and one POST request.' },
      { t: 'Status codes and checks', d: '2xx means success, 4xx means the client sent something wrong, 5xx means the server broke. Check the status, the body fields and types, and how long the request took.', try: 'Send a GET, a POST with missing fields and a request to a wrong URL. Note the status code each returns.' },
      { t: 'Postman or Bruno', d: 'API clients let you send requests, save them in collections, use environments (dev, staging) and variables (like a login token), and add simple test scripts.', try: 'Make a Postman or Bruno collection for Restful Booker: create, read, update and delete a booking.' },
      { t: 'Automate in code', d: 'Move your checks into code (Playwright’s request API, or REST Assured and pytest elsewhere) so they run in CI. Cover happy paths, validation errors, missing auth and edge cases.', try: 'Automate the create-a-booking request and assert the response contains the name you sent.' },
    ],
    project: 'Build a full API test suite for Restful Booker: create, read, update and delete bookings, authentication, and at least five error cases, running with npx playwright test.',
  },

  'performance-testing': {
    simple: 'Performance testing checks how fast and stable an app is when many people use it at once.',
    uses: ['Find the breaking point before a big sale or launch', 'Catch slow pages and APIs early', 'Give developers numbers instead of “it feels slow”'],
    example: {
      file: 'load-test.js',
      code: `import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 20,               // 20 virtual users
  duration: "30s",
  thresholds: {
    http_req_duration: ["p(95)<800"],   // 95% of requests under 800ms
    http_req_failed: ["rate<0.01"],     // under 1% errors
  },
};

export default function () {
  const res = http.get("https://quickpizza.grafana.com/");
  check(res, { "status is 200": (r) => r.status === 200 });
  sleep(1);
}`,
      output: `$ k6 run load-test.js
✓ status is 200
✓ http_req_duration..: p(95)=412ms
✓ http_req_failed....: 0.00%`,
      note: 'k6 simulates 20 users for 30 seconds. Thresholds turn “fast enough” into a pass/fail rule you can run in CI.',
    },
    steps: [
      { t: 'Kinds of performance tests', d: 'Load tests check normal expected traffic, stress tests push past it to find the breaking point, spike tests add sudden jumps, and soak tests run for hours to find slow memory leaks.', try: 'For an online ticket sale, describe what each of the four test types would simulate.' },
      { t: 'The numbers that matter', d: 'Response time (look at p95, the time 95% of requests beat, not the average), throughput (requests per second) and error rate. Agree on targets before testing.', try: 'Explain why an average response time of 300ms can hide a terrible experience for some users.' },
      { t: 'Write a k6 test', d: 'Install k6, write a script with virtual users, a duration and thresholds, then run it. Only load test apps you own or ones built for practice, like quickpizza.grafana.com.', try: 'Run the example script, then raise vus to 50 and compare the p95.' },
      { t: 'Page speed', d: 'For the frontend, Lighthouse in Chrome DevTools measures load speed and Core Web Vitals. Report results with the bottleneck you found, not just the score.', try: 'Run Lighthouse on three websites and compare their performance scores and biggest issues.' },
    ],
    project: 'Write a k6 load test with thresholds for a practice site, run it at three load levels, add it to GitHub Actions, and write a one-page report with charts and the bottleneck you found.',
  },

  'qa-career': {
    simple: 'Landing a QA job is about showing proof: a portfolio of real testing work, plus the vocabulary and certificates employers look for.',
    uses: ['Get interviews without professional experience', 'Answer common QA interview questions with confidence', 'Plan your path from QA to SDET or development'],
    example: {
      file: 'README.md',
      code: `# QA Portfolio: Sauce Demo & Restful Booker

[![tests](https://github.com/you/qa-portfolio/actions/workflows/tests.yml/badge.svg)](…)

## What's inside
- test-plan.md           – scope, risks, approach
- test-cases.xlsx        – 40 cases (boundaries, decision tables)
- bug-reports/           – 10 reports with recordings
- ui-tests/              – Playwright + TypeScript, page objects
- api-tests/             – CRUD, auth and error cases
- performance/           – k6 load test with thresholds

## Run it
npm ci && npx playwright test`,
      note: 'One repo that shows the whole job: planning, manual testing, bug reports, UI and API automation, and CI. This beats a list of tools on a CV.',
    },
    steps: [
      { t: 'Build the portfolio', d: 'Put everything from this roadmap in one public repo with a clear README: test plan, test cases, bug reports, UI and API suites, a load test and a CI badge showing the tests pass.', try: 'Create the repo and write the README outline, even before all parts are done.' },
      { t: 'Certification', d: 'The ISTQB Foundation Level (CTFL) certificate is the most recognised QA certificate and is often listed in job posts. It proves the vocabulary; your portfolio proves the skills.', try: 'Download the free CTFL syllabus and try a free sample exam to see where you stand.' },
      { t: 'Job titles and interviews', d: 'Look for QA analyst, QA engineer, test automation engineer and SDET roles. Interviews often ask you to test an everyday object or a web form live, explain bug severity, and write a small automated test.', try: 'Practise out loud: “How would you test a lift (elevator)?” List at least 15 tests in 10 minutes.' },
      { t: 'Grow from QA', d: 'Testers who code grow into SDET (building test frameworks), DevOps (owning pipelines) or development. Keep learning programming fundamentals and use AI tools to write tests faster, while checking everything they produce.', try: 'Read three SDET job posts and list the skills you still need.' },
    ],
    project: 'Publish your QA portfolio repo with all parts above, a passing CI badge and a short video walkthrough, then apply to five QA roles with it.',
  },
};
