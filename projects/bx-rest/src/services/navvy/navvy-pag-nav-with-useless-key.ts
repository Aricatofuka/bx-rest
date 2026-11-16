import { Observable } from 'rxjs'
import { iBXRestPagination } from '../../typification/rest/base/api-pagination-bx'
import { NavvyPagBase, offsetPageParams, startOf } from './extends/navvy-pag-base'
import { ReturnTypeNavvy } from './navvy-support'
import { BXRestResAllEvent } from './res-all-event'
import { resAllEvents, resAllResult } from './res-all-steps'

export class NavvyPagNavWithUselessKey<T, R, P extends iBXRestPagination> extends NavvyPagBase<Record<string, T>, R[], P> {

  resAll(): Observable<R[] | undefined> {
    return resAllResult(this.resAllSteps())
  }

  /**
   * Как `.resAll()`, но с ходом загрузки: `progress` с записями каждого HTTP-ответа,
   * в конце `done` с результатом `.resAll()`
   */
  resAllWithProgress(): Observable<BXRestResAllEvent<R[] | undefined>> {
    return resAllEvents(this.resAllSteps())
  }

  private resAllSteps() {
    return this.resAllByBatch({
      first: this.param,
      rest: first => (first.next ? offsetPageParams(this.param, first.total, this.pageSize) : []),
      skipped: startOf(this.param),
      count: page => Object.keys(page ?? {}).length,
      join: pages => {
        const merged = pages.reduce<Record<string, T>>((all, page) => Object.assign(all, page), {})
        return (this.map ? this.map(merged) : [merged]) as ReturnTypeNavvy<Record<string, T>, R[]> | undefined
      },
    })
  }
}
