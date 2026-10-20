const CODE_MESSAGES: Record<string, string> = {
  CONTACT_UNAVAILABLE: 'The contact form is unavailable right now.',
  CONTACT_SEND_FAILED: 'Your message could not be sent. Please try again or email me directly.',
  RATE_LIMITED: 'Too many messages. Please try again in a few minutes.',
  VALIDATION_FAILED: 'Please check the highlighted fields.',
}

export function useErrorMessage() {
  return function toMessage(error: unknown, fallback = 'Something went wrong. Please try again.'): string {
    const apiError = getApiError(error)
    const byCode = apiError?.code ? CODE_MESSAGES[apiError.code] : undefined

    if (byCode) return byCode
    if (apiError?.userMessage) return apiError.userMessage
    if (apiError?.statusCode === undefined) return 'Network error. Check your connection and try again.'

    return fallback
  }
}
