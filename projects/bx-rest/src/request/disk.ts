import { Injectable } from '@angular/core'
import { BXRestDiskFile } from './disk/file'
import { BXRestDiskFolder } from './disk/folder'
import { BXRestDiskAttachedObject } from './disk/attachedObject';

@Injectable({
  providedIn: 'root'
})
export class BXRestDisk {
  constructor(
    public file: BXRestDiskFile,
    public folder: BXRestDiskFolder,
    public attachedObject: BXRestDiskAttachedObject
  ) {
  }
}
