import { Injectable } from '@angular/core'
import { BXRestDiskStorage } from '../../request/disk/storage'
import { map } from 'rxjs/operators';
import { BXRestMapResult } from '../../functions/mapResult'
import BXRestMapDiskStorage from '../../map/disk/storage'
import { iBXRestParamUploadFile } from '../../typification/rest/disk/storage/uploadfile'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyDiskStorage {

  // BXDiskFolder$ = new Observable<BXDiskFolderStore>()

  constructor(
    private BXRestDiskStorage: BXRestDiskStorage,
    private BXRestMapDiskStorage: BXRestMapDiskStorage
    // private store: Store<{ BXDiskFolder: BXDiskFolderStore }>,

  ) {
    // this.BXDiskFolder$ = this.store.select('BXDiskFolder')
  }

  getforapp() {
    // return this.BXDiskFolder$.pipe(
    //   take(1),
    //   mergeMap(
    //     saveData => {
    //       if (saveData.folder.app) {
    //         return of(saveData.folder.app)
    //       }
    return this.BXRestDiskStorage.getforapp().pipe(
      map(v => BXRestMapResult(v)),
      // tap(v => {
      //   if (v) {
      //     this.store.dispatch(saveFolderAppInfo({value: v}))
      //   }
      // })
    )
    //     }
    //   )
    // )
  }

  // TODO: разобраться с фильтром позже
  getchildren(param: { id: number, filter?: any }) {
    return this.BXRestDiskStorage.getchildren(param).pipe(
      map(v => BXRestMapResult(v)),
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
