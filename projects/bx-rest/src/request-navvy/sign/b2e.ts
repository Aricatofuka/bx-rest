import { BXRestNavvySignB2ECompany } from './b2e/company'
import { BXRestNavvySignB2EDocument } from './b2e/document'
import { BXRestNavvySignB2EMySafe } from './b2e/mysafe'
import { BXRestNavvySignB2EPersonal } from './b2e/personal'

export class BXRestNavvySignB2E {
  public readonly company = new BXRestNavvySignB2ECompany()
  public readonly document = new BXRestNavvySignB2EDocument()
  public readonly mySafe = new BXRestNavvySignB2EMySafe()
  public readonly personal = new BXRestNavvySignB2EPersonal()
}

