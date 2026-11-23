import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import {
  iBXRestParamCatalogGet,
  iBXRestParamCatalogProductImageList
} from '../../typification/rest/catalog'
import { $add, $catalog, $delete, $get, $getFieldsExact, $list, $productImage } from '../../consts/part-name-methods'

export class BXRestNavvyCatalogProductImage  {
  private readonly Navvy = new Navvy()

  /**
   * Добавляет изображение товара
   */
  public add(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $productImage, $add], param)
  }
  /**
   * Удаляет изображение товара
   */
  public delete(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $productImage, $delete], param)
  }
  /**
   * Возвращает изображение товара по идентификатору
   * @see https://apidocs.bitrix24.ru/api-reference/catalog/product-image/catalog-product-image-get.html
   */
  public get(param: iBXRestParamCatalogGet) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestParamCatalogGet
    >([$catalog, $productImage, $get], param)
  }
  /**
   * Возвращает описание полей изображения товара
   */
  public getFields(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $productImage, $getFieldsExact], param)
  }
  /**
   * Возвращает список изображений товара
   * @see https://apidocs.bitrix24.ru/api-reference/catalog/product-image/catalog-product-image-list.html
   */
  public list(param: iBXRestParamCatalogProductImageList) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestParamCatalogProductImageList
    >([$catalog, $productImage, $list], param)
  }
}
