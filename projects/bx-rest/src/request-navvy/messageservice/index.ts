import { BXRestNavvyMessageServiceMessage } from './message'
import { BXRestNavvyMessageServiceSender } from './sender'

export class BXRestNavvyMessageService {
  /**
   * Статус доставки сообщений (`messageservice.message.*`).
   */
  public readonly message = new BXRestNavvyMessageServiceMessage()
  /**
   * СМС-провайдеры и провайдеры сообщений (`messageservice.sender.*`).
   */
  public readonly sender = new BXRestNavvyMessageServiceSender()
}

