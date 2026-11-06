import { BXRestMapTasksTask } from './tasks/task'

export class BXRestMapTasks {
  // Геттер — по той же причине, что и в BXRestMapTask
  public static get task() {
    return BXRestMapTasksTask
  }
}
