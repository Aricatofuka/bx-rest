import { Navvy } from '../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../typification/rest/common'
import { $field, $file, $get, $list, $note } from '../../../consts/part-name-methods'

export class BXRestNavvyNoteFileField  {
  private readonly Navvy = new Navvy()

  /**
   * Возвращает описание поля файла документа.
   */
  get(param: iBXRestGenericParams = {}) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$note, $file, $field, $get], param)
  }

  /**
   * Возвращает список полей файла документа.
   */
  list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$note, $file, $field, $list], param)
  }
}

