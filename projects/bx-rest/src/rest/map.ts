import { BXRestMapLists } from '../map/lists'
import { BXRestMapUser } from '../map/user'
import { BXRestMapSonetGroup } from '../map/sonet_group'
import { BXRestMapServer } from '../map/server'
import { BXRestDisk } from '../request/disk'
import { BXRestMapCalendar } from '../map/calendar'
import { BXRestMapLog } from '../map/log'
import { BXRestMapTask } from '../map/task'
import { BXRestMapTasks } from '../map/tasks'

export class BXRestMap {
  public get user() {
    return BXRestMapUser;
  }

  public get sonet_group() {
    return BXRestMapSonetGroup;
  }

  public get server() {
    return BXRestMapServer;
  }

  public get lists() {
    return BXRestMapLists;
  }

  public get disk() {
    return BXRestDisk;
  }

  public get calendar() {
    return BXRestMapCalendar;
  }

  public get log() {
    return BXRestMapLog;
  }

  public get task() {
    return BXRestMapTask;
  }

  public get tasks() {
    return BXRestMapTasks;
  }
}