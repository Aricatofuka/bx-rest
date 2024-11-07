import { inject, Injectable } from '@angular/core'
import { HttpBXServices } from '../services/http/HttpBX'
import {
  iBXRestParamSonetGroupGet, iBXRestSonetGroupGetHttp
} from '../typification/rest/sonet_group/get'
import { methods } from '../typification/base/methods'

@Injectable({
  providedIn: 'root'
})
export class BXRestSonetGroup {

  protected url = methods.sonet_group

  private http = inject(HttpBXServices)

  // // TODO: filter и select позже нормально описать
  // getList(filter: any = {}, select: iWorkgroupFields[] = ['ID', 'NAME']){
  //   return this.httpPost<iHttpAnswerBX<{workgroups: iListWorkgroup[]}>>(
  //     this.url.get,
  //     {
  //       order: select,
  //       filter: filter
  //     }
  //   )
  // }

  get(param: iBXRestParamSonetGroupGet = {}) {
    return this.http.post<iBXRestSonetGroupGetHttp[]>(this.url.get, param)
  }
}
