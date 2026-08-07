import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $imconnector, $messages, $send } from '../../consts/part-name-methods'
import { BXRestNavvyImConnectorSendStatus } from './send/status'

export class BXRestNavvyImConnectorSend  {
  private readonly Navvy = new Navvy()

  public readonly status = new BXRestNavvyImConnectorSendStatus()

  messages(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imconnector, $send, $messages], param)
  }
}

