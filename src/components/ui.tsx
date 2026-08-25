import type { ReactNode, AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { Link } from "react-router-dom";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { VIDEOS, embedUrl } from "../lib/videos";

export const cn = (...parts: unknown[]) => twMerge(clsx(parts));

/* ---------------- Button ---------------- */

type Variant = "gold" | "dark" | "outline" | "ghostLight";

const VARIANTS: Record<Variant, string> = {
  gold: "bg-gold text-midnight hover:bg-gold-soft",
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

/* ---------------- Layout primitives ---------------- */

export function Section({
  dark = false,
  className,
  children,
  id,
}: {
  dark?: boolean;
  className?: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <section
      id={id}
      /* Lets a fixed overlay (the webinar progress rail) know whether it is
         currently sitting over a dark or a light band, and invert itself. */
      data-tone={dark ? "dark" : "light"}
      className={cn("py-16 md:py-24", dark && "bg-midnight text-cream", className)}
    >
      <div className="mx-auto w-[min(1120px,calc(100%-2.5rem))]">{children}</div>
    </section>
  );
}

export function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[12px] font-medium uppercase tracking-[0.18em] md:text-[11px]",
        dark ? "text-cream/60" : "text-muted",
      )}
    >
      <span className="text-gold">&#8599;</span>
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

/** Outcome bullets with a gold marker. Works on light and dark sections. */
export function CheckList({
  items,
  dark = false,
  className,
}: {
  items: ReactNode[];
  dark?: boolean;
  className?: string;
}) {
  return (
    <ul className={cn("grid gap-3", className)}>
      {items.map((item, i) => (
        <li key={i} className="relative pl-7 leading-relaxed">
          <span
            aria-hidden="true"
            className="absolute left-0 top-[0.15em] font-mono text-gold"
          >
            &#8599;
          </span>
          <span className={dark ? "text-cream/85" : "text-ink"}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Accessible FAQ accordion using native details/summary, no JS. */
export function Faq({ items }: { items: { q: string; a: ReactNode }[] }) {
  return (
    <div className="mx-auto max-w-[760px] divide-y divide-midnight/10 border-y border-midnight/10">
      {items.map((item, i) => (
        <details key={i} className="group py-2">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-3 font-display text-lg font-bold tracking-[-0.02em] text-midnight">
            {item.q}
            <span
              aria-hidden="true"
              className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-midnight/15 text-gold transition group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <div className="max-w-[62ch] pb-4 text-ink">{item.a}</div>
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
        <iframe
          src={url}
          title={label}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
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
          [TO COME: {label}]
        </p>
      </div>
    </div>
  );
}
