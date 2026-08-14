import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $getLandingRef, $getList, $getSiteRef, $landing, $setLandingRef, $setSiteRef, $template } from '../../consts/part-name-methods'

export class BXRestNavvyLandingTemplate  {
  private readonly Navvy = new Navvy()

  /**
   * Возвращает включаемые области для страницы.
   */
  public getLandingRef(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $template, $getLandingRef], param)
  }
  /**
   * Возвращает список шаблонов представления.
   */
  public getList(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $template, $getList], param)
  }
  /**
   * Возвращает включаемые области для сайта.
   */
  public getSiteRef(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $template, $getSiteRef], param)
  }
  /**
   * Устанавливает включаемые области для страницы.
   */
  public setLandingRef(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $template, $setLandingRef], param)
  }
  /**
   * Устанавливает включаемые области для сайта.
   */
  public setSiteRef(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $template, $setSiteRef], param)
  }
}

