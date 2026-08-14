import { Navvy } from '../../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../../typification/rest/common'
import { $bot, $imopenlines, $message, $send, $session } from '../../../../consts/part-name-methods'

export class BXRestNavvyImOpenLinesBotSessionMessage  {
  private readonly Navvy = new Navvy()

  /**
   * Отправляет автоматическое сообщение в диалог.
   */
  send(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imopenlines, $bot, $session, $message, $send], param)
  }
}

