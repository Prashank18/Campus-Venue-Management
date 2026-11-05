import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (/node_modules\/(react|react-dom|react-router|scheduler)\//.test(id)) return "react-vendor";
          if (/node_modules\/(@mui|@emotion)\//.test(id)) return "mui-vendor";
          if (/node_modules\/(recharts|d3-[^/]+)\//.test(id)) return "charts-vendor";
          if (id.includes("node_modules/lucide-react/")) return "icons-vendor";
        },
      },
    },
  },
});
