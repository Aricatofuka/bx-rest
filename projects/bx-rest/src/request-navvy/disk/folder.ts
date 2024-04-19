import { Injectable } from '@angular/core'
import BXRestMapDiskFolder from '../../map/disk/folder'
import { BXRestDiskFolder } from '../../request/disk/folder'
import { Navvy } from '../../services/navvy'
import { iBXRestDiskFolderAddSubFolderParam } from '../../typification/rest/disk/folder/addSubFolder'
import { iBXRestDiskFolderCopyToParam } from '../../typification/rest/disk/folder/copyTo'
import { iBXRestDiskFolderMoveToParam } from '../../typification/rest/disk/folder/moveTo'
import { iBXRestDiskFolderRenameParam } from '../../typification/rest/disk/folder/rename'
import { iBXRestDiskFolderUploadFileParam } from '../../typification/rest/disk/folder/uploadFile'
import { iBXRestParamDiskFileGet, iBXRestParamDiskFileMarkDeleted } from '../../typification/rest/disk/file';
import {
  iBXRestParamFolderDeleteTree, iBXRestParamFolderGetChildren,
  iBXRestParamFolderGetExternalLink,
  iBXRestParamFolderRestore
} from '../../typification/rest/disk/folder';

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
   * @param param
   */
  get(param: iBXRestParamDiskFileGet) {
    return this.Navvy.simpleWithArg(
      this.BXRestDiskFolder.get,
      param,
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
   * @param param
   */
  deleteTree(param: iBXRestParamFolderDeleteTree) {
    return this.Navvy.simpleWithArg(
      this.BXRestDiskFolder.deleteTree,
      param
    )
  }

  /**
   * Перемещает папку в корзину
   *
   * @param param
   */
  markDeleted(param: iBXRestParamDiskFileMarkDeleted) {
    return this.Navvy.simpleWithArg(
      this.BXRestDiskFolder.markDeleted,
      param,
      this.BXRestMapDiskFolder.FolderHttpToFolder
    )
  }

  /**
   * Восстанавливает папку из корзины
   *
   * @param param
   */
  restore(param: iBXRestParamFolderRestore) {
    return this.Navvy.simpleWithArg(
      this.BXRestDiskFolder.restore,
      param,
      this.BXRestMapDiskFolder.FolderHttpToFolder
    )
  }

  /**
   * Метод возвращает публичную ссылку
   *
   * @param param
   */
  getExternalLink(param: iBXRestParamFolderGetExternalLink) {
    return this.Navvy.simpleWithArg(
      this.BXRestDiskFolder.getExternalLink,
      param
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
   * @param param
   */
  getChildren(param: iBXRestParamFolderGetChildren) {
    return this.Navvy.simpleWithArg(
      this.BXRestDiskFolder.getChildren,
      param,
      this.BXRestMapDiskFolder.getChildren
    )
  }

}
