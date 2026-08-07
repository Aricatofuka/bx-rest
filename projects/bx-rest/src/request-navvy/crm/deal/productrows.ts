import { Navvy } from '../../../services/navvy'
import { iBXRestCrmObject, iBXRestCrmParams } from '../../../typification/rest/crm'
import { $crm, $deal, $get, $productrows, $set } from '../../../consts/part-name-methods'

export class BXRestNavvyCrmDealProductRows {
  private readonly Navvy = new Navvy()

  get(param: iBXRestCrmParams) {
    return this.Navvy.simple<iBXRestCrmObject[], iBXRestCrmObject[], iBXRestCrmParams>([$crm, $deal, $productrows, $get], param)
  }

  set(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>([$crm, $deal, $productrows, $set], param)
  }
}
