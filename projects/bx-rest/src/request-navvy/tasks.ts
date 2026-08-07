import { BXRestNavvyTasksTask } from './tasks/task'
import { BXRestNavvyTasksFlow, BXRestNavvyTasksTemplate } from './tasks/extended'

export class BXRestNavvyTasks {
  public readonly flow = new BXRestNavvyTasksFlow()
  public readonly task = new BXRestNavvyTasksTask()
  public readonly template = new BXRestNavvyTasksTemplate()
}
