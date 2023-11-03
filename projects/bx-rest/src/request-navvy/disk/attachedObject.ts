import { Injectable } from '@angular/core'
import { BXRestDiskAttachedObject } from '../../request/disk/attachedObject'
import BXRestMapDiskAttachedObject from '../../map/disk/attachedObject'
import { Navvy } from '../../services/navvy'

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

  get(id: number) {
    return this.Navvy.simpleWithArg(
      this.BXRestDiskAttachedObject.get,
      id,
      this.mapAttachedObject.get)
  }
}
