import {
  iBXRestPullApplicationConfigGet,
  iBXRestPullApplicationConfigGetHttp
} from '../../../typification/rest/pull/application/config/get'
import { toDate } from '../../../services/base'
import { iBXRestPullConfigPublicChannelsGet } from '../../../typification/rest/pull/config/get'

export class BXRestMapPullApplicationConfig {
  static get(value: iBXRestPullApplicationConfigGetHttp | undefined): iBXRestPullApplicationConfigGet | undefined {
    return value ?
      {
        ...value,
        ...{
          channels:
            {
              shared: {
                ...value.channels.shared, ...{
                  start: toDate(value.channels.shared.start),
                  end: toDate(value.channels.shared.end),
                }
              },
              private: {
                ...value.channels.private, ...{
                  start: toDate(value.channels.private.start),
                  end: toDate(value.channels.private.end),
                }
              }
            },
          publicChannels: Object.fromEntries(Object.entries(value.publicChannels).map(([key, val]) => (
            [key,
              {
                ...val,
                start: toDate(val.start),
                end: toDate(val.end)
              } as iBXRestPullConfigPublicChannelsGet
            ]))) as Record<string, iBXRestPullConfigPublicChannelsGet>,
        }
      }
      : undefined
  }
}