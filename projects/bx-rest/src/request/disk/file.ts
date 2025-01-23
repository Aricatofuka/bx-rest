import { HttpBXServices } from '../../services/http/HttpBX'
import {
  iBXRestDiskFileHttp,
  iBXRestParamDiskFileGet,
  iBXRestParamDiskFileMarkDeleted
} from '../../typification/rest/disk/file'
import { methods } from '../../typification/base/methods'

export class BXRestDiskFile {
  protected url = methods.disk.file

  private readonly http = new HttpBXServices()

  get(param: iBXRestParamDiskFileGet) {
    return this.http.post<iBXRestDiskFileHttp>(this.url.get, param)
  }

  markDeleted(param: iBXRestParamDiskFileMarkDeleted) {
    return this.http.post<iBXRestDiskFileHttp>(
      this.url.markDeleted,
      param
    )
  }
}
