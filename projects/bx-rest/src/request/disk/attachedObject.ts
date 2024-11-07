import { inject, Injectable } from '@angular/core'
import { HttpBXServices } from '../../services/http/HttpBX'
import {
  iBXRestDiskAttachedObjectHttp,
  iBXRestParamRestDiskAttachedObject
} from '../../typification/rest/disk/AttachedObject'
import { methods } from '../../typification/base/methods'

@Injectable({
  providedIn: 'root'
})
export class BXRestDiskAttachedObject {

  protected url = methods.disk.attachedObject
  private readonly http = inject(HttpBXServices)

  get(param: iBXRestParamRestDiskAttachedObject) {
    return this.http.post<iBXRestDiskAttachedObjectHttp>(this.url.get, param)
  }
}
