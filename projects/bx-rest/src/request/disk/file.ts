import { Injectable } from '@angular/core'
import {
  $copyto,
  $delete,
  $disk,
  $file,
  $get,
  $getFields,
  $markdeleted,
  $moveto,
  $rename, $restore
} from '../../consts/part-name-methods'
import { HttpBXServices } from '../../services/http/HttpBX'
import { iBXRestDiskFileHttp } from '../../typification/rest/disk/file'

@Injectable({
  providedIn: 'root'
})
export class BXRestDiskFile {

  protected url = {
    getFields: [$disk, $file, $getFields], // Возвращает описание полей файла
    get: [$disk, $file, $get], // Возвращает файл по идентификатору
    rename: [$disk, $file, $rename], // Переименовывает файл
    copyTo: [$disk, $file, $copyto], // Копирует файл в указанную папку
    moveto: [$disk, $file, $moveto], // Перемещает файл в указанную папку
    delete: [$disk, $file, $delete], // Уничтожает файл навсегда
    markDeleted: [$disk, $file, $markdeleted], // Перемещает файл в корзину
    restore: [$disk, $file, $restore], // Восстанавливает файл из корзины
    uploadVersion: [$disk, $file, 'uploadversion'], // Загружает новую версию файла
    getVersions: [$disk, $file, 'getVersions'], // Возвращает список версий файла
    restoreFromVersion: [$disk, $file, 'restoreFromVersion'], // Восстанавливает файл из конкретной версии
    getExternalLink: [$disk, $file, 'getexternallink'] //	Возвращает публичную ссылку на файл
  }

  constructor(private http: HttpBXServices) {
  }

  get(id: number) {
    return this.http.post<iBXRestDiskFileHttp>(this.url.get, {id: id})
  }

  markDeleted(id: number) {
    return this.http.post<iBXRestDiskFileHttp>(
      this.url.markDeleted,
      {id: id})
  }
}
