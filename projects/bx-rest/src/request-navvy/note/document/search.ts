import { Navvy } from '../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../typification/rest/common'
import { $document, $list, $note, $search } from '../../../consts/part-name-methods'
import { BXRestNavvyNoteDocumentSearchField } from './search/field'

export class BXRestNavvyNoteDocumentSearch  {
  private readonly Navvy = new Navvy()

  public readonly field = new BXRestNavvyNoteDocumentSearchField()

  list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$note, $document, $search, $list], param)
  }
}

