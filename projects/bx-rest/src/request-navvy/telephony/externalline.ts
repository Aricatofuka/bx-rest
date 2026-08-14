import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $add, $delete, $externalLine, $get, $telephony, $update } from '../../consts/part-name-methods'

export class BXRestNavvyTelephonyExternalLine  {
  private readonly Navvy = new Navvy()

  /**
   * Регистрирует внешнюю линию.
   */
  add(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$telephony, $externalLine, $add], param)
  }

  /**
   * Удаляет внешнюю линию.
   */
  delete(param: iBXRestGenericParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestGenericParams>([$telephony, $externalLine, $delete], param)
  }

  /**
   * Возвращает список внешних линий.
   */
  get(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$telephony, $externalLine, $get], param)
  }

  /**
   * Изменяет внешнюю линию.
   */
  update(param: iBXRestGenericParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestGenericParams>([$telephony, $externalLine, $update], param)
  }
}

