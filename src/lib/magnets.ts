/**
 * The lead magnets, in one place.
 *
 * Each pack is a slug, a promise, and a file. Leave `file` as null and the page
 * still works: the opt-in is captured and the delivery slot shows a visible
 * TO COME placeholder instead of a download button. That is deliberate -- the
 * funnel can be built, reviewed and even run before the PDFs exist, and at no
 * point does it quietly imply a file that is not there.
 *
 * To ship a pack: put the PDF in `public/downloads/` and set `file` to its
 * path. Nothing else changes.
 */

export type Magnet = {
  /** Stored in magnet_signups.magnet. Give each pack its own, forever. */
  slug: string;
  /** What it is called. NO leading article: callers add 'the'. */
  title: string;
  /** The cover subtitle. What it actually does, in one line. */
  subtitle: string;
  /** The badge on the cover. The concrete thing in the box. */
  badge: string;
  /** The one-line promise. One sentence, no semicolons. */
  promise: string;
  /** What is actually inside. Kept short: four lines, each a real thing. */
  inside: string[];
  /** Path under public/. NULL until the document exists. */
  file: string | null;
  /** Honest size, so nobody expects a book. */
  shape: string;
};

export const MAGNETS = {
  /**
   * The opt-in magnet. Same promise as the live class on purpose: the ad, the
   * page and the pack all say one thing, which is the single biggest lever on
   * opt-in rate.
   */
  playbook: {
    slug: "ten-hours-back",
    title: "10 Hours Back",
    subtitle: "10 things AI can take off your desk. One a day. For ten days.",
    badge: "10-day plan · 10 copy-paste prompts",
    promise: "Ten jobs eating your week, and the system that takes each one off you.",
    inside: [
      "One task per day for ten days, in the order that pays back fastest.",
      "For each: the hours it quietly eats, and the system that takes it.",
      "A twenty-minute first step you can finish today, not a reading list.",
      "Built for a South African small business, not a Silicon Valley one.",
    ],
    file: null,
    shape: "10-day plan · PDF",
  },
  /**
   * The show-up bonus, not a second opt-in. Roughly a third of registrants
   * normally attend a free class; giving this one away live is the cheapest
   * fix for that, and it is the piece people would otherwise pay for.
   */
  aiPolicy: {
    slug: "ai-policy-sa",
    title: "Stop the Leak",
    subtitle: "The 2-page AI policy that keeps your client data out of ChatGPT.",
    badge: "Includes a one-page staff version",
    promise: "Two pages your team can actually follow, written against POPIA.",
    inside: [
      "What staff may put into an AI tool, and what is never allowed near one.",
      "Client data, ID numbers and financials: the lines you do not cross.",
      "Which tools are approved, who signs off, and what happens after a breach.",
      "A template to adapt with your own advisor. It is not legal advice.",
    ],
    file: null,
    shape: "2 pages · PDF",
  },
} as const satisfies Record<string, Magnet>;

export type MagnetKey = keyof typeof MAGNETS;

/**
 * True once the document actually exists and can be handed over.
 *
 * A type guard rather than a boolean, so the delivery branch gets a `file` that
 * is genuinely a string and nobody has to reach for a cast to convince the
 * compiler of something the check already proved.
 */
export function isDeliverable(m: Magnet): m is Magnet & { file: string } {
  return Boolean(m.file);
}

/**
 * The photograph of both covers together.
 *
 * NULL until the file exists, exactly like a pack's `file`: the page then shows
 * a visible TO COME block instead of a broken image, and nobody has to remember
 * that the shot is missing.
 *
 * To ship it: save the photograph as public/images/lead-magnets.jpg and set
 * this to "/images/lead-magnets.jpg".
 */
export const PACK_SHOT: string | null = null;
