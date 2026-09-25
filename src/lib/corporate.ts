/**
 * /corporate-ai-training — AI training for corporate teams. Every word on the
 * page lives here; src/pages/Corporate.tsx is layout only.
 *
 * The offer (25 September 2026, from Phila): a transformation promise rather
 * than a course — every employee producing documents and reports 3× faster —
 * delivered as workshop-style sessions with guides and packs to follow along,
 * and priced per employee.
 *
 * Honesty rules for this page:
 * - "3×" is the target we train to and measure against a baseline. It is never
 *   stated as a result already achieved at a company.
 * - No per-employee rand price is published until Phila sets one. Pricing is
 *   described, not quoted.
 * - Research figures are third-party, attributed and linked, with the year.
 * - Client proof is the same, already-permissioned proof the rest of the site
 *   carries (see src/lib/home.ts), and nothing more.
 */

/** In-page anchors. Plain <a href="#…">, because the router does not scroll to hashes. */
export const ENQUIRE_ANCHOR = "#enquire";
export const ROI_ANCHOR = "#roi";

export const HERO = {
  eyebrow: "Corporate AI training",
  /** One static <h1>: "Every employee. Every report. 3× faster." */
  headlineLead: "Every employee. Every report.",
  headlineMark: "3× faster.",
  sub: "Hands-on AI training for corporate teams, delivered as live workshops with packs to follow along. We time how long your people take today, train them on their own documents, then measure it again. Priced per employee, against the capacity it returns.",
  cta: "Request a team proposal",
  secondary: "Model your ROI",
  chips: ["Live workshops, in the room or online", "A playbook for every role", "Measured before and after"],
  photo: {
    src: "/images/stories/operators-intensive-session.jpg",
    alt: "Phila Ngwenya facilitating a GrowthCred working session while a participant asks a question",
    width: 1200,
    height: 900,
    caption: "A GrowthCred working session, WeWork Rosebank.",
  },
};

/* ---------------- What they have already tried ---------------- */

export type TriedItem = { scene: "licence" | "lunch" | "module" | "pilot" | "policy"; t: string; b: string };

export const TRIED = {
  eyebrow: "What you've already tried",
  heading: "You bought the licences. The work didn't change.",
  sub: "Most organisations have already spent on AI. The spend shows up in the budget. It rarely shows up in how long the monthly report takes.",
  items: [
    {
      scene: "licence",
      t: "The licence rollout",
      b: "Seats for Copilot or ChatGPT, a launch email, a spike in logins. By week six the usage dashboard tells the real story.",
    },
    {
      scene: "lunch",
      t: "The lunch-and-learn",
      b: "An inspiring hour on what AI can do. Everyone nods. Monday's board pack is built exactly the way it was last month.",
    },
    {
      scene: "module",
      t: "The e-learning module",
      b: "Forty minutes of generic video and a green tick in the LMS. Completion was measured. Capability wasn't.",
    },
    {
      scene: "pilot",
      t: "The innovation pilot",
      b: "One clever proof of concept in one team. It impressed ExCo, then never left the sandbox.",
    },
    {
      scene: "policy",
      t: "The policy memo",
      b: "AI restricted pending review. Meanwhile people paste company documents into personal accounts, because the deadline didn't wait.",
    },
  ] satisfies TriedItem[],
  close: "The tool was never the problem. Nobody connected it to the documents your people actually produce.",
};

/** Third-party research. Each figure is quoted with its source and year, and linked. */
export type Research = { figure: string; line: string; source: string; href: string };

export const RESEARCH = {
  heading: "It isn't just you.",
  items: [
    {
      figure: "95%",
      line: "of enterprise generative-AI pilots delivered no measurable impact on profit and loss.",
      source: "MIT NANDA, The GenAI Divide, 2025",
      href: "https://fortune.com/2025/08/18/mit-report-95-percent-generative-ai-pilots-at-companies-failing-cfo/",
    },
    {
      figure: "39%",
      line: "of people using AI at work had received any AI training from their company.",
      source: "Microsoft & LinkedIn Work Trend Index, 2024",
      href: "https://news.microsoft.com/source/2024/05/08/microsoft-and-linkedin-release-the-2024-work-trend-index-on-the-state-of-ai-at-work/",
    },
    {
      figure: "78%",
      line: "of AI users were bringing their own AI tools to work.",
      source: "Microsoft & LinkedIn Work Trend Index, 2024",
      href: "https://news.microsoft.com/source/2024/05/08/microsoft-and-linkedin-release-the-2024-work-trend-index-on-the-state-of-ai-at-work/",
    },
    {
      figure: "36%",
      line: "of employees feel they have received adequate AI upskilling.",
      source: "BCG, AI at Work, 2026",
      href: "https://www.bcg.com/publications/2026/ai-at-work-why-strategy-matters-more-than-tools",
    },
  ] satisfies Research[],
  note: "Global research. Your organisation's own numbers come from the baseline.",
};

/* ---------------- How this is different ---------------- */

export const DIFFERENT = {
  eyebrow: "The difference",
  heading: "Built on your documents, not the tool's feature list.",
  sub: "Adoption stalls when training teaches the tool and leaves the work alone. We start from the other end.",
  columns: ["Typical AI training", "GrowthCred"],
  rows: [
    { k: "Starts with", them: "The tool and its features", us: "The documents your teams produce every week" },
    { k: "Examples", them: "Generic prompts from another industry", us: "Your own templates, reports and proposals, redacted where needed" },
    { k: "Format", them: "A talk, then back to work", us: "Workshops where every person builds on a real document" },
    { k: "People leave with", them: "Slides and good intentions", us: "A playbook, a prompt library and a context document for their role" },
    { k: "Measured by", them: "Attendance and completion", us: "Minutes per document, before and after" },
    { k: "Priced on", them: "A day rate", us: "Per employee, set against the capacity returned" },
  ],
};

/* ---------------- The transformation ---------------- */

export const TARGET = {
  eyebrow: "The transformation",
  heading: "The target is 3×.",
  body: "A report that takes six hours takes two. Not by skipping review, but by removing what surrounds it: the blank page, the hunt for last month's numbers, the reformatting, the third rewrite for a different audience.",
  /** Illustrative: one report, before and after, in hours. */
  before: 6,
  after: 2,
  label: "One monthly report, in hours",
  disclaimer: "Illustrative. Your baseline sets the real starting point.",
  where: {
    heading: "Where the hours come back from",
    items: [
      "First drafts written from a structured brief, not a blank page",
      "Source material summarised before anyone reads all of it",
      "One document reshaped for the board, the client and the team",
      "House style and formatting applied in seconds",
      "Review checklists that catch errors before a manager does",
    ],
  },
  proof: {
    client: "TaiAscend",
    before: "3 days",
    after: "2 hrs",
    line: "A document process that took three days now takes two hours.",
    href: "/stories",
  },
};

/* ---------------- ROI model ---------------- */

/** Working weeks a year after leave and public holidays, and hours in a week. */
export const WORKING_WEEKS = 46;
export const HOURS_PER_WEEK = 40;

export type RoiInputs = {
  /** People trained. */
  employees: number;
  /** Hours a week each spends producing documents and reports. */
  docHours: number;
  /** Monthly cost to company per employee, in rand. */
  monthlyCtc: number;
  /** How many times faster: 2 (conservative) or 3 (the target). */
  speed: number;
};

export const ROI_DEFAULTS: RoiInputs = { employees: 50, docHours: 8, monthlyCtc: 40000, speed: 3 };

export type RoiResult = {
  hoursBackPerWeek: number;
  hoursBackPerYear: number;
  hourlyCost: number;
  annualValue: number;
  valuePerEmployee: number;
  fte: number;
};

/**
 * The whole model, in one place. Deliberately simple enough to check on a
 * napkin, because a CFO will. scripts/verify-corporate.mjs recomputes it
 * independently from the inputs the page renders.
 */
export function corporateRoi({ employees, docHours, monthlyCtc, speed }: RoiInputs): RoiResult {
  const hoursBackPerWeek = docHours * (1 - 1 / speed);
  const hoursBackPerYear = employees * hoursBackPerWeek * WORKING_WEEKS;
  const hourlyCost = (monthlyCtc * 12) / (WORKING_WEEKS * HOURS_PER_WEEK);
  const annualValue = hoursBackPerYear * hourlyCost;
  return {
    hoursBackPerWeek,
    hoursBackPerYear,
    hourlyCost,
    annualValue,
    valuePerEmployee: employees ? annualValue / employees : 0,
    fte: hoursBackPerYear / (WORKING_WEEKS * HOURS_PER_WEEK),
  };
}

export const ROI = {
  eyebrow: "The business case",
  heading: "What 3× is worth on your headcount.",
  sub: "Move the numbers to match one team. The model is deliberately simple, so you can check it before you take it to ExCo.",
  inputs: {
    employees: { label: "People to train", help: "One department, or the whole organisation." },
    docHours: {
      label: "Hours a week each spends on documents and reports",
      help: "Reports, proposals, board packs, client letters, minutes, SOPs.",
    },
    monthlyCtc: { label: "Average monthly cost to company per person", help: "Salary plus benefits, before tax." },
    speed: { label: "Speed-up", conservative: "2× conservative", target: "3× target" },
  },
  outputs: {
    value: "Capacity returned, per year",
    hours: "Hours returned, per year",
    fte: "Full-time roles of capacity",
    perEmployee: "Value per employee, per year",
  },
  perEmployeeNote:
    "That last figure is the ceiling on what training should cost per head. A per-employee fee well under it is the case for training; one near it is the case against.",
  capacityNote:
    "Capacity is not cash. Saved hours only become savings if output grows or hiring slows, so we agree with you where the hours go before the first session.",
  disclaimer: `Estimate from your inputs: ${WORKING_WEEKS} working weeks, ${HOURS_PER_WEEK}-hour weeks. Not a result measured at your organisation.`,
};

/* ---------------- Delivery ---------------- */

export type Step = { scene: "baseline" | "workshop" | "packs" | "measure"; t: string; b: string };

export const DELIVERY = {
  eyebrow: "Delivery",
  heading: "Workshops your people build in. Packs they keep.",
  steps: [
    {
      scene: "baseline",
      t: "Baseline",
      b: "We time a sample of the documents each team produces today: monthly reports, proposals, board packs, client letters. That is the number we are measured against.",
    },
    {
      scene: "workshop",
      t: "Live workshops",
      b: "Presentation-style sessions, in the room or online, run team by team. Every person works on a real document from their own desk, not a demo on ours.",
    },
    {
      scene: "packs",
      t: "Follow-along packs",
      b: "Each role gets a printed and digital pack to follow during the session and keep afterwards, so the method outlives the day.",
    },
    {
      scene: "measure",
      t: "Measure and report",
      b: "Thirty days later we time the same documents again and report to the sponsor: hours returned, by team, in rand.",
    },
  ] satisfies Step[],
};

export const PACK = {
  eyebrow: "What every employee leaves with",
  heading: "Nobody goes back to a blank page.",
  photo: {
    src: "/images/stories/operators-intensive-room.jpg",
    alt: "A GrowthCred session room set up with a workbook at every seat, and participants at work",
    width: 399,
    height: 306,
    caption: "A pack at every seat, before a GrowthCred session.",
  },
  items: [
    { t: "A step-by-step playbook", b: "The method for their role, written for the AI tool your organisation has approved." },
    { t: "A prompt library", b: "Ready briefs for the ten documents their role produces most." },
    { t: "A team context document", b: "How your organisation works, who it serves and how it writes, so every draft starts informed." },
    { t: "A review checklist", b: "What must be checked before anything leaves the building, and what never goes into an AI tool." },
    { t: "Their own before and after", b: "The time they took on a real document at the baseline, and the time they take now." },
  ],
};

/* ---------------- For the people who sign it off ---------------- */

export type Stakeholder = { scene: "finance" | "people" | "operations" | "risk"; role: string; t: string; b: string };

export const STAKEHOLDERS = {
  eyebrow: "For the people who sign it off",
  heading: "One programme. Four sets of questions answered.",
  items: [
    {
      scene: "finance",
      role: "CFO / FD",
      t: "A rand figure, before and after.",
      b: "The baseline and the thirty-day measurement are in rand per team, so the return is a number, not a feeling.",
    },
    {
      scene: "people",
      role: "HR / L&D",
      t: "Capability that stays when people move.",
      b: "Every role has a written playbook, so new hires inherit the method on day one instead of waiting for the next training budget.",
    },
    {
      scene: "operations",
      role: "COO / Heads of department",
      t: "Shorter cycles on the documents that hold up decisions.",
      b: "The reports, packs and proposals your decisions wait for are the ones we train on first.",
    },
    {
      scene: "risk",
      role: "IT / Risk",
      t: "Inside the tools you already approved.",
      b: "We train on your sanctioned platform, practise on redacted material, and write what may never go into an AI tool into every pack.",
    },
  ] satisfies Stakeholder[],
  dataLink: { to: "/data-and-security", label: "How we handle data and security" },
};

/* ---------------- Pricing ---------------- */

export const PRICING = {
  eyebrow: "Pricing",
  heading: "Priced per employee. Anchored to what it returns.",
  body: "You pay per person trained, so the investment scales with the headcount that produces the return. We quote after the baseline, so the per-employee fee sits beside the per-employee value in the same proposal. If the numbers don't make the case, you'll see that before you sign.",
  tiers: [
    {
      name: "Pilot team",
      scope: "One department, one document type",
      line: "Prove the number on one team before anyone commits to a rollout.",
    },
    {
      name: "Department rollout",
      scope: "Several teams, a pack per role",
      line: "The documents each team produces most, trained team by team, measured team by team.",
    },
    {
      name: "Organisation-wide",
      scope: "Multiple departments or sites",
      line: "Phased across the business, with the baseline and measurement reported to one sponsor.",
    },
  ],
  note: "Every tier is priced per employee. The rate is set in the proposal, after the baseline.",
};

/* ---------------- Who runs the room ---------------- */

export const TRAINER = {
  eyebrow: "Who runs the room",
  heading: "Trained by someone who builds with it every day.",
  photo: {
    src: "/images/phila-team.jpg",
    webp: "/images/phila-team-640.webp 640w, /images/phila-team-900.webp 900w",
    alt: "Phila Ngwenya after an AI talk at WeWork Johannesburg, with the talk's slide on the screen behind",
    width: 900,
    height: 1600,
  },
  /** Follows the founder's name, which the page sets in bold. */
  lead: "founded GrowthCred to put AI to work on the documents that run a business, not to demo it.",
  proof: [
    { k: "7", t: "AI talks at WeWork Johannesburg" },
    { k: "5 / 5", t: "Seats sold at the first Operator Intensive, WeWork Rosebank" },
    { k: "3 days → 2 hrs", t: "A TaiAscend document process, after working with us" },
  ],
  quote: {
    text: "My Claude has been operating a lot better since the last session.",
    by: "Macaela Oor, Demure International",
  },
  stories: { to: "/stories", label: "Read the client stories" },
};

/* ---------------- FAQ ----------------
   Lives in corporateSeo.ts: the site's structured data needs it in the main
   bundle, and the rest of this file should stay in the page's own chunk. */

export { FAQ, CORPORATE_PATH } from "./corporateSeo";

/* ---------------- Enquiry ---------------- */

export const ENQUIRY = {
  eyebrow: "Next step",
  heading: "Request a team proposal.",
  sub: "Tell us the team and the documents that slow it down. We'll come back with a baseline plan and a per-employee quote.",
  sizes: ["10–25 people", "26–100 people", "101–500 people", "500+ people"],
  placeholder: "Which teams, and which documents take too long? For example: monthly management reports, client proposals, board packs.",
  whatsapp: "Hi Phila, I'd like to discuss AI training for my team.",
};
