export interface iBXRestSettings {
  auth: {
    source: 'cookies' | 'localStorage' | 'off' | (() => string)
    key: 'auth' | 'sessid' | string
  },
  urls: {
    source: 'string' | 'localStorage'
    key: string | 'OAuth2'
    additional_part?: string
  }
}
