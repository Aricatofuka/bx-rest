import { Observable } from 'rxjs'
import { iBXRestPagination } from '../../typification/rest/base/api-pagination-bx'
import { ReturnTypeNavvy } from './navvy-support'
import { NavvyPagBase, offsetPageParams, startOf } from './extends/navvy-pag-base'
import { BXRestResAllEvent } from './res-all-event'
import { resAllEvents, resAllResult } from './res-all-steps'

export class NavvyPag<T, R, P extends iBXRestPagination> extends NavvyPagBase<T[], R[], P> {

  resAll(): Observable<ReturnTypeNavvy<T, R>[]> {
    return resAllResult(this.resAllSteps())
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
      rest: first => offsetPageParams(this.param, first.total, this.pageSize),
      skipped: startOf(this.param),
      count: page => (Array.isArray(page) ? page.length : 0),
      join: pages => {
        const items = pages.map(page => page ?? []).flat() as T[]
        return ((this.map ? this.map(items) : items) ?? []) as ReturnTypeNavvy<T, R>[]
      },
    })
  }
}
