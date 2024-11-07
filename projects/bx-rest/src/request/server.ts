import { inject, Injectable } from '@angular/core'
import { HttpBXServices } from '../services/http/HttpBX'
import { methods } from '../typification/base/methods'

@Injectable({
  providedIn: 'root'
})
export class BXRestServer {
  private readonly http = inject(HttpBXServices)

  protected url = methods.server

  time(){
    return this.http.post<string>(this.url.time)
  }
}
