import { BXRestNavvyImOpenLinesBotSession } from './bot/session'

export class BXRestNavvyImOpenLinesBot {
  /**
   * Сессия чат-бота открытой линии (`imopenlines.bot.session.*`).
   */
  public readonly session = new BXRestNavvyImOpenLinesBotSession()
}

