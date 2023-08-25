import { Observable, throwError, mergeMap } from 'rxjs'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import SnackBarService from '../../services/snack-bar/snack-bar.service'
import SessionKeyServices from '../../services/http/sessionKey'
import clone from 'just-clone'
import { iHttpParamSettings } from '../../typification/rest/settings'
import { BaseHttpServices } from './base/http'

@Injectable({
    providedIn: 'root'
})
export class HttpServices extends BaseHttpServices {

    constructor(http: HttpClient, snackBar: SnackBarService, public session: SessionKeyServices) {
        super(http, snackBar)
    }

    override httpPost<T>(url: string,
                         params: any = {},
                         settings: iHttpParamSettings = this.defSettings
    ): Observable<T | undefined> {
        return this.session.getAuthParams().pipe(
            mergeMap(auth => {
                if (auth) {
                    const paramsClone = clone(params)
                    paramsClone[this.session.getKeyAuth()] = auth
                    return this.session.getBaseUrl().pipe(mergeMap(v => {
                        if (v) {
                            return this.http.post<T | undefined>(
                                this.prepareBaseAddress(v) + url,
                                this.getHttpParamsPost(paramsClone, new FormData(), false, [], settings))
                        }
                        return throwError(() => 'get base url error')
                    }))
                } else {
                    this.snackBar.error('Error: Auth not get')
                    return throwError(() => 'auth not get')
                }
            }))
    }

    override httpGet<T>(
        url: string,
        params: any = {},
        settings: iHttpParamSettings = this.defSettings
    ): Observable<T | undefined> {
        return this.session.getAuthParams().pipe(
            mergeMap(auth => {
                if (auth) {
                    if (params === null) {
                        params = {}
                    }
                    const paramsClone = clone(params)
                    paramsClone[this.session.getKeyAuth()] = auth
                    let options = {
                        params: this.getHttpParamsGet(paramsClone)
                    }

                    return this.session.getBaseUrl().pipe(
                        mergeMap(v => {
                            if (v) {
                                return this.http.get<T>(this.prepareBaseAddress(v) + url, options)
                            }
                            return throwError(() => 'get base url error')
                        })
                    )
                } else {
                    this.snackBar.error('Error: Auth not get')
                    return throwError(() => 'auth not get')
                }
            })
        )
    }
}
