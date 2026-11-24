export {};

declare global {
  interface Window {
    STICK?: {
      theme: (over: Record<string, string>) => void;
      at: (el: HTMLElement, o: Record<string, number>) => boolean;
      SCENES?: Record<string, unknown>;
    };
    SCENES?: Record<string, unknown>;
    RIG?: unknown;
  }

  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        "stick-scene": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
          scene?: string;
          play?: "view" | "click" | "hover" | "loop" | "idle";
          label?: string;
          zoom?: string;
          "no-font"?: string;
          "no-floor"?: string;
          "no-ground"?: string;
        };
      }
    }
  }
}
