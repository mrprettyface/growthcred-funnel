/**
 * Micro-segments: the ad's own hook, said back on the page.
 *
 * The ad structure in docs/marketing/jcci-webinar-meta-ads.md runs many small
 * ad sets, each one aimed at an audience that is named in the ad copy itself
 * rather than in Meta's targeting boxes. An ad that opens "Running a waste or
 * logistics business in Joburg?" is only specific until the click: land that
 * person on a page that opens "For South African owners tired of doing
 * everything themselves" and the specificity is thrown away at the door.
 *
 * So each ad set carries `?seg=<slug>` and the hero repeats its own hook.
 *
 * Three rules this file keeps:
 *
 * 1. NO SEGMENT IS A CLAIM. A segment may name the reader's work ("trucks,
 *    drivers, compliance") and the jobs that eat their week. It may never
 *    promise a result, name a client, or imply we have worked in that industry.
 *    Only `proof` does that, and only where a named client has already given
 *    permission and the result is already published on this site.
 * 2. THE HEADLINE NEVER CHANGES. The H1 is prerendered and indexed; swapping it
 *    on the client would mean Google reads one page and visitors see another.
 *    The matched copy sits above and below it.
 * 3. AN UNKNOWN SLUG IS NOT AN ERROR. A typo, a stale ad, a stripped query
 *    string: all fall back to the default hero. Nothing breaks, nobody sees a
 *    blank space where a headline should be.
 */

import type { ProofKey } from "./jcciWebinar";

/** A segment's share of the hero. Short: this is a greeting, not a rewrite. */
export type Segment = {
  /** Replaces the eyebrow above the headline. This is the ad's hook, repeated. */
  eyebrow: string;
  /** One sentence that opens the hero, before the Chat Trap paragraphs. */
  opener: string;
  /**
   * Which ALREADY-PUBLISHED client result (src/lib/jcciWebinar.ts PROOF) sits
   * closest to this audience, lifted to the top of the proof column for them.
   * A key, not a sentence, so a segment can never introduce a claim of its own:
   * the only results that can appear are the ones a named client has agreed to.
   */
  proof: ProofKey | null;
};

/**
 * The segments, one per micro-audience in the ad plan.
 *
 * Keep the slug short and readable: it is visible in the URL of an ad that
 * thousands of people may see, and it is what `utm_content` is matched against
 * when working out what a registration cost.
 */
export const SEGMENTS: Record<string, Segment> = {
  /* ---- Campaign 1: owner-operators running things that move ---- */
  logistics: {
    eyebrow: "For owners running trucks, drivers and compliance",
    opener:
      "Trucks, drivers, compliance, municipal contracts. And every question still comes back to you.",
    /* No lift needed: the autopilot section opens with MNE Waste for them. */
    proof: null,
  },
  security: {
    eyebrow: "For security company owners",
    opener:
      "Rosters, site reports, incident write-ups, client complaints. You are the one who answers all of it.",
    proof: null,
  },
  cleaning: {
    eyebrow: "For cleaning and facilities owners",
    opener:
      "Staff schedules, site checks, quotes, invoices, and the WhatsApps that never stop.",
    proof: null,
  },
  construction: {
    eyebrow: "For construction and trades owners",
    opener:
      "Quotes, variations, site updates, supplier chasing. You price jobs at 10pm because the day is gone.",
    proof: null,
  },

  /* ---- Campaign 2: practices that run on documents ---- */
  consulting: {
    eyebrow: "For consultants and advisory firms",
    opener:
      "Proposals, client reports, research, follow-ups. You sell your thinking, then spend the week typing it up.",
    proof: "taiAscend",
  },
  accounting: {
    eyebrow: "For accounting and bookkeeping practice owners",
    opener:
      "Client queries, month-end, the same explanations typed out again for the fortieth time.",
    proof: null,
  },
  legal: {
    eyebrow: "For attorneys running their own practice",
    opener:
      "Drafting, client updates, matter notes, and the billing you do after everyone has gone home.",
    proof: null,
  },

  /* ---- Campaign 3: the Chat Trap, named outright ---- */
  chatgpt: {
    eyebrow: "For owners who already use ChatGPT and still work evenings",
    opener:
      "You have tried it. It helps a little. You still explain your business to it every single time.",
    proof: null,
  },
  prompts: {
    eyebrow: "For everyone who has saved a list of “best ChatGPT prompts”",
    opener:
      "The prompt list worked once. Then you went back to starting from zero.",
    proof: null,
  },

  /* ---- Campaign 4: Johannesburg and the JCCI room ---- */
  jcci: {
    eyebrow: "For JCCI members",
    opener:
      "This one is free because JCCI wants every member to get ahead with AI. So do I.",
    proof: null,
  },
  joburg: {
    eyebrow: "For owners in Johannesburg",
    opener:
      "I am in Rosebank. The first Operator Intensive ran here, in a room with five owners whose businesses depended entirely on them.",
    proof: null,
  },

  /* ---- Campaign 5: retail and beauty ---- */
  beauty: {
    eyebrow: "For beauty and cosmetics owners",
    opener:
      "Bookings, stock, supplier messages, client follow-ups. All of it comes through your phone.",
    proof: "demure",
  },
  retail: {
    eyebrow: "For retail and e-commerce owners",
    opener:
      "Orders, stock questions, delivery chasing, the same customer messages every day of the week.",
    proof: null,
  },

  /* ---- Campaign 6: the people who are the business ---- */
  solo: {
    eyebrow: "For owners who are still the whole business",
    opener:
      "You are the salesperson, the bookkeeper, the marketer and the admin. Your business can only grow as big as your day.",
    proof: null,
  },
  hiring: {
    eyebrow: "For owners who need another pair of hands and can’t afford one yet",
    opener:
      "You need more done. You do not need another salary before the work is even reliable.",
    proof: null,
  },
};

export type SegmentSlug = keyof typeof SEGMENTS;

const KEY = "gc_seg";

/**
 * The segment for this visit, or null.
 *
 * Read from `?seg=` once and remembered, for the same reason promo.ts and
 * referral.ts do it: React Router drops the query string on the first client
 * navigation, so a visitor who clicks anything would lose the match. Sanitised
 * to a short lowercase slug before it is used as a key or written to a row, so
 * a mangled or hostile value can never reach anything that trusts it.
 */
export function activeSegmentSlug(): string | null {
  if (typeof window === "undefined") return null;

  const clean = (raw: string | null): string | null => {
    const v = (raw ?? "").toLowerCase().replace(/[^a-z0-9-]/g, "").slice(0, 24);
    return v.length ? v : null;
  };

  const fromUrl = clean(new URLSearchParams(window.location.search).get("seg"));
  if (fromUrl) {
    try {
      sessionStorage.setItem(KEY, fromUrl);
    } catch {
      /* private browsing: the match still applies for this page load */
    }
    return fromUrl;
  }

  try {
    return clean(sessionStorage.getItem(KEY));
  } catch {
    return null;
  }
}

/** The segment's copy, or null for no segment, an unknown slug, or on the server. */
export function activeSegment(): (Segment & { slug: string }) | null {
  const slug = activeSegmentSlug();
  if (!slug) return null;
  const segment = SEGMENTS[slug];
  return segment ? { ...segment, slug } : null;
}
