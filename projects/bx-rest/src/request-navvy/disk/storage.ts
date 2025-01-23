import { BXRestMapDiskStorage } from '../../map/disk/storage'
import { iBXRestParamUploadFile } from '../../typification/rest/disk/storage/uploadfile'
import { Navvy } from '../../services/navvy'
import { iBXRestParamGetchildren } from '../../typification/rest/disk/storage/getchildren'
import { BXRestNavvyOperationDiskStorage } from './operation/storage'
import {
  $disk,
  $get,
  $getchildren,
  $getFields,
  $getlist,
  $getTypes,
  $rename,
  $storage, $uploadfile
} from '../../consts/part-name-methods'
import { iBXRestFolder, iBXRestFolderHttp, iBXRestFolderInfo } from '../../typification/rest/disk/folder'
import { iBXRestDiskFile, iBXRestDiskFileHttp } from '../../typification/rest/disk/file'
import { iBXRestDiskFileAndFolderMap } from '../../typification/rest/disk/map'

export class BXRestNavvyDiskStorage {

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

  public operation = new BXRestNavvyOperationDiskStorage()
  private Navvy = new Navvy()

  getForApp() {
    return this.Navvy.simple<iBXRestFolderInfo>(this.url.getForApp)
  }

  /*
  private getforappEnd(){
    console.log('this.BXRestDiskStorage.getforapp()', this.BXRestDiskStorage.getforapp())
    let res = SessionStorage.getItem<iBXRestFolderInfo>(this.constructor.name + this.getforapp.name)
    if(res){
      return of({result: res})
    } else {
      console.log('this.BXRestDiskStorage.getforapp()', this.BXRestDiskStorage, this.BXRestDiskStorage.getforapp())
      return this.BXRestDiskStorage.getforapp().pipe(
        tap(v => {
          if(v){
            SessionStorage.setItem(this.constructor.name + this.getforapp.name, v)
          }
        })
      )
    }
  }
   */

  getChildren(param: iBXRestParamGetchildren) {
    return this.Navvy.simple<(iBXRestFolderHttp | iBXRestDiskFileHttp)[], iBXRestDiskFileAndFolderMap, iBXRestParamGetchildren>(
      this.url.getChildren,
      param,
      BXRestMapDiskStorage.getChildren
    )
  }

  addFolder(param: { id: number, data: { NAME: string } }) {
    return this.Navvy.simple<iBXRestFolderHttp, iBXRestFolder, { id: number, data: { NAME: string } }>(
      this.url.addFolder,
      param,
      BXRestMapDiskStorage.addFolder
    )
  }

  uploadFile(param: iBXRestParamUploadFile) {
    return this.Navvy.simple<iBXRestDiskFileHttp, iBXRestDiskFile, iBXRestParamUploadFile>(
      this.url.uploadFile,
      param,
      BXRestMapDiskStorage.uploadFile
    )
  }
}
