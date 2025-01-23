import { iBXRestTaskElapsedItem, iBXRestTaskElapsedItemHttp } from '../../typification/rest/task/elapseditem/item'
import { toDate, toNum } from '../../services/base'

export class BXRestMapTaskElapsedItem {
  static update(p: null | undefined) {
    return (p == null)
  }

  static getList(v: iBXRestTaskElapsedItemHttp[] | undefined) {
    return (v) ? v.map(i => BXRestMapTaskElapsedItem.ElapsedItemHttpToElapsedItem(i)) : undefined
  }

  static ElapsedItemHttpToElapsedItem(item: iBXRestTaskElapsedItemHttp): iBXRestTaskElapsedItem {
    return Object.assign(item, {
      ID: toNum(item.ID),
      MINUTES: toNum(item.MINUTES),
      SECONDS: toNum(item.SECONDS),
      TASK_ID: toNum(item.TASK_ID),
      USER_ID: toNum(item.USER_ID),
      SOURCE: toNum(item.SOURCE),
      CREATED_DATE: toDate(item.CREATED_DATE),
      DATE_START: toDate(item.DATE_START),
      DATE_STOP: toDate(item.DATE_STOP),
    })
  }
}
