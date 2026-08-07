export type iBXRestTimemanObject = Record<string, unknown>

export interface iBXRestParamTimemanNetworkRangeCheck {
  IP?: string
}

export interface iBXRestTimemanNetworkRange {
  IP_RANGE: string
  NAME?: string
  [field: string]: unknown
}

export interface iBXRestParamTimemanNetworkRangeSet {
  RANGES: iBXRestTimemanNetworkRange[]
}

export interface iBXRestParamTimemanRecordFieldGet {
  name: string
  select?: string[]
}

export interface iBXRestParamTimemanRecordFieldList {
  select?: string[]
}

export interface iBXRestParamTimemanRecordList {
  filter: Record<string, unknown>
  select?: string[]
  order?: Record<string, 'ASC' | 'DESC'>
  pagination?: {
    page?: number
    limit?: number
  }
}

export interface iBXRestTimemanItemsResult<T = iBXRestTimemanObject> {
  items: T[]
  pagination?: iBXRestTimemanObject
}

export interface iBXRestTimemanItemResult<T = iBXRestTimemanObject> {
  item: T
}

export interface iBXRestParamTimemanScheduleGet {
  id?: number
}

export interface iBXRestParamTimemanTimeControlReportAdd {
  REPORT_ID?: number
  ID?: number
  USER_ID?: number
  TEXT: string
  TYPE?: 'work' | 'private' | string
  CALENDAR?: 'Y' | 'N'
}

export interface iBXRestParamTimemanTimeControlReportsGet {
  USER_ID: number
  MONTH: number
  YEAR: number
  IDLE_MINUTES?: number
  WORKDAY_HOURS?: number
}

export interface iBXRestParamTimemanTimeControlReportsUsersGet {
  DEPARTMENT_ID?: number
}

export interface iBXRestTimemanTimeControlSettings extends iBXRestTimemanObject {
  active?: boolean
  minimumIdleForReport?: number
  registerOffline?: boolean
  registerIdle?: boolean
  registerDesktop?: boolean
}

export interface iBXRestParamTimemanTimeControlSettingsSet {
  ACTIVE?: boolean
  MINIMUM_IDLE_FOR_REPORT?: number
  REGISTER_OFFLINE?: boolean
  REGISTER_IDLE?: boolean
  REGISTER_DESKTOP?: boolean
  REPORT_REQUEST_TYPE?: string
  REPORT_REQUEST_USERS?: number[]
  REPORT_SIMPLE_TYPE?: string
  REPORT_SIMPLE_USERS?: number[]
  REPORT_FULL_TYPE?: string
  REPORT_FULL_USERS?: number[]
}
