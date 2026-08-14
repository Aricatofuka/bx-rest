import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $catalog, $get, $getFieldsExact, $list, $ratio } from '../../consts/part-name-methods'

export class BXRestNavvyCatalogRatio  {
  private readonly Navvy = new Navvy()

  /**
   * Возвращает коэффициент единицы измерения по идентификатору.
   */
  public get(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $ratio, $get], param)
  }
  /**
   * Возвращает описание полей коэффициента единицы измерения.
   */
  public getFields(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $ratio, $getFieldsExact], param)
  }
  /**
   * Возвращает список коэффициентов единиц измерения.
   */
  public list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $ratio, $list], param)
  }
}

