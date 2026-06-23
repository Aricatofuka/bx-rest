import { HttpBXServices } from '../services/http/HttpBX'
import { $server, $time } from '../consts/part-name-methods'

export class BXRestServer {
  private readonly http = new HttpBXServices()

  protected url = {
    time: [$server, $time],
  }

  time(){
    return this.http.post<string>(this.url.time)
  }
}
