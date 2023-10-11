import { Injectable } from '@angular/core'
import { $list } from '../../consts/part-name-metods'
import { HttpBXServices } from '../../services/http/HttpBX'
import { iBXRestUserUserField } from '../../typification/rest/user/userfield/list'

@Injectable({
  providedIn: 'root'
})
export class BXRestUserUserfield {

  protected url = {
    list: ['userfield', $list]
  }

  constructor(
    private http: HttpBXServices
  ) {
  }

  list() {
    return this.http.post<iBXRestUserUserField[]>(this.url.list)
  }
}
