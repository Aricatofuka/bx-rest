import { Navvy } from '../../../services/navvy'
import { iBXRestCrmObject, iBXRestCrmParams } from '../../../typification/rest/crm'
import { $crm, $delivery, $get, $item, $list } from '../../../consts/part-name-methods'

export class BXRestNavvyCrmItemDelivery {
  private readonly Navvy = new Navvy()

  get(param: iBXRestCrmParams) {
    return this.Navvy.simple<iBXRestCrmObject, iBXRestCrmObject, iBXRestCrmParams>([$crm, $item, $delivery, $get], param)
  }

  list(param: iBXRestCrmParams) {
    return this.Navvy.simple<iBXRestCrmObject[], iBXRestCrmObject[], iBXRestCrmParams>([$crm, $item, $delivery, $list], param)
  }
}
