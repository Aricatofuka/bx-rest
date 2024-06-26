import { Injectable } from '@angular/core'
import { HttpBXServices } from '../../services/http/HttpBX'
import { iBXRestUserUserField } from '../../typification/rest/user/userfield/list'
import { methods } from '../../typification/base/methods'

@Injectable({
  providedIn: 'root'
})
export class BXRestUserUserfield {

  protected url = methods.user.userfield

  constructor(
    private http: HttpBXServices
  ) {
  }

  list() {
    return this.http.post<iBXRestUserUserField[]>(this.url.list)
  }
}
