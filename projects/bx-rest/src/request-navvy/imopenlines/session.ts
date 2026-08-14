import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $imopenlines, $intercept, $join, $open, $session, $start } from '../../consts/part-name-methods'
import { BXRestNavvyImOpenLinesSessionHead } from './session/head'
import { BXRestNavvyImOpenLinesSessionHistory } from './session/history'
import { BXRestNavvyImOpenLinesSessionMode } from './session/mode'

export class BXRestNavvyImOpenLinesSession  {
  private readonly Navvy = new Navvy()

  /**
   * Оценка сессии руководителем (`imopenlines.session.head.*`).
   */
  public readonly head = new BXRestNavvyImOpenLinesSessionHead()
  /**
   * История сессии (`imopenlines.session.history.*`).
   */
  public readonly history = new BXRestNavvyImOpenLinesSessionHistory()
  /**
   * Режимы диалога (`imopenlines.session.mode.*`).
   */
  public readonly mode = new BXRestNavvyImOpenLinesSessionMode()

  /**
   * Переводит диалог на текущего оператора.
   */
  intercept(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imopenlines, $session, $intercept], param)
  }

  /**
   * Присоединяет оператора к диалогу.
   */
  join(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imopenlines, $session, $join], param)
  }

  /**
   * Возвращает идентификатор чата по коду пользователя.
   */
  open(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imopenlines, $session, $open], param)
  }

  /**
   * Запускает новую сессию в чате.
   */
  start(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imopenlines, $session, $start], param)
  }
}

