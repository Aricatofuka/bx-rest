import { share, throwError } from 'rxjs'
import { iBXRestParamUserGet } from '../typification/rest/user/get'
import { HttpBXServices } from '../services/http/HttpBX'
import { iBXRestUser, iBXRestUserHttp, iBXRestUserHttpField } from '../typification/rest/user/user'
import { $get, $search, $update, $user } from '../consts/part-name-metods'
import { Injectable } from '@angular/core'
import { iBXRestAnswer } from '../typification/rest/base/answer'
import { BXRestUserMap } from '../map/user'
import { iBXRestParamUserSearch } from '../typification/rest/user/search'
import { BXRestUserUserfield } from './user/userfield'

@Injectable({
  providedIn: 'root'
})
export class BXRestUser {

  url = {
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
    private BXRestUserMap: BXRestUserMap,
    public userfield: BXRestUserUserfield
  ) {
  }

  admin() {
    return this.http.get<boolean>(this.url.admin)
  }

  get(params: iBXRestParamUserGet = {}) {
    return this.http.post<iBXRestUserHttp[]>
    (
      this.url.get,
      params
    )
  }

  current(update = false) {
    let request = this.http.get<iBXRestUserHttp>(this.url.current, {})
    if(update) {
      return request
    } else {
      return request.pipe(
        share()
      )
    }
  }

  update(user: iBXRestUser, fieldUpdate: string[]) {
    if (fieldUpdate && fieldUpdate.length) {
      let sendData: any = {
        ID: user.ID,
      }
      const userBX = this.BXRestUserMap.BXtoHttp(user)
      for (const field of fieldUpdate) {
        if (userBX[field]) {
          sendData[field] = userBX[field]
        } else {
          return throwError(() => 'One sent field is empty')
        }
      }
      return this.http.post<iBXRestUserHttp[]>(
        this.url.update,
        sendData
      )
    } else {
      return throwError(() => 'All sent field for edit is empty')
    }
  }

  search(params: iBXRestParamUserSearch) {
    return this.http.get<iBXRestUserHttp[]>(this.url.search, params)
  }

  access(access: string[]) {
    return this.http.get<iBXRestAnswer<boolean> | undefined>(this.url.access, {ACCESS: access})
  }

  fields() {
    return this.http.get<iBXRestAnswer<iBXRestUserHttpField>>(this.url.fields)
  }
}

