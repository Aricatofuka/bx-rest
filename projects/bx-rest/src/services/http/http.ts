import { Observable, throwError, mergeMap } from 'rxjs'
import { inject, Injectable } from '@angular/core'
import SessionKeyServices from '../../services/http/sessionKey'
import clone from 'just-clone'
import { iHttpParamSettings } from '../../typification/rest/settings'
import { BaseHttp } from './base/base'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class HttpServices extends BaseHttp {

  public readonly http = inject(HttpClient)
  public readonly session = inject(SessionKeyServices)

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
      return throwError(() => 'auth session not get (post)')
    }

  }

  override httpGet<T>(
    url: string,
    params: any = {}
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
      return throwError(() => 'auth session not get (get)')
    }
  }
}
