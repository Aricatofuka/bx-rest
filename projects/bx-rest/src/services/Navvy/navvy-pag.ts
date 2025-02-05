import { concatMap, from, mergeMap, toArray} from 'rxjs'
import { map } from 'rxjs/operators'
import clone from 'just-clone'
import { iBXRestPagination } from '../../typification/rest/base/api-pagination-bx'
import { ReturnTypeNavvy } from './navvy-support'
import { iBXRestAnswer } from '../../typification/rest/base/answer'
import { instanceOfiBXRestAnswerSuccess } from '../../functions/mapResult'
import { BXRest } from '../../rest/base'
import { NavvyPagBase } from './extends/navvy-pag-base'
import * as qs from 'qs'


export class NavvyPag<T, R, P extends iBXRestPagination> extends NavvyPagBase<T[], R[], P> {

  save: ReturnTypeNavvy<T, R>[] = []

  resAll() {
    let BXRestClass = new BXRest()
    return this.resVanilla().pipe(
      mergeMap(
        items => {
          if (items && instanceOfiBXRestAnswerSuccess(items)) {
            this.save = []
            // TODO: проверить будет ли быстрее работать метод в случаях когда total < 100 (то есть можно обойтись двумя прямыми запросами)
            if (items.total && items.total > 50) {
              const count = [...Array(Math.floor(items.total / this.pageSize)).keys()]

              // Разделяем массив на блоки
              const chunks = []

              for (let i = 0; i < count.length; i += this.pageSize) {
                chunks.push(count.slice(i, i + this.pageSize))
              }

              const batchRequests = chunks.map(chunk => {
                return BXRestClass.batch<T[][]>({
                  halt: 1,
                  cmd: chunk.map(i => {
                    const param = clone(this.param)
                    // Устанавливаем start в зависимости от индекса
                    param.start = (i + 1) * this.pageSize

                    // Формируем строку запроса
                    return this.http.getNameMethod(this.url)
                      + '?' + qs.stringify(param, { arrayFormat: 'brackets' })
                  })
                }).pipe(
                )
              })

              return from(batchRequests).pipe(
                concatMap(request => request), // Выполняет запросы по очереди
                toArray(), // Собирает все результаты в массив
                map(results => {
                  const res = items.result as T[]
                  for(let result of results){
                    if (result && instanceOfiBXRestAnswerSuccess(result) && result.result && result.result.result) {
                      res.push(...result.result.result.map(i => i).flat())
                    }
                  }

                  return (this.map) ?
                    this.map(res)
                    : res
                }),
              )
            }

            return this.mapResForGetAll(items)
          }
          return this.mapResForGetAll(items)
        }
      ),
      map(v => {
        if (v) {
          this.save.push(... v as ReturnTypeNavvy<T, R>[])
        }

        return this.save
      })
    )
  }

  private mapResForGetAll(items: iBXRestAnswer<T[]> | undefined) {
    return (instanceOfiBXRestAnswerSuccess(items)) ? from([items.result]).pipe(
      map(v => (v && this.map) ? this.map(v) : v)
    ) : from([])
  }
}
