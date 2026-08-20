import { Navvy } from '../../services/navvy'
import { $add, $calendar, $delete, $get, $section, $update } from '../../consts/part-name-methods'
import {
  iBXRestCalendarSectionGetParam,
  iBXRestCalendarSectionAddParam,
  iBXRestCalendarSectionDeleteParam,
  iBXRestCalendarSectionUpdateParam
} from '../../typification/rest/calendar'
import { BXRestMapCalendarSection } from '../../map/calendar/section'

export class BXRestNavvyRestCalendarSection {

  private url = {

    /** Добавляет новый раздел */
    add: [$calendar, $section, $add],
    /** Удаляет раздел */
    delete: [$calendar, $section, $delete],

    /** Возвращает описание разделов */
    get: [$calendar, $section, $get],

    /** Редактирует существующее разделы */
    update: [$calendar, $section, $update],
  }

  private readonly Navvy = new Navvy()

  /**
   * Возвращает описание разделов, всегда весь список, паганации в методе нет да и не нужна.
   *
   * @param param
   * @param dateTimeFormat Формат полей `DATE_CREATE`/`TIMESTAMP_X` в ответе (см. {@link BXRestMapCalendarSection.get}).
   *   Передавайте явно, если формат дат на портале отличается от значения по умолчанию.
   */
  get(param: iBXRestCalendarSectionGetParam, dateTimeFormat?: string) {
    return this.Navvy.simple(
      this.url.get,
      param,
      (raw?: Parameters<typeof BXRestMapCalendarSection.get>[0]) => BXRestMapCalendarSection.get(raw, dateTimeFormat)
    )
  }

  /** Добавляет новый раздел */
  add(param: iBXRestCalendarSectionAddParam) {
    return this.Navvy.simple<number, number, iBXRestCalendarSectionAddParam>(
      this.url.add,
      param
    )
  }

  /** Удаляет раздел */
  delete(param: iBXRestCalendarSectionDeleteParam) {
    return this.Navvy.simple<boolean|string, boolean|string, iBXRestCalendarSectionDeleteParam>(
      this.url.delete,
      param
    )
  }

  /** Редактирует существующее разделы */
  update(param: iBXRestCalendarSectionUpdateParam) {
    return this.Navvy.simple<number, number, iBXRestCalendarSectionUpdateParam>(
      this.url.update,
      param
    )
  }
}
