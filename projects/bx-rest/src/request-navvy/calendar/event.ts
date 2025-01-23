import { iBXRestCalendarEventGetParam } from '../../typification/rest/calendar/get/param'
import { Navvy } from '../../services/navvy'
import { BXRestMapCalendarEvent } from '../../map/calendar/event'
import { $calendar, $event, $get } from '../../consts/part-name-methods'

export class BXRestNavvyRestCalendarEvent {

  private url = {
    // /**
    //  * Добавляет новое событие
    //  */
    // add: [$calendar, $event, $add],
    // /**
    //  * Удаляет событие
    //  */
    // delete: [$calendar, $event, $delete],
    /**
     * Возвращает список событий календаря
     */
    get: [$calendar, $event, $get],
    // /**
    //  * Возвращает список будущих событий для текущего пользователя
    //  */
    // getNearest: [$calendar, $event, $get, $nearest],
    // /**
    //  * Редактирует существующее событие
    //  */
    // update: [$calendar, $event, $get, $update],
  }

  private readonly Navvy = new Navvy()

  get(param: iBXRestCalendarEventGetParam) {
    return this.Navvy.simple(
      this.url.get,
      param,
      BXRestMapCalendarEvent.get
    )
  }
}
