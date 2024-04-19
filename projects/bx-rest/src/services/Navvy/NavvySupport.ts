import { Observable, throwError } from 'rxjs'
import { iBXRestAnswer } from '../../typification/rest/base/answer'
import { catchError, map } from 'rxjs/operators'
import { BXRestMapResult } from '../../functions/mapResult'

export type ReturnTypeNavvy<T, R> = T extends R ? T : R;

export abstract class NavvySupport<C, M, T, R> {

  pageSize = 50 // стандартный размер страницы

  protected constructor(
    public requestClass: C,
    public mapClass: M
  ) {
  }

  mapAndError<T>(
    request: Observable<iBXRestAnswer<T> | undefined>
  ) {
    return request.pipe(
      map(v => BXRestMapResult(v)),
      catchError(err => {
        return throwError(() => err)
      })
    )
  }

  // TODO: del after 09.04.2024
  // mapResult<T, R>(param: iBXRestAnswer<T> | undefined, map: (mapParam: T) => R): iBXRestAnswer<R> | undefined {
  //   return (param && instanceOfiBXRestAnswerSuccess(param)) ? Object.assign(param, {result: map(param.result)}) : undefined
  // }

  abstract resultVanilla(): Observable<iBXRestAnswer<T> | undefined>

  // TODO: del after 09.04.2024
  // abstract mapForVanilla(): ReturnTypeNavvy<Observable<iBXRestAnswer<T | undefined>>, Observable<iBXRestAnswer<R | undefined>>>

  abstract result(): ReturnTypeNavvy<Observable<T | undefined>, Observable<R | undefined>>
}
