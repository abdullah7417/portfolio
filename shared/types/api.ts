export interface ApiResponse<T> {
  data: T
  message?: string
}

/** Error body returned by our own server routes. */
export interface ApiErrorBody {
  code: string // stable machine code, e.g. 'CONTACT_UNAVAILABLE'
  message: string // for developers and logs. NEVER shown to users
  userMessage?: string // explicitly safe to show
  errors?: Record<string, string[]> // 422 field errors. Safe to show
}

export interface ApiError extends Partial<ApiErrorBody> {
  statusCode?: number
}
