import { Injectable } from '@angular/core'
import { iBXRestAppInfo, iBXRestAppInfoHttp } from '../typification/rest/app/info'
import { BaseMapServices } from './base'

@Injectable({
  providedIn: 'root'
})
export class BXRestMapApp extends BaseMapServices {
  info(value: iBXRestAppInfoHttp | undefined): iBXRestAppInfo | undefined {
    return (value)
      ? {... value, ... {ID: this.toNum(value.ID), PAYMENT_EXPIRED: value.PAYMENT_EXPIRED === 'Y'}}
      : undefined
  }
}
