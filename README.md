# Abdullah Mohamed — Portfolio

Personal portfolio built with Nuxt 4, Nuxt UI v4, Tailwind CSS v4 and motion-v, following `PROJECT_STRUCTURE.v2.md`.

## Setup

```bash
pnpm install
cp .env.example .env   # optional, only needed for the contact form
pnpm dev               # http://localhost:3000
```

| Script | What it does |
|---|---|
| `pnpm dev` | Dev server with HMR |
| `pnpm build` | Production build |
| `pnpm preview` | Preview the production build |
| `pnpm lint` / `pnpm lint:fix` | ESLint (stylistic rules) |
| `pnpm typecheck` | `vue-tsc` type check |

## Editing content

All text, links and data live in **`app/data/portfolio.ts`**: profile, roles in the typewriter, about paragraphs, stats, services, skills, projects and experience.

- **Projects:** add an entry to `projects` and drop a screenshot in `public/images/projects/` (16:10 works best). Filter chips are generated from the tags automatically.
- **Resume:** put the PDF in `public/` and set `profile.resumeUrl` (e.g. `'/Abdullah_Mohamed_Resume.pdf'`). The navbar button, hero "Download CV" button and command-palette action appear only when it is set.
- **Experience:** set `end` for past jobs and `current: true` for the current one; `highlights` become the "Show N more" list.

## Contact form

The form posts to `server/api/contact.post.ts`, which validates with the shared Zod schema and sends the email through [Resend](https://resend.com).

| Env var | Purpose |
|---|---|
| `NUXT_RESEND_API_KEY` | Resend API key |
| `NUXT_CONTACT_TO_EMAIL` | Where messages are delivered |
| `NUXT_CONTACT_FROM_EMAIL` | Sender (must be a domain verified in Resend; `onboarding@resend.dev` works for testing) |

Without a key, the endpoint answers `503 CONTACT_UNAVAILABLE` and the form falls back to opening the visitor's email app with the message pre-filled.

## Deploy (Vercel)

1. Push the repo to GitHub and import it in Vercel. The Nuxt preset is detected automatically.
2. Add the env vars above (and `NUXT_PUBLIC_SITE_URL`) in **Project → Settings → Environment Variables**.
3. Deploy. `/` is prerendered at build time; `/api/contact` runs as a serverless function.

## Theme Builder

The palette button on the right edge opens a live theme editor. It covers colors (separate dark and light palettes), fonts and weights, border width and style, corner radii, and presets. Changes apply instantly, are saved in the browser's localStorage, and "Reset to default" restores the original design.

**How it works**

```text
useTheme() state ──► plugins/theme.ts ──► <style id="portfolio-theme"> CSS variables ──► every component
 (useState, one source of truth)   (themeToCss, server + client)      (base tokens)            (Tailwind / Nuxt UI classes)
```

| Piece | File |
|---|---|
| Types and allowed values (fonts, weights, border options) | `shared/types/theme.ts` |
| Validation of every theme before it is applied or restored | `shared/schemas/theme.schema.ts` |
| Default theme, presets, `themeToCss()` | `app/utils/theme.ts` |
| State and actions (`setColor`, `applyPreset`, `reset`…) | `app/composables/useTheme.ts` |
| CSS output + pre-paint script / localStorage sync | `app/plugins/theme.ts`, `app/plugins/theme.client.ts` |
| Derived tokens (muted surfaces, gradients, glass, radius scale) | `app/assets/css/main.css` |
| UI | `app/components/theme/` |

- The plugin writes only **base tokens** (`--ui-primary`, `--ui-bg`, `--ui-text`, `--theme-accent`, `--theme-font-*`, `--font-weight-*`, `--theme-radius-*`, `--theme-border-*`…). `main.css` derives the rest from them with `color-mix()`, so a single color change propagates everywhere.
- Saved themes are re-validated with Zod on load; invalid data is discarded. A tiny inline script re-applies the saved theme's CSS before first paint, so returning visitors don't see the default theme flash.
- Optional fonts are registered with `@nuxt/fonts` but not preloaded; a font file downloads only when a theme uses it.

**Adding a theme token**

1. Add the field to the matching interface in `shared/types/theme.ts` and to `themeSchema`.
2. Give it a value in `DEFAULT_THEME` and in each preset (`app/utils/theme.ts`).
3. Map it to a CSS variable in `themeToCss()` (colors: add it to `COLOR_VARIABLES`).
4. Use the variable in CSS or a Tailwind class (e.g. `text-(--theme-my-token)`), or expose it as a utility in `main.css`.
5. Add a control in the relevant `components/theme/Theme*Settings.vue`.

**Connecting a new component:** use the existing semantic classes and it follows the theme automatically: `text-primary`, `bg-default`, `bg-elevated`, `bg-muted`, `text-muted`, `text-highlighted`, `border-default`, `glass-card`, `btn-gradient`, `text-gradient`, `rounded-pill` (buttons and chips), `rounded-sm|md|xl|2xl`. Avoid hard-coded colors and `rounded-full` on controls (keep `rounded-full` for real circles such as dots and avatars).

## Architecture Decisions

Deviations from `PROJECT_STRUCTURE.v2.md`, as required by the standard:

- **English only, no `@nuxtjs/i18n`.** The site has a single audience and language. User-facing text lives in `app/data/portfolio.ts` and component templates instead of locale files. Components still use logical properties (`ms-*`, `pe-*`, `end-*`) where possible, so adding Arabic later is mostly a content task.
- **Content in `app/data/portfolio.ts`.** There is no backend; the content is static, typed with `shared/types/portfolio.ts`, and imported explicitly.
- **No auth, dashboard, Pinia, Sentry, `@nuxtjs/seo` or `nuxt-security`.** Not needed for a single public page; add them if the site grows.
- **Rate limiting is in-memory** (`server/utils/rate-limit.ts`), per serverless instance. That is enough to stop casual spam on the contact form; use a shared store (e.g. Upstash) if abuse appears.
- **Animations use `motion-v`** (the Vue port of Framer Motion), wrapped in small primitives in `components/app/`: `AppReveal`, `AppSplitWords`, `AppTiltCard`, `AppMagnetic`, `AppCountUp`. `MotionConfig reduced-motion="user"` plus `useFinePointer()` disable motion-heavy effects for reduced-motion and touch users.
- **TypeScript is pinned to 5.x.** `vue-tsc` does not support TypeScript 7 yet.
- **Theme tokens are runtime CSS variables, not only `app.config.ts`.** The Theme Builder needs any hex color at runtime, which Nuxt UI's named palettes can't express. The theme plugin overrides Nuxt UI's `--ui-*` tokens (with higher specificity) and `main.css` re-points Tailwind's radius scale at `--theme-radius-*`. `app.config.ts` still maps `primary` to the brand palette for Nuxt UI's internals.
- **Theme persistence uses localStorage, not a cookie.** `/` is prerendered, so the server can't read a per-visitor cookie anyway; a pre-paint inline script prevents the flash instead.

## Known issue: local production build on Windows

`pnpm build` on Windows fails while prerendering `/` (`Only URLs with a scheme in: file, data, and node are supported… Received protocol 'c:'`). This is a Nitro prerender path bug on Windows. Vercel builds on Linux and is not affected. To test a production build locally on Windows, temporarily set `routeRules: { '/': { prerender: false } }`.
