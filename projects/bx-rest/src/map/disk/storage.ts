import { Injectable } from '@angular/core'
import BXRestMapDiskBase from './base'
import { iBXRestFolder, iBXRestFolderHttp } from '../../typification/rest/disk/folder'
import { iBXRestDiskFileHttp } from '../../typification/rest/disk/file'

@Injectable({
  providedIn: 'root'
})
export default class BXRestMapDiskStorage extends BXRestMapDiskBase {

  getChildren(arr: (iBXRestFolderHttp | iBXRestDiskFileHttp)[] | undefined) {
    return (arr) ? this.separationFoldersAndFiles(arr) : {file: [], folder: []}
  }

  addFolder(value: iBXRestFolderHttp | undefined): iBXRestFolder | undefined {
    return (value) ? this.FolderHttpToFolder(value) : undefined
  }

}
