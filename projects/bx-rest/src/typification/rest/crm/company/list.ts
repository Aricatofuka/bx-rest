import { iBXRestPagination } from '../../base/api-pagination-bx'
import { iBXRestParamSort } from '../../base/sort'

export interface iBXRestParamCrmCompanyList extends iBXRestPagination {
  order?: Record<string, iBXRestParamSort>
  filter?: Record<string, any>
  select?: string[]
}
