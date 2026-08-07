import { Navvy } from '../../../services/navvy'
import { BXRestMapTasksTaskResult } from '../../../map/tasks/task/result'
import {
  iBXRestParamTasksTaskResultList, iBXParamRestTasksTaskResultAdd, iBXRestTasksTaskResult,
  iBXRestTasksTaskResultHttp,
  iBXRestTasksObject,
  iBXRestTasksParams
} from '../../../typification/rest/tasks'
import { $add, $addFromComment, $addfromchatmessage, $delete, $deleteFromComment, $list, $result, $task, $tasks, $update } from '../../../consts/part-name-methods'

export class BXRestNavvyTasksTaskResult {

  url = {
    /**
     *  Просмотр списка результатов к задаче
     */
    list: [$tasks, $task, $result, $list],
    /**
     * Создание результата задачи из комментария
     */
    addFromComment: [$tasks, $task, $result, $addFromComment],
    /**
     * Удаление результата задачи по комментарию из которого он был создан
     */
    deleteFromComment: [$tasks, $task, $result, $deleteFromComment],
  }

  private Navvy = new Navvy()

  deleteFromComment(commentID: { commentId: number }) {
    return this.Navvy.simple<null, null, { commentId: number }>(
      this.url.deleteFromComment,
      commentID,
    )
  }

  addFromComment(param: iBXParamRestTasksTaskResultAdd) {
    return this.Navvy.simple<iBXRestTasksTaskResultHttp, iBXRestTasksTaskResult, iBXParamRestTasksTaskResultAdd>(
      this.url.addFromComment,
      param,
      BXRestMapTasksTaskResult.addFromComment
    )
  }

  list(param: iBXRestParamTasksTaskResultList) {
    return this.Navvy.pagNav<iBXRestTasksTaskResultHttp, iBXRestTasksTaskResult, iBXRestParamTasksTaskResultList>(
      this.url.list,
      param,
      BXRestMapTasksTaskResult.list
    )
  }

  add(param: iBXRestTasksParams) {
    return this.Navvy.simple<iBXRestTasksObject, iBXRestTasksObject, iBXRestTasksParams>([$tasks, $task, $result, $add], param)
  }

  addFromChatMessage(param: iBXRestTasksParams) {
    return this.Navvy.simple<iBXRestTasksObject, iBXRestTasksObject, iBXRestTasksParams>([$tasks, $task, $result, $addfromchatmessage], param)
  }

  delete(param: iBXRestTasksParams) {
    return this.Navvy.simple<iBXRestTasksObject, iBXRestTasksObject, iBXRestTasksParams>([$tasks, $task, $result, $delete], param)
  }

  update(param: iBXRestTasksParams) {
    return this.Navvy.simple<iBXRestTasksObject, iBXRestTasksObject, iBXRestTasksParams>([$tasks, $task, $result, $update], param)
  }
}
