import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Staging stays out of search until the real domain is pointed here. At cutover,
// set ALLOW_INDEXING=true in Vercel's environment variables and redeploy.
const allowIndexing = process.env.ALLOW_INDEXING === "true";

export default defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    // server.entry points TanStack Start at src/server.ts (our SSR error wrapper).
    tanstackStart({ server: { entry: "server" } }),
    nitro({
      preset: "vercel",
      routeRules: allowIndexing
        ? {}
        : { "/**": { headers: { "X-Robots-Tag": "noindex, nofollow" } } },
    }),
    viteReact(),
    tailwindcss(),
  ],
});
