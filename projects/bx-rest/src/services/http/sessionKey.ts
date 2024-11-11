import { inject, Injectable } from '@angular/core'
import Cookies from '../../services/vanilla/сookies'
import { Observable, of, Subscription } from 'rxjs'
import { BaseServices } from '../base'
import { LocalStorageServices as LocalStorage } from '../../services/vanilla/localStorage'
import { BX_REST_SETTINGS, DEFAULT_BX_REST_SETTINGS } from '../../settings'
import { iBXRestAuth } from '../../typification/auth/save'
import { SessionStorage } from '../vanilla/sessionStorage'

type IKeyAuth = 'sessid' | 'auth' | string

@Injectable({
  providedIn: 'root'
})
export default class SessionKeyServices extends BaseServices {

  authHave = false
  authData: iBXRestAuth | undefined
  subscribe = {
    authData: new Subscription()
  }

  private readonly BX_REST_SETTINGS = inject(BX_REST_SETTINGS)

  constructor(
  ) {
    super()
    let authData = SessionStorage.getItem<iBXRestAuth>(this.constructor.name)
    if ((authData && !authData.access_token.length) || !authData) {
      // получаем токен по собственным каналом (в битриксе приложение trace:apps.trace)
      window.addEventListener('message', (event: MessageEvent) => {
        if (event.origin !== window.origin) { // проверяем что это не наше сообщение (с текущего приложения)
          if (event.data && event.data.param) {
            if (typeof event.data.param === 'string') {
              event.data.param = JSON.parse(event.data.param)
            }

            if (event.data.param.access_token) {
              let param = event.data.param
              let save = {
                access_token: (param.access_token) ? param.access_token : undefined,
                client_endpoint: (param.client_endpoint) ? param.client_endpoint : undefined,
                domain: (param.domain) ? param.domain : undefined,
                expires: (param.expires) ? param.expires : undefined,
                expires_in: (param.expires_in) ? param.expires_in : undefined,
                member_id: (param.member_id) ? param.member_id : undefined,
                refresh_token: (param.refresh_token) ? param.refresh_token : undefined,
                scope: (param.scope) ? param.scope : undefined,
                server_endpoint: (param.server_endpoint) ? param.server_endpoint : undefined,
                status: (param.status) ? param.status : undefined,
                user_id: (param.user_id) ? param.user_id : undefined,
                type: (param.type) ? param.type : undefined,
              }

              if (Object.keys(save).length && save.access_token) {
                SessionStorage.setItem(this.constructor.name, save)
                this.subscribeAll()
              }
            }
          }
        }
      })
    } else if (this.getAuth().length) {
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
        return Cookies.get('auth')
      default:
        if ((<any>window).BX && (<any>window).BX.bitrix_sessid()) { // чё за хуйня?
          return (<any>window).BX.bitrix_sessid()
        } else if (this.getSessid().length) {
          let str = this.getSessid()
          return (str) ? str : ''
        } else {
          return Cookies.get('auth')
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
    const check = new URLSearchParams(document.location.search).get('sessid')
    if (check) {
      LocalStorage.set('sessid', check)
      return check
    } else if (LocalStorage.get('sessid')) {
      return LocalStorage.get('sessid')
    }
    return ''
  }

  getAuthParams(): string | undefined {
    // console.log('this.BX_REST_SETTINGS', this.BX_REST_SETTINGS, BX_REST_SETTINGS)
    switch (this.BX_REST_SETTINGS.auth.source) {
      case 'cookies':
        return this.getAuth()
      case 'localStorage':
        return LocalStorage.get(this.BX_REST_SETTINGS.auth.key)
      default:
        return (this.authData) ? this.authData.access_token : undefined
    }
  }

  getBaseUrl(): Observable<string | undefined> {
    console.log('this.BX_REST_SETTINGS.urls.additional_part', this.BX_REST_SETTINGS.urls.additional_part, !!this.BX_REST_SETTINGS.urls.additional_part)
    const additional_part = (this.BX_REST_SETTINGS.urls.additional_part || this.BX_REST_SETTINGS.urls.additional_part === '')
    ? this.BX_REST_SETTINGS.urls.additional_part
      : DEFAULT_BX_REST_SETTINGS.urls.additional_part

    console.log('additional_part', additional_part)

    if(this.BX_REST_SETTINGS.urls.source === 'string'){
      return of(this.prepareBaseAddress(this.BX_REST_SETTINGS.urls.key, additional_part))
    }

    const str = localStorage.getItem(this.BX_REST_SETTINGS.urls.key)

    return of(this.prepareBaseAddress((str) ? str : '', additional_part))
  }
}
