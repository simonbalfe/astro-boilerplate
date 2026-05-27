# Astro Boilerplate

Astro 6 + Tailwind CSS v4 + Cloudflare Workers. Copy this template, never edit in place.

## Stack

- **Astro 6.3** with strict TypeScript
- **Tailwind CSS v4.1** via `@tailwindcss/vite` (pinned to ~4.1.x for Vite 7 compatibility) + `@tailwindcss/typography` for prose
- **MDX** via `@astrojs/mdx` for rich content pages with embedded components
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

- `astro.config.mjs` - Astro config with Cloudflare adapter, MDX, and Tailwind vite plugin
- `wrangler.jsonc` - Cloudflare Workers config (rename `name` field per project)
- `src/styles/global.css` - Tailwind entry point and design token definitions
- `src/layouts/BaseLayout.astro` - base HTML layout, imports global CSS
- `src/components/Navbar.astro` - sticky top navbar with active link state
- `src/components/Callout.astro` - info/warning/success callout, usable in MDX
- `src/pages/index.astro` - starter page
- `src/pages/example.mdx` - sample MDX page showing component usage
- `.github/workflows/deploy.yml` - auto-deploy to CF Workers on push to main

## Design tokens

All colors are defined as semantic tokens in `src/styles/global.css` via Tailwind v4's `@theme` directive. Components use token names, never raw Tailwind palette colors (no `indigo-600`, `gray-200`, etc.).

Two-layer structure:

- **Primitives** (brand palette): `brand-50` through `brand-700`. Raw OKLCH values. To rebrand, change the hue (265) and chroma values here.
- **Semantic** (purpose-driven): what components actually reference.

Semantic token map:

| Token | Purpose |
|---|---|
| `surface`, `surface-subtle` | Page and card backgrounds |
| `border`, `border-subtle` | Borders and dividers |
| `text-primary`, `text-secondary`, `text-muted` | Text hierarchy |
| `action`, `action-hover`, `action-subtle`, `action-ring` | Buttons, links, interactive elements (aliases brand palette) |
| `success-50`, `success-600` | Success states |
| `warning-50`, `warning-600` | Warning states |
| `info-50`, `info-600` | Info states |

Usage in markup: `bg-surface`, `text-text-primary`, `border-border`, `bg-action`, `hover:bg-action-hover`, `text-success-600`, etc.

To add a new semantic color: add the `--color-*` variable to the `@theme` block. Tailwind v4 auto-generates the utility classes.

## Deployment

GitHub Actions deploys on every push to `main`. Two secrets required in the repo:

- `CLOUDFLARE_EMAIL` - CF account email
- `CLOUDFLARE_API_KEY` - CF global API key

## Version pinning

`@tailwindcss/vite` and `tailwindcss` are pinned to `~4.1.x` because 4.2+ requires Vite 8, which Astro 6 does not yet support. Unpin when Astro upgrades to Vite 8.

Knip's `ignoreDependencies` includes `tailwindcss` and `@tailwindcss/typography` because they are loaded via CSS (`@import` and `@plugin`), not JS imports.
