import { iBXRestPagination } from '../../typification/rest/base/api-pagination-bx'
import { map } from 'rxjs/operators'
import { mergeMap } from 'rxjs'
import { NavvyPagBase, offsetPageParams } from './extends/navvy-pag-base'
import { ReturnTypeNavvy } from './navvy-support'

export class NavvyPagNavWithUselessKey<T, R, P extends iBXRestPagination> extends NavvyPagBase<Record<string, T>, R[], P> {

  resAll() {
    return this.resFirstPage().pipe(
      mergeMap(first => {
        const params = first.next ? offsetPageParams(this.param, first.total, this.pageSize) : []

        return this.resPages<Record<string, T>>(params).pipe(
          map(pages => {
            const merged: Record<string, T> = Object.assign({}, first.result, ...pages)
            return (this.map ? this.map(merged) : [merged]) as ReturnTypeNavvy<Record<string, T>, R[]> | undefined
          })
        )
      })
    )
  }
}
