import { iBXRestDiskFile, iBXRestDiskFileHttp } from '../../typification/rest/disk/file'
import { toDate, toNum } from '../../services/base'

export class BXRestMapDiskFile {

  static get(v: iBXRestDiskFileHttp | undefined): iBXRestDiskFile | undefined {
    return (v) ? {
      ...v,
      ...{
        ID: toNum(v.ID),
        FILE_ID: toNum(v.ID),
        SIZE: toNum(v.SIZE),
        CREATED_BY: toNum(v.CREATED_BY),
        CREATE_TIME: toDate(v.CREATE_TIME),
        DELETED_BY: toNum(v.DELETED_BY),
        DELETED_TYPE: toNum(v.DELETED_BY),
        DELETE_TIME: v.DELETE_TIME ? toDate(v.CREATE_TIME) : null,
        PARENT_ID: toNum(v.PARENT_ID),
        STORAGE_ID: toNum(v.STORAGE_ID),
        UPDATED_BY: toNum(v.UPDATED_BY),
        UPDATE_TIME: toDate(v.UPDATE_TIME)
      }
    } : undefined
  }
}
