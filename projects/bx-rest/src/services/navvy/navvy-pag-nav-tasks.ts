import { iBXRestPagination } from '../../typification/rest/base/api-pagination-bx'
import { NavvyPagNavResultKey } from './navvy-pag-nav-result-key'

export class NavvyPagNavTasks<T, R, P extends iBXRestPagination> extends NavvyPagNavResultKey<T, R, P, 'tasks'> {

  constructor(
    url: string[],
    param: P,
    map?: (param: { tasks: T[] | undefined } | undefined) => R[] | undefined,
    restApi?: boolean
  ) {
    super(url, param, 'tasks', map, restApi)
  }
}
