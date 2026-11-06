import { mergeMap, shareReplay } from 'rxjs'
import { map } from 'rxjs/operators'
import { iBXRestPagination } from '../../typification/rest/base/api-pagination-bx'
import { NavvyPagBase, offsetPageParams } from './extends/navvy-pag-base'

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

  resAll() {
    return this.resFirstPage().pipe(
      mergeMap(first => this.resPages<KeyedObjectResult<K, T>>(offsetPageParams(this.param, first.total, this.pageSize)).pipe(
        map(pages => {
          const merged = Object.assign({}, first.result?.[this.key], ...pages.map(page => page[this.key]))
          return this.map?.({ ...first.result, [this.key]: merged } as KeyedObjectResult<K, T>)
        })
      )),
      // refCount: без подписчиков оставшиеся страницы запрашивать незачем
      shareReplay({ bufferSize: 1, refCount: true })
    )
  }
}
