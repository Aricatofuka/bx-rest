import { BXRestNavvySignB2ECompanyProvider } from './company/provider'

export class BXRestNavvySignB2ECompany {
  /**
   * Провайдеры подписи компании (`sign.b2e.company.provider.*`).
   */
  public readonly provider = new BXRestNavvySignB2ECompanyProvider()
}

