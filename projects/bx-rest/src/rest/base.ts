import { Injectable } from '@angular/core'
import { BXRestUser } from '../request/user'
import { BXRestLists } from '../request/lists'
import { BXRestTask } from '../request/task'
import { BXRestTasks } from '../request/tasks'
import { BXRestDisk } from '../request/disk'
import { BXRestBizProc } from '../request/bizproc'
import { BXRestLog } from '../request/log'
import { BXRestCalendar } from '../request/calendar'
import { BXRestSonetGroup } from '../request/sonet_group'
import { BXRestServer } from '../request/server'
import { BXRestDepartment } from '../request/department'
import { BXRestIm } from '../request/im'
import { BXRestApp } from '../request/app'
import { BXRestTimeMan } from '../request/timeman'
import { HttpBXServices } from '../services/http/HttpBX'
import { iBXRestProfileHttp } from '../typification/rest/profile'
import { iBXRestBatch, iBXRestParamBatch } from '../typification/rest/batch'

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