import { BXRestMapDiskAttachedObject } from '../../map/disk/attachedObject'
import { Navvy } from '../../services/navvy'
import { iBXRestParamRestDiskAttachedObject } from '../../typification/rest/disk'
import { $disk, $get } from '../../consts/part-name-methods'

export class BXRestNavvyDiskAttachedObject {

  private Navvy = new Navvy()

  get(param: iBXRestParamRestDiskAttachedObject) {
    return this.Navvy.simple(
      [$disk, 'attachedObject', $get],
      param,
      BXRestMapDiskAttachedObject.get)
  }
}
