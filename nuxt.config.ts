// https://nuxt.com/docs/api/configuration/nuxt-config
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
        { name: 'theme-color', content: '#0a0a0a' },
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
    families: [
      { name: 'Inter', weights: [300, 400, 500, 600, 700, 800] },
      { name: 'Space Grotesk', weights: [400, 500, 600, 700] },
      { name: 'JetBrains Mono', weights: [400, 500, 600, 700] },
    ],
  },

  icon: {
    clientBundle: { scan: true },
  },
})
