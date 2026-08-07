import { BXRestNavvyImOpenLinesBot } from './bot'
import { BXRestNavvyImOpenLinesConfig } from './config'
import { BXRestNavvyImOpenLinesCrm } from './crm'
import { BXRestNavvyImOpenLinesDialog } from './dialog'
import { BXRestNavvyImOpenLinesMessage } from './message'
import { BXRestNavvyImOpenLinesNetwork } from './network'
import { BXRestNavvyImOpenLinesOperator } from './operator'
import { BXRestNavvyImOpenLinesRevision } from './revision'
import { BXRestNavvyImOpenLinesSession } from './session'

export class BXRestNavvyImOpenLines {
  public readonly bot = new BXRestNavvyImOpenLinesBot()
  public readonly config = new BXRestNavvyImOpenLinesConfig()
  public readonly crm = new BXRestNavvyImOpenLinesCrm()
  public readonly dialog = new BXRestNavvyImOpenLinesDialog()
  public readonly message = new BXRestNavvyImOpenLinesMessage()
  public readonly network = new BXRestNavvyImOpenLinesNetwork()
  public readonly operator = new BXRestNavvyImOpenLinesOperator()
  public readonly revision = new BXRestNavvyImOpenLinesRevision()
  public readonly session = new BXRestNavvyImOpenLinesSession()
}

