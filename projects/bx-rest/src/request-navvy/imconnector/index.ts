import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $activate, $imconnector, $list, $register, $status, $unregister } from '../../consts/part-name-methods'
import { BXRestNavvyImConnectorChat } from './chat'
import { BXRestNavvyImConnectorConnector } from './connector'
import { BXRestNavvyImConnectorDelete } from './delete'
import { BXRestNavvyImConnectorSend } from './send'
import { BXRestNavvyImConnectorUpdate } from './update'

export class BXRestNavvyImConnector  {
  private readonly Navvy = new Navvy()

  public readonly chat = new BXRestNavvyImConnectorChat()
  public readonly connector = new BXRestNavvyImConnectorConnector()
  public readonly delete = new BXRestNavvyImConnectorDelete()
  public readonly send = new BXRestNavvyImConnectorSend()
  public readonly update = new BXRestNavvyImConnectorUpdate()

  activate(param: iBXRestGenericParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestGenericParams>([$imconnector, $activate], param)
  }

  list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject[],
      iBXRestGenericObject[],
      iBXRestGenericParams
    >([$imconnector, $list], param)
  }

  register(param: iBXRestGenericParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestGenericParams>([$imconnector, $register], param)
  }

  status(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imconnector, $status], param)
  }

  unregister(param: iBXRestGenericParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestGenericParams>([$imconnector, $unregister], param)
  }
}

