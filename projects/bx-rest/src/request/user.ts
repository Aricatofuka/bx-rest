import { of } from 'rxjs'
import clone from 'just-clone'
import { iBXGetParam } from '../typification/rest/user/get'
import HttpBXServices from '../services/http/HttpBX'
import UserFilterSearch from '../typification/rest/user/UserFilterSearch'
// import DateTrace from 'bx-rest/services/api/trace/metods/date'
import SnackBarService from '../services/snack-bar/snack-bar.service'
import { iBXRestUser, iBXRestUserHttp, iBXRestUserHttpField } from '../typification/rest/user/user'
import { $get, $list, $search, $update, $user } from '../consts/part-name-metods'
import { Injectable } from '@angular/core'
import { iBXRestAnswer } from '../typification/rest/base/answer'

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
    private snackBar: SnackBarService,
    // private img: ImgServices,
    //private dateTrace: DateTrace,
    // private userMap: BitrixApiUserMapServices,
  ) {
  }

  admin() {
    return this.http.get<boolean>(this.url.admin)
  }

  get(params: iBXGetParam = {}) {
    let copyParams = clone(params)
    this.setDefParam(copyParams)
    return this.http.post<iBXRestUserHttp[]>
    (
      this.url.get,
      copyParams,
      'Не удалось получить пользователей'
    )
      // .pipe(
      //   tap(v => {
      //     if (v && v.result) {
      //       this.saveArrUser(v.result)
      //     }
      //   })
      // )
  }

  current() {
    return this.http.get<iBXRestUserHttp>
    (this.url.current, {}, 'Не удалось получить пользователя')
  }

  access(access: string[], textError = 'Не удалось получить права') {
    return this.http.get<iBXRestAnswer<boolean> | undefined>(this.url.access, {ACCESS: access}, textError)
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

  search(params: string | UserFilterSearch) {
    if (typeof params === 'string') {
      params = {FIND: params}
    }
    if (typeof params.ACTIVE !== 'boolean') {
      params.ACTIVE = true
    }
    return this.http.get<iBXRestAnswer<iBXRestUserHttp[]>>(
      this.url.search,
      params,
      'Сервер не отвечает на запрос поиска'
    )
  }

  fields() {
    return this.http.get<iBXRestAnswer<iBXRestUserHttpField>>(this.url.fields)
  }

  update(user: iBXRestUser, fieldUpdate: string[]) {
    if (fieldUpdate && fieldUpdate.length) {
      let sendData: any = {
        ID: user.ID,
      }
      // const userBX = this.userMap.BXtoHttp(user)
      // for (const field of fieldUpdate) {
      //   if (userBX[field]) {
      //     sendData[field] = userBX[field]
      //   } else {
      //     this.snackBar.error('Одно из указанных полей отправлено не верно')
      //   }
      // }
      return this.http.post<iBXRestUserHttp[]>(
        this.url.update,
        sendData,
        'Не удалось обновить пользователя с ID' + user.ID
      )
    } else {
      this.snackBar.error('Не указано ни одно поле для редактирования пользователя')
      return of({})
    }
  }

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

   private setDefParam(params: iBXGetParam) {
    if (!params.hasOwnProperty('ACTIVE')) {
      params.ACTIVE = this.def.params.ACTIVE
    }
    if (params.ACTIVE && params.ACTIVE === 2) {
      delete params.ACTIVE
    }
    if (!params.hasOwnProperty('start')) {
      params.start = this.def.params.start
    }

    if (params.UF_DEPARTMENT && !params.UF_DEPARTMENT.length) {
      delete params.UF_DEPARTMENT
    }
  }
}

