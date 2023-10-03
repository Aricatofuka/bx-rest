import { of, tap } from 'rxjs'
import { map } from 'rxjs/operators'
import { Injectable } from '@angular/core'
import { BXRestUser } from '../request/user'
import { Navvy } from '../services/navvy'
import { iBXRestUserHttp } from '../typification/rest/user/user'
import { SessionStorage } from '../services/vanilla/sessionStorage'
import { iBXRestAnswer } from '../typification/rest/base/answer'
import { iBXRestParamUserGet } from '../typification/rest/user/get'
import clone from 'just-clone'
import { iBXRestParamUserSearch } from '../typification/rest/user/search'
import { BXRestNavvyUserUserfield } from './user/userfield'
import { BXRestMapUser } from '../map/user'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyUser {

  def: { params: { ACTIVE: 1, start: 0 } } = {
    params: {ACTIVE: 1, start: 0}
  }

  private Navvy: Navvy<BXRestUser, BXRestMapUser>

  constructor(
    private BXRestUserMap: BXRestMapUser,
    private BXRestUser: BXRestUser,
    public userfield: BXRestNavvyUserUserfield
  ) {
    this.Navvy = new Navvy(this.BXRestUser, this.BXRestUserMap)
  }

  admin() {
    return this.Navvy.simple(
      this.BXRestUser.admin,
      'Информация о возможных принадлежности человека к администратору не получена'
    )
  }

  get(params: iBXRestParamUserGet = {}){
    let copyParams = clone(params)
    this.setDefParam(copyParams)

    return this.Navvy.PagNav(
      this.BXRestUser.get,
      copyParams,
      'Не удалось получить пользователей',
      this.BXRestUserMap.get
    )
  }

  current(update = false) {
    return this.Navvy.simpleWithArg(
      this.self,
      update,
      '',
      this.BXRestUserMap.current
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
  search(params: string | iBXRestParamUserSearch) {
    if (typeof params === 'string') {
      params = {FIND: params}
    }
    if (typeof params.ACTIVE !== 'boolean') {
      params.ACTIVE = true
    }
    return this.Navvy.PagNav(
      this.BXRestUser.search,
      params,
      'Сервер не отвечает на запрос поиска',
      this.BXRestUserMap.get
    )
  }

  access(params: string[]) {
    return this.Navvy.simpleWithArg(
      this.BXRestUser.access,
      params,
      'Не удалось получить права'
    )
  }

  fields() {
    return this.Navvy.simple(this.BXRestUser.fields, 'Не удалось поля')
  }

  private self(update = false) {
    if (update) {
      return this.BXRestUser.current(update)
    } else {
      let self = SessionStorage.getItem(this.constructor.name + this.self.name) as iBXRestUserHttp
      if (self) {
        return of({result: self} as iBXRestAnswer<iBXRestUserHttp>)
      }
      return this.BXRestUser.current(update)
        .pipe(
          map(v => {
            if (v) {
              return v
            }
            return undefined
          }),
          tap(v => {
            if (v) {
              SessionStorage.setItem(this.constructor.name + this.self.name, v)
            }
          }),
        )
    }
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

