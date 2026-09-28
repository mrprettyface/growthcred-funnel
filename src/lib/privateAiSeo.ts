/**
 * The parts of /private-ai that the site's metadata needs (src/seo/routes.ts
 * builds the FAQPage and Service structured data from them). Kept apart from
 * privateAi.ts so the page's copy stays in the page's own lazy chunk.
 */

export const PRIVATE_AI_PATH = "/private-ai";

/** Short service description for the Service structured data. */
export const PRIVATE_AI_SERVICE =
  "Private AI for South African businesses: your own AI on equipment GrowthCred chooses, deploys and runs, set up around your documents, with custom agents and team training.";

export const PRIVATE_AI_FAQ: { q: string; a: string }[] = [
  {
    q: "What is private AI?",
    a: "It's AI that runs on equipment inside your business, not on someone else's servers. We choose the equipment, set it up on your documents and build agents for your work. Then we keep it running. You own it.",
  },
  {
    q: "Is it as good as ChatGPT?",
    a: "For your own work, it's close enough that the gap stops mattering. Stanford's 2025 AI Index found open-weight models went from 8% behind the closed ones to 1.7% in a single year. For open-ended brainstorming, the biggest rented models still have an edge. We'll tell you straight which one your work needs.",
  },
  {
    q: "Where does our data go?",
    a: "It stays with you. Your AI runs on your own equipment, so your documents aren't sent to an outside AI company. Before anything goes in, we agree in writing who can reach the system, and how.",
  },
  {
    q: "What equipment do we need?",
    a: "You don't buy anything yourself. We choose the equipment that fits your team and your work. We deploy it and we look after it. The details come in your proposal.",
  },
  {
    q: "Do we need our own IT team to run it?",
    a: "No. Running your own AI takes people who look after the equipment, update the models and check the answers. That's the part we do. It's the job most firms can't staff.",
  },
  {
    q: "What does it cost?",
    a: "It depends on your team and how much you'll use it. Your audit works out the set-up cost and when owning beats renting for you. Engagements are limited, so apply first and we'll tell you if it's a fit.",
  },
  {
    q: "Is this the same as the Command Core?",
    a: "Yes. Private AI is what the Command Core runs on. The Command Core is the whole engagement: the audit, your own AI, your agents and your team trained to use it.",
  },
];
