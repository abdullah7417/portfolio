import type { ContactInput } from '~~/shared/schemas/contact.schema'
import { profile } from '~/data/portfolio'

export function useContactForm() {
  const { $services } = useNuxtApp()
  const toast = useToast()
  const toMessage = useErrorMessage()

  const submitting = ref(false)
  const sent = ref(false)

  function openMailClient(payload: ContactInput) {
    const subject = encodeURIComponent(`Portfolio message from ${payload.name}`)
    const body = encodeURIComponent(`${payload.message}\n\n— ${payload.name} (${payload.email})`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
  }

  function markSent() {
    sent.value = true
    setTimeout(() => (sent.value = false), 3000)
  }

  /** Resolves when the message was delivered (or handed to the mail app); rethrows other errors. */
  async function submit(payload: ContactInput) {
    if (submitting.value) return
    submitting.value = true
    try {
      await $services.contact.send(payload)
      toast.add({ title: 'Message sent', description: 'Thanks! I\'ll get back to you soon.', icon: 'i-lucide-check', color: 'success' })
      markSent()
    }
    catch (error) {
      // No mail provider configured: fall back to the visitor's email app
      if (getApiError(error)?.code === 'CONTACT_UNAVAILABLE') {
        openMailClient(payload)
        markSent()
        return
      }
      if (!getFieldErrors(error).length) toast.add({ title: toMessage(error), icon: 'i-lucide-x', color: 'error' })
      throw error
    }
    finally {
      submitting.value = false
    }
  }

  return { submitting: readonly(submitting), sent: readonly(sent), submit }
}
