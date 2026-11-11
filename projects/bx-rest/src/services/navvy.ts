import { NavvySimple } from './navvy/navvy-simple'
import { NavvyAlterPagNav } from './navvy/navvy-alternative-pagination-navigation'
import { iBXRestAlternativePagination, iBXRestPagination } from '../typification/rest/base/api-pagination-bx'
import { NavvyPagNavWithUselessKey } from './navvy/navvy-pag-nav-with-useless-key'
import { NavvyPagNavTasks } from './navvy/navvy-pag-nav-tasks'
import { NavvyPag } from './navvy/navvy-pag'
import { NavvyPagNavResultKey } from './navvy/navvy-pag-nav-result-key'
import { NavvyPagNavResultKeyObject } from './navvy/navvy-pag-nav-result-key-object'
import { NavvyPagNavKeyed } from './navvy/navvy-pag-nav-keyed'
import { BXRestContext, currentContext, runInContext } from './context'
import { iBXRestSettings } from '../typification/settings'

export * from './navvy/navvy-simple'
export * from './navvy/navvy-alternative-pagination-navigation'
export * from './navvy/navvy-pag-nav-with-useless-key'
export * from './navvy/navvy-pag-nav-tasks'
export * from './navvy/navvy-pag-nav-result-key'
export * from './navvy/navvy-pag'
export * from './navvy/navvy-pag-nav-result-key-object'
export * from './navvy/navvy-pag-nav-keyed'
export * from './navvy/navvy-support'

export class Navvy {

  // Контекст, в котором создан Navvy. Запросы создаются позже, при вызове
  // метода, поэтому их HTTP-объекты получают этот контекст явно, а не текущий.
  private readonly ctx: BXRestContext

  /**
   * @param settings свои настройки, как у `new BXRestNavvy(settings)`: запросы
   *   идут на этот портал с этим токеном, а `BXRestSettings` на них не влияют.
   *   Без них — настройки клиента, внутри которого создан объект, или
   *   глобальные `BXRestSettings`.
   */
  constructor(settings?: iBXRestSettings) {
    this.ctx = settings ? new BXRestContext(settings) : currentContext()
  }

  simple<T, R = T, A = undefined>(
    url: string[],
    arg?: A,
    map?: (param: T | undefined) => R | undefined
  ) {
    return runInContext(this.ctx, () => new NavvySimple(
      url,
      arg !== undefined ? arg : undefined,
      map
    ))
  }

  simpleV3<T, R = T, A = undefined>(
    url: string[],
    arg?: A,
    map?: (param: T | undefined) => R | undefined
  ) {
    return runInContext(this.ctx, () => new NavvySimple(
      url,
      arg !== undefined ? arg : undefined,
      map,
      true
    ))
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
    return runInContext(this.ctx, () => new NavvyPag(url, arg, map))
  }

  pagNavTasks<T, R, A extends iBXRestPagination>(
    url: string[],
    arg: A,
    map?: (param: { tasks: T[] | undefined } | undefined) => R[] | undefined
  ) {
    return runInContext(this.ctx, () => new NavvyPagNavTasks(url, arg, map))
  }

  pagNavResultKey<T, R, A extends iBXRestPagination, K extends string>(
    url: string[],
    arg: A,
    key: K,
    map?: (param: Record<K, T[] | undefined> | undefined) => R[] | undefined
  ) {
    return runInContext(this.ctx, () => new NavvyPagNavResultKey(url, arg, key, map))
  }

  pagNavResultKeyObject<T, R, A extends iBXRestPagination, K extends string>(
    url: string[],
    arg: A,
    key: K,
    map?: (param: Record<K, Record<string, T> | undefined> | undefined) => R[] | undefined
  ) {
    return runInContext(this.ctx, () => new NavvyPagNavResultKeyObject(url, arg, key, map))
  }

  /**
   * Для методов, у которых `result` — объект со списком под ключом `key`, например
   * `{ products: [...] }`. `.res()` отдаёт объект как есть, `.resAll()` — такой же объект
   * с записями всех страниц под ключом.
   */
  pagNavKeyed<T extends object, R, A extends iBXRestPagination>(
    url: string[],
    arg: A,
    key: string,
    map?: (param: T | undefined) => R | undefined
  ) {
    return runInContext(this.ctx, () => new NavvyPagNavKeyed<T, R, A>(url, arg, key, map))
  }

  pagNavWithUselessKey<T, R, A extends iBXRestPagination>(
    url: string[],
    arg: A,
    map?: (param: Record<string, T> | undefined) => R[] | undefined
  ) {
    return runInContext(this.ctx, () => new NavvyPagNavWithUselessKey(url, arg, map))
  }

  alterPagNav<T, R, A extends iBXRestAlternativePagination>(
    url: string[],
    arg: A,
    map?: (param: T[] | undefined) => R[] | undefined
  ) {
    return runInContext(this.ctx, () => new NavvyAlterPagNav(url, arg, map))
  }
}
