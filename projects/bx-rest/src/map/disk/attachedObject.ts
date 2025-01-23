import { BXRestMapDiskBase } from './base'
import {iBXRestDiskAttachedObject, iBXRestDiskAttachedObjectHttp} from '../../typification/rest/disk/AttachedObject'
import { toDate, toNum } from '../../services/base'

export class BXRestMapDiskAttachedObject extends BXRestMapDiskBase {

  static get(v: iBXRestDiskAttachedObjectHttp | undefined): iBXRestDiskAttachedObject | undefined {
    return (v) ? BXRestMapDiskAttachedObject.iBXRestDiskAttachedObjectHttpToiBXRestDiskAttachedObject(v) : undefined
  }

  static iBXRestDiskAttachedObjectHttpToiBXRestDiskAttachedObject(v: iBXRestDiskAttachedObjectHttp): iBXRestDiskAttachedObject {
    return Object.assign(v, {
      ID: toNum(v.ID),
      OBJECT_ID: toNum(v.OBJECT_ID),
      ENTITY_ID: toNum(v.ENTITY_ID),
      CREATE_TIME: toDate(v.CREATE_TIME),
      CREATED_BY: toNum(v.CREATED_BY),
      SIZE: toNum(v.SIZE)
    })
  }
}
