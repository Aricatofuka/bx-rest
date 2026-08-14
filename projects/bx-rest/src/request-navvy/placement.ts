import { Navvy } from '../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../typification/rest/common'
import { $bind, $get, $list, $placement, $unbind } from '../consts/part-name-methods'

export class BXRestNavvyPlacement {
  private readonly Navvy = new Navvy()

  /**
   * Регистрирует обработчик виджета в указанной точке встраивания.
   */
  public bind(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$placement, $bind], param)
  }
  /**
   * Возвращает обработчики, зарегистрированные приложением.
   */
  public get(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$placement, $get], param)
  }
  /**
   * Возвращает точки встраивания, доступные приложению.
   */
  public list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$placement, $list], param)
  }
  /**
   * Удаляет регистрацию обработчика виджета.
   */
  public unbind(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$placement, $unbind], param)
  }
}
