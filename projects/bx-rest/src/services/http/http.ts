import { Observable, from, throwError } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import axios, { AxiosInstance } from 'axios'
import { SessionKeyServices } from '../../services/http/sessionKey'
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
    const checkIsOn = this.session.getCheckAuthParamsIsOn()
    const paramsClone = clone(params)

    if (checkIsOn) {
      if (!auth) {
        return throwError(() => this.session.getAuthError('post'))
      }

      paramsClone[this.session.getKeyAuth()] = auth
    }

    return this.session.getBaseUrl().pipe(
      switchMap((baseUrl) => {
        if (!baseUrl) {
          return throwError(() => this.session.getBaseUrlError('post'))
        }

        const fullUrl = prepareBaseAddress(baseUrl) + url
        if (this.session.getKeyAuth() === 'sessid') {
          const body = this.getHttpParamsPost(paramsClone, new FormData(), [], settings)
          const urlEncodedBody = new URLSearchParams()

          Object.keys(body).forEach((key) => {
            const value = paramsClone[key]

            if (typeof value === 'object' && value !== null) {
              for (const subKey in value) {
                if (Object.prototype.hasOwnProperty.call(value, subKey)) {
                  urlEncodedBody.append(`${key}[${subKey}]`, value[subKey])
                }
              }
            } else {
              urlEncodedBody.append(key, value)
            }
          })

          return from(
            this.axiosInstance.post<T>(fullUrl, urlEncodedBody.toString(), {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            }).then((response) => response.data)
          )
        }

        const body = this.getHttpParamsPost(paramsClone, new FormData(), [], settings)
        return from(
          this.axiosInstance.post<T>(fullUrl, body).then((response) => response.data)
        )
      })
    )
  }

  override httpGet<T>(url: string, params: any = {}): Observable<T | undefined> {
    const auth = this.session.getAuthParams()
    const checkIsOn = this.session.getCheckAuthParamsIsOn()
    const paramsClone = clone(params)

    if (checkIsOn) {
      if (!auth) {
        return throwError(() => this.session.getAuthError('get'))
      }

      paramsClone[this.session.getKeyAuth()] = auth
    }

    return this.session.getBaseUrl().pipe(
      switchMap((baseUrl) => {
        if (!baseUrl) {
          return throwError(() => this.session.getBaseUrlError('get'))
        }

        const fullUrl = prepareBaseAddress(baseUrl) + url
        const queryString = new URLSearchParams(paramsClone).toString()
        const finalUrl = `${fullUrl}?${queryString}`

        return from(
          this.axiosInstance.get<T>(finalUrl).then((response) => response.data)
        )
      })
    )
  }
}
