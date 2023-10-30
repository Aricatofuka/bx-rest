import { Injectable } from '@angular/core'
import { BaseMapServices } from '../../base'
import { iBXRestTasksTaskResult, iBXRestTasksTaskResultHttp } from '../../../typification/rest/tasks/task/result/result'
// import { iTaskResult, iTaskResultHttp } from '@/lib/typification/bitrix/api/rest/task/result/result'


@Injectable({
  providedIn: 'root'
})
export class BXRestMapTasksTaskResult extends BaseMapServices {

  list(item: iBXRestTasksTaskResultHttp[] | undefined){
    return (item) ? item.map(i => this.iTaskResultHttpToiTaskResult(i)) : undefined
  }

  addFromComment(item: iBXRestTasksTaskResultHttp | undefined){
    return (item) ? this.iTaskResultHttpToiTaskResult(item) : undefined
  }

  protected iTaskResultHttpToiTaskResult(item: iBXRestTasksTaskResultHttp): iBXRestTasksTaskResult {
    return Object.assign(item, {
      createdAt: this.toDate(item.createdAt),
      updatedAt: this.toDate(item.updatedAt)
    })
  }
}
