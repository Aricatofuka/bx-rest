import { BXRestNavvyNoteCollection } from './collection'
import { BXRestNavvyNoteDocument } from './document'
import { BXRestNavvyNoteFile } from './file'

export class BXRestNavvyNote {
  /**
   * Базы знаний (`note.collection.*`).
   */
  public readonly collection = new BXRestNavvyNoteCollection()
  /**
   * Документы базы знаний (`note.document.*`).
   */
  public readonly document = new BXRestNavvyNoteDocument()
  /**
   * Файлы документов базы знаний (`note.file.*`).
   */
  public readonly file = new BXRestNavvyNoteFile()
}

