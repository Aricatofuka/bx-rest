import clone from 'just-clone'
import {
  iBXRestCrmStatus,
  iBXRestCrmStatusEntityType,
  iBXRestCrmStatusEntityTypeHttp,
  iBXRestCrmStatusHttp
} from '../../typification/rest/crm'
import { toBool, toNum } from '../../services/base'

export class BXRestMapCrmStatus {
  /** Преобразует список элементов справочника из формата Bitrix24 в локальный формат. */
  static list(value: iBXRestCrmStatusHttp[] | undefined): iBXRestCrmStatus[] | undefined {
    return value?.map(item => BXRestMapCrmStatus.get(item) as iBXRestCrmStatus)
  }

  /** Преобразует элемент справочника из формата Bitrix24 в локальный формат. */
  static get(value: iBXRestCrmStatusHttp | undefined): iBXRestCrmStatus | undefined {
    if (!value) return undefined

    return Object.assign(clone(value), {
      ID: toNum(value.ID),
      SORT: toNum(value.SORT),
      SYSTEM: toBool(value.SYSTEM),
      CATEGORY_ID: value.CATEGORY_ID === null ? null : toNum(value.CATEGORY_ID)
    })
  }

  /** Нормализует идентификаторы воронок в описаниях типов справочников. */
  static entityTypes(
    value: iBXRestCrmStatusEntityTypeHttp[] | undefined
  ): iBXRestCrmStatusEntityType[] | undefined {
    return value?.map(item => Object.assign(clone(item), {
      CATEGORY_ID: item.CATEGORY_ID === undefined ? undefined : toNum(item.CATEGORY_ID)
    }))
  }
}
