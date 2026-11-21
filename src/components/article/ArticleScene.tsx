import type { ReactNode } from "react";
import { GOLD } from "../sceneKit";

/**
 * One hand-drawn scene per section. The seed picks the pose, the marks and
 * where the subject sits, so two pages never share a composition. Palette
 * stays midnight line, cream paper and one gold blob.
 */

type Mood = "stressed" | "focused" | "relieved";
type Pose = "stand" | "sit" | "point" | "type" | "hold" | "hands";
type Theme = "desk" | "laptop" | "clock" | "invoice" | "chat" | "meeting" | "board" | "power";

function hash(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i += 1) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  return h >>> 0;
}

function themeOf(text: string, n: number): Theme {
  const t = text.toLowerCase();
  if (/chat|paste|popia|chatgpt|file|client/.test(t)) return "chat";
  if (/clock|hour|billing|leak|time|10/.test(t)) return "clock";
  if (/invoice|quote|price|cost|fee|r990|pay/.test(t)) return "invoice";
  if (/meet|team|council|group|staff|hire/.test(t)) return "meeting";
  if (/board|workshop|train|learn|habit|class/.test(t)) return "board";
  if (/power|load|eskom|outage|light|energy/.test(t)) return "power";
  if (/laptop|tool|automat|workflow|report|admin/.test(t)) return "laptop";
  return (["desk", "laptop", "clock", "invoice", "chat", "meeting", "board", "power"] as Theme[])[n % 8];
}

function Face({ mood }: { mood: Mood }) {
  const mouth = mood === "stressed" ? "M-3.2 5.5 q3.2 -3 6.4 0" : mood === "relieved" ? "M-3.2 4.5 q3.2 3.5 6.4 0" : "M-2.4 5 h4.8";
  return (
    <g strokeWidth={1.4}>
      <circle cx={-3.1} cy={-1} r={0.9} fill="#1a1a24" stroke="none" />
      <circle cx={3.1} cy={-1} r={0.9} fill="#1a1a24" stroke="none" />
      <path d={mouth} />
    </g>
  );
}

function Person({
  x,
  y,
  pose,
  mood,
  hair,
  glasses,
  tie,
}: {
  x: number;
  y: number;
  pose: Pose;
  mood: Mood;
  hair: number;
  glasses: boolean;
  tie: boolean;
}) {
  const arms =
    pose === "point"
      ? "M0 8 l22 -16 M0 8 l-8 14"
      : pose === "type"
        ? "M0 12 l16 6 M0 12 l-14 8"
        : pose === "hold"
          ? "M0 10 l12 12 M0 10 l-12 12"
          : pose === "hands"
            ? "M0 4 l-10 -8 M0 4 l10 -8"
            : pose === "sit"
              ? "M0 8 l14 6 M0 8 l-12 8"
              : "M0 10 l16 8 M0 10 l-14 12";
  const legs = pose === "sit" ? "M0 36 l-16 8 M0 36 l16 6" : "M0 40 l-9 18 M0 40 l9 18";
  const hairPath = hair % 3 === 1 ? "M-9 -10 q9 -12 18 0" : hair % 3 === 2 ? "M-4 -12 q6 -8 10 0" : "";
  return (
    <g transform={`translate(${x} ${y})`} strokeWidth={2.2}>
      <circle cx={0} cy={-9} r={9} strokeWidth={2.2} />
      {hairPath && <path d={hairPath} strokeWidth={2.4} />}
      <Face mood={mood} />
      {glasses && <path d="M-6 -1 h5 M1 -1 h5 M-1 -1 h2" strokeWidth={1.3} />}
      <path d="M0 0 V40" />
      {tie && <path d="M0 6 l4 10 l-4 3 l-4 -3 z" strokeWidth={1.3} />}
      <path d={arms} />
      <path d={legs} />
      {pose === "hold" && <rect x={-8} y={20} width={16} height={12} rx={1.5} strokeWidth={1.5} />}
    </g>
  );
}

function Desk({ x, y }: { x: number; y: number }) {
  return (
    <g strokeWidth={1.7}>
      <path d={`M${x} ${y} h92`} />
      <path d={`M${x + 10} ${y} v16 M${x + 82} ${y} v16`} />
    </g>
  );
}

function Laptop({ x, y }: { x: number; y: number }) {
  return (
    <g strokeWidth={1.6}>
      <rect x={x} y={y} width={54} height={36} rx={3} />
      <path d={`M${x + 8} ${y + 12} h28 M${x + 8} ${y + 20} h20 M${x + 8} ${y + 28} h24`} strokeWidth={1.2} />
      <path d={`M${x - 6} ${y + 36} h66`} />
    </g>
  );
}

function Clock({ x, y }: { x: number; y: number }) {
  return (
    <g strokeWidth={1.7}>
      <circle cx={x} cy={y} r={22} />
      <path d={`M${x} ${y} v-12`} strokeWidth={1.4} />
      <path d={`M${x} ${y} l-10 6`} stroke={GOLD} strokeWidth={2} />
    </g>
  );
}

function Papers({ x, y }: { x: number; y: number }) {
  return (
    <g strokeWidth={1.5}>
      <rect x={x + 6} y={y + 6} width={28} height={36} rx={2} />
      <rect x={x} y={y} width={28} height={36} rx={2} />
      <path d={`M${x + 6} ${y + 12} h16 M${x + 6} ${y + 18} h12`} strokeWidth={1.1} />
    </g>
  );
}

function Invoice({ x, y }: { x: number; y: number }) {
  return (
    <g strokeWidth={1.6}>
      <rect x={x} y={y} width={36} height={46} rx={2} />
      <path d={`M${x + 6} ${y + 12} h16 M${x + 6} ${y + 20} h22 M${x + 6} ${y + 28} h14`} strokeWidth={1.1} />
      <text x={x + 18} y={y + 42} textAnchor="middle" fontSize={11} fill="#1a1a24" stroke="none">R</text>
    </g>
  );
}

function Chat({ x, y }: { x: number; y: number }) {
  return (
    <g strokeWidth={1.6}>
      <rect x={x} y={y} width={78} height={52} rx={8} />
      <path d={`M${x + 18} ${y + 52} l-8 12 v-12`} />
      <path d={`M${x + 12} ${y + 16} h40 M${x + 12} ${y + 28} h28`} strokeWidth={1.2} />
      <circle cx={x + 62} cy={y + 16} r={8} stroke={GOLD} strokeWidth={2} />
      <path d={`M${x + 58} ${y + 16} h8`} stroke={GOLD} strokeWidth={2} />
    </g>
  );
}

function Table({ x, y }: { x: number; y: number }) {
  return (
    <g strokeWidth={1.7}>
      <rect x={x} y={y} width={120} height={10} rx={2} fill={GOLD} stroke="none" />
      <path d={`M${x + 16} ${y + 10} v16 M${x + 104} ${y + 10} v16`} />
    </g>
  );
}

function Board({ x, y }: { x: number; y: number }) {
  return (
    <g strokeWidth={1.6}>
      <rect x={x} y={y} width={86} height={52} rx={3} />
      <path d={`M${x + 12} ${y + 16} h28 M${x + 12} ${y + 28} h46 M${x + 12} ${y + 38} h20`} strokeWidth={1.2} />
    </g>
  );
}

function Power({ x, y, candle }: { x: number; y: number; candle: boolean }) {
  return candle ? (
    <g strokeWidth={1.6}>
      <path d={`M${x} ${y + 28} h16 l-2 -16 h-12 z`} />
      <path d={`M${x + 8} ${y + 12} q4 -10 0 -16`} stroke={GOLD} />
    </g>
  ) : (
    <g strokeWidth={1.6}>
      <rect x={x} y={y} width={22} height={16} rx={2} />
      <path d={`M${x + 6} ${y} v-8 M${x + 16} ${y} v-8`} />
      <path d={`M${x + 28} ${y + 8} h16`} stroke={GOLD} />
    </g>
  );
}

export function composedScene(seed: string, hint: string): { node: ReactNode; aimX: number; aimY: number } {
  const n = hash(seed);
  const theme = themeOf(`${hint} ${seed}`, n);
  const mood: Mood = (["stressed", "focused", "relieved"] as Mood[])[n % 3];
  const pose: Pose = (["stand", "sit", "point", "type", "hold", "hands"] as Pose[])[(n >> 3) % 6];
  const flip = (n >> 5) % 2 === 0;
  const blobX = flip ? 90 : 180;
  const aim = { x: flip ? 120 : 200, y: 92 };

  let prop: ReactNode = null;
  if (theme === "desk") {
    prop = <><Desk x={flip ? 36 : 150} y={128} /><Papers x={flip ? 48 : 168} y={86} /></>;
    aim.x = flip ? 70 : 190;
    aim.y = 110;
  } else if (theme === "laptop") {
    prop = <Laptop x={flip ? 28 : 168} y={96} />;
    aim.x = flip ? 55 : 195;
    aim.y = 110;
  } else if (theme === "clock") {
    prop = <><Desk x={flip ? 24 : 150} y={132} /><Clock x={flip ? 70 : 210} y={78} /></>;
    aim.x = flip ? 70 : 210;
    aim.y = 78;
  } else if (theme === "invoice") {
    prop = <Invoice x={flip ? 36 : 176} y={78} />;
    aim.x = flip ? 54 : 194;
    aim.y = 100;
  } else if (theme === "chat") {
    prop = <><Papers x={flip ? 24 : 200} y={90} /><Chat x={flip ? 150 : 36} y={70} /></>;
    aim.x = flip ? 210 : 90;
    aim.y = 86;
  } else if (theme === "meeting") {
    prop = <Table x={90} y={124} />;
    aim.x = 150;
    aim.y = 124;
  } else if (theme === "board") {
    prop = <Board x={flip ? 28 : 176} y={64} />;
    aim.x = flip ? 70 : 220;
    aim.y = 90;
  } else {
    prop = <Power x={flip ? 40 : 190} y={96} candle={(n >> 7) % 2 === 0} />;
    aim.x = flip ? 52 : 202;
    aim.y = 110;
  }

  const px = theme === "meeting" ? 110 : flip ? Math.min(246, aim.x + 48) : Math.max(46, aim.x - 48);
  const people = theme === "meeting"
    ? [
        { x: 110, y: 96, hair: n % 3, glasses: true, tie: false },
        { x: 156, y: 102, hair: (n + 1) % 3, glasses: false, tie: true },
        { x: 202, y: 96, hair: (n + 2) % 3, glasses: (n % 2) === 0, tie: false },
      ]
    : [{ x: px, y: theme === "laptop" || theme === "desk" ? 108 : 104, hair: n % 3, glasses: (n % 2) === 0, tie: (n % 3) === 0 }];

  return {
    aimX: aim.x,
    aimY: aim.y,
    node: (
      <>
        <ellipse cx={blobX} cy={108} rx={58} ry={36} fill={GOLD} fillOpacity={0.18} stroke="none" />
        <path d="M28 162 h264" strokeWidth={1.3} opacity={0.45} />
        <ellipse cx={px} cy={166} rx={18} ry={3} fill="#1a1a24" fillOpacity={0.08} stroke="none" />
        {prop}
        {people.map((person, i) => (
          <Person
            key={i}
            x={person.x}
            y={person.y}
            pose={theme === "meeting" ? (i === 1 ? "point" : "sit") : pose}
            mood={i === 0 ? mood : "focused"}
            hair={person.hair}
            glasses={person.glasses}
            tie={person.tie}
          />
        ))}
      </>
    ),
  };
}
