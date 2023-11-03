import { Injectable } from '@angular/core'
import {
  $server,
  $time
} from '../consts/part-name-methods'
import { HttpBXServices } from '../services/http/HttpBX'


@Injectable({
  providedIn: 'root'
})
export class BXRestServer {

  protected url = {
    time: [$server, $time]
  }

  constructor(private http: HttpBXServices) {
  }

  time(){
    return this.http.post<string>(this.url.time)
  }
}
