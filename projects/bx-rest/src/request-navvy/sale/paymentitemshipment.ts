import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $add, $delete, $get, $getFieldsExact, $list, $paymentItemShipment, $sale, $update } from '../../consts/part-name-methods'

export class BXRestNavvySalePaymentItemShipment  {
  private readonly Navvy = new Navvy()

  /**
   * Привязывает оплату к отгрузке.
   */
  public add(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $paymentItemShipment, $add], param)
  }
  /**
   * Удаляет привязку оплаты к отгрузке.
   */
  public delete(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $paymentItemShipment, $delete], param)
  }
  /**
   * Возвращает привязку оплаты к отгрузке.
   */
  public get(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $paymentItemShipment, $get], param)
  }
  /**
   * Возвращает описание полей привязки оплаты к отгрузке.
   */
  public getFields(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $paymentItemShipment, $getFieldsExact], param)
  }
  /**
   * Возвращает список привязок оплат к отгрузкам.
   */
  public list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $paymentItemShipment, $list], param)
  }
  /**
   * Обновляет привязку оплаты к отгрузке.
   */
  public update(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $paymentItemShipment, $update], param)
  }
}

