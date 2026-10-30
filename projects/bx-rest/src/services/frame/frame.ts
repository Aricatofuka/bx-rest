import { BXRestFrameError, FrameTransport } from './transport'
import {
  BXRestFrameOptions, iBXRestFrameAccess, iBXRestFrameAuth, iBXRestFrameCrmSelection, iBXRestFrameCrmSelectOptions,
  iBXRestFrameInit, iBXRestFrameOpenPathResult, iBXRestFramePlacementInfo, iBXRestFramePlacementInterface,
  iBXRestFrameSize, iBXRestFrameUser,
} from './types'

const DEFAULT_TIMEOUT = 10000

/**
 * Команды порталу Bitrix24 из iframe приложения — без подключения BX24.js.
 * Те же команды и те же имена, что у BX24.js, но вместо колбэков —
 * промисы. Протокол внутренний и недокументированный, см. `transport.ts`.
 *
 * Создавайте один экземпляр на страницу и при старте приложения: параметры
 * портала читаются в конструкторе (до того, как роутер перепишет адрес), а
 * `firstRun` портал сообщает только в первом ответе на `getInitData`.
 *
 * Токены класс не логирует и никуда не сохраняет: `getAuth()` и
 * `refreshAuth()` каждый раз спрашивают портал, а в `init()` токенов нет.
 *
 * @example
 * const frame = new BXRestFrame()
 * const { lang, placement } = await frame.init()
 * await frame.fitWindow()
 * const user = await frame.selectUser()
 */
export class BXRestFrame {

  private readonly transport = new FrameTransport()
  private readonly timeout: number
  private initValue?: iBXRestFrameInit
  private initRequest?: Promise<iBXRestFrameInit>
  // Открытый диалог каждого вида — новый вызов того же диалога отменяет прошлый
  private readonly dialogs = new Map<'user' | 'access' | 'crm', AbortController>()

  /** Мессенджер — как `BX24.im`. Портал на эти команды не отвечает. */
  readonly im = {
    /** Позвонить сотруднику — `BX24.im.callTo()`. */
    callTo: async (userId: number | string, video?: boolean): Promise<void> => {
      this.transport.post('imCallTo', { userId, video })
    },
    /** Позвонить на телефон — `BX24.im.phoneTo()`. */
    phoneTo: async (phone: string): Promise<void> => {
      this.transport.post('imPhoneTo', { phone })
    },
    /** Открыть чат — `BX24.im.openMessenger()`. */
    openMessenger: async (dialogId?: number | string): Promise<void> => {
      this.transport.post('imOpenMessenger', { dialogId })
    },
    /** Открыть историю чата — `BX24.im.openHistory()`. */
    openHistory: async (dialogId: number | string): Promise<void> => {
      this.transport.post('imOpenHistory', { dialogId })
    },
  }

  /** Встраивание — как `BX24.placement`. */
  readonly placement = {
    /** Код и параметры встраивания — `BX24.placement.info()`. */
    info: async (): Promise<iBXRestFramePlacementInfo> => {
      const { placement, placementOptions } = await this.init()
      return { placement, options: placementOptions }
    },
    /** Команды и события текущего встраивания — `BX24.placement.getInterface()`. */
    getInterface: async (): Promise<iBXRestFramePlacementInterface> => {
      return await this.transport.request('getInterface', null, { timeout: this.timeout }) as iBXRestFramePlacementInterface
    },
    /**
     * Команда встраивания — `BX24.placement.call()`. Набор команд зависит от
     * встраивания (см. `getInterface()`). Не на все команды портал отвечает:
     * без ответа за `timeout` промис завершается с `undefined`.
     */
    call: async (command: string, params?: unknown, options: { timeout?: number | false } = {}): Promise<unknown> => {
      return this.transport.request(command, params, {
        timeout: options.timeout ?? this.timeout,
        onTimeout: 'resolve',
      })
    },
    /**
     * Подписка на событие встраивания — `BX24.placement.bindEvent()`.
     * `handler` вызывается при каждом событии. Возвращает функцию отписки:
     * она только перестаёт вызывать `handler` — отменить подписку на
     * стороне портала протокол не позволяет. Вне iframe бросает
     * `BXRestFrameError` с кодом `NOT_IN_FRAME`.
     */
    bindEvent: (event: string, handler: (data: unknown) => void): () => void => {
      return this.transport.subscribe('placementBindEvent', { event }, handler)
    },
  }

  /** Настройки приложения для текущего пользователя — как `BX24.userOption`. */
  readonly userOption = {
    get: async (name: string): Promise<unknown> => (await this.init()).userOptions[name],
    set: async (name: string, value: unknown): Promise<void> => {
      const init = await this.init()
      init.userOptions[name] = value
      await this.ack('setUserOption', { name, value })
    },
  }

  /** Настройки приложения для всего портала — как `BX24.appOption`. */
  readonly appOption = {
    get: async (name: string): Promise<unknown> => (await this.init()).appOptions[name],
    /**
     * Менять их может только администратор портала: остальным — ошибка
     * `ACCESS_DENIED` (BX24.js в этом случае молча ничего не делает).
     * Возвращает настройки приложения после сохранения.
     */
    set: async (name: string, value: unknown): Promise<Record<string, unknown>> => {
      const init = await this.init()
      if (!init.isAdmin) {
        throw new BXRestFrameError('ACCESS_DENIED', 'Only a Bitrix24 administrator can change application options.')
      }
      init.appOptions[name] = value
      return await this.transport.request('setAppOption', { name, value }, { timeout: this.timeout }) as Record<string, unknown>
    },
  }

  constructor(options: BXRestFrameOptions = {}) {
    this.timeout = options.timeout ?? DEFAULT_TIMEOUT
  }

  /**
   * Данные запуска приложения — аналог `BX24.init()`: язык, домен, права,
   * встраивание, настройки, признаки установки. Запрашиваются у портала
   * один раз, дальше берутся из памяти. Токенов здесь нет — см. `getAuth()`.
   */
  init(): Promise<iBXRestFrameInit> {
    if (this.initValue) {
      return Promise.resolve(this.initValue)
    }
    if (!this.initRequest) {
      this.initRequest = this.getInitData()
        .then(() => this.initValue as iBXRestFrameInit)
        .finally(() => {
          this.initRequest = undefined
        })
    }
    return this.initRequest
  }

  /**
   * Текущая авторизация приложения — аналог `BX24.getAuth()`. Каждый вызов —
   * новый запрос `getInitData` к порталу.
   *
   * `expires_in` портал считает от срока жизни токена в момент выдачи, а не
   * от остатка: если страница открыта давно, значение будет завышено (так
   * же и у BX24.js). Для свежего токена используйте `refreshAuth()`.
   */
  async getAuth(): Promise<iBXRestFrameAuth> {
    const data = await this.getInitData()
    return this.toAuth('getInitData', data, String(data['MEMBER_ID'] || ''))
  }

  /**
   * Новая авторизация приложения — аналог `BX24.refreshAuth()`: портал
   * выпускает новую пару `access_token`/`refresh_token`. Если портал не может
   * выдать токен, он показывает `alert` «Unable to get new token!» и не
   * отвечает — тогда ошибка `TIMEOUT`.
   */
  async refreshAuth(): Promise<iBXRestFrameAuth> {
    // member_id приходит только в getInitData — refreshAuth его не возвращает
    const { memberId } = await this.init()
    const data = asObject('refreshAuth', await this.transport.request('refreshAuth', {}, { timeout: this.timeout }))
    return this.toAuth('refreshAuth', data, memberId)
  }

  /**
   * Завершить установку — аналог `BX24.installFinish()`: портал отмечает
   * приложение установленным и перезагружает страницу. Делает что-то только
   * на странице установщика (`init().install`), иначе — ничего, как и BX24.js.
   */
  async installFinish(): Promise<void> {
    if ((await this.init()).install) {
      this.transport.post('setInstallFinish', {})
    }
  }

  /**
   * Отметить, что первый запуск у этого пользователя пройден, — то, что
   * BX24.js делает после последнего обработчика `BX24.install()`. Без этого
   * `init().firstRun` останется `true` и при следующих запусках. Делает
   * что-то только при первом запуске.
   */
  async firstRunFinish(): Promise<void> {
    const init = await this.init()
    if (init.firstRun) {
      await this.ack('setInstall', { install: true })
      init.firstRun = false
    }
  }

  /** Задать размер фрейма — `BX24.resizeWindow()`. Возвращает размер, который выставил портал. */
  async resizeWindow(width: number | string, height: number | string): Promise<iBXRestFrameSize | undefined> {
    const w = Number.parseInt(String(width), 10)
    const h = Number.parseInt(String(height), 10)
    if (!(w > 0 && h > 0)) {
      throw new TypeError('resizeWindow: width and height must be positive numbers.')
    }
    return await this.ack('resizeWindow', { width: w, height: h }) as iBXRestFrameSize | undefined
  }

  /** Подогнать высоту фрейма под содержимое — `BX24.fitWindow()`. */
  async fitWindow(): Promise<iBXRestFrameSize | undefined> {
    const root = document.documentElement
    const height = Math.max(root.scrollHeight, root.offsetHeight)
    return await this.ack('resizeWindow', { width: '100%', height }) as iBXRestFrameSize | undefined
  }

  /**
   * Перезагрузить страницу портала с приложением — `BX24.reloadWindow()`.
   * Портал на эту команду не отвечает.
   */
  async reloadWindow(): Promise<void> {
    this.transport.post('reloadWindow', {})
  }

  /** Заголовок страницы портала — `BX24.setTitle()`. */
  async setTitle(title: string): Promise<{ title: string } | undefined> {
    return await this.ack('setTitle', { title: String(title) }) as { title: string } | undefined
  }

  /** Прокрутить страницу портала — `BX24.scrollParentWindow()`. */
  async scrollParentWindow(scroll: number | string): Promise<{ scroll: number } | undefined> {
    const value = Number.parseInt(String(scroll), 10)
    if (Number.isNaN(value)) {
      throw new TypeError('scrollParentWindow: scroll must be a number.')
    }
    return await this.ack('setScroll', { scroll: value }) as { scroll: number } | undefined
  }

  /**
   * Диалог выбора одного сотрудника — `BX24.selectUser()`. Ждёт выбора без
   * ограничения по времени: если пользователь закрыл диалог, портал не
   * отвечает вовсе. Отменить ожидание — `signal` или новый вызов
   * `selectUser()`/`selectUsers()` (ошибка `CANCELLED`).
   */
  selectUser(options: { title?: string, signal?: AbortSignal } = {}): Promise<iBXRestFrameUser> {
    return this.dialog('user', 'selectUser', { title: options.title ?? '', mult: false }, options.signal) as Promise<iBXRestFrameUser>
  }

  /** Диалог выбора нескольких сотрудников — `BX24.selectUsers()`. Ожидание — как у `selectUser()`. */
  selectUsers(options: { title?: string, signal?: AbortSignal } = {}): Promise<iBXRestFrameUser[]> {
    return this.dialog('user', 'selectUser', { title: options.title ?? '', mult: true }, options.signal) as Promise<iBXRestFrameUser[]>
  }

  /**
   * Диалог выбора прав доступа — `BX24.selectAccess()`. `value` — коды,
   * которые нельзя выбрать. Ожидание — как у `selectUser()`.
   */
  selectAccess(options: { value?: string[], signal?: AbortSignal } = {}): Promise<iBXRestFrameAccess[]> {
    return this.dialog('access', 'selectAccess', { value: options.value ?? [] }, options.signal) as Promise<iBXRestFrameAccess[]>
  }

  /** Диалог выбора объектов CRM — `BX24.selectCRM()`. Ожидание — как у `selectUser()`. */
  selectCRM(options: iBXRestFrameCrmSelectOptions = {}): Promise<iBXRestFrameCrmSelection> {
    const { entityType, multiple, value, signal } = options
    return this.dialog('crm', 'selectCRM', { entityType, multiple, value }, signal) as Promise<iBXRestFrameCrmSelection>
  }

  /**
   * Открыть приложение в слайдере — `BX24.openApplication()`. Промис
   * завершается, когда слайдер закрыли. `settings` — настройки слайдера
   * (уходят как `bx24_<ключ>`, как в BX24.js).
   */
  async openApplication(
    params: Record<string, unknown> = {},
    settings: Record<string, unknown> = {},
    options: { signal?: AbortSignal } = {}
  ): Promise<void> {
    const message: Record<string, unknown> = { ...params }
    for (const [key, value] of Object.entries(settings)) {
      message[`bx24_${key}`] = value
    }
    await this.transport.request('openApplication', message, { timeout: false, signal: options.signal })
  }

  /**
   * Открыть страницу портала в слайдере — `BX24.openPath()`. Промис
   * завершается, когда слайдер закрыли (`{ result: 'close' }`), или сразу,
   * если путь не открылся (`{ result: 'error', errorCode }`).
   */
  async openPath(path: string, options: { signal?: AbortSignal } = {}): Promise<iBXRestFrameOpenPathResult> {
    return await this.transport.request('openPath', { path }, { timeout: false, signal: options.signal }) as iBXRestFrameOpenPathResult
  }

  /**
   * Закрыть слайдер с приложением — `BX24.closeApplication()`. Если
   * приложение открыто не в слайдере, ничего не происходит. Узнать о
   * закрытии может открывший слайдер — через `openApplication()`.
   */
  async closeApplication(): Promise<void> {
    this.transport.post('closeApplication', null)
  }

  /**
   * Команда, на которую портал отвечает подтверждением. В некоторых
   * встраиваниях портал на такие команды не отвечает (так считает и
   * b24jssdk) — тогда промис завершается с `undefined`, а не ошибкой.
   */
  private ack(command: string, params: unknown): Promise<unknown> {
    return this.transport.request(command, params, { timeout: this.timeout, onTimeout: 'resolve' })
  }

  /**
   * Диалоги ждут пользователя без таймаута. Портал держит один обработчик
   * на диалог (у выбора сотрудников он общий для `selectUser` и
   * `selectUsers`) и на прошлый вызов уже не ответит — поэтому новый вызов
   * отменяет ожидание прошлого.
   */
  private dialog(kind: 'user' | 'access' | 'crm', command: string, params: unknown, signal?: AbortSignal): Promise<unknown> {
    this.dialogs.get(kind)?.abort()
    const controller = new AbortController()
    this.dialogs.set(kind, controller)

    const onAbort = () => controller.abort()
    if (signal?.aborted) {
      controller.abort()
    }
    signal?.addEventListener('abort', onAbort, { once: true })

    return this.transport.request(command, params, { timeout: false, signal: controller.signal })
      .finally(() => {
        signal?.removeEventListener('abort', onAbort)
        if (this.dialogs.get(kind) === controller) {
          this.dialogs.delete(kind)
        }
      })
  }

  private async getInitData(): Promise<Record<string, unknown>> {
    const data = asObject('getInitData', await this.transport.request('getInitData', null, { timeout: this.timeout }))
    // firstRun портал отдаёт только в первом ответе за загрузку страницы —
    // поэтому запоминаем данные первого ответа, кто бы его ни запросил
    if (!this.initValue) {
      this.initValue = this.toInit(data)
    }
    return data
  }

  private toInit(data: Record<string, unknown>): iBXRestFrameInit {
    return {
      // Как BX24.js: домен — из параметров фрейма, DOMAIN ответа — запасной
      domain: this.transport.domain || String(data['DOMAIN'] || ''),
      lang: String(data['LANG'] || ''),
      path: String(data['PATH'] || ''),
      https: Number.parseInt(String(data['PROTOCOL']), 10) === 1,
      memberId: String(data['MEMBER_ID'] || ''),
      isAdmin: !!data['IS_ADMIN'],
      install: !!data['INSTALL'],
      firstRun: !!data['FIRST_RUN'],
      placement: String(data['PLACEMENT'] || 'DEFAULT'),
      placementOptions: data['PLACEMENT_OPTIONS'],
      userOptions: toRecord(data['USER_OPTIONS']),
      appOptions: toRecord(data['APP_OPTIONS']),
    }
  }

  private toAuth(command: string, data: Record<string, unknown>, memberId: string): iBXRestFrameAuth {
    const { AUTH_ID, REFRESH_ID, AUTH_EXPIRES } = data
    if (!AUTH_ID || typeof AUTH_ID !== 'string') {
      throw new BXRestFrameError('NO_AUTH', `Bitrix24 answered ${command} without an access token.`)
    }
    // AUTH_EXPIRES — срок жизни токена в секундах. BX24.js переводит его в
    // момент истечения в миллисекундах — так же, как здесь.
    const expiresIn = Number.parseInt(String(AUTH_EXPIRES), 10)
    if (!Number.isFinite(expiresIn) || expiresIn <= 0) {
      throw new BXRestFrameError('BAD_RESPONSE', `Bitrix24 answered ${command} without a usable AUTH_EXPIRES.`)
    }
    return {
      access_token: AUTH_ID,
      refresh_token: typeof REFRESH_ID === 'string' ? REFRESH_ID : '',
      expires_in: Date.now() + expiresIn * 1000,
      domain: this.transport.domain,
      member_id: memberId,
    }
  }
}

function asObject(command: string, data: unknown): Record<string, unknown> {
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    throw new BXRestFrameError('BAD_RESPONSE', `Bitrix24 answered ${command} with a payload that is not an object.`)
  }
  return data as Record<string, unknown>
}

// Пустые настройки PHP отдаёт массивом `[]`
function toRecord(value: unknown): Record<string, unknown> {
  return (value && typeof value === 'object' && !Array.isArray(value))
    ? { ...value as Record<string, unknown> }
    : {}
}
