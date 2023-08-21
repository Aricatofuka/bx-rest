import { Injectable } from '@angular/core'
import BaseMapServices from '../base'
import { iBXRestFile, iBXRestFileHttp } from '../../typification/rest/disk/file'
import { iBXRestFolder, iBXRestFolderHttp } from '../../typification/rest/disk/folder'
import { iBXRestFileAndFolderMap } from '../../typification/rest/disk/map';

@Injectable({
  providedIn: 'root'
})
export default class BXRestMapDiskBase extends BaseMapServices {

  separationFoldersAndFiles(arr: (iBXRestFolderHttp | iBXRestFileHttp)[]){
    let result: iBXRestFileAndFolderMap = {file: [], folder: []}
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

  instanceOfiFile(object: any): object is iBXRestFile {
    return object && object.TYPE && object.TYPE === 'file'
  }

  instanceOfiFolder(object: any): object is iBXRestFolder {
    return object && object.TYPE && object.TYPE === 'folder'
  }
}
