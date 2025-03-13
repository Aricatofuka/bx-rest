import { BXRestMapDiskBase } from './base'
import { iBXRestFolder, iBXRestFolderHttp } from '../../typification/rest/disk/folder'
import { iBXRestDiskFileHttp } from '../../typification/rest/disk/file'

export class BXRestMapDiskStorage extends BXRestMapDiskBase {

  static getChildren(arr: (iBXRestFolderHttp | iBXRestDiskFileHttp)[] | undefined) {
    return (arr) ? BXRestMapDiskBase.separationFoldersAndFiles(arr) : {file: [], folder: []}
  }

  static addFolder(value: iBXRestFolderHttp | undefined): iBXRestFolder | undefined {
    return (value) ? BXRestMapDiskBase.FolderHttpToFolder(value) : undefined
  }
}
