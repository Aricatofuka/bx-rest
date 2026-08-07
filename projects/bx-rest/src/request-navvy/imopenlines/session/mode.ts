import { Navvy } from '../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../typification/rest/common'
import { $imopenlines, $mode, $pin, $pinAll, $session, $silent, $unpinAll } from '../../../consts/part-name-methods'

export class BXRestNavvyImOpenLinesSessionMode  {
  private readonly Navvy = new Navvy()

  pin(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imopenlines, $session, $mode, $pin], param)
  }

  pinAll(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imopenlines, $session, $mode, $pinAll], param)
  }

  silent(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imopenlines, $session, $mode, $silent], param)
  }

  unpinAll(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imopenlines, $session, $mode, $unpinAll], param)
  }
}

