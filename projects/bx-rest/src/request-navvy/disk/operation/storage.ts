import { BXRestDiskStorage } from '../../../request/disk/storage'
import { iBXRestParamUploadFile, iBXRestParamGetchildren, iBXRestFolderInfo } from '../../../typification/rest/disk'
import { of, shareReplay, tap } from 'rxjs'
import { SessionStorage } from '../../../services/vanilla/sessionStorage'
import { iBXRestAnswer } from '../../../typification/rest/base'

/**
 * В будущем будет реализовано сохранение на уровне класса navvy, пока оставим так, чтобы не дропать фичу
 *
 * @deprecated
 */
export class BXRestNavvyOperationDiskStorage {

  private readonly BXRestDiskStorage = new BXRestDiskStorage()

  getForApp() {
    let res = SessionStorage.getItem<iBXRestAnswer<iBXRestFolderInfo>>(this.constructor.name + this.getForApp.name)
    if (res) {
      return of(res)
    } else {
      return this.BXRestDiskStorage.getForApp().pipe(
        tap(v => {
          if (v) {
            SessionStorage.setItem(this.constructor.name + this.getForApp.name, v)
          }
        }),
        shareReplay(1)
      )
    }
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
    return this.BXRestDiskStorage.getChildren(param)
  }

  // TODO: разобраться что возвращает и что вставлять
  addFolder(param: { id: number, data: { NAME: string } }) {
    return this.BXRestDiskStorage.addFolder(param)
  }

  uploadFile(param: iBXRestParamUploadFile) {
    return this.BXRestDiskStorage.uploadFile(param)
  }
}
