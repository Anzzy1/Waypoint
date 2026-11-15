import type { LessonGuide } from './types';

/** Software engineering fundamentals. Examples use Python because it reads almost like plain English. */
export const SOFTWARE_GUIDES: Record<string, LessonGuide> = {
  'programming-fundamentals': {
    simple: 'Programming is giving a computer exact, step-by-step instructions. Every language uses the same building blocks: variables, decisions, loops and functions.',
    uses: ['Turn any everyday task into steps a computer can follow', 'Learn a second language in weeks, because the ideas are the same', 'Read other people’s code and understand what it does'],
    example: {
      file: 'shopping.py',
      code: `def total_price(items, discount=0):
    total = 0
    for name, price in items.items():
        total += price
    if total > 1000:
        total -= total * discount
    return round(total, 2)

cart = {"shoes": 899, "socks": 150}
print("To pay:", total_price(cart, discount=0.1))`,
      output: `To pay: 944.1`,
      note: 'A function takes a cart (a dictionary), loops over it to add up prices, and uses an if to apply a discount only for big orders.',
    },
    steps: [
      { t: 'Variables and types', d: 'A variable is a named box for a value. Values have types: numbers, text (strings), true/false (booleans) and lists. Most bugs for beginners come from mixing types, like adding "5" + 5.', try: 'Store your name, age and favourite food in variables, then print one sentence using all three.' },
      { t: 'Decisions and loops', d: 'if/else lets your program choose. for loops repeat something for each item in a list; while loops repeat until a condition is false. Together they handle almost every problem.', try: 'Print the numbers 1 to 30, but print "Fizz" for multiples of 3, "Buzz" for multiples of 5 and "FizzBuzz" for both.' },
      { t: 'Functions', d: 'A function is a named, reusable piece of code with inputs (parameters) and an output (return value). Keep each function small and doing one thing, so it’s easy to test and reuse.', try: 'Write a function is_even(n) that returns True or False, and call it with five different numbers.' },
      { t: 'Lists and dictionaries', d: 'A list keeps items in order ([1, 2, 3]). A dictionary maps keys to values ({"ana": 91}). Learning to loop over, filter and update these is most of everyday programming.', try: 'Make a dictionary of 5 friends and their ages, then print only the ones older than 20.' },
      { t: 'Plan before you code', d: 'Before typing, write the steps in plain words (pseudocode). If you can’t explain the steps, the code won’t work either. Then code one step at a time and run it often.', try: 'Write pseudocode for a number-guessing game, then turn each line into Python.' },
    ],
    project: 'Build a command-line to-do app: add, list, complete and delete tasks, saving them to a JSON file so they survive a restart.',
  },

  debugging: {
    simple: 'Debugging is finding out why code doesn’t do what you expect, and fixing the real cause. It’s a step-by-step skill, not luck.',
    uses: ['Fix errors in minutes instead of hours', 'Understand code you didn’t write by watching it run', 'Ask much better questions when you’re truly stuck'],
    example: {
      file: 'average.py',
      code: `def average(scores):
    total = 0
    for s in scores:
        total += s
    # breakpoint()        # uncomment to pause here and inspect
    return total / len(scores)

print(average([80, 90, 70]))
print(average([]))       # ZeroDivisionError!`,
      output: `80.0
Traceback (most recent call last):
  File "average.py", line 9, in <module>
  File "average.py", line 6, in average
ZeroDivisionError: division by zero`,
      note: 'The stack trace points to line 6: dividing by len([]) which is 0. Uncommenting breakpoint() pauses the program there so you can look at the variables.',
    },
    steps: [
      { t: 'Read the error, bottom up', d: 'The last line of a stack trace says what went wrong; the lines above say where. Read the file name and line number, then go and look at that exact line before changing anything.', try: 'Break a working script on purpose (misspell a variable) and read every line of the error it prints.' },
      { t: 'Reproduce it reliably', d: 'Find the exact input or steps that cause the bug every time. A bug you can trigger on demand is half fixed. Write those steps down.', try: 'Find the smallest input that makes the example above crash, and write it as a one-line test.' },
      { t: 'Use a real debugger', d: 'Set a breakpoint in VS Code (click left of the line number), run with the debugger, then step line by line and watch variables change. It beats guessing with prints.', try: 'Put a breakpoint inside a loop and watch a variable change on every pass.' },
      { t: 'Narrow it down', d: 'Cut the problem in half again and again: comment out code, add a log line, or use git bisect to find which commit broke it. Explain the code out loud (rubber-duck debugging). Often the bug appears while you talk.', try: 'Use git bisect on a small repo where you introduced a bug a few commits ago.' },
    ],
    project: 'Ask a friend (or an AI) to hide three bugs in a small program you wrote. Find each one with the debugger and write down how you found it.',
  },

  'cs-basics': {
    simple: 'Computer science basics explain what really happens when your code runs: how data becomes bits, where it’s stored, and what the operating system does for you.',
    uses: ['Understand why some code is fast and some is slow', 'Make sense of errors like “out of memory” or “stack overflow”', 'Feel confident in interviews that ask “how does this work?”'],
    example: {
      file: 'bits.py',
      code: `print(bin(5))            # how 5 looks in binary
print(ord("A"))          # the number behind the letter A
print("A".encode())      # the bytes stored for "A"
print(0.1 + 0.2)         # why money needs care

import sys
print(sys.getsizeof([1, 2, 3]), "bytes for a small list")`,
      output: `0b101
65
b'A'
0.30000000000000004
88 bytes for a small list`,
      note: 'Everything is stored as numbers in binary. Some decimals can’t be stored exactly, which is why 0.1 + 0.2 isn’t exactly 0.3. The exact list size depends on your Python version.',
    },
    steps: [
      { t: 'Binary and data', d: 'Computers store everything as bits (0 or 1). Eight bits make a byte. Numbers, letters (via codes like ASCII and UTF-8), images and videos are all just numbers underneath.', try: 'Convert the numbers 1 to 10 to binary by hand, then check with bin().' },
      { t: 'CPU, memory and storage', d: 'The CPU runs instructions. RAM is fast but forgets when the power goes off. Disks and SSDs are slower but permanent. Reading from the network is slower still, which is why we cache.', try: 'Time how long it takes to read a big file twice in a row. Why is the second read faster?' },
      { t: 'Processes and the operating system', d: 'The OS runs many programs (processes) at once, gives each its own memory, and shares the CPU between them. Threads let one program do several things at the same time.', try: 'Open Task Manager or run top, find your editor and see how much memory and CPU it uses.' },
      { t: 'Stack, heap and how code runs', d: 'Function calls live on the stack. Too many nested calls cause a stack overflow. Objects live on the heap, and garbage collection frees them when nothing uses them. Compiled languages turn code into machine code first; interpreted ones run it line by line.', try: 'Write a recursive function with no stopping condition and read the error it gives.' },
    ],
    project: 'Write a one-page explainer, with a diagram, of what happens from double-clicking a program to it showing a window: disk, memory, CPU and OS.',
  },

  oop: {
    simple: 'Object-oriented programming bundles data and the actions on that data into classes, like a blueprint you can create many objects from.',
    uses: ['Model real things in code (users, orders, accounts)', 'Read and work in most big Java, C#, Python and TypeScript codebases', 'Keep large programs organised as they grow'],
    example: {
      file: 'bank.py',
      code: `class Account:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self._balance = balance      # "private": change it through methods

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Deposit must be positive")
        self._balance += amount

    @property
    def balance(self):
        return self._balance

acc = Account("Ana")
acc.deposit(500)
print(acc.owner, acc.balance)`,
      output: `Ana 500`,
      note: 'The class hides the balance and only lets it change through deposit(), which checks the rules. That is encapsulation.',
    },
    steps: [
      { t: 'Classes and objects', d: 'A class is the blueprint; an object is one thing built from it. __init__ sets up each new object. Methods are functions that belong to the object and can use self.', try: 'Write a Book class with title, author and a method describe() that returns one sentence.' },
      { t: 'Encapsulation', d: 'Keep an object’s data behind methods, so the rules (like “no negative balance”) live in one place. Other code shouldn’t reach in and change fields directly.', try: 'Add a withdraw() method to the example that refuses to go below zero.' },
      { t: 'Inheritance vs composition', d: 'Inheritance says “a SavingsAccount is an Account”. Composition says “a Car has an Engine”. Composition is usually more flexible, so prefer it unless the “is a” relationship is really true.', try: 'Make a Car class that has an Engine object, instead of inheriting from Engine.' },
      { t: 'Polymorphism and SOLID', d: 'Polymorphism means different classes share a method name, so code can treat them the same (shape.area() for circles and squares). SOLID’s five rules keep classes small, focused and easy to extend.', try: 'Make Circle and Square classes with area(), then sum the area of a mixed list.' },
    ],
    project: 'Build a small library system with Book, Member and Library classes: borrow, return and list overdue books, with rules enforced inside the classes.',
  },

  'clean-code': {
    simple: 'Write code like a clear recipe someone else will follow, and tidy it up regularly, the way you’d tidy a kitchen while cooking.',
    uses: ['Make your code easy for teammates to review', 'Fix and extend old code without breaking it', 'Show employers you write professional code'],
    example: {
      file: 'before_after.py',
      code: `# Before: what does this do?
def calc(l):
    t = 0
    for x in l:
        if x[1] > 18:
            t += 1
    return t

# After: same behaviour, clear intent
ADULT_AGE = 18

def count_adults(people):
    return sum(1 for _name, age in people if age > ADULT_AGE)`,
      note: 'Same result, but the new names, the named constant and the shorter body explain the intent without a comment.',
    },
    steps: [
      { t: 'Names that explain', d: 'Name variables after what they hold (unpaid_invoices, not data2) and functions after what they do (send_welcome_email). If you need a comment to explain a name, choose a better name.', try: 'Rename every variable in an old script of yours so a stranger could follow it.' },
      { t: 'Small functions, one job', d: 'A function should do one thing at one level of detail. If it has “and” in its description or scrolls off the screen, split it. Avoid deep nesting by returning early.', try: 'Find your longest function and split it into three smaller, well-named ones.' },
      { t: 'Spot code smells', d: 'Smells hint at trouble: duplicated code, magic numbers, long parameter lists, huge classes. Each one has a known fix (extract function, introduce constant, extract class).', try: 'Look through Refactoring.Guru’s smells list and find two of them in your own code.' },
      { t: 'Refactor safely', d: 'Refactor in tiny steps, running your tests after each one. Let a formatter (Black, Prettier) and a linter (Ruff, ESLint) handle style automatically so reviews focus on logic.', try: 'Install a formatter and linter in a project and fix every warning they report.' },
    ],
    project: 'Take a messy script (yours or from GitHub), write tests for its current behaviour, then refactor it step by step while the tests stay green. Show before and after in the README.',
  },

  'design-patterns': {
    simple: 'Design patterns are named, reusable solutions to common design problems, like recipes every developer recognises.',
    uses: ['Solve common design problems without reinventing them', 'Understand frameworks, which use patterns everywhere', 'Explain your design to teammates in one word'],
    example: {
      file: 'strategy.py',
      code: `# Strategy: swap how something is done without changing the caller
def ship_standard(weight): return 50 + weight * 10
def ship_express(weight):  return 120 + weight * 15

SHIPPING = {"standard": ship_standard, "express": ship_express}

def checkout(weight, method):
    cost = SHIPPING[method](weight)
    return f"{method}: ₱{cost}"

print(checkout(2, "standard"))
print(checkout(2, "express"))`,
      output: `standard: ₱70
express: ₱150`,
      note: 'Adding a new shipping method means adding one function to the dictionary, without touching checkout(). That is the Strategy pattern.',
    },
    steps: [
      { t: 'Why patterns exist', d: 'Patterns give names to designs that keep showing up. Saying “use a Factory here” is faster than describing it. They’re tools, not goals. Only use one when you actually have the problem it solves.', try: 'Read the intro to Refactoring.Guru’s pattern catalogue and write one line per category: creational, structural, behavioural.' },
      { t: 'Strategy and Observer', d: 'Strategy swaps an algorithm at runtime (payment methods, sorting rules). Observer lets objects subscribe to events (a button click notifying listeners). You use both all the time in web apps.', try: 'Build a tiny event system where two functions get notified when a new order is placed.' },
      { t: 'Factory and Builder', d: 'Factory creates objects without the caller knowing the exact class (create_notifier("email")). Builder assembles complex objects step by step, often with chained methods.', try: 'Write a create_notifier(kind) factory that returns an email or SMS notifier with the same send() method.' },
      { t: 'Adapter and Decorator', d: 'Adapter makes an incompatible interface fit yours, for example wrapping a third-party payment API. Decorator adds behaviour without changing the original (Python’s @decorators: logging, timing, caching).', try: 'Write a @timer decorator that prints how long any function took.' },
    ],
    project: 'Build a notification service that sends by email, SMS or push: a Factory picks the sender, Strategy chooses the message format, and Observer triggers it when an order ships.',
  },

  'testing-fundamentals': {
    simple: 'Automated tests are small programs that check your code works, so you can change it without fear of breaking something.',
    uses: ['Catch bugs seconds after you write them', 'Refactor and add features without breaking old ones', 'Meet the standard every professional team expects'],
    example: {
      file: 'test_cart.py',
      code: `import pytest
from cart import total_price

def test_adds_up_prices():
    assert total_price({"a": 100, "b": 50}) == 150

def test_discount_only_for_big_orders():
    assert total_price({"a": 900}, discount=0.1) == 900
    assert total_price({"a": 2000}, discount=0.1) == 1800

def test_empty_cart_is_free():
    assert total_price({}) == 0`,
      output: `$ pytest
collected 3 items
test_cart.py ...                     [100%]
3 passed in 0.02s`,
      note: 'Each test checks one behaviour, including the edge case of an empty cart. pytest finds any function starting with test_ and runs it.',
    },
    steps: [
      { t: 'The test pyramid', d: 'Write many fast unit tests (one function), fewer integration tests (parts working together, like code plus a database) and a few slow end-to-end tests (the whole app through the UI).', try: 'List the features of a project you built and mark which test level suits each one.' },
      { t: 'Arrange, act, assert', d: 'Every test sets things up (arrange), does one action (act) and checks the result (assert). Name the test after the behaviour, so a failure tells you exactly what broke.', try: 'Write three pytest tests for a function, including one edge case like an empty list.' },
      { t: 'Fakes, stubs and mocks', d: 'Tests should be fast and never call real payment APIs or send real emails. Replace those parts with fakes or mocks that return fixed answers and record how they were called.', try: 'Use unittest.mock to test a function that calls an API, without the network.' },
      { t: 'Test-driven development', d: 'TDD flips the order: write a failing test (red), write just enough code to pass (green), then clean up (refactor). It forces small steps and code that’s easy to test.', try: 'Build a password-strength checker using TDD, one rule at a time.' },
    ],
    project: 'Add a test suite to a past project: unit tests for the logic, one integration test, and a coverage report. Run it automatically with GitHub Actions on every push.',
  },

  'code-review': {
    simple: 'Code review is a teammate reading your changes before they go live. It catches bugs, shares knowledge and keeps the codebase consistent.',
    uses: ['Get your work merged faster with fewer back-and-forths', 'Learn from senior developers’ feedback', 'Catch bugs, including in AI-generated code, before users see them'],
    example: {
      file: 'pull-request.md',
      code: `## Add password reset by email

**Why:** Users who forget their password currently have to contact support (#142).

**What changed**
- New /reset-password page and API endpoint
- Reset links expire after 30 minutes and work only once
- Tests for expired, reused and valid links

**How to test**
1. Click "Forgot password" on /login
2. Use the link from the email in the dev mail inbox

**Screenshots:** before / after attached`,
      note: 'A good pull request says why, what changed and how to test it. Reviewers can then focus on the code instead of guessing the goal.',
    },
    steps: [
      { t: 'Small, clear pull requests', d: 'Keep pull requests small (ideally under 400 lines) and about one thing. Write a description: why, what changed, how to test. Link the ticket. Small PRs get reviewed faster and better.', try: 'Rewrite the description of one of your past PRs or commits using the template above.' },
      { t: 'Good commit messages', d: 'Use a short summary line in the imperative (“Add password reset”), then a blank line and the why. Clean history helps teammates and future you understand changes.', try: 'Read “How to write a Git commit message” and reword your last five commits (in a practice repo).' },
      { t: 'What to look for when reviewing', d: 'Check that it works, handles errors and edge cases, has tests, is readable, and has no security problems (secrets, unchecked input). Be extra careful with AI-written code, which can look right and still be wrong.', try: 'Review an open pull request on a GitHub project you use and note three things you would ask about.' },
      { t: 'Kind, useful comments', d: 'Comment on the code, not the person. Be specific, explain why, and label how important it is (“nit:”, “question:”, “blocking:”). When receiving feedback, say thanks and ask if unsure.', try: 'Rewrite “this is wrong” into a specific, kind comment with a suggestion.' },
    ],
    project: 'Open a pull request on your own project with a full description, review it the next day with a checklist, and leave at least five useful comments before merging.',
  },

  'software-architecture': {
    simple: 'Like rooms in a house, each part of an app has its own job. Architecture decides where the walls and doors go.',
    uses: ['Keep a growing app from becoming a tangled mess', 'Change your database or UI without rewriting everything', 'Talk about design confidently in interviews and at work'],
    example: {
      file: 'layers.py',
      code: `# data layer: only talks to storage
class BookRepo:
    def __init__(self): self.books = {}
    def save(self, book): self.books[book["id"]] = book
    def get(self, book_id): return self.books.get(book_id)

# business layer: the rules, no HTTP or SQL here
class LoanService:
    def __init__(self, repo): self.repo = repo
    def borrow(self, book_id):
        book = self.repo.get(book_id)
        if not book or book["on_loan"]:
            raise ValueError("Book not available")
        book["on_loan"] = True
        self.repo.save(book)

# presentation layer (a web route) would only call LoanService.borrow()`,
      note: 'Each layer has one job, and dependencies point one way: routes → services → repositories. You could swap the dictionary for PostgreSQL without touching the rules.',
    },
    steps: [
      { t: 'Layers', d: 'Split code into presentation (routes, UI), business logic (rules) and data access (database). Each layer only calls the one below it. Business rules then don’t care whether the request came from the web or a test.', try: 'Sort the files of a past project into those three layers. Where do they mix?' },
      { t: 'Modules and dependencies', d: 'Group code by feature (books/, members/) and keep dependencies one-way. Pass dependencies in (like the repo above) instead of creating them inside, so you can swap them in tests.', try: 'Change a class that creates its own database connection so the connection is passed in.' },
      { t: 'Monolith vs microservices', d: 'A monolith is one deployable app; microservices are many small ones talking over the network. Microservices add a lot of complexity, so most teams should start with a well-structured monolith.', try: 'Write three reasons a five-person startup should stay with a monolith.' },
      { t: 'Config and diagrams', d: 'Keep settings and secrets in environment variables, not code (the Twelve-Factor App). Draw your system with simple boxes and arrows (the C4 model) so others can understand it quickly.', try: 'Draw a C4 “container” diagram of an app you built: browser, API, database.' },
    ],
    project: 'Build a small library REST API with separate route, service and repository layers, unit tests for the service using a fake repository, and a C4 diagram in the README.',
  },

  'sdlc-agile': {
    simple: 'Professional teams ship a little every week or two, check what users think, then decide what to build next.',
    uses: ['Understand stand-ups, sprints and tickets on day one of a job', 'Break big features into small deliverable pieces', 'Work smoothly with product managers, designers and testers'],
    example: {
      file: 'ticket.md',
      code: `Title: As a member, I can reset my password by email

User story
As a member who forgot my password,
I want to get a reset link by email,
so that I can log in without contacting support.

Acceptance criteria
- Given I enter a registered email, a reset link is sent
- The link expires after 30 minutes and works once
- An unknown email shows the same message (no account leak)

Estimate: 3 points   Labels: auth, frontend, backend`,
      note: 'A user story says who wants what and why. Acceptance criteria say exactly when it’s done, which developers and testers both use.',
    },
    steps: [
      { t: 'The development life cycle', d: 'Work moves from idea → requirements → design → build → test → release → monitor, then round again. Agile teams go round this loop every week or two instead of once a year.', try: 'Map a feature you built onto those steps. Which ones did you skip?' },
      { t: 'Scrum and Kanban', d: 'Scrum works in sprints (usually two weeks) with planning, a daily stand-up, a review and a retrospective. Kanban is a board (To do, Doing, Done) with a limit on work in progress.', try: 'Set up a free Trello or GitHub Projects board for your learning, with columns and WIP limits.' },
      { t: 'User stories and acceptance criteria', d: 'Write work as user stories with clear acceptance criteria, then split big stories into pieces that fit in a few days. Estimates (story points) are rough guesses to help planning, not promises.', try: 'Write three user stories with acceptance criteria for a to-do app.' },
      { t: 'Branches, releases and docs', d: 'Most teams use GitHub flow: a branch per change, a pull request, a review, then merge to main and deploy. Keep a README and short decision records so new teammates can get going.', try: 'Write an architecture decision record (ADR) for a choice you made, like your database.' },
    ],
    project: 'Run a one-week “solo sprint”: plan five tickets on a board, do daily notes like a stand-up, ship them through pull requests, then write a short retrospective.',
  },

  'tech-interviews': {
    simple: 'Technical interviews test how you solve problems, design systems and work with people. Like any test, you can practise for them.',
    uses: ['Pass coding rounds by recognising problem patterns', 'Explain your thinking clearly under pressure', 'Tell strong, short stories about your projects'],
    example: {
      file: 'two_sum.py',
      code: `# "Return the indexes of two numbers that add up to target."
def two_sum(nums, target):
    seen = {}                      # number -> index
    for i, n in enumerate(nums):
        need = target - n
        if need in seen:
            return [seen[need], i]
        seen[n] = i
    return []

print(two_sum([2, 7, 11, 15], 9))  # O(n) time, O(n) space`,
      output: `[0, 1]`,
      note: 'Checking every pair would be O(n²). Remembering what you’ve seen in a dictionary makes it O(n). Spotting that is the “hash map” pattern.',
    },
    steps: [
      { t: 'Learn the patterns', d: 'Most coding questions use a dozen patterns: hash maps, two pointers, sliding window, binary search, BFS/DFS, recursion and dynamic programming. Practise by pattern, a few problems each, instead of grinding random ones.', try: 'Solve three easy hash-map problems on NeetCode, then explain each one out loud.' },
      { t: 'Think out loud', d: 'Clarify the question and edge cases, describe a simple solution first, then improve it. Code it, then test it with an example by hand. Interviewers grade your thinking, not just the answer.', try: 'Record yourself solving a problem in 25 minutes while talking, then watch it back.' },
      { t: 'System design and Big-O', d: 'Be ready to state the time and space cost of your code, and to sketch a simple system (clients, API, database, cache) for questions like “design a URL shortener”.', try: 'Sketch a URL shortener on paper: the API, the database table and where a cache helps.' },
      { t: 'Behavioural questions', d: 'Prepare five short stories with the STAR method (situation, task, action, result) about a hard bug, a conflict, a mistake, a project you’re proud of and learning something fast.', try: 'Write one STAR story about a project from this roadmap in under 150 words.' },
    ],
    project: 'Keep a public log of 30 solved problems grouped by pattern, each with your approach and its Big-O, and do two mock interviews with a friend or a free mock-interview site.',
  },
};
