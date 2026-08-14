import { BXRestNavvyImV2Chat } from './chat'
import { BXRestNavvyImV2Event } from './event'
import { BXRestNavvyImV2File } from './file'

export class BXRestNavvyImV2 {
  /**
   * Чаты модуля IM v2 (`im.v2.Chat.*`).
   */
  public readonly chat = new BXRestNavvyImV2Chat()
  /**
   * События модуля IM v2 (`im.v2.Event.*`).
   */
  public readonly event = new BXRestNavvyImV2Event()
  /**
   * Файлы модуля IM v2 (`im.v2.File.*`).
   */
  public readonly file = new BXRestNavvyImV2File()
}

