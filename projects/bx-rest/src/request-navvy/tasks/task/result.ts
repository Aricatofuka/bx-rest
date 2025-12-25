import { Navvy } from '../../../services/navvy'
import { BXRestMapTasksTaskResult } from '../../../map/tasks/task/result'
import {
  iBXRestParamTasksTaskResultList, iBXParamRestTasksTaskResultAdd, iBXRestTasksTaskResult,
  iBXRestTasksTaskResultHttp
} from '../../../typification/rest/tasks'
import { $list, $result, $task, $tasks } from '../../../consts/part-name-methods'

export class BXRestNavvyTasksTaskResult {

  url = {
    /**
     *  Просмотр списка результатов к задаче
     */
    list: [$tasks, $task, $result, $list],
    /**
     * Создание результата задачи из комментария
     */
    addFromComment: [$tasks, $task, $result, 'addFromComment'],
    /**
     * Удаление результата задачи по комментарию из которого он был создан
     */
    deleteFromComment: [$tasks, $task, $result, 'deleteFromComment'],
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
}
