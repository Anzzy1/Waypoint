/** Shared content for the "learn how to learn" onboarding and the lesson done-check. */

export const DONE_CHECKS = [
  'I built something small with it without following along',
  'I can explain it in my own words, out loud or in writing',
  'I wrote a short note about it in my learning log',
];

export const HABITS = [
  {
    name: 'The binge-watcher',
    bad: 'I watch whole courses or videos before writing any code',
    fix: 'Write code within the first 20 minutes. Pause the video, type it yourself, then change something.',
  },
  {
    name: 'The re-reader',
    bad: 'I re-read or re-watch things to make them stick',
    fix: 'Test yourself instead (active recall): close everything and rebuild or explain it from memory.',
  },
  {
    name: 'The weekend crammer',
    bad: 'I study in long sessions, mostly on weekends',
    fix: 'Do short daily sessions of 1–2 hours. Your brain stores what you learn while you sleep, so spacing it out beats cramming.',
  },
  {
    name: 'The copy-paster',
    bad: 'I copy code (from tutorials or AI) to get it working',
    fix: 'Type it yourself and make sure you can explain every line. A line you can’t explain is your next thing to learn.',
  },
  {
    name: 'The course hopper',
    bad: 'I jump between many courses and resources',
    fix: 'Use one main resource per topic. Only switch if it truly doesn’t click after a fair try.',
  },
  {
    name: 'The answer peeker',
    bad: 'I look up the answer as soon as I get stuck',
    fix: 'Give it about 20 focused minutes first (the 20-minute rule), then ask for a hint, not the full solution.',
  },
  {
    name: 'The “watched it, done it”',
    bad: 'I mark topics as done once I’ve watched or read about them',
    fix: 'A topic is done when you can build something with it without help. Every lesson here has a done-check for this.',
  },
  {
    name: 'The forever student',
    bad: 'I keep learning but rarely build my own projects',
    fix: 'Every stage on this site ends with a project. Build it before moving on. That’s where the skill actually forms.',
  },
];

export const LOOP = [
  { short: 'Learn', t: 'Learn a little', d: 'One concept, one resource, 20–40 minutes. Pause often and type along.' },
  { short: 'Build', t: 'Build it alone', d: 'Close the resource. Rebuild it from memory, then change it: add a feature, break it, fix it.' },
  { short: 'Struggle', t: 'Struggle on purpose', d: 'Debug before asking: read the error, add logs, check the docs. Struggling a bit is how your brain builds the skill.' },
  { short: 'Explain', t: 'Explain it', d: 'Write 3 sentences or say it out loud as if teaching a beginner. Gaps show up immediately.' },
  { short: 'Review', t: 'Review it', d: 'Revisit after 1 day and after 1 week. Quick spaced reviews stop you forgetting.' },
];

export const LESSON_RECIPE = [
  { min: 5, time: '5 min', t: 'Read the lesson card', d: 'Know what you’re aiming for: the summary and the “What to learn” list.' },
  { min: 30, time: '30 min', t: 'Learn from ONE resource', d: 'Pick one video or one doc. Pause and type the code yourself as you go.' },
  { min: 60, time: '60 min', t: 'Close it and build', d: 'Make a tiny exercise using the concept, from memory. Then change it.' },
  { min: 20, time: '≤ 20 min', t: 'Stuck? Debug first', d: 'Error message → console.log → docs → search. Then ask for a hint.' },
  { min: 10, time: '10 min', t: 'Write it down', d: '3 sentences in your learning log: what it is, how you used it, what confused you.' },
  { min: 0, time: '✓', t: 'Pass the done-check', d: 'Tick the 3 checks in the lesson panel, then mark the lesson complete.' },
];

export const AI_RULES = [
  { ok: true, t: 'Write your own attempt first, then ask AI to review it.' },
  { ok: true, t: 'Ask for explanations and hints. Ask why, not just how.' },
  { ok: true, t: 'Use AI as a quiz master to test what you remember.' },
  { ok: true, t: 'Practise reading and debugging AI-written code. It’s a core job skill now.' },
  { ok: false, t: 'Paste code you can’t explain line by line.' },
  { ok: false, t: 'Keep AI autocomplete on while you learn the fundamentals.' },
];

export const AI_PROMPTS = [
  'I’m learning JavaScript. Don’t give me the code. Tell me which concept I’m missing and give me one hint.',
  'Here’s my solution. Review it like a senior developer: what would you change, and why?',
  'Quiz me with 5 questions on React useEffect. Wait for each answer before telling me if I’m right.',
  'Explain this error like I’m a beginner, then tell me how I could have debugged it myself.',
];

export const QUIZ = [
  {
    q: 'You finished a 3-hour React video and understood everything. Is the React lesson done?',
    options: [
      'Yes, I understood it all',
      'Not yet. It’s done when I can build something with it without the video',
      'Yes, as long as I didn’t skip any part',
    ],
    answer: 1,
    why: 'Understanding while watching is recognition. Skill is being able to produce it yourself.',
  },
  {
    q: 'You’ve been stuck on a bug for 5 minutes. What’s the best next move?',
    options: [
      'Paste it into AI and copy the fix',
      'Switch to a different tutorial',
      'Read the error, add logs, check the docs, and ask for a hint if still stuck after ~20 minutes',
    ],
    answer: 2,
    why: 'Debugging it yourself is the practice. Asking for a hint after a fair try keeps you learning without wasting hours.',
  },
  {
    q: 'Which schedule will make you improve fastest?',
    options: ['7 hours every Sunday', '1 hour every day', 'Whenever I feel motivated'],
    answer: 1,
    why: 'Spaced, consistent practice beats cramming. Your brain consolidates between sessions.',
  },
  {
    q: 'How should you use AI while learning?',
    options: [
      'Have it write the code so I move faster',
      'Try first, then ask it to explain, review or give hints',
      'Never use AI at all',
    ],
    answer: 1,
    why: 'AI is a great tutor. It only hurts learning when it does the thinking for you.',
  },
];
