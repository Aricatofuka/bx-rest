import { iBXRestCalendarEventGetParam } from '../../typification/rest/calendar/get/param'
import { Navvy } from '../../services/navvy'
import { BXRestMapCalendarEvent } from '../../map/calendar/event'
import { $add, $calendar, $delete, $event, $get, $nearest, $update } from '../../consts/part-name-methods'

export class BXRestNavvyRestCalendarEvent {

  private url = {
    /**
     * Добавляет новое событие
     */
    add: [$calendar, $event, $add],
    /**
     * Удаляет событие
     */
    delete: [$calendar, $event, $delete],
    /**
     * Возвращает список событий календаря
     */
    get: [$calendar, $event, $get],
    /**
     * Возвращает список будущих событий для текущего пользователя
     */
    getNearest: [$calendar, $event, $get, $nearest],
    /**
     * Редактирует существующее событие
     */
    update: [$calendar, $event, $update],
  }

  private readonly Navvy = new Navvy()

  /**
   * Возвращает список событий календаря, всегда весь список, паганации в методе нет да и не нужна
   */
  get(param: iBXRestCalendarEventGetParam) {
    return this.Navvy.simple(
      this.url.get,
      param,
      BXRestMapCalendarEvent.get
    )
  }
}
