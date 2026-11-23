import { StickScene } from "./StickScene";

/**
 * Animated stick-figure scenes for /private-ai.
 *
 * The drawings are canvas scenes in public/scenes/private-ai.js, played by the
 * vendored stick-scene runtime (public/scenes/stick.js, MIT © Kamran Ahmed).
 * Each scene idles, then plays once when it scrolls into view, and again on
 * click. With reduced motion, the runtime shows one still frame and never plays.
 *
 * The previous static SVGs (same metaphors, house hand) are replaced only on
 * this page. data-scene is kept so scripts/verify-private-ai.mjs still counts
 * them. Copy is unchanged.
 */

export const PRIVATE_AI_SCENE_NAMES = [
  "hero",
  "paste",
  "meter",
  "border",
  "ban",
  "seats",
  "build",
  "stays",
  "flat",
  "knows",
  "market",
  "breakeven",
  "law",
  "finance",
  "health",
  "owner",
  "messy",
  "bulb",
  "seed",
  "audit",
  "deploy",
  "embed",
  "key",
] as const;

export type PrivateAiSceneName = (typeof PRIVATE_AI_SCENE_NAMES)[number];

const LABELS: Record<PrivateAiSceneName, string> = {
  hero: "A person walks to their building, their own AI lights up inside, and they stand beside it.",
  paste: "A person pastes a document from a laptop and it flies away into a distant cloud.",
  meter: "Three people stand while a gold line on a chart climbs with the headcount.",
  border: "A gold document is carried across a border to a globe on the other side.",
  ban: "A person hides a phone under the desk, and a cross appears above it.",
  seats: "Three chairs stand in a row and a gold price tag drops onto each one.",
  build: "A person tries to fix a smoking box with a spanner.",
  stays: "A gold padlock drops onto a building and closes, so the data stays inside.",
  flat: "A cost line climbs and then goes flat in gold.",
  knows: "A person shows a document of their own work, and a gold tick appears on it.",
  market: "Three bars on a chart rise, and the tallest one is gold.",
  breakeven: "A climbing rent line crosses a flat owning line at a gold point.",
  law: "A set of scales tips, and one pan settles in gold.",
  finance: "Coins stack up, and a gold coin lands on the pile.",
  health: "A gold cross is drawn on a patient file.",
  owner: "A briefcase closes and a gold latch clicks shut.",
  messy: "A person stands among scattered files that slide further out of order.",
  bulb: "A person looks at a lightbulb as it lights up in gold.",
  seed: "A person watches a seedling grow from a pot; one leaf turns gold.",
  audit: "A magnifying glass moves across a document and a gold highlight follows it.",
  deploy: "A gold box slides into a building.",
  embed: "A gold core sits in the middle of a loop that turns once and keeps going.",
  key: "A person holds out a gold key.",
};

export function PrivateAiScene({
  name,
  className,
  size = "card",
}: {
  name: PrivateAiSceneName;
  className?: string;
  size?: "hero" | "card" | "inline";
}) {
  return (
    <StickScene
      scene={name}
      label={LABELS[name]}
      sceneSrc="/scenes/private-ai.js"
      className={className}
      size={size}
      dataScene={name}
    />
  );
}
