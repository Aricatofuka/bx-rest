import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $add, $catalog, $delete, $get, $getFieldsExact, $list, $productPropertyEnum, $update } from '../../consts/part-name-methods'

export class BXRestNavvyCatalogProductPropertyEnum  {
  private readonly Navvy = new Navvy()

  /**
   * Добавляет значение списочного свойства товара.
   */
  public add(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $productPropertyEnum, $add], param)
  }
  /**
   * Удаляет значение списочного свойства товара.
   */
  public delete(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $productPropertyEnum, $delete], param)
  }
  /**
   * Возвращает значение списочного свойства по идентификатору.
   */
  public get(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $productPropertyEnum, $get], param)
  }
  /**
   * Возвращает описание полей значения списочного свойства.
   */
  public getFields(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $productPropertyEnum, $getFieldsExact], param)
  }
  /**
   * Возвращает список значений списочного свойства.
   */
  public list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $productPropertyEnum, $list], param)
  }
  /**
   * Обновляет значение списочного свойства товара.
   */
  public update(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $productPropertyEnum, $update], param)
  }
}

