import { iRestSettings } from './typification/settings'
import { InjectionToken } from '@angular/core'

export class BX_REST_SETTINGS extends InjectionToken<iRestSettings> {
  auth = {
    source: 'cookies',
    key: 'auth'
  }
  urls = {
    source: 'localStorage',
    key: ''
  }
}

/*

export const BX_REST_SETTINGS: iRestSettings = {
  auth: {
    source: 'cookies',
    key: 'auth'
  },
  urls: {
    home: 'b24.trace-studio.com'
  }
}


 */
