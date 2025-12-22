import { iBXRestParamUserGet } from '../typification/rest/user'
import { HttpBXServices } from '../services/http/HttpBX'
import { iBXRestUserHttp, iBXRestUserHttpField } from '../typification/rest/user'
import { iBXRestParamUserSearch } from '../typification/rest/user'
import { BXRestUserUserfield } from './user/userfield'
import { methods } from '../typification/base/methods'

export class BXRestUser {
  private readonly http = new HttpBXServices()
  public readonly userfield = new BXRestUserUserfield()

  protected url = methods.user

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

  update(user: iBXRestParamUserGet) {
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

