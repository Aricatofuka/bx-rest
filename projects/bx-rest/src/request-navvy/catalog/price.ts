import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { iBXRestParamCatalogGet } from '../../typification/rest/catalog'
import { $add, $catalog, $delete, $get, $getFieldsExact, $list, $modify, $price, $update } from '../../consts/part-name-methods'

export class BXRestNavvyCatalogPrice  {
  private readonly Navvy = new Navvy()

  /**
   * Добавляет цену
   */
  public add(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $price, $add], param)
  }
  /**
   * Удаляет цену
   */
  public delete(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $price, $delete], param)
  }
  /**
   * Возвращает цену по идентификатору
   * @see https://apidocs.bitrix24.ru/api-reference/catalog/price/catalog-price-get.html
   */
  public get(param: iBXRestParamCatalogGet) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestParamCatalogGet
    >([$catalog, $price, $get], param)
  }
  /**
   * Возвращает описание полей цены
   */
  public getFields(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $price, $getFieldsExact], param)
  }
  /**
   * Возвращает список цен
   */
  public list(param: iBXRestGenericParams = {}) {
    return this.Navvy.pagNavKeyed<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $price, $list], param, 'prices')
  }
  /**
   * Устанавливает или изменяет цену товара, создавая запись при её отсутствии
   */
  public modify(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $price, $modify], param)
  }
  /**
   * Обновляет цену
   */
  public update(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $price, $update], param)
  }
}
