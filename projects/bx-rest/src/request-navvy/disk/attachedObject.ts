import { inject, Injectable } from '@angular/core'
import { BXRestDiskAttachedObject } from '../../request/disk/attachedObject'
import BXRestMapDiskAttachedObject from '../../map/disk/attachedObject'
import { Navvy } from '../../services/navvy'
import { iBXRestParamRestDiskAttachedObject } from '../../typification/rest/disk/AttachedObject'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyDiskAttachedObject {

  private readonly BXRestDiskAttachedObject = inject(BXRestDiskAttachedObject)
  private readonly mapAttachedObject = inject(BXRestMapDiskAttachedObject)
  private Navvy = new Navvy(this.BXRestDiskAttachedObject, this.mapAttachedObject)

  get(param: iBXRestParamRestDiskAttachedObject) {
    return this.Navvy.simpleWithArg(
      this.BXRestDiskAttachedObject.get,
      param,
      this.mapAttachedObject.get)
  }
}
