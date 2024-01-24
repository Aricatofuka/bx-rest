import { NavvySupport, ReturnTypeNavvy } from '../NavvySupport'
import { Observable, ReplaySubject } from 'rxjs'
import { iBXRestAnswer } from '../../../typification/rest/base/answer'
import { map } from 'rxjs/operators'
import { instanceOfiBXRestAnswerSuccess } from '../../../functions/mapResult'

export abstract class NavvyPagNavBase<C, M, T, R, P> extends NavvySupport<C, M, T, R> {

 //  load: number = 0

  load$ = new ReplaySubject<number>(1)

  public constructor(
    requestClass: C,
    mapClass: M,
    protected func: (param: P) => Observable<iBXRestAnswer<T> | undefined>,
    protected param: P,
    protected map: ((param: T | undefined) => R | undefined) | undefined = undefined) {
    super(requestClass, mapClass)
    this.load$.next(0.001)
  }

  resultVanilla() {
    return this.func.call(this.requestClass, this.param)
  }

  mapForVanilla() {
    return this.mapForVanillaEnd(this.func, this.param)
  }

  protected mapForVanillaEnd(func: (param: P) => Observable<iBXRestAnswer<T> | undefined>, param: P) {
    return func.call(this.requestClass, param).pipe(
      map(v => (v && instanceOfiBXRestAnswerSuccess(v) && this.map) ? Object.assign(v, {result: this.map.call(this.mapClass, v.result)}) : v)
    ) as ReturnTypeNavvy<Observable<iBXRestAnswer<T | undefined>>, Observable<iBXRestAnswer<R | undefined>>>
  }

  result() {
    return this.resultEnd(this.func, this.param)
  }

  protected resultEnd(func: (param: P) => Observable<iBXRestAnswer<T> | undefined>, param: P) {
    return this.mapAndError(func.call(this.requestClass, param)).pipe(
      map(v => (v && this.map) ? this.map.call(this.mapClass, v) : v)
    ) as ReturnTypeNavvy<Observable<T | undefined>, Observable<R | undefined>>
  }

  abstract resultAll(): any// : ReturnType<Observable<T | undefined>, Observable<R | undefined>>[]
}
