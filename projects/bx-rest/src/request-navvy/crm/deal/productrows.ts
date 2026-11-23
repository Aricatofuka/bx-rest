import { Navvy } from '../../../services/navvy'
import {
  iBXRestCrmObject,
  iBXRestCrmParams,
  iBXRestParamCrmDealProductRowsGet
} from '../../../typification/rest/crm'
import { $crm, $deal, $get, $productrows, $set } from '../../../consts/part-name-methods'

export class BXRestNavvyCrmDealProductRows {
  private readonly Navvy = new Navvy()

  /**
   * Возвращает товарные позиции сделки
   * @see https://apidocs.bitrix24.ru/api-reference/crm/deals/crm-deal-productrows-get.html
   */
  get(param: iBXRestParamCrmDealProductRowsGet) {
    return this.Navvy.simple<
      iBXRestCrmObject[],
      iBXRestCrmObject[],
      iBXRestParamCrmDealProductRowsGet
    >([$crm, $deal, $productrows, $get], param)
  }

  /**
   * Создаёт или обновляет товарные позиции сделки
   */
  set(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>([$crm, $deal, $productrows, $set], param)
  }
}
