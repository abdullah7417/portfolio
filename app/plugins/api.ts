import { createContactService } from '~/services/contact.service'

export default defineNuxtPlugin({
  name: 'api',
  setup() {
    const config = useRuntimeConfig()

    const api = $fetch.create({
      baseURL: config.public.apiBase,
      onRequest({ options }) {
        options.headers.set('Accept', 'application/json')
      },
    })

    return {
      provide: {
        api,
        services: {
          contact: createContactService(api),
        },
      },
    }
  },
})
