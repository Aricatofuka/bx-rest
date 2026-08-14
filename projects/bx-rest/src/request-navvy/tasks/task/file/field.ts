import { Navvy } from '../../../../services/navvy'
import { iBXRestTasksObject, iBXRestTasksParams } from '../../../../typification/rest/tasks'
import { $field, $file, $get, $list, $task, $tasks } from '../../../../consts/part-name-methods'

export class BXRestNavvyTasksTaskFileField  {
  private readonly Navvy = new Navvy()

  /**
   * Возвращает описание поля файлов задачи.
   */
  get(param: iBXRestTasksParams = {}) {
    return this.Navvy.simple<iBXRestTasksObject, iBXRestTasksObject, iBXRestTasksParams>([$tasks, $task, $file, $field, $get], param)
  }

  /**
   * Возвращает список полей файлов задачи.
   */
  list(param: iBXRestTasksParams = {}) {
    return this.Navvy.simple<iBXRestTasksObject, iBXRestTasksObject, iBXRestTasksParams>([$tasks, $task, $file, $field, $list], param)
  }
}

