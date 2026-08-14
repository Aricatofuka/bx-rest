import { BXRestNavvyTasksTask } from './tasks/task'
import { BXRestNavvyTasksFlow, BXRestNavvyTasksTemplate } from './tasks/extended'

export class BXRestNavvyTasks {
  /**
   * Потоки задач (`tasks.flow.*`).
   */
  public readonly flow = new BXRestNavvyTasksFlow()
  /**
   * Задачи (`tasks.task.*`).
   */
  public readonly task = new BXRestNavvyTasksTask()
  /**
   * Шаблоны задач (`tasks.template.*`).
   */
  public readonly template = new BXRestNavvyTasksTemplate()
}
