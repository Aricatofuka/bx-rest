import { share, throwError } from 'rxjs'
import clone from 'just-clone'
import { iBXRestParamUserGet } from '../typification/rest/user/get'
import { HttpBXServices } from '../services/http/HttpBX'
import UserFilterSearch from '../typification/rest/user/UserFilterSearch'
import { iBXRestUser, iBXRestUserHttp, iBXRestUserHttpField } from '../typification/rest/user/user'
import { $get, $list, $search, $update, $user } from '../consts/part-name-metods'
import { Injectable } from '@angular/core'
import { iBXRestAnswer } from '../typification/rest/base/answer'
import { BXRestUserMap } from '../map/user'

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
    userfield: {
      list: [$user, 'userfield', $list]
    }
  }

  def: { params: { ACTIVE: 1, start: 0 } } = {
    params: {ACTIVE: 1, start: 0}
  }

  constructor(
    private http: HttpBXServices,
    private BXRestUserMap: BXRestUserMap
  ) {
  }

  admin() {
    return this.http.get<boolean>(this.url.admin)
  }

  get(params: iBXRestParamUserGet = {}) {
    let copyParams = clone(params)
    this.setDefParam(copyParams)
    return this.http.post<iBXRestUserHttp[]>
    (
      this.url.get,
      copyParams
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

  search(params: string | UserFilterSearch) {
    if (typeof params === 'string') {
      params = {FIND: params}
    }
    if (typeof params.ACTIVE !== 'boolean') {
      params.ACTIVE = true
    }
    return this.http.get<iBXRestAnswer<iBXRestUserHttp[]>>(
      this.url.search,
      params
    )
  }

  access(access: string[]) {
    return this.http.get<iBXRestAnswer<boolean> | undefined>(this.url.access, {ACCESS: access})
  }

  fields() {
    return this.http.get<iBXRestAnswer<iBXRestUserHttpField>>(this.url.fields)
  }

  private setDefParam(params: iBXRestParamUserGet) {
    if(!params.FILTER) {
      params.FILTER = {}
    }

    if (!params.hasOwnProperty('ACTIVE')) {
      params.FILTER.ACTIVE = this.def.params.ACTIVE
    }
    if (params.FILTER.ACTIVE && params.FILTER.ACTIVE === 2) {
      delete params.FILTER.ACTIVE
    }
    if (!params.hasOwnProperty('start')) {
      params.start = this.def.params.start
    }

    if (params.FILTER.UF_DEPARTMENT && !params.FILTER.UF_DEPARTMENT.length) {
      delete params.FILTER.UF_DEPARTMENT
    }
  }
}

