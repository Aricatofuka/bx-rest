import { Observable } from 'rxjs'
import { iBXRestAnswer } from '../../typification/rest/base/answer'
import { NavvySupport, ReturnType } from './NavvySupport'
import { map } from 'rxjs/operators'

export class NavvyParam<T, R, P> extends NavvySupport<T, R> {

  constructor(protected func: (param: P) => Observable<iBXRestAnswer<T> | undefined>,
              protected param: P,
              protected testError: string = '',
              protected map: ((param: T) => R) | undefined = undefined) {
    super()
  }

  resultVanilla() {
    return this.func(this.param)
  }

  mapForVanilla() {
    return this.func(this.param).pipe(
      map(v => (v && v.result && this.map) ? Object.assign(v,{result:  this.map(v.result)}) : v)
    ) as ReturnType<Observable<iBXRestAnswer<T | undefined>>, Observable<iBXRestAnswer<R | undefined>>>
  }

  result() {
    return this.mapAndSnackBarError(this.func(this.param)).pipe(
      map(v => (v && this.map) ? this.map(v) : v)
    ) as ReturnType<Observable<T | undefined>, Observable<R | undefined>>
  }
}
