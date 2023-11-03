import { share } from 'rxjs'
import { iBXRestParamUserGet } from '../typification/rest/user/get'
import { HttpBXServices } from '../services/http/HttpBX'
import { iBXRestUser, iBXRestUserHttp, iBXRestUserHttpField } from '../typification/rest/user/user'
import { $get, $search, $update, $user } from '../consts/part-name-methods'
import { Injectable } from '@angular/core'
import { iBXRestAnswer } from '../typification/rest/base/answer'
import { iBXRestParamUserSearch } from '../typification/rest/user/search'
import { BXRestUserUserfield } from './user/userfield'

@Injectable({
  providedIn: 'root'
})
export class BXRestUser {

  protected url = {
    admin: [$user, 'admin'],
    get: [$user, $get],
    current: [$user, 'current'],
    update: [$user, $update],
    search: [$user, $search],
    access: [$user, 'access'], // U1 - пользователь с id =1
    // AU - все авторизованные пользователи
    // D1 - подразделение с id=1
    // G1 - группа с id=1
    fields: [$user, 'fields'],
  }

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

  current(update = false) {
    let request = this.http.post<iBXRestUserHttp>(this.url.current, {})
    if (update) {
      return request
    } else {
      return request.pipe(
        share()
      )
    }
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
    return this.http.post<iBXRestAnswer<boolean> | undefined>(this.url.access, {ACCESS: access})
  }

  fields() {
    return this.http.post<iBXRestAnswer<iBXRestUserHttpField>>(this.url.fields)
  }
}

