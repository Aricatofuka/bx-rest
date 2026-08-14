import { Navvy } from '../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../typification/rest/common'
import { $Command, $answer, $imbot, $list, $register, $unregister, $update, $v2 } from '../../../consts/part-name-methods'

export class BXRestNavvyImBotV2Command  {
  private readonly Navvy = new Navvy()

  /**
   * Отвечает на вызов слэш-команды.
   */
  answer(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imbot, $v2, $Command, $answer], param)
  }

  /**
   * Возвращает список команд бота.
   */
  list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imbot, $v2, $Command, $list], param)
  }

  /**
   * Регистрирует слэш-команду.
   */
  register(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imbot, $v2, $Command, $register], param)
  }

  /**
   * Удаляет слэш-команду.
   */
  unregister(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imbot, $v2, $Command, $unregister], param)
  }

  /**
   * Обновляет слэш-команду.
   */
  update(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imbot, $v2, $Command, $update], param)
  }
}

