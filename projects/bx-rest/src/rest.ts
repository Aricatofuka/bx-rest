import { Injectable } from '@angular/core'
import { BXRestUser } from './request/user'
import { BXRestLists } from './request/lists'
import { BXRestMapLists } from './map/lists'
import { BXRestTasks } from './request/tasks'
import { BXRestDisk } from './request/disk'
import { BXRestBizProc } from './request/bizproc'
import { BXRestLog } from './request/log'
import { BXRestCalendar } from './request/calendar'
import { BXRestSonetGroup } from './request/sonet_group'
import { BXRestTask } from './request/task'
import { BXRestServer } from './request/server'
import { BXRestDepartment } from './request/department'
import { BXRestIm } from './request/im'
import { BXRestApp } from './request/app'
import { iBXRestProfileHttp } from './typification/rest/profile'
import { BXRestMaps } from './map/rest'
import { BXRestTimeMan } from './request/timeman'
import { BXRestNavvyTimeMan } from './request-navvy/timeman'
import { iBXRestBatch, iBXRestNavvyParamBatch, iBXRestParamBatch } from './typification/rest/batch'
// Navvy
import { BXRestNavvyLists } from './request-navvy/lists'
import { BXRestNavvyTasks } from './request-navvy/tasks'
import { BXRestNavvyUser } from './request-navvy/user'
import { BXRestNavvyDisk } from './request-navvy/disk'
import { BXRestNavvyBizProc } from './request-navvy/bizproc'
import { BXRestNavvyLog } from './request-navvy/log'
import { BXRestNavvyCalendar } from './request-navvy/calendar'
import { BXRestNavvySonetGroup } from './request-navvy/sonet_group'
import { BXRestNavvyTask } from './request-navvy/task'
import { BXRestNavvyServer } from './request-navvy/server'
import { BXRestNavvyDepartment } from './request-navvy/department'
import { BXRestNavvyIm } from './request-navvy/im'
import { BXRestNavvyApp } from './request-navvy/app'
import { HttpBXServices } from './services/http/HttpBX'
import { Navvy } from './services/navvy'


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
    public bizProc: BXRestBizProc,
    public log: BXRestLog,
    public calendar: BXRestCalendar,
    public sonet_group: BXRestSonetGroup,
    public server: BXRestServer,
    public department: BXRestDepartment,
    public im: BXRestIm,
    public app: BXRestApp,
    public timeMan: BXRestTimeMan,
    private http: HttpBXServices,
  ) {
  }

  public profile() {
    return this.http.post<iBXRestProfileHttp>(['profile'])
  }

  public batch<T>(param: iBXRestParamBatch<T>) {
    return this.http.post<iBXRestBatch<T>>(['batch'], param)
  }
}

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvy {

  protected Navvy: Navvy<BXRest, BXRestMaps>

  constructor(
    public user: BXRestNavvyUser,
    public lists: BXRestNavvyLists,
    public task: BXRestNavvyTask,
    public tasks: BXRestNavvyTasks,
    public disk: BXRestNavvyDisk,
    public bizProc: BXRestNavvyBizProc,
    public log: BXRestNavvyLog,
    public calendar: BXRestNavvyCalendar,
    public sonet_group: BXRestNavvySonetGroup,
    public server: BXRestNavvyServer,
    public department: BXRestNavvyDepartment,
    public im: BXRestNavvyIm,
    public app: BXRestNavvyApp,
    public timeMan: BXRestNavvyTimeMan,
    private BXRest: BXRest,
    private BXRestMap: BXRestMaps,
  ) {
    this.Navvy = new Navvy(this.BXRest, this.BXRestMap)
  }

  public profile() {
    return this.Navvy.simple(this.BXRest.profile, this.BXRestMap.profile)
  }

  public batch<T, C, M>(param: iBXRestNavvyParamBatch<T, C, M>) {
    const test = param.cmd
    const modifiedObject = Object.fromEntries(
      Object.entries(param.cmd).map(([key, value]) => {
        let modifiedValue = value.resultVanilla.arguments
        return [key, modifiedValue];
      })
    );

    return this.BXRest.batch({
      halt: param.halt,
      cmd: modifiedObject
    })
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


