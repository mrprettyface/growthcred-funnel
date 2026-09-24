/**
 * The homepage (/) — "The Command Core". Every word on the page lives here.
 *
 * Home.tsx and its crash fallback HomeFallback.tsx both read from this file,
 * so the two can never drift. Edit copy here, not in the components.
 *
 * The proof on this page (the company names, the talks, the Parliament
 * presentation, the capacity range and the benchmarks) was supplied by Phila
 * on 24 September 2026 for publication. The before/after figures are shown as
 * illustrative benchmarks and must keep that label next to them.
 */

/** Where every "Apply" goes. The call is earned through an application. */
export const APPLY_HREF = "/call";

export const HERO = {
  eyebrow: "The Command Core",
  /** One static, prerendered <h1>: two beats, the second in gold. */
  headlineLead: "20–40% of your time drain.",
  headlineAccent: "Gone.",
  sub: "Founder-grade operations deployed across every department. 80% of your effectiveness. Without you in the room.",
  cta: "Apply to Work With Us",
  scarcity: "Engagements are limited. Not every application is accepted.",
} as const;

/** The proof strip, as typeset names. */
export const COMPANIES = [
  "WeWork",
  "TaiAscend",
  "Melsoft Academy",
  "MpiloTech",
  "Ncedo Afrika",
  "MNE Waste",
] as const;

export const PROOF_LINE =
  "7 AI talks at WeWork Johannesburg. AI system presented at Parliament, Cape Town.";

export const CAPACITY = {
  lead: "Owner-led firms at R20M–R100M lose an estimated",
  figure: "R3M–R10M",
  tail: "a year in capacity trapped in the founder.",
  notThis: "Not in bad hires. Not in wasted spend.",
  butThis: "In the founder doing R200/hour work when their decisions are worth R20,000/hour.",
  closeA: "That's not a strategy failure.",
  closeB: "It's an infrastructure gap.",
  /** The two hourly figures the comparison bar is drawn from. */
  lowRate: 200,
  highRate: 20000,
};

/** Before/after. `from`/`to` are the same quantity in one unit, for the bars. */
export type Benchmark = {
  metric: string;
  before: string;
  after: string;
  from: number;
  to: number;
};

export const BEFORE_AFTER = {
  eyebrow: "Before / After",
  heading: "What changes.",
  rows: [
    { metric: "Owner hours per week", before: "65", after: "35", from: 65, to: 35 },
    { metric: "Proposal turnaround", before: "3 days", after: "3 hrs", from: 72, to: 3 },
    { metric: "Lead follow-up", before: "48 hrs", after: "4 min", from: 48 * 60, to: 4 },
    { metric: "Deals lost to slow response", before: "20%", after: "2%", from: 20, to: 2 },
  ] satisfies Benchmark[],
  /** Must stay beside the figures wherever they render. */
  disclaimer: "Illustrative benchmarks. Results vary by engagement.",
};

export type Stage = { band: string; family: string; name: string; line: string };

export const STAGES = {
  eyebrow: "Engagements",
  heading: "Pick your stage.",
  items: [
    {
      band: "R5M–R50M",
      family: "Command Core",
      name: "Velocity",
      line: "New speed operations deployed in one day. Time drain reduced 20–40% before you leave the room.",
    },
    {
      band: "R50M–R200M",
      family: "Command Core",
      name: "Integration",
      line: "Departmental implementation of founder-grade operations across sales, delivery, and admin. 80% founder effectiveness per department. 90 days.",
    },
    {
      band: "R200M+",
      family: "Command Core",
      name: "Transformation",
      line: "Full operating model produced and deployed. Cost transformation plans across every department. Custom scope.",
    },
  ] satisfies Stage[],
};

export const METHOD = {
  eyebrow: "The Method",
  heading: "Three steps.",
  steps: [
    {
      t: "Audit",
      b: "Find where the founder is the bottleneck. Put a rand value on every hour trapped in low-leverage work.",
    },
    {
      t: "Deploy",
      b: "Install operations that replicate the founder's judgment across each department. First result in 14 days.",
    },
    {
      t: "Embed",
      b: "Ongoing optimisation. New capabilities every quarter. Performance tracked monthly.",
    },
  ],
};

export const FOUNDER = {
  name: "Phila Ngwenya",
  title: "Founder, GrowthCred",
  /** The bio, one line per credential, in the order Phila wrote it. */
  credentials: [
    "Built 5 companies with AI.",
    "Co-developed an AI system presented at Parliament, Cape Town.",
    "7 talks at WeWork Johannesburg.",
    "Rosebank, South Africa.",
  ],
};

export const GUARANTEE = {
  lead: "20 hours back.",
  accent: "Or you don't pay.",
  body: "If the Command Core doesn't reclaim at least 20 hours of your week, the engagement is on us.",
};

export const CLOSE = {
  heading: "Your business is losing capacity every week you wait.",
  sub: "Engagements are limited. Apply and we'll determine fit.",
  cta: "Apply",
};

/* ---------------- Stories: the proof behind the claims ---------------- */

export type HomeStory = {
  href: string;
  client: string;
  /** What the business does, as a short label. */
  sector: string;
  headline: string;
  body: string;
  image?: { src: string; alt: string; width: number; height: number };
  /** The client's own words, verbatim. */
  quote?: string;
  /** A before/after the client reported. */
  stat?: { before: string; after: string };
};

export const STORIES = {
  eyebrow: "Client stories",
  heading: "This isn't theory.",
  sub: "Different industries, one method. The system is built from your knowledge, not a template.",
  all: "Read all client stories",
  items: [
    {
      href: "/stories/mne-waste",
      client: "MNE Waste",
      sector: "Waste management",
      headline: "An Operator's Brain, built in one day.",
      body: "Sandile runs trucks, drivers, compliance and municipal contracts. He built his Operator's Brain at the first Operator Intensive and is now fully operational.",
      image: {
        src: "/images/stories/operators-intensive-session.jpg",
        alt: "Owners working through the first Operator Intensive at WeWork Rosebank",
        width: 390,
        height: 292,
      },
    },
    {
      href: "/stories/demure-international",
      client: "Demure International",
      sector: "Beauty & cosmetics",
      headline: "A sharper AI after one session.",
      quote: "My Claude has been operating a lot better since the last session.",
      body: "Macaela Oor runs orders, inventory, client bookings and brand content for Enigma Essentials.",
    },
    {
      href: "/stories",
      client: "TaiAscend",
      sector: "Client result",
      headline: "A three-day document, done in two hours.",
      stat: { before: "3 days", after: "2 hrs" },
      body: "A document process that took three days now takes two hours.",
    },
    {
      href: "/stories/operators-intensive-wework-rosebank",
      client: "Operator Intensive",
      sector: "WeWork Rosebank",
      headline: "Five seats. Sold out.",
      body: "Owners whose businesses depended entirely on them walked out with working systems.",
      image: {
        src: "/images/stories/operators-intensive-sold-out.jpg",
        alt: "GrowthCred announcement: Your week is sold out",
        width: 390,
        height: 330,
      },
    },
  ] satisfies HomeStory[],
};

/* ---------------- Other ways in (and the rest of the site) ---------------- */

export const WAYS = {
  eyebrow: "Other ways in",
  heading: "Not ready for an engagement?",
  sub: "Start with the part that fits where you are. Every route is built on the same method.",
  items: [
    {
      href: "/ai-automation-south-africa",
      title: "AI automation, done for you",
      line: "We identify your repetitive work and build AI-assisted workflows around it, with your team.",
    },
    {
      href: "/ai-training-south-africa",
      title: "AI training for owners",
      line: "Learn to use AI on the work your business already does: proposals, research, follow-ups and admin.",
    },
    {
      href: "/workshop",
      title: "The one-day online workshop",
      line: "Build your first systems yourself, guided, in one day. Bring a laptop and real work.",
    },
    {
      href: "/webinar",
      title: "The free online class",
      line: "A practical first hour on giving AI the context your business needs.",
    },
  ],
};

export const GUIDES = {
  eyebrow: "The field guide",
  heading: "Articles for owners who want AI to do real work.",
  all: "Browse every guide",
};

/* ---------------- FAQ ---------------- */

export const FAQ: { q: string; a: string }[] = [
  {
    q: "What is the Command Core?",
    a: "Founder-grade operations deployed across every department of an owner-led business: AI systems built from your own knowledge, so the work stops waiting for you.",
  },
  {
    q: "Who is it for?",
    a: "Owner-led businesses where the founder is the bottleneck, from R5M to over R200M in revenue. Pick your stage above; the engagement changes with the size of the business.",
  },
  {
    q: "How is this different from using ChatGPT on its own?",
    a: "A raw AI tool knows nothing about your business, so it gives answers that could be for anyone. We build the system from your knowledge — how you run, who you serve, how you speak — so every task starts with full context.",
  },
  {
    q: "Does it work in my industry?",
    a: "MNE Waste runs trucks, drivers, compliance and municipal contracts. Demure International runs a beauty and cosmetics brand. The system is built from your knowledge, not a template, so the industry changes and the method does not.",
  },
  {
    q: "How is it different from the one-day workshop?",
    a: "The workshop is a one-day online session where you build your first systems yourself. The Command Core is an engagement: we audit, deploy and embed founder-grade operations across your departments.",
  },
  {
    q: "What does it cost?",
    a: "It depends on your stage and scope, and transformation engagements are custom-scoped. Engagements are limited: apply and we'll determine fit.",
  },
  {
    q: "Where is GrowthCred based?",
    a: "GrowthCred is founder-led from Rosebank, Johannesburg, South Africa.",
  },
];
