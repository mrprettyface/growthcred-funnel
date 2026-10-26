import type { SearchPage } from "./searchPages";

const PUBLISHED = "2026-10-26";

const call = {
  line: "Bring one job. We will tell you if we can take it off your desk.",
  ask: "Book a call. We will say straight whether this is a fit.",
  cta: { to: "/call", label: "Book a call" },
} as const;

/**
 * The two buyer situations the long-tail guides PR does not cover.
 * Order on the page: their week, a clear answer, how we solve it, one call.
 * No named customer. No measured result we cannot show.
 */
export const SITUATION_PAGES: SearchPage[] = [
  {
    path: "/quoting-uniforms-for-a-security-company",
    kind: "situation",
    published: PUBLISHED,
    title: "Quoting Uniforms for a Security Company | GrowthCred",
    description:
      "Quoting uniforms for a security company with guards on several sites. Keep each site's kit and your prices together. You still sign every quote.",
    heading:
      "You supply a security company with guards on several sites, and every new contract means re-quoting kits by hand.",
    intro:
      "Each site wants its own kit. Each role wears something else. Sizes change. The last order does not match the new one. So you build the quote again, by hand.",
    sections: [
      {
        title: "Where the quote breaks",
        paragraphs: [
          "The kit list sits in a spreadsheet. Or it sits in your head. A new site means a new list. You check every line before anyone may send a price.",
          "Your team can copy the last quote. They still do not know which line changed. So the question comes back to you.",
        ],
      },
      {
        title: "What we set up",
        paragraphs: [
          "We put the kit list and the pricing in one place. Your own private AI, on equipment we set up for you. A new contract starts from the last kit you approved.",
          "You still sign the price. The customer still gets your number, not a guess. Access is by role, so the person quoting sees the kit, not the whole business.",
          "This is the Command Core. One system for the list and the price. Not a rented seat for every clerk.",
        ],
      },
      {
        title: "Start with one contract",
        paragraphs: [
          "Pick one security customer. One set of sites. We load that kit list. You watch the next variation.",
          "We have not published a before-and-after for this. When you can measure yours, it is yours. Until then we will not pretend we have a number.",
        ],
      },
    ],
    faq: [
      {
        q: "Can it handle a different kit per site?",
        a: "Yes, if the kit is written down. Each site and each role keeps its own list. A new quote starts from the list you last approved.",
      },
      {
        q: "Who approves the price?",
        a: "You do. The draft can be prepared for you. It does not go to the customer until you sign it.",
      },
    ],
    close: { ...call, line: "A new site should start from the last kit you approved." },
    ctas: [{ to: "/call", label: "Book a call" }],
    related: ["/senior-dispatcher-on-leave", "/private-ai", "/guides/ai-proposals-and-follow-ups", "/call"],
  },
  {
    path: "/senior-dispatcher-on-leave",
    kind: "situation",
    published: PUBLISHED,
    title: "When a Senior Dispatcher Is on Leave | GrowthCred",
    description:
      "What happens when your senior dispatcher is on leave. The know-how sits in a few heads. Your private AI answers from the source document, by role.",
    heading: "You run a fleet, and when one senior person is on leave, half the questions stop moving.",
    intro:
      "Routes, drivers, the contract rule, the exception from last March. It sits in two heads. One of them is your senior dispatcher. They take leave. The questions queue.",
    sections: [
      {
        title: "Where the know-how sits",
        paragraphs: [
          "A junior can drive the route. They cannot always say why this contract is different. The answer is in a head, or in a file nobody can find.",
          "Calling the person on leave is the usual fix. It works until they do not pick up. Then the day waits.",
        ],
      },
      {
        title: "What we set up",
        paragraphs: [
          "We put that know-how on your own private AI. It runs on equipment we set up for you. It answers with the source document, so your team can see where the answer came from.",
          "Access is by role. A junior sees their job. They do not see the whole business. You decide who may ask what.",
          "It will not invent a rule you never wrote down. If the document is silent, the question still comes to a person. That is the point.",
        ],
      },
      {
        title: "Start with one team",
        paragraphs: [
          "Pick one depot, or one desk. We load the documents that desk actually uses. You see which questions still reach the senior.",
          "We will not quote you a drop in repeat questions. We have not measured one we can show you. You measure yours, then you decide.",
        ],
      },
    ],
    faq: [
      {
        q: "What if the document does not cover the question?",
        a: "The question comes back to a person. The system answers from what you gave it. It does not make up a rule.",
      },
      {
        q: "Does this run when the power is out?",
        a: "Only if we have agreed that, in writing, for your site. We will not claim it. Ask us on the call and we will tell you what your setup can and cannot do.",
      },
    ],
    close: { ...call, line: "Leave should not stop the questions your desk can already answer." },
    ctas: [{ to: "/call", label: "Book a call" }],
    related: ["/quoting-uniforms-for-a-security-company", "/private-ai", "/guides/how-we-work-first-30-days", "/call"],
  },
];
