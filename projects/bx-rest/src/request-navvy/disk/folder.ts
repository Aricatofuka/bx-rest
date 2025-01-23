import { BXRestMapDiskFolder } from '../../map/disk/folder'
import { Navvy } from '../../services/navvy'
import { iBXRestDiskFolderAddSubFolderParam } from '../../typification/rest/disk/folder/addSubFolder'
import { iBXRestDiskFolderCopyToParam } from '../../typification/rest/disk/folder/copyTo'
import { iBXRestDiskFolderMoveToParam } from '../../typification/rest/disk/folder/moveTo'
import { iBXRestDiskFolderRenameParam } from '../../typification/rest/disk/folder/rename'
import { iBXRestDiskFolderUploadFileParam } from '../../typification/rest/disk/folder/uploadFile'
import { iBXRestParamDiskFileGet, iBXRestParamDiskFileMarkDeleted } from '../../typification/rest/disk/file'
import {
  iBXRestParamFolderDeleteTree, iBXRestParamFolderGetChildren,
  iBXRestParamFolderGetExternalLink,
  iBXRestParamFolderRestore
} from '../../typification/rest/disk/folder'
import {
  $copyto,
  $disk,
  $folder,
  $get,
  $getchildren,
  $getFields, $markdeleted,
  $moveto,
  $rename, $restore, $uploadfile
} from '../../consts/part-name-methods'

export class BXRestNavvyDiskFolder {
  protected url = {
    getFields: [$disk, $folder, $getFields],
    get: [$disk, $folder, $get],
    getChildren: [$disk, $folder, $getchildren],
    addSubFolder: [$disk, $folder, 'addsubfolder'],
    copyTo: [$disk, $folder, $copyto],
    moveTo: [$disk, $folder, $moveto],
    rename: [$disk, $folder, $rename],
    deleteTree: [$disk, $folder, 'deletetree'],
    markDeleted: [$disk, $folder, $markdeleted],
    restore: [$disk, $folder, $restore],
    uploadFile: [$disk, $folder, $uploadfile],
    getExternalLink: [$disk, $folder, 'getExternalLink']
  }
  private Navvy = new Navvy()

  /**
   * Возвращает папку по идентификатору
   *
   * @param param
   */
  get(param: iBXRestParamDiskFileGet) {
    return this.Navvy.simple(
      this.url.get,
      param,
      BXRestMapDiskFolder.FolderHttpToFolder
    )
  }

  /**
   * Создает дочернюю папку
   *
   * @param param
   */
  addSubFolder(param: iBXRestDiskFolderAddSubFolderParam) {
    return this.Navvy.simple(
      this.url.addSubFolder,
      param,
      BXRestMapDiskFolder.FolderHttpToFolder
    )
  }

  /**
   * Копирует папку в указанную папку
   *
   * @param param
   */
  copyTo(param: iBXRestDiskFolderCopyToParam) {
    return this.Navvy.simple(
      this.url.copyTo,
      param,
      BXRestMapDiskFolder.FolderHttpToFolder
    )
  }

  /**
   * Перемещает папку в указанную папку
   *
   * @param param
   */
  moveTo(param: iBXRestDiskFolderMoveToParam) {
    return this.Navvy.simple(
      this.url.moveTo,
      param,
      BXRestMapDiskFolder.FolderHttpToFolder
    )
  }

  /**
   * Переименовывает папку
   *
   * @param param
   */
  rename(param: iBXRestDiskFolderRenameParam) {
    return this.Navvy.simple(
      this.url.rename,
      param,
      BXRestMapDiskFolder.FolderHttpToFolder
    )
  }

  /**
   * Уничтожает папку и всё её дочерние элементы навсегда
   * В ответе 'result': true - успешное уничтожение папки
   *
   * @param param
   */
  deleteTree(param: iBXRestParamFolderDeleteTree) {
    return this.Navvy.simple(
      this.url.deleteTree,
      param
    )
  }

  /**
   * Перемещает папку в корзину
   *
   * @param param
   */
  markDeleted(param: iBXRestParamDiskFileMarkDeleted) {
    return this.Navvy.simple(
      this.url.markDeleted,
      param,
      BXRestMapDiskFolder.FolderHttpToFolder
    )
  }

  /**
   * Восстанавливает папку из корзины
   *
   * @param param
   */
  restore(param: iBXRestParamFolderRestore) {
    return this.Navvy.simple(
      this.url.restore,
      param,
      BXRestMapDiskFolder.FolderHttpToFolder
    )
  }

  /**
   * Метод возвращает публичную ссылку
   *
   * @param param
   */
  getExternalLink(param: iBXRestParamFolderGetExternalLink) {
    return this.Navvy.simple(
      this.url.getExternalLink,
      param
    )
  }

  /**
   * Возвращает описание полей папки
   */
  getFields() {
    return this.Navvy.simple(
      this.url.getFields
    )
  }

  /**
   * Загружает новый файл в указанную папку
   *
   * @param param
   */
  uploadFile(param: iBXRestDiskFolderUploadFileParam) {
    return this.Navvy.simple(
      this.url.uploadFile,
      param,
      BXRestMapDiskFolder.FolderHttpToFolder
    )
  }

  /**
   * Возвращает список файлов и папок, которые находятся непосредственно в папке
   *
   * @param param
   */
  getChildren(param: iBXRestParamFolderGetChildren) {
    return this.Navvy.simple(
      this.url.getChildren,
      param,
      BXRestMapDiskFolder.getChildren
    )
  }

}
