/** Two beats only: what you learn, and what you get. No new claims. */
const LESSONS: Record<string, [string, string]> = {
  "/guides/what-to-expect-corporate-ai-training-south-africa": [
    "You learn what a live team session is, and what it will not promise.",
    "You get a way to prepare two real tasks before you ask for a quote.",
  ],
  "/guides/popia-safe-ai-policy-staff-training-checklist": [
    "You learn what staff must keep out of a public chat.",
    "You get a checklist you can use before you allow the tool.",
  ],
  "/guides/live-vs-recorded-ai-training-for-teams": [
    "You learn how a recorded course and a live session differ.",
    "You get a way to choose for an owner, or for a whole team.",
  ],
  "/guides/ai-training-cost-south-africa": [
    "You learn what the R990 workshop buys, and what a team quote is.",
    "You get a comparison you can use before you pay anyone.",
  ],
  "/guides/business-brain": [
    "You learn why a blank brief gives you a generic answer.",
    "You get a short document you can reuse on the next task.",
  ],
  "/guides/ai-proposals-and-follow-ups": [
    "You learn how to draft from facts you already approved.",
    "You get a check so a guess does not leave as a promise.",
  ],
  "/guides/ai-training-vs-automation": [
    "You learn when a workshop fits, and when a build fits.",
    "You get five questions to ask before you choose.",
  ],
  "/guides/ai-automation-cost-south-africa": [
    "You learn what drives a quote, apart from the tool name.",
    "You get a brief you can send before anyone names a price.",
  ],
  "/guides/ai-business-proposals-faster": [
    "You learn why the slow part is rebuilding the brief.",
    "You get a source-bound way to draft, then check, then send.",
  ],
  "/guides/choose-ai-tools-small-business": [
    "You learn to start with one bottleneck, not a tool list.",
    "You get a buying test you can run on your own examples.",
  ],
  "/guides/ai-challenges-south-africa": [
    "You learn why a foreign workflow fails on a South African Tuesday.",
    "You get six checks before you connect a customer channel.",
  ],
  "/guides/how-we-work-first-30-days": [
    "You learn the order: the call, the audit, then a first result.",
    "You get the published guarantee, in the same words as the homepage.",
  ],
  "/guides/admin-assistant-vs-ai-automation": [
    "You learn when a person is the better hire.",
    "You get a way to compare the full cost before you spend.",
  ],
  "/guides/law-firm-billing-leakage": [
    "You learn where a recorded hour fails to become a paid hour.",
    "You get the boundary: a person still checks the bill.",
  ],
  "/guides/can-staff-paste-client-files-into-chatgpt": [
    "You learn why a tool name does not answer the legal question.",
    "You get the checks to make before a real client file goes in.",
  ],
  "/guides/private-ai-popia": [
    "You learn what private AI can change, and what it cannot settle.",
    "You get a first test that uses no personal information.",
  ],
  "/guides/ppe-quotes-without-the-owner": [
    "You learn why the quote still waits on you.",
    "You get the rule: a draft from your list, you still send it.",
  ],
  "/guides/staff-chatgpt-client-files-popia": [
    "You learn there is no blanket yes for client files.",
    "You get the two checks, and a reminder to call a lawyer.",
  ],
  "/guides/stop-training-every-new-hire": [
    "You learn why the next hire still waits on you.",
    "You get a way to start with one role, and still sign the work.",
  ],
  "/guides/free-marketing-tools-before-you-buy": [
    "You learn which free tools to open before you buy another.",
    "You get five questions so a free tool is not an automatic yes.",
  ],
  "/ai-training-for-bargaining-councils-statutory-bodies": [
    "You learn how a live session treats a formal draft.",
    "You get a way to train in smaller groups so the desk stays open.",
  ],
};

export function lessonsFor(path: string, fallback: [string, string]): [string, string] {
  return LESSONS[path] ?? fallback;
}
