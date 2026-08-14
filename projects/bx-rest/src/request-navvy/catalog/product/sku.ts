import { Navvy } from '../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../typification/rest/common'
import { $add, $catalog, $delete, $download, $get, $getFieldsByFilter, $list, $product, $sku, $update } from '../../../consts/part-name-methods'

export class BXRestNavvyCatalogProductSku  {
  private readonly Navvy = new Navvy()

  /**
   * Добавляет товар с вариациями (SKU).
   */
  public add(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $product, $sku, $add], param)
  }
  /**
   * Удаляет товар с вариациями.
   */
  public delete(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $product, $sku, $delete], param)
  }
  /**
   * Скачивает изображение товара с вариациями.
   */
  public download(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $product, $sku, $download], param)
  }
  /**
   * Возвращает товар с вариациями по идентификатору.
   */
  public get(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $product, $sku, $get], param)
  }
  /**
   * Возвращает описание полей товаров с вариациями с учётом фильтра.
   */
  public getFieldsByFilter(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([
    $catalog, $product, $sku, $getFieldsByFilter
  ], param)
  }
  /**
   * Возвращает список товаров с вариациями.
   */
  public list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $product, $sku, $list], param)
  }
  /**
   * Обновляет товар с вариациями.
   */
  public update(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $product, $sku, $update], param)
  }
}

