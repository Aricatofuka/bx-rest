import { BXRestMapDiskFolder } from './disk/folder'
import { BXRestMapDiskAttachedObject } from './disk/attachedObject'
import { BXRestMapDiskFile } from './disk/file'
import { BXRestMapDiskStorage } from './disk/storage'

export class BXRestMapDisk {
  public readonly folder = new BXRestMapDiskFolder()
  public readonly attachedObject = new BXRestMapDiskAttachedObject()
  public readonly file = new BXRestMapDiskFile()
  public readonly storage = new BXRestMapDiskStorage()
}
