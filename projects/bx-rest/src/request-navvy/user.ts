import { Observable, of, tap } from 'rxjs'
import { first, map, mergeMap } from 'rxjs/operators'
import { Store } from '@ngrx/store'
import { saveSelf, storeUsers } from '../store/users'
import { Injectable } from '@angular/core'
import { BXRestUser } from '../request/user'
import { BXRestUserMap } from '../map/user'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyUser {

  user$: Observable<storeUsers>

  constructor(
    private BXRestUser: BXRestUser,
    private store: Store<{ users: storeUsers }>,
    private BXRestUserMap: BXRestUserMap
  ) {
    this.user$ = this.store.select('users')
  }

  current(update = false) {
    if (update) {
      return this.self()
    } else {
      return this.user$.pipe(
        mergeMap(v => {
          if (v && v.self) {
            return of(v.self)
          } else {
            return this.self()
          }
        }),
        first()
      )
    }
  }

  private self() {
    return this.BXRestUser.current()
      .pipe(
        map(v => {
          if (v && v.result) {
            return this.BXRestUserMap.current(v.result)
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

}

