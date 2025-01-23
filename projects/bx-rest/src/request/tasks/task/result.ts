import { HttpBXServices } from '../../../services/http/HttpBX'
import {
  iBXParamRestTasksTaskResultAdd,
  iBXRestTasksTaskResultHttp
} from '../../../typification/rest/tasks/task/result/result'
import { iBXRestParamTasksTaskResultList } from '../../../typification/rest/tasks/result/list'
import { methods } from '../../../typification/base/methods'

export class BXRestTasksTaskResult {
  protected url = methods.tasks.task.result
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
