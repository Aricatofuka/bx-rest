import { Navvy } from '../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../typification/rest/common'
import {
  iBXRestNoteCollectionFieldName,
  iBXRestNoteCollectionFieldSelect,
  iBXRestParamNoteFieldGet
} from '../../../typification/rest/note'
import { $collection, $field, $get, $list, $note } from '../../../consts/part-name-methods'

export class BXRestNavvyNoteCollectionField  {
  private readonly Navvy = new Navvy()

  /**
   * Возвращает описание поля базы знаний
   * @see https://apidocs.bitrix24.ru/api-reference/note/collection/note-collection-field-get.html
   */
  get(param: iBXRestParamNoteFieldGet<
    iBXRestNoteCollectionFieldName,
    iBXRestNoteCollectionFieldSelect
  >) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestParamNoteFieldGet<
        iBXRestNoteCollectionFieldName,
        iBXRestNoteCollectionFieldSelect
      >
    >([$note, $collection, $field, $get], param)
  }

  /**
   * Возвращает список полей базы знаний
   */
  list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$note, $collection, $field, $list], param)
  }
}
