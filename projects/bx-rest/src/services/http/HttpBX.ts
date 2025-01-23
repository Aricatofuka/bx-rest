import { Observable, throwError, forkJoin, from } from 'rxjs'
import clone from 'just-clone'
import { HttpServices } from './http'
import {
  iBatchRequestAnswer, iBatchRequestParam, iBatchRequestParamArr, iBatchRequestParamHttp, keyBatch,
} from '../../typification/rest/batch/batchRequestParam'
import { iBXRestAnswer } from '../../typification/rest/base/answer'
import flatten from 'just-flatten-it'
import { instanceOfiBXRestAnswerSuccess } from '../../functions/mapResult'
import { switchMap } from 'rxjs/operators'
import * as qs from 'qs'
import { prepareBaseAddress } from '../base'
import { BXRestSettings } from '../../settings'

export class HttpBXServices extends HttpServices {

  /**
   * Это пиздец а не метод
   * TODO: Удалить данный метод после реализации его в разделе Navvy
   * @param param
   */
  branch<T, A>(param: iBatchRequestParamArr<T> | iBatchRequestParam<T>[])
    : Observable<iBatchRequestAnswer<A>[] | undefined> {
    let prepareParam = Object.entries<string>(this.prepareBatch<T>(param))
    const size = 50 // больше не отдаст
    let subarray = [] //массив в который будет выведен результат.
    for (let i = 0; i < Math.ceil(prepareParam.length / size); i++) {
      subarray[i] = prepareParam.slice((i * size), (i * size) + size)
    }

    return forkJoin(
      subarray.map(i => {
        return this.httpPost('batch.json', {
          halt: 0,
          cmd: Object.assign({}, ...i.map(x => {
            return {[x[0]]: x[1]}
          }))
        })
      })
    ) as Observable<iBatchRequestAnswer<A>[]>
  }

  prepareBatch<T>(param: iBatchRequestParamArr<T> | iBatchRequestParam<T>[]): iBatchRequestParamHttp {
    let res: iBatchRequestParamHttp = Object.keys(param).reduce(
      (obj, key) => {
        obj[key] = ''
        return obj
      },
      {} as iBatchRequestParamHttp
    )
    for (let key in param) {
      if (typeof key === 'string' || typeof key === 'number' && param[key].param) {
        res[key] = param[key].name + '?' + qs.stringify(param[key].param, {arrayFormat: 'brackets'})
      }
    }
    return res
  }

  mapBranchResult<T>(res: iBatchRequestAnswer<T>[]) {
    return Object.assign([], ...res.map(i =>
      (instanceOfiBXRestAnswerSuccess(i) && instanceOfiBXRestAnswerSuccess(i.result)) ? i.result.result : undefined)
    ) as Record<keyBatch, T>
  }

  mapBranchResultWithoutKey<T>(res: iBatchRequestAnswer<T>[]): T[] {
    return flatten<T>(Object.assign([], ...res.map(i =>
      (instanceOfiBXRestAnswerSuccess(i) && instanceOfiBXRestAnswerSuccess(i.result))
        ? i.result.result
        : undefined))
    )
  }

  /**
   * Основной метод для запросов
   *
   * @param name
   * @param params
   */
  post<T>(name: string[], params: any = {}) {
    return this.httpPost<iBXRestAnswer<T>>(this.getNameMethod(name), params)
  }

  /**
   * Второстепенный метод для запросов. По возможности лучше не использовать
   *
   * @param name
   * @param params
   */
  get<T>(name: string[], params: any = {}) {
    return this.httpGet<iBXRestAnswer<T>>(this.getNameMethod(name), params)
  }

  override httpPost<T>(url: string, params: any = {}): Observable<T | undefined> {
    const paramsClone = clone(params)
    let auth = this.session.getAuthParams()
    const checkIsOn = this.session.getCheckAuthParamsIsOn()
    if (checkIsOn) {
      if (!auth && BXRestSettings.date.auth.source !== 'off') {
        throw new Error('Authorization required (post)')
      }
      paramsClone[this.session.getKeyAuth()] = auth
    }

    return this.session.getBaseUrl().pipe(
      switchMap((baseUrl) => {
        if (!baseUrl) {
          return throwError(() => new Error('get base url error'))
        }

        const fullUrl = prepareBaseAddress(baseUrl) + url
        // const body = this.getHttpParamsPost(paramsClone, new FormData(), false, [])

        return from(
          this.axiosInstance.post<T>(fullUrl, paramsClone,
            {
              headers: {
                'Content-Type': 'application/json',
              }
            }
          ).then((response) => response.data)
        )
      })
    )
  }

  // Мб не работает
  override httpGet<T>(url: string, params: any = {}): Observable<T | undefined> {
    if (params === null) {
      params = {}
    }
    let auth = this.session.getAuthParams()
    const paramsClone = clone(params)
    if (auth) {
      paramsClone[this.session.getKeyAuth()] = auth
    }

    let options = {
      params: paramsClone
      // params: JSON.stringify(paramsClone)
    }

    return this.session.getBaseUrl().pipe(
      switchMap((baseUrl) => {
        if (!baseUrl) {
          return throwError(() => new Error('get base url error'))
        }

        return from(
          this.axiosInstance.post<T>(prepareBaseAddress(baseUrl) + url, options,
            {
              headers: {
                'Content-Type': 'application/json',
              }
            }
          ).then((response) => response.data)
        )
      })
    )
  }

  getNameMethod(arr: string[]) {
    return arr.join('.')
  }

}

