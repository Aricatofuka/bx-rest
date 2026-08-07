import { Navvy } from '../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../typification/rest/common'
import { $File, $download, $im, $upload, $v2 } from '../../../consts/part-name-methods'

export class BXRestNavvyImV2File  {
  private readonly Navvy = new Navvy()

  download(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$im, $v2, $File, $download], param)
  }

  upload(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$im, $v2, $File, $upload], param)
  }
}

