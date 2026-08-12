/**
 * Thrown by `.res()` when called with `{ throwOnApiError: true }` and the
 * Bitrix REST call resolves as a Bitrix-level API error, e.g.
 * `INSUFFICIENT_SCOPE` or `expired_token`.
 *
 * By default `.res()` resolves such responses as `undefined` instead of
 * throwing — see the "Error handling" section of the README.
 */
export class BXRestApiError extends Error {
  constructor(
    public error: string | undefined,
    public error_description: string | undefined
  ) {
    super(error_description || error || 'Bitrix API error')
    this.name = 'BXRestApiError'
  }
}
