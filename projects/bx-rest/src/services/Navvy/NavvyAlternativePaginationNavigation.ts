import { concat, concatMap, from, last, mergeMap, shareReplay, tap, throwError } from 'rxjs'
import { iBXRestAnswer } from '../../typification/rest/base/answer'
import clone from 'just-clone'
import { catchError, map } from 'rxjs/operators'
import { NavvyPagNavBase } from './extends/NavvyPagNavBase'
import { ReturnTypeNavvy } from './NavvySupport'
import { iBXRestAlternativePagination } from '../../typification/rest/base/ApiPaginationBX'

/**
 * Класс-прослойка-обработчик для методов работающих на альтернативной постраничной навигации тика как методы по
 * затраченному времени на задачи https://dev.1c-bitrix.ru/rest_help/tasks/task/elapseditem/index.php
 *
 * не завершенный класс, работаем от частного к общему
 */
export class NavvyAlterPagNav<C, M, T, R, P extends iBXRestAlternativePagination> extends NavvyPagNavBase<C, M, T[], R[], P> {

  resultAll() {
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
    // return  this.mapForVanillaEnd(this.func, this.param)
    return this.resultVanilla().pipe(
      mergeMap(
        items => {
          if (items && items.result) {
            if (items.total && items.next) {
              let requests: P[] = []
              for (let i = items.next; i < items.total; i = i + this.pageSize) {
                let paramClone = clone(this.param)
                paramClone.PARAMS = {
                  NAV_PARAMS: {
                    nPageSize: this.pageSize,
                    iNumPage: i / this.pageSize + 1
                  }
                }
                requests.push(
                  paramClone
                )
              }
              return concat(
                this.mapResultForGetAll(items),
                from(requests).pipe(
                  concatMap(param =>
                    this.resultEnd(this.func, param).pipe(
                      tap(_ => {
                        if(param && param.PARAMS && items.total) {
                          this.load$.next((param.PARAMS.NAV_PARAMS.iNumPage * this.pageSize + this.pageSize)/items.total)
                        }
                      }),
                    )
                  ),
                )
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

  private mapResultForGetAll(items: iBXRestAnswer<T[]> | undefined){
    return (items?.result) ? from([items.result]).pipe(
      map(v => (v && this.map) ? this.map.call(this.mapClass, v) : v)
    ) : from([] as ReturnTypeNavvy<T, R>[])
  }

  /*
  getAll<T>(request: Observable<iBXRestAnswer<T> | undefined>,
            errorText: string) {
    return request.pipe(
      mergeMap(
        items => {
          if (items && items.result) {
            if (items.next) {
              params = (params) ? params : {}
              params.PARAMS = {
                NAV_PARAMS: {
                  nPageSize: this.pageSize,
                  iNumPage: items.next / this.pageSize + 1
                }
              }
              return this.getAll(params, cache).pipe(
                map(vEnd => {
                  if (vEnd && vEnd.result && items.result) {
                    return merge(clone(vEnd), {result: [...items.result, ...vEnd.result]})
                  }
                  return items
                })
              )
            }
            return of(items)
          }
        }
      ),
      // map(v => BXRestMapResult(v)),
      catchError(err => {
        this.snackBar.error(errorText)
        return throwError(() => err)
      })
    )
  }

   */
}
