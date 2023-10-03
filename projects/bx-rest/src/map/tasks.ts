import { BXRestMapTasksTask } from './tasks/task'
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class BXRestMapTasks {
  constructor(
    public task: BXRestMapTasksTask
  ) {
  }
}
