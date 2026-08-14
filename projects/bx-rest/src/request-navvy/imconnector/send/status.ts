import { Navvy } from '../../../services/navvy'
import { iBXRestGenericParams } from '../../../typification/rest/common'
import { $delivery, $imconnector, $reading, $send, $status } from '../../../consts/part-name-methods'

export class BXRestNavvyImConnectorSendStatus  {
  private readonly Navvy = new Navvy()

  /**
   * Обновляет статус сообщения на «доставлено».
   */
  delivery(param: iBXRestGenericParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestGenericParams>([$imconnector, $send, $status, $delivery], param)
  }

  /**
   * Обновляет статус сообщения на «прочитано».
   */
  reading(param: iBXRestGenericParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestGenericParams>([$imconnector, $send, $status, $reading], param)
  }
}

