import { Observable } from 'rxjs'
import { iBXRestAnswer } from '../../typification/rest/base/answer'
import { catchError, map } from 'rxjs/operators'
import { BXRestMapResult } from '../../functions/mapResult'
import { HttpErrorResponse } from '@angular/common/http'

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
      catchError((err: HttpErrorResponse | any) => {
        console.error(err)
        throw new Error((err.error) ? err.error : err)
      })
    )
  }

  abstract resultVanilla(): Observable<iBXRestAnswer<T> | undefined>

  abstract result(): ReturnTypeNavvy<Observable<T | undefined>, Observable<R | undefined>>
}
