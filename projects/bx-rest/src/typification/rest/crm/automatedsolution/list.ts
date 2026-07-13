import { iBXRestPagination } from '../../base/api-pagination-bx'

export interface iBXRestParamCrmAutomatedSolutionList extends iBXRestPagination {
  /** Сортировка по полям `id` и `title`. */
  order?: Record<string, 'ASC' | 'DESC' | 'asc' | 'desc'>
  /** Фильтр по полям `id` и `title`, включая REST-префиксы операторов. */
  filter?: Record<string, any>
}
