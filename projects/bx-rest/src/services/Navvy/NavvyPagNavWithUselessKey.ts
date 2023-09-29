import { iBXRestPagination } from '../../typification/rest/base/ApiPaginationBX'
import { NavvyPagNavBase } from './extends/NavvyPagNavBase'
import { catchError, map } from 'rxjs/operators'
import { concatMap, from, last, mergeMap, throwError } from 'rxjs'
import clone from 'just-clone'

export class NavvyPagNavWithUselessKey<C, M, T, R, P extends iBXRestPagination> extends NavvyPagNavBase<C, M, {[key: string]: T}, R[], P> {
  resultAll() {
    let save: (T | R)[] = []
    return this.resultAllEnd()
      .pipe(
        map(v => {
            if (v) {
              save.push(...v)
            }
            return save
          }
        ),
        last(),
      )
  }

  private resultAllEnd() {
    return this.mapForVanillaEnd(this.func, this.param).pipe(
      mergeMap(
        items => {
          if (items && items.result) {
            if (items.total && items.next) {
              let requests: P[] = []
              for (let i = 0; i < items.total; i = i + this.pageSize) {
                let paramClone = clone(this.param)
                paramClone.start = i
                requests.push(
                  paramClone
                )
              }
              /*
              return from(requests.map(param => this.resultEnd(this.func, param))).pipe(
                // toArray(),
                mergeMap(v => {
                  return v
                })
              )
              */

              return from(requests).pipe(
                concatMap(param => this.resultEnd(this.func, param)),
              )

              /*
              return this.getAllTaskElapsedItem(func, param).pipe(
                map(vEnd => {
                  if (vEnd && vEnd.result && items.result) {
                    return merge(clone(vEnd), {result: [...items.result, ...vEnd.result]})
                  }
                  return items
                })
              )
               */
            }
          }
          return from([1]).pipe(
            concatMap(_ => this.resultEnd(this.func, this.param)),
          )
          // return from([BXRestMapResult(items)])
          // as ReturnType<Observable<T | undefined>, Observable<R | undefined>>
        }
      ),
      catchError(err => {
        // this.snackBar.error("Проблемы с поточным получение затреканого времени")
        console.error(err)
        return throwError(() => err)
      })
    )
  }
}
