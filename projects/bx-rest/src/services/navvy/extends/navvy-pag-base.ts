import { Observable } from 'rxjs'
import { iBXRestAnswer } from '../../../typification/rest/base/answer'
import { catchError, map } from 'rxjs/operators'
import { BXRestMapResult, instanceOfiBXRestAnswerSuccess } from '../../../functions/mapResult'
import { HttpBXServices } from '../../http/HttpBX'
import { ReturnTypeNavvy } from '../navvy-support'
import { BXRestApiError } from '../../../functions/errors'

export interface BXRestResOptions {
  /**
   * When `true`, a Bitrix-level API error (`{ error, error_description }`,
   * e.g. `INSUFFICIENT_SCOPE`, `expired_token`) makes the `Observable`
   * returned by `.res()` error out with a `BXRestApiError` instead of
   * resolving with `undefined`.
   *
   * Default: `false` (preserves the historical `.res()` behaviour).
   */
  throwOnApiError?: boolean
}

export abstract class NavvyPagBase<T, R, P> {

  protected readonly http: HttpBXServices
  pageSize = 50 // стандартный размер страницы

  public constructor(
    protected url: string[],
    protected param: P,
    protected map: ((param: T| undefined) => R | undefined) | undefined = undefined,
    protected restApi = false
  ) {
    this.http = new HttpBXServices()
  }

  resVanilla() {
    return this.http.post<T>(this.url, this.param, this.restApi)
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
    return request.pipe(
      map(v => {
        if (options?.throwOnApiError && v && !instanceOfiBXRestAnswerSuccess(v)) {
          throw new BXRestApiError(v.error, v.error_description)
        }
        return BXRestMapResult(v)
      }),
      catchError((err: any) => {
        console.error(err)
        if (err instanceof BXRestApiError) {
          throw err
        }
        throw new Error((err.error) ? err.error : err)
      })
    )
  }

}
