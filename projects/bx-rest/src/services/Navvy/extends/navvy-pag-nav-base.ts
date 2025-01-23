import { NavvySupport, ReturnTypeNavvy } from '../navvy-support'
import { Observable } from 'rxjs'
import { iBXRestAnswer } from '../../../typification/rest/base/answer'
import { map } from 'rxjs/operators'
import { instanceOfiBXRestAnswerSuccess } from '../../../functions/mapResult'

export abstract class NavvyPagNavBase<C, T, R, P> extends NavvySupport<C, T, R> {

  public constructor(
    requestClass: C,
    protected func: (param: P) => Observable<iBXRestAnswer<T> | undefined>,
    protected param: P,
    protected map: ((param: T | undefined) => R | undefined) | undefined = undefined
  ) {
    super(requestClass)
  }

  resultVanilla() {
    return this.func.call(this.requestClass, this.param)
  }

  mapForVanilla() {
    return this.mapForVanillaEnd(this.func, this.param)
  }

  protected mapForVanillaEnd(func: (param: P) => Observable<iBXRestAnswer<T> | undefined>, param: P) {
    return func.call(this.requestClass, param).pipe(
      map(v => (v && instanceOfiBXRestAnswerSuccess(v) && this.map) ? Object.assign(v, {result: this.map(v.result)}) : v)
    ) as ReturnTypeNavvy<Observable<iBXRestAnswer<T | undefined>>, Observable<iBXRestAnswer<R | undefined>>>
  }

  result() {
    return this.resultEnd(this.func, this.param)
  }

  protected resultEnd(func: (param: P) => Observable<iBXRestAnswer<T> | undefined>, param: P) {
    return this.mapAndError(func.call(this.requestClass, param)).pipe(
      map(v => (v && this.map) ? this.map(v) : v)
    ) as ReturnTypeNavvy<Observable<T | undefined>, Observable<R | undefined>>
  }

  abstract resultAll(): any// : ReturnType<Observable<T | undefined>, Observable<R | undefined>>[]
}
