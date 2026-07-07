import { BXRestNavvyCrmLead } from './crm/lead'
import { BXRestNavvyCrmDeal } from './crm/deal'
import { BXRestNavvyCrmContact } from './crm/contact'
import { BXRestNavvyCrmCompany } from './crm/company'
import { BXRestNavvyCrmQuote } from './crm/quote/index'

export class BXRestNavvyCrm {
  public readonly lead = new BXRestNavvyCrmLead()
  public readonly deal = new BXRestNavvyCrmDeal()
  public readonly contact = new BXRestNavvyCrmContact()
  public readonly company = new BXRestNavvyCrmCompany()
  /** Коммерческие предложения и связанные с ними товарные и пользовательские поля. */
  public readonly quote = new BXRestNavvyCrmQuote()
}
