import { concatMap, from, Observable, toArray } from 'rxjs'
import { iBXRestAnswer, iBXRestAnswerError, iBXRestAnswerSuccess } from '../../../typification/rest/base/answer'
import { catchError, map } from 'rxjs/operators'
import clone from 'just-clone'
import { BXRestMapResult, instanceOfiBXRestAnswerSuccess } from '../../../functions/mapResult'
import { HttpBXServices } from '../../http/HttpBX'
import { ReturnTypeNavvy } from '../navvy-support'
import {
  BXRestApiError, bxRestApiErrorFromHttp, getAuthRefreshError, parseBXRestErrorBody,
} from '../../../functions/errors'
import { iBXRestPagination } from '../../../typification/rest/base/api-pagination-bx'
import { iBXRestBatch } from '../../../typification/rest/batch'
import { serializeBitrixParams } from '../../../functions/serializeBitrixParams'
import { BATCH_COMMANDS_LIMIT, PAGE_SIZE } from '../../../consts/page-size'

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

/**
 * Параметры остальных страниц для методов с постраничной навигацией через `start`.
 * Отсчёт идёт от `start` самого запроса: первая страница уже получена именно с него
 */
export function offsetPageParams<P extends iBXRestPagination>(param: P, total: number | undefined, pageSize: number): P[] {
  const pages: P[] = []
  for (let start = (Number(param?.start) || 0) + pageSize; start < (total ?? 0); start += pageSize) {
    pages.push({ ...clone(param), start })
  }
  return pages
}

export abstract class NavvyPagBase<T, R, P> {

  protected readonly http: HttpBXServices
  protected requestHeaders?: Record<string, string>
  pageSize = PAGE_SIZE

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
   * `.mapForVanilla()` и на все batch-запросы `.resAll()`
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
      catchError((err: any) => {
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
      }),
      map(v => {
        if (v && typeof v !== 'object') {
          throw this.notRestAnswerError()
        }
        if (options?.throwOnApiError && v && !instanceOfiBXRestAnswerSuccess(v)) {
          throw this.apiErrorFromBody(v)
        }
        return BXRestMapResult(v)
      })
    )
  }

  /**
   * Первая страница для `.resAll()`. Ошибка Bitrix в теле ответа 2xx становится `BXRestApiError`:
   * страниц в таком ответе нет, и без этого `.resAll()` завершился бы безликим `EmptyError`
   */
  protected resFirstPage(): Observable<iBXRestAnswerSuccess<T>> {
    return this.resPage(this.param)
  }

  /** Одна страница с параметрами `param`, с теми же проверками ответа, что у {@link resFirstPage} */
  protected resPage(param: P): Observable<iBXRestAnswerSuccess<T>> {
    return this.http.post<T>(this.url, param, this.restApi, this.requestHeaders).pipe(
      map(v => {
        if (!v || typeof v !== 'object') {
          throw this.notRestAnswerError()
        }
        if (!instanceOfiBXRestAnswerSuccess<T>(v)) {
          throw this.apiErrorFromBody(v)
        }
        return v
      })
    )
  }

  /**
   * Остальные страницы для `.resAll()`, в порядке `params`. Команды уходят через `batch`,
   * пакеты — по очереди. Ошибка любой страницы завершает весь запрос: неполный список
   * выглядел бы для вызывающего кода как полный
   */
  protected resPages<Page>(params: P[]): Observable<Page[]> {
    const method = this.http.getNameMethod(this.url)
    const commands = params.map(param => method + '?' + serializeBitrixParams(param))
    const batches: string[][] = []

    for (let i = 0; i < commands.length; i += BATCH_COMMANDS_LIMIT) {
      batches.push(commands.slice(i, i + BATCH_COMMANDS_LIMIT))
    }

    return from(batches).pipe(
      concatMap(cmd => this.http.post<iBXRestBatch<Page[]>>(['batch'], { halt: 1, cmd }, false, this.requestHeaders)),
      map(answer => this.batchPages<Page>(answer)),
      toArray(),
      map(pages => pages.flat() as Page[])
    )
  }

  private batchPages<Page>(answer: iBXRestAnswer<iBXRestBatch<Page[]>> | undefined): Page[] {
    if (!answer || typeof answer !== 'object') {
      throw this.notRestAnswerError()
    }
    if (!instanceOfiBXRestAnswerSuccess<iBXRestBatch<Page[]>>(answer)) {
      throw this.apiErrorFromBody(answer)
    }
    // Портал отдаёт result_error массивом, когда ошибок нет, и объектом с ключами команд, когда есть
    const failed = Object.values(answer.result?.result_error ?? {})[0]
    if (failed) {
      const parsed = parseBXRestErrorBody(failed)
      throw new BXRestApiError(parsed?.error, parsed?.error_description, { method: this.http.getNameMethod(this.url) })
    }
    return Object.values(answer.result?.result ?? {}).filter(Boolean) as Page[]
  }

  // В тексте ошибки — только метод, без тела ответа: это может быть целая HTML-страница
  private notRestAnswerError() {
    return new Error(`Bitrix24 answered ${this.http.getNameMethod(this.url)} with a body that is not a REST response.`)
  }

  private apiErrorFromBody(v: iBXRestAnswerError) {
    const parsed = parseBXRestErrorBody(v)
    return new BXRestApiError(
      parsed ? parsed.error : v.error,
      parsed ? parsed.error_description : v.error_description,
      { method: this.http.getNameMethod(this.url) }
    )
  }

}
