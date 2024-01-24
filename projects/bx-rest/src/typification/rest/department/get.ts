import { iBXRestPagination } from '../base/ApiPaginationBX'
import { iBXRestParamSort } from '../base/sort'

export interface iBXRestParamDepartmentGet extends iBXRestPagination {
  ID?: number | number[]
  NAME?: string
  SORT?: number
  PARENT?: number
  UF_HEAD?: number
  ORDER?: iBXRestParamSort
}
