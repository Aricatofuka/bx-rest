export interface iRestSettings {
  auth: {
    source: 'cookies' | 'localStorage'
    key: 'auth' | 'sessid' | string
  },
  urls: {
    source: 'string' | 'localStorage'
    home: string
  }
}
