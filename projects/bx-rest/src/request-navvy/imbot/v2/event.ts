import { Navvy } from '../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../typification/rest/common'
import { iBXRestParamImBotEventGet } from '../../../typification/rest/imbot'
import { $Event, $get, $imbot, $v2 } from '../../../consts/part-name-methods'

export class BXRestNavvyImBotV2Event  {
  private readonly Navvy = new Navvy()

  /**
   * Возвращает события бота в режиме polling
   * @see https://apidocs.bitrix24.ru/api-reference/chat-bots/chat-bots-v2/imbot.v2/events/event-get.html
   */
  get(param: iBXRestParamImBotEventGet) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestParamImBotEventGet
    >([$imbot, $v2, $Event, $get], param)
  }
}
