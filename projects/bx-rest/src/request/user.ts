import { Observable, of } from 'rxjs'
import { first, map, mergeMap, tap } from 'rxjs/operators'
import clone from 'just-clone'
import { iBXGetParam } from '../typification/rest/user/get'
import HttpBXServices from '../services/http/HttpBX'
import UserFilterSearch from '../typification/rest/user/UserFilterSearch'
import { Store } from '@ngrx/store'
import { saveArr, saveSelf, storeUsers } from '../store/users'
import { DatePipe } from '@angular/common'
import { BitrixApiUserMapServices } from '../services/map/rest/user'
// import DateTrace from 'bx-rest/services/api/trace/metods/date'
import SnackBarService from '../services/snack-bar/snack-bar.service'
import iHttpAnswerBX from '../typification/rest/base/httpAnswerBX'
import { iBXRestUser, iBXRestUserHttp, iBXRestUserHttpField } from '../typification/rest/user/user'
import { $get, $list, $search, $update, $user } from '../consts/part-name-metods'
import { Injectable } from '@angular/core'
import { mapResult } from '../functions/mapResult'

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

  user$: Observable<storeUsers>

  constructor(
    private http: HttpBXServices,
    private snackBar: SnackBarService,
    // private img: ImgServices,
    //private dateTrace: DateTrace,
    private store: Store<{ users: storeUsers }>,
    private userMap: BitrixApiUserMapServices,
    private datePipe: DatePipe
  ) {
    this.user$ = this.store.select('users')
  }

  admin() {
    return this.http.get<iHttpAnswerBX<boolean>>(this.url.admin)
  }

  get(params: iBXGetParam = {}): Observable<iHttpAnswerBX<iBXRestUserHttp[]> | undefined> {
    let copyParams = clone(params)
    this.setDefParam(copyParams)
    return this.http.post<iHttpAnswerBX<iBXRestUserHttp[]> | undefined>
    (this.url.get, copyParams, 'Не удалось получить пользователей')
      .pipe(
        tap(v => {
          if (v && v.result) {
            this.saveArrUser(v.result)
          }
        })
      )
  }

  current(update = false) {
    if (update) {
      return this.getSelfHttp()
    } else {
      return this.user$.pipe(
        mergeMap(v => {
          if (v && v.self) {
            return of(v.self)
          } else {
            return this.getSelfHttp()
          }
        }),
        first()
      )
    }
  }

  private getSelfHttp() {
    return this.http.get<iHttpAnswerBX<iBXRestUserHttp>>
    (this.url.current, {}, 'Не удалось получить пользователя')
      .pipe(
        map(v => {
          if (v && v.result) {
            return this.userMap.HttpToBX(v.result)
          }
          return undefined
        }),
        tap(v => {
          if (v) {
            this.store.dispatch(saveSelf({self: v}))
          }
        }),
      )
  }

  access(access: string[], textError = 'Не удалось получить права') {
    return this.http.get<iHttpAnswerBX<boolean> | undefined>(this.url.access, {ACCESS: access}, textError)
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

  private saveArrUser(users: iBXRestUserHttp[]) {
    let result: iBXRestUser [] = []
    for (const user of users) {
      result.push(this.userMap.HttpToBX(user))
    }
    this.store.dispatch(saveArr({arr: result}))

    return result
  }

  search(params: string | UserFilterSearch) {
    if (typeof params === 'string') {
      params = {FIND: params}
    }
    if (typeof params.ACTIVE !== 'boolean') {
      params.ACTIVE = true
    }
    return this.http.get<iHttpAnswerBX<iBXRestUserHttp[]>>(
      this.url.search,
      params,
      'Сервер не отвечает на запрос поиска'
    )
  }

  fields() {
    return this.http.get<iHttpAnswerBX<iBXRestUserHttpField>>(this.url.fields)
  }

  update(user: iBXRestUser, fieldUpdate: string[]) {
    if (fieldUpdate && fieldUpdate.length) {
      let sendData: any = {
        ID: user.ID,
      }
      const userBX = this.userMap.BXtoHttp(user)
      for (const field of fieldUpdate) {
        if (userBX[field]) {
          sendData[field] = userBX[field]
        } else {
          this.snackBar.error('Одно из указанных полей отправлено не верно')
        }
      }
      return this.http.post<iHttpAnswerBX<iBXRestUserHttp[]>>(
        this.url.update, sendData,
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

@Injectable({
  providedIn: 'root'
})
export class BXRestUserRes extends new Proxy(BXRestUser, {
  get(target, prop, receiver) {
    const res = Reflect.get(target, prop, receiver)
    if(res in Observable){
      return Reflect.get(target, prop, receiver).pipe(
        // @ts-ignore
        map(v => mapResult(v))
      )
    }

    return res
  }
}){}

