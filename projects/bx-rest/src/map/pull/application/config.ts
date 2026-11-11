import {
  iBXRestPullApplicationConfigGet,
  iBXRestPullApplicationConfigGetHttp
} from '../../../typification/rest/pull/application/config/get'
import { toDate } from '../../../services/base'
import { iBXRestPullConfigPublicChannelsGet } from '../../../typification/rest/pull/config/get'

/** Поля `start` и `end` канала — в `Date`. Канал, которого нет в ответе, так и остаётся пустым. */
function withDates<T extends { start: string, end: string }>(channel: T | undefined) {
  return channel
    ? { ...channel, start: toDate(channel.start), end: toDate(channel.end) }
    : undefined
}

export class BXRestMapPullApplicationConfig {
  /**
   * Даты каналов — в `Date`. `publicChannels: false` (сервер версии ниже 4) становится пустым объектом.
   */
  static get(value: iBXRestPullApplicationConfigGetHttp | undefined): iBXRestPullApplicationConfigGet | undefined {
    if (!value) {
      return undefined
    }
    const publicChannels = value.publicChannels && typeof value.publicChannels === 'object'
      ? value.publicChannels
      : {}
    return {
      ...value,
      channels: {
        ...value.channels,
        shared: withDates(value.channels?.shared),
        private: withDates(value.channels?.private),
      },
      publicChannels: Object.fromEntries(
        Object.entries(publicChannels).map(([key, channel]) => [key, withDates(channel)])
      ) as Record<string, iBXRestPullConfigPublicChannelsGet>,
    } as iBXRestPullApplicationConfigGet
  }
}
