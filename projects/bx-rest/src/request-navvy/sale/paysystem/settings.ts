import { Navvy } from '../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../typification/rest/common'
import { $get, $paysystem, $sale, $settings, $update } from '../../../consts/part-name-methods'
import { BXRestNavvySalePaySystemSettingsPayment } from './settings/payment'

export class BXRestNavvySalePaySystemSettings  {
  private readonly Navvy = new Navvy()

  /**
   * Настройки оплаты платёжной системы (`sale.paysystem.settings.payment.*`).
   */
  public readonly payment = new BXRestNavvySalePaySystemSettingsPayment()
  /**
   * Возвращает настройки платёжной системы.
   */
  public get(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $paysystem, $settings, $get], param)
  }
  /**
   * Обновляет настройки платёжной системы.
   */
  public update(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $paysystem, $settings, $update], param)
  }
}

