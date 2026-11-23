import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import {
  iBXRestParamCatalogFieldsByFilter,
  iBXRestParamCatalogGet,
  iBXRestParamCatalogProductList
} from '../../typification/rest/catalog'
import { $add, $catalog, $delete, $download, $get, $getFieldsByFilter, $list, $product, $update } from '../../consts/part-name-methods'
import { BXRestNavvyCatalogProductOffer } from './product/offer'
import { BXRestNavvyCatalogProductService } from './product/service'
import { BXRestNavvyCatalogProductSku } from './product/sku'

export class BXRestNavvyCatalogProduct  {
  private readonly Navvy = new Navvy()

  /**
   * Товары-вариации, торговые предложения (`catalog.product.offer.*`).
   */
  public readonly offer = new BXRestNavvyCatalogProductOffer()
  /**
   * Услуги (`catalog.product.service.*`).
   */
  public readonly service = new BXRestNavvyCatalogProductService()
  /**
   * Товары с вариациями, SKU (`catalog.product.sku.*`).
   */
  public readonly sku = new BXRestNavvyCatalogProductSku()
  /**
   * Добавляет товар
   */
  public add(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $product, $add], param)
  }
  /**
   * Удаляет товар
   */
  public delete(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $product, $delete], param)
  }
  /**
   * Скачивает изображение товара
   */
  public download(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $product, $download], param)
  }
  /**
   * Возвращает товар по идентификатору
   * @see https://apidocs.bitrix24.ru/api-reference/catalog/product/catalog-product-get.html
   */
  public get(param: iBXRestParamCatalogGet) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestParamCatalogGet
    >([$catalog, $product, $get], param)
  }
  /**
   * Возвращает описание полей товаров с учётом фильтра
   * @see https://apidocs.bitrix24.ru/api-reference/catalog/product/catalog-product-get-fields-by-filter.html
   */
  public getFieldsByFilter(param: iBXRestParamCatalogFieldsByFilter) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestParamCatalogFieldsByFilter
    >([$catalog, $product, $getFieldsByFilter], param)
  }
  /**
   * Возвращает список товаров
   * @see https://apidocs.bitrix24.ru/api-reference/catalog/product/catalog-product-list.html
   */
  public list(param: iBXRestParamCatalogProductList) {
    return this.Navvy.pagNavKeyed<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestParamCatalogProductList
    >([$catalog, $product, $list], param, 'products')
  }
  /**
   * Обновляет товар
   */
  public update(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $product, $update], param)
  }
}
