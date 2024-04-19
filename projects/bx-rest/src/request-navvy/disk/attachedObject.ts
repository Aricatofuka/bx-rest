import { Injectable } from '@angular/core'
import { BXRestDiskAttachedObject } from '../../request/disk/attachedObject'
import BXRestMapDiskAttachedObject from '../../map/disk/attachedObject'
import { Navvy } from '../../services/navvy'
import { iBXRestParamRestDiskAttachedObject } from '../../typification/rest/disk/AttachedObject';

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyDiskAttachedObject {
  private Navvy: Navvy<BXRestDiskAttachedObject, BXRestMapDiskAttachedObject>

  constructor(
    private BXRestDiskAttachedObject: BXRestDiskAttachedObject,
    private mapAttachedObject: BXRestMapDiskAttachedObject,
  ) {
    this.Navvy = new Navvy(this.BXRestDiskAttachedObject, this.mapAttachedObject)
  }

  get(param: iBXRestParamRestDiskAttachedObject) {
    return this.Navvy.simpleWithArg(
      this.BXRestDiskAttachedObject.get,
      param,
      this.mapAttachedObject.get)
  }
}
