import { iBXRestParamElapseditemGet } from '../../typification/rest/task/elapseditem/get'
import { concatMap, from, mergeMap, Observable, throwError } from 'rxjs'
import { iBXRestAnswer } from '../../typification/rest/base/answer'
import { iBXRestElapseditemHttp } from '../../typification/rest/task/elapseditem/item'
import clone from 'just-clone'
import { catchError } from 'rxjs/operators'
import { NavvyParam } from './NavvyParam'

/**
 * Класс-прослойка-обработчик для методов работающих на альтернативной постраничной навигации тика как методы по
 * затраченному времени на задачи https://dev.1c-bitrix.ru/rest_help/tasks/task/elapseditem/index.php
 *
 * не завершенный класс, работаем от частного к общему
 */
// export class NavvyAlterPagNav<T, R, P> extends Navvy<T, R, P>{
export class NavvyAlterPagNav extends NavvyParam<iBXRestElapseditemHttp[], iBXRestElapseditemHttp[], iBXRestParamElapseditemGet | undefined>{

  resultAll(){
    return this.getAllTaskElapsedItem(this.func, this.param)
  }

  /**
   * Метод в котором все должно крутиться, не конечный вариант
   * работаем от частного к общему
   *
   * @param func
   * @param param
   */
  private getAllTaskElapsedItem(
    func: (param: iBXRestParamElapseditemGet | undefined) => Observable<iBXRestAnswer<iBXRestElapseditemHttp[]> | undefined>,
    param: iBXRestParamElapseditemGet | undefined = undefined
  ) {
    return func(param).pipe(
      mergeMap(
        items => {
          if (items && items.result) {
            if (items.next) {
              param = (param) ? param : {}
              param.PARAMS = {
                NAV_PARAMS: {
                  nPageSize: this.pageSize,
                  iNumPage: items.next / this.pageSize + 1
                }
              }
              let requests: iBXRestParamElapseditemGet[] = []
              for (let i = 0; i < this.pageSize; i + this.pageSize) {
                let paramClone = clone(param)
                paramClone.PARAMS = {
                  NAV_PARAMS: {
                    nPageSize: this.pageSize,
                    iNumPage: (items.next + i) / this.pageSize + 1
                  }
                }
                requests.push(
                  paramClone
                )
              }
              return from(requests).pipe(
                concatMap(param => func(param)),
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
          return from([items])
        }
      ),
      catchError(err => {
        // this.snackBar.error("Проблемы с поточным получение затреканого времени")
        console.error(err)
        return throwError(() => err)
      })
    )
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
