import { Navvy } from '../../../../services/navvy'
import {
  iBXRestCrmObject,
  iBXRestCrmParams,
  iBXRestParamCrmItemProductRowGet,
  iBXRestParamCrmItemProductRowList
} from '../../../../typification/rest/crm'
import { $add, $crm, $delete, $fields, $get, $getAvailableForPayment, $item, $list, $productrow, $set, $update } from '../../../../consts/part-name-methods'

export class BXRestNavvyCrmItemProductRow {
  private readonly Navvy = new Navvy()

  /**
   * Добавляет товарную позицию
   */
  add(param: iBXRestCrmParams) {
    return this.Navvy.simple<iBXRestCrmObject, iBXRestCrmObject, iBXRestCrmParams>([$crm, $item, $productrow, $add], param)
  }

  /**
   * Удаляет товарную позицию
   */
  delete(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>([$crm, $item, $productrow, $delete], param)
  }

  /**
   * Возвращает описание полей товарных позиций
   */
  fields() {
    return this.Navvy.simple<iBXRestCrmObject, iBXRestCrmObject, iBXRestCrmParams>([$crm, $item, $productrow, $fields], {})
  }

  /**
   * Возвращает информацию о товарной позиции
   * @see https://apidocs.bitrix24.ru/api-reference/crm/universal/product-rows/crm-item-productrow-get.html
   */
  get(param: iBXRestParamCrmItemProductRowGet) {
    return this.Navvy.simple<
      iBXRestCrmObject,
      iBXRestCrmObject,
      iBXRestParamCrmItemProductRowGet
    >([$crm, $item, $productrow, $get], param)
  }

  /**
   * Возвращает товарные позиции без выставленной оплаты
   */
  getAvailableForPayment(param: iBXRestCrmParams) {
    return this.Navvy.simple<iBXRestCrmObject[], iBXRestCrmObject[], iBXRestCrmParams>([$crm, $item, $productrow, $getAvailableForPayment], param)
  }

  /**
   * Возвращает список товарных позиций
   * @see https://apidocs.bitrix24.ru/api-reference/crm/universal/product-rows/crm-item-productrow-list.html
   */
  list(param: iBXRestParamCrmItemProductRowList) {
    return this.Navvy.pagNavKeyed<
      { productRows?: iBXRestCrmObject[] },
      { productRows?: iBXRestCrmObject[] },
      iBXRestParamCrmItemProductRowList
    >([$crm, $item, $productrow, $list], param, 'productRows')
  }

  /**
   * Сохраняет набор товарных позиций объекта CRM
   */
  set(param: iBXRestCrmParams) {
    return this.Navvy.simple<iBXRestCrmObject[], iBXRestCrmObject[], iBXRestCrmParams>([$crm, $item, $productrow, $set], param)
  }

  /**
   * Обновляет товарную позицию
   */
  update(param: iBXRestCrmParams) {
    return this.Navvy.simple<iBXRestCrmObject, iBXRestCrmObject, iBXRestCrmParams>([$crm, $item, $productrow, $update], param)
  }
}
