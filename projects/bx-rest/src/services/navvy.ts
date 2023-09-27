import { Observable } from 'rxjs'
import { iBXRestAnswer } from '../typification/rest/base/answer'
import { map } from 'rxjs/operators'
import { NavvySupport, ReturnType } from './Navvy/NavvySupport'

export class Navvy<T, R> extends NavvySupport<T, R> {

  constructor(
    public func: Observable<iBXRestAnswer<T> | undefined>,
    public testError: string = '',
    public map: ((param: T) => R) | undefined = undefined
    // private snackBar: SnackBarService,
  ) {
    super()
  }

  resultVanilla() {
    return this.func
  }

  mapForVanilla() {
    return this.func.pipe(
      map(v => (v && v.result && this.map) ? Object.assign(v,{result:  this.map(v.result)}) : v)
    ) as ReturnType<Observable<iBXRestAnswer<T | undefined>>, Observable<iBXRestAnswer<R | undefined>>>
  }

  result() {
    console.log('this.map', this.map)
    return this.mapAndSnackBarError(this.func).pipe(
      map(v => (v && this.map) ? this.map(v) : v)
    ) as ReturnType<Observable<T | undefined>, Observable<R | undefined>>
  }

  // TODO: реализовать
  resultAll(){

  }
}
