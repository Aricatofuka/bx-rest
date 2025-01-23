import { forkJoin, from, last, mergeMap, shareReplay, throwError } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import clone from 'just-clone'
import { iBXRestPagination } from '../../typification/rest/base/api-pagination-bx'
import { ReturnTypeNavvy } from './navvy-support'
import { iBXRestAnswer } from '../../typification/rest/base/answer'
import { instanceOfiBXRestAnswerSuccess } from '../../functions/mapResult'
import { NavvyPagBase } from './extends/navvy-pag-base'
import * as qs from 'qs'
import { BXRest } from '../../rest/base'

export class NavvyPagNavTasks<T, R, P extends iBXRestPagination> extends NavvyPagBase<{tasks: T[] | undefined}, R[], P> {

  save: ReturnTypeNavvy<T, R>[] = []
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
            // TODO: проверить будет ли быстрее работать метод в случаях когда total < 100 (то есть можно обойтись двумя прямыми запросами)
            if (items.total && items.total > 50) {
              const count = [...Array(Math.floor(items.total / this.pageSize)).keys()]
              const param = clone(this.param)

              // Разделяем массив на блоки
              const chunks = []

              for (let i = 0; i < count.length; i += this.pageSize) {
                chunks.push(count.slice(i, i + this.pageSize))
              }

              const batchRequests = chunks.map(chunk => {
                return BXRestClass.batch<{tasks: T[] | undefined}[]>({
                  halt: 1,
                  cmd: chunk.map(i => {
                    // Устанавливаем start в зависимости от индекса
                    param.start = (i + 1) * this.pageSize

                    // Формируем строку запроса
                    return this.http.getNameMethod(this.url)
                      + '?' + qs.stringify(param, { arrayFormat: 'brackets' })
                  })
                }).pipe(
                  map(v => {
                    if (v && instanceOfiBXRestAnswerSuccess(v) && v.result && v.result.result && items.result && items.result.tasks) {
                      const res = items.result.tasks as T[]
                      res.push(...v.result.result.filter(i => i).map(i => i.tasks).flat() as T[])
                      return (this.map) ?
                        this.map({tasks: res})
                        : res
                    }

                    throw new Error('wrong batch')
                  })
                )
              })

              return forkJoin(batchRequests).pipe(
                map(results => {
                  return results.flat()
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

  private mapResForGetAll(items: iBXRestAnswer<{tasks: T[] | undefined}> | undefined){
    return (instanceOfiBXRestAnswerSuccess(items)) ? from([items.result]).pipe(
      map(v => (v && this.map) ? this.map(v) : v)
    ) : from([])
  }
}
