import { inject, Injectable } from '@angular/core'
import BXRestMapDiskStorage from '../../map/disk/storage'
import { iBXRestParamUploadFile } from '../../typification/rest/disk/storage/uploadfile'
import { Navvy } from '../../services/navvy'
import { iBXRestParamGetchildren } from '../../typification/rest/disk/storage/getchildren'
import { BXRestNavvyInterlayerDiskStorage } from './interlayer/storage'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyDiskStorage {

  private readonly BXRestNavvyInterlayerDiskStorage = inject(BXRestNavvyInterlayerDiskStorage)
  private readonly BXRestMapDiskStorage = inject(BXRestMapDiskStorage)
  private Navvy = new Navvy(this.BXRestNavvyInterlayerDiskStorage, this.BXRestMapDiskStorage)

  getForApp() {
    return this.Navvy.simple(this.BXRestNavvyInterlayerDiskStorage.getForApp)
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
    return this.Navvy.simpleWithArg(
      this.BXRestNavvyInterlayerDiskStorage.getChildren,
      param,
      this.BXRestMapDiskStorage.getChildren
    )
  }

  addFolder(param: { id: number, data: { NAME: string } }) {
    return this.Navvy.simpleWithArg(
      this.BXRestNavvyInterlayerDiskStorage.addFolder,
      param,
      this.BXRestMapDiskStorage.addFolder
    )
  }

  uploadFile(param: iBXRestParamUploadFile) {
    return this.Navvy.simpleWithArg(this.BXRestNavvyInterlayerDiskStorage.uploadFile, param)
  }
}
