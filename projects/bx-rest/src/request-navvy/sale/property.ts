import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $add, $delete, $get, $getFieldsByType, $list, $property, $sale, $update } from '../../consts/part-name-methods'

export class BXRestNavvySaleProperty  {
  private readonly Navvy = new Navvy()

  /**
   * Добавляет свойство заказа.
   */
  public add(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $property, $add], param)
  }
  /**
   * Удаляет свойство заказа.
   */
  public delete(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $property, $delete], param)
  }
  /**
   * Возвращает свойство заказа по идентификатору.
   */
  public get(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $property, $get], param)
  }
  /**
   * Возвращает описание полей свойства заказа для указанного типа.
   */
  public getFieldsByType(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $property, $getFieldsByType], param)
  }
  /**
   * Возвращает список свойств заказа.
   */
  public list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $property, $list], param)
  }
  /**
   * Обновляет свойство заказа.
   */
  public update(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $property, $update], param)
  }
}

