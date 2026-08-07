import { Navvy } from '../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../typification/rest/common'
import { $get, $tts, $voices, $voximplant } from '../../../consts/part-name-methods'

export class BXRestNavvyVoxImplantTtsVoices  {
  private readonly Navvy = new Navvy()

  get(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject[],
      iBXRestGenericObject[],
      iBXRestGenericParams
    >([$voximplant, $tts, $voices, $get], param)
  }
}

