import { Injectable } from '@angular/core'
import { BXRestDiskFile } from '../../request/disk/file'
import { Navvy } from '../../services/navvy'
import { BXRestMapDiskFile } from '../../map/disk/file'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyDiskFile {

  private Navvy: Navvy<BXRestDiskFile, BXRestMapDiskFile>

  constructor(
    private BXRestDiskFile: BXRestDiskFile,
    private BXRestMapDiskFile: BXRestMapDiskFile,
  ) {
    this.Navvy = new Navvy(this.BXRestDiskFile, this.BXRestMapDiskFile)
  }

  get(id: number) {
    return this.Navvy.simpleWithArg(
      this.BXRestDiskFile.get,
      id,
      this.BXRestMapDiskFile.get
    )
  }

  markDeleted(id: number) {
    return this.Navvy.simpleWithArg(
      this.BXRestDiskFile.markDeleted,
      id,
      this.BXRestMapDiskFile.markdeleted
    )
  }
}
