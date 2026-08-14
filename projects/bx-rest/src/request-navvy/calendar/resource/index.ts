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

  /**
   * Бронирования ресурсов (`calendar.resource.booking.*`).
   */
  public readonly booking = new BXRestNavvyCalendarResourceBooking()

  /**
   * Добавляет ресурс.
   */
  add(param: iBXRestParamCalendarResourceAdd) {
    return this.Navvy.simple<
      number,
      number,
      iBXRestParamCalendarResourceAdd
    >(this.url.add, param)
  }

  /**
   * Обновляет ресурс.
   */
  update(param: iBXRestParamCalendarResourceUpdate) {
    return this.Navvy.simple<
      number,
      number,
      iBXRestParamCalendarResourceUpdate
    >(this.url.update, param)
  }

  /**
   * Возвращает список ресурсов.
   */
  list() {
    return this.Navvy.simple<iBXRestCalendarResource[]>(this.url.list)
  }

  /**
   * Удаляет ресурс.
   */
  delete(param: iBXRestParamCalendarResourceDelete) {
    return this.Navvy.simple<
      boolean,
      boolean,
      iBXRestParamCalendarResourceDelete
    >(this.url.delete, param)
  }
}

