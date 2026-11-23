import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { iBXRestParamCatalogProductPropertySectionGet } from '../../typification/rest/catalog'
import { $catalog, $get, $list, $productPropertySection, $set } from '../../consts/part-name-methods'

export class BXRestNavvyCatalogProductPropertySection  {
  private readonly Navvy = new Navvy()

  /**
   * Возвращает секционные настройки свойства
   * @see https://apidocs.bitrix24.ru/api-reference/catalog/product-property-section/catalog-product-property-section-get.html
   */
  public get(param: iBXRestParamCatalogProductPropertySectionGet) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestParamCatalogProductPropertySectionGet
    >([$catalog, $productPropertySection, $get], param)
  }
  /**
   * Возвращает список секционных настроек свойств
   */
  public list(param: iBXRestGenericParams = {}) {
    return this.Navvy.pagNavKeyed<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $productPropertySection, $list], param, 'productPropertySections')
  }
  /**
   * Устанавливает секционные настройки свойства
   */
  public set(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $productPropertySection, $set], param)
  }
}
