import { iBXRestPullChannelPublicGet, iBXRestPullChannelPublicGetHttp } from '../../typification/rest/pull/channel/get'
import { toDate } from '../../services/base'

export class BXRestMapPullChannelPublic {

  static get(value: iBXRestPullChannelPublicGetHttp | undefined): iBXRestPullChannelPublicGet | undefined {
    return value ? {
      ...value,
      start: toDate(value.start),
      end: toDate(value.end)
    }
    :  undefined
  }
}