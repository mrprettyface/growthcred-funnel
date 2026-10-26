/**
 * Situation cards on the homepage. The first line of each card is the buyer's
 * week. The footer and the resources hub use the same lines for the two pages
 * this branch publishes, so the wording cannot drift.
 *
 * PPE quotes, staff ChatGPT under POPIA, and training every new hire are the
 * guide slugs from the long-tail pages PR. Those cards render only when that
 * page is actually in the site. The two pages that PR does not have keep the
 * paths from the closed branch.
 *
 * No client is named. Consent to use a real example is still open.
 */
export const SITUATION_LINKS = [
  {
    path: "/guides/ppe-quotes-without-the-owner",
    label: "PPE quotes",
    line: "You run a PPE or uniform supply business, and every bulk quote still waits for you to price it.",
  },
  {
    path: "/quoting-uniforms-for-a-security-company",
    label: "Security uniforms",
    line: "You supply a security company with guards on several sites, and every new contract means re-quoting kits by hand.",
  },
  {
    path: "/guides/staff-chatgpt-client-files-popia",
    label: "ChatGPT and client files",
    line: "You run a law or accounting practice, and you suspect your staff already paste client files into ChatGPT.",
  },
  {
    path: "/guides/stop-training-every-new-hire",
    label: "Training every new hire",
    line: "You're growing, you hire every few months, and every new person still learns the job from you.",
  },
  {
    path: "/senior-dispatcher-on-leave",
    label: "Senior person on leave",
    line: "You run a fleet, and when one senior person is on leave, half the questions stop moving.",
  },
] as const;

/** Cards whose pages are on this site. A slug with no page is not a link. */
export function situationLinksOn(paths: readonly string[]) {
  const known = new Set(paths);
  return SITUATION_LINKS.filter((item) => known.has(item.path));
}
