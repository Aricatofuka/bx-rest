import { Navvy } from '../../../services/navvy'
import { iBXRestCrmObject, iBXRestCrmParams } from '../../../typification/rest/crm'
import { $add, $crm, $delete, $get, $item, $list, $pay, $payment, $unpay, $update } from '../../../consts/part-name-methods'

import { BXRestNavvyCrmItemPaymentDelivery } from './payment/delivery'
import { BXRestNavvyCrmItemPaymentProduct } from './payment/product'

export class BXRestNavvyCrmItemPayment {
  private readonly Navvy = new Navvy()
  /**
   * Позиции доставки в оплате (`crm.item.payment.delivery.*`).
   */
  public readonly delivery = new BXRestNavvyCrmItemPaymentDelivery()
  /**
   * Товарные позиции в оплате (`crm.item.payment.product.*`).
   */
  public readonly product = new BXRestNavvyCrmItemPaymentProduct()

  /**
   * Создаёт оплату для объекта CRM.
   */
  add(param: iBXRestCrmParams) {
    return this.Navvy.simple<iBXRestCrmObject, iBXRestCrmObject, iBXRestCrmParams>([$crm, $item, $payment, $add], param)
  }

  /**
   * Удаляет оплату.
   */
  delete(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>([$crm, $item, $payment, $delete], param)
  }

  /**
   * Возвращает краткую информацию об оплате.
   */
  get(param: iBXRestCrmParams) {
    return this.Navvy.simple<iBXRestCrmObject, iBXRestCrmObject, iBXRestCrmParams>([$crm, $item, $payment, $get], param)
  }

  /**
   * Возвращает список оплат конкретного объекта CRM.
   */
  list(param: iBXRestCrmParams) {
    return this.Navvy.simple<iBXRestCrmObject[], iBXRestCrmObject[], iBXRestCrmParams>([$crm, $item, $payment, $list], param)
  }

  /**
   * Изменяет статус оплаты на «Оплачено».
   */
  pay(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>([$crm, $item, $payment, $pay], param)
  }

  /**
   * Изменяет статус оплаты на «Не оплачено».
   */
  unpay(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>([$crm, $item, $payment, $unpay], param)
  }

  /**
   * Изменяет набор полей оплаты.
   */
  update(param: iBXRestCrmParams) {
    return this.Navvy.simple<iBXRestCrmObject, iBXRestCrmObject, iBXRestCrmParams>([$crm, $item, $payment, $update], param)
  }
}
