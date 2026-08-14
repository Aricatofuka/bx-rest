import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $add, $deleteByFilter, $getFieldsExact, $list, $propertyRelation, $sale } from '../../consts/part-name-methods'

export class BXRestNavvySalePropertyRelation  {
  private readonly Navvy = new Navvy()

  /**
   * Добавляет привязку свойства заказа.
   */
  public add(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $propertyRelation, $add], param)
  }
  /**
   * Удаляет привязки свойства заказа по фильтру.
   */
  public deleteByFilter(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $propertyRelation, $deleteByFilter], param)
  }
  /**
   * Возвращает описание полей привязки свойства заказа.
   */
  public getFields(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $propertyRelation, $getFieldsExact], param)
  }
  /**
   * Возвращает список привязок свойств заказа.
   */
  public list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $propertyRelation, $list], param)
  }
}

