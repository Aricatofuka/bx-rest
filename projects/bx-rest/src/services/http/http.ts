import { Observable, from, throwError } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import axios, { AxiosInstance } from 'axios'
import SessionKeyServices from '../../services/http/sessionKey'
import clone from 'just-clone'
import { iHttpParamSettings } from '../../typification/rest/settings'
import { BaseHttp } from './base/base'
import { prepareBaseAddress } from '../base'

export class HttpServices extends BaseHttp {

  protected readonly axiosInstance: AxiosInstance
  public readonly session = new SessionKeyServices()

  constructor() {
    super()
    this.axiosInstance = axios.create()
  }

  override httpPost<T>(
    url: string,
    params: any = {},
    settings: iHttpParamSettings = this.defSettings
  ): Observable<T | undefined> {
    const auth = this.session.getAuthParams()
    if (auth) {
      const paramsClone = clone(params)
      paramsClone[this.session.getKeyAuth()] = auth

      return this.session.getBaseUrl().pipe(
        switchMap((baseUrl) => {
          if (!baseUrl) {
            return throwError(() => new Error('get base url error'))
          }

          const fullUrl = prepareBaseAddress(baseUrl) + url
          const body = this.getHttpParamsPost(paramsClone, new FormData(), [], settings)

          return from(
            this.axiosInstance.post<T>(fullUrl, body).then((response) => response.data)
          )
        })
      )
    } else {
      return throwError(() => new Error('auth session not get (post)'))
    }
  }

  // Мб вообще не работает
  override httpGet<T>(url: string, params: any = {}): Observable<T | undefined> {
    const auth = this.session.getAuthParams()
    if (auth) {
      const paramsClone = clone(params)
      paramsClone[this.session.getKeyAuth()] = auth

      return this.session.getBaseUrl().pipe(
        switchMap((baseUrl) => {
          if (!baseUrl) {
            return throwError(() => new Error('get base url error'))
          }

          const fullUrl = prepareBaseAddress(baseUrl) + url
          const queryString = new URLSearchParams(paramsClone).toString()
          const finalUrl = `${fullUrl}?${queryString}`

          return from(
            this.axiosInstance.get<T>(finalUrl).then((response) => response.data)
          )
        })
      )
    } else {
      return throwError(() => new Error('auth session not get (get)'))
    }
  }
}
