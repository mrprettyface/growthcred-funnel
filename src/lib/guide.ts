/**
 * The AI Implementation Guide: the site-wide lead magnet offered by
 * GuideOffer and read at /ai-implementation-guide. Every word lives here.
 *
 * The promise: put AI into the way you already work, inside the platforms you
 * already use. No new software, no new process, no rebuild.
 *
 * Honesty rules: this is a method, so it carries no client results and no
 * figures. The worked example is labelled illustrative. Product names are
 * named only as places to look, never with claims about what a given plan
 * includes, because that changes by licence and by month.
 */

export const GUIDE_PATH = "/ai-implementation-guide";
export const GUIDE_SLUG = "ai-implementation-guide";

export const GUIDE_OFFER = {
  eyebrow: "Free guide",
  title: "The AI Implementation Guide",
  promise: "Put AI to work in your business without changing the way you work or the platforms you work in.",
  points: ["Seven steps, in the order that pays back", "Works inside the tools you already use", "A brief you can copy today"],
  cta: "Send me the guide",
  consent: "Send me the guide and the occasional practical email from GrowthCred. Unsubscribe any time.",
  done: "It's yours.",
  read: "Read it now",
  emailed: (email: string) => `We've also sent a copy to ${email}.`,
};

export type GuideStep = { n: string; t: string; body: string[]; list?: string[] };

export const GUIDE = {
  eyebrow: "The AI Implementation Guide",
  heading: "Put AI to work without changing how you work.",
  intro: [
    "Most AI projects fail at the same point: they ask a business to change first. New software, a new process, a new way of filing things, and a team that has to learn all of it before anything gets faster. Most people quietly go back to the old way within a month.",
    "This guide works the other way round. You keep your tools, your process and your people. AI goes into the steps you already do, in the platforms you already have open, one task at a time. Nothing moves until it has proved itself.",
  ],
  steps: [
    {
      n: "01",
      t: "Find the AI you already have",
      body: [
        "Before you buy anything, look at what is already on your screen. Microsoft 365 and Google Workspace now build AI assistants into many plans, and most teams already use a chat assistant such as ChatGPT or Claude somewhere, officially or not.",
        "Write down which of these your business already pays for, and which your people are already using. That list is your platform. The goal is to use it properly, not to add to it.",
      ],
    },
    {
      n: "02",
      t: "Map one normal week",
      body: [
        "For one week, list every document and message that leaves the business more than once: proposals, quotes, client updates, reports, minutes, follow-ups, job descriptions, standard replies.",
        "Next to each one, note roughly how long it takes and who does it. You are not redesigning anything. You are finding out where the hours already go, and that number becomes the baseline you measure against later.",
      ],
    },
    {
      n: "03",
      t: "Pick one task, not ten",
      body: ["Choose the first task using four tests. The best first task passes all four."],
      list: [
        "It happens every week, so the time saved repeats.",
        "It is mostly writing, summarising or reformatting.",
        "Someone already checks it before it goes out.",
        "A mistake is embarrassing, not dangerous.",
      ],
    },
    {
      n: "04",
      t: "Write your context once",
      body: [
        "AI writes generic work when it knows nothing about you. Fix that once: one page on who you are, who you serve, what you sell, how you write, and the rules you never break. Paste it in at the start of a conversation, or save it as a project or custom instruction in the tool you already use.",
        "This is the step most people skip, and it is the one that makes the output sound like your business instead of the internet.",
      ],
    },
    {
      n: "05",
      t: "Turn the task into a brief",
      body: [
        "A prompt is an instruction you type once. A brief is one you save and reuse, so the task comes out the same way every time. A good brief has five parts: the role, the input you will paste, the output you want, the format, and the checks it must pass.",
        "An illustrative brief for a weekly client update:",
      ],
      list: [
        "Role: you are the account manager for this client, writing in our house style.",
        "Input: my rough notes from this week, pasted below.",
        "Output: a client update under 200 words.",
        "Format: three short sections, done, next, and what we need from you.",
        "Checks: no promises on dates I have not given you, and flag anything unclear instead of guessing.",
      ],
    },
    {
      n: "06",
      t: "Keep the human check",
      body: [
        "The person who checked the work before still checks it now. AI takes the blank page and the reformatting; a person still owns what goes out. Write a short review checklist for the task, so the check is quick and consistent.",
        "Decide what never goes into an AI tool: ID numbers, banking details, health information, and confidential client material unless your organisation has approved a tool for it. Under POPIA, personal information needs a reason and protection wherever it goes, and that includes a chat window.",
      ],
    },
    {
      n: "07",
      t: "Measure, keep, then add the next one",
      body: [
        "After two weeks, time the same task again against your baseline from step two. If it is faster and the quality held, the brief becomes part of how the task is done and the next person inherits it. If it is not, change the brief or drop the task. Either answer is useful.",
        "Then go back to your list from step two and pick the next task. One task at a time, each one proved before the next, is how AI ends up in the whole business without anyone having to change how they work.",
      ],
    },
  ] satisfies GuideStep[],
  avoid: {
    heading: "Three things to avoid",
    items: [
      { t: "Buying a platform first.", b: "New software means new habits, and new habits are where adoption dies. Use what you already pay for until it runs out." },
      { t: "Teaching features instead of tasks.", b: "Nobody needs a tour of every button. They need their own weekly document done faster." },
      { t: "Automating before it works by hand.", b: "Run a brief manually until the output is reliable. Automation only makes a good process faster, and a bad one faster too." },
    ],
  },
  next: {
    heading: "Want it done with you?",
    body: "GrowthCred puts this method to work inside owner-led businesses and corporate teams, on your own documents, in the tools you already use.",
    links: [
      { to: "/call", label: "Speak to a specialist" },
      { to: "/corporate-ai-training", label: "Training for your team" },
      { to: "/workshop", label: "Learn it in a one-day workshop" },
    ],
  },
};
