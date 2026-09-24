import { useState, type ReactNode, type AnchorHTMLAttributes, type ButtonHTMLAttributes } from "react";
import { Link } from "react-router-dom";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { VIDEOS, embedUrl } from "../lib/videos";
import { Icon, type IconName } from "./icons";
import { FaqMark, type FaqMarkName } from "./FaqMarks";
import { Reveal } from "./Reveal";

export const cn = (...parts: unknown[]) => twMerge(clsx(parts));

/* ---------------- Button ---------------- */

type Variant = "gold" | "dark" | "outline" | "ghostLight";

const VARIANTS: Record<Variant, string> = {
  gold: "cc-shine bg-gold text-midnight shadow-[0_10px_40px_-12px_rgba(200,160,74,0.65)] hover:bg-gold-soft",
  dark: "bg-midnight text-cream hover:bg-midnight-soft",
  outline: "bg-transparent text-midnight border border-midnight/15 hover:border-midnight",
  ghostLight: "bg-transparent text-cream border border-cream/30 hover:border-gold hover:text-gold",
};

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 min-h-12 font-body text-sm font-semibold no-underline transition hover:-translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none";

export function Button({
  variant = "gold",
  className,
  children,
  ...rest
}: { variant?: Variant } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(BASE, VARIANTS[variant], className)} {...rest}>
      {children}
    </button>
  );
}

export function ButtonLink({
  to,
  href,
  variant = "gold",
  className,
  children,
  ...rest
}: {
  to?: string;
  variant?: Variant;
} & AnchorHTMLAttributes<HTMLAnchorElement>) {
  const cls = cn(BASE, VARIANTS[variant], className);
  if (to) {
    return (
      <Link to={to} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={cls} {...rest}>
      {children}
    </a>
  );
}

/**
 * The Command Core primary ask: a gold pill with a dark arrow chip. Used by the
 * homepage and the site header, so every page asks the same way.
 */
export function PillLink({
  to,
  children,
  size = "lg",
  className,
}: {
  to: string;
  children: ReactNode;
  size?: "sm" | "lg";
  className?: string;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "cc-shine group inline-flex items-center justify-center gap-3 rounded-full bg-gold font-body font-semibold text-midnight no-underline shadow-[0_10px_40px_-10px_rgba(200,160,74,0.7)] transition-colors hover:bg-gold-soft",
        size === "lg" ? "min-h-14 px-8 text-base" : "min-h-11 px-5 text-sm",
        className,
      )}
    >
      {children}
      <span
        aria-hidden="true"
        className="grid h-7 w-7 place-items-center rounded-full bg-midnight text-sm text-gold transition-transform group-hover:translate-x-0.5"
      >
        &#8599;
      </span>
    </Link>
  );
}

/**
 * Dark-band backdrop: blueprint grid plus a gold light source (gradients, no
 * blur filter). It clips itself, so the section it sits in never needs
 * overflow-hidden — which would silently break position:sticky inside it.
 */
export function DarkBackdrop({ glow = "top" }: { glow?: "top" | "bottom" }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="cc-grid absolute inset-0" />
      <div
        className={cn(
          "cc-glow absolute left-1/2 h-[44rem] w-[44rem] max-w-none -translate-x-1/2",
          glow === "top" ? "-top-[22rem]" : "-bottom-[24rem]",
        )}
      />
    </div>
  );
}

/* ---------------- Layout primitives ---------------- */

export function Section({
  dark = false,
  className,
  children,
  id,
  reveal = false,
}: {
  dark?: boolean;
  className?: string;
  children: ReactNode;
  id?: string;
  /** Lift and fade the section in as it arrives. Opt-in, off everywhere else. */
  reveal?: boolean;
}) {
  return (
    <section
      id={id}
      /* Lets a fixed overlay (the webinar progress rail) know whether it is
         currently sitting over a dark or a light band, and invert itself. */
      data-tone={dark ? "dark" : "light"}
      className={cn("py-16 md:py-24", dark && "relative isolate bg-midnight text-cream", className)}
    >
      {dark ? <DarkBackdrop /> : null}
      <div className="mx-auto w-[min(1120px,calc(100%-2.5rem))]">
        {reveal ? <Reveal>{children}</Reveal> : children}
      </div>
    </section>
  );
}

export function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 font-mono text-[12px] font-medium uppercase tracking-[0.22em]",
        dark ? "text-cream/55" : "text-muted",
      )}
    >
      <span aria-hidden="true" className="h-px w-8 bg-gold" />
      {children}
    </span>
  );
}

export function H1({ children, className }: { children: ReactNode; className?: string }) {
  return <h1 className={cn("text-4xl md:text-6xl lg:text-7xl", className)}>{children}</h1>;
}

export function H2({ children, className }: { children: ReactNode; className?: string }) {
  return <h2 className={cn("text-3xl md:text-5xl", className)}>{children}</h2>;
}

/** De-emphasised words inside a headline. */
export function Faint({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return <span className={dark ? "text-cream/40" : "text-faint"}>{children}</span>;
}

/* ---------------- Content ---------------- */

/**
 * Outcome bullets. Works on light and dark sections.
 *
 * An item can be plain text, which keeps the original gold arrow, or
 * `{ icon, text }`, which gives that point its own line icon. A list where
 * every marker is the same arrow reads as filler; a list where each point has
 * its own picture reads as seven distinct things you get.
 */
export type CheckItem = ReactNode | { icon: IconName; text: ReactNode };

export function CheckList({
  items,
  dark = false,
  className,
}: {
  items: CheckItem[];
  dark?: boolean;
  className?: string;
}) {
  const isIconItem = (item: CheckItem): item is { icon: IconName; text: ReactNode } =>
    typeof item === "object" && item !== null && "icon" in item;

  return (
    <ul className={cn("grid gap-4", className)}>
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-4 leading-relaxed">
          {isIconItem(item) ? (
            <span
              aria-hidden="true"
              className={cn(
                "mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full text-gold",
                dark ? "bg-cream/10" : "bg-gold/10",
              )}
            >
              <Icon name={item.icon} />
            </span>
          ) : (
            <span aria-hidden="true" className="mt-[0.15em] font-mono text-gold">
              &#8599;
            </span>
          )}
          <span className={dark ? "text-cream/85" : "text-ink"}>
            {isIconItem(item) ? item.text : item}
          </span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Accessible FAQ accordion using native details/summary, no JS.
 *
 * An item may carry a `mark`, which puts a small drawn figure beside the
 * question. A column of identical accordion rows reads as a wall to get past;
 * a figure per row makes each question look like it was actually considered.
 */
export function Faq({ items }: { items: { q: string; a: ReactNode; mark?: FaqMarkName }[] }) {
  return (
    <div className="mx-auto max-w-[760px] divide-y divide-midnight/10 border-y border-midnight/10">
      {items.map((item, i) => (
        <details key={i} className="group py-2">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-3 font-display text-lg font-bold tracking-[-0.02em] text-midnight">
            <span className="flex items-center gap-3">
              {item.mark ? (
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold/10 text-gold">
                  <FaqMark name={item.mark} />
                </span>
              ) : null}
              {item.q}
            </span>
            <span
              aria-hidden="true"
              className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-midnight/15 text-gold transition group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <div className={cn("max-w-[62ch] pb-4 text-ink", items.some((x) => x.mark) && "pl-14")}>
            {item.a}
          </div>
        </details>
      ))}
    </div>
  );
}

/* ---------------- Placeholders (honest, visible) ---------------- */

/** Marks copy that is deliberately not written yet. Impossible to miss. */
export function ToCome({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block rounded border border-dashed border-gold/60 bg-gold/10 px-2 py-0.5 font-mono text-[12px] uppercase tracking-wider text-gold-soft md:text-[11px]">
      [TO COME: {children}]
    </span>
  );
}

export function ToComeBlock({ label, note }: { label: string; note?: string }) {
  return (
    <div className="rounded-xl border border-dashed border-midnight/25 bg-midnight/[0.03] p-6 text-center">
      <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-muted md:text-[11px]">
        [TO COME: {label}]
      </p>
      {note ? <p className="mt-2 text-sm text-muted">{note}</p> : null}
    </div>
  );
}

/**
 * Video player. Reads the slot from src/lib/videos.ts. When that slot has a
 * video it renders the real player (YouTube / Vimeo / self-hosted MP4);
 * otherwise it shows the placeholder, so pages work before videos are added.
 */
export function VideoSlot({ slot, label }: { slot: string; label: string }) {
  const source = VIDEOS[slot] ?? null;
  const [playing,setPlaying]=useState(false);

  if (source?.kind === "file") {
    return (
      <video
        controls
        playsInline
        preload="metadata"
        className="aspect-video w-full rounded-2xl bg-midnight"
      >
        <source src={source.src} />
      </video>
    );
  }

  const url = embedUrl(source);
  if (url) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-midnight">
        {!playing ? <button type="button" onClick={()=>setPlaying(true)} aria-label={`Play ${label}`} className="absolute inset-0 flex h-full w-full flex-col items-center justify-center gap-5 bg-midnight px-6 text-cream">
          <span className="grid h-20 w-20 place-items-center rounded-full bg-gold text-3xl text-midnight" aria-hidden="true">▶</span>
          <span className="text-xl font-semibold">{slot==='workshopVsl'?'See how the online workshop works':'Watch the video'}</span>
          <span className="text-sm text-cream/80">Play video · Loads when you choose</span>
        </button> : <iframe
          src={`${url}&autoplay=1`}
          title={label}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />}
        {!playing && <a href={source?.kind === "youtube" ? `https://www.youtube.com/watch?v=${source.id}` : source?.kind === "vimeo" ? `https://vimeo.com/${source.id}` : undefined} target="_blank" rel="noopener" className="absolute bottom-3 right-4 z-10 text-xs text-cream/85">Open video in a new tab</a>}
      </div>
    );
  }

  // Not configured yet: keep the placeholder.
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-midnight">
      <div className="absolute inset-0 grid place-items-center gap-3 text-center">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-gold text-midnight">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
        <p className="px-6 font-mono text-[12px] uppercase tracking-[0.16em] text-cream/60 md:text-[11px]">
          Video not currently available. Please contact GrowthCred for details.
        </p>
      </div>
    </div>
  );
}
