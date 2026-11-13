import { Observable, throwError, forkJoin, defer } from 'rxjs'
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
import { BXRestRequestConfig, composeMiddleware } from './transport'
import { builtInMiddleware } from './middleware'
import { fetchSend } from './fetch'
import { BATCH_COMMANDS_LIMIT } from '../../consts/page-size'

export class HttpBXServices extends HttpServices {

  /**
   * Не считайте этот метод образцом/финальным API.
   * TODO: Удалить данный метод после реализации его в разделе Navvy
   * @param param
   */
  branch<T, A>(param: iBatchRequestParamArr<T> | iBatchRequestParam<T>[])
    : Observable<iBatchRequestAnswer<A>[] | undefined> {
    let prepareParam = Object.entries<string>(this.prepareBatch<T>(param))
    const size = BATCH_COMMANDS_LIMIT
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
   * @param restApi `true` — метод REST v3: к базовому адресу добавляется `api/`, подробнее
   *   у `Navvy.simpleV3()`
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

  // settings не используется и оставлен ради прежней сигнатуры: headers
  // остаётся четвёртым параметром у httpPost и httpGet.
  httpPost<T>(
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
          // sessid — тело x-www-form-urlencoded, остальные ключи — JSON
          const urlencoded = key === 'sessid'

          return this.send<T>({
            method: 'POST',
            url: fullUrl,
            data: urlencoded ? this.serializeBitrixParams(paramsClone) : paramsClone,
            withCredentials: this.session.getWithCredentials(),
            headers: this.buildHeaders(headers, {
              'Content-Type': urlencoded ? 'application/x-www-form-urlencoded' : 'application/json'
            }),
          })
        })
      )
    }), this.session.ctx)
  }

  httpGet<T>(
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
      const key = this.session.getKeyAuth()
      const auth = this.session.getAuthParams()
      const checkIsOn = this.session.getCheckAuthParamsIsOn()

      if (checkIsOn) {
        if (!auth) {
          return throwError(() => this.session.getAuthError('get'))
        }

        if (key !== 'OAuth2') {
          paramsClone[key] = auth
        }
      }

      return this.session.getBaseUrl().pipe(
        switchMap((baseUrl) => {
          if (!baseUrl) {
            return throwError(() => this.session.getBaseUrlError('get'))
          }

          const fullUrl = prepareBaseAddress(baseUrl) + url
          const queryString = this.serializeBitrixParams(paramsClone)
          const finalUrl = `${fullUrl}?${queryString}`

          return this.send<T>({
            method: 'GET',
            url: finalUrl,
            withCredentials: this.session.getWithCredentials(),
            headers: this.buildHeaders(headers),
          })
        })
      )
    }), this.session.ctx)
  }

  /**
   * Отправка через шаги из настроек: `retryOnQueryLimit`, `throttle`,
   * `timeout`, `logRequests`, затем `middleware`; последним идёт транспорт
   * клиента — axios или `fetch` (`transport`). Настройки читаются при
   * подписке. Отписка отменяет HTTP-запрос (AbortSignal). Ошибка транспорта
   * уходит дальше как есть: у axios в ней весь запрос, вместе с токеном и
   * секретом вебхука (см. README, «Обработка ошибок»)
   */
  private send<T>(config: BXRestRequestConfig): Observable<T | undefined> {
    return new Observable<T | undefined>(subscriber => {
      const controller = new AbortController()
      const ctx = this.session.ctx
      const settings = ctx.settings
      const send = composeMiddleware(
        [...builtInMiddleware(settings, ctx), ...this.session.getMiddleware()],
        (settings.transport === 'fetch') ? fetchSend : request => this.axiosSend(request)
      )
      send({ ...config, signal: controller.signal }).then(
        data => {
          subscriber.next(data as T | undefined)
          subscriber.complete()
        },
        (error: unknown) => subscriber.error(error)
      )
      return () => controller.abort()
    })
  }

  /** Транспорт по умолчанию: axios клиента, как и раньше через post()/get() */
  private axiosSend(config: BXRestRequestConfig): Promise<unknown> {
    const options = { headers: config.headers, withCredentials: config.withCredentials, signal: config.signal }
    const request = (config.method === 'GET')
      ? this.axiosInstance.get(config.url, options)
      : this.axiosInstance.post(config.url, config.data, options)
    return request.then(response => response.data)
  }

  /**
   * Заголовки запроса: `BXRestSettings.headers`, поверх них — заголовки
   * конкретного запроса, поверх всего — `required`. В `required` идёт
   * `Content-Type`: от него зависит, как сервер разберёт тело, поэтому
   * пользовательские заголовки его не перебивают
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

