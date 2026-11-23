import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { iBXRestParamLandingSysPageGet } from '../../typification/rest/landing'
import { $deleteForLanding, $deleteForSite, $get, $getSpecialPage, $landing, $set, $syspage } from '../../consts/part-name-methods'

export class BXRestNavvyLandingSysPage  {
  private readonly Navvy = new Navvy()

  /**
   * Снимает признак специальной страницы со страницы
   */
  public deleteForLanding(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $syspage, $deleteForLanding], param)
  }
  /**
   * Снимает признак специальной страницы с сайта
   */
  public deleteForSite(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $syspage, $deleteForSite], param)
  }
  /**
   * Возвращает специальные страницы сайта
   * @see https://apidocs.bitrix24.ru/api-reference/landing/page/special-pages/landing-syspage-get.html
   */
  public get(param: iBXRestParamLandingSysPageGet) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestParamLandingSysPageGet
    >([$landing, $syspage, $get], param)
  }
  /**
   * Возвращает специальную страницу по коду
   */
  public getSpecialPage(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $syspage, $getSpecialPage], param)
  }
  /**
   * Назначает страницу специальной
   */
  public set(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $syspage, $set], param)
  }
}
