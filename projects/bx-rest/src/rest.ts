import { Injectable } from '@angular/core'
import { BXRestUser } from './request/user'
import BXRestLists from './request/lists'
import BXRestListsMap from './map/lists'
import BXRestNavvyLists from './request-navvy/lists'
import { BXRestNavvyTasks } from './request-navvy/tasks'
import { BXRestTasks } from './request/tasks'
import { BXRestNavvyUser } from './request-navvy/user'
import { BXRestDisk } from './request/disk'
import { BXRestNavvyDisk } from './request-navvy/disk'

@Injectable({
  providedIn: 'root'
})
export class BXRest {
  constructor(
    public user: BXRestUser,
    public lists: BXRestLists,
    public tasks: BXRestTasks,
    public disk: BXRestDisk
  ) {
  }
}

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvy {
  constructor(
    public user: BXRestNavvyUser,
    public lists: BXRestNavvyLists,
    public tasks: BXRestNavvyTasks,
    public disk: BXRestNavvyDisk
  ) {
  }
}

@Injectable({
  providedIn: 'root'
})
export class BXRestMap {
  constructor(
    public lists: BXRestListsMap
  ) {
  }
}
