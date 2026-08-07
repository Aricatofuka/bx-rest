import { Navvy } from '../../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../../typification/rest/common'
import { $Bot, $Chat, $im, $sendContext, $v2 } from '../../../../consts/part-name-methods'

export class BXRestNavvyImV2ChatBot  {
  private readonly Navvy = new Navvy()

  sendContext(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$im, $v2, $Chat, $Bot, $sendContext], param)
  }
}

