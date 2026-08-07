import { BXRestNavvyImOpenLinesCrmChat } from './crm/chat'
import { BXRestNavvyImOpenLinesCrmLead } from './crm/lead'
import { BXRestNavvyImOpenLinesCrmMessage } from './crm/message'

export class BXRestNavvyImOpenLinesCrm {
  public readonly chat = new BXRestNavvyImOpenLinesCrmChat()
  public readonly lead = new BXRestNavvyImOpenLinesCrmLead()
  public readonly message = new BXRestNavvyImOpenLinesCrmMessage()
}

