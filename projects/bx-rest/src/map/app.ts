import { iBXRestAppInfo, iBXRestAppInfoHttp } from '../typification/rest/app/info'
import { toNum } from '../services/base'

export class BXRestMapApp {
  static info(value: iBXRestAppInfoHttp | undefined): iBXRestAppInfo | undefined {
    return (value)
      ? {... value, ... {ID: toNum(value.ID), PAYMENT_EXPIRED: value.PAYMENT_EXPIRED === 'Y'}}
      : undefined
  }
}
