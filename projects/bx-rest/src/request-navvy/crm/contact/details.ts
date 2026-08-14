import { BXRestNavvyCrmContactDetailsConfiguration } from './details/configuration'

export class BXRestNavvyCrmContactDetails {
  /**
   * Настройки карточки контакта (`crm.contact.details.configuration.*`).
   */
  public readonly configuration = new BXRestNavvyCrmContactDetailsConfiguration()
}
