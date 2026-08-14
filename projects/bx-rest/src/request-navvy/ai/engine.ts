import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $ai, $engine, $list, $register, $unregister } from '../../consts/part-name-methods'

export class BXRestNavvyAiEngine {
  private readonly Navvy = new Navvy()

  /**
   * Возвращает список зарегистрированных AI-сервисов.
   */
  list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject[],
      iBXRestGenericObject[],
      iBXRestGenericParams
    >([$ai, $engine, $list], param)
  }

  /**
   * Регистрирует пользовательский AI-сервис.
   */
  register(param: iBXRestGenericParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestGenericParams>(
      [$ai, $engine, $register], param
    )
  }

  /**
   * Удаляет зарегистрированный AI-сервис.
   */
  unregister(param: iBXRestGenericParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestGenericParams>(
      [$ai, $engine, $unregister], param
    )
  }
}

