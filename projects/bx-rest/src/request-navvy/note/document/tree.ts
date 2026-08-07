import { Navvy } from '../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../typification/rest/common'
import { $document, $list, $note, $tree } from '../../../consts/part-name-methods'
import { BXRestNavvyNoteDocumentTreeField } from './tree/field'

export class BXRestNavvyNoteDocumentTree  {
  private readonly Navvy = new Navvy()

  public readonly field = new BXRestNavvyNoteDocumentTreeField()

  list(param: iBXRestGenericParams) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$note, $document, $tree, $list], param)
  }
}

