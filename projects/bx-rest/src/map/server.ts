import { Injectable } from '@angular/core'
import { BaseMapServices } from './base'

@Injectable({
  providedIn: 'root'
})
export class BXRestMapServer extends BaseMapServices {
  time(v: string | undefined) {
    return (v) ? this.toDate(v) : undefined
  }
}
