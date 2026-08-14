import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $demos, $getList, $getPageList, $getSiteList, $landing, $register, $unregister } from '../../consts/part-name-methods'

export class BXRestNavvyLandingDemos  {
  private readonly Navvy = new Navvy()

  /**
   * Возвращает список зарегистрированных шаблонов.
   */
  public getList(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $demos, $getList], param)
  }
  /**
   * Возвращает список шаблонов для создания страниц.
   */
  public getPageList(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $demos, $getPageList], param)
  }
  /**
   * Возвращает список шаблонов для создания сайтов.
   */
  public getSiteList(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $demos, $getSiteList], param)
  }
  /**
   * Регистрирует шаблон в мастере создания сайта и страницы.
   */
  public register(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $demos, $register], param)
  }
  /**
   * Удаляет зарегистрированный пользовательский шаблон.
   */
  public unregister(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $demos, $unregister], param)
  }
}

