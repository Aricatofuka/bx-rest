import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
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
   * Добавляет товар.
   */
  public add(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $product, $add], param)
  }
  /**
   * Удаляет товар.
   */
  public delete(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $product, $delete], param)
  }
  /**
   * Скачивает изображение товара.
   */
  public download(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $product, $download], param)
  }
  /**
   * Возвращает товар по идентификатору.
   */
  public get(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $product, $get], param)
  }
  /**
   * Возвращает описание полей товаров с учётом фильтра.
   */
  public getFieldsByFilter(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $product, $getFieldsByFilter], param)
  }
  /**
   * Возвращает список товаров.
   */
  public list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $product, $list], param)
  }
  /**
   * Обновляет товар.
   */
  public update(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $product, $update], param)
  }
}

