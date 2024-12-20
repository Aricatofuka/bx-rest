import { inject, Injectable } from '@angular/core'
import { BXRestDiskFile } from '../../request/disk/file'
import { Navvy } from '../../services/navvy'
import { BXRestMapDiskFile } from '../../map/disk/file'
import { iBXRestParamDiskFileGet, iBXRestParamDiskFileMarkDeleted } from '../../typification/rest/disk/file'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyDiskFile {

  private readonly BXRestDiskFile = inject(BXRestDiskFile)
  private readonly BXRestMapDiskFile = inject(BXRestMapDiskFile)
  private Navvy = new Navvy(this.BXRestDiskFile, this.BXRestMapDiskFile)

  get(param: iBXRestParamDiskFileGet) {
    return this.Navvy.simpleWithArg(
      this.BXRestDiskFile.get,
      param,
      this.BXRestMapDiskFile.get
    )
  }

  markDeleted(param: iBXRestParamDiskFileMarkDeleted) {
    return this.Navvy.simpleWithArg(
      this.BXRestDiskFile.markDeleted,
      param,
      this.BXRestMapDiskFile.markdeleted
    )
  }
}
