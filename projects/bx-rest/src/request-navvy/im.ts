import { BXRestNavvyImChat } from './im/chat'
import { BXRestNavvyImCounters } from './im/counters'
import { BXRestNavvyImDepartment } from './im/department'
import { BXRestNavvyImDialog } from './im/dialog'
import { BXRestNavvyImDisk } from './im/disk'
import { BXRestNavvyImMessage } from './im/message'
import { BXRestNavvyImNotify } from './im/notify'
import { BXRestNavvyImRecent } from './im/recent'
import { BXRestNavvyImRevision } from './im/revision'
import { BXRestNavvyImSearch } from './im/search'
import { BXRestNavvyImUser } from './im/user'
import { BXRestNavvyImV2 } from './im/v2'

export class BXRestNavvyIm {
  public readonly v2 = new BXRestNavvyImV2()
  public readonly chat = new BXRestNavvyImChat()
  public readonly counters = new BXRestNavvyImCounters()
  public readonly dialog = new BXRestNavvyImDialog()
  public readonly department = new BXRestNavvyImDepartment()
  public readonly disk = new BXRestNavvyImDisk()
  public readonly message = new BXRestNavvyImMessage()
  public readonly notify = new BXRestNavvyImNotify()
  public readonly recent = new BXRestNavvyImRecent()
  public readonly revision = new BXRestNavvyImRevision()
  public readonly search = new BXRestNavvyImSearch()
  public readonly user = new BXRestNavvyImUser()
}
