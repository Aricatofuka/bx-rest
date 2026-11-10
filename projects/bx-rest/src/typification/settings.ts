import type { BXRestMiddleware } from '../services/http/transport'

export interface iBXRestSettings {
  auth: {
    source: 'cookies' | 'localStorage' | 'off' | (() => string)
    key: 'auth' | 'sessid' | string
    /**
     * Продление авторизации. Если запрос упал с ошибкой авторизации (см.
     * `isAuthError`), библиотека вызывает эту функцию и повторяет запрос
     * один раз — заново читая токен, адрес и заголовки из настроек. Поэтому
     * функция должна положить новый токен туда, откуда его читает `source`
     * (или, для прокси, передать его на сервер). Значение промиса не
     * используется. Одновременно упавшие запросы ждут одно общее продление.
     *
     * Если не задано — запросы не повторяются (поведение до 1.4.0).
     */
    refresh?: () => Promise<unknown>
    /**
     * Какую ошибку запроса считать ошибкой авторизации, которую лечит
     * `refresh`. Получает исходную ошибку HTTP-запроса — обычно `AxiosError`.
     * По умолчанию — `isBXRestAuthError`.
     */
    isAuthError?: (error: unknown) => boolean
  },
  urls: {
    source: 'string' | 'localStorage'
    key: string | 'OAuth2'
    additional_part?: string
  }
  /**
   * Управляет axios-опцией `withCredentials` (прикладывать ли браузерные
   * cookie к запросу) независимо от `auth.key`. Если не задано — сохраняется
   * прежнее поведение: `withCredentials` включается только при
   * `auth.key === 'OAuth2'`. Явное значение здесь имеет приоритет — нужно,
   * например, когда `auth.source: 'off'` указывает на собственный прокси,
   * а браузер должен приложить cookie сессии этого прокси (не Bitrix24).
   */
  withCredentials?: boolean
  /**
   * Статичные HTTP-заголовки, которые прикладываются к каждому запросу,
   * например `{ 'X-Bitrix-App': 'smart-process-pro' }`. Для одного запроса
   * их можно дополнить или перебить через `.withHeaders()`. `Content-Type`
   * библиотека всегда выставляет сама — от него зависит формат тела запроса.
   */
  headers?: Record<string, string>
  /**
   * Повтор запроса, когда портал отвечает `QUERY_LIMIT_EXCEEDED` (превышен
   * лимит частоты запросов, HTTP 503). `attempts` — сколько всего попыток
   * вместе с первой, `delay` — пауза перед второй попыткой в мс, дальше она
   * растёт вдвое. `true` — значения по умолчанию: `{ attempts: 3, delay: 1000 }`.
   * Если не задано — запрос не повторяется.
   */
  retryOnQueryLimit?: boolean | { attempts?: number, delay?: number }
  /**
   * Предельное время одного HTTP-запроса, мс: дольше — запрос отменяется
   * с ошибкой `BXRestTimeoutError`. Ожидание очереди `throttle` и паузы
   * `retryOnQueryLimit` сюда не входят, у каждой попытки повтора своё время.
   * `true` — 60 000 мс. Если не задано — время не ограничено.
   */
  timeout?: boolean | number
  /**
   * Не больше `perSecond` запросов в секунду: лишние ждут своей очереди.
   * Очередь своя у каждого клиента `new BXRestNavvy(settings)` и общая у
   * всех, кто работает с глобальными `BXRestSettings`. `true` — 2 запроса
   * в секунду, лимит Bitrix24 на обычных тарифах. Если не задано — без очереди.
   */
  throttle?: boolean | { perSecond?: number }
  /**
   * Свои шаги перед отправкой каждого запроса: логирование, подмена
   * заголовков, свой транспорт вместо axios. Первый в списке — внешний.
   * Идут после `retryOnQueryLimit`, `throttle` и `timeout`, перед axios.
   */
  middleware?: BXRestMiddleware[]
}
