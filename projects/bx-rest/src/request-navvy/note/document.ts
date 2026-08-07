import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $add, $archive, $delete, $document, $get, $note, $update } from '../../consts/part-name-methods'
import { BXRestNavvyNoteDocumentField } from './document/field'
import { BXRestNavvyNoteDocumentSearch } from './document/search'
import { BXRestNavvyNoteDocumentTree } from './document/tree'

export class BXRestNavvyNoteDocument  {
  private readonly Navvy = new Navvy()

  public readonly field = new BXRestNavvyNoteDocumentField()
  public readonly search = new BXRestNavvyNoteDocumentSearch()
  public readonly tree = new BXRestNavvyNoteDocumentTree()

  add(param: iBXRestGenericParams) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$note, $document, $add], param)
  }

  archive(param: iBXRestGenericParams) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$note, $document, $archive], param)
  }

  delete(param: iBXRestGenericParams) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$note, $document, $delete], param)
  }

  get(param: iBXRestGenericParams) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$note, $document, $get], param)
  }

  update(param: iBXRestGenericParams) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$note, $document, $update], param)
  }
}

