import { Navvy } from '../../../../services/navvy'
import { iBXRestCrmObject, iBXRestCrmParams } from '../../../../typification/rest/crm'
import { $add, $crm, $delete, $fields, $get, $getAvailableForPayment, $item, $list, $productrow, $set, $update } from '../../../../consts/part-name-methods'

export class BXRestNavvyCrmItemProductRow {
  private readonly Navvy = new Navvy()

  /**
   * Добавляет товарную позицию.
   */
  add(param: iBXRestCrmParams) {
    return this.Navvy.simple<iBXRestCrmObject, iBXRestCrmObject, iBXRestCrmParams>([$crm, $item, $productrow, $add], param)
  }

  /**
   * Удаляет товарную позицию.
   */
  delete(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>([$crm, $item, $productrow, $delete], param)
  }

  /**
   * Возвращает описание полей товарных позиций.
   */
  fields() {
    return this.Navvy.simple<iBXRestCrmObject, iBXRestCrmObject, iBXRestCrmParams>([$crm, $item, $productrow, $fields], {})
  }

  /**
   * Возвращает информацию о товарной позиции.
   */
  get(param: iBXRestCrmParams) {
    return this.Navvy.simple<iBXRestCrmObject, iBXRestCrmObject, iBXRestCrmParams>([$crm, $item, $productrow, $get], param)
  }

  /**
   * Возвращает товарные позиции без выставленной оплаты.
   */
  getAvailableForPayment(param: iBXRestCrmParams) {
    return this.Navvy.simple<iBXRestCrmObject[], iBXRestCrmObject[], iBXRestCrmParams>([$crm, $item, $productrow, $getAvailableForPayment], param)
  }

  /**
   * Возвращает список товарных позиций.
   */
  list(param: iBXRestCrmParams) {
    return this.Navvy.simple<iBXRestCrmObject[], iBXRestCrmObject[], iBXRestCrmParams>([$crm, $item, $productrow, $list], param)
  }

  /**
   * Сохраняет набор товарных позиций объекта CRM.
   */
  set(param: iBXRestCrmParams) {
    return this.Navvy.simple<iBXRestCrmObject[], iBXRestCrmObject[], iBXRestCrmParams>([$crm, $item, $productrow, $set], param)
  }

  /**
   * Обновляет товарную позицию.
   */
  update(param: iBXRestCrmParams) {
    return this.Navvy.simple<iBXRestCrmObject, iBXRestCrmObject, iBXRestCrmParams>([$crm, $item, $productrow, $update], param)
  }
}
