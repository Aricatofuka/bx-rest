import { Injectable } from '@angular/core'
import { iBXRestParamTimeManStatus, iBXRestTimeManStatusHttp } from '../typification/rest/timeman/status'
import { HttpBXServices } from '../services/http/HttpBX'
import { methods } from '../typification/base/methods'

@Injectable({
  providedIn: 'root'
})
export class BXRestTimeMan {
  protected url = methods.timeman

  constructor(
    private http: HttpBXServices,
  ) {
  }

  status(param: iBXRestParamTimeManStatus | undefined = undefined){
    return this.http.post<iBXRestTimeManStatusHttp>(this.url.status, param)
  }
}

