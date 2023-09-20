import {Injectable} from '@angular/core'
import BXRestMapDiskBase from './base'
import {iBXRestDiskAttachedObject, iBXRestDiskAttachedObjectHttp} from '../../typification/rest/disk/AttachedObject'

@Injectable({
  providedIn: 'root'
})
export default class BXRestMapDiskAttachedObject extends BXRestMapDiskBase {

  get(v: iBXRestDiskAttachedObjectHttp | undefined): iBXRestDiskAttachedObject | undefined {
    return (v) ? this.iBXRestDiskAttachedObjectHttpToiBXRestDiskAttachedObject(v) : undefined
  }

  private iBXRestDiskAttachedObjectHttpToiBXRestDiskAttachedObject(v: iBXRestDiskAttachedObjectHttp): iBXRestDiskAttachedObject {
    return Object.assign(v, {
      ID: this.toNum(v.ID),
      OBJECT_ID: this.toNum(v.OBJECT_ID),
      ENTITY_ID: this.toNum(v.ENTITY_ID),
      CREATE_TIME: this.toDate(v.CREATE_TIME),
      CREATED_BY: this.toNum(v.CREATED_BY),
      SIZE: this.toNum(v.SIZE)
    })
  }
}
