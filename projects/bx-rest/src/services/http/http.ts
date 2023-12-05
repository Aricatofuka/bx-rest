import { Observable, throwError, mergeMap } from 'rxjs'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import SessionKeyServices from '../../services/http/sessionKey'
import clone from 'just-clone'
import { iHttpParamSettings } from '../../typification/rest/settings'
import { BaseHttpServices } from './base/http'
import { BX_REST_SETTINGS } from '../../settings'

@Injectable({
  providedIn: 'root'
})
export class HttpServices extends BaseHttpServices {

  constructor(
    BX_REST_SETTINGS: BX_REST_SETTINGS,
    http: HttpClient,
    public session: SessionKeyServices
  ) {
    super(BX_REST_SETTINGS, http)
  }

  override httpPost<T>(url: string,
                       params: any = {},
                       settings: iHttpParamSettings = this.defSettings
  ): Observable<T | undefined> {
    let auth = this.session.getAuthParams()
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
      return throwError(() => 'auth not get')
    }

  }

  override httpGet<T>(
    url: string,
    params: any = {},
    settings: iHttpParamSettings = this.defSettings
  ): Observable<T | undefined> {
    let auth = this.session.getAuthParams()
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
      return throwError(() => 'auth not get')
    }
  }
}
