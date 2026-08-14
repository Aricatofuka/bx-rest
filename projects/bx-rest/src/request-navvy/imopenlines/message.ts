import { BXRestNavvyImOpenLinesMessageQuick } from './message/quick'
import { BXRestNavvyImOpenLinesMessageSession } from './message/session'

export class BXRestNavvyImOpenLinesMessage {
  /**
   * Быстрые ответы (`imopenlines.message.quick.*`).
   */
  public readonly quick = new BXRestNavvyImOpenLinesMessageQuick()
  /**
   * Запуск сессии по сообщению (`imopenlines.message.session.*`).
   */
  public readonly session = new BXRestNavvyImOpenLinesMessageSession()
}

