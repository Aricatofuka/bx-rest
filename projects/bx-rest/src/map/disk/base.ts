import { Injectable } from '@angular/core'
import { BaseMapServices } from '../base'
import { iBXRestDiskFile, iBXRestDiskFileHttp } from '../../typification/rest/disk/file'
import { iBXRestFolder, iBXRestFolderHttp } from '../../typification/rest/disk/folder'
import { iBXRestDiskFileAndFolderMap } from '../../typification/rest/disk/map'

@Injectable({
  providedIn: 'root'
})
export default class BXRestMapDiskBase extends BaseMapServices {

  separationFoldersAndFiles(arr: (iBXRestFolderHttp | iBXRestDiskFileHttp)[]) {
    let result: iBXRestDiskFileAndFolderMap = {file: [], folder: []}
    for (let i of arr) {
      if (this.instanceOfiFile(i)) {
        result.file.push(
          Object.assign(
            i,
            {
              CREATED_BY: this.toNum(i.CREATED_BY),
              CREATE_TIME: this.toDate(i.CREATE_TIME),
              DELETED_BY: this.toNum(i.DELETED_BY),
              DELETED_TYPE: this.toNum(i.DELETED_TYPE),
              DELETE_TIME: (i.DELETE_TIME) ? this.toDate(i.DELETE_TIME) : null,
              ID: this.toNum(i.ID),
              PARENT_ID: this.toNum(i.PARENT_ID),
              REAL_OBJECT_ID: this.toNum(i.REAL_OBJECT_ID),
              STORAGE_ID: this.toNum(i.STORAGE_ID),
              UPDATED_BY: this.toNum(i.UPDATED_BY),
              UPDATE_TIME: this.toDate(i.UPDATE_TIME),
              SIZE: this.toNum(i.SIZE),
            }
          )
        )
      } else if (this.instanceOfiFolder(i)) {
        result.folder.push(
          Object.assign(
            i,
            {
              CREATED_BY: this.toNum(i.CREATED_BY),
              CREATE_TIME: this.toDate(i.CREATE_TIME),
              DELETED_BY: this.toNum(i.DELETED_BY),
              DELETED_TYPE: this.toNum(i.DELETED_TYPE),
              DELETE_TIME: (i.DELETE_TIME) ? this.toDate(i.DELETE_TIME) : null,
              ID: this.toNum(i.ID),
              PARENT_ID: this.toNum(i.PARENT_ID),
              REAL_OBJECT_ID: this.toNum(i.REAL_OBJECT_ID),
              STORAGE_ID: this.toNum(i.STORAGE_ID),
              UPDATED_BY: this.toNum(i.UPDATED_BY),
              UPDATE_TIME: this.toDate(i.UPDATE_TIME),
            }
          )
        )
      }
    }
    return result
  }

  instanceOfiFile(object: any): object is iBXRestDiskFile {
    return object && object.TYPE && object.TYPE === 'file'
  }

  instanceOfiFolder(object: any): object is iBXRestFolder {
    return object && object.TYPE && object.TYPE === 'folder'
  }


  FolderHttpToFolder(value: iBXRestFolderHttp | undefined): iBXRestFolder | undefined {
    return (value)
      ? {
        ...value,
        ...{
          CREATED_BY: this.toNum(value.CREATED_BY),
          CREATE_TIME: this.toDate(value.CREATE_TIME),
          DELETED_BY: this.toNum(value.DELETED_BY),
          DELETED_TYPE: this.toNum(value.DELETED_TYPE),
          DELETE_TIME: this.toDate(value.CREATE_TIME),
          ID: this.toNum(value.ID),
          PARENT_ID: this.toNum(value.PARENT_ID),
          REAL_OBJECT_ID: this.toNum(value.REAL_OBJECT_ID),
          STORAGE_ID: this.toNum(value.STORAGE_ID),
          UPDATED_BY: this.toNum(value.UPDATED_BY),
          UPDATE_TIME: this.toDate(value.CREATE_TIME)
        }
      }
      : undefined
  }
}
