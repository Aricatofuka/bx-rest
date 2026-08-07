import { iBXRestPagination } from '../base/api-pagination-bx'
import { iBXRestYesNo } from '../base/yes-no'

/** Calendar resource. */
export interface iBXRestCalendarResource {
  ID: string
  NAME: string
  CREATED_BY: string
}

/** Parameters of `calendar.resource.add`. */
export interface iBXRestParamCalendarResourceAdd {
  name: string
}

/** Parameters of `calendar.resource.update`. */
export interface iBXRestParamCalendarResourceUpdate {
  resourceId: number
  name: string
}

/** Parameters of `calendar.resource.delete`. */
export interface iBXRestParamCalendarResourceDelete {
  resourceId: number
}

interface iBXRestCalendarResourceBookingFilterBase {
  from?: string
  to?: string
}

/** A booking can be selected either by resource types or by CRM booking IDs. */
export type iBXRestCalendarResourceBookingFilter =
  | (iBXRestCalendarResourceBookingFilterBase & {
    resourceTypeIdList: number[]
    resourceIdList?: never
  })
  | (iBXRestCalendarResourceBookingFilterBase & {
    resourceTypeIdList?: never
    resourceIdList: number[]
  })

/** Parameters of `calendar.resource.booking.list`. */
export interface iBXRestParamCalendarResourceBookingList
  extends iBXRestPagination {
  filter: iBXRestCalendarResourceBookingFilter
}

/** Resource booking returned by the calendar API. */
export interface iBXRestCalendarResourceBooking {
  ID: string
  PARENT_ID: string
  DELETED: iBXRestYesNo
  CAL_TYPE: string
  OWNER_ID: string
  NAME: string
  DATE_FROM: string
  DATE_TO: string
  TZ_FROM: string
  TZ_TO: string
  TZ_OFFSET_FROM: string
  TZ_OFFSET_TO: string
  DATE_FROM_TS_UTC: string
  DATE_TO_TS_UTC: string
  DT_SKIP_TIME: iBXRestYesNo
  DT_LENGTH: number
  EVENT_TYPE: string
  CREATED_BY: string
  DATE_CREATE: string
  TIMESTAMP_X: string
  DESCRIPTION: string
  IS_MEETING: boolean
  MEETING_STATUS: iBXRestYesNo
  MEETING_HOST: string
  VERSION: string
  SECTION_ID: string
  DATE_FROM_FORMATTED: string
  DATE_TO_FORMATTED: string
  SECT_ID: string
  RESOURCE_BOOKING_ID: string
}
