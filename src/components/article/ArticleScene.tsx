import type { ReactNode } from "react";
import { GOLD } from "../sceneKit";

/** Seated scenes. The blob is a cloud behind the cluster. The pointer aims at the mouth. */

export type BubbleDir = "nw" | "ne";
type Mood = "stressed" | "focused" | "relieved";
type Hair = 0 | 1 | 2 | 3;

function hash(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i += 1) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  return h >>> 0;
}

function cloud(cx: number, cy: number, seed: number) {
  const j = (i: number) => ((seed >> i) & 7) - 3;
  const p = (x: number, y: number, i: number) => `${(x + j(i) * 4).toFixed(0)} ${(y + j(i + 2) * 3).toFixed(0)}`;
  return `M${p(cx - 20, cy + 20, 1)}
    C${p(cx - 110, cy - 10, 2)} ${p(cx - 70, cy - 70, 3)} ${p(cx - 10, cy - 48, 4)}
    C${p(cx + 40, cy - 90, 5)} ${p(cx + 120, cy - 40, 6)} ${p(cx + 100, cy + 10, 7)}
    C${p(cx + 140, cy + 50, 8)} ${p(cx + 40, cy + 80, 9)} ${p(cx - 20, cy + 55, 1)}
    C${p(cx - 90, cy + 70, 3)} ${p(cx - 120, cy + 30, 5)} ${p(cx - 20, cy + 20, 1)} Z`;
}

function Face({ mood }: { mood: Mood }) {
  const brows = mood === "stressed" ? "M-9 -9 L-2 -5 M3 -5 L10 -9" : mood === "relieved" ? "M-9 -5 Q-5 -11 -1 -6 M2 -6 Q6 -11 10 -5" : "M-8 -8 H-2 M3 -8 H9";
  const mouth = mood === "stressed" ? "M-6 7 Q0 2 6 7" : mood === "relieved" ? "M-6 5 Q0 11 6 5" : "M-4 6 H4";
  return (
    <g>
      <path d={brows} strokeWidth={2.5} />
      <circle cx={-5} cy={-1.5} r={1.7} fill="#1a1a24" stroke="none" />
      <circle cx={5} cy={-1.5} r={1.7} fill="#1a1a24" stroke="none" />
      <path d={mouth} strokeWidth={2.4} />
    </g>
  );
}

function Hair({ style }: { style: Hair }) {
  if (style === 1) {
    return (
      <g>
        <path d="M-14 -4 Q0 -22 14 -4" strokeWidth={3.2} />
        <path d="M-12 0 C-18 16 -12 30 -7 34" strokeWidth={2.8} />
        <path d="M12 0 C18 16 12 30 7 34" strokeWidth={2.8} />
      </g>
    );
  }
  if (style === 2) return <path d="M-14 -2 Q-2 -24 15 -2" strokeWidth={3.5} />;
  if (style === 3) {
    return (
      <g>
        <path d="M-13 -2 Q0 -20 13 -2" strokeWidth={2.8} />
        <circle cx={11} cy={-15} r={6.5} strokeWidth={2.5} />
      </g>
    );
  }
  return <path d="M-15 -2 Q0 -20 15 -2" strokeWidth={3.2} />;
}

/** Hip at (x,y). Thighs run forward, shins drop. Hands land on the given points. */
function Seated({
  x,
  y,
  flip,
  mood,
  hair,
  glasses,
  tie,
  hand,
  hand2,
}: {
  x: number;
  y: number;
  flip: boolean;
  mood: Mood;
  hair: Hair;
  glasses: boolean;
  tie: boolean;
  hand: [number, number];
  hand2: [number, number];
}) {
  const s = flip ? -1 : 1;
  const elbow: [number, number] = [s * 24, -22];
  const elbow2: [number, number] = [s * 10, -8];
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d={`M${s * -8} -6 V-52`} strokeWidth={3.4} />
      <path d={`M${s * -18} 0 H${s * 22}`} strokeWidth={3.5} />
      <path d={`M0 2 L${s * 34} 8 L${s * 30} 46`} strokeWidth={3} />
      <path d={`M${s * 30} 46 H${s * 40}`} strokeWidth={2.6} />
      <path d={`M-2 4 L${s * 16} 16 L${s * 14} 44`} strokeWidth={2.4} />
      <path d="M2 0 L4 -40" strokeWidth={3.5} />
      <path d={`M4 -32 L${elbow[0]} ${elbow[1]} L${hand[0]} ${hand[1]}`} strokeWidth={2.8} />
      <path d={`M2 -28 L${elbow2[0]} ${elbow2[1]} L${hand2[0]} ${hand2[1]}`} strokeWidth={2.4} />
      <circle cx={hand[0]} cy={hand[1]} r={3.6} strokeWidth={2.3} />
      <circle cx={hand2[0]} cy={hand2[1]} r={3.2} strokeWidth={2.1} />
      <path d="M4 -40 V-48" strokeWidth={2.5} />
      <g transform="translate(4 -64)">
        <circle r={17} strokeWidth={2.7} />
        <Hair style={hair} />
        <Face mood={mood} />
        {glasses && (
          <g strokeWidth={2}>
            <circle cx={4} cy={-1} r={5.5} />
            <path d="M9 -1 H16" />
          </g>
        )}
        {tie && <path d="M0 16 l4.5 13 -4.5 3.5 -4.5 -3.5 z" fill={GOLD} stroke="#1a1a24" strokeWidth={1.4} />}
      </g>
    </g>
  );
}

function mouthOf(x: number, y: number, flip: boolean) {
  return { x: x + 4 + (flip ? 15 : -15), y: y - 64 + 6 };
}

function Desk({ x, y, w }: { x: number; y: number; w: number }) {
  return (
    <g>
      <path d={`M${x} ${y} H${x + w}`} strokeWidth={3.5} />
      <path d={`M${x + 10} ${y} V${y + 40} M${x + w - 12} ${y} V${y + 40}`} strokeWidth={2.6} />
    </g>
  );
}

function Laptop({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <path d={`M${x - 6} ${y + 38} H${x + 66}`} strokeWidth={3.2} />
      <rect x={x} y={y} width={54} height={38} rx={3} strokeWidth={2.5} />
      <path d={`M${x + 7} ${y + 9} H${x + 38} M${x + 7} ${y + 17} H${x + 30} M${x + 7} ${y + 25} H${x + 34}`} strokeWidth={2} />
      <rect x={x + 8} y={y + 30} width={16} height={4} rx={1} fill={GOLD} stroke="none" />
    </g>
  );
}

function Papers({ x, y }: { x: number; y: number }) {
  return (
    <g strokeWidth={2.2}>
      <rect x={x + 8} y={y + 6} width={32} height={42} rx={2} />
      <rect x={x} y={y} width={32} height={42} rx={2} fill="#fff" />
      <path d={`M${x + 6} ${y + 10} H${x + 24} M${x + 6} ${y + 18} H${x + 20}`} strokeWidth={2} />
    </g>
  );
}

function Clock({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={22} strokeWidth={2.7} />
      <path d={`M${x} ${y - 6} V${y - 16}`} strokeWidth={2.2} />
      <path d={`M${x} ${y - 4} L${x - 11} ${y - 10}`} stroke={GOLD} strokeWidth={3.4} />
      <circle cx={x} cy={y - 4} r={2.2} fill={GOLD} stroke="none" />
    </g>
  );
}

function Invoice({ x, y }: { x: number; y: number }) {
  return (
    <g strokeWidth={2.2}>
      <rect x={x} y={y} width={32} height={42} rx={2} fill="#fff" />
      <rect x={x} y={y} width={32} height={9} fill={GOLD} stroke="none" />
      <path d={`M${x + 5} ${y + 18} H${x + 24} M${x + 5} ${y + 26} H${x + 18}`} strokeWidth={2} />
    </g>
  );
}

function ChatCard({ x, y }: { x: number; y: number }) {
  return (
    <g strokeWidth={2.3}>
      <rect x={x} y={y} width={72} height={48} rx={8} fill="#fff" />
      <path d={`M${x + 14} ${y + 48} l-8 10 v-10`} />
      <path d={`M${x + 10} ${y + 14} H${x + 42} M${x + 10} ${y + 24} H${x + 32}`} strokeWidth={2} />
      <circle cx={x + 56} cy={y + 16} r={7} fill={GOLD} stroke="none" />
      <path d={`M${x + 52} ${y + 16} H${x + 60}`} stroke="#1a1a24" strokeWidth={2.2} />
    </g>
  );
}

function Board({ x, y }: { x: number; y: number }) {
  return (
    <g strokeWidth={2.4}>
      <rect x={x} y={y} width={100} height={72} rx={3} fill="#fff" />
      <path d={`M${x + 10} ${y + 16} H${x + 46} M${x + 10} ${y + 30} H${x + 72} M${x + 10} ${y + 44} H${x + 36}`} strokeWidth={2.2} />
    </g>
  );
}

function marks(n: number) {
  return {
    mood: (["stressed", "focused", "relieved"] as Mood[])[n % 3],
    hair: ((n >> 2) % 4) as Hair,
    glasses: ((n >> 5) & 1) === 1,
    tie: ((n >> 6) & 1) === 1,
    alt: ((n >> 7) & 1) === 1,
  };
}

function themeOf(text: string) {
  const t = text.toLowerCase();
  if (/chat|paste|popia|chatgpt/.test(t)) return "chat";
  if (/meet|council|team|hire|group|role/.test(t)) return "meet";
  if (/quote|invoice|price|cost|fee|pay|billing|kit/.test(t)) return "invoice";
  if (/board|train|learn|class|habit|workshop/.test(t)) return "board";
  if (/hour|leave|night|late|one day/.test(t)) return "clock";
  return "desk";
}

export function composedScene(seed: string, hint: string): { node: ReactNode; aimX: number; aimY: number; dir: BubbleDir } {
  const n = hash(seed);
  const m = marks(n);
  const theme = themeOf(hint);
  const backdrop = <path d={cloud(160, 118, n)} fill={GOLD} fillOpacity={0.22} stroke="none" />;

  if (theme === "meet" || theme === "invoice") {
    const left = { x: 168, y: 140 };
    const right = { x: 286, y: 142 };
    const mouth = mouthOf(left.x, left.y, false);
    return {
      aimX: mouth.x,
      aimY: mouth.y,
      dir: "nw",
      node: (
        <>
          {backdrop}
          <path d="M186 136 H250" strokeWidth={3.4} />
          <path d="M196 136 V176 M240 136 V176" strokeWidth={2.5} />
          <Invoice x={204} y={98} />
          {m.alt && <circle cx={248} cy={128} r={7} strokeWidth={2.2} />}
          <Seated x={left.x} y={left.y} flip={false} mood={m.mood} hair={m.hair} glasses={m.glasses} tie={m.tie} hand={[46, -36]} hand2={[28, -8]} />
          <Seated x={right.x} y={right.y} flip mood={m.mood === "stressed" ? "focused" : "relieved"} hair={((m.hair + 2) % 4) as Hair} glasses={!m.glasses} tie={!m.tie} hand={[-52, -38]} hand2={[-28, -6]} />
        </>
      ),
    };
  }

  if (theme === "board") {
    const hip = { x: 86, y: 140 };
    const mouth = mouthOf(hip.x, hip.y, false);
    return {
      aimX: mouth.x,
      aimY: mouth.y,
      dir: "nw",
      node: (
        <>
          {backdrop}
          <Board x={176} y={28} />
          <Papers x={18} y={112} />
          <path d="M268 86 l10 22" stroke={GOLD} strokeWidth={3.4} />
          <Seated x={hip.x} y={hip.y} flip={false} mood={m.mood} hair={m.hair} glasses={m.glasses} tie={false} hand={[96, -78]} hand2={[48, -6]} />
        </>
      ),
    };
  }

  const hip = { x: theme === "chat" ? 96 : 108, y: 138 };
  const mouth = mouthOf(hip.x, hip.y, false);
  return {
    aimX: mouth.x,
    aimY: mouth.y,
    dir: "nw",
    node: (
      <>
        {backdrop}
        <Desk x={150} y={146} w={156} />
        {theme === "chat" ? <ChatCard x={214} y={36} /> : <Clock x={262} y={42} />}
        <Laptop x={176} y={104} />
        <Papers x={248} y={96} />
        <Seated x={hip.x} y={hip.y} flip={false} mood={m.mood} hair={m.hair} glasses={m.glasses} tie={m.tie} hand={[78, -8]} hand2={[52, 2]} />
      </>
    ),
  };
}
