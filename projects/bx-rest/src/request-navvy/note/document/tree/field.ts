import { Navvy } from '../../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../../typification/rest/common'
import {
  iBXRestNoteCollectionFieldSelect,
  iBXRestNoteDocumentTreeFieldName,
  iBXRestParamNoteFieldGet
} from '../../../../typification/rest/note'
import { $document, $field, $get, $list, $note, $tree } from '../../../../consts/part-name-methods'

export class BXRestNavvyNoteDocumentTreeField  {
  private readonly Navvy = new Navvy()

  /**
   * Возвращает описание поля дерева документов
   * @see https://apidocs.bitrix24.ru/api-reference/note/document/note-document-tree-field-get.html
   */
  get(param: iBXRestParamNoteFieldGet<
    iBXRestNoteDocumentTreeFieldName,
    iBXRestNoteCollectionFieldSelect
  >) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestParamNoteFieldGet<
        iBXRestNoteDocumentTreeFieldName,
        iBXRestNoteCollectionFieldSelect
      >
    >([$note, $document, $tree, $field, $get], param)
  }

  /**
   * Возвращает список полей дерева документов
   */
  list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$note, $document, $tree, $field, $list], param)
  }
}
