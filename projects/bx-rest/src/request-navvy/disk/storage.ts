import { Injectable } from '@angular/core'
import BXRestMapDiskStorage from '../../map/disk/storage'
import { iBXRestParamUploadFile } from '../../typification/rest/disk/storage/uploadfile'
import { Navvy } from '../../services/navvy'
import { iBXRestParamGetchildren } from '../../typification/rest/disk/storage/getchildren'
import { BXRestNavvyInterlayerDiskStorage } from './interlayer/storage'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyDiskStorage {

  private Navvy: Navvy<BXRestNavvyInterlayerDiskStorage, BXRestMapDiskStorage>

  constructor(
    private BXRestNavvyInterlayerDiskStorage: BXRestNavvyInterlayerDiskStorage,
    private BXRestMapDiskStorage: BXRestMapDiskStorage,
    // private store: Store<{ BXDiskFolder: BXDiskFolderStore }>,
  ) {
    this.Navvy = new Navvy(this.BXRestNavvyInterlayerDiskStorage, this.BXRestMapDiskStorage)
    // this.BXDiskFolder$ = this.store.select('BXDiskFolder')
  }

  getforapp() {
    // console.log('this.getforappEnd', this.getforappEnd)
    return this.Navvy.simple(this.BXRestNavvyInterlayerDiskStorage.getforapp)
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
    return this.Navvy.simpleWithArg(
      this.BXRestNavvyInterlayerDiskStorage.getchildren,
      param,
      this.BXRestMapDiskStorage.getchildren
    )
  }

  // TODO: разобраться что возвращает и что вставлять
  addfolder(param: { id: number, data: { NAME: string } }) {
    return this.Navvy.simpleWithArg(this.BXRestNavvyInterlayerDiskStorage.addfolder, param)
  }

  uploadfile(param: iBXRestParamUploadFile) {
    return this.Navvy.simpleWithArg(this.BXRestNavvyInterlayerDiskStorage.uploadfile, param)
  }
}
