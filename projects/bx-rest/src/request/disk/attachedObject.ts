import { Injectable } from '@angular/core'
import { HttpBXServices } from '../../services/http/HttpBX'
import { $disk, $get } from '../../consts/part-name-metods'
import { iBXRestDiskAttachedObjectHttp } from '../../typification/rest/disk/AttachedObject'


@Injectable({
    providedIn: 'root'
})
export class BXRestDiskAttachedObject {
    url = {
        get: [$disk, 'attachedObject', $get]
    }

  constructor(private http: HttpBXServices) {
  }

    get(id: number) {
        return this.http.post<iBXRestDiskAttachedObjectHttp>(this.url.get, {id: id})
    }
}
