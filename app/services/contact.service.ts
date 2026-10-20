import type { ContactInput } from '~~/shared/schemas/contact.schema'

export function createContactService(api: typeof $fetch) {
  return {
    send(payload: ContactInput): Promise<void> {
      return api<ApiResponse<null>>('/contact', { method: 'POST', body: payload })
        .then(() => undefined)
    },
  }
}

export type ContactService = ReturnType<typeof createContactService>
