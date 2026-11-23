import { Navvy } from '../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../typification/rest/common'
import {
  iBXRestParamCatalogFieldsByFilter,
  iBXRestParamCatalogGet,
  iBXRestParamCatalogProductList
} from '../../../typification/rest/catalog'
import { $add, $catalog, $delete, $download, $get, $getFieldsByFilter, $list, $offer, $product, $update } from '../../../consts/part-name-methods'

export class BXRestNavvyCatalogProductOffer  {
  private readonly Navvy = new Navvy()

  /**
   * Добавляет товар-вариацию (торговое предложение)
   */
  public add(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $product, $offer, $add], param)
  }
  /**
   * Удаляет товар-вариацию
   */
  public delete(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $product, $offer, $delete], param)
  }
  /**
   * Скачивает изображение товара-вариации
   */
  public download(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $product, $offer, $download], param)
  }
  /**
   * Возвращает товар-вариацию по идентификатору
   * @see https://apidocs.bitrix24.ru/api-reference/catalog/product/offer/catalog-product-offer-get.html
   */
  public get(param: iBXRestParamCatalogGet) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestParamCatalogGet
    >([$catalog, $product, $offer, $get], param)
  }
  /**
   * Возвращает описание полей товаров-вариаций с учётом фильтра
   * @see https://apidocs.bitrix24.ru/api-reference/catalog/product/offer/catalog-product-offer-get-fields-by-filter.html
   */
  public getFieldsByFilter(param: iBXRestParamCatalogFieldsByFilter) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestParamCatalogFieldsByFilter
    >([
    $catalog, $product, $offer, $getFieldsByFilter
  ], param)
  }
  /**
   * Возвращает список товаров-вариаций
   * @see https://apidocs.bitrix24.ru/api-reference/catalog/product/offer/catalog-product-offer-list.html
   */
  public list(param: iBXRestParamCatalogProductList) {
    return this.Navvy.pagNavKeyed<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestParamCatalogProductList
    >([$catalog, $product, $offer, $list], param, 'offers')
  }
  /**
   * Обновляет товар-вариацию
   */
  public update(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $product, $offer, $update], param)
  }
}
