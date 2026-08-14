import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $activatephone, $deactivatephone, $get, $user, $voximplant } from '../../consts/part-name-methods'

export class BXRestNavvyVoxImplantUser  {
  private readonly Navvy = new Navvy()

  /**
   * Устанавливает сотруднику признак наличия SIP-аппарата.
   */
  activatephone(param: iBXRestGenericParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestGenericParams>([$voximplant, $user, $activatephone], param)
  }

  /**
   * Снимает с сотрудника признак наличия SIP-аппарата.
   */
  deactivatephone(param: iBXRestGenericParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestGenericParams>([$voximplant, $user, $deactivatephone], param)
  }

  /**
   * Возвращает настройки пользователей телефонии.
   */
  get(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject[],
      iBXRestGenericObject[],
      iBXRestGenericParams
    >([$voximplant, $user, $get], param)
  }
}

