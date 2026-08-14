import { BXRestNavvyCalendarMeetingStatus } from './meeting/status'

/** Calendar meeting operations (`calendar.meeting.*`). */
export class BXRestNavvyCalendarMeeting {
  /**
   * Статус участия во встрече (`calendar.meeting.status.*`).
   */
  public readonly status = new BXRestNavvyCalendarMeetingStatus()
}
