import { BXRestNavvyUserConsentAgreement } from './agreement'
import { BXRestNavvyUserConsentConsent } from './consent'

export class BXRestNavvyUserConsent {
  public readonly agreement = new BXRestNavvyUserConsentAgreement()
  public readonly consent = new BXRestNavvyUserConsentConsent()
}

