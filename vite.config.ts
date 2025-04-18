import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { tempo } from "tempo-devtools/dist/vite";

// https://vitejs.dev/config/
export default defineConfig({
  base:
    process.env.NODE_ENV === "development"
      ? "/"
      : process.env.VITE_BASE_PATH || "/",
  optimizeDeps: {
    entries: ["src/main.tsx", "src/tempobook/**/*"],
  },
  plugins: [react(), tempo()],
  resolve: {
    preserveSymlinks: true,
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true,
    port: 3000,
    strictPort: false,
    // Using proper typing for allowedHosts
    allowedHosts: process.env.TEMPO === "true" ? true : undefined,
    cors: true,
    hmr: {
      clientPort: process.env.TEMPO === "true" ? 443 : 3000,
      host:
        process.env.TEMPO === "true"
          ? "festive-leakey4-993dm.view-3.tempo-dev.app"
          : "localhost",
      protocol: process.env.TEMPO === "true" ? "wss" : "ws",
      timeout: 120000,
    },
  },
});
