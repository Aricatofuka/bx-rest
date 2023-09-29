import { Injectable } from '@angular/core'
import { BXRestDiskStorage } from '../../../request/disk/storage'
import { iBXRestParamUploadFile } from '../../../typification/rest/disk/storage/uploadfile'
import { iBXRestParamGetchildren } from '../../../typification/rest/disk/storage/getchildren'
import { of, shareReplay, tap } from 'rxjs'
import { SessionStorage } from '../../../services/vanilla/sessionStorage'
import { iBXRestFolderInfo } from '../../../typification/rest/disk/folder'
import { iBXRestAnswer } from '../../../typification/rest/base/answer'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyInterlayerDiskStorage {

  constructor(
    private BXRestDiskStorage: BXRestDiskStorage
  ) {
  }

  getforapp() {
    let res = SessionStorage.getItem<iBXRestAnswer<iBXRestFolderInfo>>(this.constructor.name + this.getforapp.name)
    if (res) {
      return of(res)
    } else {
      return this.BXRestDiskStorage.getforapp().pipe(
        tap(v => {
          if (v) {
            SessionStorage.setItem(this.constructor.name + this.getforapp.name, v)
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

  getchildren(param: iBXRestParamGetchildren) {
    return this.BXRestDiskStorage.getchildren(param)
  }

  // TODO: разобраться что возвращает и что вставлять
  addfolder(param: { id: number, data: { NAME: string } }) {
    return this.BXRestDiskStorage.addfolder(param)
  }

  uploadfile(param: iBXRestParamUploadFile) {
    return this.BXRestDiskStorage.uploadfile(param)
  }
}
