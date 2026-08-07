import { BXRestNavvyCalendarMeetingStatus } from './meeting/status'

/** Calendar meeting operations (`calendar.meeting.*`). */
export class BXRestNavvyCalendarMeeting {
  public readonly status = new BXRestNavvyCalendarMeetingStatus()
}
