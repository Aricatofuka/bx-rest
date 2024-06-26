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
