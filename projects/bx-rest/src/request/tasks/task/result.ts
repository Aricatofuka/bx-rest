import { HttpBXServices } from '../../../services/http/HttpBX'
import {
  iBXParamRestTasksTaskResultAdd,
  iBXRestTasksTaskResultHttp
} from '../../../typification/rest/tasks/task/result/result'
import { iBXRestParamTasksTaskResultList } from '../../../typification/rest/tasks/result/list'
import { $list, $result, $task, $tasks } from '../../../consts/part-name-methods'

export class BXRestTasksTaskResult {
  protected url = {
    list: [$tasks, $task, $result, $list],
    addFromComment: [$tasks, $task, $result, 'addFromComment'],
    deleteFromComment: [$tasks, $task, $result, 'deleteFromComment'],
  }
  private readonly http = new HttpBXServices()

  deleteFromComment(commentID: number) {
    return this.http.post<null>(this.url.deleteFromComment, {commentId: commentID})
  }

  addFromComment(param: iBXParamRestTasksTaskResultAdd) {
    return this.http.post<iBXRestTasksTaskResultHttp>(this.url.addFromComment, param)
  }

  list(param: iBXRestParamTasksTaskResultList) {
    return this.http.post<iBXRestTasksTaskResultHttp[]>(this.url.list, param)
  }
}
