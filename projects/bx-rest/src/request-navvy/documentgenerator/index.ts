import { BXRestNavvyDocumentGeneratorDocument } from './document'
import { BXRestNavvyDocumentGeneratorNumerator } from './numerator'
import { BXRestNavvyDocumentGeneratorRegion } from './region'
import { BXRestNavvyDocumentGeneratorRole } from './role'
import { BXRestNavvyDocumentGeneratorTemplate } from './template'

export class BXRestNavvyDocumentGenerator {
  public readonly document = new BXRestNavvyDocumentGeneratorDocument()
  public readonly numerator = new BXRestNavvyDocumentGeneratorNumerator()
  public readonly region = new BXRestNavvyDocumentGeneratorRegion()
  public readonly role = new BXRestNavvyDocumentGeneratorRole()
  public readonly template = new BXRestNavvyDocumentGeneratorTemplate()
}

