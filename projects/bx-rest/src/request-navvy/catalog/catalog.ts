import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $add, $catalog, $delete, $get, $getFieldsExact, $isOffers, $list, $update } from '../../consts/part-name-methods'

export class BXRestNavvyCatalogCatalog  {
  private readonly Navvy = new Navvy()

  /**
   * Регистрирует инфоблок как торговый каталог.
   */
  public add(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $catalog, $add], param)
  }
  /**
   * Отменяет регистрацию инфоблока как торгового каталога.
   */
  public delete(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $catalog, $delete], param)
  }
  /**
   * Возвращает параметры торгового каталога.
   */
  public get(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $catalog, $get], param)
  }
  /**
   * Возвращает описание полей торгового каталога.
   */
  public getFields(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $catalog, $getFieldsExact], param)
  }
  /**
   * Проверяет, содержит ли каталог товары-вариации (SKU).
   */
  public isOffers(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $catalog, $isOffers], param)
  }
  /**
   * Возвращает список торговых каталогов.
   */
  public list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $catalog, $list], param)
  }
  /**
   * Обновляет параметры торгового каталога.
   */
  public update(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $catalog, $update], param)
  }
}

