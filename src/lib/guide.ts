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

/** Fired by an in-article "get the guide" button; GuideOffer opens its card. */
export const GUIDE_EVENT = "gc:open-guide";

/**
 * Ask for the opt-in card. GuideOffer is lazy, so a click can land before it
 * has mounted: the flag lets it open on arrival instead of missing the event.
 */
export function requestGuide(): void {
  (window as Window & { __gcGuideRequested?: boolean }).__gcGuideRequested = true;
  window.dispatchEvent(new Event(GUIDE_EVENT));
}

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
    "Most AI projects fail at the same point. They ask your business to change first. New software. A new process. A new way of filing things. And a team that has to learn all of it before anything gets faster. So what happens? Most people quietly go back to the old way within a month.",
    "This guide works the other way round. You keep your tools, your process and your people. AI goes into the steps you already do. In the platforms you already have open. One task at a time. Nothing moves until it has proved itself.",
  ],
  steps: [
    {
      n: "01",
      t: "Find the AI you already have",
      body: [
        "Before you buy anything, look at what's already on your screen. Microsoft 365 and Google Workspace now build AI assistants into many plans. And your team probably already uses a chat assistant like ChatGPT or Claude somewhere. Officially or not.",
        "Write down which of these you already pay for. And which your people already use. That list is your platform. Your job is to use it properly. Not to add to it.",
      ],
    },
    {
      n: "02",
      t: "Map one normal week",
      body: [
        "For one week, list every document and message that leaves your business more than once. Proposals. Quotes. Client updates. Reports. Minutes. Follow-ups. Job descriptions. Standard replies.",
        "Next to each one, note roughly how long it takes and who does it. You're not redesigning anything. You're finding out where your hours already go. That number becomes the baseline you measure against later.",
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
        "AI writes generic work when it knows nothing about you. So fix that once. Write one page. Who you are. Who you serve. What you sell. How you write. The rules you never break. Paste it in at the start of a conversation. Or save it as a project or custom instruction in the tool you already use.",
        "Most people skip this step. It's the one that makes the output sound like your business instead of the internet.",
      ],
    },
    {
      n: "05",
      t: "Turn the task into a brief",
      body: [
        "A prompt is an instruction you type once. A brief is one you save and reuse, so the task comes out the same way every time. A good brief has five parts. The role. The input you'll paste. The output you want. The format. And the checks it must pass.",
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
        "Whoever checked the work before still checks it now. AI takes the blank page and the reformatting. A person still owns what goes out. Write a short review checklist for the task, so your check is quick and consistent.",
        "Decide what never goes into an AI tool. ID numbers. Banking details. Health information. Confidential client material, unless your organisation has approved a tool for it. Under POPIA, personal information needs a reason and protection wherever it goes. That includes a chat window.",
      ],
    },
    {
      n: "07",
      t: "Measure, keep, then add the next one",
      body: [
        "After two weeks, time the same task again against your baseline from step two. Is it faster, with the quality intact? Then the brief becomes part of how the task is done. The next person inherits it. Not faster? Change the brief or drop the task. Either answer is useful.",
        "Then go back to your list from step two and pick the next task. One task at a time. Each one proved before the next. That's how AI ends up in your whole business without anyone changing how they work.",
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
