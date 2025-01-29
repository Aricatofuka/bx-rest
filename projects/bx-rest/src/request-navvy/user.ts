import { Navvy } from '../services/navvy'
import { iBXRestParamUserGet } from '../typification/rest/user/get'
import clone from 'just-clone'
import { iBXRestParamUserSearch } from '../typification/rest/user/search'
import { BXRestNavvyUserUserfield } from './user/userfield'
import { BXRestMapUser } from '../map/user'
import { $get, $search, $update, $user } from '../consts/part-name-methods'
import { iBXRestUser, iBXRestUserHttp } from '../typification/rest/user/user'

export class BXRestNavvyUser {
  def: { params: { ACTIVE: boolean, start: 0 } } = {
    params: {ACTIVE: true, start: 0}
  }
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

  public readonly userField = new BXRestNavvyUserUserfield()
  private readonly Navvy = new Navvy()

  admin() {
    return this.Navvy.simple<boolean>(
      this.url.admin
    )
  }

  get(params: iBXRestParamUserGet = {}){
    let copyParams = clone(params)
    this.setDefParam(copyParams)

    return this.Navvy.pagNav(
      this.url.get,
      copyParams,
      BXRestMapUser.get)
  }

  current() {
    return this.Navvy.simple<iBXRestUserHttp, iBXRestUser>(
      this.url.current,
      undefined,
      BXRestMapUser.current
    )
  }

  /*
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
    return this.Navvy.simple(
      this.BXRestUser.update(user, fieldUpdate),
      'Не удалось обновить пользователя с ID' + user.ID
    )
  }
  */
  search(params: iBXRestParamUserSearch) {
    return this.Navvy.pagNav(
      this.url.search,
      params,
      BXRestMapUser.get
    )
  }

  access(params: string[]) {
    return this.Navvy.simple(
      this.url.access,
      params,
    )
  }

  fields() {
    return this.Navvy.simple(this.url.fields)
  }

  // getAll(params: iBXGetParam = {}): Observable<iBXRestUser [] | undefined> {
  //   if (!Object.keys(params).length) {
  //     params = clone(this.def.params)
  //   }
  //
  //   const saveAllUser = compare(params, this.def.params)
  //   return this.user$.pipe(
  //     take(1),
  //     mergeMap(v => {
  //       if (v.load.all) {
  //         if (compare(this.def.params, params)) {
  //           return of(clone(v.data))
  //         }
  //       }
  //
  //       return this.getEndArray(params).pipe(
  //         take(1),
  //         map(v => {
  //           if (v && v.result) {
  //             let cl = clone(v.result)
  //             return this.saveArrUser(cl)
  //           }
  //           return undefined
  //         }),
  //       )
  //     }),
  //     tap(v => {
  //       if (v && v.length && saveAllUser) {
  //         this.store.dispatch(loadAll({load: true}))
  //       }
  //       params.start = this.def.params.start
  //     })
  //   )
  // }

  // private saveArrUser(users: iBXRestUserHttp[]) {
  //   let result: iBXRestUser [] = []
  //   for (const user of users) {
  //     result.push(this.userMap.HttpToBX(user))
  //   }
  //   this.store.dispatch(saveArr({arr: result}))
  //
  //   return result
  // }

  // getEndArray(params: UserFilter = {}): Observable<iHttpAnswerBX<iBXRestUserHttp[]> | undefined> {
  //   return this.get(params).pipe(
  //     mergeMap(items => {
  //       if (items && items.result && typeof items.result === 'object') {
  //         if (items.next) {
  //           params.start = items.next
  //           return this.getEndArray(params).pipe(map(vEnd => {
  //             if (vEnd && items.result && vEnd.result) {
  //               return {result: [...items.result, ...vEnd.result]}
  //             }
  //             return (items) ? items : undefined
  //           }))
  //         }
  //         return of(items)
  //       } else {
  //         return of(undefined)
  //       }
  //     }),
  //   )
  // }

  private setDefParam(params: iBXRestParamUserGet) {
    if(!params.FILTER) {
      params.FILTER = {}
    }

    if (!Object.prototype.hasOwnProperty.call(params.FILTER, 'ACTIVE')) {
      params.FILTER.ACTIVE = this.def.params.ACTIVE
    }

    if (!Object.prototype.hasOwnProperty.call(params, 'start')) {
      params.start = this.def.params.start
    }

    if (params.FILTER.UF_DEPARTMENT && !params.FILTER.UF_DEPARTMENT.length) {
      delete params.FILTER.UF_DEPARTMENT
    }
  }

}

