import { StickScene } from "./StickScene";

/**
 * A short set of animated stick scenes for the homepage (hero, the offer,
 * and how the work runs). Copy, structure, prices and CTAs are unchanged.
 * Reduced motion is handled by the stick-scene runtime: one still frame.
 */

export const HOME_STICK_SCENE_NAMES = ["homeHats", "homeOwn", "homeAudit", "homeDeploy", "homeEmbed"] as const;

export type HomeStickSceneName = (typeof HOME_STICK_SCENE_NAMES)[number];

export const METHOD_STICK_SCENES: HomeStickSceneName[] = ["homeAudit", "homeDeploy", "homeEmbed"];

const LABELS: Record<HomeStickSceneName, string> = {
  homeHats: "Papers fly to a person, then they walk to their own building and it lights up.",
  homeOwn: "A person walks to their building, a gold padlock closes on it, and a light comes on inside.",
  homeAudit: "A person looks on as a magnifying glass moves across a document and a gold highlight follows it.",
  homeDeploy: "A gold box slides into a building and a light comes on inside.",
  homeEmbed: "A person stands beside a gold core in a loop that turns and keeps going.",
};

export function HomeStickScene({
  name,
  className,
  size = "card",
}: {
  name: HomeStickSceneName;
  className?: string;
  size?: "hero" | "card" | "inline" | "tile";
}) {
  return (
    <StickScene
      scene={name}
      label={LABELS[name]}
      sceneSrc="/scenes/home.js"
      className={className}
      size={size}
      dataScene={name}
    />
  );
}
