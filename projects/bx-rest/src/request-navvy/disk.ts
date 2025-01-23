import { BXRestNavvyDiskFile } from './disk/file'
import { BXRestNavvyDiskFolder } from './disk/folder'
import { BXRestNavvyDiskOperation } from './disk/operation'
import { BXRestNavvyDiskAttachedObject } from './disk/attachedObject'

export class BXRestNavvyDisk {
  public readonly operation = new BXRestNavvyDiskOperation()
  public readonly file = new BXRestNavvyDiskFile()
  public readonly folder = new BXRestNavvyDiskFolder()
  public readonly attachedObject = new BXRestNavvyDiskAttachedObject()
}
