import {
  iBXRestPullConfigGet,
  iBXRestPullConfigGetHttp
} from '../typification/rest/pull/config/get'
import { toDate } from '../services/base'
import { BXRestMapPullApplicationConfig } from './pull/application/config'

export class BXRestMapPull {
  static get(value: iBXRestPullConfigGetHttp | undefined): iBXRestPullConfigGet | undefined {
    if (!value) {
      return undefined
    }
    return {
      ...BXRestMapPullApplicationConfig.get(value),
      ...(value.serverTime ? { serverTime: toDate(value.serverTime) } : {}),
    } as iBXRestPullConfigGet
  }
}
