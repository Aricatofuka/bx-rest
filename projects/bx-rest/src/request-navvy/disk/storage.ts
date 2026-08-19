import { BXRestMapDiskStorage } from '../../map/disk/storage'
import {
  iBXRestParamUploadFile, iBXRestParamGetchildren,
  iBXRestFolderInfo, iBXRestFolder,
  iBXRestFolderHttp,
  iBXRestDiskFile,
  iBXRestDiskFileHttp,
  iBXRestDiskFileAndFolderMap
} from '../../typification/rest/disk'
import { Navvy } from '../../services/navvy'
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
import { BXRestMapDiskFile } from '../../map/disk/file'

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

  /**
   * Возвращает описание хранилища приложения.
   */
  getForApp() {
    return this.Navvy.simple<iBXRestFolderInfo>(this.url.getForApp)
  }

  /**
   * Возвращает список файлов и папок в корне хранилища.
   */
  getChildren(param: iBXRestParamGetchildren) {
    return this.Navvy.simple<(iBXRestFolderHttp | iBXRestDiskFileHttp)[], iBXRestDiskFileAndFolderMap, iBXRestParamGetchildren>(
      this.url.getChildren,
      param,
      BXRestMapDiskStorage.getChildren
    )
  }

  /**
   * Создаёт папку в корне хранилища.
   */
  addFolder(param: { id: number, data: { NAME: string } }) {
    return this.Navvy.simple<iBXRestFolderHttp, iBXRestFolder, { id: number, data: { NAME: string } }>(
      this.url.addFolder,
      param,
      BXRestMapDiskStorage.addFolder
    )
  }

  /**
   * Загружает новый файл в корень хранилища.
   */
  uploadFile(param: iBXRestParamUploadFile) {
    return this.Navvy.simple<iBXRestDiskFileHttp, iBXRestDiskFile, iBXRestParamUploadFile>(
      this.url.uploadFile,
      param,
      BXRestMapDiskFile.get
    )
  }
}
