import type { H3Event } from 'h3'

/** CSRF guard for mutating requests: the Origin header must match our host. */
export function assertSameOrigin(event: H3Event) {
  const origin = getHeader(event, 'origin')
  const host = getRequestHost(event, { xForwardedHost: true })

  if (origin && new URL(origin).host !== host) {
    throw createError({
      statusCode: 403,
      data: { code: 'FORBIDDEN_ORIGIN', message: 'Cross-origin request rejected' } satisfies ApiErrorBody,
    })
  }
}
