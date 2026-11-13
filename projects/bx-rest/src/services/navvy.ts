import { NavvySimple } from './navvy/navvy-simple'
import { NavvyAlterPagNav } from './navvy/navvy-alternative-pagination-navigation'
import { iBXRestAlternativePagination, iBXRestPagination } from '../typification/rest/base/api-pagination-bx'
import { NavvyPagNavWithUselessKey } from './navvy/navvy-pag-nav-with-useless-key'
import { NavvyPagNavTasks } from './navvy/navvy-pag-nav-tasks'
import { NavvyPag } from './navvy/navvy-pag'
import { NavvyPagNavResultKey } from './navvy/navvy-pag-nav-result-key'
import { NavvyPagNavResultKeyObject } from './navvy/navvy-pag-nav-result-key-object'
import { NavvyPagNavKeyed } from './navvy/navvy-pag-nav-keyed'
import { BXRestOffsetNav, NavvyPagOffset } from './navvy/navvy-pag-offset'
import { BXRestSequentialNav, NavvyPagSequential } from './navvy/navvy-pag-sequential'
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
export * from './navvy/navvy-pag-offset'
export * from './navvy/navvy-pag-sequential'
export * from './navvy/navvy-support'

export class Navvy {

  // Контекст, в котором создан Navvy. Запросы создаются позже, при вызове
  // метода, поэтому их HTTP-объекты получают этот контекст явно, а не текущий.
  private readonly ctx: BXRestContext

  /**
   * @param settings свои настройки, как у `new BXRestNavvy(settings)`: запросы
   *   идут на этот портал с этим токеном, а `BXRestSettings` на них не влияют.
   *   Без них — настройки клиента, внутри которого создан объект, или
   *   глобальные `BXRestSettings`
   */
  constructor(settings?: iBXRestSettings) {
    this.ctx = settings ? new BXRestContext(settings) : currentContext()
  }

  /**
   * Запрос к методу REST API по адресу `rest/<метод>`. Так вызывается большинство методов
   * портала: в REST v3 перенесена только часть модулей, а обе версии работают одновременно
   * и не заменяют друг друга.
   *
   * Метод, который есть только в REST v3, по этому адресу не найдётся: портал ответит
   * `ERROR_METHOD_NOT_FOUND`. Такой метод вызывайте через {@link simpleV3}. Версию метода
   * видно на его странице в документации: у методов REST v3 вверху стоит пометка об этом
   *
   * @see https://apidocs.bitrix24.ru/settings/how-to-call-rest-api/index.html Как вызывать REST API
   * @see https://apidocs.bitrix24.ru/api-reference/rest-v3.html#where Какие модули есть в REST v3
   */
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

  /**
   * Запрос к методу REST v3 (в документации — REST 3.0): к базовому адресу добавляется `api/`,
   * у приложения запрос уходит на `rest/api/<метод>`.
   *
   * Метод с тем же именем может быть и в старой версии, но с другими параметрами и ответом,
   * как `tasks.task.get`. Какая версия ответит, решает адрес. Чем отличается REST v3:
   * - ответ всегда объект: запись в `result.item`, список в `result.items`, итог операции
   *   в `result.result`;
   * - фильтр — массив условий `["поле", "оператор", значение]`, а в `select` можно брать
   *   поля связанных объектов через точку;
   * - вместо `start` и `total` — объект `pagination` с `page` и `limit`, общего числа записей
   *   в ответе нет;
   * - ошибка приходит как `{ error: { code, message } }`, библиотека разбирает её так же,
   *   как ошибки старой версии;
   * - тело запроса — только JSON;
   * - у batch свой формат, поэтому `.resAll()` у списков REST v3 запрашивает страницы по одной
   *
   * @see https://apidocs.bitrix24.ru/api-reference/rest-v3.html Обзор REST 3.0
   * @see https://apidocs.bitrix24.ru/api-reference/rest-v3.html#table Сравнение со старой версией
   * @see https://apidocs.bitrix24.ru/settings/how-to-call-rest-api/batch-v3.html Batch в REST 3.0
   */
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
   * с записями всех страниц под ключом
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

  /**
   * Для методов, которые листаются по смещению (`OFFSET`/`LIMIT`) и отдают общее число
   * записей в `total`. Имена параметров и размер страницы задаёт `nav`. Как и у методов
   * с `start`, `.resAll()` запрашивает остальные страницы пакетами через `batch`
   */
  pagNavOffset<T, R, A extends object>(
    url: string[],
    arg: A,
    nav: BXRestOffsetNav,
    map?: (param: T | undefined) => R | undefined
  ) {
    return runInContext(this.ctx, () => new NavvyPagOffset<T, R, A>(url, arg, nav, map))
  }

  /**
   * Для методов, у которых следующая страница известна только из ответа на предыдущую:
   * по флагу вроде `hasMore`, по курсору или по неполной странице. Как найти следующую
   * страницу, задаёт `nav`. `.resAll()` запрашивает страницы по одной
   */
  pagNavSequential<T, R, A extends object>(
    url: string[],
    arg: A,
    nav: BXRestSequentialNav<A, T>,
    map?: (param: T | undefined) => R | undefined
  ) {
    return runInContext(this.ctx, () => new NavvyPagSequential<T, R, A>(url, arg, nav, map))
  }

  /**
   * {@link pagNavSequential} для методов REST v3: запросы идут туда же, куда у {@link simpleV3}.
   * Списки REST v3 листаются объектом `pagination`, а `result.items` собирается со всех страниц
   *
   * @see https://apidocs.bitrix24.ru/api-reference/rest-v3.html#response Формат ответа REST 3.0
   */
  pagNavSequentialV3<T, R, A extends object>(
    url: string[],
    arg: A,
    nav: BXRestSequentialNav<A, T>,
    map?: (param: T | undefined) => R | undefined
  ) {
    return runInContext(this.ctx, () => new NavvyPagSequential<T, R, A>(url, arg, nav, map, true))
  }
}
