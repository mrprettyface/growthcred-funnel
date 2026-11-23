import { useEffect } from "react";

/**
 * Shared loader for the vendored stick-scene runtime (public/scenes/stick.js,
 * MIT © Kamran Ahmed) and a page's scene file. Theme is the GrowthCred
 * midnight / gold set. The runtime itself is never modified.
 */

export const STICK_THEME = {
  ink: "#1a1a24",
  paper: "#fffdf8",
  butter: "#f2c86e",
  butterHi: "#c8a04a",
  butterSoft: "#f8e7c0",
  umber: "#6b4f1d",
  amber: "#c8a04a",
};

let runtimePromise: Promise<void> | null = null;
const sceneFiles = new Map<string, Promise<void>>();

export function loadStickScenes(sceneSrc: string) {
  if (typeof window === "undefined") return Promise.resolve();

  if (!runtimePromise) {
    runtimePromise = new Promise((resolve, reject) => {
      const apply = () => {
        window.STICK?.theme(STICK_THEME);
        resolve();
      };
      if (window.STICK) {
        apply();
        return;
      }
      const runtime = document.createElement("script");
      runtime.src = "/scenes/stick.js";
      runtime.onload = apply;
      runtime.onerror = () => reject(new Error("stick.js failed to load"));
      document.head.appendChild(runtime);
    });
  }

  let file = sceneFiles.get(sceneSrc);
  if (!file) {
    file = runtimePromise.then(
      () =>
        new Promise<void>((resolve, reject) => {
          if (document.querySelector(`script[src="${sceneSrc}"]`)) {
            resolve();
            return;
          }
          const scenes = document.createElement("script");
          scenes.src = sceneSrc;
          scenes.onload = () => resolve();
          scenes.onerror = () => reject(new Error(`${sceneSrc} failed to load`));
          document.head.appendChild(scenes);
        }),
    );
    sceneFiles.set(sceneSrc, file);
  }
  return file;
}

export function StickScene({
  scene,
  label,
  sceneSrc,
  className,
  size = "card",
  dataScene,
}: {
  scene: string;
  label: string;
  sceneSrc: string;
  className?: string;
  size?: "hero" | "card" | "inline" | "tile";
  dataScene?: string;
}) {
  useEffect(() => {
    void loadStickScenes(sceneSrc);
  }, [sceneSrc]);

  return (
    <span data-scene={dataScene ?? scene} data-size={size} className={`gc-pop gc-stick-frame ${className ?? ""}`.trim()}>
      <stick-scene scene={scene} play="view" no-font="" label={label} />
    </span>
  );
}
