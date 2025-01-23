import { HttpBXServices } from '../services/http/HttpBX'
import { methods } from '../typification/base/methods'

export class BXRestServer {
  private readonly http = new HttpBXServices()

  protected url = methods.server

  time(){
    return this.http.post<string>(this.url.time)
  }
}
