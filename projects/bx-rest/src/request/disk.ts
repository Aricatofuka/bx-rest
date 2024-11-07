import { inject, Injectable } from '@angular/core'
import { BXRestDiskFile } from './disk/file'
import { BXRestDiskFolder } from './disk/folder'
import { BXRestDiskAttachedObject } from './disk/attachedObject'

@Injectable({
  providedIn: 'root'
})
export class BXRestDisk {
  public readonly file = inject(BXRestDiskFile)
  public readonly folder = inject(BXRestDiskFolder)
  public readonly attachedObject = inject(BXRestDiskAttachedObject)
}
