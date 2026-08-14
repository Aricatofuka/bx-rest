import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $add, $catalog, $delete, $get, $getFieldsExact, $getLanguages, $list, $priceTypeLang, $update } from '../../consts/part-name-methods'

export class BXRestNavvyCatalogPriceTypeLang  {
  private readonly Navvy = new Navvy()

  /**
   * Добавляет перевод названия типа цены.
   */
  public add(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $priceTypeLang, $add], param)
  }
  /**
   * Удаляет перевод названия типа цены.
   */
  public delete(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $priceTypeLang, $delete], param)
  }
  /**
   * Возвращает перевод названия типа цены.
   */
  public get(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $priceTypeLang, $get], param)
  }
  /**
   * Возвращает описание полей перевода названия типа цены.
   */
  public getFields(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $priceTypeLang, $getFieldsExact], param)
  }
  /**
   * Возвращает список доступных языков портала.
   */
  public getLanguages(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $priceTypeLang, $getLanguages], param)
  }
  /**
   * Возвращает список переводов названий типов цен.
   */
  public list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $priceTypeLang, $list], param)
  }
  /**
   * Обновляет перевод названия типа цены.
   */
  public update(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $priceTypeLang, $update], param)
  }
}

