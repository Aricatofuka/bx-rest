import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $attachRecord, $externalCall, $finish, $hide, $register, $searchCrmEntities, $show, $telephony } from '../../consts/part-name-methods'

export class BXRestNavvyTelephonyExternalCall  {
  private readonly Navvy = new Navvy()

  /**
   * Прикрепляет запись звонка.
   */
  attachRecord(param: iBXRestGenericParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestGenericParams>([$telephony, $externalCall, $attachRecord], param)
  }

  /**
   * Завершает звонок.
   */
  finish(param: iBXRestGenericParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestGenericParams>([$telephony, $externalCall, $finish], param)
  }

  /**
   * Скрывает карточку звонка у пользователя.
   */
  hide(param: iBXRestGenericParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestGenericParams>([$telephony, $externalCall, $hide], param)
  }

  /**
   * Регистрирует начало звонка.
   */
  register(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$telephony, $externalCall, $register], param)
  }

  /**
   * Ищет клиентские объекты CRM по номеру телефона.
   */
  searchCrmEntities(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject[],
      iBXRestGenericObject[],
      iBXRestGenericParams
    >([$telephony, $externalCall, $searchCrmEntities], param)
  }

  /**
   * Открывает карточку звонка у пользователя.
   */
  show(param: iBXRestGenericParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestGenericParams>([$telephony, $externalCall, $show], param)
  }
}

