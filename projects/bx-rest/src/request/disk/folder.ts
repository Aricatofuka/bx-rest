import { Injectable } from '@angular/core'
import {
  $copyto, $disk, $folder, $get, $getchildren, $getFields,
  $markdeleted, $moveto, $rename, $restore, $uploadfile
} from '../../consts/part-name-methods'
import { HttpBXServices } from '../../services/http/HttpBX'
import { iBXRestFolderHttp } from '../../typification/rest/disk/folder'
import { iBXRestDiskFileHttp } from '../../typification/rest/disk/file'
import { iBXRestDiskFolderUploadFileParam } from '../../typification/rest/disk/folder/uploadFile'
import { iBXRestDiskFolderGetFieldsHttp } from '../../typification/rest/disk/folder/getFields'
import { iBXRestDiskFolderAddSubFolderParam } from '../../typification/rest/disk/folder/addSubFolder'
import { iBXRestDiskFolderCopyToParam } from '../../typification/rest/disk/folder/copyTo'
import { iBXRestDiskFolderMoveToParam } from '../../typification/rest/disk/folder/moveTo'
import { iBXRestDiskFolderRenameParam } from '../../typification/rest/disk/folder/rename'

@Injectable({
  providedIn: 'root'
})
export class BXRestDiskFolder {

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

  constructor(
    private http: HttpBXServices,
  ) {
  }

  /**
   * Возвращает папку по идентификатору
   *
   * @param id
   */
  get(id: number) {
    return this.http.post<iBXRestFolderHttp>(this.url.get, {id: id})
  }

  /**
   * Создает дочернюю папку
   *
   * @param param
   */
  addSubFolder(param: iBXRestDiskFolderAddSubFolderParam){
    return this.http.post<iBXRestFolderHttp>(this.url.addSubFolder, param)
  }

  /**
   * Копирует папку в указанную папку
   *
   * @param param
   */
  copyTo(param: iBXRestDiskFolderCopyToParam){
    return this.http.post<iBXRestFolderHttp>(this.url.copyTo, param)
  }

  /**
   * Перемещает папку в указанную папку
   *
   * @param param
   */
  moveTo(param: iBXRestDiskFolderMoveToParam){
    return this.http.post<iBXRestFolderHttp>(this.url.moveTo, param)
  }

  /**
   * Переименовывает папку
   *
   * @param param
   */
  rename(param: iBXRestDiskFolderRenameParam){
    return this.http.post<iBXRestFolderHttp>(this.url.rename, param)
  }

  /**
   * Уничтожает папку и всё её дочерние элементы навсегда
   * В ответе 'result': true - успешное уничтожение папки
   *
   * @param id
   */
  deleteTree(id: number){
    return this.http.post<boolean>(
      this.url.deleteTree,
      {id: id}
    )
  }

  /**
   * Перемещает папку в корзину
   *
   * @param id
   */
  markDeleted(id: number){
    return this.http.post<iBXRestFolderHttp>(
      this.url.markDeleted,
      {id: id}
    )
  }

  /**
   * Восстанавливает папку из корзины
   *
   * @param id
   */
  restore(id: number){
    return this.http.post<iBXRestFolderHttp>(
      this.url.restore,
      {id: id}
    )
  }

  /**
   * Метод возвращает публичную ссылку
   *
   * @param id
   */
  getExternalLink(id: number){
    return this.http.post<string>(
      this.url.restore,
      {id: id}
    )
  }


  /**
   * Возвращает описание полей папки
   */
  getFields() {
    return this.http.post<iBXRestDiskFolderGetFieldsHttp>(this.url.getFields)
  }

  /**
   * Загружает новый файл в указанную папку
   *
   * @param param
   */
  uploadFile(param: iBXRestDiskFolderUploadFileParam) {
    return this.http.post<iBXRestFolderHttp>(
      this.url.uploadFile,
      param
    )
  }

  /**
   * Возвращает список файлов и папок, которые находятся непосредственно в папке
   *
   * @param id
   */
  getChildren(id: number) {
    return this.http.post<(iBXRestFolderHttp | iBXRestDiskFileHttp)[]>(
      this.url.getChildren,
      {id: id}
    )
  }
}
