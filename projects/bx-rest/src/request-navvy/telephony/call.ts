import { Navvy } from '../../services/navvy'
import { iBXRestGenericParams } from '../../typification/rest/common'
import { $attachTranscription, $call, $telephony } from '../../consts/part-name-methods'

export class BXRestNavvyTelephonyCall  {
  private readonly Navvy = new Navvy()

  /**
   * Добавляет расшифровку записи к звонку.
   */
  attachTranscription(param: iBXRestGenericParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestGenericParams>([$telephony, $call, $attachTranscription], param)
  }
}

