import { BXRestNavvyImBotV2Bot } from './v2/bot'
import { BXRestNavvyImBotV2Chat } from './v2/chat'
import { BXRestNavvyImBotV2Command } from './v2/command'
import { BXRestNavvyImBotV2Event } from './v2/event'
import { BXRestNavvyImBotV2File } from './v2/file'
import { BXRestNavvyImBotV2Revision } from './v2/revision'

export class BXRestNavvyImBotV2 {
  /**
   * Управление ботами (`imbot.v2.Bot.*`).
   */
  public readonly bot = new BXRestNavvyImBotV2Bot()
  /**
   * Чаты бота (`imbot.v2.Chat.*`).
   */
  public readonly chat = new BXRestNavvyImBotV2Chat()
  /**
   * Слэш-команды бота (`imbot.v2.Command.*`).
   */
  public readonly command = new BXRestNavvyImBotV2Command()
  /**
   * События бота (`imbot.v2.Event.*`).
   */
  public readonly event = new BXRestNavvyImBotV2Event()
  /**
   * Файлы бота (`imbot.v2.File.*`).
   */
  public readonly file = new BXRestNavvyImBotV2File()
  /**
   * Ревизии API бот-платформы (`imbot.v2.Revision.*`).
   */
  public readonly revision = new BXRestNavvyImBotV2Revision()
}

