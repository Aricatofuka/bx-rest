import { BXRestDiskFile } from './disk/file'
import { BXRestDiskFolder } from './disk/folder'
import { BXRestDiskAttachedObject } from './disk/attachedObject'

export class BXRestDisk {
  public readonly file = new BXRestDiskFile()
  public readonly folder = new BXRestDiskFolder()
  public readonly attachedObject = new BXRestDiskAttachedObject()
}
