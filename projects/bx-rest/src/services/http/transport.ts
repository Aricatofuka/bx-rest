/**
 * Запрос, который HTTP-слой bx-rest передаёт middleware и транспорту.
 */
export interface BXRestRequestConfig {
  method: 'GET' | 'POST'
  /** Полный адрес; у GET — вместе со строкой параметров. */
  url: string
  /** Тело POST: объект (уходит JSON) или строка x-www-form-urlencoded. */
  data?: unknown
  headers: Record<string, string>
  /** Прикладывать ли cookie браузера (`credentials: 'include'` у fetch). */
  withCredentials: boolean
  /** Отмена запроса. */
  signal?: AbortSignal
}

/**
 * Отправляет запрос и возвращает тело ответа. На ответ не 2xx отклоняется
 * ошибкой с полем `response: { status, data }` — как `AxiosError`: по нему
 * библиотека узнаёт ошибки Bitrix и ошибки авторизации.
 */
export type BXRestSend = (config: BXRestRequestConfig) => Promise<unknown>

/**
 * Шаг перед отправкой. Может поменять запрос, повторить его, подождать или
 * вовсе не звать `next` — тогда middleware сам становится транспортом.
 */
export type BXRestMiddleware = (config: BXRestRequestConfig, next: BXRestSend) => Promise<unknown>

/** Первый middleware в списке — внешний: он первым видит запрос и последним — ответ */
export function composeMiddleware(middleware: readonly BXRestMiddleware[], terminal: BXRestSend): BXRestSend {
  return middleware.reduceRight<BXRestSend>((next, step) => config => step(config, next), terminal)
}
