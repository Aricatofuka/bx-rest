import { Observable } from 'rxjs'
import { iBXRestAnswer } from '../typification/rest/base/answer'
import { NavvySimple } from './Navvy/NavvySimple'
import { NavvyAlterPagNav } from './Navvy/NavvyAlternativePaginationNavigation'
import { NavvyPagNav } from './Navvy/NavvyPagNav'
import { iBXRestAlternativePagination, iBXRestPagination } from '../typification/rest/base/ApiPaginationBX'
import { NavvyPagNavWithUselessKey } from './Navvy/NavvyPagNavWithUselessKey'
import { NavvyPagNavTasks } from './Navvy/NavvyPagNavTasks'

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

  PagNavTasks<T, R, A extends iBXRestPagination>(
    func: (param: A) => Observable<iBXRestAnswer<{tasks: T[] | undefined}> | undefined>,
    arg: A,
    testError: string = '',
    map: ((param: {tasks: T[] | undefined}  | undefined) => R[] | undefined) | undefined = undefined) {
    return new NavvyPagNavTasks(this.requestClass, this.mapClass, func, arg, testError, map)
  }

  PagNavWithUselessKey<T, R, A extends iBXRestPagination>(
    func: (param: A) => Observable<iBXRestAnswer<{ [key: string]: T }> | undefined>,
    arg: A,
    testError: string = '',
    map: ((param: { [key: string]: T } | undefined) => R[] | undefined) | undefined = undefined) {
    return new NavvyPagNavWithUselessKey(this.requestClass, this.mapClass, func, arg, testError, map)
  }

  alterPagNav<T, R, A extends iBXRestAlternativePagination>(
    func: (param: A) => Observable<iBXRestAnswer<T[]> | undefined>,
    arg: A,
    testError: string = '',
    map: ((param: T[] | undefined) => R[] | undefined) | undefined = undefined) {
    return new NavvyAlterPagNav(this.requestClass, this.mapClass, func, arg, testError, map)
  }
}
