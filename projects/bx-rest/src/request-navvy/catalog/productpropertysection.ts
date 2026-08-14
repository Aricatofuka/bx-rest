import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $catalog, $get, $list, $productPropertySection, $set } from '../../consts/part-name-methods'

export class BXRestNavvyCatalogProductPropertySection  {
  private readonly Navvy = new Navvy()

  /**
   * Возвращает секционные настройки свойства.
   */
  public get(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $productPropertySection, $get], param)
  }
  /**
   * Возвращает список секционных настроек свойств.
   */
  public list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $productPropertySection, $list], param)
  }
  /**
   * Устанавливает секционные настройки свойства.
   */
  public set(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $productPropertySection, $set], param)
  }
}

