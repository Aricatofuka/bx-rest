import { iBXRestPagination } from '../../base/api-pagination-bx'

export interface iBXRestParamCrmDealList extends iBXRestPagination {
  order?: Record<string, 'asc' | 'desc'>
  filter?: Record<string, any>
  select?: string[]
}

