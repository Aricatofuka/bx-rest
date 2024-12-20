import { Observable, throwError, mergeMap, forkJoin } from 'rxjs'
import { Injectable } from '@angular/core'
import clone from 'just-clone'
import { HttpServices } from './http'
import {
  iBatchRequestAnswer, iBatchRequestParam,
  iBatchRequestParamArr,
  iBatchRequestParamHttp,
  keyBatch,
} from '../../typification/rest/batch/batchRequestParam'
import { iBXRestAnswer } from '../../typification/rest/base/answer'
import { HttpHeaders } from '@angular/common/http'
import flatten from 'just-flatten-it'
import { instanceOfiBXRestAnswerSuccess } from '../../functions/mapResult'

@Injectable({
  providedIn: 'root'
})
export class HttpBXServices extends HttpServices {

  /**
   * Это пиздец а не метод
   * TODO: Удалить данный метод после реализации его в разделе Navvy
   * @param param
   */
  branch<T, A>(param: iBatchRequestParamArr<T> | iBatchRequestParam<T>[]): Observable<iBatchRequestAnswer<A>[] | undefined> {
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
        res[key] = param[key].name + '?' + this.getHttpParamsGet(param[key].param).toString()
      }
    }
    return res
  }

  mapBranchResult<T>(res: iBatchRequestAnswer<T>[]) {
    return Object.assign([], ...res.map(i =>
      (instanceOfiBXRestAnswerSuccess(i) && instanceOfiBXRestAnswerSuccess(i.result)) ? i.result.result : undefined)
    ) as {
      [key: keyBatch]: T
    }
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
  post<T>(name: string[],
          params: any = {}
  ) {
    return this.httpPost<iBXRestAnswer<T>>(this.getNameMethod(name), params)
  }

  /**
   * Второстепенный метод для запросов. По возможности лучше не использовать
   *
   * @param name
   * @param params
   */
  get<T>(name: string[],
         params: any = {}
  ) {
    return this.httpGet<iBXRestAnswer<T>>(this.getNameMethod(name), params)
  }

  override httpPost<T>(url: string,
                       params: any = {},
  ): Observable<T | undefined> {
    const paramsClone = clone(params)
    let auth = this.session.getAuthParams()
    const checkIsOn = this.session.getCheckAuthParamsIsOn()
    if (checkIsOn) {
      if (!auth) {
        throw new Error('Authorization required (post)')
      }
      paramsClone[this.session.getKeyAuth()] = auth
    }
    return this.session.getBaseUrl().pipe(
      mergeMap(v => {
        if (v) {
          // это более быстрый способ запроса чем отправка Form Data
          return this.http.post<T | undefined>(
            this.prepareBaseAddress(v) + url,
            JSON.stringify(paramsClone),
            {headers: new HttpHeaders().set('Content-Type', 'application/json')}
          )
        }
        return throwError(() => 'get base url error')
      }))
  }

  override httpGet<T>(
    url: string,
    params: any = {}
  ): Observable<T | undefined> {
    if (params === null) {
      params = {}
    }
    let auth = this.session.getAuthParams()
    const paramsClone = clone(params)
    if (auth) {
      paramsClone[this.session.getKeyAuth()] = auth
    }

    let options = {
      params: this.getHttpParamsGet(paramsClone)
      // params: JSON.stringify(paramsClone)
    }

    return this.session.getBaseUrl().pipe(
      mergeMap(v => {
        if (v) {
          return this.http.get<T>(this.prepareBaseAddress(v) + url, options)
        }
        return throwError(() => 'get base url error')
      })
    )
  }

  getNameMethod(arr: string[]) {
    return arr.join('.')
  }

}

