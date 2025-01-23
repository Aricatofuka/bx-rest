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
import { BXRestSocialNetWork } from '../request/socialnetwork'

export class BXRest {
  private readonly http = new HttpBXServices()
  public readonly user = new BXRestUser()
  public readonly lists = new BXRestLists()
  public readonly task = new BXRestTask()
  public readonly tasks = new BXRestTasks()
  public readonly disk = new BXRestDisk()
  public readonly bizProc = new BXRestBizProc()
  public readonly log = new BXRestLog()
  public readonly calendar = new BXRestCalendar()
  public readonly sonet_group = new BXRestSonetGroup()
  public readonly server = new BXRestServer()
  public readonly department = new BXRestDepartment()
  public readonly im = new BXRestIm()
  public readonly app = new BXRestApp()
  public readonly timeMan = new BXRestTimeMan()
  public readonly socialNetWork = new BXRestSocialNetWork()

  public profile() {
    return this.http.post<iBXRestProfileHttp>(['profile'])
  }

  public batch<T>(param: iBXRestParamBatch) {
    return this.http.post<iBXRestBatch<T>>(['batch'], param)
  }
}