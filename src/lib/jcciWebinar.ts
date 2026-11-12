/**
 * The JCCI × GrowthCred webinar, in one place.
 *
 * Every fact the registration funnel states about the session lives here, so
 * the page, the two thank-you pages, the Event markup and the gate all read the
 * same numbers. Change the date in one place and the countdown, the calendar
 * link, the reminder copy and the structured data all follow.
 *
 * The session date itself is in `src/lib/webinar.ts` (WEBINAR.startUtc), because
 * the Event markup, the calendar link and every other live-class component were
 * already wired to it. This file holds what is specific to this one event.
 *
 * Attendance is open to everyone, not only JCCI members (Phila, 12 Nov 2026:
 * JCCI is promoting it publicly on LinkedIn). STILL NOT CONFIRMED (see
 * docs/operations/jcci-webinar-reminders.md): whether JCCI is happy for ads to
 * name their membership, and the VIP hour's platform. Anything unconfirmed is
 * written here as a question for Phila, never as a claim on the page.
 */

import { VIP_SEAT, formatPrice } from "./offers";

/** How many VIP seats exist. A real cap, honoured by hand until the plan is live. */
export const VIP_SEATS = 20;

export const JCCI = {
  /** Who the session is with. Shown as a partnership, never as an endorsement. */
  partner: "JCCI",
  /** The webinar's own title, the thing people are registering for. */
  talk: "Prompts Don’t Save Time. Systems Do.",
  /** The platform JCCI runs their sessions on. */
  platform: "Microsoft Teams",
  /** Roughly how long the main session runs. */
  length: "About 60 minutes",
  /** The VIP hour, before the main session. Same day, same timezone. */
  vipWindow: "16:30–17:30",
  /** What a VIP seat costs, read from offers.ts so copy can never drift. */
  vipPrice: formatPrice(VIP_SEAT.amountCents),
} as const;

/**
 * The four engines. Every hour of an owner's week is one of four jobs, so the
 * Operator's Brain has one engine for each.
 */
export const ENGINES = [
  {
    name: "The Brain",
    line: "AI that knows your business, so it never asks twice.",
  },
  {
    name: "The Reply Engine",
    line: "Answers messages the way you would.",
  },
  {
    name: "The Research Engine",
    line: "Finds and checks information for you: clients, tenders, funders.",
  },
  {
    name: "The Admin Engine",
    line: "Quotes, invoices, follow-ups and reports.",
  },
] as const;

/**
 * What you walk away with. Each one is a promise about the session itself, not
 * about a result in someone's business, so each one is deliverable on the night.
 */
export const TAKEAWAYS = [
  {
    title: "Why AI hasn’t saved you time yet, and the one change that fixes it.",
    note: "It isn’t better prompts. It’s one belief most owners have backwards. Once you see it, you can’t unsee it.",
  },
  {
    title: "The 4 jobs that eat every owner’s week.",
    note: "Every hour you work is one of four. Know which one is eating yours and you know where to start.",
  },
  {
    title: "The Operator’s Brain: what it is, and why it works for any business.",
    note: "Big or small. Online or in person. Selling to people or to businesses.",
  },
  {
    title: "Real examples from real South African businesses.",
    note: "What changed for an owner who was answering every WhatsApp by hand, and what it did for my own research.",
  },
  {
    title: "How to stop being the person everyone waits on.",
    note: "Including the question every owner eventually asks: but who trains my staff?",
  },
  {
    title: "Free gifts for everyone who attends live.",
    note: "I’m not saying what they are yet. Stay to the end.",
  },
] as const;

/** Who the session is built for. Three owners, each one a self-recognition test. */
export const OWNERS = [
  {
    label: "You are the business",
    body: "You’re the salesperson, the bookkeeper, the marketer and the admin. Your business can only grow as big as your day. And your day is full.",
  },
  {
    label: "You use ChatGPT, but your week hasn’t changed",
    body: "You’ve tried it. It helps a little. But you still work evenings, and you’re still the one everyone waits on.",
  },
  {
    label: "You want a team, but can’t afford to hire yet",
    body: "You need more hands. An Operator’s Brain gets more done without another salary.",
  },
] as const;

/**
 * The questions people actually ask before registering.
 *
 * These are rendered on the page AND fed to FAQPage markup, so every answer has
 * to be true on its own. The members question comes first, because it is the
 * one that decides whether someone reads the rest. It was left off until it was
 * known: Phila confirmed on 12 Nov 2026 that the session is open to everyone,
 * not only JCCI members, and JCCI is promoting it publicly on LinkedIn.
 */
export const JCCI_FAQ: { q: string; a: string }[] = [
  {
    q: "Do I need to be a JCCI member?",
    a: "No. It’s open to everyone. JCCI is hosting it and sharing it publicly, so bring anyone you think needs it.",
  },
  {
    q: "What if I can’t attend live?",
    a: "Come if you can. The free gifts only go to people who are there live. A VIP seat gets the recording.",
  },
  {
    q: "I’m not techy. Is this for me?",
    a: "Yes. If you can send a WhatsApp, you can follow this.",
  },
  {
    q: "Do I need to pay for any AI tools?",
    a: "No. Everything I show you works with free tools to start.",
  },
  {
    q: "I already use ChatGPT. Will I learn anything?",
    a: "Yes. This isn’t about using ChatGPT. It’s about making it work like a team member instead of a search bar.",
  },
  {
    q: "Is my information safe?",
    a: "Yes. We follow POPIA. I’ll also show you how to keep your clients’ information safe when you use AI.",
  },
];

/**
 * The "why is this free" answer, which gets its own section rather than a line
 * in the accordion, because it is the objection that stops people registering.
 *
 * It is also fed to the page's FAQPage markup, so the question is answered in
 * search as well as on the page. One source, so the two can never disagree.
 */
export const WHY_FREE = {
  q: "Why is this free?",
  a: "Two honest reasons. JCCI wants every member to get ahead with AI, and so do I. That is my part. And after sessions like this, some owners decide they would rather build their Operator’s Brain with me. That is how it pays for itself. If you would rather build it yourself, that is completely fine. You will leave knowing exactly what to build.",
} as const;

/**
 * The client results this page may show.
 *
 * Every one is ALREADY published on this site, named, with that client's
 * permission (src/content/searchPages.ts is the source, and
 * scripts/verify-jcci-webinar.mjs fails the build if a line here is not also
 * there). Nothing may be added to this record that a client has not agreed to.
 *
 * Keyed, so a micro-segment can lift the result closest to its own audience to
 * the top of the column without the page printing it twice.
 */
/*
 * MNE Waste is deliberately NOT in here. Sandile's result is told in full in
 * the autopilot section above this column, where it is the payoff of the whole
 * argument ("if AI can handle that, it can handle what you do"). Listing it
 * here as well would print the same result twice on one page.
 */
export const PROOF = {
  taiAscend: {
    line: "TaiAscend had a document process that took three days. It now takes two hours.",
    quote: null,
    who: null,
  },
  demure: {
    line: null,
    quote: "My Claude has been operating a lot better since the last session.",
    who: "Macaela Oor, Demure International",
  },
} as const;

export type ProofKey = keyof typeof PROOF;

/** The proofs in display order, with `first` lifted to the top if given. */
export function proofOrder(first?: ProofKey | null): ProofKey[] {
  const all = Object.keys(PROOF) as ProofKey[];
  if (!first || !all.includes(first)) return all;
  return [first, ...all.filter((k) => k !== first)];
}

/**
 * The maths behind the Chat Trap calculator.
 *
 * 52 weeks and a 40-hour week, stated on screen. It is deliberately the
 * simplest model a person can check in their head: hours a week, times weeks,
 * times what an hour is worth. No assumed saving, no projected return — the
 * page says in Phila's words that this is simple maths, not a promise.
 */
export const MATH = { weeksPerYear: 52, hoursPerWeek: 40 } as const;

export type ChatTrapCost = {
  hoursYear: number;
  randYear: number;
  weeksLost: number;
};

export function chatTrapCost(hoursPerWeek: number, randPerHour: number): ChatTrapCost {
  const hoursYear = hoursPerWeek * MATH.weeksPerYear;
  return {
    hoursYear,
    randYear: hoursYear * randPerHour,
    weeksLost: Math.round(hoursYear / MATH.hoursPerWeek),
  };
}
