# Astro Boilerplate

Project shell for new Astro apps. Pre-wired with Tailwind v4, the shadcn token system, React 19 islands, an MDX blog scaffold, and a Cloudflare Workers adapter. Copy this template, never edit in place.

## Stack

- **Astro 6.3** with strict TypeScript
- **Tailwind CSS v4.1** via `@tailwindcss/vite` (pinned to ~4.1.x for Vite 7 compatibility) + `@tailwindcss/typography` for prose
- **MDX** via `@astrojs/mdx` for rich content pages with embedded components
- **React 19** via `@astrojs/react` for interactive client components (Astro islands)
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

- `astro.config.mjs` - Astro config with Cloudflare adapter, MDX, React, and Tailwind vite plugin
- `tsconfig.json` - strict TS + JSX (`react-jsx`, `jsxImportSource: "react"`)
- `wrangler.jsonc` - Cloudflare Workers config (rename `name` field per project)
- `src/styles/global.css` - Tailwind entry point and shadcn token definitions
- `src/content.config.ts` - blog collection schema (uses `glob` loader)
- `src/content/blog/` - MDX posts (one per file, slug = filename)
- `src/layouts/BaseLayout.astro` - base HTML layout, imports global CSS
- `src/components/Navbar.astro` - sticky top navbar with active link state
- `src/components/Callout.astro` - info/warning/success callout, usable in MDX
- `src/components/Counter.tsx` - sample React island (uses shadcn tokens)
- `src/pages/index.astro` - landing page demoing tokens + React island
- `src/pages/blog/index.astro` - blog post list
- `src/pages/blog/[...slug].astro` - dynamic post renderer (calls `render()` from `astro:content`)
- `.claude/commands/brand-guidelines.md` - design system rules, token map, design adaptation process
- `.github/workflows/deploy.yml` - auto-deploy to CF Workers on push to main

## React (Astro islands)

React components live in `src/components/*.tsx`. Use `className` (not `class`) inside `.tsx` files. They render as static HTML by default. Add a client directive when you need interactivity:

- `client:load` - hydrate immediately on page load
- `client:idle` - hydrate when the browser is idle
- `client:visible` - hydrate when scrolled into view (best for below-the-fold widgets)
- `client:only="react"` - skip SSR, render only on the client

Import a React component into a `.astro` page and apply the directive at the call site: `<Counter client:load initial={0} />`. Without a directive, only the static HTML is shipped — no JS bundle.

## Blog

Blog uses Astro content collections (Astro 5+ `glob` loader API).

- Schema in `src/content.config.ts`. Frontmatter is validated: `title` (required), `pubDate` (required, coerced to Date), `description` (optional), `draft` (optional, defaults false).
- Add a post: drop a `.md` or `.mdx` file into `src/content/blog/`. The filename is the slug — `hello-world.mdx` → `/blog/hello-world`.
- Posts marked `draft: true` are filtered out of the list and the slug index.
- The `[...slug].astro` page calls `render(post)` to get a `Content` component and renders inside a `prose` container. Add MDX-only features (imports, components) by writing `.mdx`.

## Design system

Full shadcn/ui token system in `src/styles/global.css`. Run `/brand-guidelines` for the token map, usage patterns, rebranding steps, and rules for adapting external designs.

Quick reference: change `--primary` (and `--primary-foreground`) in `:root` and `.dark` to rebrand. Components use `bg-primary text-primary-foreground`, `bg-muted`, `text-muted-foreground`, `bg-success/10 text-success`, etc. Never raw palette colors (`indigo-600`, `gray-200`).

## Deployment

GitHub Actions deploys on every push to `main`. Two secrets required in the repo:

- `CLOUDFLARE_EMAIL` - CF account email
- `CLOUDFLARE_API_KEY` - CF global API key

## Version pinning

`@tailwindcss/vite` and `tailwindcss` are pinned to `~4.1.x` because 4.2+ requires Vite 8, which Astro 6 does not yet support. Unpin when Astro upgrades to Vite 8.

Knip's `ignoreDependencies` includes `tailwindcss` and `@tailwindcss/typography` because they are loaded via CSS (`@import` and `@plugin`), not JS imports.
