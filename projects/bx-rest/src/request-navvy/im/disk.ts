import { BXRestNavvyImDiskFile } from './disk/file'
import { BXRestNavvyImDiskFolder } from './disk/folder'

export class BXRestNavvyImDisk {
  public readonly file = new BXRestNavvyImDiskFile()
  public readonly folder = new BXRestNavvyImDiskFolder()
}

