import { BXRestMap } from '../map/rest'
import { Navvy } from '../services/navvy'

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
import { BXRestNavvySocialNetWork } from '../request-navvy/socialnetwork'
import { BXRestNavvyPull } from '../request-navvy/pull'

export class BXRestNavvy {
  public readonly user = new BXRestNavvyUser()
  public readonly lists = new BXRestNavvyLists()
  public readonly task = new BXRestNavvyTask()
  public readonly tasks = new BXRestNavvyTasks()
  public readonly disk = new BXRestNavvyDisk()
  public readonly bizProc = new BXRestNavvyBizProc()
  public readonly log = new BXRestNavvyLog()
  public readonly calendar = new BXRestNavvyCalendar()
  public readonly sonet_group = new BXRestNavvySonetGroup()
  public readonly server = new BXRestNavvyServer()
  public readonly department = new BXRestNavvyDepartment()
  public readonly im = new BXRestNavvyIm()
  public readonly app = new BXRestNavvyApp()
  public readonly timeMan = new BXRestNavvyTimeMan()
  public readonly socialNetWork = new BXRestNavvySocialNetWork()
  public readonly pull = new BXRestNavvyPull()
  public readonly Navvy = new Navvy()

  public profile() {
    return this.Navvy.simple(['profile'], BXRestMap.profile)
  }

  // public batch<T, C, M>(param: iBXRestNavvyParamBatch<T, C, M>) {
  //   const modifiedObject = Object.fromEntries(
  //     Object.entries(param.cmd).map(([key, value]) => {
  //       let modifiedValue = value.resultVanilla.arguments
  //       return [key, modifiedValue]
  //     })
  //   )
  //
  //   return this.BXRest.batch({
  //     halt: param.halt,
  //     cmd: modifiedObject
  //   })
  // }
}