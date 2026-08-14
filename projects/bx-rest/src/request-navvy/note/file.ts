import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $add, $file, $get, $note } from '../../consts/part-name-methods'
import { BXRestNavvyNoteFileField } from './file/field'

export class BXRestNavvyNoteFile  {
  private readonly Navvy = new Navvy()

  /**
   * Поля файла документа (`note.file.field.*`).
   */
  public readonly field = new BXRestNavvyNoteFileField()

  /**
   * Загружает файл в документ.
   */
  add(param: iBXRestGenericParams) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$note, $file, $add], param)
  }

  /**
   * Возвращает данные файла документа и блок Markdown для вставки.
   */
  get(param: iBXRestGenericParams) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$note, $file, $get], param)
  }
}

