import { concat, concatMap, from, last, mergeMap, shareReplay, throwError } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import clone from 'just-clone'
import { iBXRestPagination } from '../../typification/rest/base/ApiPaginationBX'
import { NavvyPagNavBase } from './extends/NavvyPagNavBase'
import { ReturnTypeNavvy } from './NavvySupport'
import { iBXRestAnswer } from '../../typification/rest/base/answer'
import { instanceOfiBXRestAnswerSuccess } from '../../functions/mapResult'

export class NavvyPagNavTasks<C, M, T, R, P extends iBXRestPagination> extends NavvyPagNavBase<C, M, {tasks: T[] | undefined}, R[], P> {

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
    return this.resultVanilla().pipe(
      mergeMap(
        items => {
          if (items && instanceOfiBXRestAnswerSuccess(items)) {
            if (items.total && items.next) {
              let requests: P[] = []
              for (let i = items.next; i < items.total; i = i + this.pageSize) {
                let paramClone = clone(this.param)
                paramClone.start = i
                requests.push(
                  paramClone
                )
              }
              return concat(
                this.mapResultForGetAll(items),
                from(requests).pipe(
                  concatMap(param => this.resultEnd(this.func, param)),
                )
              )
            }
          }
          return this.mapResultForGetAll(items)
        }
      ),
      catchError(err => {
        console.error(err)
        return throwError(() => err)
      })
    )
  }

  private mapResultForGetAll(items: iBXRestAnswer<{tasks: T[] | undefined}> | undefined){
    return (instanceOfiBXRestAnswerSuccess(items)) ? from([items.result]).pipe(
      map(v => (v && this.map) ? this.map.call(this.mapClass, v) : v)
    ) : from([])
  }
}
