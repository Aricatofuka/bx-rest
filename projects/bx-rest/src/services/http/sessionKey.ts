import { Injectable } from '@angular/core'
import Cookies from '../../services/vanilla/сookies'
import saveApplicationAuth from '../../typification/auth/save'
import { Observable, of, Subscription } from 'rxjs'
// import { ActivatedRoute, ParamMap } from '@angular/router'
import { BaseServices } from '../base'
import { LocalStorageServices as LocalStorage } from '../../services/vanilla/localStorage'
import { RestServices } from '../../typification/rest/api-lib'
import { BX_REST_SETTINGS } from '../../settings'
import iBXRestAuth from '../../typification/auth/save'
import { SessionStorage } from '../vanilla/sessionStorage'

type IKeyAuth = 'sessid' | 'auth' | string

@Injectable({
  providedIn: 'root'
})
export default class SessionKeyServices extends BaseServices {

  authHave = false
  authData: saveApplicationAuth | undefined
  subscribe = {
    authData: new Subscription()
  }

  constructor(
    // private route: ActivatedRoute,
    public override BX_REST_SETTINGS: BX_REST_SETTINGS,
    public BxApiLib: RestServices,
  ) {
    super(BX_REST_SETTINGS)
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

      /*
      this.subscribe.authData = this.route.queryParamMap
        .pipe(
          filter(param =>
            param.has('AUTH_ID')
            || param.has('access_token')
            || param.has('REFRESH_ID')
            || param.has('DOMAIN')
          )
        )
        .subscribe((param: ParamMap) => {
          if(!save) {
            let save = {
              access_token: undefined,
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
          }

          if (param.has('AUTH_ID') && !authData?.access_token.length) {
            const get = param.get('AUTH_ID')
            if (get) {
              Cookies.set('auth', get) //TODO: потом убрать
              save.access_token = get
            }
          }

          if (param.has('access_token') && !authData.access_token.length) {
            const get = param.get('access_token')
            if (get) {
              Cookies.set('auth', get) // TODO: потом убрать
              save.access_token = get
            }
          }

          if (param.has('REFRESH_ID') && !authData.refresh_token.length) {
            const get = param.get('REFRESH_ID')
            if (get) {
              save.refresh_token = get
            }
          }

          if (param.has('DOMAIN') && !authData.domain.length) {
            const get = param.get('DOMAIN')
            if (get) {
              save.domain = get
            }
          }
          if (Object.keys(save).length && save.access_token) {
            SessionStorage.setItem(this.constructor.name, save)
            this.subscribeAll()
          } else {
            // если битрикс не шлёт нужные мне параметры на прямую
            // просим их мне отдать так как описано это в документации
            let f = () => {
              if (this.BxApiLib.BX24) {
                const initDate = this.BxApiLib.BX24.getAuth()
                SessionStorage.setItem(this.constructor.name, save)
              }
            }

            this.BxApiLib.init(f)
          }

        })
      */
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
    console.log('BX_REST_SETTINGS', BX_REST_SETTINGS)
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

  setAuthParams<T>(params: any): boolean {
    const keyAuth = this.getKeyAuth()
    if (params[keyAuth]) {
      return true
    } else if (keyAuth) {
      params[keyAuth] = this.getAuth()
      return true
    }
    return false
  }

  getAuthParams(): string | undefined {
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
    return of(this.prepareBaseAddress(this.BX_REST_SETTINGS.urls.home, 'rest'))
    // return this.authData$.pipe( // TODO: разобраться позже
    //   take(1),
    //   map(v => (v && v.domain) ? this.prepareBaseAddress(v.domain) : undefined)
    // )
  }

  // getHomeUrl(): string {
  //     return env.urls.home
  // }
}
