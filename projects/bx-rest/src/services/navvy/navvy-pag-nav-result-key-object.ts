import { concatMap, from, last, map, mergeMap, shareReplay, throwError, toArray } from 'rxjs'
import { catchError } from 'rxjs/operators'
import clone from 'just-clone'
import { iBXRestPagination } from '../../typification/rest/base/api-pagination-bx'
import { iBXRestAnswer } from '../../typification/rest/base/answer'
import { instanceOfiBXRestAnswerSuccess } from '../../functions/mapResult'
import { serializeBitrixParams } from '../../functions/serializeBitrixParams'
import { BXRest } from '../../rest/base'
import { NavvyPagBase } from './extends/navvy-pag-base'

type KeyedObjectResult<K extends string, T> = Record<K, Record<string, T> | undefined>

/** Пагинация для методов, возвращающих коллекцию как объект с идентификаторами в ключах. */
export class NavvyPagNavResultKeyObject<
  T,
  R,
  P extends iBXRestPagination,
  K extends string
> extends NavvyPagBase<KeyedObjectResult<K, T>, R[], P> {
  constructor(
    url: string[],
    param: P,
    private readonly key: K,
    mapResult?: (param: KeyedObjectResult<K, T> | undefined) => R[] | undefined
  ) {
    super(url, param, mapResult)
  }

  resAll() {
    return this.resultAllEnd().pipe(last(), shareReplay(1))
  }

  private resultAllEnd() {
    const bxRest = new BXRest()

    return this.resVanilla().pipe(
      mergeMap(items => {
        if (!items || !instanceOfiBXRestAnswerSuccess(items)) {
          return from([])
        }

        if (!items.total || items.total <= this.pageSize) {
          return this.mapResult(items)
        }

        const pageCount = Math.ceil(items.total / this.pageSize)
        const commands = Array.from({ length: pageCount - 1 }, (_, index) => {
          const param = clone(this.param)
          param.start = (index + 1) * this.pageSize
          return bxRest.batch<KeyedObjectResult<K, T>[]>({
            halt: 1,
            cmd: [this.http.getNameMethod(this.url) + '?' + serializeBitrixParams(param)]
          })
        })

        return from(commands).pipe(
          concatMap(request => request),
          toArray(),
          mergeMap(results => {
            const merged = { ...(items.result?.[this.key] ?? {}) }

            for (const result of results) {
              if (result && instanceOfiBXRestAnswerSuccess(result)) {
                for (const page of result.result?.result ?? []) {
                  Object.assign(merged, page?.[this.key] ?? {})
                }
              }
            }

            return this.mapResult({ [this.key]: merged } as KeyedObjectResult<K, T>)
          })
        )
      }),
      catchError(error => {
        console.error(error)
        return throwError(() => error)
      })
    )
  }

  private mapResult(items: iBXRestAnswer<KeyedObjectResult<K, T>>) {
    if (!instanceOfiBXRestAnswerSuccess(items)) {
      return from([])
    }

    return from([items.result]).pipe(
      map(value => this.map
        ? this.map(value)
        : Object.values(value?.[this.key] ?? {}) as unknown as R[])
    )
  }
}
