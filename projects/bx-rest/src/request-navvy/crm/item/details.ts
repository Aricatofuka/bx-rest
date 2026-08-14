import { BXRestNavvyCrmItemDetailsConfiguration } from './details/configuration'

export class BXRestNavvyCrmItemDetails {
  /**
   * Настройки карточки элемента CRM (`crm.item.details.configuration.*`).
   */
  public readonly configuration = new BXRestNavvyCrmItemDetailsConfiguration()
}
