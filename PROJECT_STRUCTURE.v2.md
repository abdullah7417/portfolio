# Nuxt Golden Architecture & Development Standard

> **Version:** 2.1 Final · **Applies to:** all new Nuxt projects
> **Change policy:** architecture changes only when a real problem appears during implementation.
> **Baseline stack:** Nuxt 4 · Vue 3.5+ · TypeScript (strict) · Nuxt UI v4 · Tailwind CSS v4 · Nuxt i18n v10 · Pinia · Zod v4
>
> This document is the default. A project may deviate only when a requirement justifies it, and the deviation must be written down in the project `README.md` under **Architecture Decisions**.

---

## Table of Contents

1. [Goals](#1-goals)
2. [Fixed Decisions](#2-fixed-decisions)
3. [Folder Structure](#3-folder-structure)
4. [Where Does It Go?](#4-where-does-it-go)
5. [Layer Responsibilities & Data Flow](#5-layer-responsibilities--data-flow)
6. [Pages](#6-pages)
7. [Components](#7-components)
8. [Layouts](#8-layouts)
9. [Composables](#9-composables)
10. [API Client & Services](#10-api-client--services)
11. [Data Fetching](#11-data-fetching)
12. [State Management](#12-state-management)
13. [Authentication & Authorization](#13-authentication--authorization)
14. [Dashboard](#14-dashboard)
15. [Server (BFF)](#15-server-bff)
16. [TypeScript](#16-typescript)
17. [Validation & Forms](#17-validation--forms)
18. [Internationalization](#18-internationalization)
19. [RTL / LTR](#19-rtl--ltr)
20. [Theming & Design Tokens](#20-theming--design-tokens)
21. [Styling with Tailwind](#21-styling-with-tailwind)
22. [SEO](#22-seo)
23. [Performance](#23-performance)
24. [Caching](#24-caching)
25. [Error Handling & Observability](#25-error-handling--observability)
26. [Accessibility](#26-accessibility)
27. [Security](#27-security)
28. [Environment & Configuration](#28-environment--configuration)
29. [Testing](#29-testing)
30. [Tooling & Code Quality](#30-tooling--code-quality)
31. [Git Workflow](#31-git-workflow)
32. [Naming Conventions](#32-naming-conventions)
33. [Avoid Over-Engineering](#33-avoid-over-engineering)
34. [Checklists](#34-checklists)
35. [Definition of Done](#35-definition-of-done)

---

## 1. Goals

In priority order:

1. **Correctness & security:** validated input, no leaked secrets, safe auth.
2. **Maintainability:** anyone can open a feature and find its UI, logic, API calls, state, types, validation, translations and SEO in a predictable place.
3. **Performance:** SSR by default, minimal JavaScript, good Core Web Vitals.
4. **First-class Arabic/English:** RTL and LTR from the same components.
5. **SEO:** correct metadata, canonical URLs and `hreflang` on every public page.
6. **Accessibility:** WCAG 2.2 AA.
7. **Fast onboarding:** a new developer ships a feature in their first week.

---

## 2. Fixed Decisions

These are settled. Do not re-discuss them per feature.

| Concern | Decision |
|---|---|
| Framework | Nuxt 4 (`app/` directory structure) |
| Language | TypeScript, `strict: true`, no `any` |
| UI library | Nuxt UI v4. Use its components before writing your own |
| Styling | Tailwind CSS v4, CSS-first config (no `tailwind.config.ts`) |
| Theme | `app.config.ts` (`ui.colors`) + `@theme` in `main.css` |
| i18n | `@nuxtjs/i18n`, strategy `prefix_except_default` |
| Validation | Zod v4 schemas in `shared/schemas/`; explicit Nuxt endpoints reuse them, proxied routes are validated by the backend |
| Forms | `UForm` + Zod schema |
| Global state | `useState` for simple shared values, Pinia for domain stores |
| HTTP | One `$api` instance (`$fetch.create`) provided by a plugin |
| API layer | Service-only: every backend call goes Page/Composable → Service → `$api` |
| Auth session | httpOnly cookie. Tokens never touch `localStorage` |
| Authorization | Backend enforces; frontend uses `useAbility().can()` only to shape the UI |
| Error messages | Mapped from backend error `code` to i18n keys; raw backend `message` is never shown |
| Observability | Sentry (errors + traces), Web Vitals reporting, request IDs, structured logs |
| SEO | `@nuxtjs/seo` (sitemap, robots, schema.org, OG images) + `useLocaleHead` |
| Images / fonts / 3rd-party scripts | `@nuxt/image`, `@nuxt/fonts`, `@nuxt/scripts` |
| Security headers | `nuxt-security` |
| Lint / format | `@nuxt/eslint` (flat config, stylistic rules) |
| Type check | `nuxi typecheck` (vue-tsc) |
| Tests | Vitest + `@nuxt/test-utils` (unit / component), Playwright (e2e) |
| Package manager | pnpm, lockfile committed |
| Node | Current LTS, pinned in `.nvmrc` and `engines` |

---

## 3. Folder Structure

```text
.
├── app/                              # Everything that runs in the Vue app (Nuxt 4 srcDir)
│   ├── assets/
│   │   └── css/
│   │       └── main.css              # Tailwind + Nuxt UI imports, @theme tokens
│   │
│   ├── components/
│   │   ├── app/                      # App-wide shell & shared pieces → <AppHeader>, <AppEmptyState>
│   │   │   ├── AppHeader.vue
│   │   │   ├── AppFooter.vue
│   │   │   ├── AppLogo.vue
│   │   │   ├── AppLocaleSwitcher.vue
│   │   │   ├── AppEmptyState.vue
│   │   │   ├── AppErrorState.vue
│   │   │   └── AppSectionHeading.vue
│   │   │
│   │   ├── auth/                     # → <AuthLoginForm>, <AuthRegisterForm>
│   │   │   ├── AuthLoginForm.vue
│   │   │   ├── AuthRegisterForm.vue
│   │   │   ├── AuthForgotPasswordForm.vue
│   │   │   └── AuthResetPasswordForm.vue
│   │   │
│   │   ├── dashboard/                # → <DashboardSidebar>, <DashboardUserMenu>
│   │   │   ├── DashboardSidebar.vue
│   │   │   ├── DashboardNavbar.vue
│   │   │   └── DashboardUserMenu.vue
│   │   │
│   │   ├── home/                     # One folder per feature/domain
│   │   │   ├── HomeHero.vue
│   │   │   ├── HomeFeatures.vue
│   │   │   └── HomeFaq.vue
│   │   │
│   │   ├── settings/
│   │   │   └── SettingsProfileForm.vue
│   │   │
│   │   └── checkout/
│   │       ├── CheckoutForm.vue
│   │       ├── CheckoutSummary.vue
│   │       └── CheckoutPaymentMethod.vue
│   │
│   ├── composables/                  # Auto-imported
│   │   ├── useAuth.ts
│   │   ├── useAbility.ts             # Permission checks for the UI
│   │   ├── useErrorMessage.ts        # Error → translated message
│   │   ├── useSeo.ts
│   │   └── useCheckout.ts
│   │
│   ├── layouts/
│   │   ├── default.vue               # Public site: header / main / footer
│   │   ├── auth.vue                  # Auth flows
│   │   └── dashboard.vue             # Authenticated app shell
│   │
│   ├── middleware/
│   │   ├── auth.ts                   # Requires a session
│   │   ├── guest.ts                  # Only for signed-out users
│   │   └── permission.ts             # Requires meta.permission (UX only)
│   │
│   ├── pages/
│   │   ├── index.vue
│   │   ├── about.vue
│   │   ├── contact.vue
│   │   ├── pricing.vue
│   │   ├── auth/
│   │   │   ├── login.vue
│   │   │   ├── register.vue
│   │   │   ├── forgot-password.vue
│   │   │   └── reset-password.vue
│   │   ├── checkout/
│   │   │   └── [membershipId]/
│   │   │       └── [planId].vue
│   │   └── dashboard/
│   │       ├── index.vue
│   │       ├── profile.vue
│   │       └── settings.vue
│   │
│   ├── plugins/
│   │   └── api.ts                    # Provides $api and services
│   │
│   ├── services/                     # The ONLY place endpoint URLs live (NOT auto-imported)
│   │   ├── auth.service.ts
│   │   ├── user.service.ts
│   │   ├── membership.service.ts
│   │   └── checkout.service.ts
│   │
│   ├── stores/                       # Pinia stores, only when needed
│   │   └── cart.ts
│   │
│   ├── utils/                        # App-side (UI-layer) helpers; run on server during SSR too
│   │   └── format.ts
│   │
│   ├── app.config.ts                 # Nuxt UI theme (colors, component defaults)
│   ├── app.vue                       # <UApp> root, html lang/dir
│   └── error.vue                     # Global 404 / 500 page
│
├── shared/                           # Code used by BOTH app/ and server/
│   ├── types/                        # Auto-imported in app and server
│   │   ├── api.ts
│   │   ├── auth.ts
│   │   ├── user.ts
│   │   └── membership.ts
│   ├── schemas/                      # Zod schemas (imported explicitly)
│   │   ├── auth.schema.ts
│   │   └── checkout.schema.ts
│   └── utils/                        # Isomorphic pure helpers (auto-imported)
│       ├── constants.ts
│       ├── errors.ts                 # getApiError, getFieldErrors
│       └── permissions.ts            # PERMISSIONS constants + Permission type
│
├── server/                           # Nitro: server-only code
│   ├── api/
│   │   ├── auth/                     # Explicit endpoints: Zod-validated
│   │   │   ├── login.post.ts
│   │   │   ├── logout.post.ts
│   │   │   └── session.get.ts
│   │   └── [...path].ts              # Transparent BFF proxy (catch-all): allowlist + auth forwarding
│   ├── middleware/
│   │   └── request-id.ts             # Assigns/forwards X-Request-Id
│   ├── routes/
│   └── utils/
│       ├── backend.ts                # Server-side client for the real backend
│       └── proxy-allowlist.ts
│
├── i18n/
│   ├── i18n.config.ts
│   └── locales/
│       ├── ar.json
│       └── en.json
│
├── public/
│   ├── favicon.ico
│   └── images/                       # Static images that don't need processing
│
├── tests/
│   ├── unit/                         # Vitest (node env): utils, services, schemas
│   ├── nuxt/                         # Vitest (nuxt env): components, composables
│   └── e2e/                          # Playwright
│
├── .env.example                      # Every env var, with safe placeholder values
├── .nvmrc
├── eslint.config.mjs
├── nuxt.config.ts
├── playwright.config.ts
├── vitest.config.ts
├── tsconfig.json
├── package.json
└── README.md                         # Setup, scripts, Architecture Decisions
```

### Notes on the structure

- **`app/` vs `shared/` vs `server/`.** Code in `app/` must not import from `server/`, and `server/` must not import from `app/`. Anything both sides need (types, Zod schemas, constants) goes in `shared/`.
- **Component folder = name prefix.** Nuxt prefixes component names with their folder path and removes the duplicate when the file name already starts with it. `components/auth/AuthLoginForm.vue` becomes `<AuthLoginForm>`, but `components/auth/LoginForm.vue` would also become `<AuthLoginForm>`, and you can no longer find it by name. **Always start the file name with its folder name** so the file name and the tag match exactly.
- **No `components/ui/` wrappers.** Nuxt UI already provides `UButton`, `UInput`, `USelect`, `UModal`, `USkeleton`, etc. See [§7.3](#73-nuxt-ui-first).
- **No `stores/auth.ts` by default.** Auth state lives in `useAuth()` (see [§13](#13-authentication--authorization)). Add stores only for real shared domain state.
- **`app/` code is not "client-only".** Everything in `app/` (utils, composables, plugins, components) can run on the server during SSR. Code that touches `window`, `document`, `localStorage` or other browser APIs must either live in a `.client.ts` file (plugins/components), run inside `onMounted`, or be guarded with `if (import.meta.client)`.

### Scaling rule: group a layer by domain when it grows

The flat structure above is the default. When one domain grows beyond a few files **in a layer**, group only that layer by domain:

```text
app/services/
├── auth.service.ts               # small domains stay flat
└── checkout/
    ├── checkout.service.ts
    └── checkout.mapper.ts

app/composables/
└── checkout/
    ├── useCheckout.ts
    └── useCheckoutPayment.ts

shared/types/checkout/
shared/schemas/checkout/
```

- Grouping is per domain and per layer. Do not reorganize the whole project at once.
- Nested composables are not auto-imported by default. Either add the folder to `imports.dirs` (`'composables/**'`) or import explicitly. Pick one per project.
- Only when the project becomes very large (many teams, dozens of domains, or several apps sharing code) consider Nuxt Layers or domain modules. That is an architecture decision recorded in the README, not a default.

---

## 4. Where Does It Go?

| I need to… | Put it in |
|---|---|
| Add a route | `app/pages/` |
| Build UI for a feature | `app/components/<feature>/<Feature>Xxx.vue` |
| Reuse stateful logic across components | `app/composables/useXxx.ts` |
| Call a backend endpoint | `app/services/xxx.service.ts` |
| Share state across unrelated components | `useState` in a composable, or a Pinia store |
| Protect a route | `app/middleware/` + `definePageMeta` |
| Define an API response type | `shared/types/` |
| Validate a form (client) and a request body (server) | `shared/schemas/` |
| Write a pure helper used by app and server | `shared/utils/` |
| Write a helper only the Vue app uses (runs in SSR too) | `app/utils/` |
| Use a browser-only API (`window`, `localStorage`) | `.client.ts` plugin/component, `onMounted`, or `import.meta.client` guard |
| Check a permission in the UI | `useAbility().can()` |
| Keep a secret / talk to a private API | `server/` + private `runtimeConfig` |
| Add user-facing text | `i18n/locales/*.json` |
| Change brand colors / fonts | `app/assets/css/main.css` (`@theme`) + `app/app.config.ts` |
| Add a third-party script | `useScript*` from `@nuxt/scripts`, in the page that needs it |

---

## 5. Layer Responsibilities & Data Flow

```text
                 ┌──────────────┐
                 │     Page     │  routing, page data, SEO, layout, middleware
                 └──────┬───────┘
                        │ props / events
                        ▼
                 ┌──────────────┐
                 │  Components  │  UI only
                 └──────┬───────┘
                        │
            ┌───────────┴───────────┐
            ▼                       ▼
     ┌─────────────┐        ┌──────────────┐
     │ Composables │◄──────►│ useState /   │  shared client state
     └──────┬──────┘        │ Pinia stores │
            │               └──────────────┘
            ▼
     ┌─────────────┐
     │  Services   │  endpoint URLs, request/response typing, mapping
     └──────┬──────┘
            ▼
     ┌─────────────┐
     │    $api     │  base URL, headers, locale, request ID, 401 handling
     └──────┬──────┘
            ▼
     Nuxt server (BFF)  ──►  Backend API
```

| Layer | Owns | Must NOT |
|---|---|---|
| Pages | Route params, page-level data, SEO, layout, middleware | Contain large UI blocks or raw URLs |
| Components | Markup, presentation logic, emitting events | Call `$api`, `$fetch`, `useFetch` or services. A widget that needs data gets a composable |
| Composables | Reusable logic, orchestration, local + shared state | Contain markup |
| Stores | Shared domain state and its mutations | Hold page-local or form state |
| Services | Endpoint paths, typed request/response, data mapping | Touch UI, routing, or toasts |
| `$api` | Cross-cutting HTTP concerns | Contain domain logic |
| `server/` | Secrets, sessions, proxying, server-only logic | Be imported by `app/` |

**Data transformation rule:** raw API shapes stop at the service or composable. Components receive clean, UI-ready data (e.g. `Date` objects, localized labels, flattened fields).

---

## 6. Pages

A page composes components. It should:

- Read route params
- Load page-level data (SSR)
- Define SEO metadata
- Choose layout and middleware with `definePageMeta`

### Template

```vue
<!-- app/pages/pricing.vue -->
<script setup lang="ts">
const { t } = useI18n()
const { $services } = useNuxtApp()

const { data: plans, status, error, refresh } = await useAsyncData(
  'pricing-plans',
  () => $services.membership.listPlans(),
)

useSeo({
  title: t('pricing.seo.title'),
  description: t('pricing.seo.description'),
})
</script>

<template>
  <main>
    <PricingHero />
    <PricingSection
      :plans="plans ?? []"
      :loading="status === 'pending'"
      :error="error"
      @retry="refresh"
    />
    <PricingFaq />
  </main>
</template>
```

### Rules

- One `<h1>` per page.
- Pages under ~80 lines of template. If a section is independent, it becomes a component.
- Route params are validated with `definePageMeta({ validate })` or by a service that returns 404 via `createError`.

```ts
definePageMeta({
  validate: route => /^\d+$/.test(String(route.params.planId)),
})
```

---

## 7. Components

### 7.1 Single responsibility

Split a component when it has **independent responsibilities**, not when it hits an arbitrary line count.

```text
components/checkout/
├── CheckoutForm.vue            # collects data, emits submit
├── CheckoutSummary.vue         # displays totals
├── CheckoutPaymentMethod.vue   # payment method picker
└── CheckoutCoupon.vue          # coupon entry
```

### 7.2 Component contract

- Typed props and emits with type-based declarations.
- `defineModel()` for two-way binding instead of manual `modelValue` / `update:modelValue`.
- Components are **presentational by default**: data in through props, actions out through emits.

```vue
<script setup lang="ts">
const props = withDefaults(defineProps<{
  plan: Plan
  highlighted?: boolean
}>(), {
  highlighted: false,
})

const emit = defineEmits<{
  select: [planId: number]
}>()
</script>
```

### 7.3 Nuxt UI first

Before creating a component, check whether Nuxt UI provides it (`UButton`, `UInput`, `USelectMenu`, `UModal`, `USlideover`, `UTable`, `UForm`, `UFormField`, `UPagination`, `USkeleton`, `UHeader`, `UFooter`, `UDashboardSidebar`, …).

Create a project component only when:

- It **composes** several Nuxt UI components into a domain piece (e.g. `PricingCard`), or
- The design needs behavior Nuxt UI cannot provide.

Do **not** create thin wrappers like `AppButton.vue` that only forward props to `UButton`. Change defaults globally through `app.config.ts` instead:

```ts
// app/app.config.ts
export default defineAppConfig({
  ui: {
    button: {
      defaultVariants: { size: 'lg' },
    },
  },
})
```

### 7.4 Component checklist

1. Does it already exist in the project or in Nuxt UI?
2. Does it have one responsibility?
3. Does it work in RTL and LTR without changes?
4. Is it keyboard accessible?
5. Does it need client-side JavaScript at all?
6. Should it be lazy-loaded or lazily hydrated?

---

## 8. Layouts

```text
app/layouts/
├── default.vue     # Public: AppHeader / main / AppFooter
├── auth.vue        # Auth: branding + centered content
└── dashboard.vue   # App shell: UDashboardGroup + sidebar + navbar + content
```

- Pages choose a layout; they never repeat layout markup.
- The `default` layout is applied automatically; set `layout` only for others.

```ts
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})
```

---

## 9. Composables

A composable holds reusable **logic**, never markup.

```ts
// app/composables/useCheckout.ts
export function useCheckout(planId: MaybeRefOrGetter<number>) {
  const { $services } = useNuxtApp()
  const toast = useToast()
  const localePath = useLocalePath()
  const toMessage = useErrorMessage()

  const submitting = ref(false)

  async function submit(payload: CheckoutPayload) {
    if (submitting.value) return
    submitting.value = true
    try {
      const order = await $services.checkout.create(toValue(planId), payload)
      await navigateTo(localePath(`/dashboard/orders/${order.id}`))
    }
    catch (error) {
      toast.add({ color: 'error', title: toMessage(error, 'checkout.errors.failed') })
    }
    finally {
      submitting.value = false
    }
  }

  return { submitting: readonly(submitting), submit }
}
```

### Rules

- Name: `useXxx`, one composable per file.
- Accept `MaybeRefOrGetter` inputs and read them with `toValue()`.
- Return `readonly()` state when consumers must not mutate it.
- **Never declare shared state at module level** (`const user = ref()` outside the function). On the server, module state is shared by every request and leaks data between users. Use `useState` or Pinia.
- Use VueUse before writing browser utilities yourself (`useMediaQuery`, `useIntersectionObserver`, `useDebounceFn`, …).

---

## 10. API Client & Services

### 10.1 One API client

```ts
// app/plugins/api.ts
import { createAuthService } from '~/services/auth.service'
import { createMembershipService } from '~/services/membership.service'
import { createCheckoutService } from '~/services/checkout.service'

export default defineNuxtPlugin({
  name: 'api',
  setup(nuxtApp) {
    const config = useRuntimeConfig()
    const { locale } = nuxtApp.$i18n
    // During SSR, forward the session cookie and the request ID of the incoming request
    const headers = useRequestHeaders(['cookie'])
    const requestId = import.meta.server ? useRequestEvent()?.context.requestId : undefined

    const api = $fetch.create({
      baseURL: config.public.apiBase,
      headers,
      onRequest({ options }) {
        options.headers.set('Accept', 'application/json')
        options.headers.set('Accept-Language', locale.value)
        if (requestId) options.headers.set('X-Request-Id', requestId)
      },
      async onResponseError({ response }) {
        // Only react when a session we believed was valid has expired.
        // Anonymous 401s (e.g. the initial session check) are handled by the caller.
        if (response.status !== 401) return

        await nuxtApp.runWithContext(async () => {
          const auth = useAuth()
          if (!auth.isAuthenticated.value) return

          auth.clear()
          const route = useRoute()
          const middleware = [route.meta.middleware].flat()
          if (middleware.includes('auth')) {
            await navigateTo({ path: useLocalePath()('/auth/login'), query: { redirect: route.fullPath } })
          }
        })
      },
    })

    return {
      provide: {
        api,
        services: {
          auth: createAuthService(api),
          membership: createMembershipService(api),
          checkout: createCheckoutService(api),
        },
      },
    }
  },
})
```

The client is the **only** place that handles:

- Base URL
- Auth (cookie forwarding / auth header)
- `Accept`, `Content-Type`, `Accept-Language`
- Request ID forwarding
- Expired-session (401) handling

It does **not** turn errors into user messages. That is `useErrorMessage()`'s job ([§25.3](#253-error-normalization--safe-messages)).

### 10.2 Services

A service is a factory that receives the client. It owns endpoint paths, request/response types and mapping.

```ts
// app/services/membership.service.ts
export function createMembershipService(api: typeof $fetch) {
  return {
    listPlans() {
      return api<ApiResponse<Plan[]>>('/memberships/plans')
        .then(res => res.data)
    },

    getPlan(id: number) {
      return api<ApiResponse<Plan>>(`/memberships/plans/${id}`)
        .then(res => res.data)
    },
  }
}

export type MembershipService = ReturnType<typeof createMembershipService>
```

Why a factory instead of a global object:

- The client carries per-request context (cookies, locale) during SSR. A module-level client would share it between users.
- Services are trivial to unit-test by passing a mocked client.

### 10.3 Rules

- **Service-only.** Every backend call follows Page/Composable → Service → `$api`. There is no direct-call shortcut.
- A service method is required **even when it is three lines**. The point is not abstraction: it gives every backend contract (URL, method, request and response types) one known place.
- No endpoint URL appears outside `app/services/`. This is enforced in review and, where possible, by an ESLint `no-restricted-syntax` rule on `$fetch`/`useFetch` calls outside services.
- Pages, components and composables never call `$api`, `$fetch` or `useFetch` directly.
- Every service method has an explicit return type (inferred from the generic is fine).
- Services do not show toasts, navigate, or read the route.

---

## 11. Data Fetching

### 11.1 Default: `useAsyncData` + service

```ts
const { data, status, error, refresh } = await useAsyncData(
  () => `plan-${route.params.planId}`,          // reactive key
  () => $services.membership.getPlan(Number(route.params.planId)),
)
```

This is the **only** data-fetching pattern. `useFetch` with a URL is not used in `app/`, because it would put an endpoint outside `app/services/`.

For mutations and other event-driven calls (submit, click), call the service directly: `await $services.checkout.create(...)`.

### 11.2 SSR vs client

| Fetch on the server (default) | Fetch on the client (`server: false` / `lazy: true`) |
|---|---|
| Needed for first render | Only needed after user interaction |
| Important for SEO | User-specific and below the fold |
| Public or session-based | Very frequently changing |

### 11.3 Rules

- **Do not fetch in `onMounted`** when SSR can provide the data.
- Inside **event handlers** (submit, click) call the service directly, not `useAsyncData`.
- Always give `useAsyncData` a key that is unique and includes its parameters.
- Use `pick` or `transform` to send only the fields the page needs in the SSR payload.
- Use `lazy: true` for non-critical data so navigation is not blocked.
- Deduplicate: two components needing the same data share one key or one composable.

---

## 12. State Management

| Kind of state | Tool |
|---|---|
| Component-local (open/closed, input values) | `ref` / `reactive` |
| Form state | `reactive` state passed to `UForm` |
| URL-driven (filters, page, sort) | Route query (`useRoute` / `navigateTo`) so it is shareable and SSR-safe |
| Small shared value (current user, locale prefs) | `useState('key', () => …)` inside a composable |
| Shared domain with actions (cart, notifications) | Pinia setup store |
| Server data | `useAsyncData` cache. Do not copy it into a store |

### Pinia rules

- One store per domain: `stores/cart.ts` → `useCartStore`.
- Use setup-store syntax.
- Do not create a store for state only one component tree uses.
- Do not duplicate server data in a store just to share it; share the `useAsyncData` key or composable instead.

```ts
// app/stores/cart.ts
export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])
  const total = computed(() => items.value.reduce((sum, i) => sum + i.price * i.qty, 0))

  function add(item: CartItem) { /* … */ }

  return { items, total, add }
})
```

### Avoid prop drilling, but not by default

If data crosses more than 2–3 unrelated levels, consider a composable, `provide`/`inject`, or better composition (slots). Do not add global state to skip one level of props.

---

## 13. Authentication & Authorization

### 13.1 Session model

- The session is an **httpOnly, Secure, SameSite=Lax cookie**. JavaScript never reads the token.
- **Recommended:** the Nuxt server acts as a BFF (see [§15](#15-server-bff)). It stores the backend token in a sealed session (e.g. `nuxt-auth-utils`) and attaches it to backend calls.
- **Allowed alternative:** the backend sets the httpOnly cookie itself on a shared parent domain (e.g. Laravel Sanctum SPA auth). The `$api` plugin forwards cookies during SSR.
- Never store tokens in `localStorage`, `sessionStorage`, or a non-httpOnly cookie. SSR middleware cannot read `localStorage`, and XSS can steal it.

Record which option the project uses in the README.

### 13.2 Responsibilities

```text
auth.service.ts      → login / register / logout / forgot / reset / session endpoints
useAuth.ts           → session state (useState), status, login(), logout(), fetchSession()
middleware/auth.ts   → redirect signed-out users to login (keeps the return URL)
middleware/guest.ts  → redirect signed-in users to the dashboard
layouts/auth.vue     → auth page shell
components/auth/*    → forms only
```

### 13.3 Session check: only 401 means "signed out"

A failed session check must **not** log the user out unless the backend actually said the user is unauthenticated.

| Session response | Meaning | Result |
|---|---|---|
| 200 + user | Signed in | `status = 'authenticated'` |
| 401 | Not signed in | `status = 'unauthenticated'` |
| 5xx, timeout, network error | Unknown | `status = 'error'` (keep any existing user, allow retry) |

The service translates only the 401 into `null`. Everything else is thrown:

```ts
// app/services/auth.service.ts
export function createAuthService(api: typeof $fetch) {
  return {
    async session(): Promise<User | null> {
      try {
        const res = await api<ApiResponse<User>>('/auth/session')
        return res.data
      }
      catch (error) {
        if (getApiError(error)?.statusCode === 401) return null
        throw error
      }
    },
    // login, logout, register, …
  }
}
```

### 13.4 `useAuth`

```ts
// app/composables/useAuth.ts
type AuthStatus = 'idle' | 'authenticated' | 'unauthenticated' | 'error'

export function useAuth() {
  const user = useState<User | null>('auth:user', () => null)
  const status = useState<AuthStatus>('auth:status', () => 'idle')
  const { $services } = useNuxtApp()

  const isAuthenticated = computed(() => user.value !== null)

  async function fetchSession() {
    try {
      user.value = await $services.auth.session()
      status.value = user.value ? 'authenticated' : 'unauthenticated'
    }
    catch {
      // Infrastructure failure: do NOT clear the user.
      status.value = 'error'
    }
  }

  async function login(credentials: LoginInput) {
    user.value = await $services.auth.login(credentials)
    status.value = 'authenticated'
  }

  function clear() {
    user.value = null
    status.value = 'unauthenticated'
  }

  async function logout() {
    await $services.auth.logout()
    clear()
    await navigateTo(useLocalePath()('/auth/login'))
  }

  return {
    user: readonly(user),
    status: readonly(status),
    isAuthenticated,
    fetchSession,
    login,
    logout,
    clear,
  }
}
```

Load the session once per request in a plugin, so middleware works during SSR and on navigation:

```ts
// app/plugins/auth.ts
export default defineNuxtPlugin({
  name: 'auth',
  dependsOn: ['api'],
  async setup() {
    await useAuth().fetchSession()
  },
})
```

### 13.5 Middleware

```ts
// app/middleware/auth.ts
export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useAuth()
  const localePath = useLocalePath()

  // The session check itself failed (5xx / network). Retry once, then show an error
  // instead of pretending the user is signed out.
  if (auth.status.value === 'error') {
    await auth.fetchSession()
    if (auth.status.value === 'error') {
      throw createError({ statusCode: 503, statusMessage: 'Session service unavailable', fatal: true })
    }
  }

  if (!auth.isAuthenticated.value) {
    return navigateTo({
      path: localePath('/auth/login'),
      query: { redirect: to.fullPath },
    })
  }
})
```

```ts
// app/middleware/guest.ts
export default defineNuxtRouteMiddleware(() => {
  if (useAuth().isAuthenticated.value) {
    return navigateTo(useLocalePath()('/dashboard'))
  }
})
```

- Validate the `redirect` query before using it: allow relative paths only (prevents open redirects).
- Middleware is UX, not security. **The backend must authorize every request.**

### 13.6 Route access

| Access | Routes |
|---|---|
| Public | `/`, `/about`, `/contact`, `/pricing` |
| Guest only | `/auth/login`, `/auth/register`, `/auth/forgot-password`, `/auth/reset-password` |
| Authenticated | `/dashboard/**` |
| Authenticated + permission | Pages that declare `meta.permission` |

Authenticated pages get `robots: noindex` (see [§22](#22-seo)).

### 13.7 Authorization & permissions

Authentication answers *who are you?* Authorization answers *what may you do?*

**The one rule:** the backend enforces every permission on every request. The frontend only uses permissions to **shape the UI** (hide a button, skip a menu item, redirect away from a page). Hiding something in the UI is never a security measure.

**Source of truth.** The session response includes the user's permissions (or roles resolved to permissions by the backend):

```ts
// shared/types/auth.ts
export interface User {
  id: number
  name: string
  email: string
  permissions: string[]        // e.g. ['orders.view', 'orders.refund']
}
```

Check **permissions**, not roles, in the UI. Roles change; `orders.refund` does not. Permission names are constants in `shared/utils/permissions.ts`, not string literals scattered in templates.

**One helper:**

```ts
// app/composables/useAbility.ts
export function useAbility() {
  const { user } = useAuth()

  function can(permission: Permission) {
    return user.value?.permissions.includes(permission) ?? false
  }

  return { can }
}
```

```vue
<UButton v-if="can(PERMISSIONS.ordersRefund)" color="error" @click="refund">
  {{ t('orders.refund') }}
</UButton>
```

**Route level:**

```ts
// app/pages/dashboard/orders/refunds.vue
definePageMeta({
  layout: 'dashboard',
  middleware: ['auth', 'permission'],
  permission: PERMISSIONS.ordersRefund,
})
```

```ts
// app/middleware/permission.ts
export default defineNuxtRouteMiddleware((to) => {
  const permission = to.meta.permission as Permission | undefined
  if (permission && !useAbility().can(permission)) {
    throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
  }
})
```

**Rules**

- A 403 from the backend is shown as a translated "not allowed" message, never silently swallowed.
- Record-level rules (e.g. "can edit **this** order") are decided by the backend. It may return per-record flags (`order.can.refund`) that the UI reads directly.
- Don't build a policy framework until real rules require one. `can()` + backend flags covers most projects.

---

## 14. Dashboard

- All authenticated pages live under `app/pages/dashboard/`.
- Every dashboard page declares `layout: 'dashboard'` and `middleware: 'auth'`.
- Build the shell from Nuxt UI dashboard components (`UDashboardGroup`, `UDashboardSidebar`, `UDashboardPanel`, `UDashboardNavbar`) before writing custom ones.
- Pages render only their own content.

```vue
<!-- app/pages/dashboard/settings.vue -->
<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})
</script>

<template>
  <SettingsProfileForm />
</template>
```

Dashboard pages are usually user-specific and not indexed, so they can be client-rendered when that simplifies things:

```ts
// nuxt.config.ts
routeRules: {
  '/dashboard/**': { ssr: false },
}
```

This is optional and must be a deliberate decision.

---

## 15. Server (BFF)

`server/` holds code that must never reach the browser:

- Secret API keys and private backend URLs
- Session handling and token storage
- Proxying to the backend (adds the auth header server-side)
- Webhooks, signed URLs, server-side caching

There are **two kinds of server routes**, with different responsibilities. Every route is one or the other.

| | Transparent BFF proxy | Explicit Nuxt server endpoint |
|---|---|---|
| Location | `server/api/[...path].ts` (catch-all) | `server/api/<domain>/<action>.<method>.ts` |
| Purpose | Forward app calls to the backend with the session attached | Logic that belongs in Nuxt: auth/session, aggregation, secrets, webhooks, third-party calls |
| Knows the payload shape? | No | Yes |
| Domain validation | **Backend** (the proxy cannot know every schema) | **Here**, with the shared Zod schema |
| Must do | Allowlist, auth forwarding, CSRF check, header sanitation, request ID, size limit | Zod validation, CSRF check, authorization, error mapping |

**Routing.** `$api` has `baseURL: '/api'`, and services use clean backend paths:

```text
service calls  '/memberships/plans'   →  browser requests /api/memberships/plans
                                          │
         ┌────────────────────────────────┴────────────────────────────┐
         ▼                                                             ▼
explicit file exists? (e.g. server/api/auth/login.post.ts)     no explicit file
→ explicit endpoint handles it                                  → server/api/[...path].ts
                                                                → backend: {backendUrl}/memberships/plans
```

- Nitro always matches a specific route before the catch-all, so explicit endpoints like `/api/auth/login` are never proxied.
- Services never contain `/api` or `/proxy`. Moving an endpoint from proxied to explicit (or back) does not change any service.
- If the project does not use a BFF, `apiBase` is the backend URL and the catch-all does not exist. Services stay the same.

### 15.1 Transparent BFF proxy

```ts
// server/api/[...path].ts
export default defineEventHandler(async (event) => {
  const { backendUrl } = useRuntimeConfig(event)
  const path = getRouterParam(event, 'path') ?? ''
  const method = event.method

  // 1. Allowlist: only known backend paths + methods are reachable
  if (!isAllowedProxyRoute(method, path)) {
    throw createError({ statusCode: 404 })
  }

  // 2. CSRF: mutating requests must come from our own origin
  if (method !== 'GET' && method !== 'HEAD') {
    assertSameOrigin(event)
  }

  // 3. Auth: attach the token from the sealed session (never from the browser)
  const session = await getUserSession(event)

  return proxyRequest(event, `${backendUrl}/${path}`, {
    headers: {
      // 4. Header sanitation: forward only what the backend needs
      'accept': 'application/json',
      'accept-language': getHeader(event, 'accept-language') ?? '',
      'x-request-id': event.context.requestId,
      ...(session.secure?.token ? { authorization: `Bearer ${session.secure.token}` } : {}),
    },
  })
})
```

Rules:

- **Allowlist, not pass-through.** `server/utils/proxy-allowlist.ts` lists allowed method + path patterns. Unknown paths return 404.
- **Never forward** the browser's `cookie`, `host`, `authorization` or `x-forwarded-*` headers to the backend.
- Strip `set-cookie` and internal headers from the backend response.
- Enforce a body size limit.
- The proxy does not validate payloads. **The backend owns domain validation** for proxied routes.
- The client-side Zod schema still runs in forms for UX; it is not the security boundary.

### 15.2 Explicit server endpoint

```ts
// server/api/auth/login.post.ts
import { loginSchema } from '~~/shared/schemas/auth.schema'

export default defineEventHandler(async (event) => {
  assertSameOrigin(event)
  const body = await readValidatedBody(event, loginSchema.parse)

  const { token, user } = await backend.login(event, body)
  await setUserSession(event, { user, secure: { token } })

  return user
})
```

Rules:

- Validate every body, query and param with the shared Zod schemas (`readValidatedBody`, `getValidatedQuery`, `getValidatedRouterParams`).
- Check authorization before doing work.
- Return errors in the standard error shape (§25.3) with `createError`. Never forward raw backend errors or stack traces.

### 15.3 General rules

- Nothing in `server/` is imported by `app/`, and the reverse.
- If the project does **not** use a BFF (backend sets its own cookie), `server/` contains only explicit endpoints, and the backend is the validation and authorization boundary.

---

## 16. TypeScript

- `strict: true`. No `any`. Use `unknown` and narrow it.
- No `@ts-ignore`. If truly required, use `@ts-expect-error` with a comment explaining why.
- API contracts live in `shared/types/`. Components never redeclare API interfaces.
- Prefer inferring types from Zod schemas over writing them twice:

```ts
// shared/schemas/auth.schema.ts
import { z } from 'zod'

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
})

export type LoginInput = z.infer<typeof loginSchema>
```

```ts
// shared/types/api.ts
export interface ApiResponse<T> {
  data: T
  message?: string
}

export interface Paginated<T> {
  data: T[]
  meta: { currentPage: number, lastPage: number, perPage: number, total: number }
}

/** Error body returned by the backend and by our own server routes. Agreed with the backend team. */
export interface ApiErrorBody {
  code: string                         // stable machine code, e.g. 'INVALID_CREDENTIALS'
  message: string                      // for developers and logs. NEVER shown to users
  userMessage?: string                 // explicitly safe to show, localized via Accept-Language
  errors?: Record<string, string[]>    // 422 field errors. Safe to show
  requestId?: string
}

export interface ApiError extends Partial<ApiErrorBody> {
  statusCode?: number
}
```

- Interfaces and types: `PascalCase`. Files: `kebab-case.ts` or `camelCase.ts`, consistent across the project.
- Use `satisfies` for config objects so values stay precisely typed.

---

## 17. Validation & Forms

### 17.1 Validation

- **Client validation is for UX. Server/backend validation is for security.** Both are required.
- One schema per form in `shared/schemas/`. The form always uses it. If the request goes to an **explicit Nuxt endpoint**, that endpoint validates with the same schema. If it goes through the **proxy**, the backend's own validation is the security boundary ([§15](#15-server-bff)).
- Validation messages are translated (pass `t()` into a schema factory, or map error codes to i18n keys).

### 17.2 Form pattern

```vue
<!-- app/components/auth/AuthLoginForm.vue -->
<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import { loginSchema, type LoginInput } from '~~/shared/schemas/auth.schema'

const { login } = useAuth()
const { t } = useI18n()
const localePath = useLocalePath()
const toMessage = useErrorMessage()

const form = useTemplateRef('form')
const state = reactive<Partial<LoginInput>>({ email: '', password: '' })
const submitting = ref(false)
const formError = ref<string | null>(null)

async function onSubmit(event: FormSubmitEvent<LoginInput>) {
  submitting.value = true
  formError.value = null
  try {
    await login(event.data)
    await navigateTo(localePath('/dashboard'))
  }
  catch (error) {
    const fieldErrors = getFieldErrors(error)
    if (fieldErrors.length) form.value?.setErrors(fieldErrors)
    else formError.value = toMessage(error, 'auth.errors.loginFailed')
  }
  finally {
    submitting.value = false
  }
}
</script>

<template>
  <UForm ref="form" :schema="loginSchema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormField :label="t('auth.email')" name="email" required>
      <UInput v-model="state.email" type="email" autocomplete="email" class="w-full" />
    </UFormField>

    <UFormField :label="t('auth.password')" name="password" required>
      <UInput v-model="state.password" type="password" autocomplete="current-password" class="w-full" />
    </UFormField>

    <UAlert v-if="formError" color="error" variant="subtle" :title="formError" role="alert" />

    <UButton type="submit" :loading="submitting" block>
      {{ t('auth.login') }}
    </UButton>
  </UForm>
</template>
```

### 17.3 Every form has

- Schema validation (client) + backend validation
- Backend field errors mapped back onto fields (`form.setErrors`)
- Visible labels (placeholders are not labels)
- Correct `type`, `autocomplete` and `inputmode`
- Loading state; submit disabled while submitting (no double submit)
- Success feedback (toast, redirect or inline message)
- Errors announced to screen readers
- Works with keyboard only, in RTL and LTR

---

## 18. Internationalization

### 18.1 Configuration

```ts
// nuxt.config.ts
i18n: {
  baseUrl: process.env.NUXT_PUBLIC_SITE_URL,   // required for canonical + hreflang
  defaultLocale: 'ar',
  strategy: 'prefix_except_default',
  detectBrowserLanguage: {
    useCookie: true,
    cookieKey: 'i18n_locale',
    redirectOn: 'root',
  },
  locales: [
    { code: 'ar', language: 'ar-EG', dir: 'rtl', name: 'العربية', file: 'ar.json' },
    { code: 'en', language: 'en-US', dir: 'ltr', name: 'English', file: 'en.json' },
  ],
},
```

### 18.2 Rules

- No hardcoded user-facing text in components, pages, toasts or validation messages.
- Internal links use `<NuxtLinkLocale>` or `useLocalePath()`. Never a hardcoded `/en/...`.
- Numbers, currency and dates use `$n` / `$d` or `Intl`, never string concatenation.
- Use pluralization (`$t('cart.items', count)`), not `if (count === 1)`.
- Backend responses are localized through the `Accept-Language` header set by `$api`.

### 18.3 Translation structure

Nested by domain, same key set in every locale:

```json
{
  "common": { "save": "Save", "cancel": "Cancel", "retry": "Try again" },
  "auth": {
    "login": "Sign in",
    "errors": { "invalidCredentials": "Email or password is incorrect." }
  },
  "pricing": {
    "seo": { "title": "Pricing", "description": "Choose the plan that fits you." }
  }
}
```

- Keys are `camelCase`, grouped by feature.
- CI fails on missing keys between `ar.json` and `en.json` (e.g. with `@intlify/eslint-plugin-vue-i18n` or a small script).

---

## 19. RTL / LTR

### 19.1 Document direction

`lang` and `dir` come from the active locale, rendered on the server:

```vue
<!-- app/app.vue -->
<script setup lang="ts">
import * as locales from '@nuxt/ui/locale'

const { locale } = useI18n()
const head = useLocaleHead()   // lang, dir, hreflang, canonical, og:locale

useHead({
  htmlAttrs: { lang: () => head.value.htmlAttrs.lang, dir: () => head.value.htmlAttrs.dir },
  link: () => head.value.link,
  meta: () => head.value.meta,
})
</script>

<template>
  <UApp :locale="locales[locale]">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
```

`UApp` with a Nuxt UI locale makes Nuxt UI components (menus, sliders, date pickers, pagination) follow the direction automatically.

### 19.2 Logical properties only

| Use | Instead of |
|---|---|
| `ms-*` / `me-*` | `ml-*` / `mr-*` |
| `ps-*` / `pe-*` | `pl-*` / `pr-*` |
| `start-*` / `end-*` | `left-*` / `right-*` |
| `text-start` / `text-end` | `text-left` / `text-right` |
| `rounded-s-*` / `rounded-e-*` | `rounded-l-*` / `rounded-r-*` |
| `border-s` / `border-e` | `border-l` / `border-r` |

Physical properties are allowed only when the design is truly physical (e.g. a phone number field that is always LTR).

### 19.3 Directional icons and content

- Arrows and chevrons that mean "next/back" flip: `class="rtl:rotate-180"`, or pick the icon from `dir`.
- Icons that are not directional (search, user, check) never flip.
- Phone numbers, emails, URLs and code are always LTR: wrap them in `dir="ltr"` or use `<bdi>`.
- Carousels, sliders and progress bars start from the `start` side.
- One component serves both directions. Never `ArabicXxx.vue` / `EnglishXxx.vue`.

---

## 20. Theming & Design Tokens

Nuxt UI v4 uses Tailwind v4, which is configured in CSS. There is **no `tailwind.config.ts`**.

### 20.1 Define brand palettes in CSS

```css
/* app/assets/css/main.css */
@import "tailwindcss";
@import "@nuxt/ui";

@theme static {
  --font-sans: "IBM Plex Sans Arabic", "Inter", sans-serif;

  /* Brand palette: replace with approved Figma values, keep the name */
  --color-brand-50:  #f0eeff;
  --color-brand-100: #e1deff;
  --color-brand-200: #c3bdff;
  --color-brand-300: #a59bff;
  --color-brand-400: #8779ff;
  --color-brand-500: #5c45fd;
  --color-brand-600: #4b35e5;
  --color-brand-700: #3a28c7;
  --color-brand-800: #2c1fa0;
  --color-brand-900: #211878;
  --color-brand-950: #150f4d;
}
```

### 20.2 Map palettes to semantic colors

```ts
// app/app.config.ts
export default defineAppConfig({
  ui: {
    colors: {
      primary: 'brand',
      secondary: 'slate',
      success: 'green',
      info: 'sky',
      warning: 'amber',
      error: 'red',
      neutral: 'zinc',
    },
  },
})
```

Use Nuxt UI's semantic names exactly: `primary`, `secondary`, `success`, `info`, `warning`, `error`, `neutral`. **Do not invent `danger`**; Nuxt UI components do not know it.

### 20.3 Usage

```vue
<UButton color="primary">{{ t('common.continue') }}</UButton>
<UButton color="error" variant="soft">{{ t('common.delete') }}</UButton>

<p class="text-success">…</p>
<p class="text-error">…</p>
<p class="text-muted">…</p>
<div class="bg-elevated border border-default rounded-lg">…</div>
```

### 20.4 Rules

- Use semantic utilities (`text-primary`, `bg-elevated`, `text-muted`, `border-default`), not palette shades (`text-indigo-600`) or arbitrary values (`bg-[#5C45FD]`).
- Customize Nuxt UI through `app.config.ts` (`ui.<component>`) or the `ui` prop, not by overriding its CSS.
- Dark mode works through the same semantic tokens. Test both themes if the project supports dark mode.

---

## 21. Styling with Tailwind

- Mobile-first: base classes for mobile, then `sm:` `md:` `lg:` `xl:` `2xl:`.
- Tailwind for layout and spacing. Custom CSS only for complex animations, third-party overrides, or reusable primitives Tailwind can't express.
- When a class list repeats, extract a **component**, not an `@apply` class.
- Conditional classes use arrays/objects in `:class`, not string concatenation.
- Separate mobile/desktop components only when the interaction is fundamentally different.

---

## 22. SEO

### 22.1 Every public page

```ts
// app/composables/useSeo.ts
interface SeoOptions {
  title: MaybeRefOrGetter<string>
  description: MaybeRefOrGetter<string>
  image?: MaybeRefOrGetter<string | undefined>
  noindex?: boolean
}

export function useSeo(options: SeoOptions) {
  useSeoMeta({
    title: options.title,
    description: options.description,
    ogTitle: options.title,
    ogDescription: options.description,
    ogImage: options.image,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    robots: options.noindex ? 'noindex, nofollow' : undefined,
  })
}
```

- Title template set once (`app.head.titleTemplate` or `@nuxtjs/seo` site config), e.g. `%s · Brand`.
- Canonical, `hreflang` alternates and `og:locale` come from `useLocaleHead()` in `app.vue`. Do not hand-write them per page.
- Dynamic pages pass getters so metadata is ready during SSR:

```ts
useSeo({
  title: () => plan.value?.name ?? '',
  description: () => plan.value?.summary ?? '',
  image: () => plan.value?.imageUrl,
})
```

### 22.2 Site-level (`@nuxtjs/seo`)

- `site.url` and `site.name` set from runtime config.
- Sitemap generated per locale; dashboard and auth routes excluded.
- `robots`: disallow `/dashboard`, `/auth`; block everything on staging.
- Structured data (Organization, WebSite, BreadcrumbList, Product, FAQPage) describes **only content actually on the page**.

### 22.3 Indexing rules

- `/dashboard/**` and `/auth/**`: `noindex`.
- Paginated, filtered or sorted URLs: canonical points to the clean URL unless the variant has unique value.
- Each public page: unique title (≤ 60 chars), unique description (≤ 160 chars), one `<h1>`, logical heading order.

---

## 23. Performance

### 23.1 Targets (mobile, p75)

| Metric | Target |
|---|---|
| LCP | ≤ 2.5 s |
| INP | ≤ 200 ms |
| CLS | ≤ 0.1 |
| JS per route (gzip) | ≤ 170 KB initial |
| Lighthouse performance | ≥ 90 on key pages |

### 23.2 Rendering

- SSR by default. Prerender static pages (`routeRules: { '/about': { prerender: true } }`).
- Ship less JavaScript: static content stays static; interactivity only where needed.
- Below-the-fold interactive components use lazy loading **and** lazy hydration:

```vue
<LazyHomeTestimonials hydrate-on-visible />
<LazyAppChatWidget hydrate-on-idle />
<LazyCheckoutMap hydrate-on-interaction />
```

- Candidates for lazy loading: modals, maps, charts, video players, carousels, editors.
- Never lazy-load the LCP element or above-the-fold content.

### 23.3 Images (`@nuxt/image`)

```vue
<!-- LCP hero image -->
<NuxtImg
  src="/images/hero.jpg"
  :alt="t('home.hero.imageAlt')"
  width="1200"
  height="600"
  sizes="100vw md:80vw lg:1200px"
  format="avif,webp"
  preload
  fetchpriority="high"
  loading="eager"
/>

<!-- Below the fold -->
<NuxtImg src="/images/feature.jpg" alt="" width="600" height="400" sizes="100vw md:50vw" loading="lazy" />
```

- Always set `width`/`height` (or aspect ratio) to prevent CLS.
- Always set `sizes` so the browser downloads the right size.
- Decorative images use `alt=""`.

### 23.4 Fonts (`@nuxt/fonts`)

- Self-hosted automatically; `font-display: swap`.
- Only the weights and subsets actually used (Arabic + Latin).
- At most two families.

### 23.5 Third-party scripts (`@nuxt/scripts`)

- Load in the page that needs them, not globally.
- Analytics/ads/pixels load after consent and with a non-blocking trigger (`onNuxtReady` / idle).
- Every new third-party script needs a reason in the PR description.

### 23.6 Code

- Import heavy libraries only where used; prefer dynamic `import()` for rare paths.
- Check bundle size with `npx nuxi analyze` before merging a new dependency.
- Use `shallowRef` for large objects that are replaced, not mutated.
- `v-for` always has a stable `:key` (never the index for reorderable lists).
- Use `v-memo` / virtualization for long lists.

---

## 24. Caching

| Layer | Tool | Use for |
|---|---|---|
| Page (CDN/Nitro) | `routeRules: { swr: 3600 }` / `isr` / `prerender` | Public, same-for-everyone pages |
| Server handler | `defineCachedEventHandler` / `defineCachedFunction` | Public config, categories, settings |
| Client payload | `useAsyncData` key + `getCachedData` | Avoid refetching on back-navigation |
| Static assets | Long `Cache-Control` (hashed filenames) | JS, CSS, fonts, images |

**Never** cache responses that depend on the session, cookies or authorization, unless the cache key includes the user and the entry cannot be served to anyone else. Never put `swr`/`isr` on routes that render user data.

---

## 25. Error Handling & Observability

### 25.1 UI states

Every data-driven view handles four states:

```vue
<USkeleton v-if="status === 'pending'" class="h-40" />
<AppErrorState v-else-if="error" :error="error" @retry="refresh" />
<AppEmptyState v-else-if="!items?.length" :title="t('orders.empty')" />
<OrdersTable v-else :items="items" />
```

- Prefer skeletons for content, spinners only for short actions.
- No blank screens.

### 25.2 Application errors

- `app/error.vue` renders 404, 500 and generic errors with a way back home. It is translated and uses the default layout look.
- Throw `createError({ statusCode: 404, statusMessage: 'Plan not found' })` when a resource doesn't exist (so SEO gets a real 404).
- Wrap risky, isolated widgets in `<NuxtErrorBoundary>` so one failure does not break the page.
- 5xx error pages show the short request ID ("Reference: 3f9a…") so support can find the logs.

### 25.3 Error normalization & safe messages

The backend error contract is `ApiErrorBody` ([§16](#16-typescript)). The rule the code enforces:

| Field | Shown to users? |
|---|---|
| `code` | Mapped to an i18n key (`errors.codes.<CODE>`), and that translation is shown |
| `userMessage` | Yes. The backend explicitly marked it safe |
| `errors` (422 field errors) | Yes, on the matching form fields |
| `message` | **Never.** Developers and logs only |

```ts
// shared/utils/errors.ts
export function getApiError(error: unknown): ApiError | undefined {
  if (typeof error !== 'object' || error === null) return undefined
  const { statusCode, data } = error as { statusCode?: number, data?: Partial<ApiErrorBody> }
  return { ...(typeof data === 'object' ? data : {}), statusCode }
}

export function getFieldErrors(error: unknown): { name: string, message: string }[] {
  const apiError = getApiError(error)
  if (apiError?.statusCode !== 422 || !apiError.errors) return []
  return Object.entries(apiError.errors).map(([name, messages]) => ({ name, message: messages[0] ?? '' }))
}
```

```ts
// app/composables/useErrorMessage.ts
export function useErrorMessage() {
  const { t, te } = useI18n()

  return function toMessage(error: unknown, fallbackKey = 'errors.generic'): string {
    const apiError = getApiError(error)

    if (apiError?.code && te(`errors.codes.${apiError.code}`)) return t(`errors.codes.${apiError.code}`)
    if (apiError?.userMessage) return apiError.userMessage
    if (apiError?.statusCode === 403) return t('errors.forbidden')
    if (apiError?.statusCode === undefined) return t('errors.network')

    return t(fallbackKey)
  }
}
```

The `errors.codes.*` keys use the backend's code verbatim (e.g. `errors.codes.INVALID_CREDENTIALS`); this is the one exception to camelCase i18n keys.

### 25.4 Rules

- Never show `message`, stack traces, SQL or any unmapped backend text to users.
- Map 422 field errors to form fields; everything else goes through `useErrorMessage()`.
- Server routes return errors in the `ApiErrorBody` shape.
- New backend error codes get a translation in both locales in the same PR.

### 25.5 Observability

Keep it small, but always in place before the first production release.

**Error monitoring (`@sentry/nuxt`)**
- Client and server both report. `release` = git SHA, `environment` = `production` / `staging`.
- Source maps are uploaded in CI and **not** served publicly.
- Expected errors (401, 403, 404, 422) are not reported as errors.

**Web Vitals (real users)**
- Report LCP, INP and CLS from the field (`web-vitals` in a `.client.ts` plugin, or Sentry performance), tagged by route name and locale.
- Watch p75 per route template against the targets in [§23.1](#231-targets-mobile-p75).

**Request / correlation ID**
- Every request gets an `X-Request-Id`, forwarded to the backend and attached to logs and Sentry events.

```ts
// server/middleware/request-id.ts
import { randomUUID } from 'node:crypto'

export default defineEventHandler((event) => {
  const incoming = getHeader(event, 'x-request-id')
  const requestId = incoming && /^[\w-]{8,64}$/.test(incoming) ? incoming : randomUUID()

  event.context.requestId = requestId
  setResponseHeader(event, 'x-request-id', requestId)
})
```

Type `event.context.requestId` with `declare module 'h3' { interface H3EventContext { requestId: string } }`.

**Structured logging (server)**
- JSON logs, one event per line: `level`, `time`, `requestId`, `route`, `method`, `status`, `durationMs`, `userId`.
- No `console.log` in committed code. Use the project logger.

**PII redaction**
- Never log or send to Sentry: passwords, tokens, cookies, `authorization` headers, payment data, full request bodies of auth/payment routes.
- Sentry: `sendDefaultPii: false`, a `beforeSend` scrubber, and user identified by `id` only (no email or name).
- Log redaction is a shared function, not left to each call site.

---

## 26. Accessibility

Target **WCAG 2.2 AA**.

- Semantic HTML: `<button>` for actions, `<a>`/`<NuxtLink>` for navigation, landmarks (`header`, `nav`, `main`, `footer`).
- Never `<div @click>`.
- Visible focus on every interactive element; logical tab order.
- Color contrast ≥ 4.5:1 for text, ≥ 3:1 for UI and large text.
- Every input has a label; errors are linked to the input and announced.
- Dialogs trap focus and restore it on close (Nuxt UI `UModal` does this; do not rebuild it).
- Icon-only buttons have an `aria-label`.
- ARIA only when native HTML can't express it.
- Respect `prefers-reduced-motion` for animations.
- Touch targets ≥ 24×24 px (44×44 recommended).
- Route changes are announced (`<NuxtRouteAnnouncer>` in `app.vue`).

---

## 27. Security

- **Secrets:** only in private `runtimeConfig`, only read in `server/`.
- **XSS:** no `v-html` with user or backend content unless sanitized (DOMPurify). Prefer rendering text.
- **Headers:** `nuxt-security` with a strict Content-Security-Policy, HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `frame-ancestors`.
- **Cookies:** `httpOnly`, `secure`, `sameSite: 'lax'` (or `strict`) for session cookies.
- **CSRF:** cookie-authenticated mutating requests need CSRF protection (SameSite + CSRF token / Sanctum's XSRF cookie).
- **Open redirects:** redirect targets from query params must be relative paths.
- **Input:** explicit server endpoints validate with Zod; the transparent proxy enforces an allowlist and size limit, and the backend validates the payload ([§15](#15-server-bff)).
- **Authorization:** enforced by the backend on every request. Hidden UI is not protection ([§13.7](#137-authorization--permissions)).
- **Rate limiting:** login, register, forgot-password and contact endpoints are rate-limited.
- **Dependencies:** `pnpm audit` in CI; Renovate/Dependabot enabled.
- **Uploads:** validate type and size on the server, never trust the client MIME type.

---

## 28. Environment & Configuration

```ts
// nuxt.config.ts
runtimeConfig: {
  // Private: server only
  backendUrl: '',
  session: { password: '' },

  public: {
    siteUrl: '',
    apiBase: '/api',
  },
},
```

- Override at runtime with `NUXT_`-prefixed env vars: `NUXT_BACKEND_URL`, `NUXT_PUBLIC_SITE_URL`.
- Never put secrets in `runtimeConfig.public`, `app.config.ts`, or any file under `app/`.
- `app.config.ts` is for public, build-time UI config (theme, feature flags without secrets).
- `.env.example` lists every variable with a safe placeholder. `.env` is git-ignored.
- Environments: `development`, `staging` (noindex), `production`.

---

## 29. Testing

| Level | Tool | What |
|---|---|---|
| Unit | Vitest (node) | `shared/utils`, schemas, services (mocked `$api`), stores |
| Component | Vitest + `@nuxt/test-utils` (`mountSuspended`) | Forms, conditional UI, emitted events |
| E2E | Playwright | Critical flows: login, checkout, locale switch, protected routes |
| Accessibility | `@axe-core/playwright` in e2e | Key pages in AR and EN |

### Rules

- Every bug fix comes with a test that reproduces it.
- Services and schemas: tested. Pure utils: tested.
- E2E runs in both locales for critical flows.
- Tests do not hit real external services.

```ts
// tests/unit/membership.service.test.ts
import { describe, expect, it, vi } from 'vitest'
import { createMembershipService } from '~/services/membership.service'

describe('membership service', () => {
  it('unwraps plan data', async () => {
    const api = vi.fn().mockResolvedValue({ data: [{ id: 1, name: 'Pro' }] })
    // A mock only implements the call signature, so cast through `unknown` (never `any`)
    const service = createMembershipService(api as unknown as typeof $fetch)

    await expect(service.listPlans()).resolves.toEqual([{ id: 1, name: 'Pro' }])
    expect(api).toHaveBeenCalledWith('/memberships/plans')
  })
})
```

---

## 30. Tooling & Code Quality

### Scripts

```json
{
  "scripts": {
    "dev": "nuxt dev",
    "build": "nuxt build",
    "preview": "nuxt preview",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "typecheck": "nuxt typecheck",
    "test": "vitest",
    "test:e2e": "playwright test"
  }
}
```

### Enforced by tooling (not by reviewers)

- `@nuxt/eslint` with stylistic rules (formatting), `vue/*`, `@typescript-eslint/no-explicit-any`, `no-console` (warn in dev, error in CI).
- Pre-commit: `lint-staged` runs ESLint on staged files.
- CI on every PR: install → lint → typecheck → unit/component tests → build → e2e (critical flows) → Lighthouse CI on key pages.
- A PR cannot merge with a failing check.

### Recommended modules

```ts
modules: [
  '@nuxt/ui',
  '@nuxt/eslint',
  '@nuxt/image',
  '@nuxt/fonts',
  '@nuxt/scripts',
  '@nuxt/test-utils/module',
  '@nuxtjs/i18n',
  '@nuxtjs/seo',
  '@pinia/nuxt',
  '@vueuse/nuxt',
  'nuxt-security',
  'nuxt-auth-utils',   // if using the BFF session option
],
```

Add a module only when the project uses it.

---

## 31. Git Workflow

- Branches: `feature/<ticket>-short-name`, `fix/<ticket>-short-name`, `chore/…`.
- Commits: Conventional Commits (`feat:`, `fix:`, `refactor:`, `chore:`, `test:`, `docs:`).
- Small PRs (aim for < 400 changed lines). Split large features behind flags.
- PR description: what, why, screenshots (AR + EN, mobile + desktop) for UI changes, test notes.
- The checklists in [§34](#34-checklists) live in `.github/pull_request_template.md`.

---

## 32. Naming Conventions

| Item | Convention | Example |
|---|---|---|
| Component file | PascalCase, starts with its folder name | `components/checkout/CheckoutSummary.vue` |
| Page file | kebab-case | `forgot-password.vue` |
| Dynamic route | `[param].vue` camelCase param | `[planId].vue` |
| Layout | kebab-case | `dashboard.vue` |
| Composable | `useXxx.ts` | `useCheckout.ts` |
| Service | `xxx.service.ts`, factory `createXxxService` | `membership.service.ts` |
| Store | `xxx.ts`, `useXxxStore` | `stores/cart.ts` → `useCartStore` |
| Schema | `xxx.schema.ts`, `xxxSchema` | `loginSchema` |
| Type / interface | PascalCase | `Plan`, `ApiResponse<T>` |
| Constant | UPPER_SNAKE_CASE | `PAGINATION_LIMIT` |
| Function / variable | camelCase, verbs for functions | `formatPrice`, `isLoading` |
| Boolean | `is` / `has` / `can` / `should` prefix | `hasAccess` |
| i18n key | nested camelCase by domain | `checkout.errors.paymentFailed` |
| Event | camelCase, verb | `emit('select')`, `emit('update:plan')` |

---

## 33. Avoid Over-Engineering

- Don't create `useX`, `x.types.ts`, `x.service.ts`, `x.constants.ts` for a feature that doesn't need them.
- Don't wrap Nuxt UI components that already do the job.
- Don't add Pinia for state one component tree uses.
- Don't abstract after the first use. Extract on the **second** real duplication (rule of three for larger abstractions).
- Don't add a dependency for something a few lines of code or VueUse already does.

The goal is not the most elaborate architecture. It is an architecture where a developer can open any feature and immediately find:

- the UI · the API call · the logic · the state · the validation · the translations · the SEO · the types

---

## 34. Checklists

### Component

- [ ] Doesn't already exist in the project or Nuxt UI
- [ ] One responsibility; typed props/emits
- [ ] Works in RTL and LTR (logical classes, directional icons)
- [ ] Keyboard accessible, visible focus, labels
- [ ] No hardcoded text
- [ ] Lazy-loaded / lazily hydrated if heavy and below the fold

### API integration

- [ ] Service method added, even if it is a few lines (no URLs, `$fetch` or `useFetch` elsewhere)
- [ ] Request and response typed (`shared/types`)
- [ ] Input validated: shared Zod schema in the form; on the server by the explicit endpoint (Zod) or, for proxied routes, by the backend
- [ ] Proxied route added to the proxy allowlist (BFF projects)
- [ ] New error codes translated in both locales
- [ ] Permission checked by the backend; UI uses `can()` only for display
- [ ] Loading, error and empty states handled
- [ ] SSR decision made; `useAsyncData` key is unique
- [ ] Caching decided (and never for user-specific data)
- [ ] No duplicate requests for the same data
- [ ] No secrets or private data exposed to the client

### Form

- [ ] Validation matches the endpoint type:
  - Explicit Nuxt endpoint → the same shared Zod schema validates on the client and in the endpoint
  - Proxied backend endpoint → client Zod schema for UX; backend validation is the security boundary
- [ ] Labels, correct `type` / `autocomplete` / `inputmode`
- [ ] Backend field errors mapped to fields
- [ ] Loading state, no double submit
- [ ] Success feedback
- [ ] Keyboard and screen-reader friendly
- [ ] Tested in AR and EN

### SEO (public pages)

- [ ] Unique title and description (translated)
- [ ] Canonical, `hreflang`, `og:locale` present (from `useLocaleHead`)
- [ ] Open Graph + Twitter image
- [ ] Correct `robots`; in sitemap if indexable
- [ ] One `<h1>`, logical headings, semantic landmarks
- [ ] Image `alt` texts
- [ ] Structured data where relevant, matching visible content
- [ ] Real 404 status for missing resources

### Performance

- [ ] SSR/prerender where appropriate; no `onMounted` fetching of SSR-able data
- [ ] LCP image preloaded with `fetchpriority="high"`; others lazy
- [ ] All images have dimensions and `sizes`
- [ ] Heavy components lazy + lazy hydration
- [ ] No new global plugin or dependency without justification
- [ ] Third-party scripts scoped and deferred
- [ ] Lighthouse / CWV checked on mobile

### RTL / LTR

Test in both directions: text alignment · icons & arrows · forms & phone inputs · dropdowns & menus · modals & slideovers · tables · carousels · pagination · spacing & positioning · animations & scroll direction.

---

## 35. Definition of Done

A feature is done only when **all** of the following are true:

**UI**
- ✓ Matches the design at mobile, tablet and desktop
- ✓ Built from Nuxt UI + feature components
- ✓ RTL and LTR verified
- ✓ Dark mode verified (if supported)

**Behavior**
- ✓ Works end-to-end
- ✓ Loading, error, empty and success states handled
- ✓ Accessible (keyboard, screen reader, contrast)

**Data**
- ✓ Services typed and centralized
- ✓ Input validated on client and server
- ✓ SSR and caching decisions made deliberately

**SEO** (public pages)
- ✓ Metadata, canonical, `hreflang`, OG, structured data where needed

**Performance**
- ✓ CWV targets met on key pages
- ✓ No unnecessary JS, watchers, requests or dependencies

**Quality**
- ✓ Lint, typecheck and tests pass in CI
- ✓ Tests added for new logic / bug fixes
- ✓ No `console.log`, dead code, unused imports or `any`
- ✓ Errors reach Sentry with a request ID; no PII in logs
- ✓ No missing translation keys
- ✓ PR reviewed and approved
