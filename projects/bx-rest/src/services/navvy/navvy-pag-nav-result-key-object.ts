import { Observable, shareReplay } from 'rxjs'
import { iBXRestPagination } from '../../typification/rest/base/api-pagination-bx'
import { NavvyPagBase, offsetPageParams, startOf } from './extends/navvy-pag-base'
import { BXRestResAllEvent } from './res-all-event'
import { resAllEvents, resAllResult } from './res-all-steps'

type KeyedObjectResult<K extends string, T> = Record<K, Record<string, T> | undefined>

/** Пагинация для методов, возвращающих коллекцию как объект с идентификаторами в ключах. */
export class NavvyPagNavResultKeyObject<
  T,
  R,
  P extends iBXRestPagination,
  K extends string
> extends NavvyPagBase<KeyedObjectResult<K, T>, R[], P> {
  constructor(
    url: string[],
    param: P,
    private readonly key: K,
    mapResult?: (param: KeyedObjectResult<K, T> | undefined) => R[] | undefined
  ) {
    // Без своего map результат — значения объекта по ключу, как и обещают типы `.res()` и `.resAll()`.
    super(url, param, mapResult ?? (result => Object.values(result?.[key] ?? {}) as unknown as R[]))
  }

  resAll(): Observable<R[] | undefined> {
    return resAllResult(this.resAllSteps()).pipe(
      // refCount: без подписчиков оставшиеся страницы запрашивать незачем
      shareReplay({ bufferSize: 1, refCount: true })
    )
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
      rest: first => offsetPageParams(this.param, first.total, this.pageSize),
      skipped: startOf(this.param),
      count: page => Object.keys(page?.[this.key] ?? {}).length,
      join: pages => {
        const merged = pages.reduce<Record<string, T>>((all, page) => Object.assign(all, page?.[this.key]), {})
        return this.map?.({ ...pages[0], [this.key]: merged } as KeyedObjectResult<K, T>)
      },
    })
  }
}
