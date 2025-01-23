import { iBXRestDiskFile, iBXRestDiskFileHttp } from '../../typification/rest/disk/file'
import { iBXRestFolder, iBXRestFolderHttp } from '../../typification/rest/disk/folder'
import { iBXRestDiskFileAndFolderMap } from '../../typification/rest/disk/map'
import { toDate, toNum } from '../../services/base'

export class BXRestMapDiskBase {

  static separationFoldersAndFiles(arr: (iBXRestFolderHttp | iBXRestDiskFileHttp)[]) {
    const result: iBXRestDiskFileAndFolderMap = {file: [], folder: []}
    for (const i of arr) {
      if (BXRestMapDiskBase.instanceOfiFile(i)) {
        result.file.push(
          Object.assign(
            i,
            {
              CREATED_BY: toNum(i.CREATED_BY),
              CREATE_TIME: toDate(i.CREATE_TIME),
              DELETED_BY: toNum(i.DELETED_BY),
              DELETED_TYPE: toNum(i.DELETED_TYPE),
              DELETE_TIME: (i.DELETE_TIME) ? toDate(i.DELETE_TIME) : null,
              ID: toNum(i.ID),
              PARENT_ID: toNum(i.PARENT_ID),
              REAL_OBJECT_ID: toNum(i.REAL_OBJECT_ID),
              STORAGE_ID: toNum(i.STORAGE_ID),
              UPDATED_BY: toNum(i.UPDATED_BY),
              UPDATE_TIME: toDate(i.UPDATE_TIME),
              SIZE: toNum(i.SIZE),
            }
          )
        )
      } else if (BXRestMapDiskBase.instanceOfiFolder(i)) {
        result.folder.push(
          Object.assign(
            i,
            {
              CREATED_BY: toNum(i.CREATED_BY),
              CREATE_TIME: toDate(i.CREATE_TIME),
              DELETED_BY: toNum(i.DELETED_BY),
              DELETED_TYPE: toNum(i.DELETED_TYPE),
              DELETE_TIME: (i.DELETE_TIME) ? toDate(i.DELETE_TIME) : null,
              ID: toNum(i.ID),
              PARENT_ID: toNum(i.PARENT_ID),
              REAL_OBJECT_ID: toNum(i.REAL_OBJECT_ID),
              STORAGE_ID: toNum(i.STORAGE_ID),
              UPDATED_BY: toNum(i.UPDATED_BY),
              UPDATE_TIME: toDate(i.UPDATE_TIME),
            }
          )
        )
      }
    }
    return result
  }

  static instanceOfiFile(object: any): object is iBXRestDiskFile {
    return object && object.TYPE && object.TYPE === 'file'
  }

  static instanceOfiFolder(object: any): object is iBXRestFolder {
    return object && object.TYPE && object.TYPE === 'folder'
  }


  static FolderHttpToFolder(value: iBXRestFolderHttp | undefined): iBXRestFolder | undefined {
    return (value)
      ? {
        ...value,
        ...{
          CREATED_BY: toNum(value.CREATED_BY),
          CREATE_TIME: toDate(value.CREATE_TIME),
          DELETED_BY: toNum(value.DELETED_BY),
          DELETED_TYPE: toNum(value.DELETED_TYPE),
          DELETE_TIME: toDate(value.CREATE_TIME),
          ID: toNum(value.ID),
          PARENT_ID: toNum(value.PARENT_ID),
          REAL_OBJECT_ID: toNum(value.REAL_OBJECT_ID),
          STORAGE_ID: toNum(value.STORAGE_ID),
          UPDATED_BY: toNum(value.UPDATED_BY),
          UPDATE_TIME: toDate(value.CREATE_TIME)
        }
      }
      : undefined
  }
}
