import { inject, Injectable } from '@angular/core'
import { BXRestNavvyDiskFile } from './disk/file'
import { BXRestNavvyDiskFolder } from './disk/folder'
import { BXRestNavvyDiskOperation } from './disk/operation'
import { BXRestNavvyDiskAttachedObject } from './disk/attachedObject'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyDisk {
  public readonly operation = inject(BXRestNavvyDiskOperation)
  public readonly file = inject(BXRestNavvyDiskFile)
  public readonly folder = inject(BXRestNavvyDiskFolder)
  public readonly attachedObject = inject(BXRestNavvyDiskAttachedObject)
}
