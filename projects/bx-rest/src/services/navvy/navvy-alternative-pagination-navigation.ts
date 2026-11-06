import { mergeMap, shareReplay } from 'rxjs'
import clone from 'just-clone'
import { map } from 'rxjs/operators'
import { ReturnTypeNavvy } from './navvy-support'
import { iBXRestAlternativePagination } from '../../typification/rest/base/api-pagination-bx'
import { NavvyPagBase } from './extends/navvy-pag-base'

/**
 * Класс-прослойка-обработчик для методов работающих на альтернативной постраничной навигации тика как методы по
 * затраченному времени на задачи https://dev.1c-bitrix.ru/rest_help/tasks/task/elapseditem/index.php
 *
 * не завершенный класс, работаем от частного к общему
 */
export class NavvyAlterPagNav<T, R, P extends iBXRestAlternativePagination> extends NavvyPagBase<T[], R[], P> {

  resAll() {
    return this.resFirstPage().pipe(
      mergeMap(first => this.resPages<T[]>(first.next ? this.pageParams(first.total) : []).pipe(
        map(pages => {
          const items = [first.result ?? [], ...pages].flat() as T[]
          return ((this.map ? this.map(items) : items) ?? []) as ReturnTypeNavvy<T, R>[]
        })
      )),
      // refCount: без подписчиков оставшиеся страницы запрашивать незачем
      shareReplay({ bufferSize: 1, refCount: true })
    )
  }

  /**
   * Параметры остальных страниц. Размер страницы берётся из запроса: портал ограничивает
   * его 50 записями, но вызывающий код может попросить и меньше.
   */
  private pageParams(total = 0): P[] {
    const nav = this.param.PARAMS?.NAV_PARAMS
    const nPageSize = Math.min(nav?.nPageSize || this.pageSize, this.pageSize)
    const pages: P[] = []

    for (let iNumPage = (nav?.iNumPage || 1) + 1; iNumPage <= Math.ceil(total / nPageSize); iNumPage++) {
      pages.push({ ...clone(this.param), PARAMS: { ...this.param.PARAMS, NAV_PARAMS: { ...nav, nPageSize, iNumPage } } })
    }
    return pages
  }
}
