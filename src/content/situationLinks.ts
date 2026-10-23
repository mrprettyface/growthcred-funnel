/**
 * The five edge-case pages (23 Oct 2026). The first line of each page is the
 * buyer's situation, word for word. Homepage cards and the footer use the same
 * lines so the two cannot drift.
 *
 * No client is named. Consent to use a real example is still open, so the
 * pages leave that space empty.
 */
export const SITUATION_LINKS = [
  {
    path: "/how-to-send-ppe-quotes-faster",
    label: "PPE quotes",
    line: "You run a PPE or uniform supply business, and every bulk quote still waits for you to price it.",
  },
  {
    path: "/quoting-uniforms-for-a-security-company",
    label: "Security uniforms",
    line: "You supply a security company with guards on several sites, and every new contract means re-quoting kits by hand.",
  },
  {
    path: "/chatgpt-client-files-popia-south-africa",
    label: "ChatGPT and client files",
    line: "You run a law or accounting practice, and you suspect your staff already paste client files into ChatGPT.",
  },
  {
    path: "/i-still-train-every-new-hire-myself",
    label: "Training every new hire",
    line: "You're growing, you hire every few months, and every new person still learns the job from you.",
  },
  {
    path: "/senior-dispatcher-on-leave",
    label: "Senior person on leave",
    line: "You run a fleet, and when one senior person is on leave, half the questions stop moving.",
  },
] as const;
