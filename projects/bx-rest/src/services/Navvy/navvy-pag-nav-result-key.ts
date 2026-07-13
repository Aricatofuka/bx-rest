import { concatMap, from, last, mergeMap, shareReplay, throwError, toArray } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import clone from 'just-clone'
import { iBXRestPagination } from '../../typification/rest/base/api-pagination-bx'
import { ReturnTypeNavvy } from './navvy-support'
import { iBXRestAnswer } from '../../typification/rest/base/answer'
import { instanceOfiBXRestAnswerSuccess } from '../../functions/mapResult'
import { NavvyPagBase } from './extends/navvy-pag-base'
import * as qs from 'qs'
import { BXRest } from '../../rest/base'

type KeyedResult<K extends string, T> = Record<K, T[] | undefined>

export class NavvyPagNavResultKey<T, R, P extends iBXRestPagination, K extends string>
  extends NavvyPagBase<KeyedResult<K, T>, R[], P> {

  save: ReturnTypeNavvy<T, R>[] = []

  constructor(
    url: string[],
    param: P,
    private readonly key: K,
    map?: (param: KeyedResult<K, T> | undefined) => R[] | undefined
  ) {
    super(url, param, map)
  }

  resAll() {
    let save: ReturnTypeNavvy<T, R>[] = []
    return this.resultAllEnd()
      .pipe(
        map(v => {
            if (v) {
              save.push(...v as ReturnTypeNavvy<T, R>[])
            }
            return save
          }
        ),
        last(),
        shareReplay(1)
      )
  }

  private resultAllEnd() {
    let BXRestClass = new BXRest()
    return this.resVanilla().pipe(
      mergeMap(
        items => {
          if (items && instanceOfiBXRestAnswerSuccess(items)) {
            this.save = []
            if (items.total && items.total > 50) {
              const mathFloor = Math.floor(items.total / this.pageSize)
              const count = (mathFloor === items.total / this.pageSize)
                ? [...Array(mathFloor - 1).keys()]
                : [...Array(mathFloor).keys()]
              const chunks = []

              for (let i = 0; i < count.length; i += this.pageSize) {
                chunks.push(count.slice(i, i + this.pageSize))
              }

              const batchRequests = chunks.map(chunk => {
                return BXRestClass.batch<KeyedResult<K, T>[]>({
                  halt: 1,
                  cmd: chunk.map(i => {
                    const param = clone(this.param)
                    param.start = (i + 1) * this.pageSize

                    return this.http.getNameMethod(this.url)
                      + '?' + qs.stringify(param, { arrayFormat: 'brackets' })
                  })
                })
              })

              return from(batchRequests).pipe(
                concatMap(request => request),
                toArray(),
                map(results => {
                  const firstPage = items.result?.[this.key]
                  if (firstPage) {
                    const res = firstPage as T[]

                    for (let result of results) {
                      if (result && instanceOfiBXRestAnswerSuccess(result) && result.result && result.result.result) {
                        res.push(...result.result.result.filter(i => i).map(i => i[this.key]).flat() as T[])
                      }
                    }

                    return (this.map) ?
                      this.map({ [this.key]: res } as KeyedResult<K, T>)
                      : res
                  }

                  throw new Error('wrong batch')
                })
              )
            }

            return this.mapResForGetAll(items)
          }
          return this.mapResForGetAll(items)
        }
      ),
      catchError(err => {
        console.error(err)
        return throwError(() => err)
      })
    )
  }

  private mapResForGetAll(items: iBXRestAnswer<KeyedResult<K, T>> | undefined) {
    return (instanceOfiBXRestAnswerSuccess(items)) ? from([items.result]).pipe(
      map(v => (v && this.map) ? this.map(v) : v)
    ) : from([])
  }
}
