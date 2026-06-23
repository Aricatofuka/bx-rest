import { HttpBXServices } from '../services/http/HttpBX'
import {
  iBXRestParamSonetGroupGet, iBXRestSonetGroupGetHttp
} from '../typification/rest/sonet_group/get'
import { $get, $sonet_group } from '../consts/part-name-methods'

export class BXRestSonetGroup {
  protected url = {
    get: [$sonet_group, $get],
  }
  private http = new HttpBXServices()

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
