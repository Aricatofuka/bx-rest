export interface iBXRestSettings {
  auth: {
    source: 'cookies' | 'localStorage'
    key: 'auth' | 'sessid' | string
  },
  urls: {
    source: 'string' | 'localStorage'
    key: string
    additional_part?: string
  }
}
