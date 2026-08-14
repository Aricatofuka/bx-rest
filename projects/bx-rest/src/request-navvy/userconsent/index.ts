import { BXRestNavvyUserConsentAgreement } from './agreement'
import { BXRestNavvyUserConsentConsent } from './consent'

export class BXRestNavvyUserConsent {
  /**
   * Соглашения пользователя (`userconsent.agreement.*`).
   */
  public readonly agreement = new BXRestNavvyUserConsentAgreement()
  /**
   * Согласия пользователя (`userconsent.consent.*`).
   */
  public readonly consent = new BXRestNavvyUserConsentConsent()
}

