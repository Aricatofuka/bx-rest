import { BXRestNavvyCrmDealDetailsConfiguration } from './details/configuration'

export class BXRestNavvyCrmDealDetails {
  /**
   * Настройки карточки сделки (`crm.deal.details.configuration.*`).
   */
  public readonly configuration = new BXRestNavvyCrmDealDetailsConfiguration()
}
