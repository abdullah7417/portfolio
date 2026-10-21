// https://nuxt.com/docs/api/configuration/nuxt-config
import { THEME_FONTS } from './shared/types/theme'

export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/fonts',
    '@vueuse/nuxt',
    'motion-v/nuxt',
  ],

  devtools: { enabled: true },

  app: {
    head: {
      titleTemplate: '%s',
      meta: [
        { name: 'theme-color', content: '#07101f' },
        { name: 'author', content: 'Abdullah Mohamed' },
      ],
      link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    },
  },

  css: ['~/assets/css/main.css'],

  // Dark is the default theme, same as the reference design
  colorMode: {
    preference: 'dark',
    fallback: 'dark',
  },

  runtimeConfig: {
    // Private: server only (NUXT_RESEND_API_KEY, NUXT_CONTACT_TO_EMAIL, NUXT_CONTACT_FROM_EMAIL)
    resendApiKey: '',
    contactToEmail: '',
    contactFromEmail: 'Portfolio <onboarding@resend.dev>',
    public: {
      siteUrl: '',
      apiBase: '/api',
    },
  },

  routeRules: {
    '/': { prerender: true },
  },

  compatibilityDate: '2026-10-01',

  eslint: {
    config: { stylistic: true },
  },

  fonts: {
    // Fonts are referenced through CSS variables, so they're registered globally.
    // Only the defaults are preloaded; the Theme Builder options download on first use.
    families: [
      { name: 'Inter', weights: [300, 400, 500, 600, 700, 800], global: true },
      { name: 'JetBrains Mono', weights: [400, 500, 600, 700], global: true },
      ...THEME_FONTS.filter(name => name !== 'Inter').map(name => ({
        name, weights: [400, 500, 600, 700], global: true, preload: false,
      })),
    ],
  },

  icon: {
    clientBundle: { scan: true },
  },
})
