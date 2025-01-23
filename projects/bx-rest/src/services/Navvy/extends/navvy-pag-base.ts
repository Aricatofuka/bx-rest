import { Observable } from 'rxjs'
import { iBXRestAnswer } from '../../../typification/rest/base/answer'
import { catchError, map } from 'rxjs/operators'
import { BXRestMapResult, instanceOfiBXRestAnswerSuccess } from '../../../functions/mapResult'
import { HttpBXServices } from '../../http/HttpBX'
import { ReturnTypeNavvy } from '../navvy-support'

/**
 * Грядущая повсеместная замена для NavvyPagNavBase
 */
export abstract class NavvyPagBase<T, R, P> {

  protected readonly http: HttpBXServices
  pageSize = 50 // стандартный размер страницы

  public constructor(
    protected url: string[],
    protected param: P,
    protected map: ((param: T | undefined) => R | undefined) | undefined
  ) {
    this.http = new HttpBXServices()
  }

  resVanilla() {
    return this.http.post<T>(this.url, this.param)
  }

  mapForVanilla(): Observable<iBXRestAnswer<ReturnTypeNavvy<T, R>> | undefined> {
    return this.resVanilla()
      .pipe(
        map(v => {
          if (v && instanceOfiBXRestAnswerSuccess(v) && this.map) {
            // Применяем this.map и явно приводим тип результата
            const result = this.map(v.result as T) as ReturnTypeNavvy<T, R>
            return { ...v, ...{result: result} } as iBXRestAnswer<ReturnTypeNavvy<T, R>>
          }
          return v as iBXRestAnswer<ReturnTypeNavvy<T, R>> | undefined
        })
      )
  }

  res() {
    return this.mapAndError(this.resVanilla()).pipe(
      map(v => (v && this.map)
        ? this.map(v)
        : v
      )
    ) as Observable<ReturnTypeNavvy<T, R> | undefined>
  }

  mapAndError<T>(
    request: Observable<iBXRestAnswer<T> | undefined>
  ) {
    return request.pipe(
      map(v => BXRestMapResult(v)),
      catchError((err: any) => {
        console.error(err)
        throw new Error((err.error) ? err.error : err)
      })
    )
  }

}
