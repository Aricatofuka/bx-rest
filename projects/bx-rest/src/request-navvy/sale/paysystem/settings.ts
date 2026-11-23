import { Navvy } from '../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../typification/rest/common'
import { iBXRestParamSalePaySystemSettingsGet } from '../../../typification/rest/sale'
import { $get, $paysystem, $sale, $settings, $update } from '../../../consts/part-name-methods'
import { BXRestNavvySalePaySystemSettingsPayment } from './settings/payment'

export class BXRestNavvySalePaySystemSettings  {
  private readonly Navvy = new Navvy()

  /**
   * Настройки оплаты платёжной системы (`sale.paysystem.settings.payment.*`).
   */
  public readonly payment = new BXRestNavvySalePaySystemSettingsPayment()
  /**
   * Возвращает настройки платёжной системы
   * @see https://apidocs.bitrix24.ru/api-reference/pay-system/sale-pay-system-settings-get.html
   */
  public get(param: iBXRestParamSalePaySystemSettingsGet) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestParamSalePaySystemSettingsGet
    >([$sale, $paysystem, $settings, $get], param)
  }
  /**
   * Обновляет настройки платёжной системы
   */
  public update(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $paysystem, $settings, $update], param)
  }
}
