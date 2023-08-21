import { Injectable } from '@angular/core'
import BXRestMapDiskBase from './base'
import { iBXRestFolderHttp } from '../../typification/rest/disk/folder'
import { iBXRestFileHttp } from '../../typification/rest/disk/file'

@Injectable({
  providedIn: 'root'
})
export default class BXRestMapDiskStorage extends BXRestMapDiskBase {
  getchildren(arr: (iBXRestFolderHttp | iBXRestFileHttp)[]){
    return this.separationFoldersAndFiles(arr)
  }
}
