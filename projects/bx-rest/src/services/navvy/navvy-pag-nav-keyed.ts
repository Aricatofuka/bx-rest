import { mergeMap, Observable, shareReplay } from 'rxjs'
import { map } from 'rxjs/operators'
import { iBXRestPagination } from '../../typification/rest/base/api-pagination-bx'
import { ReturnTypeNavvy } from './navvy-support'
import { NavvyPagBase, offsetPageParams } from './extends/navvy-pag-base'

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
    return this.resFirstPage().pipe(
      mergeMap(first => this.resPages<T>(offsetPageParams(this.param, first.total, this.pageSize)).pipe(
        map(pages => {
          const items = [first.result, ...pages].flatMap(page => this.listIn(page))
          const joined = { ...first.result, [this.key]: items } as T
          return (this.map ? this.map(joined) : joined) as ReturnTypeNavvy<T, R>
        })
      )),
      // refCount: без подписчиков оставшиеся страницы запрашивать незачем
      shareReplay({ bufferSize: 1, refCount: true })
    )
  }

  private listIn(page: T | undefined): unknown[] {
    const list = (page as Record<string, unknown> | undefined)?.[this.key]
    return Array.isArray(list) ? list : []
  }
}
