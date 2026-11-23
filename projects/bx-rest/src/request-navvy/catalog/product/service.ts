import { Navvy } from '../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../typification/rest/common'
import {
  iBXRestParamCatalogFieldsByFilter,
  iBXRestParamCatalogGet,
  iBXRestParamCatalogProductList
} from '../../../typification/rest/catalog'
import { $add, $catalog, $delete, $download, $get, $getFieldsByFilter, $list, $product, $service, $update } from '../../../consts/part-name-methods'

export class BXRestNavvyCatalogProductService  {
  private readonly Navvy = new Navvy()

  /**
   * Добавляет услугу
   */
  public add(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $product, $service, $add], param)
  }
  /**
   * Удаляет услугу
   */
  public delete(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $product, $service, $delete], param)
  }
  /**
   * Скачивает изображение услуги
   */
  public download(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $product, $service, $download], param)
  }
  /**
   * Возвращает услугу по идентификатору
   * @see https://apidocs.bitrix24.ru/api-reference/catalog/product/service/catalog-product-service-get.html
   */
  public get(param: iBXRestParamCatalogGet) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestParamCatalogGet
    >([$catalog, $product, $service, $get], param)
  }
  /**
   * Возвращает описание полей услуг с учётом фильтра
   * @see https://apidocs.bitrix24.ru/api-reference/catalog/product/service/catalog-product-service-get-fields-by-filter.html
   */
  public getFieldsByFilter(param: iBXRestParamCatalogFieldsByFilter) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestParamCatalogFieldsByFilter
    >([
    $catalog, $product, $service, $getFieldsByFilter
  ], param)
  }
  /**
   * Возвращает список услуг
   * @see https://apidocs.bitrix24.ru/api-reference/catalog/product/service/catalog-product-service-list.html
   */
  public list(param: iBXRestParamCatalogProductList) {
    return this.Navvy.pagNavKeyed<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestParamCatalogProductList
    >([$catalog, $product, $service, $list], param, 'services')
  }
  /**
   * Обновляет услугу
   */
  public update(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $product, $service, $update], param)
  }
}
