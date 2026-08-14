import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $add, $delete, $get, $sip, $status, $update, $voximplant } from '../../consts/part-name-methods'
import { BXRestNavvyVoxImplantSipConnector } from './sip/connector'

export class BXRestNavvyVoxImplantSip  {
  private readonly Navvy = new Navvy()

  /**
   * Статус SIP-коннектора (`voximplant.sip.connector.*`).
   */
  public readonly connector = new BXRestNavvyVoxImplantSipConnector()

  /**
   * Создаёт SIP-подключение с привязкой к приложению.
   */
  add(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$voximplant, $sip, $add], param)
  }

  /**
   * Удаляет существующее SIP-подключение.
   */
  delete(param: iBXRestGenericParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestGenericParams>([$voximplant, $sip, $delete], param)
  }

  /**
   * Возвращает список SIP-подключений, созданных приложением.
   */
  get(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$voximplant, $sip, $get], param)
  }

  /**
   * Возвращает статус SIP-регистрации для облачной АТС.
   */
  status(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$voximplant, $sip, $status], param)
  }

  /**
   * Обновляет существующее SIP-подключение.
   */
  update(param: iBXRestGenericParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestGenericParams>([$voximplant, $sip, $update], param)
  }
}

