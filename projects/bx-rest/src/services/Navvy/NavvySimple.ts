import { Observable } from 'rxjs'
import { iBXRestAnswer } from '../../typification/rest/base/answer'
import { map } from 'rxjs/operators'
import { NavvySupport, ReturnTypeNavvy } from './NavvySupport'

export class NavvySimple<C, M, T, R> extends NavvySupport<C, M, T, R> {

  constructor(
    requestClass: C,
    mapClass: M,
    public func: Observable<iBXRestAnswer<T> | undefined>,
    public map: ((param: T | undefined) => R) | undefined = undefined
    // private snackBar: SnackBarService,
  ) {
    super(requestClass, mapClass)
  }

  resultVanilla() {
    return this.func
  }
  // TODO: del after 09.04.2024
  // mapForVanilla() {
  //   return this.func.pipe(
  //     map(v => (v && instanceOfiBXRestAnswerSuccess(v) && this.map)
  //       ? Object.assign(v,{result:  this.map.call(this.mapClass, v.result)}) : v)
  //   ) as ReturnTypeNavvy<Observable<iBXRestAnswer<T | undefined>>, Observable<iBXRestAnswer<R | undefined>>>
  // }

  result() {
    return this.mapAndError(this.func).pipe(
      map(v => (this.map) ? this.map.call(this.mapClass, v) : v)
    ) as ReturnTypeNavvy<Observable<T | undefined>, Observable<R | undefined>>
  }
}
