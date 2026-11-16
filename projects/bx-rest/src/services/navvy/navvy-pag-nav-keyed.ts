import { Observable, shareReplay } from 'rxjs'
import { iBXRestPagination } from '../../typification/rest/base/api-pagination-bx'
import { ReturnTypeNavvy } from './navvy-support'
import { NavvyPagBase, offsetPageParams, startOf } from './extends/navvy-pag-base'
import { BXRestResAllEvent } from './res-all-event'
import { resAllEvents, resAllResult } from './res-all-steps'

/**
 * Пагинация для методов, у которых `result` — объект, а список лежит в нём под ключом:
 * `{ products: [...] }`, `{ orders: [...] }`.
 *
 * В отличие от {@link NavvyPagNavResultKey}, `.res()` отдаёт объект как есть, а `.resAll()` —
 * такой же объект, где под ключом собраны записи всех страниц. Так `.resAll()` можно добавить
 * методу, который раньше создавался через `simple`, не меняя результат его `.res()`.
 */
export class NavvyPagNavKeyed<T extends object, R, P extends iBXRestPagination> extends NavvyPagBase<T, R, P> {

  constructor(
    url: string[],
    param: P,
    private readonly key: string,
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
   * Как `.resAll()`, но с ходом загрузки: `progress` с записями каждого HTTP-ответа,
   * в конце `done` с результатом `.resAll()`. Записи ответа — такой же объект, как у `.resAll()`,
   * с записями этого ответа под ключом
   */
  resAllWithProgress(): Observable<BXRestResAllEvent<ReturnTypeNavvy<T, R>>> {
    return resAllEvents(this.resAllSteps())
  }

  private resAllSteps() {
    return this.resAllByBatch({
      first: this.param,
      rest: first => offsetPageParams(this.param, first.total, this.pageSize),
      skipped: startOf(this.param),
      count: page => this.listIn(page).length,
      join: pages => {
        const joined = { ...pages[0], [this.key]: pages.flatMap(page => this.listIn(page)) } as T
        return (this.map ? this.map(joined) : joined) as ReturnTypeNavvy<T, R>
      },
    })
  }

  private listIn(page: T | undefined): unknown[] {
    const list = (page as Record<string, unknown> | undefined)?.[this.key]
    return Array.isArray(list) ? list : []
  }
}
