import { iBXRestSettings } from './typification/settings'
import { InjectionToken } from '@angular/core'

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

export const BX_REST_SETTINGS = new InjectionToken<iBXRestSettings>('BX_REST_SETTINGS');