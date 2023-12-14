import { Injectable } from '@angular/core'
import BXRestMapDiskBase from './base'
import { iBXRestFolder, iBXRestFolderHttp } from '../../typification/rest/disk/folder'
import { iBXRestDiskFileHttp } from '../../typification/rest/disk/file'

@Injectable({
  providedIn: 'root'
})
export default class BXRestMapDiskStorage extends BXRestMapDiskBase {

  getchildren(arr: (iBXRestFolderHttp | iBXRestDiskFileHttp)[] | undefined) {
    return (arr) ? this.separationFoldersAndFiles(arr) : {file: [], folder: []}
  }

  addfolder(value: iBXRestFolderHttp): iBXRestFolder {
    return this.FolderHttpToFolder(value)
  }

}
