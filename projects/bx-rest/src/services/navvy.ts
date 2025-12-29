import { NavvySimple } from './navvy/navvy-simple'
import { NavvyAlterPagNav } from './navvy/navvy-alternative-pagination-navigation'
import { iBXRestAlternativePagination, iBXRestPagination } from '../typification/rest/base/api-pagination-bx'
import { NavvyPagNavWithUselessKey } from './navvy/navvy-pag-nav-with-useless-key'
import { NavvyPagNavTasks } from './navvy/navvy-pag-nav-tasks'
import { NavvyPag } from './navvy/navvy-pag'

export * from './navvy/navvy-simple'
export * from './navvy/navvy-alternative-pagination-navigation'
export * from './navvy/navvy-pag-nav-with-useless-key'
export * from './navvy/navvy-pag-nav-tasks'
export * from './navvy/navvy-pag'
export * from './navvy/navvy-support'

export class Navvy {

  simple<T, R = T, A = undefined>(
    url: string[],
    arg?: A,
    map?: (param: T | undefined) => R | undefined
  ) {
    return new NavvySimple(
      url,
      arg !== undefined ? arg : undefined,
      map
    )
  }

  /**
   * Новый, пока тестируемый метод для api методов с пагинацией
   *
   * @param url
   * @param arg
   * @param map
   * @constructor
   */
  pagNav<T, R, A extends iBXRestPagination>(
    url: string[],
    arg: A,
    map?: (param: T[] | undefined) => R[] | undefined
  ) {
    return new NavvyPag(url, arg, map)
  }

  // old PagNav
  // PagNav<T, R, A extends iBXRestPagination>(
  //   func: (param: A) => Observable<iBXRestAnswer<T[]> | undefined>,
  //   arg: A,
  //   map: ((param: T[] | undefined) => R[] | undefined) | undefined) {
  //   return new NavvyPagNav(this.requestClass, this.mapClass, func, arg, map)
  // }

  // Batch<T, R, A extends iBXRestPagination>(
  //   func: (param: A) => Observable<iBXRestAnswer<T[]> | undefined>,
  //   arg: A,
  //   map: ((param: T[] | undefined) => R[] | undefined) | undefined) {
  //   return new NavvyBatch(this.requestClass, this.mapClass, func, arg, map)
  // }

  pagNavTasks<T, R, A extends iBXRestPagination>(
    url: string[],
    // func: (param: A) => Observable<iBXRestAnswer<{tasks: T[] | undefined}> | undefined>,
    arg: A,
    map?: (param: { tasks: T[] | undefined } | undefined) => R[] | undefined
  ) {
    return new NavvyPagNavTasks(url, arg, map)
  }

  pagNavWithUselessKey<T, R, A extends iBXRestPagination>(
    url: string[],
    // func: (param: A) => Observable<iBXRestAnswer<{ [key: string]: T }> | undefined>,
    arg: A,
    map?: (param: Record<string, T> | undefined) => R[] | undefined
  ) {
    return new NavvyPagNavWithUselessKey(url, arg, map)
  }

  alterPagNav<T, R, A extends iBXRestAlternativePagination>(
    url: string[],
    // func: (param: A) => Observable<iBXRestAnswer<T[]> | undefined>,
    arg: A,
    map?: (param: T[] | undefined) => R[] | undefined
  ) {
    return new NavvyAlterPagNav(url, arg, map)
  }
}
