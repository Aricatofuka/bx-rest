import { inject, Injectable } from '@angular/core'
import {
  $disk, $get, $getchildren, $getFields, $getlist, $getTypes, $rename, $storage, $uploadfile
} from '../../consts/part-name-methods'
import { HttpBXServices } from '../../services/http/HttpBX'
import { iBXRestDiskFile, iBXRestDiskFileHttp } from '../../typification/rest/disk/file'
import { iBXRestFolderHttp, iBXRestFolderInfo } from '../../typification/rest/disk/folder'
import { iBXRestParamUploadFile } from '../../typification/rest/disk/storage/uploadfile'
import { iBXRestParamGetchildren } from '../../typification/rest/disk/storage/getchildren'

@Injectable({
  providedIn: 'root'
})
export class BXRestDiskStorage {

  protected url = {
    getFields: [$disk, $storage, $getFields],  // Возвращает описание полей хранилища
    get: [$disk, $storage, $get], //	Возвращает хранилище по идентификатору
    rename: [$disk, $storage, $rename], // Переименовывает хранилище.
    // Допустимо переименование только хранилища приложения (см. disk.storage.getforapp)
    getList: [$disk, $storage, $getlist], //	Возвращает список доступных хранилищ
    getTypes: [$disk, $storage, $getTypes], // Возвращает список типов хранилищ
    addFolder: [$disk, $storage, 'addfolder'], // Создает папку в корне хранилища
    getChildren: [$disk, $storage, $getchildren], //	Возвращает список файлов и папок,
    // которые находятся непосредственно в корне хранилища
    uploadFile: [$disk, $storage, $uploadfile], //	Загружает новый файл в корне хранилища
    getForApp: [$disk, $storage, 'getforapp'] //	Возвращает описание хранилища,
    // с которым может работать приложение для хранения своих данных (файлов и папок)
  }

  private readonly http = inject(HttpBXServices)

  getForApp() {
    return this.http.post<iBXRestFolderInfo>(
      this.url.getForApp, {}
    )
  }

  getChildren(param: iBXRestParamGetchildren) {
    return this.http.post<(iBXRestFolderHttp | iBXRestDiskFileHttp)[]>(
      this.url.getChildren,
      param
    )
  }

  // TODO: Сделать нормальное описание параметров
  addFolder(param: {id: number, data: {NAME: string}}) {
    return this.http.post<iBXRestFolderHttp>(this.url.addFolder, param)
  }

  uploadFile(param: iBXRestParamUploadFile) {
    return this.http.post<iBXRestDiskFile>(this.url.uploadFile, param)
  }

}
