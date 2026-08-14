import { BXRestNavvySignB2ECompany } from './b2e/company'
import { BXRestNavvySignB2EDocument } from './b2e/document'
import { BXRestNavvySignB2EMySafe } from './b2e/mysafe'
import { BXRestNavvySignB2EPersonal } from './b2e/personal'

export class BXRestNavvySignB2E {
  /**
   * Провайдеры подписи компании (`sign.b2e.company.*`).
   */
  public readonly company = new BXRestNavvySignB2ECompany()
  /**
   * Документы на подпись (`sign.b2e.document.*`).
   */
  public readonly document = new BXRestNavvySignB2EDocument()
  /**
   * Сейф компании с подписанными документами (`sign.b2e.mysafe.*`).
   */
  public readonly mySafe = new BXRestNavvySignB2EMySafe()
  /**
   * Личный архив подписанных документов пользователя (`sign.b2e.personal.*`).
   */
  public readonly personal = new BXRestNavvySignB2EPersonal()
}

