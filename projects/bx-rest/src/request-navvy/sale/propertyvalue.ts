import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $delete, $get, $getFieldsExact, $list, $modify, $propertyValue, $sale } from '../../consts/part-name-methods'

export class BXRestNavvySalePropertyValue  {
  private readonly Navvy = new Navvy()

  /**
   * Удаляет значение свойства заказа.
   */
  public delete(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $propertyValue, $delete], param)
  }
  /**
   * Возвращает значение свойства заказа по идентификатору.
   */
  public get(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $propertyValue, $get], param)
  }
  /**
   * Возвращает описание полей значения свойства заказа.
   */
  public getFields(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $propertyValue, $getFieldsExact], param)
  }
  /**
   * Возвращает список значений свойств заказа.
   */
  public list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $propertyValue, $list], param)
  }
  /**
   * Устанавливает или изменяет значение свойства заказа.
   */
  public modify(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $propertyValue, $modify], param)
  }
}

