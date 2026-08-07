import { Navvy } from '../../../../services/navvy'
import { iBXRestCrmObject, iBXRestCrmParams } from '../../../../typification/rest/crm'
import { $add, $crm, $delete, $delivery, $item, $list, $payment, $setDelivery } from '../../../../consts/part-name-methods'

export class BXRestNavvyCrmItemPaymentDelivery {
  private readonly Navvy = new Navvy()

  add(param: iBXRestCrmParams) {
    return this.Navvy.simple<iBXRestCrmObject, iBXRestCrmObject, iBXRestCrmParams>([$crm, $item, $payment, $delivery, $add], param)
  }

  delete(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>([$crm, $item, $payment, $delivery, $delete], param)
  }

  list(param: iBXRestCrmParams) {
    return this.Navvy.simple<iBXRestCrmObject[], iBXRestCrmObject[], iBXRestCrmParams>([$crm, $item, $payment, $delivery, $list], param)
  }

  setDelivery(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>([$crm, $item, $payment, $delivery, $setDelivery], param)
  }
}
