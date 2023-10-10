import { Injectable } from '@angular/core'
import { BaseMapServices } from '../base'

@Injectable({
  providedIn: 'root'
})
export class BXRestMapTaskPlaner extends BaseMapServices {

  getList(v: (string | number)[] | undefined) {
    return (v) ? v.map(i => this.toNum(i)) : undefined
  }

}
