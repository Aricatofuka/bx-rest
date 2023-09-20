import { Injectable } from '@angular/core'
import { BaseMapServices } from '@/lib/services/map/base'
import { iTaskResult, iTaskResultHttp } from '@/lib/typification/bitrix/api/rest/task/result/result'

@Injectable({
  providedIn: 'root'
})
export class BitrixApiTaskResultMapServices extends BaseMapServices {
  iTaskResultHttpToiTaskResult(item: iTaskResultHttp): iTaskResult {
    return Object.assign(item, {
      createdAt: this.toDate(item.createdAt),
      updatedAt: this.toDate(item.updatedAt)
    })
  }
}
