import { Injectable } from '@angular/core'
import { iBXRestFolderHttp } from '../../typification/rest/disk/folder'
import { iBXRestDiskFileHttp } from '../../typification/rest/disk/file'
import BXRestMapDiskBase from './base'

@Injectable({
  providedIn: 'root'
})
export default class BXRestMapDiskFolder extends BXRestMapDiskBase {

  getContent(arr: (iBXRestFolderHttp | iBXRestDiskFileHttp)[] | undefined){
    return (arr) ? this.separationFoldersAndFiles(arr) : {file: [], folder: []}
  }
}
