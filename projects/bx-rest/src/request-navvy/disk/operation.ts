import { Injectable } from '@angular/core'
import { BXRestDiskNavvyFolder } from './folder'
import { map, mergeMap, take } from 'rxjs/operators'
import { BXRestNavvyDiskFile } from './file'
import { BXRestNavvyDiskStorage } from './storage'
import { BXRestMapResult } from '../../functions/mapResult'
import { of } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyDiskOperation {

  constructor(
    public folder: BXRestDiskNavvyFolder,
    public disk: BXRestNavvyDiskFile,
    private storage: BXRestNavvyDiskStorage,
  ) {
  }

  // данные файла в base64
  loadFileInAppFolder(file: { name: string, val: string }) {
    return this.storage.getforapp().pipe(
      take(1),
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
            }).pipe(
            map(v => BXRestMapResult(v)),
          )
        }
        return of(undefined)
      })
    )
  }

  getOfCreateRootContentFolderApp(folderName: string) {
    return this.getOfCreateRootFolderApp(folderName).pipe(
      mergeMap(v => {
        if (v) {
          return this.folder.getchildren(v.ID)
        }
        return of(undefined)
      })
    )
  }

  getRootFoldersApp() {
    // return this.BXDiskFolder$.pipe(
    //   take(1),
    //   mergeMap(
    //     saveData => {
    //       if (saveData.content.root.app) {
    //         return of(saveData.content.root.app)
    //       }
    return this.storage.getforapp().pipe(
      mergeMap(v => {
        if (v && v.ID) {
          return this.storage.getchildren({id: v.ID})
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
    )
    //     }
    //   )
    // )
  }


  /**
   * Получать или создать папку, если её нет, с определенным именем для приложения
   * @param folderName
   */
  getOfCreateRootFolderApp(folderName: string) {
    return this.getRootFoldersApp().pipe(
      mergeMap(v => {
          if (v) {
            if (v.folder.length) {
              let find = v.folder.find(i => i.NAME === folderName)
              if (find) {
                return of(find)
              }
            }
          }
          return this.storage.getforapp().pipe(
            mergeMap(v => {
              if (v && v.ID) {
                return this.storage.addfolder({id: v.ID, data: {NAME: folderName}})
              }
              return of(undefined)
            })
          )
        }
      ))
  }

}
