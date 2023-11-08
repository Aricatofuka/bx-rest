import { Injectable } from '@angular/core'
import { BXRestUser } from './request/user'
import { BXRestLists } from './request/lists'
import { BXRestMapLists } from './map/lists'
import { BXRestTasks } from './request/tasks'
import { BXRestDisk } from './request/disk'
import { BXRestBizproc } from './request/bizproc'
import { BXRestLog } from './request/log'
import { BXRestCalendar } from './request/calendar'
import { BXRestSonetGroup } from './request/sonet_group'
import { BXRestTask } from './request/task'
import { BXRestServer } from './request/server'
import { BXRestDepartment } from './request/departments'
import { BXRestIm } from './request/im'
// Navvy
import { BXRestNavvyLists } from './request-navvy/lists'
import { BXRestNavvyTasks } from './request-navvy/tasks'
import { BXRestNavvyUser } from './request-navvy/user'
import { BXRestNavvyDisk } from './request-navvy/disk'
import { BXRestNavvyBizproc } from './request-navvy/bizproc'
import { BXRestNavvyLog } from './request-navvy/log'
import { BXRestNavvyCalendar } from './request-navvy/calendar'
import { BXRestNavvySonetGroup } from './request-navvy/sonet_group'
import { BXRestNavvyTask } from './request-navvy/task'
import { BXRestNavvyServer } from './request-navvy/server'
import { BXRestNavvyDepartment } from './request-navvy/departments'
import { BXRestNavvyIm } from './request-navvy/im'

@Injectable({
  providedIn: 'root'
})
export class BXRest {
  constructor(
    public user: BXRestUser,
    public lists: BXRestLists,
    public task: BXRestTask,
    public tasks: BXRestTasks,
    public disk: BXRestDisk,
    public bizproc: BXRestBizproc,
    public log: BXRestLog,
    public calendar: BXRestCalendar,
    public sonet_group: BXRestSonetGroup,
    public server: BXRestServer,
    public department: BXRestDepartment,
    public im: BXRestIm
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
    public task: BXRestNavvyTask,
    public tasks: BXRestNavvyTasks,
    public disk: BXRestNavvyDisk,
    public bizproc: BXRestNavvyBizproc,
    public log: BXRestNavvyLog,
    public calendar: BXRestNavvyCalendar,
    public sonet_group: BXRestNavvySonetGroup,
    public server: BXRestNavvyServer,
    public department: BXRestNavvyDepartment,
    public im: BXRestNavvyIm
  ) {
  }
}

@Injectable({
  providedIn: 'root'
})
export class BXRestMap {
  constructor(
    public lists: BXRestMapLists
  ) {
  }
}


