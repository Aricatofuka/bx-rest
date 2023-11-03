import { $list, $result, $task, $tasks } from '../../../consts/part-name-methods'
import { HttpBXServices } from '../../../services/http/HttpBX'
import { iBXRestTasksTaskResultHttp } from '../../../typification/rest/tasks/task/result/result'
import { Injectable } from '@angular/core'
import { iBXRestParamTasksTaskResultList } from '../../../typification/rest/tasks/result/list'

@Injectable({
  providedIn: 'root'
})
export class BXRestTasksTaskResult {

  protected url = {
    list: [$tasks, $task, $result, $list], // Просмотр списка результатов к задаче
    addFromComment: [$tasks, $task, $result, 'addFromComment'], // Создание результата задачи из комментария
    deleteFromComment: [$tasks, $task, $result, 'deleteFromComment'], // Удаление результата задачи по комментарию из которого он был создан
  }

  constructor(private http: HttpBXServices) {
  }

  deleteFromComment(commentID: number) {
    return this.http.post<any>(this.url.deleteFromComment, {commentId: commentID})
  }

  addFromComment(commentID: number) {
    return this.http.post<iBXRestTasksTaskResultHttp>(this.url.addFromComment, {commentId: commentID})
  }

  list(param: iBXRestParamTasksTaskResultList) {
    return this.http.post<iBXRestTasksTaskResultHttp[]>(this.url.list, param)
  }
}
