import { contactSchema } from '~~/shared/schemas/contact.schema'

export default defineEventHandler(async (event) => {
  assertSameOrigin(event)

  const result = contactSchema.safeParse(await readBody(event))
  if (!result.success) {
    const errors: Record<string, string[]> = {}
    for (const issue of result.error.issues) {
      const key = String(issue.path[0] ?? 'form')
      errors[key] = [...(errors[key] ?? []), issue.message]
    }
    throw createError({
      statusCode: 422,
      data: { code: 'VALIDATION_FAILED', message: 'Invalid contact payload', errors } satisfies ApiErrorBody,
    })
  }

  const { resendApiKey, contactToEmail, contactFromEmail } = useRuntimeConfig(event)
  if (!resendApiKey || !contactToEmail) {
    throw createError({
      statusCode: 503,
      data: { code: 'CONTACT_UNAVAILABLE', message: 'Resend is not configured' } satisfies ApiErrorBody,
    })
  }

  assertRateLimit(event)

  const { name, email, message } = result.data

  try {
    await $fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${resendApiKey}` },
      body: {
        from: contactFromEmail,
        to: [contactToEmail],
        reply_to: email,
        subject: `Portfolio message from ${name}`,
        text: `${message}\n\n— ${name} (${email})`,
      },
    })
  }
  catch {
    throw createError({
      statusCode: 502,
      data: { code: 'CONTACT_SEND_FAILED', message: 'Resend request failed' } satisfies ApiErrorBody,
    })
  }

  return { data: null } satisfies ApiResponse<null>
})
