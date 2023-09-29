import { Observable } from 'rxjs'
import { iBXRestAnswer } from '../typification/rest/base/answer'
import { NavvySimple } from './Navvy/NavvySimple'
import { NavvyAlterPagNav } from './Navvy/NavvyAlternativePaginationNavigation'
import { iBXRestElapseditemHttp } from '../typification/rest/task/elapseditem/item'
import { iBXRestParamElapseditemGet } from '../typification/rest/task/elapseditem/get'
import { NavvyPagNav } from './Navvy/NavvyPagNav'
import { iBXRestPagination } from '../typification/rest/base/ApiPaginationBX'
import { NavvyPagNavWithUselessKey } from './Navvy/NavvyPagNavWithUselessKey'

export class Navvy<C, M> {

  constructor(
    protected requestClass: C,
    protected mapClass: M
    // private snackBar: SnackBarService,
  ) {
  }

  simple<T, R>(
    func: () => Observable<iBXRestAnswer<T> | undefined>,
    testError: string = '',
    map: ((param: T) => R) | undefined = undefined
  ) {
    return new NavvySimple(this.requestClass, this.mapClass, func.call(this.requestClass), testError, map)
  }

  simpleWithArg<T, R, A>(
    func: (param: A) => Observable<iBXRestAnswer<T> | undefined>,
    arg: A,
    testError: string = '',
    map: ((param: T) => R) | undefined = undefined) {
    return new NavvySimple(this.requestClass, this.mapClass, func.call(this.requestClass, arg), testError, map)
  }

  PagNav<T, R, A extends iBXRestPagination>(
    func: (param: A) => Observable<iBXRestAnswer<T[]> | undefined>,
    arg: A,
    testError: string = '',
    map: ((param: T[] | undefined) => R[] | undefined) | undefined = undefined) {
    return new NavvyPagNav(this.requestClass, this.mapClass, func, arg, testError, map)
  }

  PagNavWithUselessKey<T, R, A extends iBXRestPagination>(
    func: (param: A) => Observable<iBXRestAnswer<{ [key: string]: T }> | undefined>,
    arg: A,
    testError: string = '',
    map: ((param: { [key: string]: T } | undefined) => R[] | undefined) | undefined = undefined) {
    return new NavvyPagNavWithUselessKey(this.requestClass, this.mapClass, func, arg, testError, map)
  }

  alterPagNav(
    func: (param: iBXRestParamElapseditemGet | undefined) => Observable<iBXRestAnswer<iBXRestElapseditemHttp[]> | undefined>,
    arg: iBXRestParamElapseditemGet | undefined = undefined,
    testError: string = '',
    map: ((param: iBXRestElapseditemHttp[] | undefined) => iBXRestElapseditemHttp[] | undefined) | undefined = undefined) {
    return new NavvyAlterPagNav(this.requestClass, this.mapClass, func, arg, testError, map)
  }
}
