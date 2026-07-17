import { BXRestNavvyCrmDocumentGeneratorDocument } from './document'
import { BXRestNavvyCrmDocumentGeneratorNumerator } from './numerator'
import { BXRestNavvyCrmDocumentGeneratorTemplate } from './template'

export * from './document'
export * from './numerator'
export * from './template'

/** Методы генератора документов CRM (`crm.documentgenerator.*`). */
export class BXRestNavvyCrmDocumentGenerator {
  /** Нумераторы задают шаблон номера и параметры счётчика документов. */
  public readonly numerator = new BXRestNavvyCrmDocumentGeneratorNumerator()

  /** Шаблоны DOCX, привязанные к нумераторам и типам CRM-объектов. */
  public readonly template = new BXRestNavvyCrmDocumentGeneratorTemplate()

  /** Создание, загрузка и управление документами CRM. */
  public readonly document = new BXRestNavvyCrmDocumentGeneratorDocument()
}
