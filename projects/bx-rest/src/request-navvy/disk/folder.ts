import { Injectable } from '@angular/core'
import BXRestMapDiskFolder from '../../map/disk/folder'
import { BXRestDiskFolder } from '../../request/disk/folder'
import { Navvy } from '../../services/navvy'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyDiskFolder {

  private Navvy: Navvy<BXRestDiskFolder, BXRestMapDiskFolder>

  constructor(
    private BXRestDiskFolder: BXRestDiskFolder,
    private BXRestMapDiskFolder: BXRestMapDiskFolder,
    // private diskFileBaseMap: diskFileBaseMapServices
  ) {
    this.Navvy = new Navvy(this.BXRestDiskFolder, this.BXRestMapDiskFolder)
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
    return this.Navvy.simpleWithArg(
      this.BXRestDiskFolder.getchildren,
      id,
      this.BXRestMapDiskFolder.getContent
    )
  }

}
