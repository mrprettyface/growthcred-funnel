/**
 * /private-ai — the long-form sales page for the Command Core as private AI.
 * Every word on the page lives here; src/pages/PrivateAi.tsx is layout only.
 *
 * Written in the house voice (docs/editorial/VOICE.md). Fact rules:
 * - Every third-party figure was checked against its source on 29 Sep 2026
 *   and is shown with that source linked beside it. See GATES-private-ai.md.
 * - Rejected from Phila's pasted research, because the source did not say it
 *   or could not be found: "9 to 18 months" (the cost paper says otherwise),
 *   the Abacus.AI "zero external servers" law firm, the anonymous Echnotek
 *   case, and "$100k–$500k" licence fees. scripts/verify-private-ai.mjs fails
 *   if any of them comes back.
 * - Altana is not our client, and says so. The only private-AI deployment
 *   GrowthCred has is its own.
 * - No hardware or model names (Phila's rule): the details come in the proposal.
 */

export { PRIVATE_AI_FAQ as FAQ, PRIVATE_AI_PATH } from "./privateAiSeo";

import type { PrivateAiSceneName } from "../components/PrivateAiScenes";

/** A card or row on the page: its drawing, its title, its line, and an optional link. */
export type Item = { scene: PrivateAiSceneName; t: string; b: string; href?: string };

export const APPLY = "/call";

/**
 * GrowthCred's own photos. Captions say only what the photo shows: neither
 * is a private AI deployment, and neither caption says it is.
 */
export const PHOTOS = {
  phila: {
    src: "/images/phila-event.jpg",
    alt: "Phila Ngwenya, founder of GrowthCred, at an event",
    width: 1200,
    height: 1600,
  },
  session: {
    src: "/images/stories/operators-intensive-session.jpg",
    alt: "Business owners working through a GrowthCred session at WeWork Rosebank while Phila answers a question",
    width: 1200,
    height: 900,
    caption: "Training is part of every deployment. This is a GrowthCred working session at WeWork Rosebank: owners building on their own work, not a demo.",
  },
};

export type Source = { label: string; href: string };

export const SRC = {
  harvey: { label: "Harvey, September 2026", href: "https://www.harvey.ai/blog/harvey-raises-dollar550m-at-a-dollar155b-valuation-to-help-legal-teams-own-their-intelligence" },
  aiIndex: { label: "Stanford HAI, AI Index 2025", href: "https://hai.stanford.edu/ai-index/2025-ai-index-report" },
  costStudy: { label: "Pan et al., cost-benefit study, 2025", href: "https://arxiv.org/abs/2509.18101" },
  altana: { label: "Databricks customer story: Altana", href: "https://www.databricks.com/customers/altana-ai" },
  workTrend: { label: "Microsoft & LinkedIn Work Trend Index, 2024", href: "https://news.microsoft.com/source/2024/05/08/microsoft-and-linkedin-release-the-2024-work-trend-index-on-the-state-of-ai-at-work/" },
  popia: { label: "POPIA, section 72", href: "https://popia.co.za/section-72-transfers-of-personal-information-outside-republic/" },
} satisfies Record<string, Source>;

export const HERO = {
  eyebrow: "Private AI · The Command Core",
  headlineLead: "Stop renting your intelligence.",
  headlineMark: "Own it.",
  sub: "Every prompt your team types goes to someone else's servers. Every seat is a bill that never ends. Private AI puts your own AI on your own equipment, set up around your business. We choose it. We deploy it. We run it. You own it.",
  cta: "Apply for the Command Core",
  secondary: "See what it costs",
};

export const PAIN = {
  eyebrow: "Your week, on rented AI",
  heading: "You already use AI. You just don't own any of it.",
  paras: [
    "Look at your team's week. Someone pastes a client contract into a chat window to summarise it. Someone else drafts a proposal on a personal account. It's quicker. So they do it.",
    "Where did that contract go? To a server you've never seen. In a country you didn't choose. Under terms nobody read.",
  ],
  stat: {
    figure: "78%",
    line: "of people using AI at work were bringing their own tools. That was 2024. Is your team different?",
    source: SRC.workTrend,
  },
  punch: "Your best information is leaving the building. One paste at a time.",
};

export const RENT = {
  eyebrow: "Put a number on it",
  heading: "What is renting really costing you?",
  paras: [
    "Take one AI seat. What does it cost you a month? Now times your headcount. Now times 12.",
    "Next year you do it again, with more people. The bill never stops. And at the end of it, you own nothing.",
  ],
  popia: {
    lead: "Then there's the cost you won't see on an invoice.",
    body: "Under POPIA section 72, sending personal information to a company in another country needs adequate protection or the person's consent. Every client file pasted into a foreign AI tool is one of those transfers. Who signed off on it?",
    source: SRC.popia,
  },
  punch: "Renting is fine for a year. Not for your company's brain.",
};

export const FIXES = {
  eyebrow: "The usual fixes",
  heading: "Why banning it, buying seats or building it yourself doesn't work.",
  items: [
    { scene: "ban", t: "Ban it.", b: "People use it anyway, on their phones. Now you have all the risk and none of the control." },
    { scene: "seats", t: "Buy enterprise seats.", b: "Better terms. Same problem. Your data still leaves, and the bill still grows with every hire." },
    { scene: "build", t: "Build it yourself.", b: "Running your own AI takes people who look after the equipment, update the models and check the answers. Most firms don't have that team. Without it, the system slowly gets worse." },
  ] as Item[],
  punch: "You don't need a data science department. You need someone to be one for you.",
};

export const OWN = {
  eyebrow: "The fix",
  heading: "Your own AI. Run for you.",
  lead: "Private AI means the AI runs on equipment inside your business. Not ours. Not a tech giant's. Yours. We choose the equipment that fits. We set it up on your documents and build agents for your work. Then we keep it running.",
  proofs: [
    { scene: "stays", t: "Your data stays in the building.", b: "Contracts, client files and numbers never go to an outside AI company. POPIA gets simpler, not scarier." },
    { scene: "flat", t: "The cost stops climbing.", b: "You pay to set it up and to run it. Not per person. Your next hire uses it without a new seat." },
    { scene: "knows", t: "It knows your business.", b: "It's set up on your templates, your past work and the way you write. So it starts every task already knowing you." },
  ] as Item[],
  guide: "If this sounds like you, get the AI Implementation Guide. It's the method we start every client on, free.",
};

export const EVIDENCE = {
  eyebrow: "This isn't a fringe idea",
  heading: "The market is already moving this way.",
  items: [
    {
      figure: "$15.5 billion",
      body: "Harvey, the legal AI company, raised $550 million at a $15.5 billion valuation. Their stated mission? To help legal teams own their intelligence.",
      source: SRC.harvey,
    },
    {
      figure: "1.7%",
      body: "The quality gap has almost closed. Open-weight models, the kind you can run yourself, went from 8% behind the closed ones to 1.7% in a single year.",
      source: SRC.aiIndex,
    },
    {
      figure: "20 times faster",
      body: "Altana, a supply chain company, built its AI on open models and its own private data. It now trains and deploys models more than 20 times faster, with 20–50% better performance. Not our client. Reported by Databricks.",
      source: SRC.altana,
    },
  ],
  own: "And me? I run GrowthCred on our own private AI. I wouldn't sell you something I don't use.",
};

export const COST = {
  eyebrow: "What it costs, honestly",
  heading: "Rent or buy? Here's the maths.",
  lead: "Owning costs more on day one. Renting costs more every day after that. So when does owning win?",
  study: "A 2025 study by Pan and colleagues worked it out for firms running their own AI.",
  rows: [
    { size: "Small set-ups", months: "within 3 months" },
    { size: "Medium set-ups", months: "about 4 to 34 months" },
    { size: "The largest set-ups", months: "up to 69 months" },
  ],
  label: "Time for owning to pay for itself, against renting",
  source: SRC.costStudy,
  close: "Where do you land? It depends on how much your team uses it. That's what your audit works out, before you commit to any equipment.",
  punch: "You don't guess. You see the numbers first.",
};

export const WHO = {
  eyebrow: "Who it's for",
  heading: "Who should own their AI first?",
  lead: "Anyone whose documents would hurt if they leaked.",
  items: [
    { scene: "law", t: "Law firms", b: "Privileged client files and case documents that can't sit on anyone else's servers.", href: "/ai-for-law-firms" },
    { scene: "finance", t: "Financial services", b: "Client money, records and advice, with the regulator watching.", href: "/ai-for-financial-services" },
    { scene: "health", t: "Healthcare", b: "Patient records that POPIA treats as special personal information." },
    { scene: "owner", t: "Owner-led firms", b: "Proposals, pricing and client lists. The things your competitors would love to read." },
  ] as Item[],
};

export const WRONG = {
  eyebrow: "When it's the wrong call",
  heading: "When private AI isn't for you. Yet.",
  items: [
    { scene: "messy", t: "Your files are a mess.", b: "AI is only as good as what you feed it. If your documents are scattered and out of date, we fix that first. It takes time. We'll tell you how much." },
    { scene: "bulb", t: "You want a creative all-rounder.", b: "For open-ended brainstorming, the biggest rented models still have an edge. Private AI wins on your own documents and your own processes." },
    { scene: "seed", t: "Your team barely uses AI yet.", b: "Start smaller. Our corporate training gets them using it on their real work first.", href: "/corporate-ai-training" },
  ] as Item[],
  punch: "I'd rather lose a sale than sell you the wrong thing.",
};

export const HOW = {
  eyebrow: "How it works",
  heading: "Three steps. You own the result.",
  steps: [
    { scene: "audit", t: "Audit", b: "We map where your week goes, what your documents look like and how much you'd use it. You see when owning beats renting." },
    { scene: "deploy", t: "Deploy", b: "We choose and set up the equipment, load your documents, build your agents and train your team. First result in 14 days." },
    { scene: "embed", t: "Embed", b: "We keep it running. Better models go in as they come out. Hours back tracked every month." },
  ] as Item[],
};

export const GUARANTEE = {
  lead: "20% of your week back.",
  accent: "Or you don't pay.",
  body: "If the Command Core doesn't give you back at least 20% of your week, the engagement is on us.",
};

export const CLOSE = {
  heading: "Every month you rent, you pay for intelligence you'll never own.",
  sub: "Want us to do this for you? Apply.",
  cta: "Apply for the Command Core",
};
