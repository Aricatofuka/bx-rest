import { Navvy } from '../../../services/navvy'
import { iBXRestCrmObject, iBXRestCrmParams } from '../../../typification/rest/crm'
import { $crm, $get, $lead, $productrows, $set } from '../../../consts/part-name-methods'

export class BXRestNavvyCrmLeadProductRows {
  private readonly Navvy = new Navvy()

  /**
   * Возвращает товары лида.
   */
  get(param: iBXRestCrmParams) {
    return this.Navvy.simple<iBXRestCrmObject[], iBXRestCrmObject[], iBXRestCrmParams>([$crm, $lead, $productrows, $get], param)
  }

  /**
   * Устанавливает список товаров в лид.
   */
  set(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>([$crm, $lead, $productrows, $set], param)
  }
}
