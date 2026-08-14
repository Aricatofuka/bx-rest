import { Navvy } from '../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../typification/rest/common'
import { $Bot, $get, $imbot, $list, $register, $unregister, $update, $v2 } from '../../../consts/part-name-methods'

export class BXRestNavvyImBotV2Bot  {
  private readonly Navvy = new Navvy()

  /**
   * Возвращает информацию о боте.
   */
  get(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imbot, $v2, $Bot, $get], param)
  }

  /**
   * Возвращает список ботов приложения.
   */
  list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imbot, $v2, $Bot, $list], param)
  }

  /**
   * Регистрирует нового бота.
   */
  register(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imbot, $v2, $Bot, $register], param)
  }

  /**
   * Удаляет бота.
   */
  unregister(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imbot, $v2, $Bot, $unregister], param)
  }

  /**
   * Обновляет свойства бота.
   */
  update(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imbot, $v2, $Bot, $update], param)
  }
}

