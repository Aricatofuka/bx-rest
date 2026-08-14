import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $infocall, $startwithsound, $startwithtext, $voximplant } from '../../consts/part-name-methods'

export class BXRestNavvyVoxImplantInfoCall  {
  private readonly Navvy = new Navvy()

  /**
   * Запускает автозвонок и воспроизводит MP3-файл по URL.
   */
  startwithsound(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$voximplant, $infocall, $startwithsound], param)
  }

  /**
   * Запускает автозвонок с синтезом речи заданного текста.
   */
  startwithtext(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$voximplant, $infocall, $startwithtext], param)
  }
}

