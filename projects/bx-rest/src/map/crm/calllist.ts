import clone from 'just-clone'
import {
  iBXRestCrmCallList,
  iBXRestCrmCallListHttp,
  iBXRestCrmCallListListItem,
  iBXRestCrmCallListListItemHttp
} from '../../typification/rest/crm'
import { toDate, toNum } from '../../services/base'

export class BXRestMapCrmCallList {
  /** Преобразует данные списка обзвона из формата Bitrix24 в локальный формат. */
  static get(value: iBXRestCrmCallListHttp | undefined): iBXRestCrmCallList | undefined {
    return this.mapItem(value) as iBXRestCrmCallList | undefined
  }

  /** Преобразует список обзвонов с учетом полей, выбранных через `SELECT`. */
  static list(
    value: iBXRestCrmCallListListItemHttp[] | undefined
  ): iBXRestCrmCallListListItem[] | undefined {
    return value?.map(item => this.mapItem(item) as iBXRestCrmCallListListItem)
  }

  private static mapItem(
    value: iBXRestCrmCallListListItemHttp | undefined
  ): iBXRestCrmCallListListItem | undefined {
    if (!value) return undefined

    const result = clone(value) as unknown as iBXRestCrmCallListListItem

    if (value.ID !== undefined) result.ID = toNum(value.ID)
    if (value.DATE_CREATE !== undefined) {
      result.DATE_CREATE = toDate(value.DATE_CREATE, 'yyyy-MM-dd HH:mm:ss')
    }
    if (value.CREATED_BY_ID !== undefined) result.CREATED_BY_ID = toNum(value.CREATED_BY_ID)
    if (value.WEBFORM_ID !== undefined) result.WEBFORM_ID = toNum(value.WEBFORM_ID)
    if (value.ENTITY_TYPE_ID !== undefined) result.ENTITY_TYPE_ID = toNum(value.ENTITY_TYPE_ID) as 3 | 4

    return result
  }
}
