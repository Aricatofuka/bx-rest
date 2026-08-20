
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
    /**
     * Возвращает список событий календаря, всегда весь список, паганации в методе нет да и не нужна.
     *
     * @param param
     * @param dateTimeFormat Формат полей с датой и временем в ответе (см. {@link BXRestMapCalendarEvent.get}).
     *   Передавайте явно, если формат дат на портале отличается от значения по умолчанию.
     */
    (param: iBXRestCalendarEventGetParam, dateTimeFormat?: string) => this.Navvy.simple(
      this.url.get,
      param,
      (raw?: Parameters<typeof BXRestMapCalendarEvent.get>[0]) => BXRestMapCalendarEvent.get(raw, dateTimeFormat)
    ),
    {
      /** Метод получает список будущих событий. @see get */
      nearest: (param: iBXRestCalendarEventGetNearestParam, dateTimeFormat?: string) => this.Navvy.simple(
        this.url.get.nearest,
        param,
        (raw?: Parameters<typeof BXRestMapCalendarEvent.get>[0]) => BXRestMapCalendarEvent.get(raw, dateTimeFormat)
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

  /**
   * Метод получает информацию о событии календаря по идентификатору.
   *
   * @param param
   * @param dateTimeFormat Формат полей с датой и временем в ответе (см. {@link BXRestMapCalendarEvent.getById}).
   *   Передавайте явно, если формат дат на портале отличается от значения по умолчанию.
   */
  getById(param: iBXRestCalendarEventGetByIdParam, dateTimeFormat?: string) {
    return this.Navvy.simple(
      this.url.getById,
      param,
      (raw?: Parameters<typeof BXRestMapCalendarEvent.getById>[0]) => BXRestMapCalendarEvent.getById(raw, dateTimeFormat)
    )
  }
}
