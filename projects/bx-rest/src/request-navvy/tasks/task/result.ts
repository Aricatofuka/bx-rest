import { iBXRestTasksTaskResult } from '../../../typification/rest/tasks/task/result/result'
import { Injectable } from '@angular/core'
import { BXRestMapTasksTask } from '../../../map/tasks/task'
import { Navvy } from '../../../services/navvy'
import { BXRestMapTasksTaskResult } from '../../../map/tasks/task/result'

@Injectable({
  providedIn: 'root'
})
export class BXRestTasksTaskResult {

  private Navvy: Navvy<BXRestTasksTaskResult, BXRestMapTasksTaskResult>

  constructor(
    private BXRestTasksTaskResult: BXRestTasksTaskResult,
    private BXRestMapTasksTaskResult: BXRestMapTasksTaskResult
  ) {
    this.Navvy = new Navvy(this.BXRestTasksTaskResult, this.BXRestMapTasksTaskResult)
  }

  deleteFromComment(commentID: number) {
    return this.http.post<any>(this.url.deleteFromComment, {commentId: commentID})
  }

  addFromComment(commentID: number) {
    return this.http.post<iBXRestTasksTaskResult>(this.url.addFromComment, {commentId: commentID})
      .pipe(
        map(v => {
          if (v && v.result) {
            this.taskResultMap.iTaskResultHttpToiTaskResult(v.result)
          }
          return undefined
        }))
  }

  list(taskId: number) {
    return this.http.post<iTaskResultHttp[]>(this.url.list, {taskId: taskId})
      .pipe(
        map(v => {
          if (v && v.result) {
            return v.result.map(i => this.taskResultMap.iTaskResultHttpToiTaskResult(i))
          }
          return undefined
        }))
  }
}
