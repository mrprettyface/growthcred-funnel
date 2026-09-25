/**
 * The parts of /corporate-ai-training that the site's metadata needs on every
 * page (src/seo/routes.ts builds the FAQPage and Service structured data on
 * client navigation, so it ships in the main bundle). Kept apart from
 * corporate.ts so the page's copy stays in the page's own lazy chunk.
 */

export const CORPORATE_PATH = "/corporate-ai-training";

/** Short service description for the Service structured data. */
export const CORPORATE_SERVICE =
  "Hands-on AI training for corporate teams: live workshops with follow-along packs, measured before and after, priced per employee.";

/** Visible on the page and emitted as FAQPage structured data, so the two must match. */
export const FAQ: { q: string; a: string }[] = [
  {
    q: "What does corporate AI training from GrowthCred include?",
    a: "A baseline of how long your teams take on their real documents, live workshop sessions run team by team, a follow-along pack for every role, and a measurement thirty days later reported to your sponsor in hours and rand.",
  },
  {
    q: "How do you measure 3× faster?",
    a: "Before training we time a sample of real documents per team, at the review standard you already use. Thirty days after, we time the same kinds of document again. 3× is the target we train to; the report shows the measured number, whatever it is.",
  },
  {
    q: "How is corporate AI training priced?",
    a: "Per employee trained. We quote after the baseline, so the fee is set against the capacity it returns. The number of people, teams and role-specific packs changes the quote.",
  },
  {
    q: "Which AI tools do you train on?",
    a: "Whichever platform your organisation has approved, such as Microsoft Copilot, ChatGPT, Claude or Gemini. The method stays the same; the packs are written for your tool.",
  },
  {
    q: "Is the training in person or online?",
    a: "Either. Sessions run in the room in Johannesburg, or online for teams elsewhere in South Africa and abroad.",
  },
  {
    q: "What about confidential information and POPIA?",
    a: "Practice uses redacted or fictional material, and every pack sets out what may never go into an AI tool. Training happens inside your approved, company-controlled accounts. Training alone does not make a workflow compliant; your policies and legal team still decide.",
  },
  {
    q: "Do our people need to be technical?",
    a: "No. If they can write an email and work in a spreadsheet, they can do this. Every session is built around documents they already produce.",
  },
  {
    q: "Is the training accredited?",
    a: "No. This is practical workplace training, not an accredited qualification, and no accreditation is claimed.",
  },
];
