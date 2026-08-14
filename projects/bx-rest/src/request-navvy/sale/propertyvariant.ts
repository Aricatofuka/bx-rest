import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $add, $delete, $get, $getFieldsExact, $list, $propertyVariant, $sale, $update } from '../../consts/part-name-methods'

export class BXRestNavvySalePropertyVariant  {
  private readonly Navvy = new Navvy()

  /**
   * Добавляет значение списочного свойства заказа.
   */
  public add(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $propertyVariant, $add], param)
  }
  /**
   * Удаляет значение списочного свойства заказа.
   */
  public delete(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $propertyVariant, $delete], param)
  }
  /**
   * Возвращает значение списочного свойства заказа по идентификатору.
   */
  public get(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $propertyVariant, $get], param)
  }
  /**
   * Возвращает описание полей значения списочного свойства заказа.
   */
  public getFields(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $propertyVariant, $getFieldsExact], param)
  }
  /**
   * Возвращает список значений списочного свойства заказа.
   */
  public list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $propertyVariant, $list], param)
  }
  /**
   * Обновляет значение списочного свойства заказа.
   */
  public update(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $propertyVariant, $update], param)
  }
}

