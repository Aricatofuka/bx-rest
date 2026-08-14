import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $add, $delete, $get, $getFieldsExact, $list, $propertyGroup, $sale, $update } from '../../consts/part-name-methods'

export class BXRestNavvySalePropertyGroup  {
  private readonly Navvy = new Navvy()

  /**
   * Добавляет группу свойств заказа.
   */
  public add(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $propertyGroup, $add], param)
  }
  /**
   * Удаляет группу свойств заказа.
   */
  public delete(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $propertyGroup, $delete], param)
  }
  /**
   * Возвращает группу свойств заказа по идентификатору.
   */
  public get(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $propertyGroup, $get], param)
  }
  /**
   * Возвращает описание полей группы свойств заказа.
   */
  public getFields(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $propertyGroup, $getFieldsExact], param)
  }
  /**
   * Возвращает список групп свойств заказа.
   */
  public list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $propertyGroup, $list], param)
  }
  /**
   * Обновляет группу свойств заказа.
   */
  public update(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $propertyGroup, $update], param)
  }
}

