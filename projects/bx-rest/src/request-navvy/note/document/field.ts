import { Navvy } from '../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../typification/rest/common'
import { iBXRestParamNoteFieldGet } from '../../../typification/rest/note'
import { $document, $field, $get, $list, $note } from '../../../consts/part-name-methods'

export class BXRestNavvyNoteDocumentField  {
  private readonly Navvy = new Navvy()

  /**
   * Возвращает описание поля документа
   * @see https://apidocs.bitrix24.ru/api-reference/note/document/note-document-field-get.html
   */
  get(param: iBXRestParamNoteFieldGet) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestParamNoteFieldGet
    >([$note, $document, $field, $get], param)
  }

  /**
   * Возвращает список полей документа
   */
  list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$note, $document, $field, $list], param)
  }
}
