import { Navvy } from '../../../services/navvy'
import { iBXRestCrmObject, iBXRestCrmParams } from '../../../typification/rest/crm'
import { $add, $crm, $delete, $get, $item, $list, $pay, $payment, $unpay, $update } from '../../../consts/part-name-methods'

import { BXRestNavvyCrmItemPaymentDelivery } from './payment/delivery'
import { BXRestNavvyCrmItemPaymentProduct } from './payment/product'

export class BXRestNavvyCrmItemPayment {
  private readonly Navvy = new Navvy()
  public readonly delivery = new BXRestNavvyCrmItemPaymentDelivery()
  public readonly product = new BXRestNavvyCrmItemPaymentProduct()

  add(param: iBXRestCrmParams) {
    return this.Navvy.simple<iBXRestCrmObject, iBXRestCrmObject, iBXRestCrmParams>([$crm, $item, $payment, $add], param)
  }

  delete(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>([$crm, $item, $payment, $delete], param)
  }

  get(param: iBXRestCrmParams) {
    return this.Navvy.simple<iBXRestCrmObject, iBXRestCrmObject, iBXRestCrmParams>([$crm, $item, $payment, $get], param)
  }

  list(param: iBXRestCrmParams) {
    return this.Navvy.simple<iBXRestCrmObject[], iBXRestCrmObject[], iBXRestCrmParams>([$crm, $item, $payment, $list], param)
  }

  pay(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>([$crm, $item, $payment, $pay], param)
  }

  unpay(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>([$crm, $item, $payment, $unpay], param)
  }

  update(param: iBXRestCrmParams) {
    return this.Navvy.simple<iBXRestCrmObject, iBXRestCrmObject, iBXRestCrmParams>([$crm, $item, $payment, $update], param)
  }
}
