# Astro Boilerplate

Astro 6 + Tailwind CSS v4 + Cloudflare Workers. Copy this template, never edit in place.

## Stack

- **Astro 6.3** with strict TypeScript
- **Tailwind CSS v4.1** via `@tailwindcss/vite` (pinned to ~4.1.x for Vite 7 compatibility)
- **Cloudflare Workers** via `@astrojs/cloudflare` adapter
- **Biome** for linting and formatting
- **Knip** for unused dependency/export detection
- **pnpm** as package manager

## Commands

```
pnpm dev        # dev server
pnpm build      # production build
pnpm preview    # preview production build locally
pnpm check      # astro type checking
pnpm lint       # biome lint + format check
pnpm lint:fix   # auto-fix lint/format issues
pnpm unused     # detect unused deps/exports
pnpm deploy     # deploy to Cloudflare Workers (requires wrangler auth)
```

## Key files

- `astro.config.mjs` - Astro config with Cloudflare adapter and Tailwind vite plugin
- `wrangler.jsonc` - Cloudflare Workers config (rename `name` field per project)
- `src/styles/global.css` - Tailwind entry point (`@import "tailwindcss"`)
- `src/layouts/BaseLayout.astro` - base HTML layout, imports global CSS
- `src/pages/index.astro` - starter page
- `.github/workflows/deploy.yml` - auto-deploy to CF Workers on push to main

## Deployment

GitHub Actions deploys on every push to `main`. Two secrets required in the repo:

- `CLOUDFLARE_API_TOKEN` - CF API token with Workers edit permission
- `CLOUDFLARE_ACCOUNT_ID` - CF account ID

## Version pinning

`@tailwindcss/vite` and `tailwindcss` are pinned to `~4.1.x` because 4.2+ requires Vite 8, which Astro 6 does not yet support. Unpin when Astro upgrades to Vite 8.

Knip's `ignoreDependencies` includes `tailwindcss` because it is a peer dependency of `@tailwindcss/vite` (imported via CSS `@import`, not JS).
