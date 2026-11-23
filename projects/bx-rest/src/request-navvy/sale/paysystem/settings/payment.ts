import { Navvy } from '../../../../services/navvy'
import { iBXRestGenericObject } from '../../../../typification/rest/common'
import { iBXRestParamSalePaySystemSettingsPaymentGet } from '../../../../typification/rest/sale'
import { $get, $payment, $paysystem, $sale, $settings } from '../../../../consts/part-name-methods'

export class BXRestNavvySalePaySystemSettingsPayment  {
  private readonly Navvy = new Navvy()

  /**
   * Возвращает настройки оплаты платёжной системы
   * @see https://apidocs.bitrix24.ru/api-reference/pay-system/sale-pay-system-settings-payment-get.html
   */
  public get(param: iBXRestParamSalePaySystemSettingsPaymentGet) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestParamSalePaySystemSettingsPaymentGet
    >([$sale, $paysystem, $settings, $payment, $get], param)
  }
}
