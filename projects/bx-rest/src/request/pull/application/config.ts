import { $application, $config, $get, $pull } from '../../../consts/part-name-methods'
import { HttpBXServices } from '../../../services/http/HttpBX'
import { iBXRestPullApplicationConfigGetHttp } from '../../../typification/rest/pull/application/config/get'

export class BXRestPullApplicationConfig {
  private readonly http = new HttpBXServices()

  get() {
    return this.http.post<iBXRestPullApplicationConfigGetHttp>([$pull, $application, $config, $get])
  }
}