// Способы обхода для методов клиента BXRestNavvy, которые листаются не через `start`.
// Поведение каждого метода сверено с документацией Bitrix24 (github.com/bitrix24/b24restdocs).
import { BXRestSequentialNav } from './navvy-pag-sequential'
import { BXRestOffsetNav, withOffsetPageSize } from './navvy-pag-offset'
import { pageSizeOf } from './navvy-support'
import { IM_LIST_MAX_PAGE_SIZE, IM_SEARCH_PAGE_SIZE, PAGE_SIZE } from '../../consts/page-size'

/** `OFFSET`/`LIMIT` у `im.dialog.users.list` и `im.recent.list`. */
export const IM_LIST_NAV: BXRestOffsetNav = {
  offset: 'OFFSET',
  limit: 'LIMIT',
  pageSize: PAGE_SIZE,
  maxPageSize: IM_LIST_MAX_PAGE_SIZE,
}

/** `OFFSET`/`LIMIT` у `im.department.colleagues.list` и `im.search.*.list`. */
export const IM_SEARCH_NAV: BXRestOffsetNav = {
  offset: 'OFFSET',
  limit: 'LIMIT',
  pageSize: IM_SEARCH_PAGE_SIZE,
  maxPageSize: PAGE_SIZE,
}

/** Объект `pagination` в параметрах REST v3. */
interface RestV3Pagination {
  page?: number
  limit?: number
  offset?: number
  afterCursor?: unknown
}

/** Список в `result.items`, как у всех списочных методов REST v3. */
interface RestV3Items {
  items?: unknown[]
  nextCursor?: unknown
}

/** Полная страница — возможно, не последняя. Неполная — точно последняя */
export const isFullPage = (list: unknown, pageSize: number) => Array.isArray(list) && list.length >= pageSize

const valueOf = (param: object, key: string) => (param as Record<string, unknown>)[key]

/**
 * `OFFSET`/`LIMIT` без общего числа записей: смещение растёт на размер страницы, пока
 * `hasMore` говорит, что страницы ещё есть. Растёт именно на размер страницы, а не на число
 * записей в ответе: так требует `im.recent.list`, у которого записи страницы сворачиваются в диалоги
 */
export function offsetNav<P extends object, T>(
  nav: BXRestOffsetNav,
  hasMore: (result: T, pageSize: number) => boolean,
  join?: Pick<BXRestSequentialNav<P, T>, 'keys' | 'unique'>
): BXRestSequentialNav<P, T> {
  return {
    ...join,
    first: param => withOffsetPageSize(param, nav),
    next: (param, result) => {
      const pageSize = Number(valueOf(param, nav.limit))
      return hasMore(result, pageSize)
        ? { ...param, [nav.offset]: (Number(valueOf(param, nav.offset)) || 0) + pageSize }
        : undefined
    },
  }
}

/**
 * Номер страницы (`page`) при постоянном размере страницы и без общего числа записей:
 * конец списка виден только по неполной странице
 */
export function pageNumberNav<P extends object>(pageSize: number): BXRestSequentialNav<P, unknown[]> {
  return {
    next: (param, result) => {
      // Нечисловой, нулевой или отрицательный номер портал понимает как первую страницу
      const page = Math.max(Math.trunc(Number(valueOf(param, 'page'))) || 1, 1)
      return isFullPage(result, pageSize) ? { ...param, page: page + 1 } : undefined
    },
  }
}

const paginationOf = (param: object) => (valueOf(param, 'pagination') ?? {}) as RestV3Pagination

const withPagination = <P extends object>(param: P, pagination: RestV3Pagination): P =>
  ({ ...param, pagination: { ...paginationOf(param), ...pagination } })

const withRestV3PageSize = <P extends object>(param: P, pageSize: number, maxPageSize: number): P =>
  withPagination(param, { limit: pageSizeOf(paginationOf(param).limit, pageSize, maxPageSize) })

/**
 * Объект `pagination` REST v3 (`page`, `limit`, `offset`). Общего числа записей в ответе нет,
 * конец списка виден по неполной странице. Если в запросе задан только `offset`, растёт он,
 * иначе — номер страницы
 */
export function restV3PageNav<P extends object, T>(
  pageSize: number,
  maxPageSize: number
): BXRestSequentialNav<P, T> {
  return {
    keys: ['items'],
    first: param => withRestV3PageSize(param, pageSize, maxPageSize),
    next: (param, result) => {
      const { page, limit, offset } = paginationOf(param)
      if (!isFullPage((result as RestV3Items | undefined)?.items, Number(limit))) {
        return undefined
      }
      return (page === undefined && offset !== undefined)
        ? withPagination(param, { offset: Number(offset) + Number(limit) })
        : withPagination(param, { page: (Number(page) || 1) + 1 })
    },
  }
}

/**
 * Курсор REST v3: следующая страница — с `pagination.afterCursor` из `result.nextCursor`
 * предыдущей, пока он не `null`
 */
export function restV3CursorNav<P extends object, T>(
  pageSize: number,
  maxPageSize: number
): BXRestSequentialNav<P, T> {
  return {
    keys: ['items'],
    first: param => withRestV3PageSize(param, pageSize, maxPageSize),
    next: (param, result) => {
      const nextCursor = (result as RestV3Items | undefined)?.nextCursor
      return nextCursor ? withPagination(param, { afterCursor: nextCursor }) : undefined
    },
  }
}
