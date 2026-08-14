import { BXRestNavvyMailMailbox } from './mailbox'
import { BXRestNavvyMailMessage } from './message'
import { BXRestNavvyMailRecipient } from './recipient'

export class BXRestNavvyMail {
  /**
   * Почтовые ящики (`mail.mailbox.*`).
   */
  public readonly mailbox = new BXRestNavvyMailMailbox()
  /**
   * Письма (`mail.message.*`).
   */
  public readonly message = new BXRestNavvyMailMessage()
  /**
   * Получатели писем (`mail.recipient.*`).
   */
  public readonly recipient = new BXRestNavvyMailRecipient()
}

