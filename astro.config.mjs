// @ts-check
import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

export default defineConfig({
  adapter: cloudflare(),
  integrations: [mdx(), react()],
  vite: {
    plugins: [tailwindcss()],
  },
});