import { Injectable } from '@angular/core'
import { BXRestMaps } from '../map/rest'
import { BXRestNavvyUser } from '../request-navvy/user'
import { BXRestNavvyLists } from '../request-navvy/lists'
import { BXRestNavvyTask } from '../request-navvy/task'
import { BXRestNavvyTasks } from '../request-navvy/tasks'
import { BXRestNavvyDisk } from '../request-navvy/disk'
import { BXRestNavvyBizProc } from '../request-navvy/bizproc'
import { BXRestNavvyLog } from '../request-navvy/log'
import { BXRestNavvyCalendar } from '../request-navvy/calendar'
import { BXRestNavvySonetGroup } from '../request-navvy/sonet_group'
import { BXRestNavvyServer } from '../request-navvy/server'
import { BXRestNavvyDepartment } from '../request-navvy/department'
import { BXRestNavvyIm } from '../request-navvy/im'
import { BXRestNavvyApp } from '../request-navvy/app'
import { BXRestNavvyTimeMan } from '../request-navvy/timeman'
import { iBXRestNavvyParamBatch } from '../typification/rest/batch'
import { Navvy } from '../services/navvy'
import { BXRest } from './base'

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