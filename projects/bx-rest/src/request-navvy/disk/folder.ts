import { Injectable } from '@angular/core'
import { map } from 'rxjs/operators'
import BXRestMapDiskFolder from '../../map/disk/folder'
import { BXRestDiskFolder } from '../../request/disk/folder'
import { BXRestMapResult } from '../../functions/mapResult'

@Injectable({
  providedIn: 'root'
})
export class BXRestDiskNavvyFolder {

  constructor(
    private BXRestDiskFolder: BXRestDiskFolder,
    private BXRestMapDiskFolder: BXRestMapDiskFolder
    // private diskFileBaseMap: diskFileBaseMapServices
  ) {
  }

  // uploadfile(id: number, fileContent: string[]) {
  //   return this.httpPost(
  //     this.url.uploadfile,
  //     {
  //       id: id, // Идентификатор папки. В текущем API загружать файл по пути к папке невозможно. Необходимо обязательно вычислить ID папки
  //       fileContent: fileContent, // Аналогично 'DETAIL_PICTURE' в примере Обработка файлов (['имя файла', 'содержимое в base64'])
  //       data: {
  //         NAME: fileContent[0]
  //       } // Обязательное поле NAME - имя нового файла
  //       // generateUniqueName	Необязательный, по умолчанию false. При указании true, для загружаемого файла будет уникализировано имя, добавлением суффикса (1), (2) и т.п.
  //       // rights	Необязательный, по умолчанию пустой массив. Массив прав доступа на загружаемый файл.
  //     }
  //   )
  // }

  getchildren(id: number) {
    return this.BXRestDiskFolder.getchildren(id).pipe(
      map(v => {
        if (v && v.result) {
          return this.BXRestMapDiskFolder.getContent(BXRestMapResult(v))
        }
        return {file: [], folder: []}
      })
    )
  }

}
