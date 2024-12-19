import { inject, Injectable } from '@angular/core'
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

@Injectable({
  providedIn: 'root'
})
export class BXRest {
  private readonly http = inject(HttpBXServices)
  public readonly user = inject(BXRestUser)
  public readonly lists = inject(BXRestLists)
  public readonly task = inject(BXRestTask)
  public readonly tasks = inject(BXRestTasks)
  public readonly disk = inject(BXRestDisk)
  public readonly bizProc = inject(BXRestBizProc)
  public readonly log = inject(BXRestLog)
  public readonly calendar = inject(BXRestCalendar)
  public readonly sonet_group = inject(BXRestSonetGroup)
  public readonly server = inject(BXRestServer)
  public readonly department = inject(BXRestDepartment)
  public readonly im = inject(BXRestIm)
  public readonly app = inject(BXRestApp)
  public readonly timeMan = inject(BXRestTimeMan)
  public readonly socialNetWork = inject(BXRestSocialNetWork)

  public profile() {
    return this.http.post<iBXRestProfileHttp>(['profile'])
  }

  public batch<T>(param: iBXRestParamBatch<T>) {
    return this.http.post<iBXRestBatch<T>>(['batch'], param)
  }
}