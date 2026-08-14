import { Navvy } from '../../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../../typification/rest/common'
import { $document, $field, $get, $list, $note, $search } from '../../../../consts/part-name-methods'

export class BXRestNavvyNoteDocumentSearchField  {
  private readonly Navvy = new Navvy()

  /**
   * Возвращает описание поля результата поиска документов.
   */
  get(param: iBXRestGenericParams = {}) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$note, $document, $search, $field, $get], param)
  }

  /**
   * Возвращает список полей результата поиска документов.
   */
  list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$note, $document, $search, $field, $list], param)
  }
}

