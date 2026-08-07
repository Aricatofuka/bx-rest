import {
  $calendar,
  $get,
  $meeting,
  $set,
  $status
} from '../../../consts/part-name-methods'
import { Navvy } from '../../../services/navvy'
import {
  iBXRestCalendarMeetingStatus,
  iBXRestParamCalendarMeetingStatusGet,
  iBXRestParamCalendarMeetingStatusSet
} from '../../../typification/rest/calendar'

/** Participation status of the current user in a calendar event. */
export class BXRestNavvyCalendarMeetingStatus {
  private readonly Navvy = new Navvy()
  private readonly url = {
    get: [$calendar, $meeting, $status, $get],
    set: [$calendar, $meeting, $status, $set]
  }

  get(param: iBXRestParamCalendarMeetingStatusGet) {
    return this.Navvy.simple<
      iBXRestCalendarMeetingStatus,
      iBXRestCalendarMeetingStatus,
      iBXRestParamCalendarMeetingStatusGet
    >(this.url.get, param)
  }

  set(param: iBXRestParamCalendarMeetingStatusSet) {
    return this.Navvy.simple<
      boolean,
      boolean,
      iBXRestParamCalendarMeetingStatusSet
    >(this.url.set, param)
  }
}
