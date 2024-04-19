import { Injectable } from '@angular/core'
import { HttpBXServices } from '../../services/http/HttpBX'
import {
  iBXRestDiskFileHttp,
  iBXRestParamDiskFileGet,
  iBXRestParamDiskFileMarkDeleted
} from '../../typification/rest/disk/file'
import { methods } from '../../methods'

@Injectable({
  providedIn: 'root'
})
export class BXRestDiskFile {

  protected url = methods.disk.file

  constructor(private http: HttpBXServices) {
  }

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
