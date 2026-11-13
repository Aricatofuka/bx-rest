import { mergeMap, Observable, shareReplay } from 'rxjs'
import { map } from 'rxjs/operators'
import clone from 'just-clone'
import { pageSizeOf, ReturnTypeNavvy } from './navvy-support'
import { NavvyPagBase } from './extends/navvy-pag-base'

/**
 * Как листать метод по смещению: имена параметров и размер страницы.
 */
export interface BXRestOffsetNav {
  /** Параметр смещения, например `OFFSET`. */
  offset: string
  /** Параметр размера страницы, например `LIMIT`. */
  limit: string
  /** Размер страницы, если в запросе его нет. */
  pageSize: number
  /** Больший размер страницы метод не принимает: `.resAll()` его уменьшит. */
  maxPageSize?: number
}

/** Параметры с размером страницы `.resAll()` (см. {@link pageSizeOf}) под именем `nav.limit` */
export function withOffsetPageSize<P extends object>(param: P, nav: BXRestOffsetNav): P {
  const requested = (param as Record<string, unknown>)[nav.limit]
  return { ...clone(param), [nav.limit]: pageSizeOf(requested, nav.pageSize, nav.maxPageSize) }
}

/**
 * Пагинация по смещению (`OFFSET`/`LIMIT`) для методов, которые отдают общее число записей
 * в `total`, как `im.dialog.users.list` и `im.search.*.list`.
 *
 * Как и у методов с `start`, первая страница называет число записей, а остальные уходят
 * пакетами через `batch`. `result` страницы — массив или объект, где ключ записи — её
 * идентификатор (`im.search.user.list`). `.resAll()` отдаёт результат той же формы.
 */
export class NavvyPagOffset<T, R, P extends object> extends NavvyPagBase<T, R, P> {

  constructor(
    url: string[],
    param: P,
    private readonly nav: BXRestOffsetNav,
    map?: (param: T | undefined) => R | undefined,
    restApi?: boolean
  ) {
    super(url, param, map, restApi)
  }

  resAll(): Observable<ReturnTypeNavvy<T, R>> {
    const first = withOffsetPageSize(this.param, this.nav)
    return this.resPage(first).pipe(
      mergeMap(page => this.resPages<T>(this.pageParams(first, page.total, page.next)).pipe(
        map(pages => {
          const joined = joinOffsetPages([page.result, ...pages]) as T
          return (this.map ? this.map(joined) : joined) as ReturnTypeNavvy<T, R>
        })
      )),
      // refCount: без подписчиков оставшиеся страницы запрашивать незачем
      shareReplay({ bufferSize: 1, refCount: true })
    )
  }

  /**
   * Параметры остальных страниц. Шаг — разница между `next` первой страницы и её смещением:
   * так он совпадёт с размером страницы, даже если портал урезал `LIMIT`. Без `next` шаг равен
   * запрошенному размеру страницы
   */
  private pageParams(first: P, total = 0, next?: number): P[] {
    const start = Number((first as Record<string, unknown>)[this.nav.offset]) || 0
    const size = (typeof next === 'number' && next > start)
      ? next - start
      : Number((first as Record<string, unknown>)[this.nav.limit])
    const pages: P[] = []
    if (!(size > 0)) {
      return pages
    }

    for (let offset = start + size; offset < total; offset += size) {
      pages.push({ ...clone(first), [this.nav.offset]: offset })
    }
    return pages
  }
}

/**
 * Записи всех страниц: массивы склеиваются, объекты с записями по ключам сливаются.
 * Метод, который отдаёт объект, пустой результат отдаёт массивом `[]`: такие страницы
 * при слиянии объектов пропускаются
 */
function joinOffsetPages(pages: unknown[]): unknown {
  const objects = pages.filter(page => page !== null && typeof page === 'object' && !Array.isArray(page))
  return objects.length
    ? Object.assign({}, ...objects)
    : pages.flatMap(page => (Array.isArray(page) ? page : []))
}
