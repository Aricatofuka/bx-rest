import { Navvy } from '../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../typification/rest/common'
import {
  iBXRestParamCatalogFieldsByFilter,
  iBXRestParamCatalogGet,
  iBXRestParamCatalogProductList
} from '../../../typification/rest/catalog'
import { $add, $catalog, $delete, $download, $get, $getFieldsByFilter, $list, $product, $sku, $update } from '../../../consts/part-name-methods'

export class BXRestNavvyCatalogProductSku  {
  private readonly Navvy = new Navvy()

  /**
   * Добавляет товар с вариациями (SKU)
   */
  public add(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $product, $sku, $add], param)
  }
  /**
   * Удаляет товар с вариациями
   */
  public delete(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $product, $sku, $delete], param)
  }
  /**
   * Скачивает изображение товара с вариациями
   */
  public download(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $product, $sku, $download], param)
  }
  /**
   * Возвращает товар с вариациями по идентификатору
   * @see https://apidocs.bitrix24.ru/api-reference/catalog/product/sku/catalog-product-sku-get.html
   */
  public get(param: iBXRestParamCatalogGet) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestParamCatalogGet
    >([$catalog, $product, $sku, $get], param)
  }
  /**
   * Возвращает описание полей товаров с вариациями с учётом фильтра
   * @see https://apidocs.bitrix24.ru/api-reference/catalog/product/sku/catalog-product-sku-get-fields-by-filter.html
   */
  public getFieldsByFilter(param: iBXRestParamCatalogFieldsByFilter) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestParamCatalogFieldsByFilter
    >([
    $catalog, $product, $sku, $getFieldsByFilter
  ], param)
  }
  /**
   * Возвращает список товаров с вариациями
   * @see https://apidocs.bitrix24.ru/api-reference/catalog/product/sku/catalog-product-sku-list.html
   */
  public list(param: iBXRestParamCatalogProductList) {
    return this.Navvy.pagNavKeyed<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestParamCatalogProductList
    >([$catalog, $product, $sku, $list], param, 'units')
  }
  /**
   * Обновляет товар с вариациями
   */
  public update(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $product, $sku, $update], param)
  }
}
