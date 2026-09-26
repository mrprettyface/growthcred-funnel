import { useState } from "react";
import { cn } from "./ui";
import { MAGNETS } from "../lib/magnets";
import { WEBINAR } from "../lib/webinar";
import { referralUrl } from "../lib/referral";
import { whatsappUrl } from "../lib/contact";
import { BrandIcon } from "./BrandIcons";
import { track } from "../lib/analytics";

/**
 * The referral ask, shown once a seat is saved.
 *
 * The reward is the "Stop the Leak" pack, given to BOTH sides: the referrer and
 * the person they bring. That is deliberate — a one-sided reward reads as "help
 * me sell", a two-sided one reads as "bring a friend, you both win", which is
 * the thing people actually forward. Delivery of the pack is manual, matched
 * from the dashboard by `referred_by` = the referrer's `ref_code`.
 *
 * There is no email here (nothing in this codebase sends one). Sharing is the
 * viewer's own tap: copy the link, or open WhatsApp with the message written.
 * WhatsApp first, because that is how this audience actually forwards things.
 */
export function ShareInvite({
  code,
  name,
  className,
}: {
  code: string;
  name?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const reward = MAGNETS.aiPolicy; // "Stop the Leak"
  const link = referralUrl(code);

  const first = (name ?? "").trim().split(" ")[0];
  const message =
    `I just booked a free live class on using AI in your business ` +
    `(${WEBINAR.shortWhen}). Book with my link and we both get the ` +
    `"${reward.title}" pack — the 2-page AI policy that keeps client data ` +
    `out of ChatGPT:\n${link}`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      track("referral_share", { via: "copy" });
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked (http, permissions): the input is selectable as a
         fallback, so the link is never out of reach. */
    }
  }

  return (
    <div className={cn("border-t border-midnight/10 pt-6", className)}>
      <p className="font-display text-xl font-extrabold tracking-[-0.03em] text-midnight">
        Know another owner drowning in admin?
      </p>
      <p className="mt-3 text-ink">
        Send them your link{first ? `, ${first}` : ""}. When they book a seat, you
        {" "}
        <span className="font-semibold text-midnight">both</span> get the{" "}
        <span className="font-semibold text-midnight">{reward.title}</span> pack &mdash;{" "}
        {reward.subtitle.charAt(0).toLowerCase() + reward.subtitle.slice(1)}
      </p>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor="referral-link">
          Your personal invite link
        </label>
        <input
          id="referral-link"
          readOnly
          value={link}
          onFocus={(e) => e.currentTarget.select()}
          className="min-h-12 flex-1 rounded-full border border-midnight/15 bg-white px-5 font-mono text-sm text-midnight outline-none focus:border-gold"
        />
        <button
          type="button"
          onClick={copy}
          className="inline-flex min-h-12 items-center justify-center rounded-full border border-midnight/15 px-6 font-body text-sm font-semibold text-midnight transition hover:border-midnight"
        >
          {copied ? "Copied ✓" : "Copy link"}
        </button>
      </div>

      <a
        href={whatsappUrl(message)}
        target="_blank"
        rel="noopener"
        onClick={() => track("referral_share", { via: "whatsapp" })}
        className="mt-3 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-midnight px-7 font-body text-sm font-semibold text-cream no-underline transition hover:bg-midnight-soft"
      >
        <BrandIcon name="whatsapp" /> Share on WhatsApp
      </a>
    </div>
  );
}
