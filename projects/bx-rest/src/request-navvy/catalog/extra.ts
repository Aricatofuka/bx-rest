import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $catalog, $extra, $get, $getFieldsExact, $list } from '../../consts/part-name-methods'

export class BXRestNavvyCatalogExtra  {
  private readonly Navvy = new Navvy()

  /**
   * Возвращает наценку по идентификатору.
   */
  public get(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $extra, $get], param)
  }
  /**
   * Возвращает описание полей наценки.
   */
  public getFields(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $extra, $getFieldsExact], param)
  }
  /**
   * Возвращает список наценок.
   */
  public list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $extra, $list], param)
  }
}

