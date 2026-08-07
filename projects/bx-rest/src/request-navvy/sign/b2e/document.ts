import { Navvy } from '../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../typification/rest/common'
import { $b2e, $document, $get, $send, $sign } from '../../../consts/part-name-methods'

export class BXRestNavvySignB2EDocument  {
  private readonly Navvy = new Navvy()

  public get(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sign, $b2e, $document, $get], param)
  }
  public send(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sign, $b2e, $document, $send], param)
  }
}

