import { Navvy } from '../../../services/navvy'
import {
  iBXRestCrmObject,
  iBXRestCrmParams,
  iBXRestParamCrmItemEntityId
} from '../../../typification/rest/crm'
import { $crm, $delivery, $get, $item, $list } from '../../../consts/part-name-methods'

export class BXRestNavvyCrmItemDelivery {
  private readonly Navvy = new Navvy()

  /**
   * Возвращает информацию о доставке по идентификатору
   */
  get(param: iBXRestCrmParams) {
    return this.Navvy.simple<iBXRestCrmObject, iBXRestCrmObject, iBXRestCrmParams>([$crm, $item, $delivery, $get], param)
  }

  /**
   * Возвращает список доставок объекта CRM
   * @see https://apidocs.bitrix24.ru/api-reference/crm/universal/delivery/crm-item-delivery-list.html
   */
  list(param: iBXRestParamCrmItemEntityId) {
    return this.Navvy.simple<
      iBXRestCrmObject[],
      iBXRestCrmObject[],
      iBXRestParamCrmItemEntityId
    >([$crm, $item, $delivery, $list], param)
  }
}
