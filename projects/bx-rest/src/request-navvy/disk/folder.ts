import { Injectable } from '@angular/core'
import BXRestMapDiskFolder from '../../map/disk/folder'
import { BXRestDiskFolder } from '../../request/disk/folder'
import { Navvy } from '../../services/navvy'
import { iBXRestDiskFolderAddSubFolderParam } from '../../typification/rest/disk/folder/addSubFolder'
import { iBXRestDiskFolderCopyToParam } from '../../typification/rest/disk/folder/copyTo'
import { iBXRestDiskFolderMoveToParam } from '../../typification/rest/disk/folder/moveTo'
import { iBXRestDiskFolderRenameParam } from '../../typification/rest/disk/folder/rename'
import { iBXRestDiskFolderUploadFileParam } from '../../typification/rest/disk/folder/uploadFile'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyDiskFolder {

  private Navvy: Navvy<BXRestDiskFolder, BXRestMapDiskFolder>

  constructor(
    private BXRestDiskFolder: BXRestDiskFolder,
    private BXRestMapDiskFolder: BXRestMapDiskFolder,
  ) {
    this.Navvy = new Navvy(this.BXRestDiskFolder, this.BXRestMapDiskFolder)
  }

  /**
   * Возвращает папку по идентификатору
   *
   * @param id
   */
  get(id: number) {
    return this.Navvy.simpleWithArg(
      this.BXRestDiskFolder.get,
      id,
      this.BXRestMapDiskFolder.FolderHttpToFolder
    )
  }

  /**
   * Создает дочернюю папку
   *
   * @param param
   */
  addSubFolder(param: iBXRestDiskFolderAddSubFolderParam) {
    return this.Navvy.simpleWithArg(
      this.BXRestDiskFolder.addSubFolder,
      param,
      this.BXRestMapDiskFolder.FolderHttpToFolder
    )
  }

  /**
   * Копирует папку в указанную папку
   *
   * @param param
   */
  copyTo(param: iBXRestDiskFolderCopyToParam) {
    return this.Navvy.simpleWithArg(
      this.BXRestDiskFolder.copyTo,
      param,
      this.BXRestMapDiskFolder.FolderHttpToFolder
    )
  }

  /**
   * Перемещает папку в указанную папку
   *
   * @param param
   */
  moveTo(param: iBXRestDiskFolderMoveToParam) {
    return this.Navvy.simpleWithArg(
      this.BXRestDiskFolder.moveTo,
      param,
      this.BXRestMapDiskFolder.FolderHttpToFolder
    )
  }

  /**
   * Переименовывает папку
   *
   * @param param
   */
  rename(param: iBXRestDiskFolderRenameParam) {
    return this.Navvy.simpleWithArg(
      this.BXRestDiskFolder.rename,
      param,
      this.BXRestMapDiskFolder.FolderHttpToFolder
    )
  }

  /**
   * Уничтожает папку и всё её дочерние элементы навсегда
   * В ответе 'result': true - успешное уничтожение папки
   *
   * @param id
   */
  deleteTree(id: number) {
    return this.Navvy.simpleWithArg(
      this.BXRestDiskFolder.deleteTree,
      id
    )
  }

  /**
   * Перемещает папку в корзину
   *
   * @param id
   */
  markDeleted(id: number) {
    return this.Navvy.simpleWithArg(
      this.BXRestDiskFolder.markDeleted,
      id,
      this.BXRestMapDiskFolder.FolderHttpToFolder
    )
  }

  /**
   * Восстанавливает папку из корзины
   *
   * @param id
   */
  restore(id: number) {
    return this.Navvy.simpleWithArg(
      this.BXRestDiskFolder.restore,
      id,
      this.BXRestMapDiskFolder.FolderHttpToFolder
    )
  }

  /**
   * Метод возвращает публичную ссылку
   *
   * @param id
   */
  getExternalLink(id: number) {
    return this.Navvy.simpleWithArg(
      this.BXRestDiskFolder.getExternalLink,
      id
    )
  }

  /**
   * Возвращает описание полей папки
   */
  getFields() {
    return this.Navvy.simple(
      this.BXRestDiskFolder.getFields
    )
  }

  /**
   * Загружает новый файл в указанную папку
   *
   * @param param
   */
  uploadFile(param: iBXRestDiskFolderUploadFileParam) {
    return this.Navvy.simpleWithArg(
      this.BXRestDiskFolder.uploadFile,
      param,
      this.BXRestMapDiskFolder.FolderHttpToFolder
    )
  }

  /**
   * Возвращает список файлов и папок, которые находятся непосредственно в папке
   *
   * @param id
   */
  getChildren(id: number) {
    return this.Navvy.simpleWithArg(
      this.BXRestDiskFolder.getChildren,
      id,
      this.BXRestMapDiskFolder.getChildren
    )
  }

}
