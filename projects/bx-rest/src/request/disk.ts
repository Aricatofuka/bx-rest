import { Injectable } from '@angular/core'
import { BXRestDiskFile } from './disk/file'
import { BXRestDiskFolder } from './disk/folder'

@Injectable({
  providedIn: 'root'
})
export class BXRestDisk {
  constructor(
    public file: BXRestDiskFile,
    public folder: BXRestDiskFolder
  ) {
  }
}
