import { mergeMap } from 'rxjs'
import { map } from 'rxjs/operators'
import { iBXRestPagination } from '../../typification/rest/base/api-pagination-bx'
import { ReturnTypeNavvy } from './navvy-support'
import { NavvyPagBase, offsetPageParams } from './extends/navvy-pag-base'

export class NavvyPag<T, R, P extends iBXRestPagination> extends NavvyPagBase<T[], R[], P> {

  resAll() {
    return this.resFirstPage().pipe(
      mergeMap(first => this.resPages<T[]>(offsetPageParams(this.param, first.total, this.pageSize)).pipe(
        map(pages => {
          const items = [first.result ?? [], ...pages].flat() as T[]
          return ((this.map ? this.map(items) : items) ?? []) as ReturnTypeNavvy<T, R>[]
        })
      ))
    )
  }
}
