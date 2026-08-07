import { BXRestNavvyNoteCollection } from './collection'
import { BXRestNavvyNoteDocument } from './document'
import { BXRestNavvyNoteFile } from './file'

export class BXRestNavvyNote {
  public readonly collection = new BXRestNavvyNoteCollection()
  public readonly document = new BXRestNavvyNoteDocument()
  public readonly file = new BXRestNavvyNoteFile()
}

