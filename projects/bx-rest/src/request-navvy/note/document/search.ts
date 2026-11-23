import { Navvy } from '../../../services/navvy'
import { iBXRestGenericObject } from '../../../typification/rest/common'
import { iBXRestParamNoteDocumentSearchList } from '../../../typification/rest/note'
import { $document, $list, $note, $search } from '../../../consts/part-name-methods'
import { BXRestNavvyNoteDocumentSearchField } from './search/field'

export class BXRestNavvyNoteDocumentSearch  {
  private readonly Navvy = new Navvy()

  /**
   * Поля результата поиска документов (`note.document.search.field.*`).
   */
  public readonly field = new BXRestNavvyNoteDocumentSearchField()

  /**
   * Ищет документы по заголовку и содержимому
   * @see https://apidocs.bitrix24.ru/api-reference/note/document/note-document-search-list.html
   */
  list(param: iBXRestParamNoteDocumentSearchList) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestParamNoteDocumentSearchList
    >([$note, $document, $search, $list], param)
  }
}
