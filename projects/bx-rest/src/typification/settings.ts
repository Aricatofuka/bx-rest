export interface iRestSettings {
  auth: {
    source: 'cookies' | 'localStorage'
    key: 'auth' | 'sessid' | string
  },
  urls: {
    home: string
  }
}
