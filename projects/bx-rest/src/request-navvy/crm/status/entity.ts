import { $crm, $status } from '../../../consts/part-name-methods'
import { BXRestMapCrmStatus } from '../../../map/crm'
import { Navvy } from '../../../services/navvy'
import {
  iBXRestCrmStatusEntityItem,
  iBXRestCrmStatusEntityType,
  iBXRestCrmStatusEntityTypeHttp,
  iBXRestParamCrmStatusEntityItems
} from '../../../typification/rest/crm'

/** Навигатор методов описания типов справочников CRM (`crm.status.entity.*`). */
export class BXRestNavvyCrmStatusEntity {
  private readonly Navvy = new Navvy()
  private readonly url = {
    items: [$crm, $status, 'entity', 'items'],
    types: [$crm, $status, 'entity', 'types']
  }

  /**
   * Возвращает все элементы указанного справочника с сортировкой по полю `SORT`.
   *
   * @param param Символьный идентификатор справочника в поле `entityId`.
   * @see https://apidocs.bitrix24.ru/api-reference/crm/status/crm-status-entity-items.html
   */
  items(param: iBXRestParamCrmStatusEntityItems) {
    return this.Navvy.simple<
      iBXRestCrmStatusEntityItem[],
      iBXRestCrmStatusEntityItem[],
      iBXRestParamCrmStatusEntityItems
    >(this.url.items, param)
  }

  /**
   * Возвращает все поддерживаемые типы справочников и их символьные идентификаторы.
   * Для справочников стадий ответ также содержит сведения о воронке и семантике.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/status/crm-status-entity-types.html
   */
  types() {
    return this.Navvy.simple<
      iBXRestCrmStatusEntityTypeHttp[],
      iBXRestCrmStatusEntityType[],
      undefined
    >(this.url.types, undefined, BXRestMapCrmStatus.entityTypes)
  }
}
