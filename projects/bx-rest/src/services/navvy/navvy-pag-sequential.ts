import { concatWith, defer, EMPTY, expand, Observable, of, shareReplay } from 'rxjs'
import { map } from 'rxjs/operators'
import clone from 'just-clone'
import { ReturnTypeNavvy } from './navvy-support'
import { NavvyPagBase } from './extends/navvy-pag-base'
import { BXRestResAllEvent } from './res-all-event'
import { resAllEvents, resAllResult, ResAllStep } from './res-all-steps'

/**
 * Как листать метод, у которого следующая страница известна только после предыдущей:
 * общего числа записей в ответе нет, а конец списка виден по флагу вроде `hasMore`,
 * по пустому курсору или по неполной странице.
 */
export interface BXRestSequentialNav<P, T> {
  /**
   * Параметры первой страницы. Обычно здесь явно задают размер страницы: по нему
   * считается следующая страница и видно, что страница неполная.
   * Без этой функции первая страница запрашивается с параметрами запроса
   */
  first?(param: P): P
  /**
   * Параметры следующей страницы или `undefined`, если `result` — последняя страница.
   * `param` — параметры, с которыми запрошена страница `result`
   */
  next(param: P, result: T): P | undefined
  /**
   * Если `result` — объект, а не массив: ключи списков в нём. Записи под этими ключами
   * собираются со всех страниц, остальные поля берутся с последней страницы.
   */
  keys?: string[]
  /**
   * Поле записи, по которому убираются повторы, если страницы перекрываются.
   * Из повторов остаётся первая запись.
   */
  unique?: string
}

interface Page<P, T> {
  param: P
  result: T
  /** Страница целиком, для проверки, что портал не отдал ту же страницу ещё раз. */
  json: string
}

/**
 * Пагинация для методов, которые нельзя листать пакетами: следующую страницу `.resAll()`
 * узнаёт из ответа на предыдущую, поэтому запросы идут по одному. Как найти следующую
 * страницу, описывает {@link BXRestSequentialNav}.
 */
export class NavvyPagSequential<T, R, P extends object> extends NavvyPagBase<T, R, P> {

  constructor(
    url: string[],
    param: P,
    private readonly nav: BXRestSequentialNav<P, T>,
    map?: (param: T | undefined) => R | undefined,
    restApi?: boolean
  ) {
    super(url, param, map, restApi)
  }

  resAll(): Observable<ReturnTypeNavvy<T, R>> {
    return resAllResult(this.resAllSteps()).pipe(
      // refCount: без подписчиков оставшиеся страницы запрашивать незачем
      shareReplay({ bufferSize: 1, refCount: true })
    )
  }

  /**
   * Как `.resAll()`, но с ходом загрузки: `progress` с записями каждой страницы, в конце `done`
   * с результатом `.resAll()`. `total` всегда `undefined`: общего числа записей такие методы
   * не отдают. Повторы, которые `.resAll()` убирает (`nav.unique`), в `items` не попадают и
   * в `loaded` не считаются. Если списков несколько (`nav.keys`), `loaded` считает записи всех
   */
  resAllWithProgress(): Observable<BXRestResAllEvent<ReturnTypeNavvy<T, R>>> {
    return resAllEvents(this.resAllSteps())
  }

  /** Обход `.resAll()`: шаг после каждой страницы, в конце — итог. Каждая подписка обходит список заново */
  private resAllSteps(): Observable<ResAllStep<ReturnTypeNavvy<T, R>>> {
    const first = this.nav.first ? this.nav.first(clone(this.param)) : this.param
    return defer(() => {
      const pages: T[] = []
      // Значения поля `nav.unique`, которые уже пришли: свои у каждого списка
      const seen = new Map<string, Set<unknown>>()
      let loaded = 0

      return this.resNavPage(first).pipe(
        expand(page => {
          const next = this.nav.next(page.param, page.result)
          return next ? this.resNavPage(next, page.json) : EMPTY
        }),
        map((page): ResAllStep<ReturnTypeNavvy<T, R>> => {
          pages.push(page.result)
          const fresh = this.fresh(page.result, seen)
          loaded += fresh.count
          return { type: 'progress', loaded, total: undefined, items: () => this.mapped(fresh.result) }
        }),
        concatWith(defer(() => of<ResAllStep<ReturnTypeNavvy<T, R>>>({ type: 'done', result: this.mapped(this.join(pages)) })))
      )
    })
  }

  private mapped(result: T): ReturnTypeNavvy<T, R> {
    return (this.map ? this.map(result) : result) as ReturnTypeNavvy<T, R>
  }

  /**
   * Страница с параметрами `param`. Если портал не понял параметр пагинации, он отдаёт одну и
   * ту же страницу, и обход не кончился бы никогда. Поэтому повтор предыдущей страницы — ошибка
   */
  private resNavPage(param: P, previous?: string): Observable<Page<P, T>> {
    return this.resPage(param).pipe(
      map(answer => {
        const json = JSON.stringify(answer.result ?? null)
        if (json === previous) {
          throw new Error(
            `Bitrix24 returned the same page of ${this.http.getNameMethod(this.url)} twice: `
            + 'the method ignores the pagination parameter, .resAll() stopped.'
          )
        }
        return { param, result: answer.result as T, json }
      })
    )
  }

  private join(pages: T[]): T {
    const keys = this.nav.keys
    if (!keys) {
      return this.unique(pages.flatMap(page => (Array.isArray(page) ? page : []))) as T
    }
    const last = pages[pages.length - 1]
    const joined: Record<string, unknown> = { ...(last && typeof last === 'object' ? last : {}) }
    for (const key of keys) {
      joined[key] = this.unique(pages.flatMap(page => listIn(page, key)))
    }
    return joined as T
  }

  /**
   * Записи страницы в форме результата `.resAll()`, без повторов тех, что уже пришли
   * (`seen` — значения поля `nav.unique` по спискам), и их число
   */
  private fresh(page: T, seen: Map<string, Set<unknown>>): { result: T, count: number } {
    const uniqueIn = (items: unknown[], key: string) => {
      const list = seen.get(key) ?? new Set<unknown>()
      seen.set(key, list)
      return this.unique(items, list)
    }
    const keys = this.nav.keys
    if (!keys) {
      const items = uniqueIn(Array.isArray(page) ? page : [], '')
      return { result: items as T, count: items.length }
    }
    const result: Record<string, unknown> = { ...(page && typeof page === 'object' ? page : {}) }
    let count = 0
    for (const key of keys) {
      const items = uniqueIn(listIn(page, key), key)
      result[key] = items
      count += items.length
    }
    return { result: result as T, count }
  }

  /** Записи без повторов по полю `nav.unique`. `seen` — значения, которые уже встречались */
  private unique(items: unknown[], seen = new Set<unknown>()): unknown[] {
    const field = this.nav.unique
    if (!field) {
      return items
    }
    return items.filter(item => {
      const value = (item as Record<string, unknown> | null)?.[field]
      if (value === undefined) {
        return true
      }
      if (seen.has(value)) {
        return false
      }
      seen.add(value)
      return true
    })
  }
}

function listIn(page: unknown, key: string): unknown[] {
  const list = (page as Record<string, unknown> | null | undefined)?.[key]
  return Array.isArray(list) ? list : []
}
