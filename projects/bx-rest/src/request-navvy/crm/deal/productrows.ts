import { Navvy } from '../../../services/navvy'
import { iBXRestCrmObject, iBXRestCrmParams } from '../../../typification/rest/crm'
import { $crm, $deal, $get, $productrows, $set } from '../../../consts/part-name-methods'

export class BXRestNavvyCrmDealProductRows {
  private readonly Navvy = new Navvy()

  /**
   * Возвращает товарные позиции сделки.
   */
  get(param: iBXRestCrmParams) {
    return this.Navvy.simple<iBXRestCrmObject[], iBXRestCrmObject[], iBXRestCrmParams>([$crm, $deal, $productrows, $get], param)
  }

  /**
   * Создаёт или обновляет товарные позиции сделки.
   */
  set(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>([$crm, $deal, $productrows, $set], param)
  }
}
