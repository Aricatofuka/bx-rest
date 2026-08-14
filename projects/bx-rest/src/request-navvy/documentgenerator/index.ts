import { BXRestNavvyDocumentGeneratorDocument } from './document'
import { BXRestNavvyDocumentGeneratorNumerator } from './numerator'
import { BXRestNavvyDocumentGeneratorRegion } from './region'
import { BXRestNavvyDocumentGeneratorRole } from './role'
import { BXRestNavvyDocumentGeneratorTemplate } from './template'

export class BXRestNavvyDocumentGenerator {
  /**
   * Документы генератора документов (`documentgenerator.document.*`).
   */
  public readonly document = new BXRestNavvyDocumentGeneratorDocument()
  /**
   * Нумераторы генератора документов (`documentgenerator.numerator.*`).
   */
  public readonly numerator = new BXRestNavvyDocumentGeneratorNumerator()
  /**
   * Регионы генератора документов (`documentgenerator.region.*`).
   */
  public readonly region = new BXRestNavvyDocumentGeneratorRegion()
  /**
   * Роли и права генератора документов (`documentgenerator.role.*`).
   */
  public readonly role = new BXRestNavvyDocumentGeneratorRole()
  /**
   * Шаблоны генератора документов (`documentgenerator.template.*`).
   */
  public readonly template = new BXRestNavvyDocumentGeneratorTemplate()
}

