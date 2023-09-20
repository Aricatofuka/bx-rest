import { Injectable } from '@angular/core'
import { map } from 'rxjs/operators'
import { BXRestDiskAttachedObject } from '../../request/disk/attachedObject'
import { Navvy } from '../../services/navvy'
import BXRestMapDiskAttachedObject from '../../map/disk/attachedObject'

@Injectable({
    providedIn: 'root'
})
export class BXRestNavvyDiskAttachedObject {

    constructor(
        private BXRestDiskAttachedObject: BXRestDiskAttachedObject,
        private mapAttachedObject: BXRestMapDiskAttachedObject,
        private Navvy: Navvy,
    ) {
    }

    get(id: number) {
        return this.Navvy.mapAndSnackBarError(
            this.BXRestDiskAttachedObject.get(id),
            'Не удалось получить прикреплённый файл'
        ).pipe(
            map(v => this.mapAttachedObject.get(v))
        )
    }
}
