import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { iBXRestParamCatalogGet } from '../../typification/rest/catalog'
import { $catalog, $get, $getFieldsExact, $list, $storeProduct } from '../../consts/part-name-methods'

export class BXRestNavvyCatalogStoreProduct  {
  private readonly Navvy = new Navvy()

  /**
   * Возвращает остаток товара на складе
   * @see https://apidocs.bitrix24.ru/api-reference/catalog/store-product/catalog-store-product-get.html
   */
  public get(param: iBXRestParamCatalogGet) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestParamCatalogGet
    >([$catalog, $storeProduct, $get], param)
  }
  /**
   * Возвращает описание полей остатка товара на складе
   */
  public getFields(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $storeProduct, $getFieldsExact], param)
  }
  /**
   * Возвращает список остатков товаров на складах
   */
  public list(param: iBXRestGenericParams = {}) {
    return this.Navvy.pagNavKeyed<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $storeProduct, $list], param, 'storeProducts')
  }
}
