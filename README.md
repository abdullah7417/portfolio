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

## Architecture Decisions

Deviations from `PROJECT_STRUCTURE.v2.md`, as required by the standard:

- **English only, no `@nuxtjs/i18n`.** The site has a single audience and language. User-facing text lives in `app/data/portfolio.ts` and component templates instead of locale files. Components still use logical properties (`ms-*`, `pe-*`, `end-*`) where possible, so adding Arabic later is mostly a content task.
- **Content in `app/data/portfolio.ts`.** There is no backend; the content is static, typed with `shared/types/portfolio.ts`, and imported explicitly.
- **No auth, dashboard, Pinia, Sentry, `@nuxtjs/seo` or `nuxt-security`.** Not needed for a single public page; add them if the site grows.
- **Rate limiting is in-memory** (`server/utils/rate-limit.ts`), per serverless instance. That is enough to stop casual spam on the contact form; use a shared store (e.g. Upstash) if abuse appears.
- **Animations use `motion-v`** (the Vue port of Framer Motion), wrapped in small primitives in `components/app/`: `AppReveal`, `AppSplitWords`, `AppTiltCard`, `AppMagnetic`, `AppCountUp`. `MotionConfig reduced-motion="user"` plus `useFinePointer()` disable motion-heavy effects for reduced-motion and touch users.
- **TypeScript is pinned to 5.x.** `vue-tsc` does not support TypeScript 7 yet.

## Known issue: local production build on Windows

`pnpm build` on Windows fails while prerendering `/` (`Only URLs with a scheme in: file, data, and node are supported… Received protocol 'c:'`). This is a Nitro prerender path bug on Windows. Vercel builds on Linux and is not affected. To test a production build locally on Windows, temporarily set `routeRules: { '/': { prerender: false } }`.
