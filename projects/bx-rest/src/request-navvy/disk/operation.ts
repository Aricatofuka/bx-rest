import { Injectable } from '@angular/core'
import { BXRestNavvyDiskFolder } from './folder'
import { mergeMap } from 'rxjs/operators'
import { BXRestNavvyDiskFile } from './file'
import { BXRestNavvyDiskStorage } from './storage'
import { of, throwError } from 'rxjs'
import { Navvy } from '../../services/navvy'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyDiskOperation {

  constructor(
    public folder: BXRestNavvyDiskFolder,
    public disk: BXRestNavvyDiskFile,
    private storage: BXRestNavvyDiskStorage,
  ) {
  }

  // данные файла в base64
  loadFileInAppFolder(file: {
    name: string,
    val: string
  }) {
    return new Navvy(this.storage.getforapp().result().pipe(
      mergeMap(infoFolder => {
        if (infoFolder) {
          return this.storage.uploadfile(
            {
              id: infoFolder.ID,
              fileContent: [file.name, file.val],
              data: {
                NAME: file.name
              },
              generateUniqueName: true
            }).resultVanilla()
        }
        return throwError(() => new Error('Отсутствует общее хранилище для приложения'))
      })
    ))
  }

  getOfCreateRootContentFolderApp(folderName: string) {
    return new Navvy(this.getOfCreateRootFolderApp(folderName).result().pipe(
      mergeMap(v => {
        if (v) {
          return this.folder.getchildren(v.ID).mapForVanilla()
        }
        return of(undefined)
      })
    ))
  }

  getRootFoldersApp() {
    // return this.BXDiskFolder$.pipe(
    //   take(1),
    //   mergeMap(
    //     saveData => {
    //       if (saveData.content.root.app) {
    //         return of(saveData.content.root.app)
    //       }
    return new Navvy(this.storage.getforapp().result().pipe(
      mergeMap(v => {
        if (v && v.ID) {
          return this.storage.getchildren({id: v.ID}).mapForVanilla()
          //   .pipe(
          //   tap(v => {
          //     if (v) {
          //       this.store.dispatch(saveContentRootAppInfo({value: v}))
          //     }
          //   })
          // )
        }
        return of(undefined)
      })
    ))
    //     }
    //   )
    // )
  }

  /**
   * Получать или создать папку, если её нет, с определенным именем для приложения
   * @param folderName
   */
  getOfCreateRootFolderApp(folderName: string) {
    return new Navvy(this.getRootFoldersApp().result().pipe(
      mergeMap(v => {
          if (v) {
            if (v.folder.length) {
              let find = v.folder.find(i => i.NAME === folderName)
              if (find) {
                return of({result: find})
              }
            }
          }
          return this.storage.getforapp().result().pipe(
            mergeMap(v => {
              if (v && v.ID) {
                return this.storage.addfolder({id: v.ID, data: {NAME: folderName}}).resultVanilla()
              }
              return throwError(() => new Error('Отсутствуют права добавление записи затраченного времени'))
            })
          )
        }
      )))
  }

}
