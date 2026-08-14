import { Navvy } from '../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../typification/rest/common'
import { $document, $list, $note, $search } from '../../../consts/part-name-methods'
import { BXRestNavvyNoteDocumentSearchField } from './search/field'

export class BXRestNavvyNoteDocumentSearch  {
  private readonly Navvy = new Navvy()

  /**
   * Поля результата поиска документов (`note.document.search.field.*`).
   */
  public readonly field = new BXRestNavvyNoteDocumentSearchField()

  /**
   * Ищет документы по заголовку и содержимому.
   */
  list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$note, $document, $search, $list], param)
  }
}

