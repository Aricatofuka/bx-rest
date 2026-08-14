import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $add, $delete, $get, $getFieldsExact, $list, $paymentItemBasket, $sale, $update } from '../../consts/part-name-methods'

export class BXRestNavvySalePaymentItemBasket  {
  private readonly Navvy = new Navvy()

  /**
   * Привязывает элемент корзины к оплате.
   */
  public add(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $paymentItemBasket, $add], param)
  }
  /**
   * Удаляет привязку элемента корзины к оплате.
   */
  public delete(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $paymentItemBasket, $delete], param)
  }
  /**
   * Возвращает привязку элемента корзины к оплате.
   */
  public get(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $paymentItemBasket, $get], param)
  }
  /**
   * Возвращает описание полей привязки элемента корзины к оплате.
   */
  public getFields(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $paymentItemBasket, $getFieldsExact], param)
  }
  /**
   * Возвращает список привязок элементов корзины к оплатам.
   */
  public list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $paymentItemBasket, $list], param)
  }
  /**
   * Обновляет привязку элемента корзины к оплате.
   */
  public update(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $paymentItemBasket, $update], param)
  }
}

