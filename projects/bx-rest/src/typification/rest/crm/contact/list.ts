import { iBXRestPagination } from '../../base/api-pagination-bx'

export interface iBXRestParamCrmContactList extends iBXRestPagination {
  order?: Record<string, 'asc' | 'desc'>
  filter?: Record<string, any>
  select?: string[]
}

