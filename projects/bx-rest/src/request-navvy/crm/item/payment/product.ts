import { Navvy } from '../../../../services/navvy'
import {
  iBXRestCrmObject,
  iBXRestCrmParams,
  iBXRestParamCrmPaymentId
} from '../../../../typification/rest/crm'
import { $add, $crm, $delete, $item, $list, $payment, $product, $setQuantity } from '../../../../consts/part-name-methods'

export class BXRestNavvyCrmItemPaymentProduct {
  private readonly Navvy = new Navvy()

  /**
   * Добавляет товарную позицию в оплату
   */
  add(param: iBXRestCrmParams) {
    return this.Navvy.simple<iBXRestCrmObject, iBXRestCrmObject, iBXRestCrmParams>([$crm, $item, $payment, $product, $add], param)
  }

  /**
   * Удаляет товарную позицию из оплаты
   */
  delete(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>([$crm, $item, $payment, $product, $delete], param)
  }

  /**
   * Возвращает список товарных позиций в оплате
   * @see https://apidocs.bitrix24.ru/api-reference/crm/universal/payment/products-in-payment/crm-item-payment-product-list.html
   */
  list(param: iBXRestParamCrmPaymentId) {
    return this.Navvy.simple<
      iBXRestCrmObject[],
      iBXRestCrmObject[],
      iBXRestParamCrmPaymentId
    >([$crm, $item, $payment, $product, $list], param)
  }

  /**
   * Изменяет количество товара в товарной позиции оплаты
   */
  setQuantity(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>([$crm, $item, $payment, $product, $setQuantity], param)
  }
}
