/**
 * Swarm Rebuild: a swarm of arrow cursors designs and builds the homepage as
 * the visitor scrolls. Written from scratch for GrowthCred (3 Nov 2026); the
 * public swarm demos were visual reference only.
 *
 * How it works
 * - Every section marked `data-build` is split into small jobs: guides and a
 *   measurement for the section, a box drag for each card (option-drag
 *   duplicates for the cards after it), and a job per text block, image and
 *   button. Each block waits as a wireframe (data-sb="pending", opacity 0)
 *   until a cursor finishes its job.
 * - Cursors are workers. An idle cursor takes the nearest open job in view,
 *   does it, and takes the next. Jobs open as blocks cross the bottom of the
 *   viewport, so a fast scroller outpaces the swarm and sees wireframes; more
 *   cursors join while scrolling is fast.
 * - When everything is built, the cursors flock loosely round the mouse.
 *
 * Rules it keeps (CLAUDE.md, STATUS.md)
 * - Real content stays in the prerendered HTML. Nothing is hidden until this
 *   file has loaded and attached, so a failed load or an error leaves the page
 *   finished. Never runs under prefers-reduced-motion.
 * - One canvas, aria-hidden, pointer-events: none. Blocks are revealed with
 *   transform and opacity only. No blur. Paused while the tab is hidden, and
 *   asleep when there is nothing to do.
 * - Gating content behind the swarm is an owner decision (3 Nov 2026) and an
 *   explicit exception to "no content gated behind an animation". The hero is
 *   never gated: it is the largest paint, and the page must not score worse.
 */
import "./swarm-build.css";

type V = { x: number; y: number };
type R = { x: number; y: number; w: number; h: number };
type Kind = "type" | "text" | "image" | "button" | "card";
type Glyph = { ch: string; x: number; y: number; font: string; color: string };

type Sec = {
  el: HTMLElement;
  dark: boolean;
  rect: R;
  blocks: Block[];
  guides: "waiting" | "active" | "done";
  guideT: number;
  fade: number; // marks fading once the whole section is built (1 → 0)
};

type Block = {
  el: HTMLElement;
  sec: Sec;
  kind: Kind;
  rect: R;
  lines: R[];
  card?: Block; // the card this block sits in; it waits for that card
  from?: Block; // a duplicate's source card
  state: "pending" | "active" | "done";
  phase: number;
  t: number; // progress through the current phase, 0..1
  glyphs?: Glyph[];
  fade: number; // own marks fading after done (1 → 0)
};

type Phase = { dur: number; at: (p: number) => V };
type Job = { block?: Block; sec?: Sec; phases: Phase[]; done: () => void };

type Cursor = {
  pos: V;
  vel: V;
  target: V;
  color: string;
  edge: string;
  state: "off" | "idle" | "travel" | "work" | "flock";
  job?: Job;
  phase: number;
  t: number;
  trail: V[];
  angle: number; // flock slot
  radius: number;
  tip?: { text: string; until: number };
  idleSince: number;
};

const GOLD = "#c8a04a";
const INK = "#1a1a24";
const RED = "#e5484d";
const WIRE = "rgba(200, 160, 74, 0.55)";
const TIPS = ["Custom systems built", "Snapping to the grid", "Setting the type", "Checking alignment", "Placing copy", "Building the section"];

const BLOCK_SEL = "h1,h2,h3,h4,p,li,dt,dd,blockquote,summary,img,svg,figure,a,button";

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (t: number) => 1 - Math.pow(1 - t, 3);
const lerp = (a: V, b: V, t: number): V => ({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });
const hasText = (el: Element) => (el.textContent ?? "").trim().length > 0;

export type SwarmHandle = { destroy: () => void };

export function startSwarm(): SwarmHandle {
  const noop = { destroy: () => {} };
  if (typeof window === "undefined") return noop;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reduce.matches) return noop;

  const mobile = window.matchMedia("(max-width: 767px), (pointer: coarse)").matches;
  const BASE = mobile ? 6 : 15;
  const MAX = mobile ? 8 : 22;

  const canvas = document.createElement("canvas");
  canvas.className = "sb-canvas";
  canvas.setAttribute("aria-hidden", "true");
  const ctx = canvas.getContext("2d");
  if (!ctx) return noop;
  document.body.appendChild(canvas);

  let dpr = 1;
  let vw = 0;
  let vh = 0;
  const resize = () => {
    dpr = Math.min(2, window.devicePixelRatio || 1);
    vw = window.innerWidth;
    vh = window.innerHeight;
    canvas.width = Math.round(vw * dpr);
    canvas.height = Math.round(vh * dpr);
  };
  resize();

  /* ---------------- Scan the page into sections, cards and blocks ---------------- */

  const docRect = (el: Element): R => {
    const r = el.getBoundingClientRect();
    return { x: r.left + window.scrollX, y: r.top + window.scrollY, w: r.width, h: r.height };
  };

  const lineRects = (el: Element): R[] => {
    // Text nodes only: a range over the whole element would also return the
    // boxes of every child element, which draw as full-width slabs.
    const range = document.createRange();
    const rects: DOMRect[] = [];
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    for (let n = walker.nextNode(); n; n = walker.nextNode()) {
      if (!(n.textContent ?? "").trim()) continue;
      range.selectNodeContents(n);
      rects.push(...Array.from(range.getClientRects()));
    }
    const rows: R[] = [];
    for (const r of rects) {
      if (r.width < 2 || r.height < 2) continue;
      const y = r.top + window.scrollY;
      const row = rows.find((l) => Math.abs(l.y - y) < r.height * 0.5);
      if (row) {
        const right = Math.max(row.x + row.w, r.right + window.scrollX);
        row.x = Math.min(row.x, r.left + window.scrollX);
        row.w = right - row.x;
        row.h = Math.max(row.h, r.height);
      } else rows.push({ x: r.left + window.scrollX, y, w: r.width, h: r.height });
    }
    return rows.slice(0, 14);
  };

  const isCard = (el: HTMLElement, secBg: string) => {
    const s = getComputedStyle(el);
    if (parseFloat(s.borderTopLeftRadius) < 8) return false;
    const r = el.getBoundingClientRect();
    if (r.width < 120 || r.height < 60) return false;
    const bordered = parseFloat(s.borderTopWidth) > 0 && s.borderTopColor !== "rgba(0, 0, 0, 0)";
    const filled = s.backgroundColor !== "rgba(0, 0, 0, 0)" && s.backgroundColor !== secBg;
    return bordered || filled;
  };

  const kindOf = (el: HTMLElement): Kind => {
    const tag = el.tagName;
    if (tag === "IMG" || tag === "svg" || tag === "FIGURE") return "image";
    if (tag === "BUTTON" || (tag === "A" && /rounded-full|bg-gold|bg-midnight/.test(el.className.toString()))) return "button";
    const short = (el.textContent ?? "").trim().length <= 90;
    if (!mobile && (/^H[1-4]$/.test(tag) || short)) return "type";
    return "text";
  };

  const sections: Sec[] = [];
  const blocks: Block[] = [];

  const scan = () => {
    for (const el of Array.from(document.querySelectorAll<HTMLElement>("[data-build]"))) {
      const secBg = getComputedStyle(el).backgroundColor;
      const sec: Sec = { el, dark: el.dataset.tone === "dark", rect: docRect(el), blocks: [], guides: "waiting", guideT: 0, fade: 1 };
      const visible = (e: Element) => {
        const r = e.getBoundingClientRect();
        return r.width >= 12 && r.height >= 12;
      };

      // Cards: outermost bordered or filled rounded boxes that hold content.
      const cards: HTMLElement[] = [];
      for (const c of Array.from(el.querySelectorAll<HTMLElement>("div,article,li,a,figure,dl"))) {
        if (cards.some((o) => o.contains(c))) continue;
        if (!visible(c) || !hasText(c) && !c.querySelector("img,svg")) continue;
        if (isCard(c, secBg)) cards.push(c);
      }

      // Blocks: the outermost text, image and button elements, plus any other
      // element that carries text directly (a <div> with a number in it).
      const found = new Set<HTMLElement>();
      const take = (b: HTMLElement) => {
        if (cards.includes(b) || !visible(b)) return;
        for (const f of found) if (f.contains(b)) return;
        for (const f of Array.from(found)) if (b.contains(f)) found.delete(f);
        found.add(b);
      };
      for (const b of Array.from(el.querySelectorAll<HTMLElement>(BLOCK_SEL))) {
        if (b.tagName === "svg" && b.closest("a,button")) continue;
        if (b.tagName !== "IMG" && b.tagName !== "svg" && b.tagName !== "FIGURE" && !hasText(b)) continue;
        take(b);
      }
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      for (let n = walker.nextNode(); n; n = walker.nextNode()) {
        if (!(n.textContent ?? "").trim()) continue;
        let p = n.parentElement;
        if (!p || [...found].some((f) => f.contains(p!)) || cards.includes(p)) continue;
        while (p && p !== el && getComputedStyle(p).display.startsWith("inline")) p = p.parentElement;
        if (!p || p === el || cards.includes(p)) continue;
        const wrapper = p;
        if ([...found].some((f) => wrapper.contains(f)) || cards.some((c) => wrapper.contains(c))) continue;
        take(wrapper);
      }

      const cardBlocks = new Map<HTMLElement, Block>();
      let prevCard: Block | undefined;
      for (const c of cards) {
        const b: Block = { el: c, sec, kind: "card", rect: docRect(c), lines: [], state: "pending", phase: 0, t: 0, fade: 1 };
        // Option-drag: a card straight after a sibling card with the same class.
        if (!mobile && prevCard && prevCard.el.parentElement === c.parentElement && prevCard.el.className === c.className) b.from = prevCard;
        prevCard = b;
        cardBlocks.set(c, b);
        sec.blocks.push(b);
      }
      for (const f of found) {
        const host = cards.find((c) => c.contains(f));
        const kind = kindOf(f);
        const b: Block = { el: f, sec, kind, rect: docRect(f), lines: kind === "text" || kind === "type" ? lineRects(f) : [], state: "pending", phase: 0, t: 0, fade: 1, card: host ? cardBlocks.get(host) : undefined };
        sec.blocks.push(b);
      }
      sec.blocks.sort((a, b) => a.rect.y - b.rect.y || a.rect.x - b.rect.x);
      for (const b of sec.blocks) {
        b.el.setAttribute("data-sb", "pending");
        blocks.push(b);
      }
      sections.push(sec);
    }
  };

  const remeasure = () => {
    for (const s of sections) s.rect = docRect(s.el);
    for (const b of blocks) {
      b.rect = docRect(b.el);
      if (b.kind === "text" || b.kind === "type") b.lines = lineRects(b.el);
    }
  };

  /* ---------------- Jobs ---------------- */

  const glyphsOf = (b: Block): Glyph[] => {
    const out: Glyph[] = [];
    const range = document.createRange();
    const walker = document.createTreeWalker(b.el, NodeFilter.SHOW_TEXT);
    for (let n = walker.nextNode(); n; n = walker.nextNode()) {
      const text = n.textContent ?? "";
      const parent = n.parentElement ?? b.el;
      const s = getComputedStyle(parent);
      const font = `${s.fontStyle} ${s.fontWeight} ${s.fontSize} ${s.fontFamily}`;
      const color = s.color === "rgba(0, 0, 0, 0)" ? GOLD : s.color;
      ctx.font = font;
      const m = ctx.measureText("Hg");
      const asc = m.fontBoundingBoxAscent || parseFloat(s.fontSize) * 0.8;
      const desc = m.fontBoundingBoxDescent || parseFloat(s.fontSize) * 0.2;
      for (let i = 0; i < text.length && out.length < 140; i++) {
        if (!text[i].trim()) continue;
        range.setStart(n, i);
        range.setEnd(n, i + 1);
        const r = range.getClientRects()[0];
        if (!r) continue;
        out.push({ ch: text[i], x: r.left + window.scrollX, y: r.top + window.scrollY + (r.height - (asc + desc)) / 2 + asc, font, color });
      }
    }
    return out;
  };

  const reveal = (b: Block, how: "in" | "fade" | "pop") => {
    b.state = "done";
    b.el.setAttribute("data-sb", how);
    const clear = () => {
      if (b.el.getAttribute("data-sb") === how) b.el.removeAttribute("data-sb");
    };
    const onEnd = (e: AnimationEvent) => {
      if (e.target !== b.el) return;
      b.el.removeEventListener("animationend", onEnd);
      clear();
    };
    b.el.addEventListener("animationend", onEnd);
    window.setTimeout(clear, 700); // in case the animation never runs
  };

  const blockJob = (b: Block): Job => {
    const r = b.rect;
    const tl = { x: r.x, y: r.y };
    const br = { x: r.x + r.w, y: r.y + r.h };
    const still = (v: V) => () => v;
    switch (b.kind) {
      case "card":
        if (b.from) {
          const f = b.from.rect;
          return { block: b, phases: [{ dur: 0.55, at: (p) => lerp({ x: f.x + 12, y: f.y + 12 }, { x: r.x + 12, y: r.y + 12 }, ease(p)) }, { dur: 0.15, at: still({ x: r.x + 12, y: r.y + 12 }) }], done: () => reveal(b, "fade") };
        }
        return { block: b, phases: [{ dur: 0.6, at: (p) => lerp(tl, br, ease(p)) }, { dur: 0.15, at: still(br) }], done: () => reveal(b, "fade") };
      case "image":
        return { block: b, phases: [{ dur: 0.55, at: (p) => lerp(tl, br, ease(p)) }, { dur: 0.3, at: still(br) }], done: () => reveal(b, "pop") };
      case "button": {
        const c = { x: r.x + r.w / 2, y: r.y + r.h / 2 };
        return { block: b, phases: [{ dur: 0.4, at: (p) => lerp(tl, br, ease(p)) }, { dur: 0.2, at: (p) => lerp(br, c, ease(p)) }], done: () => reveal(b, "pop") };
      }
      case "type": {
        b.glyphs = glyphsOf(b);
        const g = b.glyphs;
        const dur = clamp(g.length * 0.03, 0.5, 2.4);
        return {
          block: b,
          phases: [{ dur, at: (p) => {
            const i = Math.min(g.length - 1, Math.floor(p * g.length));
            return g.length ? { x: g[i].x + 6, y: g[i].y + 4 } : tl;
          } }],
          done: () => reveal(b, "fade"),
        };
      }
      default: {
        const lines = b.lines.length ? b.lines : [r];
        const per = clamp(0.9 / lines.length, 0.12, 0.3);
        return {
          block: b,
          phases: lines.map((l) => ({ dur: per, at: (p: number) => ({ x: l.x + l.w * ease(p), y: l.y + l.h * 0.6 }) })),
          done: () => reveal(b, "in"),
        };
      }
    }
  };

  const guideJob = (s: Sec): Job => {
    const first = s.blocks.find((b) => b.kind !== "card") ?? s.blocks[0];
    const fr = first?.rect ?? s.rect;
    const top = headerBottom() + window.scrollY;
    return {
      sec: s,
      phases: [
        { dur: 0.5, at: (p) => ({ x: fr.x + 120, y: top + (fr.y - top) * ease(p) }) },
        { dur: 0.5, at: (p) => ({ x: fr.x * ease(p), y: fr.y + 80 }) },
        { dur: 0.45, at: (p) => ({ x: fr.x - 14, y: fr.y + fr.h + 40 * ease(p) }) },
      ],
      done: () => (s.guides = "done"),
    };
  };

  let header: HTMLElement | null = document.querySelector("header");
  const headerBottom = () => {
    if (!header || !header.isConnected) header = document.querySelector("header");
    return header ? Math.max(0, header.getBoundingClientRect().bottom) : 0;
  };

  const inReach = (r: R) => r.y < window.scrollY + vh * 0.98 && r.y + r.h > window.scrollY - vh * 0.25;

  const openJobs = (): Job[] => {
    const jobs: Job[] = [];
    for (const s of sections) {
      if (!inReach(s.rect)) continue;
      if (s.guides === "waiting" && s.blocks.length) jobs.push(guideJob(s));
      for (const b of s.blocks) {
        if (b.state !== "pending" || !inReach(b.rect)) continue;
        if (b.card && b.card.state !== "done") continue;
        if (b.from && b.from.state === "pending") continue;
        jobs.push({ block: b, phases: [], done: () => {} });
        if (jobs.length > 40) return jobs;
      }
    }
    return jobs;
  };

  /* ---------------- Cursors ---------------- */

  const palette: [string, string][] = [[GOLD, INK], [INK, "#ffffff"], [GOLD, INK], [INK, "#ffffff"], [RED, "#ffffff"]];
  const cursors: Cursor[] = Array.from({ length: MAX }, (_, i) => {
    const [color, edge] = palette[i % palette.length];
    return {
      pos: { x: vw / 2, y: window.scrollY + vh / 2 },
      vel: { x: 0, y: 0 },
      target: { x: vw / 2, y: window.scrollY + vh / 2 },
      color,
      edge,
      state: i < BASE ? "idle" : "off",
      phase: 0,
      t: 0,
      trail: [],
      angle: (i / MAX) * Math.PI * 2 + Math.random() * 0.4,
      radius: 46 + Math.random() * 90,
      idleSince: 0,
    };
  });

  const assign = (c: Cursor, now: number) => {
    const jobs = openJobs();
    if (!jobs.length) return false;
    let best = jobs[0];
    let bestD = Infinity;
    for (const j of jobs.slice(0, 12)) {
      const r = j.block?.rect ?? j.sec!.rect;
      const d = Math.hypot(r.x - c.pos.x, r.y - c.pos.y);
      if (d < bestD) (best = j), (bestD = d);
    }
    const job = best.block ? blockJob(best.block) : best;
    if (job.block) (job.block.state = "active"), (job.block.phase = 0), (job.block.t = 0);
    if (job.sec) job.sec.guides = "active";
    c.job = job;
    c.phase = 0;
    c.t = 0;
    c.state = "travel";
    c.target = job.phases[0].at(0);
    c.idleSince = now;
    return true;
  };

  /* ---------------- Loop ---------------- */

  let raf = 0;
  let last = performance.now();
  let lastScrollY = window.scrollY;
  let speed = 0; // smoothed scroll speed, px/s
  let introUntil = last + 2000;
  let allDone = false;
  let mouse: V | null = null;
  let lastMouse = 0;
  let quietSince = last;
  let nextTip = last + 3500;
  let rulers = 0;

  const step = (now: number) => {
    raf = 0;
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    const sy = window.scrollY;
    speed = speed * 0.85 + (Math.abs(sy - lastScrollY) / Math.max(dt, 0.001)) * 0.15;
    lastScrollY = sy;

    allDone = blocks.every((b) => b.state === "done");
    if (allDone && mobile && !cursors.some((c) => c.job)) {
      cursors.forEach((c) => (c.state = "off"));
      draw(now, false);
      return;
    }

    const intro = now < introUntil;
    const want = intro ? BASE : Math.round(BASE + (MAX - BASE) * clamp(speed / 2500));
    let live = cursors.filter((c) => c.state !== "off").length;
    for (const c of cursors) {
      if (live >= want) break;
      if (c.state === "off") {
        c.state = "idle";
        c.pos = { x: Math.random() * vw, y: sy + vh + 30 };
        c.trail = [];
        live++;
      }
    }

    const center = { x: vw * (mobile ? 0.5 : 0.62), y: sy + vh * 0.5 };
    let busy = false;

    cursors.forEach((c, i) => {
      if (c.state === "off") return;
      if (intro) {
        const a = now / 650 + (i / BASE) * Math.PI * 2;
        c.target = { x: center.x + Math.cos(a) * 62, y: center.y + Math.sin(a) * 62 };
      } else if (allDone && !mobile && (c.state === "idle" || c.state === "flock")) {
        c.state = "flock";
        const m = mouse ? { x: mouse.x, y: mouse.y + sy } : center;
        const a = c.angle + now / 4000;
        c.target = { x: m.x + Math.cos(a) * c.radius, y: m.y + Math.sin(a) * c.radius * 0.8 };
      } else if (c.state === "idle" || c.state === "flock") {
        if (!assign(c, now) && !mobile && mouse && now - lastMouse < 2500) {
          // Nothing to build in view: keep the visitor company.
          c.state = "flock";
          const a = c.angle + now / 4000;
          c.target = { x: mouse.x + Math.cos(a) * c.radius, y: mouse.y + sy + Math.sin(a) * c.radius * 0.8 };
        } else if (!c.job) {
          c.state = "idle";
          // Wait near the bottom edge, where the work arrives.
          const a = now / 1800 + i;
          c.target = { x: vw * ((i * 0.37 + 0.1) % 1), y: sy + vh - 36 + Math.sin(a) * 10 };
          if (i >= want && now - c.idleSince > 2500) c.state = "off";
        }
      }

      if (c.state === "travel" && c.job) {
        busy = true;
        c.target = c.job.phases[0].at(0);
        if (Math.hypot(c.target.x - c.pos.x, c.target.y - c.pos.y) < 12) c.state = "work";
      }
      if (c.state === "work" && c.job) {
        busy = true;
        const ph = c.job.phases[c.phase];
        c.t += dt / ph.dur;
        if (c.job.block) (c.job.block.phase = c.phase), (c.job.block.t = clamp(c.t));
        if (c.job.sec) (c.job.sec.guideT = c.phase + clamp(c.t));
        c.pos = ph.at(clamp(c.t));
        c.target = c.pos;
        if (c.t >= 1) {
          c.phase++;
          c.t = 0;
          if (c.phase >= c.job.phases.length) {
            c.job.done();
            c.job = undefined;
            c.state = "idle";
            c.idleSince = now;
          }
        }
      }

      if (c.state !== "work") {
        // Steer, with a top speed the visitor can outrun.
        const max = mobile ? 1800 : 2600;
        const dx = c.target.x - c.pos.x;
        const dy = c.target.y - c.pos.y;
        const k = c.state === "flock" ? 14 : c.state === "travel" ? 90 : 40;
        c.vel.x += (dx * k - c.vel.x * 2 * Math.sqrt(k)) * dt;
        c.vel.y += (dy * k - c.vel.y * 2 * Math.sqrt(k)) * dt;
        if (c.state === "flock") {
          // Keep a little room between neighbours.
          for (const o of cursors) {
            if (o === c || o.state === "off") continue;
            const ox = c.pos.x - o.pos.x;
            const oy = c.pos.y - o.pos.y;
            const d = Math.hypot(ox, oy);
            if (d > 0 && d < 28) (c.vel.x += (ox / d) * 260 * dt), (c.vel.y += (oy / d) * 260 * dt);
          }
        }
        const v = Math.hypot(c.vel.x, c.vel.y);
        if (v > max) (c.vel.x *= max / v), (c.vel.y *= max / v);
        c.pos.x += c.vel.x * dt;
        c.pos.y += c.vel.y * dt;
      }
      c.trail.push({ ...c.pos });
      if (c.trail.length > 9) c.trail.shift();
      if (c.tip && now > c.tip.until) c.tip = undefined;
    });

    if (!intro && now > nextTip) {
      const workers = cursors.filter((c) => c.state === "work");
      if (workers.length) workers[Math.floor(Math.random() * workers.length)].tip = { text: TIPS[Math.floor(Math.random() * TIPS.length)], until: now + 1700 };
      nextTip = now + 5000 + Math.random() * 4000;
    }

    for (const s of sections) {
      if (s.guides === "done" && s.blocks.every((b) => b.state === "done")) s.fade = Math.max(0, s.fade - dt * 2);
    }
    for (const b of blocks) if (b.state === "done" && b.fade > 0) b.fade = Math.max(0, b.fade - dt * 3);
    rulers = clamp(rulers + (sections.some((s) => s.guides === "active") ? dt * 4 : -dt * 2));

    draw(now, intro);

    // Sleep when nothing is moving: no jobs, no scroll, settled cursors.
    const moving = busy || intro || speed > 5 || cursors.some((c) => c.state !== "off" && Math.hypot(c.vel.x, c.vel.y) > 8);
    if (moving || (allDone && !mobile && now - lastMouse < 3000)) quietSince = now;
    if (now - quietSince < 1500) wake();
  };

  /* ---------------- Drawing ---------------- */

  const drawArrow = (c: Cursor, x: number, y: number) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 16);
    ctx.lineTo(4.2, 12.2);
    ctx.lineTo(7, 18.4);
    ctx.lineTo(9.6, 17.3);
    ctx.lineTo(6.8, 11.2);
    ctx.lineTo(12.2, 11.2);
    ctx.closePath();
    ctx.fillStyle = c.color;
    ctx.strokeStyle = c.edge;
    ctx.lineWidth = 1.2;
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  };

  const tag = (text: string, x: number, y: number, bg: string, fg = "#ffffff") => {
    ctx.font = "500 11px 'DM Mono', ui-monospace, monospace";
    const w = ctx.measureText(text).width + 12;
    ctx.fillStyle = bg;
    ctx.beginPath();
    ctx.roundRect(x, y, w, 18, 4);
    ctx.fill();
    ctx.fillStyle = fg;
    ctx.fillText(text, x + 6, y + 13);
  };

  const ticks = (x1: number, y1: number, x2: number, y2: number) => {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    const vertical = Math.abs(x2 - x1) < Math.abs(y2 - y1);
    for (const [x, y] of [[x1, y1], [x2, y2]]) {
      if (vertical) (ctx.moveTo(x - 5, y), ctx.lineTo(x + 5, y));
      else (ctx.moveTo(x, y - 5), ctx.lineTo(x, y + 5));
    }
    ctx.stroke();
  };

  const draw = (now: number, intro: boolean) => {
    const sy = window.scrollY;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, vw, vh);
    ctx.translate(0, -sy);
    const top = headerBottom() + sy;

    // Rulers, while guides are being pulled out of them.
    if (rulers > 0) {
      ctx.globalAlpha = rulers * 0.85;
      ctx.fillStyle = "rgba(250, 249, 246, 0.92)";
      ctx.fillRect(0, top, vw, 14);
      ctx.fillRect(0, top, 14, vh);
      ctx.strokeStyle = "rgba(26, 26, 36, 0.35)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 20; x < vw; x += 10) (ctx.moveTo(x + 0.5, top + 14), ctx.lineTo(x + 0.5, top + (x % 50 === 0 ? 4 : 9)));
      for (let y = 20; y < vh; y += 10) (ctx.moveTo(14, top + y + 0.5), ctx.lineTo(y % 50 === 0 ? 4 : 9, top + y + 0.5));
      ctx.stroke();
      ctx.globalAlpha = 1;
    }

    for (const s of sections) {
      const r = s.rect;
      if (r.y > sy + vh || r.y + r.h < sy) continue;
      const bar = s.dark ? "rgba(232, 224, 208, 0.12)" : "rgba(26, 26, 36, 0.08)";

      for (const b of s.blocks) {
        const br = b.rect;
        if (br.y > sy + vh || br.y + br.h < sy) continue;
        const a = b.state === "done" ? b.fade : 1;
        if (a <= 0) continue;
        ctx.globalAlpha = a;
        ctx.lineWidth = 1;
        const active = b.state === "active";
        const p = b.t;

        if (b.kind === "card") {
          ctx.strokeStyle = WIRE;
          ctx.setLineDash([5, 4]);
          if (b.state === "pending") ctx.strokeRect(br.x + 0.5, br.y + 0.5, br.w, br.h);
          ctx.setLineDash([]);
          if (active && b.from && b.phase === 0) {
            const f = b.from.rect;
            const g = lerp({ x: f.x, y: f.y }, { x: br.x, y: br.y }, ease(p));
            ctx.strokeStyle = GOLD;
            ctx.strokeRect(g.x + 0.5, g.y + 0.5, br.w, br.h);
            const horizontal = Math.abs(br.x - f.x) > Math.abs(br.y - f.y);
            const gap = Math.round(horizontal ? br.x - (f.x + f.w) : br.y - (f.y + f.h));
            if (gap > 0) {
              ctx.strokeStyle = RED;
              if (horizontal) ticks(f.x + f.w, br.y + br.h / 2, br.x, br.y + br.h / 2);
              else ticks(br.x + br.w / 2, f.y + f.h, br.x + br.w / 2, br.y);
              tag(`${gap}`, horizontal ? f.x + f.w + gap / 2 - 12 : br.x + br.w / 2 + 6, horizontal ? br.y + br.h / 2 - 22 : f.y + f.h + gap / 2 - 9, RED);
            }
          } else if (active || b.state === "done") {
            const w = b.from ? br.w : br.w * (b.phase > 0 || b.state === "done" ? 1 : ease(p));
            const h = b.from ? br.h : br.h * (b.phase > 0 || b.state === "done" ? 1 : ease(p));
            ctx.strokeStyle = GOLD;
            ctx.strokeRect(br.x + 0.5, br.y + 0.5, w, h);
            if (active && w > 8 && h > 8) tag(`${Math.round(w)} × ${Math.round(h)}`, br.x + w + 6, br.y + h + 6, INK);
          }
        } else if (b.kind === "image") {
          const full = b.phase > 0 || b.state === "done";
          const w = full ? br.w : br.w * ease(p);
          const h = full ? br.h : br.h * ease(p);
          if (b.state === "pending") {
            ctx.strokeStyle = WIRE;
            ctx.strokeRect(br.x + 0.5, br.y + 0.5, br.w, br.h);
            ctx.beginPath();
            ctx.moveTo(br.x, br.y);
            ctx.lineTo(br.x + br.w, br.y + br.h);
            ctx.moveTo(br.x + br.w, br.y);
            ctx.lineTo(br.x, br.y + br.h);
            ctx.stroke();
          } else {
            ctx.fillStyle = s.dark ? `rgba(232, 224, 208, ${0.14 * (b.phase > 0 ? p : 0) + (b.state === "done" ? 0.14 : 0)})` : `rgba(26, 26, 36, ${0.1 * (b.phase > 0 ? p : 0) + (b.state === "done" ? 0.1 : 0)})`;
            ctx.fillRect(br.x, br.y, w, h);
            ctx.strokeStyle = GOLD;
            ctx.strokeRect(br.x + 0.5, br.y + 0.5, w, h);
            if (active && w > 8 && h > 8) tag(`${Math.round(w)} × ${Math.round(h)}`, br.x + w + 6, br.y + h + 6, INK);
          }
        } else if (b.kind === "button") {
          const grow = b.state === "pending" ? 0 : b.phase > 0 || b.state === "done" ? 1 : ease(p);
          ctx.strokeStyle = WIRE;
          ctx.beginPath();
          ctx.roundRect(br.x + 0.5, br.y + 0.5, br.w, br.h, Math.min(br.h / 2, 28));
          ctx.stroke();
          if (grow > 0) {
            ctx.fillStyle = `rgba(200, 160, 74, ${0.85 * grow})`;
            ctx.beginPath();
            ctx.roundRect(br.x, br.y, br.w * grow, br.h, Math.min(br.h / 2, 28));
            ctx.fill();
          }
        } else {
          // Text: grey bars where the lines will be, then a caret or a sweep.
          const lines = b.lines.length ? b.lines : [br];
          const typing = b.kind === "type" && b.glyphs && b.state !== "pending";
          if (!typing) {
            lines.forEach((l, li) => {
              const swept = b.state === "done" ? 1 : !active ? 0 : li < b.phase ? 1 : li === b.phase ? ease(p) : 0;
              ctx.fillStyle = bar;
              ctx.beginPath();
              ctx.roundRect(l.x, l.y + l.h * 0.22, l.w, l.h * 0.56, 3);
              ctx.fill();
              if (swept > 0) {
                ctx.fillStyle = s.dark ? "rgba(200, 160, 74, 0.28)" : "rgba(200, 160, 74, 0.22)";
                ctx.fillRect(l.x, l.y + l.h * 0.22, l.w * swept, l.h * 0.56);
              }
              if (active && li === b.phase) {
                ctx.fillStyle = s.dark ? "#e8e0d0" : INK;
                ctx.fillRect(l.x + l.w * ease(p), l.y + 2, 1.5, l.h - 4);
              }
            });
          } else if (b.glyphs) {
            const g = b.glyphs;
            const n = b.state === "done" ? g.length : Math.floor(p * g.length);
            for (let i = 0; i < n; i++) {
              ctx.font = g[i].font;
              ctx.fillStyle = g[i].color;
              ctx.fillText(g[i].ch, g[i].x, g[i].y);
            }
            if (active && g.length) {
              const k = g[Math.min(g.length - 1, n)];
              ctx.font = k.font;
              const size = parseFloat(k.font.split(" ")[2]) || 16;
              if (Math.floor(now / 450) % 2 === 0) {
                ctx.fillStyle = s.dark ? "#e8e0d0" : INK;
                ctx.fillRect(k.x + (n >= g.length ? ctx.measureText(k.ch).width : 0), k.y - size * 0.8, 1.5, size);
              }
            }
          }
        }
        ctx.globalAlpha = 1;
      }

      // The section's guides and its measurement.
      if (s.guides !== "waiting" && s.fade > 0) {
        const first = s.blocks.find((b) => b.kind !== "card") ?? s.blocks[0];
        if (first) {
          const fr = first.rect;
          const t = s.guides === "done" ? 3 : s.guideT;
          ctx.globalAlpha = s.fade;
          ctx.strokeStyle = RED;
          ctx.lineWidth = 1;
          const gy = top + (fr.y - top) * ease(clamp(t));
          ctx.beginPath();
          ctx.moveTo(0, gy + 0.5);
          ctx.lineTo(vw, gy + 0.5);
          if (t > 1) {
            const gx = fr.x * ease(clamp(t - 1));
            ctx.moveTo(gx + 0.5, sy);
            ctx.lineTo(gx + 0.5, sy + vh);
          }
          ctx.stroke();
          if (t > 2) {
            const next = s.blocks.find((b) => b !== first && b.rect.y > fr.y + fr.h);
            const y1 = fr.y + fr.h;
            const y2 = next ? next.rect.y : y1 + 40;
            const yy = y1 + (y2 - y1) * ease(clamp(t - 2));
            ticks(fr.x - 14, y1, fr.x - 14, yy);
            if (t >= 3 || s.guides === "done") tag(`${Math.round(y2 - y1)}`, fr.x - 50, (y1 + y2) / 2 - 9, RED);
          }
          ctx.globalAlpha = 1;
        }
      }
    }

    // The load: cursors round a spinner, "Incoming page…".
    if (intro) {
      const c = { x: vw * (mobile ? 0.5 : 0.62), y: sy + vh * 0.5 };
      ctx.strokeStyle = GOLD;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      const a = now / 180;
      ctx.arc(c.x, c.y, 16, a, a + Math.PI * 1.4);
      ctx.stroke();
      tag("Incoming page…", c.x - 50, c.y + 28, INK);
    }

    // Cursors, with faint trails.
    for (const c of cursors) {
      if (c.state === "off") continue;
      if (c.trail.length > 1) {
        ctx.strokeStyle = c.color;
        ctx.lineWidth = 1.5;
        for (let i = 1; i < c.trail.length; i++) {
          ctx.globalAlpha = (i / c.trail.length) * 0.18;
          ctx.beginPath();
          ctx.moveTo(c.trail[i - 1].x, c.trail[i - 1].y);
          ctx.lineTo(c.trail[i].x, c.trail[i].y);
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
      }
      drawArrow(c, c.pos.x, c.pos.y);
      if (c.tip) tag(c.tip.text, c.pos.x + 14, c.pos.y + 18, c.color === INK ? GOLD : INK, c.color === INK ? INK : "#ffffff");
    }
  };

  /* ---------------- Wiring ---------------- */

  const wake = () => {
    if (!raf && !document.hidden) raf = requestAnimationFrame(step);
  };
  const onScroll = () => {
    quietSince = performance.now();
    wake();
  };
  const onMouse = (e: MouseEvent) => {
    mouse = { x: e.clientX, y: e.clientY };
    lastMouse = performance.now();
    if (allDone) quietSince = lastMouse;
    wake();
  };
  const onVisibility = () => {
    if (document.hidden) {
      cancelAnimationFrame(raf);
      raf = 0;
    } else {
      last = performance.now();
      quietSince = last;
      wake();
    }
  };
  let resizeTimer = 0;
  const onResize = () => {
    resize();
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      remeasure();
      wake();
    }, 150);
  };
  const ro = new ResizeObserver(() => onResize());

  const destroy = () => {
    cancelAnimationFrame(raf);
    raf = 0;
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("mousemove", onMouse);
    window.removeEventListener("resize", onResize);
    document.removeEventListener("visibilitychange", onVisibility);
    reduce.removeEventListener("change", onReduce);
    ro.disconnect();
    canvas.remove();
    for (const b of blocks) b.el.removeAttribute("data-sb");
  };
  const onReduce = () => {
    if (reduce.matches) destroy();
  };

  try {
    scan();
  } catch (err) {
    destroy();
    throw err;
  }
  if (!blocks.length) {
    destroy();
    return noop;
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("mousemove", onMouse, { passive: true });
  window.addEventListener("resize", onResize);
  document.addEventListener("visibilitychange", onVisibility);
  reduce.addEventListener("change", onReduce);
  ro.observe(document.body);
  introUntil = performance.now() + 2000;
  wake();

  return { destroy };
}
