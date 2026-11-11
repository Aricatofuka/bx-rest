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
  iBXRestPullConfigPublicChannelsGetHttp,
  false
> {
  serverTime: string
}

/**
 * Параметры `pull.config.get` и `pull.application.config.get`.
 */
export interface iBXRestParamPullConfigGet {
  /** `N` — не брать настройки из кэша. По документации сейчас ни на что не влияет. */
  CACHE?: string
  /** `N` — не выдавать новый канал вместо истёкшего. По документации сейчас ни на что не влияет. */
  REOPEN?: string
}

/**
 * Настройки подключения к серверу Push & Pull.
 *
 * @see https://apidocs.bitrix24.com/settings/interactivity/pull-application-config-get.html
 */
export interface iBXRestPullConfigGetBase<
  channelsShared = iBXRestPullConfigGetChannelsSharedBase,
  channelsPrivate = iBXRestPullConfigGetChannelsPrivateBase,
  publicChannels = iBXRestPullConfigPublicChannelsGetBase,
  /** Что приходит в `publicChannels`, если каналов нет: портал отдаёт `false` при версии сервера ниже 4. */
  noPublicChannels = never
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
  publicChannels: Record<string, publicChannels> | noPublicChannels
  /**
   * До какого времени действуют настройки, Unix timestamp в секундах. Приходит не всегда:
   * если поля нет, ориентируйтесь на `end` каналов.
   */
  exp?: number
  /** Идентификатор портала на общем сервере Push & Pull. Приходит, когда `server.mode` равен `shared`. */
  clientId?: string
  /** JWT для подключения к серверу. Приходит при `server.version` 5 и выше. */
  jwt?: string
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