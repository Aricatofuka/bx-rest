import { BXRestNavvyImV2ChatBot } from './chat/bot'

export class BXRestNavvyImV2Chat {
  /**
   * Контекст бота в чате (`im.v2.Chat.Bot.*`).
   */
  public readonly bot = new BXRestNavvyImV2ChatBot()
}

