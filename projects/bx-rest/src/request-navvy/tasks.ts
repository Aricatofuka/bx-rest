import { inject, Injectable } from '@angular/core'
import { BXRestNavvyTasksTask } from './tasks/task'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyTasks {
  public readonly task = inject(BXRestNavvyTasksTask)
}
