import { inject, Injectable } from '@angular/core'
import { BXRestMapUser } from './map/user'
import { BXRestMapSonetGroup } from './map/sonet_group'
import { BXRestMapServer } from './map/server'
import { BXRestMapLists } from './map/lists'
import { BXRestDisk } from './request/disk'
import { BXRestMapCalendar } from './map/calendar'
import { BXRestMapLog } from './map/log'
import { BXRestMapTask } from './map/task'
import { BXRestMapTasks } from './map/tasks'

@Injectable({
  providedIn: 'root'
})
export class Map {
  public readonly user = inject(BXRestMapUser)
  public readonly sonet_group = inject(BXRestMapSonetGroup)
  public readonly server = inject(BXRestMapServer)
  public readonly lists = inject(BXRestMapLists)
  public readonly disk = inject(BXRestDisk)
  public readonly calendar = inject(BXRestMapCalendar)
  public readonly log = inject(BXRestMapLog)
  public readonly task = inject(BXRestMapTask)
  public readonly tasks = inject(BXRestMapTasks)
}
