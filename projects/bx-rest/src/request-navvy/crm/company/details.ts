import { BXRestNavvyCrmCompanyDetailsConfiguration } from './details/configuration'

export class BXRestNavvyCrmCompanyDetails {
  /**
   * Настройки карточки компании (`crm.company.details.configuration.*`).
   */
  public readonly configuration = new BXRestNavvyCrmCompanyDetailsConfiguration()
}
