import { Navvy } from '../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../typification/rest/common'
import {
  iBXRestNoteCollectionFieldSelect,
  iBXRestNoteFileFieldName,
  iBXRestParamNoteFieldGet
} from '../../../typification/rest/note'
import { $field, $file, $get, $list, $note } from '../../../consts/part-name-methods'

export class BXRestNavvyNoteFileField  {
  private readonly Navvy = new Navvy()

  /**
   * Возвращает описание поля файла документа
   * @see https://apidocs.bitrix24.ru/api-reference/note/file/note-file-field-get.html
   */
  get(param: iBXRestParamNoteFieldGet<
    iBXRestNoteFileFieldName,
    iBXRestNoteCollectionFieldSelect
  >) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestParamNoteFieldGet<
        iBXRestNoteFileFieldName,
        iBXRestNoteCollectionFieldSelect
      >
    >([$note, $file, $field, $get], param)
  }

  /**
   * Возвращает список полей файла документа
   */
  list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$note, $file, $field, $list], param)
  }
}
