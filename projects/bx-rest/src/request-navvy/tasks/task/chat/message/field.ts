import { Navvy } from '../../../../../services/navvy'
import { iBXRestTasksObject, iBXRestTasksParams } from '../../../../../typification/rest/tasks'
import { $chat, $field, $get, $list, $message, $task, $tasks } from '../../../../../consts/part-name-methods'

export class BXRestNavvyTasksTaskChatMessageField  {
  private readonly Navvy = new Navvy()

  /**
   * Возвращает описание поля сообщения чата задачи.
   */
  get(param: iBXRestTasksParams = {}) {
    return this.Navvy.simple<iBXRestTasksObject, iBXRestTasksObject, iBXRestTasksParams>([$tasks, $task, $chat, $message, $field, $get], param)
  }

  /**
   * Возвращает список полей сообщения чата задачи.
   */
  list(param: iBXRestTasksParams = {}) {
    return this.Navvy.simple<iBXRestTasksObject, iBXRestTasksObject, iBXRestTasksParams>([$tasks, $task, $chat, $message, $field, $list], param)
  }
}

