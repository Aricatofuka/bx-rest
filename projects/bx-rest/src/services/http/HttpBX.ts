import { Observable, throwError, take, mergeMap, forkJoin } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { Injectable } from '@angular/core'
import clone from 'just-clone'
import { iHttpParamSettings } from '../../typification/rest/settings'
import BaseHttpServices from '../../services/http/http'
import {
  iBatchRequestAnswer, iBatchRequestParam,
  iBatchRequestParamArr,
  iBatchRequestParamHttp, keyBatch
} from '../../typification/rest/batch/batchRequestParam'
import flatten from 'just-flatten-it'
import { REST_SETTINGS } from '../../settings'
import { mapResult } from '../../functions/mapResult'
import iHttpAnswerBX from '../../typification/rest/base/httpAnswerBX'

type TransformFunction<T, R> = (input: T) => R;

@Injectable({
  providedIn: 'root'
})
export default class HttpBXServices extends BaseHttpServices {

  override timeNowOnServer() {
    return this.httpGet<{ result?: Date, error?: string }>('server.time').pipe(
      map(v => {
        if (v && v.result) {
          return new Date(v.result)
        }
        return undefined
      }),
    )
  }

  /**
   * Это пиздец а не метод
   * @param param
   */
  override branch<T, A>(param: iBatchRequestParamArr<T> | iBatchRequestParam<T>[]): Observable<iBatchRequestAnswer<A>[] | undefined> {
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

  override prepareBatch<T>(param: iBatchRequestParamArr<T> | iBatchRequestParam<T>[]): iBatchRequestParamHttp {
    let res: iBatchRequestParamHttp = Object.keys(param).reduce(
      (obj, key) => {
        obj[key] = '';
        return obj;
      },
      {} as iBatchRequestParamHttp
    );
    for (let key in param) {
      if (typeof key === 'string' || typeof key === 'number' && param[key].param) {
        res[key] = param[key].name + '?' + this.getHttpParamsGet(param[key].param).toString()
      }
    }
    return res
  }

  override mapBranchResult<T>(res: iBatchRequestAnswer<T>[]) {
    return Object.assign([], ...res.map(i => (i.result && i.result.result) ? i.result.result : undefined)) as {
      [key: keyBatch]: T
    }
  }

  override mapBranchResultWithoutKey<T>(res: iBatchRequestAnswer<T>[]): T[] {
    return flatten<T>(Object.assign([], ...res.map(i => (i.result && i.result.result) ? i.result.result : undefined)))
  }

  post<T>(name: string[],
          params: any,
          textError: string,
          mapHttp?: undefined,
          settings?: iHttpParamSettings): Observable<iHttpAnswerBX<T> | undefined>
  post<T, R>(name: string[],
             params: any,
             textError: string,
             mapHttp: TransformFunction<T, R>,
             settings?: iHttpParamSettings): Observable<iHttpAnswerBX<R> | undefined>
  post<T, R>(name: string[],
             params: any = {},
             textError = '',
             mapHttp: TransformFunction<T, R> | undefined = undefined,
             settings: iHttpParamSettings = this.defSettings) {
    return this.httpPost<iHttpAnswerBX<T>>(this.getNameMethod(name), params, textError, settings).pipe(
      map(v => {
          console.log('result', v)
          if (v && v.result && REST_SETTINGS.support.map && mapHttp) {
            // console.log('result2', v, Array.isArray(v.result)
            //   ? Object.assign(v, {result: v.result.map(i => mapHttp(i))}) as iHttpAnswerBX<R>
            //   : Object.assign(v, {result: mapHttp(v.result)}) as iHttpAnswerBX<R>)

            // Array.isArray(v.result)
            //   ? Object.assign(v, {result: v.result.map(i => mapHttp(i))}) as iHttpAnswerBX<R>
            //   :
            return Object.assign(v, {result: mapHttp(v.result)}) as iHttpAnswerBX<R>
          }
          return v
        }
      ),
      map(v => (v && REST_SETTINGS.support.result) ? mapResult : v)
    )
  }

  get<T, R = T>(name: string[],
                params: any = {},
                textError = '',
                mapHttp: TransformFunction<T, R> = (v: any) => {
                  return v
                },
                settings: iHttpParamSettings = this.defSettings) {
    return this.httpGet<iHttpAnswerBX<T>>(this.getNameMethod(name), params, textError, settings).pipe(
      map(v => {
          if (v && v.result && REST_SETTINGS.support.map) {
            return Array.isArray(v.result)
              ? Object.assign(v, {result: v.result.map(i => mapHttp(i))}) as iHttpAnswerBX<R>
              : Object.assign(v, {result: mapHttp(v.result)}) as iHttpAnswerBX<R>
          }
          return v
        }
      ),
      map(v => (v && REST_SETTINGS.support.result) ? mapResult : v)
    )
  }

  override httpPost<T>(url: string,
                       params: any = {},
                       textError = '',
                       settings: iHttpParamSettings = this.defSettings
  ): Observable<T | undefined> {
    return this.session.getAuthParams().pipe(
      mergeMap(auth => {
        if (auth) {
          const paramsClone = clone(params)
          paramsClone[this.session.getKeyAuth()] = auth
          return this.session.getBaseUrl().pipe(
            mergeMap(v => {
              if (v) {
                return this.http.post<T | undefined>(
                  this.prepareBaseAddress(v) + url,
                  this.getHttpParamsPost(paramsClone, new FormData(), false, [], settings))
                  .pipe(
                    take(1),
                    catchError(err => {
                      if (!textError.length && err.error.error_description) {
                        textError = err.error.error_description
                      }

                      this.snackBar.error('Ошибка: ' + textError)
                      return throwError(() => err)
                    })
                  )
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
    textError = '',
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
                return this.http.get<T>(this.prepareBaseAddress(v) + url, options).pipe(
                  take(1),
                  catchError(err => {
                    if (!textError.length && err.error.error_description) {
                      textError = err.error.error_description
                    }

                    this.snackBar.error('Ошибка: ' + textError)
                    return throwError(() => err)
                  }))
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

  override getNameMethod(arr: string[]) {
    return arr.join('.')
  }

}

