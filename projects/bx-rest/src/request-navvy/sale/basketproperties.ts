import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $add, $basketProperties, $delete, $get, $getFieldsExact, $list, $sale, $update } from '../../consts/part-name-methods'

export class BXRestNavvySaleBasketProperties  {
  private readonly Navvy = new Navvy()

  /**
   * Добавляет свойство элемента корзины.
   */
  public add(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $basketProperties, $add], param)
  }
  /**
   * Удаляет свойство элемента корзины.
   */
  public delete(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $basketProperties, $delete], param)
  }
  /**
   * Возвращает свойство элемента корзины по идентификатору.
   */
  public get(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $basketProperties, $get], param)
  }
  /**
   * Возвращает описание полей свойства корзины.
   */
  public getFields(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $basketProperties, $getFieldsExact], param)
  }
  /**
   * Возвращает список свойств элементов корзины.
   */
  public list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $basketProperties, $list], param)
  }
  /**
   * Обновляет свойство элемента корзины.
   */
  public update(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $basketProperties, $update], param)
  }
}

