import { BXRestNavvyImChat } from './im/chat'
import { BXRestNavvyImCounters } from './im/counters'
import { BXRestNavvyImDialog } from './im/dialog'
import { BXRestNavvyImRecent } from './im/recent'
import { BXRestNavvyImUser } from './im/user'

export class BXRestNavvyIm {
  public readonly chat = new BXRestNavvyImChat()
  public readonly counters = new BXRestNavvyImCounters()
  public readonly dialog = new BXRestNavvyImDialog()
  public readonly recent = new BXRestNavvyImRecent()
  public readonly user = new BXRestNavvyImUser()
}
