import Cookies from '../../services/vanilla/сookies'
import { Observable, of, Subscription } from 'rxjs'
import { prepareBaseAddress } from '../base'
import { LocalStorageServices as LocalStorage } from '../../services/vanilla/localStorage'
import { BXRestSettings, DEFAULT_BX_REST_SETTINGS } from '../../settings'
import { iBXRestAuth } from '../../typification/auth/save'
import { SessionStorage } from '../vanilla/sessionStorage'

type IKeyAuth = 'sessid' | 'auth' | string
type StorageKind = 'localStorage' | 'sessionStorage'

export class SessionKeyError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'SessionKeyError'
  }
}

export class SessionKeyServices {

  authHave = false
  authData: iBXRestAuth | undefined
  subscribe = {
    authData: new Subscription()
  }

  private readonly BX_REST_SETTINGS = BXRestSettings.date

  constructor(
  ) {
    const authData = this.getSessionItem<iBXRestAuth>(this.constructor.name)
    if (this.getAuth().length > 0) {
      this.authHave = true
    }

    this.authData = authData

  }

  subscribeAll() {
    this.subscribe.authData.unsubscribe()
  }

  getAuth(): string {
    switch (this.BX_REST_SETTINGS.auth.key) {
      case 'auth':
        return this.getCookie('auth')
      default: {
        const bxSessid = this.getBxSessid()
        if (bxSessid) {
          return bxSessid
        } else if (this.getSessid().length > 0) {
          const str = this.getSessid()
          return (str) ? str : ''
        } else {
          return this.getCookie('auth')
        }
      }
    }
  }

  getKeyAuth(): IKeyAuth {
    if (this.BX_REST_SETTINGS.auth.key.length) {
      return this.BX_REST_SETTINGS.auth.key
    } else {
      return 'auth'
    }
  }

  getSessid() {
    const check = this.getSearchParam('sessid')
    if (check) {
      this.setLocalStorage('sessid', check)
      return check
    } else if (this.getLocalStorage('sessid')) {
      return this.getLocalStorage('sessid') || ''
    }
    return ''
  }

  getAuthParams(): string | undefined {
    const source = this.BX_REST_SETTINGS.auth.source

    if (typeof source === 'function') {
      try {
        return this.normalizeValue(source())
      } catch {
        return undefined
      }
    }

    switch (source) {
      case 'cookies':
        return this.normalizeValue(this.getAuth())
      case 'localStorage':
        return this.normalizeValue(this.getLocalStorage(this.BX_REST_SETTINGS.auth.key))
      case 'off':
        return undefined
      default:
        return this.normalizeValue((this.authData) ? this.authData.access_token : undefined)
    }
  }

  getCheckAuthParamsIsOn(){
    return this.BX_REST_SETTINGS.auth.source !== 'off'
  }

  getAuthError(operation = 'request'): SessionKeyError {
    const source = this.BX_REST_SETTINGS.auth.source
    const key = this.getKeyAuth()

    if (!this.getCheckAuthParamsIsOn()) {
      return new SessionKeyError(
        `Authorization is disabled for ${operation}: BXRestSettings.auth.source is "off".`
      )
    }

    const sourceName = (typeof source === 'function') ? 'custom function' : source
    const checked = this.getAuthCheckedPlaces()

    return new SessionKeyError([
      `Authorization token was not found for ${operation}.`,
      `auth.source: ${sourceName}.`,
      `auth.key: ${key}.`,
      `Checked: ${checked.join(', ')}.`,
      'Set BXRestSettings.auth.source/key correctly or save a valid token before making the request.'
    ].join(' '))
  }

  getBaseUrl(): Observable<string | undefined> {
    const additional_part = (this.BX_REST_SETTINGS.urls.additional_part || this.BX_REST_SETTINGS.urls.additional_part === '')
    ? this.BX_REST_SETTINGS.urls.additional_part
      : DEFAULT_BX_REST_SETTINGS.urls.additional_part

    if(this.BX_REST_SETTINGS.urls.source === 'string'){
      return of(prepareBaseAddress(this.BX_REST_SETTINGS.urls.key, additional_part))
    }

    const str = this.getLocalStorage(this.BX_REST_SETTINGS.urls.key)

    return of(prepareBaseAddress((str) ? str : '', additional_part))
  }

  getBaseUrlError(operation = 'request'): SessionKeyError {
    return new SessionKeyError([
      `Base URL was not resolved for ${operation}.`,
      `urls.source: ${this.BX_REST_SETTINGS.urls.source}.`,
      `urls.key: ${this.BX_REST_SETTINGS.urls.key || '(empty)'}.`,
      'Set BXRestSettings.urls.key to a URL or to a localStorage key containing the portal URL.'
    ].join(' '))
  }

  private getAuthCheckedPlaces(): string[] {
    const source = this.BX_REST_SETTINGS.auth.source

    if (typeof source === 'function') {
      return ['BXRestSettings.auth.source()']
    }

    switch (source) {
      case 'cookies':
        return this.BX_REST_SETTINGS.auth.key === 'auth'
          ? ['cookie "auth"']
          : ['window.BX.bitrix_sessid()', 'URL query "sessid"', 'localStorage "sessid"', 'cookie "auth"']
      case 'localStorage':
        return [`localStorage "${this.BX_REST_SETTINGS.auth.key}"`]
      case 'off':
        return ['authorization lookup skipped']
      default:
        return [`sessionStorage "${this.constructor.name}" access_token`]
    }
  }

  private getBxSessid(): string {
    const bx = (typeof window !== 'undefined') ? (window as any).BX : undefined

    if (!bx || typeof bx.bitrix_sessid !== 'function') {
      return ''
    }

    try {
      return this.normalizeValue(bx.bitrix_sessid()) || ''
    } catch {
      return ''
    }
  }

  private getSearchParam(name: string): string | undefined {
    if (typeof document === 'undefined') {
      return undefined
    }

    try {
      return new URLSearchParams(document.location.search).get(name) || undefined
    } catch {
      return undefined
    }
  }

  private getCookie(name: string): string {
    if (typeof document === 'undefined') {
      return ''
    }

    try {
      return Cookies.get(name)
    } catch {
      return ''
    }
  }

  private getLocalStorage(name: string): string | null {
    return this.getStorageItem('localStorage', name)
  }

  private setLocalStorage(name: string, value: string): void {
    if (typeof localStorage === 'undefined') {
      return
    }

    try {
      LocalStorage.set(name, value)
    } catch {
      return
    }
  }

  private getSessionItem<T>(name: string): T | undefined {
    if (typeof sessionStorage === 'undefined') {
      return undefined
    }

    try {
      return SessionStorage.getItem<T>(name)
    } catch {
      return undefined
    }
  }

  private getStorageItem(kind: StorageKind, name: string): string | null {
    const storage = kind === 'localStorage'
      ? (typeof localStorage !== 'undefined' ? localStorage : undefined)
      : (typeof sessionStorage !== 'undefined' ? sessionStorage : undefined)

    if (!storage) {
      return null
    }

    try {
      return storage.getItem(name)
    } catch {
      return null
    }
  }

  private normalizeValue(value: string | null | undefined): string | undefined {
    return (value && value.length > 0) ? value : undefined
  }
}
