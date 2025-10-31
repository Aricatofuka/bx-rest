import { HttpBXServices } from '../../services/http/HttpBX'
import { $config, $get, $pull } from '../../consts/part-name-methods'
import { iBXRestPullConfigGetHttp } from '../../typification/rest/pull/config/get'
import { BXRestPullApplicationConfig } from './application/config'

export class BXRestPullConfig {
  private readonly http = new HttpBXServices()
  public readonly config = new BXRestPullApplicationConfig()

  get() {
    return this.http.post<iBXRestPullConfigGetHttp>([$pull, $config, $get])
  }
}