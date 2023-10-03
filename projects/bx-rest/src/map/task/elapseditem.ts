import { Injectable } from '@angular/core'
import { iBXRestElapsedItem, iBXRestElapsedItemHttp } from '../../typification/rest/task/elapseditem/item'
import { BaseMapServices } from '../base'

@Injectable({
  providedIn: 'root'
})
export class BXRestMapTaskElapseditem extends BaseMapServices {
  update(p: null) {
    return (p == null)
  }

  getList(v: iBXRestElapsedItemHttp[] | undefined) {
    return (v) ? v.map(i => this.ElapsedItemHttpToElapsedItem(i)) : undefined
  }

  ElapsedItemHttpToElapsedItem(item: iBXRestElapsedItemHttp): iBXRestElapsedItem {
    return Object.assign(item, {
      ID: this.toNum(item.ID),
      MINUTES: this.toNum(item.MINUTES),
      SECONDS: this.toNum(item.SECONDS),
      TASK_ID: this.toNum(item.TASK_ID),
      USER_ID: this.toNum(item.USER_ID),
      SOURCE: this.toNum(item.SOURCE),
      CREATED_DATE: this.toDate(item.CREATED_DATE),
      DATE_START: this.toDate(item.DATE_START),
      DATE_STOP: this.toDate(item.DATE_STOP),
    })
  }
}
