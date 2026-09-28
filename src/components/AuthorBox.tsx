import { Link } from "react-router-dom";
import { FOUNDER } from "../lib/home";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/** "2026-09-24" -> "24 September 2026", without the locale APIs (server and browser must agree). */
export const longDate = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
};

/** Who wrote this page and when. scripts/verify-human-layer.mjs looks for exactly this markup. */
export function Byline({ date, label = "Published", dark = false, className = "" }: { date: string; label?: string; dark?: boolean; className?: string }) {
  return (
    <p className={`text-sm ${dark ? "text-cream/55 [&_a]:text-cream" : "text-muted [&_a]:text-midnight"} ${className}`}>
      By <Link to="/about">{FOUNDER.name}</Link> · {label} <time dateTime={date}>{longDate(date)}</time>
    </p>
  );
}

/** Experience and authorship, stated plainly, at the end of every article. */
export function AuthorBox({ className = "" }: { className?: string }) {
  return (
    <aside aria-label="About the author" className={`flex flex-col gap-5 rounded-3xl border border-midnight/10 bg-white p-6 shadow-[0_30px_80px_-40px_rgba(26,26,36,0.35)] sm:flex-row sm:items-center ${className}`}>
      <img src="/images/phila-event-640.webp" width="640" height="853" alt="Phila Ngwenya, founder of GrowthCred" loading="lazy" decoding="async" className="h-28 w-24 shrink-0 rounded-2xl object-cover object-top" />
      <div>
        <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-muted">About the author</p>
        <p className="mt-1 font-display text-xl font-extrabold tracking-[-0.03em] text-midnight">
          <Link to="/about" className="no-underline hover:text-gold">{FOUNDER.name}</Link>
        </p>
        <p className="mt-1 text-sm text-muted">{FOUNDER.title}</p>
        <p className="mt-3 text-sm leading-relaxed text-ink">{FOUNDER.credentials.join(" ")}</p>
      </div>
    </aside>
  );
}
