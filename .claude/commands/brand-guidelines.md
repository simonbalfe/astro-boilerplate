---
description: Show this project's design system, token map, and rules for adapting external designs.
---

# Brand guidelines

When invoked, follow these rules for any UI work in this project. Read `src/styles/global.css` if you need to confirm the current token values.

## Design tokens

Full shadcn/ui token system in `src/styles/global.css`. Single source of truth for branding — change a CSS var, every component updates.

Structure (3 layers):

1. `:root { --token: oklch(...) }` — light mode values
2. `.dark { --token: oklch(...) }` — dark mode overrides (activates when `.dark` is on `<html>`)
3. `@theme inline { --color-token: var(--token) }` — exposes each token as a Tailwind utility class

Token map:

| Token | Purpose |
|---|---|
| `background`, `foreground` | Page background + default text |
| `card`, `card-foreground` | Card background + text on cards |
| `popover`, `popover-foreground` | Popover/menu background + text |
| `primary`, `primary-foreground` | Brand color — buttons, links, primary CTAs |
| `secondary`, `secondary-foreground` | Subtle alt buttons, secondary chips |
| `muted`, `muted-foreground` | Subtle backgrounds + de-emphasized text |
| `accent`, `accent-foreground` | Hover states, highlighted rows, soft fills |
| `destructive`, `destructive-foreground` | Errors, delete actions |
| `success`, `success-foreground` | Success states (extension, not in default shadcn) |
| `warning`, `warning-foreground` | Warning states (extension) |
| `info`, `info-foreground` | Info states (extension) |
| `border`, `input`, `ring` | Borders, form inputs, focus rings |
| `chart-1` … `chart-5` | Data viz palette |
| `sidebar-*` | Dedicated sidebar palette (sidebar, sidebar-foreground, sidebar-primary, sidebar-accent, sidebar-border, sidebar-ring + foregrounds) |

`--radius` controls border-radius scale. `--radius-sm/md/lg/xl` derive from it.

`@layer base` applies `border-border` + `outline-ring/50` to all elements and sets `bg-background text-foreground` on `<body>`. The base layout body class is redundant but explicit.

## Usage patterns

- Saturated fill: `bg-primary text-primary-foreground`, `bg-destructive text-destructive-foreground`
- Tinted callout: `bg-success/10 text-success border-success/20` (status colors only — use opacity to tint)
- Subtle surface: `bg-muted` or `bg-accent`
- Hover on a primary button: `hover:bg-primary/90` (shadcn convention — opacity, not a separate token)
- Text hierarchy: `text-foreground` (primary), `text-muted-foreground` (secondary/captions)

## Rebranding

To rebrand: change `--primary` (and its foreground) in `:root` and `.dark`. Everything cascades. For a colored brand, use OKLCH (e.g. `oklch(0.55 0.24 265)` for indigo).

## Adding new tokens

Declare in both `:root` and `.dark`, then expose under `@theme inline` as `--color-<name>: var(--<name>)`. Tailwind v4 auto-generates the utility.

## Adapting external designs

When the user provides a screenshot, example repo, code snippet, or reference design, always adapt it to this shadcn token system. Never paste raw Tailwind palette colors (`indigo-600`, `gray-200`, etc.) into components.

Process:

1. **Extract colors** from the source material. Identify the brand color, neutral scale, accent colors, and any status colors (success, warning, error, info).
2. **Map to existing tokens** first. Their brand color → `primary`. Their cards/panels → `card`. Their subtle backgrounds → `muted` or `accent`. Their borders → `border`. Their body text → `foreground`, captions → `muted-foreground`.
3. **Update the var, not the markup**. If the brand color is wrong, change `--primary` and `--primary-foreground` in `:root` (and `.dark`). Components stay on `bg-primary text-primary-foreground`.
4. **Add new tokens** only when an existing one truly does not fit (e.g. design uses a secondary brand hue that is not destructive/success/warning/info). Add to both `:root` and `.dark`, then expose under `@theme inline`. Never add one-off raw values to components.
5. **Convert to OKLCH**. All color values use `oklch(lightness chroma hue)` for perceptual uniformity.
6. **Replace in markup**. Every class uses token utilities (`bg-primary`, `text-foreground`, `border-border`). Opacity for tints (`bg-primary/10`), not separate tokens.

What counts as a new token vs. using an existing one:

- Different shade of the brand for a hover state: don't add a token — use opacity (`hover:bg-primary/90`)
- A completely new accent hue used across the brand (e.g. teal as a secondary brand color): add `--brand-2` + `--brand-2-foreground` tokens, expose under `@theme inline`
- A slightly different gray: use the closest existing `muted`/`accent`/`border` token. Do not add a new token for every gray shade.

If the source uses a color with no clear semantic role, ask the user what it represents before adding a token.
