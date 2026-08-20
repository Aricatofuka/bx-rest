import clone from 'just-clone'
import {
  iBXRestCrmCallList,
  iBXRestCrmCallListHttp,
  iBXRestCrmCallListListItem,
  iBXRestCrmCallListListItemHttp
} from '../../typification/rest/crm'
import { toDate, toNum } from '../../services/base'

export class BXRestMapCrmCallList {
  /**
   * Преобразует данные списка обзвона из формата Bitrix24 в локальный формат.
   *
   * @param value
   * @param dateTimeFormat Формат поля `DATE_CREATE`. По умолчанию — `'yyyy-MM-dd HH:mm:ss'`, но реальный
   *   формат зависит от настроек портала (Настройки → формат даты и времени) — если он известен,
   *   передавайте его явно.
   */
  static get(value: iBXRestCrmCallListHttp | undefined, dateTimeFormat = 'yyyy-MM-dd HH:mm:ss'): iBXRestCrmCallList | undefined {
    return this.mapItem(value, dateTimeFormat) as iBXRestCrmCallList | undefined
  }

  /** Преобразует список обзвонов с учетом полей, выбранных через `SELECT`. @see get */
  static list(
    value: iBXRestCrmCallListListItemHttp[] | undefined,
    dateTimeFormat = 'yyyy-MM-dd HH:mm:ss'
  ): iBXRestCrmCallListListItem[] | undefined {
    return value?.map(item => this.mapItem(item, dateTimeFormat) as iBXRestCrmCallListListItem)
  }

  private static mapItem(
    value: iBXRestCrmCallListListItemHttp | undefined,
    dateTimeFormat = 'yyyy-MM-dd HH:mm:ss'
  ): iBXRestCrmCallListListItem | undefined {
    if (!value) return undefined

    const result = clone(value) as unknown as iBXRestCrmCallListListItem

    if (value.ID !== undefined) result.ID = toNum(value.ID)
    if (value.DATE_CREATE !== undefined) {
      result.DATE_CREATE = toDate(value.DATE_CREATE, dateTimeFormat)
    }
    if (value.CREATED_BY_ID !== undefined) result.CREATED_BY_ID = toNum(value.CREATED_BY_ID)
    if (value.WEBFORM_ID !== undefined) result.WEBFORM_ID = toNum(value.WEBFORM_ID)
    if (value.ENTITY_TYPE_ID !== undefined) result.ENTITY_TYPE_ID = toNum(value.ENTITY_TYPE_ID) as 3 | 4

    return result
  }
}
