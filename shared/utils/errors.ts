export function getApiError(error: unknown): ApiError | undefined {
  if (typeof error !== 'object' || error === null) return undefined
  const { statusCode, data } = error as { statusCode?: number, data?: { data?: Partial<ApiErrorBody> } & Partial<ApiErrorBody> }
  // createError() puts our body under `data`; $fetch wraps the response body in `data` again
  const body = data?.data ?? data
  return { ...(typeof body === 'object' ? body : {}), statusCode }
}

export function getFieldErrors(error: unknown): { name: string, message: string }[] {
  const apiError = getApiError(error)
  if (apiError?.statusCode !== 422 || !apiError.errors) return []
  return Object.entries(apiError.errors).map(([name, messages]) => ({ name, message: messages[0] ?? '' }))
}
