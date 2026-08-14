import { BXRestNavvyCrmLeadDetailsConfiguration } from './details/configuration'

export class BXRestNavvyCrmLeadDetails {
  /**
   * Настройки карточки лида (`crm.lead.details.configuration.*`).
   */
  public readonly configuration = new BXRestNavvyCrmLeadDetailsConfiguration()
}
