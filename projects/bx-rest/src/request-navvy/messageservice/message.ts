import { BXRestNavvyMessageServiceMessageStatus } from './message/status'

export class BXRestNavvyMessageServiceMessage {
  /**
   * Статус доставки сообщения (`messageservice.message.status.*`).
   */
  public readonly status = new BXRestNavvyMessageServiceMessageStatus()
}

