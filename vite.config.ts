import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    // server.entry points TanStack Start at src/server.ts (our SSR error wrapper).
    tanstackStart({ server: { entry: "server" } }),
    nitro({ preset: "vercel" }),
    viteReact(),
    tailwindcss(),
  ],
});
