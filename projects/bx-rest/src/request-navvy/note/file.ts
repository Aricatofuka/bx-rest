import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $add, $file, $get, $note } from '../../consts/part-name-methods'
import { BXRestNavvyNoteFileField } from './file/field'

export class BXRestNavvyNoteFile  {
  private readonly Navvy = new Navvy()

  public readonly field = new BXRestNavvyNoteFileField()

  add(param: iBXRestGenericParams) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$note, $file, $add], param)
  }

  get(param: iBXRestGenericParams) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$note, $file, $get], param)
  }
}

