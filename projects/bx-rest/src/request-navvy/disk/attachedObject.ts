import { Injectable } from '@angular/core'
import { BXRestDiskAttachedObject } from '../../request/disk/attachedObject'
import BXRestMapDiskAttachedObject from '../../map/disk/attachedObject'
import { Navvy } from '../../services/navvy'

@Injectable({
    providedIn: 'root'
})
export class BXRestNavvyDiskAttachedObject {

    constructor(
        private BXRestDiskAttachedObject: BXRestDiskAttachedObject,
        private mapAttachedObject: BXRestMapDiskAttachedObject,
    ) {
    }

    get(id: number) {
        return new Navvy(
          this.BXRestDiskAttachedObject.get(id),
          'Не удалось получить прикрепленные файлы',
          this.mapAttachedObject.get)
    }
}
