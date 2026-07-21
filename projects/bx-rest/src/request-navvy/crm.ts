import { BXRestNavvyCrmLead } from './crm/lead'
import { BXRestNavvyCrmDeal } from './crm/deal'
import { BXRestNavvyCrmContact } from './crm/contact'
import { BXRestNavvyCrmCompany } from './crm/company'
import { BXRestNavvyCrmQuote } from './crm/quote/index'
import { BXRestNavvyCrmEnum } from './crm/enum/index'
import { BXRestNavvyCrmMultifield } from './crm/multifield'
import { BXRestNavvyCrmAutomation } from './crm/automation/index'
import { BXRestNavvyCrmAutomatedSolution } from './crm/automatedsolution'
import { BXRestNavvyCrmDocumentGenerator } from './crm/documentgenerator/index'
import { BXRestNavvyCrmCurrency } from './crm/currency'
import { BXRestNavvyCrmStatus } from './crm/status'

export class BXRestNavvyCrm {
  /** Справочники CRM (`crm.status.*`). */
  public readonly status = new BXRestNavvyCrmStatus()
  /** Валюты CRM (`crm.currency.*`). */
  public readonly currency = new BXRestNavvyCrmCurrency()
  /** Генератор документов CRM (`crm.documentgenerator.*`). */
  public readonly documentGenerator = new BXRestNavvyCrmDocumentGenerator()
  /** Цифровые рабочие места (`crm.automatedsolution.*`). */
  public readonly automatedSolution = new BXRestNavvyCrmAutomatedSolution()
  /** Автоматизация CRM (`crm.automation.*`). */
  public readonly automation = new BXRestNavvyCrmAutomation()
  /** Перечисления CRM (`crm.enum.*`). */
  public readonly enum = new BXRestNavvyCrmEnum()
  /** Описание множественных полей CRM (`crm.multifield.*`). */
  public readonly multifield = new BXRestNavvyCrmMultifield()
  public readonly lead = new BXRestNavvyCrmLead()
  public readonly deal = new BXRestNavvyCrmDeal()
  public readonly contact = new BXRestNavvyCrmContact()
  public readonly company = new BXRestNavvyCrmCompany()
  /** Коммерческие предложения и связанные с ними товарные и пользовательские поля. */
  public readonly quote = new BXRestNavvyCrmQuote()
}
