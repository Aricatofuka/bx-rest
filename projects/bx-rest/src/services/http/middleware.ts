import { BXRestMiddleware } from './transport'
import { httpErrorResponse, parseBXRestErrorBody } from '../../functions/errors'
import { BXRestRequestLogEntry, iBXRestSettings } from '../../typification/settings'

/** `retryOnQueryLimit: true`: всего 3 попытки, пауза перед второй — 1000 мс, дальше вдвое больше. */
export const DEFAULT_RETRY_ON_QUERY_LIMIT = { attempts: 3, delay: 1000 }
/** `timeout: true`: 60 000 мс на один HTTP-запрос. */
export const DEFAULT_TIMEOUT = 60_000
/** `throttle: true`: 2 запроса в секунду — лимит Bitrix24 на обычных тарифах. */
export const DEFAULT_THROTTLE = { perSecond: 2 }

/**
 * Запрос не завершился за время из `timeout` в настройках. В `.resVanilla()`
 * приходит сама эта ошибка, в `.res()` — в `cause`.
 */
export class BXRestTimeoutError extends Error {
  constructor(readonly timeout: number) {
    super(`The request did not finish in ${timeout} ms`)
    this.name = 'BXRestTimeoutError'
  }
}

/** Где клиент хранит очередь `throttle` — в своём контексте. */
export interface ThrottleState {
  throttleNextSlot: number
}

/**
 * Встроенные шаги из настроек, в этом порядке: повтор, очередь, таймаут, журнал.
 * Повтор — снаружи: каждая попытка заново встаёт в очередь и получает свой
 * таймаут. Таймаут — внутри очереди: ожидание своей очереди его не тратит.
 * Журнал — внутри всех: каждая попытка — своя запись, без времени в очереди.
 */
export function builtInMiddleware(settings: iBXRestSettings, state: ThrottleState): BXRestMiddleware[] {
  const steps: BXRestMiddleware[] = []
  if (settings.retryOnQueryLimit) {
    const own = (settings.retryOnQueryLimit === true) ? {} : settings.retryOnQueryLimit
    const attempts = own.attempts ?? DEFAULT_RETRY_ON_QUERY_LIMIT.attempts
    const delay = own.delay ?? DEFAULT_RETRY_ON_QUERY_LIMIT.delay
    if (!Number.isInteger(attempts) || attempts < 1) {
      throw invalid('retryOnQueryLimit.attempts', attempts, 'a whole number from 1')
    }
    if (!Number.isFinite(delay) || delay < 0) {
      throw invalid('retryOnQueryLimit.delay', delay, 'a number of milliseconds from 0')
    }
    steps.push(retryOnQueryLimit(attempts, delay))
  }
  if (settings.throttle) {
    const own = (settings.throttle === true) ? {} : settings.throttle
    const perSecond = own.perSecond ?? DEFAULT_THROTTLE.perSecond
    if (!Number.isFinite(perSecond) || perSecond <= 0) {
      throw invalid('throttle.perSecond', perSecond, 'a number above 0')
    }
    steps.push(throttle(perSecond, state))
  }
  if (settings.timeout) {
    const ms = (settings.timeout === true) ? DEFAULT_TIMEOUT : settings.timeout
    // setTimeout считает больше 2^31 − 1 мс за 0 и сработал бы сразу
    if (!Number.isFinite(ms) || ms <= 0 || ms > 2_147_483_647) {
      throw invalid('timeout', ms, 'a number of milliseconds from 1 to 2147483647')
    }
    steps.push(timeout(ms))
  }
  if (settings.logRequests !== undefined) {
    if (typeof settings.logRequests !== 'function') {
      throw invalid('logRequests', settings.logRequests, 'a function')
    }
    steps.push(logRequests(settings.logRequests))
  }
  if (settings.transport !== undefined && settings.transport !== 'axios' && settings.transport !== 'fetch') {
    throw invalid('transport', settings.transport, "'axios' or 'fetch'")
  }
  return steps
}

function invalid(name: string, value: unknown, expected: string): TypeError {
  return new TypeError(`bx-rest settings: ${name} must be ${expected}, got ${String(value)}`)
}

function abortReason(signal: AbortSignal): unknown {
  return signal.reason ?? new Error('The request was aborted')
}

/** Пауза, которую прерывает отмена запроса. */
function wait(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(abortReason(signal))
      return
    }
    const onAbort = () => {
      clearTimeout(timer)
      reject(abortReason(signal as AbortSignal))
    }
    const timer = setTimeout(() => {
      signal?.removeEventListener('abort', onAbort)
      resolve()
    }, ms)
    signal?.addEventListener('abort', onAbort, { once: true })
  })
}

/**
 * Повтор при `QUERY_LIMIT_EXCEEDED`: портал отвечает так (HTTP 503), когда
 * превышен лимит частоты запросов. Пауза растёт вдвое: `delay`, `2 × delay`, ...
 * `attempts` — сколько всего попыток, вместе с первой.
 */
function retryOnQueryLimit(attempts: number, delay: number): BXRestMiddleware {
  return async (config, next) => {
    for (let attempt = 1; ; attempt++) {
      try {
        return await next(config)
      } catch (error) {
        const code = parseBXRestErrorBody(httpErrorResponse(error)?.data)?.error
        if (attempt >= attempts || code !== 'QUERY_LIMIT_EXCEEDED') {
          throw error
        }
        await wait(delay * 2 ** (attempt - 1), config.signal)
      }
    }
  }
}

/**
 * Не больше `perSecond` запросов в секунду: лишние ждут своей очереди.
 * Очередь общая для всех запросов клиента (`state` — его контекст).
 */
function throttle(perSecond: number, state: ThrottleState): BXRestMiddleware {
  const interval = 1000 / perSecond
  return (config, next) => {
    const now = Date.now()
    const start = Math.max(now, state.throttleNextSlot)
    const reserved = start + interval
    state.throttleNextSlot = reserved
    if (start <= now) {
      return next(config)
    }
    return wait(start - now, config.signal).then(
      () => next(config),
      (error: unknown) => {
        // Отменённый запрос освобождает своё место, если за ним никто не встал
        if (state.throttleNextSlot === reserved) {
          state.throttleNextSlot = start
        }
        throw error
      }
    )
  }
}

/** Код ошибки Bitrix из тела ответа или, если его нет, текст ошибки запроса. */
function errorText(body: unknown, error?: unknown): string | undefined {
  const code = parseBXRestErrorBody(body)?.error
  if (code) {
    return code
  }
  return (error instanceof Error) ? error.message : undefined
}

/**
 * Пишет в журнал запись о каждом HTTP-запросе. Исключение из `log` проглатывается:
 * журнал не должен ломать запрос.
 */
function logRequests(log: (entry: BXRestRequestLogEntry) => void): BXRestMiddleware {
  const write = (entry: BXRestRequestLogEntry) => {
    try {
      log(entry)
    } catch {
      // Сбой журнала — не ошибка запроса
    }
  }
  return async (config, next) => {
    const started = Date.now()
    try {
      const data = await next(config)
      const error = errorText(data)
      write({ method: config.method, url: config.url, duration: Date.now() - started, failed: false, ...(error ? { error } : {}) })
      return data
    } catch (cause) {
      const response = httpErrorResponse(cause)
      const error = errorText(response?.data, cause)
      write({
        method: config.method,
        url: config.url,
        duration: Date.now() - started,
        failed: true,
        ...(response ? { status: response.status } : {}),
        ...(error ? { error } : {}),
      })
      throw cause
    }
  }
}

/** Отменяет запрос, если он не завершился за `ms` миллисекунд. */
function timeout(ms: number): BXRestMiddleware {
  return (config, next) => {
    const controller = new AbortController()
    const onAbort = () => controller.abort(abortReason(config.signal as AbortSignal))
    if (config.signal?.aborted) {
      onAbort()
    } else {
      config.signal?.addEventListener('abort', onAbort, { once: true })
    }
    let timer: ReturnType<typeof setTimeout> | undefined
    const timedOut = new Promise<never>((_, reject) => {
      timer = setTimeout(() => {
        const error = new BXRestTimeoutError(ms)
        controller.abort(error)
        reject(error)
      }, ms)
    })
    return Promise.race([next({ ...config, signal: controller.signal }), timedOut]).finally(() => {
      clearTimeout(timer)
      config.signal?.removeEventListener('abort', onAbort)
    })
  }
}
