import { Injectable } from '@angular/core'
import { iBXRestTaskElapsedItem, iBXRestTaskElapsedItemHttp } from '../../typification/rest/task/elapseditem/item'
import { BaseMapServices } from '../base'

@Injectable({
  providedIn: 'root'
})
export class BXRestMapTaskElapsedItem extends BaseMapServices {
  update(p: null | undefined) {
    console.log('update', p)
    return (p == null)
  }

  getList(v: iBXRestTaskElapsedItemHttp[] | undefined) {
    return (v) ? v.map(i => this.ElapsedItemHttpToElapsedItem(i)) : undefined
  }

  ElapsedItemHttpToElapsedItem(item: iBXRestTaskElapsedItemHttp): iBXRestTaskElapsedItem {
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
