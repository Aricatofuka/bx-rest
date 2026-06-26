import { iBXRestPagination } from '../../base/api-pagination-bx'
import { iBXRestParamSort } from '../../base/sort'

export type iBXRestBizprocTaskField =
  | 'ID'
  | 'WORKFLOW_ID'
  | 'DOCUMENT_NAME'
  | 'DESCRIPTION'
  | 'NAME'
  | 'MODIFIED'
  | 'WORKFLOW_STARTED'
  | 'WORKFLOW_STARTED_BY'
  | 'OVERDUE_DATE'
  | 'WORKFLOW_TEMPLATE_ID'
  | 'WORKFLOW_TEMPLATE_NAME'
  | 'WORKFLOW_STATE'
  | 'STATUS'
  | 'USER_ID'
  | 'USER_STATUS'
  | 'MODULE_ID'
  | 'ENTITY'
  | 'DOCUMENT_ID'
  | 'ACTIVITY'
  | 'ACTIVITY_NAME'
  | 'DOCUMENT_URL'
  | 'PARAMETERS'

export interface iBXRestParamBizprocTaskList extends iBXRestPagination {
  select?: iBXRestBizprocTaskField[]
  filter?: Partial<Record<iBXRestBizprocTaskField, string | number | null>>
  order?: Partial<Record<iBXRestBizprocTaskField, iBXRestParamSort>>
}

export interface iBXRestBizprocTaskParameterField {
  Id: string
  Type: string
  Name: string | Record<string, string>
  Description: string | Record<string, string>
  Multiple: boolean
  Required: boolean
  Options: Record<string, unknown> | null
  Settings: Record<string, unknown> | null
  Default: unknown
}

export interface iBXRestBizprocTaskParameters {
  CommentLabel?: string
  CommentRequired?: 'N' | 'Y' | 'YA' | 'YR'
  ShowComment?: 'N' | 'Y'
  StatusOkLabel?: string
  StatusYesLabel?: string
  StatusNoLabel?: string
  Fields?: iBXRestBizprocTaskParameterField[]
}

export interface iBXRestBizprocTask {
  ID: string
  WORKFLOW_ID?: string
  DOCUMENT_NAME?: string
  DESCRIPTION?: string
  NAME?: string
  MODIFIED?: string
  WORKFLOW_STARTED?: string
  WORKFLOW_STARTED_BY?: string
  OVERDUE_DATE?: string | null
  WORKFLOW_TEMPLATE_ID?: string
  WORKFLOW_TEMPLATE_NAME?: string
  WORKFLOW_STATE?: string
  STATUS?: string
  USER_ID?: string
  USER_STATUS?: string
  MODULE_ID?: string
  ENTITY?: string
  DOCUMENT_ID?: string
  ACTIVITY?: string
  ACTIVITY_NAME?: string
  DOCUMENT_URL?: string
  PARAMETERS?: iBXRestBizprocTaskParameters
}
