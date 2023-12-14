import { Injectable } from '@angular/core'
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
    getfields: [$disk, $storage, $getFields],  // Возвращает описание полей хранилища
    get: [$disk, $storage, $get], //	Возвращает хранилище по идентификатору
    rename: [$disk, $storage, $rename], // Переименовывает хранилище.
    // Допустимо переименование только хранилища приложения (см. disk.storage.getforapp)
    getlist: [$disk, $storage, $getlist], //	Возвращает список доступных хранилищ
    gettypes: [$disk, $storage, $getTypes], // Возвращает список типов хранилищ
    addfolder: [$disk, $storage, 'addfolder'], // Создает папку в корне хранилища
    getchildren: [$disk, $storage, $getchildren], //	Возвращает список файлов и папок,
    // которые находятся непосредственно в корне хранилища
    uploadfile: [$disk, $storage, $uploadfile], //	Загружает новый файл в корне хранилища
    getforapp: [$disk, $storage, 'getforapp'] //	Возвращает описание хранилища,
    // с которым может работать приложение для хранения своих данных (файлов и папок)
  }

  constructor(
    private http: HttpBXServices,
  ) {
  }

  getforapp() {
    return this.http.post<iBXRestFolderInfo>(
      this.url.getforapp, {}
    )
  }

  getchildren(param: iBXRestParamGetchildren) {
    return this.http.post<(iBXRestFolderHttp | iBXRestDiskFileHttp)[]>(
      this.url.getchildren,
      param
    )
  }

  // TODO: Сделать нормальное описание параметров
  addfolder(param: {id: number, data: {NAME: string}}) {
    return this.http.post<iBXRestFolderHttp>(this.url.addfolder, param)
  }

  uploadfile(param: iBXRestParamUploadFile) {
    return this.http.post<iBXRestDiskFile>(this.url.uploadfile, param)
  }

}
