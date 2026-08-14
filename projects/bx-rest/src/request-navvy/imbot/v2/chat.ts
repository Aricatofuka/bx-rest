import { Navvy } from '../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../typification/rest/common'
import { $Chat, $add, $get, $imbot, $leave, $setOwner, $update, $v2 } from '../../../consts/part-name-methods'
import { BXRestNavvyImBotV2ChatInputAction } from './chat/inputaction'
import { BXRestNavvyImBotV2ChatManager } from './chat/manager'
import { BXRestNavvyImBotV2ChatMessage } from './chat/message'
import { BXRestNavvyImBotV2ChatTextField } from './chat/textfield'
import { BXRestNavvyImBotV2ChatUser } from './chat/user'

export class BXRestNavvyImBotV2Chat  {
  private readonly Navvy = new Navvy()

  /**
   * Индикатор действия бота (`imbot.v2.Chat.inputAction.*`).
   */
  public readonly inputAction = new BXRestNavvyImBotV2ChatInputAction()
  /**
   * Менеджеры чата (`imbot.v2.Chat.manager.*`).
   */
  public readonly manager = new BXRestNavvyImBotV2ChatManager()
  /**
   * Сообщения бота в чате (`imbot.v2.Chat.message.*`).
   */
  public readonly message = new BXRestNavvyImBotV2ChatMessage()
  /**
   * Поле ввода текста в чате (`imbot.v2.Chat.textField.*`).
   */
  public readonly textField = new BXRestNavvyImBotV2ChatTextField()
  /**
   * Участники чата (`imbot.v2.Chat.user.*`).
   */
  public readonly user = new BXRestNavvyImBotV2ChatUser()

  /**
   * Создаёт групповой чат.
   */
  add(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imbot, $v2, $Chat, $add], param)
  }

  /**
   * Возвращает информацию о чате.
   */
  get(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imbot, $v2, $Chat, $get], param)
  }

  /**
   * Выводит бота из чата.
   */
  leave(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imbot, $v2, $Chat, $leave], param)
  }

  /**
   * Назначает нового владельца чата.
   */
  setOwner(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imbot, $v2, $Chat, $setOwner], param)
  }

  /**
   * Обновляет свойства чата.
   */
  update(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imbot, $v2, $Chat, $update], param)
  }
}

