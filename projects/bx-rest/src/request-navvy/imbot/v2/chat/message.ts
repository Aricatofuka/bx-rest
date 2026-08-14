import { Navvy } from '../../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../../typification/rest/common'
import { $Chat, $delete, $get, $getContext, $imbot, $message, $read, $send, $update, $v2 } from '../../../../consts/part-name-methods'
import { BXRestNavvyImBotV2ChatMessageReaction } from './message/reaction'

export class BXRestNavvyImBotV2ChatMessage  {
  private readonly Navvy = new Navvy()

  /**
   * Реакции на сообщения (`imbot.v2.Chat.message.reaction.*`).
   */
  public readonly reaction = new BXRestNavvyImBotV2ChatMessageReaction()

  /**
   * Удаляет сообщение бота.
   */
  delete(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imbot, $v2, $Chat, $message, $delete], param)
  }

  /**
   * Возвращает сообщение по идентификатору.
   */
  get(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imbot, $v2, $Chat, $message, $get], param)
  }

  /**
   * Возвращает окно сообщений вокруг указанного.
   */
  getContext(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imbot, $v2, $Chat, $message, $getContext], param)
  }

  /**
   * Отмечает сообщения как прочитанные.
   */
  read(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imbot, $v2, $Chat, $message, $read], param)
  }

  /**
   * Отправляет сообщение в чат.
   */
  send(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imbot, $v2, $Chat, $message, $send], param)
  }

  /**
   * Обновляет сообщение бота.
   */
  update(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imbot, $v2, $Chat, $message, $update], param)
  }
}

