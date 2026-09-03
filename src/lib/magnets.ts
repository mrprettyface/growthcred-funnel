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
    title: "10 Hours Back Playbook",
    promise: "Ten jobs eating your week, and the system that takes each one off you.",
    inside: [
      "One task per day for ten days, in the order that pays back fastest.",
      "For each: the hours it quietly eats, and the system that takes it.",
      "A twenty-minute first step you can finish today, not a reading list.",
      "Built for a South African small business, not a Silicon Valley one.",
    ],
    file: null,
    shape: "10 pages · PDF",
  },
  /**
   * The show-up bonus, not a second opt-in. Roughly a third of registrants
   * normally attend a free class; giving this one away live is the cheapest
   * fix for that, and it is the piece people would otherwise pay for.
   */
  aiPolicy: {
    slug: "ai-policy-sa",
    title: "AI Policy for South African Small Business",
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

/** True once the document actually exists and can be handed over. */
export function isDeliverable(m: Magnet): boolean {
  return Boolean(m.file);
}
