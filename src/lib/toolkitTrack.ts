/**
 * Toolkit analytics: what people choose and where they click on /toolkit.
 *
 * Writes to `toolkit_events` (supabase/schema.sql). The Command dashboard reads
 * it for the rankings and the heatmap. Same safety model as every other table:
 * the browser can only INSERT, signed-in dashboard admins can read.
 *
 * Built so it can never hurt the page:
 * - No supabase-js. A plain fetch to the REST endpoint, batched every few
 *   seconds and flushed with `keepalive` when the tab is hidden, so the last
 *   clicks before someone leaves still land.
 * - Every failure is swallowed. Analytics that breaks a download is worse
 *   than no analytics.
 * - Nothing personal rides on the click rows. The email is on the opt-in rows
 *   already; events carry an anonymous session id so the dashboard can join
 *   them if it needs to.
 *
 * Heatmap clicks are stored relative to the section they landed in (the
 * nearest element with `data-hm`), as fractions of its width and height. That
 * survives phones, laptops and opened accordions, which absolute page
 * coordinates would not.
 */

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export type ToolkitEvent = {
  /** What happened: click, pain, industry, guide_open, tab, download, route_day, unlock, scroll, view, whatsapp, apply, zip. */
  event: string;
  /** The thing it happened to: a resource id, an industry key, a tab name, a button label. */
  target?: string | null;
  /** Anything extra: a file kind, a scroll depth. */
  detail?: string | null;
  section?: string | null;
  rx?: number | null;
  ry?: number | null;
};

type Row = ToolkitEvent & {
  session_id: string;
  page_state: "gate" | "vault";
  industry: string | null;
  device: "mobile" | "tablet" | "desktop";
  vw: number;
};

const SESSION_KEY = "gc_toolkit_sid";
let sid: string | null = null;
function sessionId(): string {
  if (sid) return sid;
  try {
    sid = window.sessionStorage.getItem(SESSION_KEY);
  } catch {
    /* storage refused */
  }
  if (!sid) {
    sid = Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
    try {
      window.sessionStorage.setItem(SESSION_KEY, sid);
    } catch {
      /* fine: one id for this page load */
    }
  }
  return sid;
}

let state: Row["page_state"] = "gate";
let industry: string | null = null;
export function setTrackState(next: Row["page_state"]) {
  state = next;
}
export function setTrackIndustry(next: string | null) {
  industry = next;
}

const device = (): Row["device"] => {
  const w = window.innerWidth;
  return w < 768 ? "mobile" : w < 1100 ? "tablet" : "desktop";
};

const queue: Row[] = [];
let timer: number | null = null;
const clip = (s: string | null | undefined, n = 120) => (s == null ? null : String(s).slice(0, n));

function send(rows: Row[], keepalive = false) {
  if (!url || !key || !rows.length) return;
  try {
    void fetch(`${url}/rest/v1/toolkit_events`, {
      method: "POST",
      keepalive,
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(rows),
    }).catch(() => undefined);
  } catch {
    /* never let analytics throw */
  }
}

function flush(keepalive = false) {
  if (timer !== null) {
    window.clearTimeout(timer);
    timer = null;
  }
  if (!queue.length) return;
  send(queue.splice(0, queue.length), keepalive);
}

export function trackToolkit(e: ToolkitEvent) {
  if (typeof window === "undefined") return;
  queue.push({
    event: clip(e.event, 40)!,
    target: clip(e.target),
    detail: clip(e.detail),
    section: clip(e.section, 60),
    rx: e.rx == null ? null : Math.round(e.rx * 1000) / 1000,
    ry: e.ry == null ? null : Math.round(e.ry * 1000) / 1000,
    session_id: sessionId(),
    page_state: state,
    industry,
    device: device(),
    vw: Math.round(window.innerWidth),
  });
  if (queue.length >= 25) flush();
  else if (timer === null) timer = window.setTimeout(() => flush(), 4000);
}

/**
 * Every click on the page, for the heatmap. Mounted once by the page; returns
 * its own cleanup. Also records how far down each screen people scroll.
 */
export function startToolkitHeatmap(): () => void {
  const onClick = (ev: MouseEvent) => {
    const el = ev.target instanceof Element ? ev.target : null;
    if (!el) return;
    const section = el.closest<HTMLElement>("[data-hm]");
    let rx: number | null = null,
      ry: number | null = null;
    if (section) {
      const b = section.getBoundingClientRect();
      if (b.width > 0 && b.height > 0) {
        rx = Math.min(1, Math.max(0, (ev.clientX - b.left) / b.width));
        ry = Math.min(1, Math.max(0, (ev.clientY - b.top) / b.height));
      }
    }
    const tracked = el.closest<HTMLElement>("[data-track]");
    const control = el.closest<HTMLElement>("a,button,input,label,summary");
    const label =
      tracked?.dataset.track ??
      (control ? (control.getAttribute("aria-label") || control.textContent || control.tagName).trim().replace(/\s+/g, " ") : null);
    trackToolkit({ event: "click", target: label, section: section?.dataset.hm ?? "page", rx, ry });
  };

  const marks = new Set<number>();
  let raf = 0;
  const onScroll = () => {
    if (raf) return;
    raf = window.requestAnimationFrame(() => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const pct = (window.scrollY / max) * 100;
      for (const m of [25, 50, 75, 100]) {
        if (pct >= m - 1 && !marks.has(m)) {
          marks.add(m);
          trackToolkit({ event: "scroll", target: `${m}%`, detail: state });
        }
      }
    });
  };

  const onHide = () => {
    if (document.visibilityState === "hidden") flush(true);
  };

  document.addEventListener("click", onClick, { capture: true, passive: true });
  window.addEventListener("scroll", onScroll, { passive: true });
  document.addEventListener("visibilitychange", onHide);
  window.addEventListener("pagehide", onHide);
  return () => {
    document.removeEventListener("click", onClick, { capture: true });
    window.removeEventListener("scroll", onScroll);
    document.removeEventListener("visibilitychange", onHide);
    window.removeEventListener("pagehide", onHide);
    if (raf) window.cancelAnimationFrame(raf);
    flush(true);
  };
}
