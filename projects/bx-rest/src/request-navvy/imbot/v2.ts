import { BXRestNavvyImBotV2Bot } from './v2/bot'
import { BXRestNavvyImBotV2Chat } from './v2/chat'
import { BXRestNavvyImBotV2Command } from './v2/command'
import { BXRestNavvyImBotV2Event } from './v2/event'
import { BXRestNavvyImBotV2File } from './v2/file'
import { BXRestNavvyImBotV2Revision } from './v2/revision'

export class BXRestNavvyImBotV2 {
  public readonly bot = new BXRestNavvyImBotV2Bot()
  public readonly chat = new BXRestNavvyImBotV2Chat()
  public readonly command = new BXRestNavvyImBotV2Command()
  public readonly event = new BXRestNavvyImBotV2Event()
  public readonly file = new BXRestNavvyImBotV2File()
  public readonly revision = new BXRestNavvyImBotV2Revision()
}

