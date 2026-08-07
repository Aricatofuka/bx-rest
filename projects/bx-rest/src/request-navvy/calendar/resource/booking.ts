import { $booking, $calendar, $list, $resource } from '../../../consts/part-name-methods'
import { Navvy } from '../../../services/navvy'
import { iBXRestCalendarResourceBooking, iBXRestParamCalendarResourceBookingList } from '../../../typification/rest/calendar'

/** Resource bookings (`calendar.resource.booking.*`). */
export class BXRestNavvyCalendarResourceBooking {
  private readonly Navvy = new Navvy()
  private readonly url = {
    list: [$calendar, $resource, $booking, $list]
  }

  /** Returns bookings matching one resource filter. */
  list(param: iBXRestParamCalendarResourceBookingList) {
    return this.Navvy.pagNav<
      iBXRestCalendarResourceBooking,
      iBXRestCalendarResourceBooking,
      iBXRestParamCalendarResourceBookingList
    >(this.url.list, param)
  }
}

