import { BXRestNavvyDiskFolder } from './folder'
import { mergeMap } from 'rxjs/operators'
import { BXRestNavvyDiskFile } from './file'
import { BXRestNavvyDiskStorage } from './storage'
import { of, throwError } from 'rxjs'

export class BXRestNavvyDiskOperation {

  public readonly folder = new BXRestNavvyDiskFolder()
  public readonly disk = new BXRestNavvyDiskFile()
  private readonly storage = new BXRestNavvyDiskStorage()

  // данные файла в base64
  loadFileInAppFolder(file: {
    name: string,
    val: string
  }) {
    return this.storage.getForApp().res().pipe(
        mergeMap(infoFolder => {
          if (infoFolder) {
            return this.storage.uploadFile(
              {
                id: infoFolder.ID,
                fileContent: [file.name, file.val],
                data: {
                  NAME: file.name
                },
                generateUniqueName: true
              }).res()
          }
          return throwError(() => new Error('Отсутствует общее хранилище для приложения'))
        })
      )
  }

  getOfCreateRootContentFolderApp(folderName: string) {
    return this.getOfCreateRootFolderApp(folderName).pipe(
      mergeMap(v => {
        if (v) {
          return this.folder.getChildren({id: v.ID}).res()
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


    return this.storage.getForApp().res().pipe(
      mergeMap(v => {
        if (v && v.ID) {
          return this.storage.getChildren({id: v.ID}).res()
        }
        return of(undefined)
      })
    )
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
        return this.storage.getForApp().res().pipe(
          mergeMap(v => {
            if (v && v.ID) {
              return this.storage.addFolder({id: v.ID, data: {NAME: folderName}}).res()
            }
            return throwError(() => new Error('Отсутствуют права добавление записи затраченного времени'))
          })
        )
        }
      ))
  }

}
