import { BXRestRequestConfig } from './transport'

/**
 * Ответ не 2xx при `transport: 'fetch'`. Поле `response` такое же, как у
 * `AxiosError`: по нему библиотека узнаёт ошибки Bitrix и ошибки авторизации.
 * В `.resVanilla()` приходит сама эта ошибка, в `.res()` — в `cause`.
 */
export class BXRestHttpError extends Error {
  constructor(readonly response: { status: number, data: unknown }) {
    super(`Request failed with status code ${response.status}`)
    this.name = 'BXRestHttpError'
  }
}

/**
 * Транспорт `transport: 'fetch'`: глобальный `fetch` браузера или Node 18+.
 * Тело ответа разбирается как JSON, а если это не JSON (например, HTML от
 * прокси) — отдаётся строкой, как это делает axios
 */
export async function fetchSend(config: BXRestRequestConfig): Promise<unknown> {
  let body: string | undefined
  if (config.method === 'POST') {
    body = (typeof config.data === 'string') ? config.data : JSON.stringify(config.data ?? {})
  }
  const response = await fetch(config.url, {
    method: config.method,
    headers: config.headers,
    body,
    credentials: config.withCredentials ? 'include' : 'same-origin',
    signal: config.signal,
  })
  const text = await response.text()
  let data: unknown = text
  if (text) {
    try {
      data = JSON.parse(text)
    } catch {
      // Не JSON — отдаём текстом
    }
  }
  if (!response.ok) {
    throw new BXRestHttpError({ status: response.status, data })
  }
  return data
}
