import { Observable, shareReplay } from 'rxjs'
import { iBXRestPagination } from '../../typification/rest/base/api-pagination-bx'
import { ReturnTypeNavvy } from './navvy-support'
import { NavvyPagBase, offsetPageParams, startOf } from './extends/navvy-pag-base'
import { BXRestResAllEvent } from './res-all-event'
import { resAllEvents, resAllResult } from './res-all-steps'

type KeyedResult<K extends string, T> = Record<K, T[] | undefined>

export class NavvyPagNavResultKey<T, R, P extends iBXRestPagination, K extends string>
  extends NavvyPagBase<KeyedResult<K, T>, R[], P> {

  constructor(
    url: string[],
    param: P,
    private readonly key: K,
    map?: (param: KeyedResult<K, T> | undefined) => R[] | undefined,
    restApi?: boolean
  ) {
    // Без своего map результат — массив по ключу, как и обещают типы `.res()` и `.resAll()`.
    // Иначе `.res()` отдал бы весь объект `{ items: [...] }`.
    super(url, param, map ?? (result => (result?.[key] ?? []) as unknown as R[]), restApi)
  }

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
      rest: first => offsetPageParams(this.param, first.total, this.pageSize),
      skipped: startOf(this.param),
      count: page => {
        const list = page?.[this.key]
        return Array.isArray(list) ? list.length : 0
      },
      join: pages => {
        const items = pages.flatMap(page => page?.[this.key] ?? []) as T[]
        const joined = { ...pages[0], [this.key]: items } as KeyedResult<K, T>
        return (this.map?.(joined) ?? []) as ReturnTypeNavvy<T, R>[]
      },
    })
  }
}
