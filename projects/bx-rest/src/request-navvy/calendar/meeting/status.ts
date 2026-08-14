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

  /**
   * Возвращает статус участия текущего пользователя во встрече.
   */
  get(param: iBXRestParamCalendarMeetingStatusGet) {
    return this.Navvy.simple<
      iBXRestCalendarMeetingStatus,
      iBXRestCalendarMeetingStatus,
      iBXRestParamCalendarMeetingStatusGet
    >(this.url.get, param)
  }

  /**
   * Устанавливает статус участия текущего пользователя во встрече.
   */
  set(param: iBXRestParamCalendarMeetingStatusSet) {
    return this.Navvy.simple<
      boolean,
      boolean,
      iBXRestParamCalendarMeetingStatusSet
    >(this.url.set, param)
  }
}
