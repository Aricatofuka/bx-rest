import { iBXRestFilterGenerator } from '../../base/filter-generator'
import { iBXRestPagination } from '../../base/api-pagination-bx'
import { iBXRestParamSort } from '../../base/sort'

export type iBXRestBizprocWorkflowInstanceField =
  | 'ID'
  | 'MODIFIED'
  | 'OWNED_UNTIL'
  | 'MODULE_ID'
  | 'ENTITY'
  | 'DOCUMENT_ID'
  | 'STARTED'
  | 'STARTED_BY'
  | 'TEMPLATE_ID'

export interface iBXRestParamBizprocWorkflowInstances extends iBXRestPagination {
  select?: iBXRestBizprocWorkflowInstanceField[]
  filter?: iBXRestFilterGenerator<Record<iBXRestBizprocWorkflowInstanceField, string | number | null>>
  order?: Partial<Record<iBXRestBizprocWorkflowInstanceField, iBXRestParamSort>>
}

export interface iBXRestBizprocWorkflowInstance {
  ID: string
  MODIFIED?: string
  OWNED_UNTIL?: string | null
  MODULE_ID?: string
  ENTITY?: string
  DOCUMENT_ID?: string
  STARTED?: string
  STARTED_BY?: string
  TEMPLATE_ID?: string
}
