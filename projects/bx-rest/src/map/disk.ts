import { Injectable } from '@angular/core'
import BXRestMapDiskFolder from './disk/folder'


@Injectable({
  providedIn: 'root'
})
export class BXRestMapDisk {

  constructor(public folder: BXRestMapDiskFolder) {
  }
}
