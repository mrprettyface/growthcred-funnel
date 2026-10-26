/**
 * Content compass: 34 customer-search question shapes.
 *
 * The shapes follow Neil Patel's public reel De7T-h6Dg8J, in that order.
 * Slots are filled in the browser. Empty slots stay as placeholders.
 * Nothing here calls an API, ranks a site, or starts a comment-to-DM flow.
 */

export const PLACEHOLDERS = {
  service: "[your service]",
  company: "[your company]",
  competitor: "[competitor]",
} as const;

/** X, then optional company, then optional competitor (also used as Y). */
export type CompassFields = {
  service: string;
  company: string;
  competitor: string;
};

export type CompassSlots = {
  service: string;
  company: string;
  competitor: string;
};

/**
 * Exact shapes, in reel order. {service} is X. {competitor} is Y and the
 * named competitor. {company} is the company slot.
 */
export const QUESTION_TEMPLATES = [
  "How much does {service} cost?",
  "How long does {service} last?",
  "Who's the best {service} near me?",
  "When should I get {service}?",
  "Why does my {service} keep breaking?",
  "Which {service} is best?",
  "Can I fix {service} myself?",
  "Will insurance cover my {service}?",
  "Do I ever need {service}?",
  "Should I repair or replace {service}?",
  "Is {service} worth it?",
  "Is {service} safe?",
  "{service} versus {competitor}",
  "{service} or {competitor}?",
  "{service} companies like {competitor}",
  "Alternatives to {service}",
  "{company} reviews",
  "{service} near me",
  "{service} open now",
  "Same-day {service}",
  "{service} for beginners",
  "{service} with bad credit",
  "{service} without insurance",
  "Cheapest {service}",
  "Most popular {service}",
  "Emergency {service}",
  "Problems with {service}",
  "{service} mistakes to avoid",
  "{service} before and after",
  "How long does {service} take?",
  "What happens after {service}?",
  "Can I pay for {service} monthly?",
  "Free {service} quote",
  "Is {company} a scam?",
] as const;

/** Example nouns. Each one fills only the service field. No prices. */
export const EXAMPLE_GROUPS = [
  { id: "growthcred", label: "GrowthCred examples", values: ["private AI", "Company Brain", "Quote Engine"] },
  { id: "kforce", label: "K Force examples", values: ["conti suits", "security uniforms"] },
] as const;

const SLOT = /\{(service|company|competitor)\}/g;

export function cleanSlot(value: string, placeholder: string) {
  const trimmed = value.replace(/\s+/g, " ").trim();
  return trimmed || placeholder;
}

export function slotsFrom(fields: CompassFields): CompassSlots {
  return {
    service: cleanSlot(fields.service, PLACEHOLDERS.service),
    company: cleanSlot(fields.company, PLACEHOLDERS.company),
    competitor: cleanSlot(fields.competitor, PLACEHOLDERS.competitor),
  };
}

export function fillTemplate(template: string, slots: CompassSlots) {
  return template.replace(SLOT, (_, key: keyof CompassSlots) => slots[key]);
}

export function questionsFor(fields: CompassFields) {
  const slots = slotsFrom(fields);
  return QUESTION_TEMPLATES.map((template) => fillTemplate(template, slots));
}

export function numberedQuestions(lines: readonly string[]) {
  return lines.map((line, index) => `${index + 1}. ${line}`).join("\n");
}

export function questionsMarkdown(lines: readonly string[], fields: CompassFields) {
  const slots = slotsFrom(fields);
  return [
    "# 34 ways customers search",
    "",
    `What you sell: ${slots.service}`,
    `Your company: ${slots.company}`,
    `Competitor: ${slots.competitor}`,
    "",
    numberedQuestions(lines),
    "",
  ].join("\n");
}

/** File stem for a download. Empty service stays generic. */
export function downloadBasename(service: string) {
  const slug = service
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
  return slug ? `content-compass-${slug}` : "content-compass";
}
