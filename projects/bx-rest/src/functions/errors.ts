import axios from 'axios'

export interface BXRestApiErrorDetails {
  /**
   * HTTP status of the portal response. `undefined` when the error came in
   * the body of a successful (2xx) response.
   */
  status?: number
  /** REST method that failed, e.g. `crm.deal.get`. */
  method?: string
  /**
   * The original error, e.g. the `AxiosError` — its `response.data` holds
   * the full response body (including REST v3 `validation`).
   */
  cause?: unknown
}

/**
 * A Bitrix-level API error, e.g. `INSUFFICIENT_SCOPE` or `expired_token`.
 *
 * `.res()` fails with it whenever the portal answers with a Bitrix error and
 * a non-2xx HTTP status — which is how Bitrix sends most of its errors. When
 * the error comes in the body of a 2xx response, `.res()` resolves as
 * `undefined` by default and fails with it only with
 * `{ throwOnApiError: true }` — see the "Error handling" section of the README.
 */
export class BXRestApiError extends Error {
  readonly status: number | undefined
  readonly method: string | undefined

  constructor(
    public error: string | undefined,
    public error_description: string | undefined,
    details?: BXRestApiErrorDetails
  ) {
    super(
      error_description || error || 'Bitrix API error',
      details?.cause !== undefined ? { cause: details.cause } : undefined
    )
    this.name = 'BXRestApiError'
    this.status = details?.status
    this.method = details?.method
  }
}

/**
 * Recognises a Bitrix error body: REST v2 `{ error, error_description }` and
 * REST v3 `{ error: { code, message } }`. Returns `undefined` for anything
 * else — a success payload, an HTML page from a proxy, an empty body.
 *
 * An empty `error` still counts: Bitrix answers e.g. `crm.deal.get` for a
 * missing ID with `{ error: '', error_description: 'Not found' }`.
 */
export function parseBXRestErrorBody(body: unknown)
  : { error: string, error_description: string | undefined } | undefined {
  if (!body || typeof body !== 'object' || !('error' in body)) {
    return undefined
  }
  const { error, error_description } = body as { error: unknown, error_description?: unknown }

  if (typeof error === 'string') {
    return {
      error,
      error_description: typeof error_description === 'string' ? error_description : undefined
    }
  }

  if (error && typeof error === 'object' && 'code' in error) {
    const { code, message } = error as { code: unknown, message?: unknown }
    return {
      error: String(code),
      error_description: typeof message === 'string' ? message : undefined
    }
  }

  return undefined
}

/**
 * Turns an HTTP failure into a `BXRestApiError` when the portal answered with
 * a Bitrix error body. Bitrix sends most errors with a non-2xx status
 * (401 `expired_token`, 404 `ERROR_METHOD_NOT_FOUND`, 503
 * `QUERY_LIMIT_EXCEEDED`, 400 "Not found" from `crm.*.get`, ...), and axios
 * rejects on those.
 *
 * Returns `undefined` for network errors and for responses that are not a
 * Bitrix error body, so the caller can keep its own handling for them.
 */
export function bxRestApiErrorFromHttp(err: unknown, method: string): BXRestApiError | undefined {
  if (!axios.isAxiosError(err) || !err.response) {
    return undefined
  }
  const parsed = parseBXRestErrorBody(err.response.data)
  if (!parsed) {
    return undefined
  }
  return new BXRestApiError(parsed.error, parsed.error_description, {
    status: err.response.status,
    method,
    cause: err
  })
}
