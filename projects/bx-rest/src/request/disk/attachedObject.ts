import { HttpBXServices } from '../../services/http/HttpBX'
import {
  iBXRestDiskAttachedObjectHttp,
  iBXRestParamRestDiskAttachedObject
} from '../../typification/rest/disk/AttachedObject'
import { $disk, $get } from '../../consts/part-name-methods'

export class BXRestDiskAttachedObject {
  protected url = {
    get: [$disk, 'attachedObject', $get],
  }
  private readonly http = new HttpBXServices()

  get(param: iBXRestParamRestDiskAttachedObject) {
    return this.http.post<iBXRestDiskAttachedObjectHttp>(this.url.get, param)
  }
}
