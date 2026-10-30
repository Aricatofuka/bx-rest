import { Observable } from 'rxjs'
import { iBXRestAnswer } from '../../../typification/rest/base/answer'
import { catchError, map } from 'rxjs/operators'
import { BXRestMapResult, instanceOfiBXRestAnswerSuccess } from '../../../functions/mapResult'
import { HttpBXServices } from '../../http/HttpBX'
import { ReturnTypeNavvy } from '../navvy-support'
import {
  BXRestApiError, bxRestApiErrorFromHttp, getAuthRefreshError, parseBXRestErrorBody,
} from '../../../functions/errors'

export interface BXRestResOptions {
  /**
   * When `true`, a Bitrix-level API error that comes in the body of a 2xx
   * response makes the `Observable` returned by `.res()` error out with a
   * `BXRestApiError` instead of resolving with `undefined`.
   *
   * Errors that Bitrix sends with a non-2xx HTTP status (most of them, e.g.
   * `expired_token`, `INSUFFICIENT_SCOPE`) fail with `BXRestApiError`
   * regardless of this option.
   *
   * Default: `false` (preserves the historical `.res()` behaviour).
   */
  throwOnApiError?: boolean
}

export abstract class NavvyPagBase<T, R, P> {

  protected readonly http: HttpBXServices
  protected requestHeaders?: Record<string, string>
  pageSize = 50 // стандартный размер страницы

  public constructor(
    protected url: string[],
    protected param: P,
    protected map: ((param: T| undefined) => R | undefined) | undefined = undefined,
    protected restApi = false
  ) {
    this.http = new HttpBXServices()
  }

  /**
   * HTTP-заголовки только для этого запроса — поверх `BXRestSettings.headers`
   * (при совпадении имени побеждает значение отсюда). Повторные вызовы
   * дополняют уже заданные заголовки. Действует на `.res()`, `.resVanilla()`,
   * `.mapForVanilla()` и на все batch-запросы `.resAll()`.
   *
   * @example
   * bx.crm.deal.list({ ... }).withHeaders({ 'X-Request-Source': 'report' }).resAll()
   */
  withHeaders(headers: Record<string, string>): this {
    this.requestHeaders = { ...this.requestHeaders, ...headers }
    return this
  }

  resVanilla() {
    return this.http.post<T>(this.url, this.param, this.restApi, this.requestHeaders)
  }

  mapForVanilla(): Observable<iBXRestAnswer<ReturnTypeNavvy<T, R>> | undefined> {
    return this.resVanilla()
      .pipe(
        map(v => {
          if (v && instanceOfiBXRestAnswerSuccess(v) && this.map) {
            // Применяем this.map и явно приводим тип результата
            const result = this.map(v.result as T) as ReturnTypeNavvy<T, R>
            return { ...v, ...{result: result} } as iBXRestAnswer<ReturnTypeNavvy<T, R>>
          }
          return v as iBXRestAnswer<ReturnTypeNavvy<T, R>> | undefined
        })
      )
  }

  res(options?: BXRestResOptions) {
    return this.mapAndError(this.resVanilla(), options).pipe(
      map(v => (v && this.map)
        ? this.map(v)
        : v
      )
    ) as Observable<ReturnTypeNavvy<T, R> | undefined>
  }

  mapAndError<T>(
    request: Observable<iBXRestAnswer<T> | undefined>,
    options?: BXRestResOptions
  ) {
    const method = this.http.getNameMethod(this.url)
    return request.pipe(
      map(v => {
        if (options?.throwOnApiError && v && !instanceOfiBXRestAnswerSuccess(v)) {
          const parsed = parseBXRestErrorBody(v)
          throw new BXRestApiError(
            parsed ? parsed.error : v.error,
            parsed ? parsed.error_description : v.error_description,
            { method }
          )
        }
        return BXRestMapResult(v)
      }),
      catchError((err: any) => {
        console.error(err)
        if (err instanceof BXRestApiError) {
          throw err
        }
        // Большинство ошибок Bitrix приходит со статусом не 2xx, и axios
        // отклоняет такой ответ — достаём из него код и описание ошибки,
        // а не отдаём безликое "AxiosError: Request failed with status code 400".
        const apiError = bxRestApiErrorFromHttp(err, method)
        if (apiError) {
          throw apiError
        }
        // Сообщение прежнее, но исходная ошибка остаётся в cause — без неё
        // терялся HTTP-статус ответа не от Bitrix (например, пустого 401 от
        // бэкенд-прокси): он был только в тексте сообщения.
        const error = new Error((err.error) ? err.error : err, { cause: err })
        const authRefreshError = getAuthRefreshError(err)
        if (authRefreshError !== undefined) {
          Object.assign(error, { authRefreshError })
        }
        throw error
      })
    )
  }

}
