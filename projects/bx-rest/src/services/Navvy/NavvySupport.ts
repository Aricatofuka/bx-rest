import { Observable, throwError } from 'rxjs'
import { iBXRestAnswer } from '../../typification/rest/base/answer'
import { catchError, map } from 'rxjs/operators'
import { BXRestMapResult } from '../../functions/mapResult'

export type ReturnTypeNavvy<T, R> = T extends R ? T : R;

export abstract class NavvySupport<C, M, T, R> {

  pageSize = 50 // больше всё равно не дас

  protected constructor(
    public requestClass: C,
    public mapClass: M
  ) {
  }

  mapAndSnackBarError<T>(
    request: Observable<iBXRestAnswer<T> | undefined>
    // errorText: string
  ) {
    return request.pipe(
      map(v => BXRestMapResult(v)),
      catchError(err => {
        // this.snackBar.error(errorText)
        return throwError(() => err)
      })
    )
  }

  mapResult<T, R>(param: iBXRestAnswer<T> | undefined, map: (mapParam: T) => R): iBXRestAnswer<R> | undefined {
    return (param && param.result) ? Object.assign(param, {result: map(param.result)}) : undefined
  }

  abstract resultVanilla(): Observable<iBXRestAnswer<T> | undefined>

  abstract mapForVanilla(): ReturnTypeNavvy<Observable<iBXRestAnswer<T | undefined>>, Observable<iBXRestAnswer<R | undefined>>>

  abstract result(): ReturnTypeNavvy<Observable<T | undefined>, Observable<R | undefined>>
}
