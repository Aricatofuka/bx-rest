import { Injectable } from '@angular/core'
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
  constructor(
    public user: BXRestMapUser,
    public sonet_group: BXRestMapSonetGroup,
    public server: BXRestMapServer,
    public lists: BXRestMapLists,
    public disk: BXRestDisk,
    public calendar: BXRestMapCalendar,
    public log: BXRestMapLog,
    public task: BXRestMapTask,
    public tasks: BXRestMapTasks,
  ) {
  }
}
