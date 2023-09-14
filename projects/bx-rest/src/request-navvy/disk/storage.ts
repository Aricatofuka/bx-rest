import { Injectable } from '@angular/core'
import { BXRestDiskStorage } from '../../request/disk/storage'
import { map } from 'rxjs/operators';
import { BXRestMapResult } from '../../functions/mapResult'
import BXRestMapDiskStorage from '../../map/disk/storage'
import { iBXRestParamUploadFile } from '../../typification/rest/disk/storage/uploadfile'
import { Navvy } from '../../services/navvy'
import { SessionStorage } from '../../services/vanilla/sessionStorage'
import { iBXRestFolderInfo } from '../../typification/rest/disk/folder'
import { of, tap } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyDiskStorage {

  // BXDiskFolder$ = new Observable<BXDiskFolderStore>()

  constructor(
    private BXRestDiskStorage: BXRestDiskStorage,
    private BXRestMapDiskStorage: BXRestMapDiskStorage,
    private Navvy: Navvy,
    // private store: Store<{ BXDiskFolder: BXDiskFolderStore }>,

  ) {
    // this.BXDiskFolder$ = this.store.select('BXDiskFolder')
  }

  getforapp() {
    let res = SessionStorage.getItem<iBXRestFolderInfo>(this.constructor.name + this.getforapp.name)
    if(res){
      return of(res)
    } else {
      return this.Navvy.mapAndSnackBarError(this.BXRestDiskStorage.getforapp(), 'get root app folder').pipe(
        tap(v => {
          if(v){
            SessionStorage.setItem(this.constructor.name + this.getforapp.name, v)
          }
        })
      )
    }
  }

  // TODO: разобраться с фильтром позже
  getchildren(param: { id: number, filter?: any }) {
    return this.Navvy.mapAndSnackBarError(
      this.BXRestDiskStorage.getchildren(param),
      'get root app folders and files'
    ).pipe(
      map(v => {
        if (v && v.length) {
          return this.BXRestMapDiskStorage.getchildren(v)
        }
        return {file: [], folder: []}
      })
    )
  }

  // TODO: разобраться что возвращает и что вставлять
  addfolder(param: { id: number, data: { NAME: string } }) {
    return this.BXRestDiskStorage.addfolder(param).pipe(
      map(v => BXRestMapResult(v))
    )
  }

  uploadfile(param: iBXRestParamUploadFile) {
    return this.BXRestDiskStorage.uploadfile(param);
  }
}
