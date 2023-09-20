import { Injectable } from '@angular/core'
import { BXRestNavvyDiskFile } from './disk/file'
import { BXRestNavvyDiskFolder } from './disk/folder'
import { BXRestNavvyDiskOperation } from './disk/operation'
import { BXRestNavvyDiskAttachedObject } from './disk/attachedObject'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyDisk {
  constructor(
    public operation: BXRestNavvyDiskOperation,
    public file: BXRestNavvyDiskFile,
    public folder: BXRestNavvyDiskFolder,
    public attachedObject: BXRestNavvyDiskAttachedObject
  ) {
  }
}
