import { iBXRestFolderHttp } from '../../typification/rest/disk/folder'
import { iBXRestDiskFileHttp } from '../../typification/rest/disk/file'
import { BXRestMapDiskBase } from './base'

export class BXRestMapDiskFolder extends BXRestMapDiskBase {

  static getChildren(arr: (iBXRestFolderHttp | iBXRestDiskFileHttp)[] | undefined){
    return (arr) ? BXRestMapDiskBase.separationFoldersAndFiles(arr) : {file: [], folder: []}
  }
}
