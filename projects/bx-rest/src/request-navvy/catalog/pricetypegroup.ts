import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $add, $catalog, $delete, $getFieldsExact, $list, $priceTypeGroup } from '../../consts/part-name-methods'

export class BXRestNavvyCatalogPriceTypeGroup  {
  private readonly Navvy = new Navvy()

  /**
   * Привязывает тип цены к группе покупателей.
   */
  public add(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $priceTypeGroup, $add], param)
  }
  /**
   * Удаляет привязку типа цены к группе покупателей.
   */
  public delete(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $priceTypeGroup, $delete], param)
  }
  /**
   * Возвращает описание полей привязки типа цены к группе.
   */
  public getFields(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $priceTypeGroup, $getFieldsExact], param)
  }
  /**
   * Возвращает список привязок типов цен к группам покупателей.
   */
  public list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $priceTypeGroup, $list], param)
  }
}

