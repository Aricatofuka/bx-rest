import { BXRestNavvyImV2Chat } from './chat'
import { BXRestNavvyImV2Event } from './event'
import { BXRestNavvyImV2File } from './file'

export class BXRestNavvyImV2 {
  public readonly chat = new BXRestNavvyImV2Chat()
  public readonly event = new BXRestNavvyImV2Event()
  public readonly file = new BXRestNavvyImV2File()
}

