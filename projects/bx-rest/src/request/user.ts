import { iBXRestParamUserGet } from '../typification/rest/user/get'
import { HttpBXServices } from '../services/http/HttpBX'
import { iBXRestUser, iBXRestUserHttp, iBXRestUserHttpField } from '../typification/rest/user/user'
import { Injectable } from '@angular/core'
import { iBXRestParamUserSearch } from '../typification/rest/user/search'
import { BXRestUserUserfield } from './user/userfield'
import { methods } from '../methods'

@Injectable({
  providedIn: 'root'
})
export class BXRestUser {

  protected url = methods.user

  constructor(
    private http: HttpBXServices,
    public userfield: BXRestUserUserfield
  ) {
  }

  admin() {
    return this.http.post<boolean>(this.url.admin)
  }

  get(params: iBXRestParamUserGet = {}) {
    return this.http.post<iBXRestUserHttp[]>
    (
      this.url.get,
      params
    )
  }

  current() {
    return this.http.post<iBXRestUserHttp>(this.url.current, {})
  }

  update(user: Partial<iBXRestUser>) {
    return this.http.post<iBXRestUserHttp[]>(
      this.url.update,
      user
    )
  }

  search(params: iBXRestParamUserSearch) {
    return this.http.post<iBXRestUserHttp[]>(this.url.search, params)
  }

  access(access: string[]) {
    return this.http.post<boolean>(this.url.access, {ACCESS: access})
  }

  fields() {
    return this.http.post<iBXRestUserHttpField>(this.url.fields)
  }
}

