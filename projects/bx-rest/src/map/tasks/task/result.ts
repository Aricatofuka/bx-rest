import { iBXRestTasksTaskResult, iBXRestTasksTaskResultHttp } from '../../../typification/rest/tasks/task/result/result'
import { toDate } from '../../../services/base'

export class BXRestMapTasksTaskResult {

  static list(item: iBXRestTasksTaskResultHttp[] | undefined){
    return (item) ? item.map(i => BXRestMapTasksTaskResult.iTaskResultHttpToiTaskResult(i)) : undefined
  }

  static addFromComment(item: iBXRestTasksTaskResultHttp | undefined){
    return (item) ? BXRestMapTasksTaskResult.iTaskResultHttpToiTaskResult(item) : undefined
  }

  static iTaskResultHttpToiTaskResult(item: iBXRestTasksTaskResultHttp): iBXRestTasksTaskResult {
    return Object.assign(item, {
      createdAt: toDate(item.createdAt),
      updatedAt: toDate(item.updatedAt)
    })
  }
}
