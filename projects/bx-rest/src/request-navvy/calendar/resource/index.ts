import { $add, $calendar, $delete, $list, $resource, $update } from '../../../consts/part-name-methods'
import { Navvy } from '../../../services/navvy'
import { iBXRestCalendarResource, iBXRestParamCalendarResourceAdd, iBXRestParamCalendarResourceDelete, iBXRestParamCalendarResourceUpdate } from '../../../typification/rest/calendar'
import { BXRestNavvyCalendarResourceBooking } from './booking'

/** Calendar resources (`calendar.resource.*`). */
export class BXRestNavvyCalendarResource {
  private readonly Navvy = new Navvy()
  private readonly url = {
    add: [$calendar, $resource, $add],
    update: [$calendar, $resource, $update],
    list: [$calendar, $resource, $list],
    delete: [$calendar, $resource, $delete]
  }

  public readonly booking = new BXRestNavvyCalendarResourceBooking()

  add(param: iBXRestParamCalendarResourceAdd) {
    return this.Navvy.simple<
      number,
      number,
      iBXRestParamCalendarResourceAdd
    >(this.url.add, param)
  }

  update(param: iBXRestParamCalendarResourceUpdate) {
    return this.Navvy.simple<
      number,
      number,
      iBXRestParamCalendarResourceUpdate
    >(this.url.update, param)
  }

  list() {
    return this.Navvy.simple<iBXRestCalendarResource[]>(this.url.list)
  }

  delete(param: iBXRestParamCalendarResourceDelete) {
    return this.Navvy.simple<
      boolean,
      boolean,
      iBXRestParamCalendarResourceDelete
    >(this.url.delete, param)
  }
}

