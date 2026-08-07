/** Calendar meeting participation status. */
export type iBXRestCalendarMeetingStatus = 'Y' | 'N' | 'Q'

/** Parameters of `calendar.meeting.status.get`. */
export interface iBXRestParamCalendarMeetingStatusGet {
  eventId: number
}

/** Parameters of `calendar.meeting.status.set`. */
export interface iBXRestParamCalendarMeetingStatusSet
  extends iBXRestParamCalendarMeetingStatusGet {
  status: iBXRestCalendarMeetingStatus
}
