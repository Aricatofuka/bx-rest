import { Navvy } from '../../../../services/navvy'
import { iBXRestTasksObject, iBXRestTasksParams } from '../../../../typification/rest/tasks'
import { $chat, $message, $send, $task, $tasks } from '../../../../consts/part-name-methods'
import { BXRestNavvyTasksTaskChatMessageField } from './message/field'

export class BXRestNavvyTasksTaskChatMessage  {
  private readonly Navvy = new Navvy()

  public readonly field = new BXRestNavvyTasksTaskChatMessageField()

  send(param: iBXRestTasksParams) {
    return this.Navvy.simple<iBXRestTasksObject, iBXRestTasksObject, iBXRestTasksParams>([$tasks, $task, $chat, $message, $send], param)
  }
}

