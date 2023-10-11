import { $list, $result, $task, $tasks } from '../../../consts/part-name-metods'
import { HttpBXServices } from '../../../services/http/HttpBX'
import { iBXRestTasksTaskResult } from '../../../typification/rest/tasks/task/result/result'
import { Injectable } from '@angular/core'

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
    return this.http.post<iBXRestTasksTaskResult>(this.url.addFromComment, {commentId: commentID})
  }

  list(taskId: number) {
    return this.http.post<iBXRestTasksTaskResult[]>(this.url.list, {taskId: taskId})
  }
}
