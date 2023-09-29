import { iBXRestFileHttp } from '../../typification/rest/disk/file'
import { BaseMapServices } from '../base'
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class BXRestMapDiskFile extends BaseMapServices {

  get(v: iBXRestFileHttp | undefined){
    return (v) ? Object.assign(v, {SIZE: this.toNum(v.SIZE)}) : undefined
  }

  markdeleted(v: iBXRestFileHttp | undefined){
    return (v) ? Object.assign(v, {SIZE: this.toNum(v.SIZE)}) : undefined
  }
}
