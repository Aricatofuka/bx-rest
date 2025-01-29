import { concatMap, from, last, mergeMap, shareReplay, throwError, toArray } from 'rxjs'
import { iBXRestAnswer } from '../../typification/rest/base/answer'
import clone from 'just-clone'
import { catchError, map } from 'rxjs/operators'
import { ReturnTypeNavvy } from './navvy-support'
import { iBXRestAlternativePagination } from '../../typification/rest/base/api-pagination-bx'
import { instanceOfiBXRestAnswerSuccess } from '../../functions/mapResult'
import { NavvyPagBase } from './extends/navvy-pag-base'
import * as qs from 'qs'
import { BXRest } from '../../rest/base'

/**
 * Класс-прослойка-обработчик для методов работающих на альтернативной постраничной навигации тика как методы по
 * затраченному времени на задачи https://dev.1c-bitrix.ru/rest_help/tasks/task/elapseditem/index.php
 *
 * не завершенный класс, работаем от частного к общему
 */
export class NavvyAlterPagNav<T, R, P extends iBXRestAlternativePagination> extends NavvyPagBase<T[], R[], P> {

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
    // return  this.mapForVanillaEnd(this.func, this.param)
    return this.resVanilla().pipe(
      mergeMap(
        items => {
          if (items && instanceOfiBXRestAnswerSuccess(items)) {
            if (items.total && items.next) {
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

                    if (!param.PARAMS) {
                      param.PARAMS = {
                        NAV_PARAMS: {
                          iNumPage: 0,
                          nPageSize: 50
                        }
                      }
                    }

                    // Устанавливаем start в зависимости от индекса
                    param.PARAMS!.NAV_PARAMS.iNumPage = i + 2 // первая страница уже есть, старт со второй

                    // Формируем строку запроса
                    return this.http.getNameMethod(this.url)
                      + '?' + qs.stringify(param, {arrayFormat: 'brackets'})
                  })
                })
              })

              return from(batchRequests).pipe(
                concatMap(request => request), // Выполняет запросы по очереди
                toArray(), // Собирает все результаты в массив
                map(results => {
                  const res = items.result as T[]
                  for (let result of results) {
                    if (result && instanceOfiBXRestAnswerSuccess(result) && result.result && result.result.result) {
                      res.push(...result.result.result.map(i => i).flat())
                    }
                  }

                  return (this.map) ?
                    this.map(res)
                    : res
                })
              )
            }
          }

          return this.mapResultForGetAll(items)
        }
      ),
      catchError(err => {
        // this.snackBar.error("Проблемы с поточным получение затреканого времени")
        console.error(err)
        return throwError(() => err)
      })
    )
  }

  private mapResultForGetAll(items: iBXRestAnswer<T[]> | undefined) {
    return (instanceOfiBXRestAnswerSuccess(items)) ? from([items.result]).pipe(
      map(v => (v && this.map) ? this.map(v) : v)
    ) : from([] as ReturnTypeNavvy<T, R>[])
  }
}
