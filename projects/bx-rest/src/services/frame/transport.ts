/**
 * Обмен сообщениями между iframe приложения и порталом Bitrix24 — тот
 * транспорт, на котором построены команды BX24.js: страница приложения шлёт
 * команду родительскому окну портала через postMessage, портал отвечает
 * сообщением с тем же callbackId.
 *
 * ВНИМАНИЕ: протокол внутренний и недокументированный — Bitrix24 может
 * изменить его без предупреждения. Транспорт повторяет BX24.js
 * (https://api.bitrix24.com/api/v1/, скачан 2026-10-29, Last-Modified
 * 2022-03-17, sha256 945ad491df8ffb7490b89f4914a439b5a3f575c950c3480562815716a3e07f23)
 * и сверен с ответной стороной портала — `/bitrix/js/rest/applayout.js`
 * (Last-Modified 2024-05-15, sha256 3efd6ab57a4778493a26d10ae0987a82e19fc012ed9935f5c6afa78c4052fcb5).
 * Всё знание о протоколе — только в этом модуле (`services/frame`).
 */

export type BXRestFrameErrorCode =
  'NOT_IN_FRAME' | 'TIMEOUT' | 'NO_AUTH' | 'BAD_RESPONSE' | 'CANCELLED' | 'ACCESS_DENIED'

/**
 * Ошибка обращения к порталу из iframe. `code`:
 * - `NOT_IN_FRAME` — страница открыта не в iframe приложения Bitrix24;
 * - `TIMEOUT` — портал не ответил за отведённое время;
 * - `NO_AUTH` — портал ответил без токена;
 * - `BAD_RESPONSE` — ответ портала не удалось разобрать;
 * - `CANCELLED` — ожидание отменено через `signal` или новым вызовом того же диалога;
 * - `ACCESS_DENIED` — команда доступна только администратору портала.
 */
export class BXRestFrameError extends Error {
  constructor(
    public readonly code: BXRestFrameErrorCode,
    message: string
  ) {
    super(message)
    this.name = 'BXRestFrameError'
  }
}

export interface FrameRequestOptions {
  /** Сколько ждать ответа, мс; `false` — без ограничения (диалоги, слайдеры). */
  timeout: number | false
  /**
   * Что делать, если портал не ответил за `timeout`: `'reject'` — ошибка
   * `TIMEOUT` (по умолчанию), `'resolve'` — завершиться с `undefined`.
   */
  onTimeout?: 'reject' | 'resolve'
  signal?: AbortSignal
}

interface PortalFrame {
  /** Как его отдаёт портал, без `:80`/`:443`. */
  domain: string
  /** `https://домен` — targetOrigin команд и ожидаемый origin ответов. */
  origin: string
  appSid: string
}

/**
 * Параметры портала (DOMAIN, PROTOCOL, APP_SID) читаются в конструкторе —
 * так же, как это делает BX24.js, из `window.name`: портал задаёт имя
 * iframe приложения в виде `DOMAIN|PROTOCOL|APP_SID`. Если там их нет —
 * из query страницы (`?DOMAIN=…&PROTOCOL=…&APP_SID=…`), с которым портал
 * открывает обработчик приложения. Конструктор не бросает исключений:
 * вне iframe ошибку вернут сами команды.
 */
export class FrameTransport {

  private readonly frame: PortalFrame | undefined

  constructor() {
    this.frame = readPortalFrame()
  }

  /** Домен портала из параметров фрейма — как `BX24.getDomain()`. */
  get domain(): string {
    return this.frame?.domain ?? ''
  }

  /**
   * Команда, на которую портал не отвечает (`reloadWindow`, `imCallTo`, ...).
   * Вне iframe бросает `BXRestFrameError` с кодом `NOT_IN_FRAME`.
   */
  post(command: string, params: unknown): void {
    this.send(this.requireFrame(), command, params, '')
  }

  /** Команда с одним ответом портала. */
  request(command: string, params: unknown, options: FrameRequestOptions): Promise<unknown> {
    return new Promise((resolve, reject) => {
      let frame: PortalFrame
      try {
        frame = this.requireFrame()
      } catch (error) {
        reject(error)
        return
      }
      const { timeout, onTimeout = 'reject', signal } = options
      if (signal?.aborted) {
        reject(cancelled(command))
        return
      }

      const callbackId = uniqId()
      let timer: ReturnType<typeof setTimeout> | undefined
      const finish = () => {
        clearTimeout(timer)
        stopListening()
        signal?.removeEventListener('abort', onAbort)
      }
      const onAbort = () => {
        finish()
        reject(cancelled(command))
      }
      const stopListening = this.listen(frame, callbackId, payload => {
        finish()
        const answer = parsePayload(payload)
        if (answer.ok) {
          resolve(answer.value)
        } else {
          // В тексте ошибки — только команда, без тела ответа: в нём бывают токены
          reject(new BXRestFrameError('BAD_RESPONSE', `Bitrix24 answered ${command} with a payload that is not JSON.`))
        }
      })

      if (timeout !== false) {
        timer = setTimeout(() => {
          finish()
          if (onTimeout === 'resolve') {
            resolve(undefined)
          } else {
            reject(new BXRestFrameError('TIMEOUT', [
              `Bitrix24 did not answer ${command} within ${timeout} ms:`,
              'the page is not opened inside a Bitrix24 portal iframe, or the portal could not process the command.'
            ].join(' ')))
          }
        }, timeout)
      }
      signal?.addEventListener('abort', onAbort, { once: true })

      this.send(frame, command, params, callbackId)
    })
  }

  /**
   * Команда, на которую портал отвечает многократно (`placementBindEvent`):
   * `handler` вызывается на каждый ответ. Возвращает функцию отписки —
   * она только перестаёт слушать: отменить подписку на стороне портала
   * протокол не позволяет. Вне iframe бросает `BXRestFrameError`.
   */
  subscribe(command: string, params: unknown, handler: (data: unknown) => void): () => void {
    const frame = this.requireFrame()
    const callbackId = uniqId()
    const stopListening = this.listen(frame, callbackId, payload => {
      const answer = parsePayload(payload)
      if (answer.ok) {
        handler(answer.value)
      }
    })
    this.send(frame, command, params, callbackId)
    return stopListening
  }

  private requireFrame(): PortalFrame {
    if (!this.frame) {
      throw new BXRestFrameError('NOT_IN_FRAME',
        'Bitrix24 frame parameters (DOMAIN, APP_SID) were not found in window.name or in the URL query: '
        + 'the page is not opened as a Bitrix24 application.')
    }
    if (window.parent === window) {
      throw new BXRestFrameError('NOT_IN_FRAME',
        'The page is not opened inside an iframe, so there is no Bitrix24 portal to send commands to.')
    }
    return this.frame
  }

  /**
   * Формат — как у BX24.js. Обычно строка `команда:параметры:callbackId:APP_SID`
   * (портал разбирает её с конца, поэтому параметры и callbackId могут быть
   * пустыми); для команд с `:` в имени — объект.
   */
  private send(frame: PortalFrame, command: string, params: unknown, callbackId: string): void {
    const message = command.includes(':')
      ? { method: command, params: params ? params : '', callback: callbackId, appSid: frame.appSid }
      : `${command}:${params ? JSON.stringify(params) : ''}:${callbackId}:${frame.appSid}`
    window.parent.postMessage(message, frame.origin)
  }

  /** Ответ портала — строка `callbackId:JSON` (или `callbackId:`, если ответ пустой). */
  private listen(frame: PortalFrame, callbackId: string, onAnswer: (payload: string) => void): () => void {
    const portalWindow = window.parent
    const onMessage = (event: MessageEvent) => {
      // Ответ принимаем только от родительского окна и только с origin
      // портала — BX24.js проверяет лишь origin
      if (event.source !== portalWindow || event.origin !== frame.origin || typeof event.data !== 'string') {
        return
      }
      const separator = event.data.indexOf(':')
      const id = separator < 0 ? event.data : event.data.slice(0, separator)
      if (id === callbackId) {
        onAnswer(separator < 0 ? '' : event.data.slice(separator + 1))
      }
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }
}

function parsePayload(payload: string): { ok: true, value: unknown } | { ok: false } {
  if (payload === '') {
    return { ok: true, value: undefined }
  }
  try {
    return { ok: true, value: JSON.parse(payload) }
  } catch {
    return { ok: false }
  }
}

function cancelled(command: string): BXRestFrameError {
  return new BXRestFrameError('CANCELLED', `Waiting for the Bitrix24 answer to ${command} was cancelled.`)
}

function readPortalFrame(): PortalFrame | undefined {
  if (typeof window === 'undefined') {
    return undefined
  }

  // BX24.js: window.name = 'DOMAIN|PROTOCOL|APP_SID'
  const [nameDomain, nameProtocol, nameAppSid] = (typeof window.name === 'string' ? window.name : '').split('|')
  const fromName = toPortalFrame(nameDomain, nameProtocol, nameAppSid)
  if (fromName) {
    return fromName
  }

  try {
    const query = new URLSearchParams(window.location?.search ?? '')
    return toPortalFrame(query.get('DOMAIN'), query.get('PROTOCOL'), query.get('APP_SID'))
  } catch {
    return undefined
  }
}

function toPortalFrame(
  rawDomain: string | null | undefined,
  rawProtocol: string | null | undefined,
  appSid: string | null | undefined
): PortalFrame | undefined {
  // Как BX24.js: порт по умолчанию отрезается, PROTOCOL 1 — https
  const domain = (rawDomain ?? '').replace(/:(80|443)$/, '')
  if (!domain || !appSid) {
    return undefined
  }
  const protocol = (Number.parseInt(rawProtocol ?? '', 10) || 0) ? 'https' : 'http'

  try {
    const url = new URL(`${protocol}://${domain}`)
    // В DOMAIN должен быть только хост (и порт) — никаких путей и логинов
    if (url.host !== domain.toLowerCase() || url.username || url.password) {
      return undefined
    }
    return { domain, origin: url.origin, appSid }
  } catch {
    return undefined
  }
}

function uniqId(): string {
  const bytes = new Uint8Array(16)
  globalThis.crypto.getRandomValues(bytes)
  return Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('')
}
