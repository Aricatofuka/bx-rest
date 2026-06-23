import { HttpBXServices } from '../../services/http/HttpBX'
import {
  iBXRestDiskFileHttp,
  iBXRestParamDiskFileGet,
  iBXRestParamDiskFileMarkDeleted
} from '../../typification/rest/disk/file'
import { $disk, $file, $get, $markdeleted } from '../../consts/part-name-methods'

export class BXRestDiskFile {
  protected url = {
    get: [$disk, $file, $get],
    markDeleted: [$disk, $file, $markdeleted],
  }

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
