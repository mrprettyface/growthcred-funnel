import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        /**
         * Keep the animation libraries in separate chunks.
         *
         * Left alone, Rollup groups everything shared into one vendor chunk, so
         * the landing page — which needs gsap and lenis for its scroll work —
         * was also downloading `motion` (~60 kB gzipped) that only the webinar
         * seat form uses. Splitting them means each page pays for what it
         * actually runs.
         */
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          // React first. Without naming it, Rollup folds it into whichever
          // manual chunk it meets first — which put React inside a chunk called
          // "vendor-motion", so every page loaded "motion" whether it used it
          // or not. Naming React keeps the other chunks honest.
          if (
            id.includes("node_modules/react/") ||
            id.includes("node_modules/react-dom/") ||
            id.includes("node_modules/scheduler/")
          )
            return "vendor-react";
          if (id.includes("node_modules/motion") || id.includes("node_modules/framer-motion"))
            return "vendor-motion";
          if (id.includes("node_modules/gsap")) return "vendor-gsap";
          if (id.includes("node_modules/lenis")) return "vendor-lenis";
          if (id.includes("node_modules/ogl")) return "vendor-ogl";
        },
      },
    },
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
  },
});
