import { BXRestNavvyImOpenLinesCrmChat } from './crm/chat'
import { BXRestNavvyImOpenLinesCrmLead } from './crm/lead'
import { BXRestNavvyImOpenLinesCrmMessage } from './crm/message'

export class BXRestNavvyImOpenLinesCrm {
  /**
   * CRM-чаты открытой линии (`imopenlines.crm.chat.*`).
   */
  public readonly chat = new BXRestNavvyImOpenLinesCrmChat()
  /**
   * Создание лида по диалогу (`imopenlines.crm.lead.*`).
   */
  public readonly lead = new BXRestNavvyImOpenLinesCrmLead()
  /**
   * Сообщения в открытую линию (`imopenlines.crm.message.*`).
   */
  public readonly message = new BXRestNavvyImOpenLinesCrmMessage()
}

