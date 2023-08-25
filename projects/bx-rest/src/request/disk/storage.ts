import { Injectable } from '@angular/core'
import {
  $disk, $get, $getchildren, $getFields, $getlist, $getTypes, $rename, $storage, $uploadfile
} from '../../consts/part-name-metods'
import HttpBXServices from '../../services/http/HttpBX'
import { iBXRestFile, iBXRestFileHttp } from '../../typification/rest/disk/file'
import { iBXRestFolderHttp, iBXRestFolderInfo } from '../../typification/rest/disk/folder'
import { iBXRestParamUploadFile } from '../../typification/rest/disk/storage/uploadfile'

@Injectable({
  providedIn: 'root'
})
export class BXRestDiskStorage {
  url = {
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

  // TODO: разобраться с фильтром
  getchildren(param: {id: number, filter?: any}) {
    return this.http.post<(iBXRestFolderHttp | iBXRestFileHttp)[]>(
      this.url.getchildren,
      param
    )
  }

  // TODO: разобраться что возвращает и что вставлять
  addfolder(param: {id: number, data: {NAME: string}}) {
    return this.http.post<any>(this.url.addfolder, param)
  }

  uploadfile(param: iBXRestParamUploadFile) {
    return this.http.post<iBXRestFile>(this.url.uploadfile, param)
  }

}
