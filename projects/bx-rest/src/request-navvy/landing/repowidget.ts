import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $debug, $getlist, $landing, $register, $repowidget, $unregister } from '../../consts/part-name-methods'

export class BXRestNavvyLandingRepoWidget  {
  private readonly Navvy = new Navvy()

  /**
   * Включает режим отладки виджета.
   */
  public debug(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $repowidget, $debug], param)
  }
  /**
   * Возвращает список виджетов.
   */
  public getList(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $repowidget, $getlist], param)
  }
  /**
   * Добавляет виджет на стартовую страницу.
   */
  public register(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $repowidget, $register], param)
  }
  /**
   * Удаляет виджет.
   */
  public unregister(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $repowidget, $unregister], param)
  }
}

