export type iBXRestBizprocTaskCompleteStatus =
  | 1
  | 2
  | 3
  | 4
  | 'yes'
  | 'no'
  | 'ok'
  | 'cancel'

export interface iBXRestParamBizprocTaskComplete {
  TASK_ID: number
  STATUS: iBXRestBizprocTaskCompleteStatus
  COMMENT?: string
  FIELDS?: Record<string, unknown>
}
