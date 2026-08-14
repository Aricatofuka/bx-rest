import { BXRestNavvyImDiskFile } from './disk/file'
import { BXRestNavvyImDiskFolder } from './disk/folder'

export class BXRestNavvyImDisk {
  /**
   * Файлы Диска в чате (`im.disk.file.*`).
   */
  public readonly file = new BXRestNavvyImDiskFile()
  /**
   * Папка файлового хранилища чата (`im.disk.folder.*`).
   */
  public readonly folder = new BXRestNavvyImDiskFolder()
}

