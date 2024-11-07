import { inject, Injectable } from '@angular/core'
import { BXRestTasksTask } from './tasks/task'

@Injectable({
  providedIn: 'root'
})
export class BXRestTasks {
  public readonly task = inject(BXRestTasksTask)
}

