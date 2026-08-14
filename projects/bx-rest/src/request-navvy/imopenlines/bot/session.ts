import { Navvy } from '../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../typification/rest/common'
import { $bot, $finish, $imopenlines, $operator, $session, $transfer } from '../../../consts/part-name-methods'
import { BXRestNavvyImOpenLinesBotSessionMessage } from './session/message'

export class BXRestNavvyImOpenLinesBotSession  {
  private readonly Navvy = new Navvy()

  /**
   * Автоматические сообщения чат-бота (`imopenlines.bot.session.message.*`).
   */
  public readonly message = new BXRestNavvyImOpenLinesBotSessionMessage()

  /**
   * Завершает диалог от имени чат-бота.
   */
  finish(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imopenlines, $bot, $session, $finish], param)
  }

  /**
   * Переключает диалог на свободного оператора.
   */
  operator(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imopenlines, $bot, $session, $operator], param)
  }

  /**
   * Переводит диалог на оператора или в очередь.
   */
  transfer(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imopenlines, $bot, $session, $transfer], param)
  }
}

