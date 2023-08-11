import { Injectable } from '@angular/core'
import { BXRestUser } from './request/user'
import BXRestLists from './request/lists'
import { Observable } from 'rxjs';
import { mapResult } from './functions/mapResult';
import { map } from 'rxjs/operators';
// import { Observable } from 'rxjs'
// import BXRestListsElementMap from './map/lists/element'
// import { map } from 'rxjs/operators'
// import { mapResult } from './functions/mapResult'

@Injectable({
  providedIn: 'root'
})
export class BXRestBase {
  constructor(
    public user: BXRestUser,
    public lists: BXRestLists
  ) {
  }
}

@Injectable({
  providedIn: 'root'
})
export class BXRest extends new Proxy(BXRestBase, {
  get(target, prop, receiver) {
    const res = Reflect.get(target, prop, receiver)
    console.log('res', res)
    if (res in Observable) {
      // let mapRes = new BXRestListsElementMap()
      // console.log('res', res)
      return Reflect.get(target, prop, receiver).pipe(
        // @ts-ignore
        map(v => (v && v.result)
          // @ts-ignore
          ? Object.assign(v, {result: v.result.map(i => mapRes.get(i))})
          : undefined
        ),
        // @ts-ignore
        map(v => mapResult(v))
      )
    }
    return res
  }
}) {
}
