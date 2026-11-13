import { EMPTY, expand, Observable, shareReplay, toArray } from 'rxjs'
import { map } from 'rxjs/operators'
import clone from 'just-clone'
import { ReturnTypeNavvy } from './navvy-support'
import { NavvyPagBase } from './extends/navvy-pag-base'

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
    const first = this.nav.first ? this.nav.first(clone(this.param)) : this.param
    return this.resNavPage(first).pipe(
      expand(page => {
        const next = this.nav.next(page.param, page.result)
        return next ? this.resNavPage(next, page.json) : EMPTY
      }),
      map(page => page.result),
      toArray(),
      map(pages => {
        const joined = this.join(pages)
        return (this.map ? this.map(joined) : joined) as ReturnTypeNavvy<T, R>
      }),
      // refCount: без подписчиков оставшиеся страницы запрашивать незачем
      shareReplay({ bufferSize: 1, refCount: true })
    )
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

  private unique(items: unknown[]): unknown[] {
    const field = this.nav.unique
    if (!field) {
      return items
    }
    const seen = new Set<unknown>()
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
