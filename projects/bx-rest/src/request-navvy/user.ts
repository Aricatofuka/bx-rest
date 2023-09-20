import { of, tap } from 'rxjs'
import { map } from 'rxjs/operators'
import { Injectable } from '@angular/core'
import { BXRestUser } from '../request/user'
import { BXRestUserMap } from '../map/user'
import { iBXRestParamUserGet } from '../typification/rest/user/get'
import { Navvy } from '../services/navvy'
import { iBXRestUser } from '../typification/rest/user/user'
import UserFilterSearch from '../typification/rest/user/UserFilterSearch'
import { SessionStorage } from '../services/vanilla/sessionStorage';


@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyUser {

  constructor(
    private BXRestUser: BXRestUser,
    private BXRestUserMap: BXRestUserMap,
    private Navvy: Navvy,
  ) {
  }

  get(params: iBXRestParamUserGet = {}) {
    return this.Navvy.mapAndSnackBarError(this.BXRestUser.get(params), 'Не удалось получить пользователей')
  }

  current(update = false) {
    if (update) {
      return this.self()
    } else {
      let self = SessionStorage.getItem(this.constructor.name + this.self.name) as iBXRestUser
      if(self){
        return of(self)
      }
      return this.self()
    }
  }

  update(user: iBXRestUser, fieldUpdate: string[]) {
    return this.Navvy.mapAndSnackBarError(
      this.BXRestUser.update(user, fieldUpdate),
      'Не удалось обновить пользователя с ID' + user.ID
    )
  }

  private self() {
    return this.Navvy.mapAndSnackBarError(this.BXRestUser.current(), 'Не удалось получить пользователя')
      .pipe(
        map(v => {
          if (v) {
            return this.BXRestUserMap.current(v)
          }
          return undefined
        }),
        tap(v => {
          if (v) {
            SessionStorage.setItem(this.constructor.name + this.self.name, v);
          }
        }),
      )
  }

  search(params: string | UserFilterSearch) {
    return this.Navvy.mapAndSnackBarError(this.BXRestUser.search(params), 'Сервер не отвечает на запрос поиска')
  }

  access(access: string[]) {
    return this.Navvy.mapAndSnackBarError(this.BXRestUser.access(access), 'Не удалось получить права')
  }

  fields() {
    return this.Navvy.mapAndSnackBarError(this.BXRestUser.fields(), 'Не удалось поля')
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

}
