import { Injectable } from '@angular/core'
import { BXRestDiskStorage } from '../../request/disk/storage'
import BXRestMapDiskStorage from '../../map/disk/storage'
import { iBXRestParamUploadFile } from '../../typification/rest/disk/storage/uploadfile'
import { Navvy } from '../../services/navvy'
import { SessionStorage } from '../../services/vanilla/sessionStorage'
import { iBXRestFolderInfo } from '../../typification/rest/disk/folder'
import { of, tap } from 'rxjs'
import { iBXRestParamGetchildren } from '../../typification/rest/disk/storage/getchildren'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyDiskStorage {

  // BXDiskFolder$ = new Observable<BXDiskFolderStore>()
  private Navvy: Navvy<BXRestDiskStorage, BXRestMapDiskStorage>

  constructor(
    private BXRestDiskStorage: BXRestDiskStorage,
    private BXRestMapDiskStorage: BXRestMapDiskStorage,
    // private store: Store<{ BXDiskFolder: BXDiskFolderStore }>,
  ) {
    this.Navvy = new Navvy(this.BXRestDiskStorage, this.BXRestMapDiskStorage)
    // this.BXDiskFolder$ = this.store.select('BXDiskFolder')
  }

  getforapp() {
    return this.Navvy.simple(this.getforappEnd, 'get root app folder')
  }

  private getforappEnd(){
    let res = SessionStorage.getItem<iBXRestFolderInfo>(this.constructor.name + this.getforapp.name)
    if(res){
      return of({result: res})
    } else {
      return this.BXRestDiskStorage.getforapp().pipe(
        tap(v => {
          if(v){
            SessionStorage.setItem(this.constructor.name + this.getforapp.name, v)
          }
        })
      )
    }
  }

  getchildren(param: iBXRestParamGetchildren) {
    return this.Navvy.simpleWithArg(
      this.BXRestDiskStorage.getchildren,
      param,
      'get root app folders and files',
      this.BXRestMapDiskStorage.getchildren
    )
  }

  // TODO: разобраться что возвращает и что вставлять
  addfolder(param: { id: number, data: { NAME: string } }) {
    return this.Navvy.simpleWithArg(this.BXRestDiskStorage.addfolder, param)
  }

  uploadfile(param: iBXRestParamUploadFile) {
    return this.Navvy.simpleWithArg(this.BXRestDiskStorage.uploadfile, param)
  }
}
