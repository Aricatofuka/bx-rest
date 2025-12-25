import { BXRestMapDiskAttachedObject } from '../../map/disk/attachedObject'
import { Navvy } from '../../services/navvy'
import { iBXRestParamRestDiskAttachedObject } from '../../typification/rest/disk'
import { methods } from '../../typification/base/methods'

export class BXRestNavvyDiskAttachedObject {

  private Navvy = new Navvy()

  get(param: iBXRestParamRestDiskAttachedObject) {
    return this.Navvy.simple(
      methods.disk.attachedObject.get,
      param,
      BXRestMapDiskAttachedObject.get)
  }
}
