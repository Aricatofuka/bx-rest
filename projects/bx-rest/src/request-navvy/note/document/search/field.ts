import { Navvy } from '../../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../../typification/rest/common'
import {
  iBXRestNoteCollectionFieldSelect,
  iBXRestNoteDocumentSearchFieldName,
  iBXRestParamNoteFieldGet
} from '../../../../typification/rest/note'
import { $document, $field, $get, $list, $note, $search } from '../../../../consts/part-name-methods'

export class BXRestNavvyNoteDocumentSearchField  {
  private readonly Navvy = new Navvy()

  /**
   * Возвращает описание поля результата поиска документов
   * @see https://apidocs.bitrix24.ru/api-reference/note/document/note-document-search-field-get.html
   */
  get(param: iBXRestParamNoteFieldGet<
    iBXRestNoteDocumentSearchFieldName,
    iBXRestNoteCollectionFieldSelect
  >) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestParamNoteFieldGet<
        iBXRestNoteDocumentSearchFieldName,
        iBXRestNoteCollectionFieldSelect
      >
    >([$note, $document, $search, $field, $get], param)
  }

  /**
   * Возвращает список полей результата поиска документов
   */
  list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$note, $document, $search, $field, $list], param)
  }
}
