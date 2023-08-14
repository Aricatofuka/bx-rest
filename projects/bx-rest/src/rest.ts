import { Injectable } from '@angular/core'
import { BXRestUser } from './request/user'
import BXRestLists from './request/lists'
import BXRestListsMap from './map/lists'

@Injectable({
  providedIn: 'root'
})
export class BXRest {
  constructor(
    public user: BXRestUser,
    public lists: BXRestLists
  ) {
  }
}

export class BXRestMap {
  constructor(
    public lists: BXRestListsMap
  ) {
  }
}
