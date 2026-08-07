import { BXRestNavvyMailMailbox } from './mailbox'
import { BXRestNavvyMailMessage } from './message'
import { BXRestNavvyMailRecipient } from './recipient'

export class BXRestNavvyMail {
  public readonly mailbox = new BXRestNavvyMailMailbox()
  public readonly message = new BXRestNavvyMailMessage()
  public readonly recipient = new BXRestNavvyMailRecipient()
}

