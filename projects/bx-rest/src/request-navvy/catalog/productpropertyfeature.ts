import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $add, $catalog, $get, $getAvailableFeaturesByProperty, $getFieldsExact, $list, $productPropertyFeature, $update } from '../../consts/part-name-methods'

export class BXRestNavvyCatalogProductPropertyFeature  {
  private readonly Navvy = new Navvy()

  /**
   * Добавляет параметр свойства товара.
   */
  public add(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $productPropertyFeature, $add], param)
  }
  /**
   * Возвращает параметр свойства товара по идентификатору.
   */
  public get(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $productPropertyFeature, $get], param)
  }
  /**
   * Возвращает доступные параметры для указанного свойства.
   */
  public getAvailableFeaturesByProperty(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([
    $catalog, $productPropertyFeature, $getAvailableFeaturesByProperty
  ], param)
  }
  /**
   * Возвращает описание полей параметра свойства.
   */
  public getFields(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $productPropertyFeature, $getFieldsExact], param)
  }
  /**
   * Возвращает список параметров свойств товаров.
   */
  public list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $productPropertyFeature, $list], param)
  }
  /**
   * Обновляет параметр свойства товара.
   */
  public update(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $productPropertyFeature, $update], param)
  }
}

