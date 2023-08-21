import { Injectable } from '@angular/core'
import { BXRestNavvyDiskFile } from './disk/file'
import { BXRestDiskNavvyFolder } from './disk/folder'
import { BXRestNavvyDiskOperation } from './disk/operation'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyDisk {
  constructor(
    public file: BXRestNavvyDiskFile,
    public folder: BXRestDiskNavvyFolder,
    public operation: BXRestNavvyDiskOperation
  ) {
  }
}
