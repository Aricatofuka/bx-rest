import { BXRestNavvyCrmLead } from './crm/lead'
import { BXRestNavvyCrmDeal } from './crm/deal'
import { BXRestNavvyCrmContact } from './crm/contact'
import { BXRestNavvyCrmCompany } from './crm/company'

export class BXRestNavvyCrm {
  public readonly lead = new BXRestNavvyCrmLead()
  public readonly deal = new BXRestNavvyCrmDeal()
  public readonly contact = new BXRestNavvyCrmContact()
  public readonly company = new BXRestNavvyCrmCompany()
}

