import { Injectable } from '@angular/core'
import { BaseServices } from '../../services/base'
import { map } from 'rxjs/operators'
import { BXRestDiskFile } from '../../request/disk/file'
import { Navvy } from '../../services/navvy'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyDiskFile extends BaseServices {

  constructor(
    private BXRestDiskFile: BXRestDiskFile,
    private Navvy: Navvy,
  ) {
    super()
  }

  get(id: number) {
    return this.Navvy.mapAndSnackBarError(this.BXRestDiskFile.get(id), 'Не удалось получить файл').pipe(
      map(v => {
        if (v) {
          return Object.assign(v, {SIZE: this.toNum(v.SIZE)})
        }
        return undefined
      })
    )
  }

  markDel(id: number) {
    return this.Navvy.mapAndSnackBarError(this.BXRestDiskFile.markDel(id), 'Не удалось переместить файл в корзину')
      .pipe(
        map(v => {
          if (v) {
            return Object.assign(v, {SIZE: this.toNum(v.SIZE)})
          }
          return undefined
        })
      )
  }
}
