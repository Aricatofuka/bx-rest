import { inject, Injectable } from '@angular/core'
import BXRestMapDiskFolder from './disk/folder'
import BXRestMapDiskAttachedObject from './disk/attachedObject'
import { BXRestMapDiskFile } from './disk/file'
import BXRestMapDiskStorage from './disk/storage'

@Injectable({
  providedIn: 'root'
})
export class BXRestMapDisk {
  public readonly folder = inject(BXRestMapDiskFolder)
  public readonly attachedObject = inject(BXRestMapDiskAttachedObject)
  public readonly file = inject(BXRestMapDiskFile)
  public readonly storage = inject(BXRestMapDiskStorage)
}
