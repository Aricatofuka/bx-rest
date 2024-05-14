import { Injectable } from '@angular/core'
import { HttpBXServices } from '../services/http/HttpBX'
import { methods } from '../typification/base/methods'


@Injectable({
  providedIn: 'root'
})
export class BXRestServer {

  protected url = methods.server

  constructor(private http: HttpBXServices) {
  }

  time(){
    return this.http.post<string>(this.url.time)
  }
}
