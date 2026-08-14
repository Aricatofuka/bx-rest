import { Navvy } from '../../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../../typification/rest/common'
import { $document, $field, $get, $list, $note, $tree } from '../../../../consts/part-name-methods'

export class BXRestNavvyNoteDocumentTreeField  {
  private readonly Navvy = new Navvy()

  /**
   * Возвращает описание поля дерева документов.
   */
  get(param: iBXRestGenericParams = {}) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$note, $document, $tree, $field, $get], param)
  }

  /**
   * Возвращает список полей дерева документов.
   */
  list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$note, $document, $tree, $field, $list], param)
  }
}

