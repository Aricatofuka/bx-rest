import { Injectable } from '@angular/core'
import SnackBarService from './snack-bar/snack-bar.service'
import { Observable, throwError } from 'rxjs'
import { iBXRestAnswer } from '../typification/rest/base/answer'
import { catchError, map } from 'rxjs/operators'
import { BXRestMapResult } from '../functions/mapResult'

@Injectable({
  providedIn: 'root'
})
export class Navvy {

  constructor(
    private snackBar: SnackBarService,
  ) {
  }

  mapAndSnackBarError<T>(
    request: Observable<iBXRestAnswer<T> | undefined>,
    errorText: string
  ){
    return request.pipe(
      map(v => BXRestMapResult(v)),
      catchError(err => {
        this.snackBar.error(errorText)
        return throwError(() => err)
      })
    )
  }
}
