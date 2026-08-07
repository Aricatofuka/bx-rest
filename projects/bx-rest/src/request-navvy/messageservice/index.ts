import { BXRestNavvyMessageServiceMessage } from './message'
import { BXRestNavvyMessageServiceSender } from './sender'

export class BXRestNavvyMessageService {
  public readonly message = new BXRestNavvyMessageServiceMessage()
  public readonly sender = new BXRestNavvyMessageServiceSender()
}

