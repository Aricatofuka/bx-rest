import { Injectable } from '@angular/core'
// import { iTaskResult, iTaskResultHttp } from '@/lib/typification/bitrix/api/rest/task/result/result'
import { BaseMapServices } from '../base'

@Injectable({
  providedIn: 'root'
})
export class BXRestMapTaskResult extends BaseMapServices {
  // iTaskResultHttpToiTaskResult(item: iTaskResultHttp): iTaskResult {
  //   return Object.assign(item, {
  //     createdAt: this.toDate(item.createdAt),
  //     updatedAt: this.toDate(item.updatedAt)
  //   })
  // }
}
