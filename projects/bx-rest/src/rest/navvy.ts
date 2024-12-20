import { inject, Injectable } from '@angular/core'
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
import { BXRestNavvySocialNetWork } from '../request-navvy/socialnetwork';

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvy {
  public readonly user = inject(BXRestNavvyUser)
  public readonly lists = inject(BXRestNavvyLists)
  public readonly task = inject(BXRestNavvyTask)
  public readonly tasks = inject(BXRestNavvyTasks)
  public readonly disk = inject(BXRestNavvyDisk)
  public readonly bizProc = inject(BXRestNavvyBizProc)
  public readonly log = inject(BXRestNavvyLog)
  public readonly calendar = inject(BXRestNavvyCalendar)
  public readonly sonet_group = inject(BXRestNavvySonetGroup)
  public readonly server = inject(BXRestNavvyServer)
  public readonly department = inject(BXRestNavvyDepartment)
  public readonly im = inject(BXRestNavvyIm)
  public readonly app = inject(BXRestNavvyApp)
  public readonly timeMan = inject(BXRestNavvyTimeMan)
  private readonly BXRest = inject(BXRest)
  public readonly socialNetWork = inject(BXRestNavvySocialNetWork)
  private readonly BXRestMap = inject(BXRestMaps)
  private readonly Navvy = new Navvy(this.BXRest, this.BXRestMap)

  public profile() {
    return this.Navvy.simple(this.BXRest.profile, this.BXRestMap.profile)
  }

  public batch<T, C, M>(param: iBXRestNavvyParamBatch<T, C, M>) {
    const modifiedObject = Object.fromEntries(
      Object.entries(param.cmd).map(([key, value]) => {
        let modifiedValue = value.resultVanilla.arguments
        return [key, modifiedValue]
      })
    )

    return this.BXRest.batch({
      halt: param.halt,
      cmd: modifiedObject
    })
  }
}