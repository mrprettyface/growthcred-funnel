import type { ArtName } from "./ArticleFigures";

export type ArtMotion = "pointer" | "bubble" | "ring";
export type ArtSlot = { name: ArtName; alt: string; caption: string; motion?: ArtMotion };

/** Hero plus up to three section drawings. Captions are labels, not new claims. */
const ART: Record<string, { hero: ArtSlot; inline: ArtSlot[] }> = {
  "/guides/what-to-expect-corporate-ai-training-south-africa": {
    hero: { name: "live", alt: "A trainer and two people working on a document in a live session", caption: "Live practice on your own documents" },
    inline: [
      { name: "paste", alt: "A person turning away from a chat window as a file moves toward it", caption: "One paste can expose a file", motion: "ring" },
      { name: "split", alt: "A paused video on the left and a live table of people on the right", caption: "Video on one side, live work on the other", motion: "pointer" },
      { name: "check", alt: "A person checking a draft with a mark on the page", caption: "A person checks the facts", motion: "bubble" },
      { name: "groups", alt: "Two small groups, with one person still at a desk", caption: "Two groups, one desk still covered", motion: "pointer" },
      { name: "split", alt: "Two cards, one for a team session and one for an owner day", caption: "Team session or owner day", motion: "pointer" },
    ],
  },
  "/guides/popia-safe-ai-policy-staff-training-checklist": {
    hero: { name: "lock", alt: "A person beside a locked folder", caption: "Personal files stay out of the chat" },
    inline: [
      { name: "paste", alt: "A chat window beside a person, with a ring on the warning", caption: "A chat box is not a scratchpad", motion: "pointer" },
      { name: "list", alt: "A short list and a person with a hand raised", caption: "Five rules a busy person can say", motion: "bubble" },
      { name: "list", alt: "A checklist with a pointer on the sign-off line", caption: "The checklist before you allow the chat", motion: "pointer" },
      { name: "split", alt: "A raw file on the left and a stripped page with a check on the right", caption: "Strip the file, then check the draft", motion: "pointer" },
      { name: "check", alt: "A checked page beside a person, marking training apart from legal review", caption: "Training here, legal review beside it", motion: "bubble" },
    ],
  },
  "/guides/live-vs-recorded-ai-training-for-teams": {
    hero: { name: "split", alt: "One person at a video and a team in a live session", caption: "A video alone, or a live session together" },
    inline: [
      { name: "video", alt: "A paused video beside a person under a stack of work", caption: "A video waiting on a busy week", motion: "pointer" },
      { name: "live", alt: "A team at a table working on one sheet", caption: "The team on one real task", motion: "bubble" },
      { name: "split", alt: "Two paths, one to a team session and one to an owner workshop", caption: "Team path or owner path", motion: "pointer" },
      { name: "check", alt: "A card that says the draft still needs a person", caption: "A person still checks the draft", motion: "bubble" },
    ],
  },
  "/guides/ai-training-cost-south-africa": {
    hero: { name: "scale", alt: "A balance scale beside a person comparing two options", caption: "Compare the format before the price" },
    inline: [
      { name: "table", alt: "A three-column comparison and a person pointing at the scope", caption: "Three formats, side by side", motion: "pointer" },
      { name: "list", alt: "A five-line checklist with a mark on the cost terms", caption: "Five questions before you pay", motion: "bubble" },
      { name: "scale", alt: "A scale with hours on one side and a checked page on the other", caption: "Hours in a room, or a Monday workflow", motion: "pointer" },
      { name: "split", alt: "An owner workshop card beside a team session card", caption: "Owner day or team session", motion: "bubble" },
    ],
  },
  "/guides/business-brain": {
    hero: { name: "blank", alt: "A person looking at a page with one gold line", caption: "The page starts empty" },
    inline: [
      { name: "list", alt: "A clipboard checklist", caption: "Write the facts once" },
      { name: "check", alt: "A person checking a document", caption: "Then test it on one task" },
      { name: "lock", alt: "A locked folder", caption: "Keep private facts out" },
    ],
  },
  "/guides/ai-proposals-and-follow-ups": {
    hero: { name: "check", alt: "A person reviewing a multi-line document", caption: "A draft, then a check" },
    inline: [
      { name: "blank", alt: "A nearly blank document", caption: "Start from approved facts" },
      { name: "quote", alt: "A document beside a question mark", caption: "A missing price stays a question" },
      { name: "list", alt: "A review checklist", caption: "Check before you send" },
    ],
  },
  "/guides/ai-training-vs-automation": {
    hero: { name: "split", alt: "A person learning on the left and a working session on the right", caption: "Learn it, or have it built" },
    inline: [
      { name: "live", alt: "A live workshop with a trainer", caption: "The workshop is one day" },
      { name: "tools", alt: "A laptop, a document and a marked tool", caption: "A build crosses systems" },
      { name: "scale", alt: "A scale comparing two choices", caption: "Compare the work, not the label" },
    ],
  },
  "/guides/ai-automation-cost-south-africa": {
    hero: { name: "scale", alt: "A balance scale", caption: "Setup on one side, running costs on the other" },
    inline: [
      { name: "list", alt: "A scoping checklist", caption: "What a quote has to know" },
      { name: "quote", alt: "A person next to a priced page", caption: "No single price on this page" },
      { name: "check", alt: "A person signing off a page", caption: "Agree the test before the build" },
    ],
  },
  "/guides/ai-business-proposals-faster": {
    hero: { name: "blank", alt: "A person in front of a sparse document", caption: "The blank page is the brief" },
    inline: [
      { name: "list", alt: "A checklist of proposal pieces", caption: "Four facts, written once" },
      { name: "check", alt: "A reviewer marking a draft", caption: "Check the price before it leaves" },
      { name: "clock", alt: "A clock beside a document", caption: "Time the whole job" },
    ],
  },
  "/guides/choose-ai-tools-small-business": {
    hero: { name: "tools", alt: "A laptop, a document and a simple tool", caption: "Start with the task" },
    inline: [
      { name: "scale", alt: "A scale", caption: "The smallest tool that fits" },
      { name: "list", alt: "A buying checklist", caption: "Six questions before you pay" },
      { name: "check", alt: "A person checking ten examples as one page", caption: "Prove it on your own work" },
    ],
  },
  "/guides/ai-challenges-south-africa": {
    hero: { name: "lock", alt: "A person beside a locked folder", caption: "Local rules, not a foreign template" },
    inline: [
      { name: "paste", alt: "A file next to a chat window", caption: "Paid is not the same as safe" },
      { name: "groups", alt: "Two small groups of people", caption: "The channel your customers already use" },
      { name: "check", alt: "A person reviewing a page", caption: "A person still decides" },
    ],
  },
  "/guides/how-we-work-first-30-days": {
    hero: { name: "list", alt: "A checklist of the first steps", caption: "The first month, in order" },
    inline: [
      { name: "clock", alt: "A clock next to notes", caption: "The audit names the hours" },
      { name: "check", alt: "A checked document", caption: "A first result you can test" },
      { name: "live", alt: "A working session", caption: "Then the team runs it" },
    ],
  },
  "/guides/admin-assistant-vs-ai-automation": {
    hero: { name: "hire", alt: "Two people on the left and one person with a document on the right", caption: "A person, or a system" },
    inline: [
      { name: "clock", alt: "A clock and a stack of notes", caption: "Start with the hours" },
      { name: "check", alt: "A person reviewing a draft", caption: "Judgement stays with you" },
      { name: "scale", alt: "A scale", caption: "Compare the full cost" },
    ],
  },
  "/guides/law-firm-billing-leakage": {
    hero: { name: "clock", alt: "A clock beside an invoice page", caption: "Hours worked, hours billed" },
    inline: [
      { name: "blank", alt: "A sparse timesheet", caption: "The time that never gets written" },
      { name: "check", alt: "A person checking a bill", caption: "A person still approves the bill" },
      { name: "list", alt: "A short checklist", caption: "Write the matter down once" },
    ],
  },
  "/guides/can-staff-paste-client-files-into-chatgpt": {
    hero: { name: "paste", alt: "A client file beside a chat window", caption: "A client file is not a prompt" },
    inline: [
      { name: "lock", alt: "A locked folder", caption: "Know where the file goes" },
      { name: "list", alt: "A checklist", caption: "Approve one workflow first" },
      { name: "check", alt: "A person checking output", caption: "A person still approves" },
    ],
  },
  "/guides/private-ai-popia": {
    hero: { name: "lock", alt: "A locked folder inside a simple room outline", caption: "Private is a place, not a badge" },
    inline: [
      { name: "paste", alt: "A file and a chat box", caption: "Location is only one question" },
      { name: "check", alt: "A person reviewing a result", caption: "A human stays responsible" },
      { name: "list", alt: "A review list", caption: "Map the workflow first" },
    ],
  },
  "/guides/ppe-quotes-without-the-owner": {
    hero: { name: "quote", alt: "A quote page and a person", caption: "The quote can leave your desk" },
    inline: [
      { name: "blank", alt: "An empty quote", caption: "The price still lives with you" },
      { name: "list", alt: "A price list", caption: "One product line to start" },
      { name: "check", alt: "A person approving a quote", caption: "You still approve the send" },
    ],
  },
  "/guides/staff-chatgpt-client-files-popia": {
    hero: { name: "paste", alt: "Staff notes moving toward a chat window", caption: "No blanket yes" },
    inline: [
      { name: "lock", alt: "A locked client file", caption: "Check the trip the file takes" },
      { name: "list", alt: "Two checks on a list", caption: "Read the checks already published" },
      { name: "check", alt: "A person holding the decision", caption: "A lawyer still reviews your facts" },
    ],
  },
  "/guides/stop-training-every-new-hire": {
    hero: { name: "hire", alt: "A new person beside notes, and a trainer", caption: "The notes, not another chair" },
    inline: [
      { name: "live", alt: "Someone teaching beside a new hire", caption: "You are still the training" },
      { name: "list", alt: "Notes for one role", caption: "One role, written down" },
      { name: "check", alt: "A sign-off on the new hire's work", caption: "You still sign the work" },
    ],
  },
  "/guides/free-marketing-tools-before-you-buy": {
    hero: { name: "tools", alt: "A few simple tools on a desk", caption: "Use what you already have" },
    inline: [
      { name: "list", alt: "A short list of tools", caption: "Five questions before a new tool" },
      { name: "scale", alt: "A scale", caption: "Free is not the same as fit" },
      { name: "check", alt: "A person choosing", caption: "Then decide what to keep" },
    ],
  },
  "/ai-training-for-bargaining-councils-statutory-bodies": {
    hero: { name: "table", alt: "People at a table with a formal notice in the middle", caption: "A formal notice still needs a person" },
    inline: [
      { name: "check", alt: "A formal page with a ring around the line that must stay out of the chat", caption: "Member details stay off the draft", motion: "pointer" },
      { name: "groups", alt: "Three people feeding one checked page", caption: "Three roles, one source check", motion: "bubble" },
      { name: "groups", alt: "Two groups taking turns while one person stays on the desk", caption: "One group trains, one desk stays open", motion: "pointer" },
      { name: "list", alt: "A scoping list with a pointer on the call", caption: "Headcount, roles, cover, format", motion: "pointer" },
    ],
  },
  "/about": {
    hero: { name: "live", alt: "A person beside a page of notes", caption: "I'm Phila Ngwenya" },
    inline: [
      { name: "check", alt: "A person checking a page", caption: "I built this method", motion: "pointer" },
      { name: "list", alt: "A short list on a desk", caption: "You bring your real work", motion: "bubble" },
      { name: "lock", alt: "A person next to a closed folder", caption: "You message us first", motion: "pointer" },
      { name: "groups", alt: "A person reading a page", caption: "You read their stories", motion: "pointer" },
    ],
  },
  "/data-and-security": {
    hero: { name: "lock", alt: "A person beside a locked folder", caption: "Your data, under POPIA" },
    inline: [
      { name: "check", alt: "A person at a desk with a form", caption: "I am the Information Officer", motion: "pointer" },
      { name: "lock", alt: "A form that only writes", caption: "Your forms stay write-only", motion: "bubble" },
      { name: "paste", alt: "A person holding a file back from a chat box", caption: "You agree what it may use", motion: "ring" },
      { name: "check", alt: "A person marking a notice", caption: "We tell you if it goes wrong", motion: "pointer" },
    ],
  },
  "/quoting-uniforms-for-a-security-company": {
    hero: { name: "quote", alt: "A person rebuilding a kit list", caption: "You rebuild every kit" },
    inline: [
      { name: "list", alt: "A kit list on a desk", caption: "The list sits with you", motion: "pointer" },
      { name: "quote", alt: "A person signing a price", caption: "You still sign the price", motion: "bubble" },
      { name: "check", alt: "One contract on a page", caption: "You start with one contract", motion: "pointer" },
    ],
  },
  "/senior-dispatcher-on-leave": {
    hero: { name: "groups", alt: "A desk with one person away", caption: "Your senior is out" },
    inline: [
      { name: "blank", alt: "A question with no file beside it", caption: "The answer sits in a head", motion: "pointer" },
      { name: "check", alt: "A person reading a source page", caption: "Your team sees the source", motion: "bubble" },
      { name: "live", alt: "One desk with a person", caption: "You start with one desk", motion: "pointer" },
    ],
  },
};

const FALLBACK: { hero: ArtSlot; inline: ArtSlot[] } = {
  hero: { name: "live", alt: "A trainer with a small team", caption: "A working session" },
  inline: [
    { name: "check", alt: "A person checking a page", caption: "A person still checks" },
    { name: "list", alt: "A short checklist", caption: "One list for the work" },
    { name: "lock", alt: "A locked folder", caption: "Keep private facts out" },
  ],
};

export function articleArt(path: string) {
  return ART[path] ?? FALLBACK;
}
