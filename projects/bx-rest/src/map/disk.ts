import { Injectable } from '@angular/core'
import BXRestMapDiskFolder from './disk/folder'
import BXRestMapDiskAttachedObject from './disk/attachedObject'
import { BXRestMapDiskFile } from './disk/file'
import BXRestMapDiskStorage from './disk/storage'

@Injectable({
  providedIn: 'root'
})
export class BXRestMapDisk {

  constructor(
    public folder: BXRestMapDiskFolder,
    public attachedObject: BXRestMapDiskAttachedObject,
    public file: BXRestMapDiskFile,
    public storage: BXRestMapDiskStorage
  ) {
  }
}
