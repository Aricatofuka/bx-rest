import { Observable, shareReplay } from 'rxjs'
import clone from 'just-clone'
import { ReturnTypeNavvy } from './navvy-support'
import { iBXRestAlternativePagination } from '../../typification/rest/base/api-pagination-bx'
import { NavvyPagBase } from './extends/navvy-pag-base'
import { BXRestResAllEvent } from './res-all-event'
import { resAllEvents, resAllResult } from './res-all-steps'

/**
 * Класс-прослойка-обработчик для методов работающих на альтернативной постраничной навигации тика как методы по
 * затраченному времени на задачи https://dev.1c-bitrix.ru/rest_help/tasks/task/elapseditem/index.php
 *
 * не завершенный класс, работаем от частного к общему
 */
export class NavvyAlterPagNav<T, R, P extends iBXRestAlternativePagination> extends NavvyPagBase<T[], R[], P> {

  resAll(): Observable<ReturnTypeNavvy<T, R>[]> {
    return resAllResult(this.resAllSteps()).pipe(
      // refCount: без подписчиков оставшиеся страницы запрашивать незачем
      shareReplay({ bufferSize: 1, refCount: true })
    )
  }

  /**
   * Как `.resAll()`, но с ходом загрузки: `progress` с записями каждого HTTP-ответа,
   * в конце `done` с результатом `.resAll()`
   */
  resAllWithProgress(): Observable<BXRestResAllEvent<ReturnTypeNavvy<T, R>[]>> {
    return resAllEvents(this.resAllSteps())
  }

  private resAllSteps() {
    return this.resAllByBatch({
      first: this.param,
      rest: first => (first.next ? this.pageParams(first.total) : []),
      skipped: (this.firstPageNumber() - 1) * this.navPageSize(),
      count: page => (Array.isArray(page) ? page.length : 0),
      join: pages => {
        const items = pages.map(page => page ?? []).flat() as T[]
        return ((this.map ? this.map(items) : items) ?? []) as ReturnTypeNavvy<T, R>[]
      },
    })
  }

  /** Параметры остальных страниц */
  private pageParams(total = 0): P[] {
    const nav = this.param.PARAMS?.NAV_PARAMS
    const nPageSize = this.navPageSize()
    const pages: P[] = []

    for (let iNumPage = (nav?.iNumPage || 1) + 1; iNumPage <= Math.ceil(total / nPageSize); iNumPage++) {
      pages.push({ ...clone(this.param), PARAMS: { ...this.param.PARAMS, NAV_PARAMS: { ...nav, nPageSize, iNumPage } } })
    }
    return pages
  }

  /**
   * Размер страницы берётся из запроса: портал ограничивает его 50 записями, но вызывающий
   * код может попросить и меньше
   */
  private navPageSize(): number {
    return Math.min(this.param.PARAMS?.NAV_PARAMS?.nPageSize || this.pageSize, this.pageSize)
  }

  /** Номер первой страницы `.resAll()`: страница из запроса */
  private firstPageNumber(): number {
    return Math.max(Number(this.param.PARAMS?.NAV_PARAMS?.iNumPage) || 1, 1)
  }
}
