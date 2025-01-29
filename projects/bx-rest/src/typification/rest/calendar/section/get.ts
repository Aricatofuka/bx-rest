import { iBXRestCalendarType } from '../base/type'

export interface iBXRestCalendarSectionGetParam {
  type: iBXRestCalendarType
  ownerId?: number,
}

interface CalendarExport {
  ALLOW: boolean
  LINK: string
}

type CalendarAccess = Record<string, number>

interface CalendarPermissions {
  view_time: boolean
  view_title: boolean
  view_full: boolean
  add: boolean
  edit: boolean
  edit_section: boolean
  access: boolean
}

export interface iBXRestCalendarSectionGet extends iBXRestCalendarSectionGetBase {
  ID: number
  OWNER_ID: number
  CREATED_BY: number
  DATE_CREATE: Date
  TIMESTAMP_X: Date
}

export interface iBXRestCalendarSectionGetHttp extends iBXRestCalendarSectionGetBase {
  ID: string
  OWNER_ID: string
  CREATED_BY: string
  DATE_CREATE: string
  TIMESTAMP_X: string
}

interface iBXRestCalendarSectionGetBase {
  NAME: string
  GAPI_CALENDAR_ID: string | null // Пёс знает что это TODO: выяснить
  DESCRIPTION: string
  COLOR: string
  TEXT_COLOR:  null
  EXPORT: CalendarExport
  CAL_TYPE: iBXRestCalendarType
  CAL_DAV_CON: null
  SYNC_TOKEN: null
  PAGE_TOKEN: null
  EXTERNAL_TYPE: string
  ACCESS: CalendarAccess
  IS_COLLAB: boolean
  PERM: CalendarPermissions
}
