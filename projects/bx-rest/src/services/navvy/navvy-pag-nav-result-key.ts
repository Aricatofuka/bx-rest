import { mergeMap, shareReplay } from 'rxjs'
import { map } from 'rxjs/operators'
import { iBXRestPagination } from '../../typification/rest/base/api-pagination-bx'
import { ReturnTypeNavvy } from './navvy-support'
import { NavvyPagBase, offsetPageParams } from './extends/navvy-pag-base'

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

  resAll() {
    return this.resFirstPage().pipe(
      mergeMap(first => this.resPages<KeyedResult<K, T>>(offsetPageParams(this.param, first.total, this.pageSize)).pipe(
        map(pages => {
          const items = [first.result, ...pages].flatMap(page => page?.[this.key] ?? []) as T[]
          const joined = { ...first.result, [this.key]: items } as KeyedResult<K, T>
          return (this.map?.(joined) ?? []) as ReturnTypeNavvy<T, R>[]
        })
      )),
      // refCount: без подписчиков оставшиеся страницы запрашивать незачем
      shareReplay({ bufferSize: 1, refCount: true })
    )
  }
}
