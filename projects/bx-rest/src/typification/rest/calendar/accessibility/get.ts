import { iBXRestYesNo } from '../../base/yes-no'

/** Parameters of `calendar.accessibility.get`. */
export interface iBXRestParamCalendarAccessibilityGet {
  /** User identifiers whose availability should be checked. */
  users: number[]
  /** Start of the period in `YYYY-MM-DD` format. */
  from: string
  /** End of the period in `YYYY-MM-DD` format. */
  to: string
}

/** A busy calendar interval returned for a user. */
export interface iBXRestCalendarAccessibilityEvent {
  ID: string
  NAME: string
  DATE_FROM: string
  DATE_TO: string
  DATE_FROM_TS_UTC: string
  DATE_TO_TS_UTC: string
  '~USER_OFFSET_FROM': number
  '~USER_OFFSET_TO': number
  DT_SKIP_TIME: iBXRestYesNo
  TZ_FROM: string
  TZ_TO: string
  ACCESSIBILITY: 'busy' | 'absent' | 'quest' | 'free'
  IMPORTANCE: 'high' | 'normal' | 'low'
  EVENT_TYPE?: '#shared#' | '#shared_crm#' | '#collab#' | '#shared_collab#' | string
}

/** Availability grouped by user identifier. */
export type iBXRestCalendarAccessibility = Record<
  string,
  iBXRestCalendarAccessibilityEvent[]
>
