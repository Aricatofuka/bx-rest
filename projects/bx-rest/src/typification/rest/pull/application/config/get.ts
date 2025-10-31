import {
  iBXRestPullConfigGetBase,
  iBXRestPullConfigGetChannelsPrivate, iBXRestPullConfigGetChannelsPrivateHttp,
  iBXRestPullConfigGetChannelsShared, iBXRestPullConfigGetChannelsSharedHttp,
  iBXRestPullConfigPublicChannelsGet, iBXRestPullConfigPublicChannelsGetHttp
} from '../../config/get'

export type iBXRestPullApplicationConfigGet = iBXRestPullConfigGetBase<
  iBXRestPullConfigGetChannelsShared,
  iBXRestPullConfigGetChannelsPrivate,
  iBXRestPullConfigPublicChannelsGet
>

export type iBXRestPullApplicationConfigGetHttp = iBXRestPullConfigGetBase<
  iBXRestPullConfigGetChannelsSharedHttp,
  iBXRestPullConfigGetChannelsPrivateHttp,
  iBXRestPullConfigPublicChannelsGetHttp
>
