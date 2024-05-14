import { Injectable } from '@angular/core'
import { HttpBXServices } from '../../services/http/HttpBX'
import {
  iBXRestFolderHttp,
  iBXRestParamFolderDeleteTree,
  iBXRestParamFolderGet,
  iBXRestParamFolderGetChildren,
  iBXRestParamFolderGetExternalLink,
  iBXRestParamFolderMarkDeleted,
  iBXRestParamFolderRestore
} from '../../typification/rest/disk/folder'
import { iBXRestDiskFileHttp } from '../../typification/rest/disk/file'
import { iBXRestDiskFolderUploadFileParam } from '../../typification/rest/disk/folder/uploadFile'
import { iBXRestDiskFolderGetFieldsHttp } from '../../typification/rest/disk/folder/getFields'
import { iBXRestDiskFolderAddSubFolderParam } from '../../typification/rest/disk/folder/addSubFolder'
import { iBXRestDiskFolderCopyToParam } from '../../typification/rest/disk/folder/copyTo'
import { iBXRestDiskFolderMoveToParam } from '../../typification/rest/disk/folder/moveTo'
import { iBXRestDiskFolderRenameParam } from '../../typification/rest/disk/folder/rename'
import { methods } from '../../typification/base/methods'

@Injectable({
  providedIn: 'root'
})
export class BXRestDiskFolder {

  protected url = methods.disk.folder

  constructor(
    private http: HttpBXServices,
  ) {
  }

  /**
   * Возвращает папку по идентификатору
   *
   * @param param
   */
  get(param: iBXRestParamFolderGet) {
    return this.http.post<iBXRestFolderHttp>(this.url.get, param)
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
   * @param param
   */
  deleteTree(param: iBXRestParamFolderDeleteTree){
    return this.http.post<boolean>(
      this.url.deleteTree,
      param
    )
  }

  /**
   * Перемещает папку в корзину
   *
   * @param param
   */
  markDeleted(param: iBXRestParamFolderMarkDeleted){
    return this.http.post<iBXRestFolderHttp>(
      this.url.markDeleted,
      param
    )
  }

  /**
   * Восстанавливает папку из корзины
   *
   * @param param
   */
  restore(param: iBXRestParamFolderRestore){
    return this.http.post<iBXRestFolderHttp>(
      this.url.restore,
      param
    )
  }

  /**
   * Метод возвращает публичную ссылку
   *
   * @param param
   */
  getExternalLink(param: iBXRestParamFolderGetExternalLink){
    return this.http.post<string>(
      this.url.restore,
      param
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
   * @param param
   */
  getChildren(param: iBXRestParamFolderGetChildren) {
    return this.http.post<(iBXRestFolderHttp | iBXRestDiskFileHttp)[]>(
      this.url.getChildren,
      param
    )
  }
}
