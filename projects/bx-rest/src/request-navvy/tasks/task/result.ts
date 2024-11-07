import { inject, Injectable } from '@angular/core'
import { Navvy } from '../../../services/navvy'
import { BXRestMapTasksTaskResult } from '../../../map/tasks/task/result'
import { iBXRestParamTasksTaskResultList } from '../../../typification/rest/tasks/result/list'
import { BXRestTasksTaskResult } from '../../../request/tasks/task/result'
import { iBXParamRestTasksTaskResultAdd } from '../../../typification/rest/tasks/task/result/result'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyTasksTaskResult {

  private readonly BXRestTasksTaskResult = inject(BXRestTasksTaskResult)
  private readonly BXRestMapTasksTaskResult = inject(BXRestMapTasksTaskResult)
  private Navvy = new Navvy(this.BXRestTasksTaskResult, this.BXRestMapTasksTaskResult)

  deleteFromComment(commentID: number) {
    return this.Navvy.simpleWithArg(
      this.BXRestTasksTaskResult.deleteFromComment,
      commentID,
    )
  }

  addFromComment(param: iBXParamRestTasksTaskResultAdd) {
    return this.Navvy.simpleWithArg(
      this.BXRestTasksTaskResult.addFromComment,
      param,
      this.BXRestMapTasksTaskResult.addFromComment
    )
  }

  list(param: iBXRestParamTasksTaskResultList) {
    return this.Navvy.PagNav(
      this.BXRestTasksTaskResult.list,
      param,
      this.BXRestMapTasksTaskResult.list
    )
  }
}
