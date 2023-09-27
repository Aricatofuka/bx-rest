import { Injectable } from '@angular/core'
import { BaseServices } from '../../services/base'
import { BXRestDiskFile } from '../../request/disk/file'
import { Navvy } from '../../services/navvy'
import { NavvyParam } from '../../services/Navvy/NavvyParam'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyDiskFile extends BaseServices {

  constructor(
    private BXRestDiskFile: BXRestDiskFile,
  ) {
    super()
  }

  get(id: number) {
    return new Navvy(
      this.BXRestDiskFile.get(id),
      'Не удалось получить файл',
      (v) => (v) ? Object.assign(v, {SIZE: this.toNum(v.SIZE)}) : undefined
    )
  }

  markDel(id: number) {
    return new Navvy(
      this.BXRestDiskFile.markDel(id),
      'Не удалось переместить файл в корзину',
      (v) => (v) ? Object.assign(v, {SIZE: this.toNum(v.SIZE)}) : undefined
    )
  }
}
