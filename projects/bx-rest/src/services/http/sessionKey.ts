import { Injectable } from '@angular/core'
import Cookies from 'bx-rest/services/vanilla/сookies'
import { Store } from '@ngrx/store'
import saveApplicationAuth from 'bx-rest/typification/auth/save'
// import { environment as env } from 'bx-rest/environments/environment'
import { filter, Observable, Subscription, take } from 'rxjs'
import { ActivatedRoute, ParamMap } from '@angular/router'
import { saveAccessToken, saveApplicationAuthPath } from 'bx-rest/store/auth'
import { map } from 'rxjs/operators'
import { BaseServices } from 'bx-rest/services/base'
import { LocalStorageServices as LocalStorage } from 'bx-rest/services/vanilla/localStorage'
import { RestServices } from 'bx-rest/typification/rest/api-lib'

type IKeyAuth = 'sessid' | 'auth' | string

@Injectable({
    providedIn: 'root'
})
export default class SessionKeyServices extends BaseServices {

    authHave = false
    authData$: Observable<saveApplicationAuth>
    authData: saveApplicationAuth | undefined
    subscribe = {
        authData: new Subscription()
    }

    constructor(
        public store: Store<{ auth: saveApplicationAuth }>,
        private route: ActivatedRoute,
        public BxApiLib: RestServices,
    ) {
        super()
        this.authData$ = this.store.select('auth')
        this.authData$.subscribe(authData => {
            if ((authData && !authData.access_token.length) || !authData) {
                // получаем токен по собственным каналом (в битриксе приложение trace:apps.trace)
                window.addEventListener('message', (event: MessageEvent) => {
                    if (event.origin !== window.origin) { // проверяем что это не наше сообщение (с текущего приложения)
                        if (event.data && event.data.param) {
                            if (typeof event.data.param === 'string') {
                                event.data.param = JSON.parse(event.data.param)
                            }

                            let save: saveApplicationAuthPath = {}

                            if (event.data.param.access_token) {
                                let param = event.data.param;
                                save.access_token = event.data.param.access_token
                                save = {
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
                            }

                            if (Object.keys(save).length && save.access_token) {
                                this.store.dispatch(saveAccessToken(save))
                                this.subscribeAll()
                            }
                        }
                    }
                })

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
                        let save: saveApplicationAuthPath = {}
                        if (param.has('AUTH_ID') && !authData.access_token.length) {
                            const get = param.get('AUTH_ID')
                            if (get) {
                                Cookies.set('auth', get) // потом убрать
                                save.access_token = get
                            }
                        }

                        if (param.has('access_token') && !authData.access_token.length) {
                            const get = param.get('access_token')
                            if (get) {
                                Cookies.set('auth', get) // потом убрать
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
                            this.store.dispatch(saveAccessToken(save))
                            this.subscribeAll()
                        } else {
                            // если битрикс не шлёт нужные мне параметры на прямую
                            // просим их мне отдать так как описано это в документации
                            let f = () => {
                                if (this.BxApiLib.BX24) {
                                    const initDate = this.BxApiLib.BX24.getAuth()
                                    this.store.dispatch(saveAccessToken(initDate))
                                }
                            }

                            this.BxApiLib.init(f)
                        }

                    })
            } else if (this.getAuth().length) {
                this.authHave = true
            }

            this.authData = authData
        })
    }

    subscribeAll() {
        this.subscribe.authData.unsubscribe()
    }

    getAuth(): string {
        if ((<any>window).BX && (<any>window).BX.bitrix_sessid()) {
            return (<any>window).BX.bitrix_sessid()
        } else if (this.getSessid().length) {
            let str = this.getSessid()
            return (str) ? str : ''
        } else {
            return Cookies.get('auth')
        }
    }

    getKeyAuth(): IKeyAuth {
        if ((<any>window).BX && (<any>window).BX.bitrix_sessid()
            || this.getSessid().length) {
            return 'sessid'
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

    getAuthParams(): Observable<string | undefined> {
        // if (env.production && !env.component) {
            return this.authData$.pipe(
                take(1),
                map(v => (v) ? v.access_token : undefined)
            )
        // } else {
        //     return of(this.getAuth())
        // }
    }

    getBaseUrl(): Observable<string | undefined> {
            return this.authData$.pipe(
                map(v => (v && v.domain) ? this.prepareBaseAddress(v.domain, 'b24.trace-studio.com') : undefined)
            )
    }

    // getHomeUrl(): string {
    //     return env.urls.home
    // }
}
