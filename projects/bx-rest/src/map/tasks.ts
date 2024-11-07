import { BXRestMapTasksTask } from './tasks/task'
import { inject, Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class BXRestMapTasks {
  public readonly task = inject(BXRestMapTasksTask)
}
