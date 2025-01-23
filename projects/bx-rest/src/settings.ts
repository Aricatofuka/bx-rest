import { iBXRestSettings } from './typification/settings'

export const DEFAULT_BX_REST_SETTINGS: iBXRestSettings = {
  auth: {
    source: 'cookies',
    key: 'auth'
  },
  urls: {
    source: 'localStorage',
    key: '',
    additional_part: 'rest'
  }
}

export const BXRestSettings = {
  date: {
    auth: {
      source: 'cookies',
      key: 'auth',
    },
    urls: {
      source: 'localStorage',
      key: '',
      additional_part: 'rest',
    },
  } as iBXRestSettings,

  update(newSettings: Partial<iBXRestSettings>): void {
    this.date = { ...this.date, ...newSettings }
  },
}