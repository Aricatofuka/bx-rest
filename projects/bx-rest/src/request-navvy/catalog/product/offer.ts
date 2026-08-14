import { Navvy } from '../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../typification/rest/common'
import { $add, $catalog, $delete, $download, $get, $getFieldsByFilter, $list, $offer, $product, $update } from '../../../consts/part-name-methods'

export class BXRestNavvyCatalogProductOffer  {
  private readonly Navvy = new Navvy()

  /**
   * Добавляет товар-вариацию (торговое предложение).
   */
  public add(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $product, $offer, $add], param)
  }
  /**
   * Удаляет товар-вариацию.
   */
  public delete(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $product, $offer, $delete], param)
  }
  /**
   * Скачивает изображение товара-вариации.
   */
  public download(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $product, $offer, $download], param)
  }
  /**
   * Возвращает товар-вариацию по идентификатору.
   */
  public get(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $product, $offer, $get], param)
  }
  /**
   * Возвращает описание полей товаров-вариаций с учётом фильтра.
   */
  public getFieldsByFilter(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([
    $catalog, $product, $offer, $getFieldsByFilter
  ], param)
  }
  /**
   * Возвращает список товаров-вариаций.
   */
  public list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $product, $offer, $list], param)
  }
  /**
   * Обновляет товар-вариацию.
   */
  public update(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $product, $offer, $update], param)
  }
}

