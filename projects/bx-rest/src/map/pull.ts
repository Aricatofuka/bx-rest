import {
  iBXRestPullConfigGet,
  iBXRestPullConfigGetHttp
} from '../typification/rest/pull/config/get'
import { toDate } from '../services/base'
import { BXRestMapPullApplicationConfig } from './pull/application/config'

export class BXRestMapPull {
  static get(value: iBXRestPullConfigGetHttp | undefined): iBXRestPullConfigGet | undefined {
    // console.log('Object.entries(value.publicChannels)', value)
    //if(value?.publicChannels) {
      // console.log('Object.entries(value.publicChannels)',
      //   value.publicChannels, Object.entries(value.publicChannels), Object.fromEntries(Object.entries(value.publicChannels).map(([key, val]) => (
      //   [key,
      //     {
      //       ...val,
      //       start: toDate(val.start), end: toDate(val.end)
      //     } as iBXRestPullConfigPublicChannelsGet
      //   ]))) as Record<string, iBXRestPullConfigPublicChannelsGet>,)
    //}
    return value ? {... BXRestMapPullApplicationConfig.get(value), ...{serverTime: toDate(value.serverTime)}} as iBXRestPullConfigGet : undefined
  }
}