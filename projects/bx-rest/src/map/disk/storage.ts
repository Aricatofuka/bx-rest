import { BXRestMapDiskBase } from './base'
import { iBXRestFolder, iBXRestFolderHttp } from '../../typification/rest/disk/folder'
import { iBXRestDiskFile, iBXRestDiskFileHttp } from '../../typification/rest/disk/file'
import { toNum } from '../../services/base'

export class BXRestMapDiskStorage extends BXRestMapDiskBase {

  static getChildren(arr: (iBXRestFolderHttp | iBXRestDiskFileHttp)[] | undefined) {
    return (arr) ? BXRestMapDiskBase.separationFoldersAndFiles(arr) : {file: [], folder: []}
  }

  static addFolder(value: iBXRestFolderHttp | undefined): iBXRestFolder | undefined {
    return (value) ? BXRestMapDiskBase.FolderHttpToFolder(value) : undefined
  }

  static uploadFile(value: iBXRestDiskFileHttp | undefined): iBXRestDiskFile | undefined {
    return (value) ? Object.assign(value, {SIZE: toNum(value.SIZE)}) : undefined
  }
}
