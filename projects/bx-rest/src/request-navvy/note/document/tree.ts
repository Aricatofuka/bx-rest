import { Navvy } from '../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../typification/rest/common'
import { iBXRestParamNoteDocumentTreeList } from '../../../typification/rest/note'
import { $document, $list, $note, $tree } from '../../../consts/part-name-methods'
import { BXRestNavvyNoteDocumentTreeField } from './tree/field'

export class BXRestNavvyNoteDocumentTree  {
  private readonly Navvy = new Navvy()

  /**
   * Поля дерева документов (`note.document.tree.field.*`).
   */
  public readonly field = new BXRestNavvyNoteDocumentTreeField()

  /**
   * Возвращает дерево документов одной базы знаний
   * @see https://apidocs.bitrix24.ru/api-reference/note/document/note-document-tree-list.html
   */
  list(param: iBXRestParamNoteDocumentTreeList) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestParamNoteDocumentTreeList
    >([$note, $document, $tree, $list], param)
  }
}
