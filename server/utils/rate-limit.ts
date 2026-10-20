import type { H3Event } from 'h3'

// Best effort: per server instance. Enough to stop a single client spamming the form.
const hits = new Map<string, number[]>()

export function assertRateLimit(event: H3Event, { limit = 5, windowMs = 10 * 60 * 1000 } = {}) {
  const ip = getRequestIP(event, { xForwardedFor: true }) ?? 'unknown'
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter(time => now - time < windowMs)

  if (recent.length >= limit) {
    throw createError({
      statusCode: 429,
      data: { code: 'RATE_LIMITED', message: 'Contact rate limit exceeded' } satisfies ApiErrorBody,
    })
  }

  recent.push(now)
  hits.set(ip, recent)
}
