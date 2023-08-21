import { Injectable } from '@angular/core'
import { BXRestTasksTask } from './tasks/task'

@Injectable({
  providedIn: 'root'
})
export class BXRestTasks {

  constructor(
    public task: BXRestTasksTask,
  ) {
  }

}

