import { Injectable } from '@angular/core'
import {
  $copyto, $disk, $folder, $get, $getchildren, $getFields,
  $markdeleted, $moveto, $rename, $restore, $uploadfile
} from '../../consts/part-name-metods'
import HttpBXServices from '../../services/http/HttpBX'
import { iBXRestFolderHttp } from '../../typification/rest/disk/folder'
import { iBXRestFileHttp } from '../../typification/rest/disk/file'

@Injectable({
  providedIn: 'root'
})
export class BXRestDiskFolder {
  url = {
    getfields: [$disk, $folder, $getFields], // Возвращает описание полей папки
    get: [$disk, $folder, $get], // Возвращает папку по идентификатору
    getchildren: [$disk, $folder, $getchildren], // Возвращает список файлов и папок, которые находятся непосредственно в папке
    addsubfolder: [$disk, $folder, 'addsubfolder'], // Создает дочернюю папку
    copyto: [$disk, $folder, $copyto], // Копирует папку в указанную папку
    moveto: [$disk, $folder, $moveto], // Перемещает папку в указанную папку
    rename: [$disk, $folder, $rename], // Переименовывает папку
    deletetree: [$disk, $folder, 'deletetree'], // Уничтожает папку и всё её дочерние элементы навсегда
    markdeleted: [$disk, $folder, $markdeleted], // Перемещает папку в корзину
    restore: [$disk, $folder, $restore], //	Восстанавливает папку из корзины
    uploadfile: [$disk, $folder, $uploadfile], // Загружает новый файл в указанную папку
    getExternalLink: [$disk, $folder, 'getExternalLink'] // Метод возвращает публичную ссылку
  }

  constructor(
    private http: HttpBXServices,
  ) {
  }

  uploadfile(id: number, fileContent: string[]) {
    return this.http.post(
      this.url.uploadfile,
      {
        id: id, // Идентификатор папки. В текущем API загружать файл по пути к папке невозможно. Необходимо обязательно вычислить ID папки
        fileContent: fileContent, // Аналогично 'DETAIL_PICTURE' в примере Обработка файлов (['имя файла', 'содержимое в base64'])
        data: {
          NAME: fileContent[0]
        } // Обязательное поле NAME - имя нового файла
        // generateUniqueName	Необязательный, по умолчанию false. При указании true, для загружаемого файла будет уникализировано имя, добавлением суффикса (1), (2) и т.п.
        // rights	Необязательный, по умолчанию пустой массив. Массив прав доступа на загружаемый файл.
      }
    )
  }

  getchildren(id: number) {
    return this.http.post<(iBXRestFolderHttp | iBXRestFileHttp)[]>(
      this.url.getchildren,
      {id: id}
    )
  }
}
