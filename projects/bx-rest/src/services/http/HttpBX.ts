import { Observable, throwError, forkJoin, from, defer } from 'rxjs'
import clone from 'just-clone'
import { HttpServices } from './http'
import {
  iBatchRequestAnswer, iBatchRequestParam, iBatchRequestParamArr, iBatchRequestParamHttp, keyBatch,
} from '../../typification/rest/batch/batchRequestParam'
import { iBXRestAnswer } from '../../typification/rest/base/answer'
import flatten from 'just-flatten-it'
import { instanceOfiBXRestAnswerSuccess } from '../../functions/mapResult'
import { switchMap } from 'rxjs/operators'
import { prepareBaseAddress } from '../base'
import { serializeBitrixParams as stringifyBitrixParams } from '../../functions/serializeBitrixParams'
import { iHttpParamSettings } from '../../typification/rest/settings'
import { withAuthRefresh } from './authRefresh'

export class HttpBXServices extends HttpServices {

  /**
   * Не считайте этот метод образцом/финальным API.
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
        res[key] = param[key].name + '?' + stringifyBitrixParams(param[key].param)
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
   * @param restApi
   * @param headers заголовки только для этого запроса, поверх `BXRestSettings.headers`
   */
  post<T>(name: string[], params: any = {}, restApi = false, headers?: Record<string, string>) {
    const method = this.getNameMethod(name)
    return this.httpPost<iBXRestAnswer<T>>(restApi ? `api/${method}` : method, params, undefined, headers)
  }

  /**
   * Второстепенный метод для запросов. По возможности лучше не использовать
   *
   * @param name
   * @param params
   * @param headers заголовки только для этого запроса, поверх `BXRestSettings.headers`
   */
  get<T>(name: string[], params: any = {}, headers?: Record<string, string>) {
    return this.httpGet<iBXRestAnswer<T>>(this.getNameMethod(name), params, undefined, headers)
  }

  // settings — только для совместимости сигнатуры с HttpServices: здесь тело
  // уходит JSON-ом/urlencoded, и пересчёт дат из iHttpParamSettings не нужен.
  override httpPost<T>(
    url: string,
    params: any = {},
    settings?: iHttpParamSettings,
    headers?: Record<string, string>
  ): Observable<T | undefined> {
    // defer() откладывает всё содержимое (в том числе чтение BXRestSettings
    // через this.session.*) до реальной подписки — иначе даже с "живым"
    // геттером в SessionKeyServices настройки читались бы в момент вызова
    // .res(), а не в момент subscribe()/firstValueFrom(), что и обещано
    // в README как поведение "ленивого" REST-вызова.
    //
    // withAuthRefresh() повторяет запрос после BXRestSettings.auth.refresh —
    // повторной подпиской на этот же defer(), поэтому повтор заново читает
    // токен, адрес и заголовки. Через httpPost/httpGet идут все запросы
    // библиотеки (post/get, batch, все виды Navvy-запросов), так что повтор
    // встроен только здесь.
    return withAuthRefresh(defer(() => {
      const paramsClone = clone(params)
      const key = this.session.getKeyAuth()
      const auth = this.session.getAuthParams()
      const checkIsOn = this.session.getCheckAuthParamsIsOn()

      if (checkIsOn) {
        if (!auth) {
          return throwError(() => this.session.getAuthError('post'))
        }

        if (key !== 'OAuth2') {
          paramsClone[key] = auth
        }
      }

      return this.session.getBaseUrl().pipe(
        switchMap((baseUrl) => {
          if (!baseUrl) {
            return throwError(() => this.session.getBaseUrlError('post'))
          }

          const fullUrl = prepareBaseAddress(baseUrl) + url

          if (key === 'sessid') {
            // Преобразуем параметры в формат x-www-form-urlencoded
            const bodyString = this.serializeBitrixParams(paramsClone)
            return from(
              this.axiosInstance.post<T>(fullUrl, bodyString, {
                headers: this.buildHeaders(headers, {'Content-Type': 'application/x-www-form-urlencoded'}),
              }).then((response) => response.data)
            )
          }

          return from(
            this.axiosInstance.post<T>(fullUrl, paramsClone,
              {
                withCredentials: this.session.getWithCredentials(),
                headers: this.buildHeaders(headers, {'Content-Type': 'application/json'}),
              }
            ).then((response) => response.data)
          )
        })
      )
    }))
  }

  override httpGet<T>(
    url: string,
    params: any = {},
    settings?: iHttpParamSettings,
    headers?: Record<string, string>
  ): Observable<T | undefined> {
    // Та же причина, что и у httpPost выше: откладываем чтение BXRestSettings
    // до подписки, чтобы `get()` вёл себя так же "лениво", как и `post()`
    // (симметрия, которой не было до этого — GET резолвил настройки в момент
    // вызова, а не в момент subscribe()). Повтор после продления
    // авторизации — как в httpPost.
    return withAuthRefresh(defer(() => {
      const paramsClone = clone(params)
      const auth = this.session.getAuthParams()
      const checkIsOn = this.session.getCheckAuthParamsIsOn()

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
            this.axiosInstance.get<T>(finalUrl, {
              headers: this.buildHeaders(headers),
            }).then((response) => response.data)
          )
        })
      )
    }))
  }

  /**
   * Заголовки запроса: `BXRestSettings.headers`, поверх них — заголовки
   * конкретного запроса, поверх всего — `required`. В `required` идёт
   * `Content-Type`: от него зависит, как сервер разберёт тело, поэтому
   * пользовательские заголовки его не перебивают.
   */
  private buildHeaders(headers?: Record<string, string>, required: Record<string, string> = {}) {
    return { ...this.session.getHeaders(), ...headers, ...required }
  }

  serializeBitrixParams(params: unknown): string {
    return stringifyBitrixParams(params)
  }

  getNameMethod(arr: string[]) {
    return arr.join('.')
  }

}

