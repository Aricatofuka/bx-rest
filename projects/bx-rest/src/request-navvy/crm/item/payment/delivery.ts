import { Navvy } from '../../../../services/navvy'
import { iBXRestCrmObject, iBXRestCrmParams } from '../../../../typification/rest/crm'
import { $add, $crm, $delete, $delivery, $item, $list, $payment, $setDelivery } from '../../../../consts/part-name-methods'

export class BXRestNavvyCrmItemPaymentDelivery {
  private readonly Navvy = new Navvy()

  /**
   * Добавляет позицию доставки в оплату.
   */
  add(param: iBXRestCrmParams) {
    return this.Navvy.simple<iBXRestCrmObject, iBXRestCrmObject, iBXRestCrmParams>([$crm, $item, $payment, $delivery, $add], param)
  }

  /**
   * Удаляет позицию доставки из оплаты.
   */
  delete(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>([$crm, $item, $payment, $delivery, $delete], param)
  }

  /**
   * Возвращает список позиций доставки по оплате.
   */
  list(param: iBXRestCrmParams) {
    return this.Navvy.simple<iBXRestCrmObject[], iBXRestCrmObject[], iBXRestCrmParams>([$crm, $item, $payment, $delivery, $list], param)
  }

  /**
   * Перепривязывает позицию доставки к другому документу.
   */
  setDelivery(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>([$crm, $item, $payment, $delivery, $setDelivery], param)
  }
}
