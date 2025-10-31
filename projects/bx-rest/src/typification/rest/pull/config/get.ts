export interface iBXRestPullConfigGet extends iBXRestPullConfigGetBase<
  iBXRestPullConfigGetChannelsShared,
  iBXRestPullConfigGetChannelsPrivate,
  iBXRestPullConfigPublicChannelsGet
> {
  serverTime: Date
}

export interface iBXRestPullConfigGetHttp extends iBXRestPullConfigGetBase<
  iBXRestPullConfigGetChannelsSharedHttp,
  iBXRestPullConfigGetChannelsPrivateHttp,
  iBXRestPullConfigPublicChannelsGetHttp
> {
  serverTime: string
}

export interface iBXRestPullConfigGetBase<
  channelsShared = iBXRestPullConfigGetChannelsSharedBase,
  channelsPrivate = iBXRestPullConfigGetChannelsPrivateBase,
  publicChannels = iBXRestPullConfigPublicChannelsGetBase
> {
  server: {
    version: number
    server_enabled: boolean
    mode: string
    hostname: string
    long_polling: string
    long_pooling_secure: string
    websocket_enabled: boolean
    websocket: string
    websocket_secure: string
    publish_enabled: boolean
    publish: string
    publish_secure: string
    config_timestamp: number
  }
  api: {
    revision_web: number
    revision_mobile: number
  }
  channels: {
    shared: channelsShared
    private: channelsPrivate
  }
  publicChannels: Record<string, publicChannels>
}

export interface iBXRestPullConfigGetChannelsShared extends iBXRestPullConfigGetChannelsSharedBase {
  start: Date
  end: Date
}

export interface iBXRestPullConfigGetChannelsSharedHttp extends iBXRestPullConfigGetChannelsSharedBase {
  start: string
  end: string
}

export interface iBXRestPullConfigGetChannelsSharedBase {
  id: string
  type: string
}

export interface iBXRestPullConfigGetChannelsPrivate extends iBXRestPullConfigGetChannelsPrivateBase {
  start: Date
  end: Date
}

export interface iBXRestPullConfigGetChannelsPrivateHttp extends iBXRestPullConfigGetChannelsPrivateBase {
  start: string
  end: string
}

export interface iBXRestPullConfigGetChannelsPrivateBase {
  id: string
  type: string
  public_id: string
}

export interface iBXRestPullConfigPublicChannelsGet extends iBXRestPullConfigPublicChannelsGetBase {
  start: Date
  end: Date
}

export interface iBXRestPullConfigPublicChannelsGetHttp extends iBXRestPullConfigPublicChannelsGetBase {
  start: string
  end: string
}

export interface iBXRestPullConfigPublicChannelsGetBase {
  user_id: number
  public_id: string
  signature: string
}