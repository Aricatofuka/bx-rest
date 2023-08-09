import { Observable, throwError, take, mergeMap, forkJoin } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { Injectable } from '@angular/core'
import clone from 'just-clone'
import { iHttpParamSettings } from 'bx-rest/typification/rest/settings'
import BaseHttpServices from 'bx-rest/services/http/http'
import {
    iBatchRequestAnswer, iBatchRequestParam,
    iBatchRequestParamArr,
    iBatchRequestParamHttp, keyBatch
} from 'bx-rest/typification/rest/batch/batchRequestParam'
import flatten from 'just-flatten-it'

@Injectable({
    providedIn: 'root'
})
export default class HttpBXServices extends BaseHttpServices {

    timeNowOnServer() {
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
                obj[key] = '';
                return obj;
            },
            {} as iBatchRequestParamHttp
        );
        for (let key in param) {
            if(typeof key === 'string' || typeof key === 'number' && param[key].param) {
                res[key] = param[key].name + '?' + this.getHttpParamsGet(param[key].param).toString()
            }
        }
        return res
    }

    mapBranchResult<T>(res: iBatchRequestAnswer<T>[]){
        return Object.assign([], ...res.map(i => (i.result && i.result.result) ? i.result.result : undefined)) as {[key:keyBatch]: T}
    }

    mapBranchResultWithoutKey<T>(res: iBatchRequestAnswer<T>[]): T[]{
        return flatten<T>(Object.assign([], ...res.map(i => (i.result && i.result.result) ? i.result.result : undefined)))
    }

    post<T>(name: string[],
            params: any = {},
            textError = '',
            settings: iHttpParamSettings = this.defSettings) {
        return this.httpPost<T>(this.getNameMethod(name), params, textError, settings)
    }

    get<T>(name: string[],
           params: any = {},
           textError = '',
           settings: iHttpParamSettings = this.defSettings) {
        return this.httpGet<T>(this.getNameMethod(name), params, textError, settings)
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
                    return this.session.getBaseUrl().pipe(mergeMap(v => {
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

    getNameMethod(arr: string[]) {
        return arr.join('.')
    }

}

