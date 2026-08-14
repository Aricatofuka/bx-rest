import { BXRestNavvyDiskFile } from './disk/file'
import { BXRestNavvyDiskFolder } from './disk/folder'
import { BXRestNavvyDiskOperation } from './disk/operation'
import { BXRestNavvyDiskAttachedObject } from './disk/attachedObject'
import { BXRestNavvyDiskRights } from './disk/rights'
import { BXRestNavvyDiskVersion } from './disk/version'

export class BXRestNavvyDisk {
  /**
   * Вспомогательные комплексные операции с Диском — обёртки над `disk.folder.*`, `disk.file.*` и `disk.storage.*`.
   */
  public readonly operation = new BXRestNavvyDiskOperation()
  /**
   * Файлы на Диске (`disk.file.*`).
   */
  public readonly file = new BXRestNavvyDiskFile()
  /**
   * Папки на Диске (`disk.folder.*`).
   */
  public readonly folder = new BXRestNavvyDiskFolder()
  /**
   * Прикреплённые к записям файлы (`disk.attachedObject.*`).
   */
  public readonly attachedObject = new BXRestNavvyDiskAttachedObject()
  /**
   * Права доступа на Диске (`disk.rights.*`).
   */
  public readonly rights = new BXRestNavvyDiskRights()
  /**
   * Версии файлов на Диске (`disk.version.*`).
   */
  public readonly version = new BXRestNavvyDiskVersion()
}
