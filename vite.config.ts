import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { nitro } from "nitro/vite";

export default defineConfig({
  tanstackStart: {
    server: {
      entry: "src/server.ts" // Ensure this matches your file path
    },
    deploymentTarget: "vercel",
  },
  cloudflare: false,
  plugins: [nitro()],
});