
import { Navvy } from '../../services/navvy'
import { BXRestMapCalendarEvent } from '../../map/calendar/event'
import { $add, $calendar, $delete, $event, $get, $nearest, $update } from '../../consts/part-name-methods'
import {
  iBXRestCalendarEventGetByIdParam,
  iBXRestCalendarEventGetParam,
  iBXRestCalendarEventAddParam,
  iBXRestCalendarEventUpdateParam,
  iBXRestCalendarEventDeleteParam,
  iBXRestCalendarEventGetNearestParam
} from '../../typification/rest/calendar'

export class BXRestNavvyRestCalendarEvent {

  private url = {

    /** Добавляет новое событие */
    add: [$calendar, $event, $add],

    /** Удаляет событие */
    delete: [$calendar, $event, $delete],

    /** Возвращает список событий календаря */
    get: Object.assign([$calendar, $event, $get], {

      /** Возвращает список будущих событий для текущего пользователя */
      nearest: [$calendar, $event, $get, $nearest],
    }),

    /** Метод получает информацию о событии календаря по идентификатору */
    getById: [$calendar, $event, 'getById'],

    /** Редактирует существующее событие */
    update: [$calendar, $event, $update],
  }

  private readonly Navvy = new Navvy()

  /** Добавляет событие в календарь */
  add(param: iBXRestCalendarEventAddParam) {
    return this.Navvy.simple<number, number, iBXRestCalendarEventAddParam>(
      this.url.add,
      param
    )
  }

  /** Добавляет событие в календарь */
  delete(param: iBXRestCalendarEventDeleteParam) {
    return this.Navvy.simple<boolean, boolean, iBXRestCalendarEventDeleteParam>(
      this.url.delete,
      param
    )
  }

  // /** Возвращает список событий календаря, всегда весь список, паганации в методе нет да и не нужна */
  // get(param: iBXRestCalendarEventGetParam) {
  //   return this.Navvy.simple(
  //     this.url.get,
  //     param,
  //     BXRestMapCalendarEvent.get
  //   )
  // }

  get = Object.assign(
    /** Возвращает список событий календаря, всегда весь список, паганации в методе нет да и не нужна */
    (param: iBXRestCalendarEventGetParam) => this.Navvy.simple(
      this.url.get,
      param,
      BXRestMapCalendarEvent.get
    ),
    {
      /** Метод получает список будущих событий */
      nearest: (param: iBXRestCalendarEventGetNearestParam) => this.Navvy.simple(
        this.url.get.nearest,
        param,
        BXRestMapCalendarEvent.get
      ),
    }
  );

  /** Обновление событие в календарь */
  update(param: iBXRestCalendarEventUpdateParam) {
    return this.Navvy.simple<number, number, iBXRestCalendarEventUpdateParam>(
      this.url.update,
      param
    )
  }

  /** Метод получает информацию о событии календаря по идентификатору */
  getById(param: iBXRestCalendarEventGetByIdParam) {
    return this.Navvy.simple(
      this.url.getById,
      param,
      BXRestMapCalendarEvent.getById
    )
  }
}
