import { Navvy } from '../../../services/navvy'
import { iBXRestTasksObject, iBXRestTasksParams } from '../../../typification/rest/tasks'
import { $attach, $file, $task, $tasks } from '../../../consts/part-name-methods'
import { BXRestNavvyTasksTaskFileField } from './file/field'

export class BXRestNavvyTasksTaskFile  {
  private readonly Navvy = new Navvy()

  /**
   * Поля файлов задачи (`tasks.task.file.field.*`).
   */
  public readonly field = new BXRestNavvyTasksTaskFileField()

  /**
   * Прикрепляет файлы к задаче.
   */
  attach(param: iBXRestTasksParams) {
    return this.Navvy.simple<iBXRestTasksObject, iBXRestTasksObject, iBXRestTasksParams>([$tasks, $task, $file, $attach], param)
  }
}

