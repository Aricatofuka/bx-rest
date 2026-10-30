import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest'
import { BXRestFrame } from './frame'
import { BXRestFrameError } from './transport'

// Тесты гоняются в environment: 'node' — подменяем window минимальной
// заглушкой: имя фрейма, query, родительское окно портала и подписка на message.
const PORTAL_ORIGIN = 'https://portal.bitrix24.ru'
const APP_SID = '9c33468728e1d2c8c97562475edfd96'

type Listener = (event: MessageEvent) => void
type PostMessage = Mock<(message: unknown, targetOrigin: string) => void>

class FakeWindow {
  name = ''
  location = { search: '' }
  parent: { postMessage: PostMessage } | FakeWindow = { postMessage: vi.fn<(message: unknown, targetOrigin: string) => void>() }
  readonly listeners = new Set<Listener>()

  addEventListener(type: string, listener: Listener) {
    if (type === 'message') {
      this.listeners.add(listener)
    }
  }

  removeEventListener(type: string, listener: Listener) {
    this.listeners.delete(listener)
  }

  dispatch(event: { source: unknown, origin: string, data: unknown }) {
    for (const listener of [...this.listeners]) {
      listener(event as MessageEvent)
    }
  }
}

const INIT_DATA = {
  DOMAIN: 'portal.bitrix24.ru',
  PROTOCOL: 1,
  PATH: '/rest',
  LANG: 'ru',
  AUTH_ID: 'init-access',
  REFRESH_ID: 'init-refresh',
  AUTH_EXPIRES: 3600,
  MEMBER_ID: 'member-42',
  IS_ADMIN: false,
  FIRST_RUN: false,
  INSTALL: false,
  USER_OPTIONS: { theme: 'dark' },
  APP_OPTIONS: [],
  PLACEMENT: 'CRM_DEAL_DETAIL_TAB',
  PLACEMENT_OPTIONS: { ID: '7' },
}
const REFRESHED = { AUTH_ID: 'new-access', REFRESH_ID: 'new-refresh', AUTH_EXPIRES: '3600' }

// Нет ответа портала
const SILENT = Symbol('silent')
type Reply = unknown | ((params: unknown) => unknown)

interface Sent { command: string, params: string | unknown, callbackId: string, appSid: string, targetOrigin: string }

let win: FakeWindow
let postMessage: PostMessage
let replies: Record<string, Reply>

// Разбор отправленного сообщения — так же, как его разбирает applayout.js: с конца
const parseSent = ([message, targetOrigin]: [unknown, string]): Sent => {
  if (typeof message !== 'string') {
    const { method, params, callback, appSid } = message as { method: string, params: unknown, callback: string, appSid: string }
    return { command: method, params, callbackId: callback, appSid, targetOrigin }
  }
  const parts = message.split(':')
  return {
    command: parts[0],
    params: parts.slice(1, -2).join(':'),
    callbackId: parts[parts.length - 2],
    appSid: parts[parts.length - 1],
    targetOrigin,
  }
}
const sent = (): Sent[] => postMessage.mock.calls.map(parseSent)
const lastSent = (): Sent => sent()[sent().length - 1]

const answer = (callbackId: string, payload: unknown, from: { source?: unknown, origin?: string } = {}) => win.dispatch({
  source: 'source' in from ? from.source : win.parent,
  origin: from.origin ?? PORTAL_ORIGIN,
  data: `${callbackId}:${payload === undefined ? '' : typeof payload === 'string' ? payload : JSON.stringify(payload)}`,
})

const failureOf = (promise: Promise<unknown>) =>
  promise.then(
    value => { throw new Error(`expected an error, got ${JSON.stringify(value)}`) },
    (error: BXRestFrameError) => error
  )

beforeEach(() => {
  win = new FakeWindow()
  win.name = `portal.bitrix24.ru|1|${APP_SID}`
  postMessage = (win.parent as { postMessage: PostMessage }).postMessage
  // Как applayout.js: на первый getInitData за загрузку страницы — FIRST_RUN
  // как есть, дальше — false
  let initAnswers = 0
  replies = {
    getInitData: () => initAnswers++ === 0 ? INIT_DATA : { ...INIT_DATA, FIRST_RUN: false },
    refreshAuth: REFRESHED,
  }
  // Портал отвечает только при непустом callbackId — строкой 'callbackId:JSON' от своего окна
  postMessage.mockImplementation((message, targetOrigin) => {
    const { command, params, callbackId } = parseSent([message, targetOrigin])
    const reply = replies[command]
    if (!callbackId || reply === undefined) {
      return
    }
    const parsedParams = typeof params === 'string' && params ? JSON.parse(params) : params
    const value = typeof reply === 'function' ? reply(parsedParams) : reply
    if (value !== SILENT) {
      void Promise.resolve().then(() => answer(callbackId, value))
    }
  })
  vi.stubGlobal('window', win)
})

afterEach(() => {
  vi.unstubAllGlobals()
  vi.useRealTimers()
  vi.restoreAllMocks()
})

describe('transport: where the portal is', () => {
  it('takes DOMAIN|PROTOCOL|APP_SID from window.name and sends to the portal origin only', async () => {
    await new BXRestFrame().init()

    expect(sent()).toEqual([
      { command: 'getInitData', params: '', callbackId: expect.stringMatching(/^[0-9a-f]{32}$/), appSid: APP_SID, targetOrigin: PORTAL_ORIGIN },
    ])
  })

  it('PROTOCOL 0 means http; the default port is cut off the domain', async () => {
    win.name = `portal.example.com:80|0|${APP_SID}`
    postMessage.mockImplementation((message, targetOrigin) => {
      const { callbackId } = parseSent([message, targetOrigin])
      void Promise.resolve().then(() => answer(callbackId, INIT_DATA, { origin: 'http://portal.example.com' }))
    })

    const init = await new BXRestFrame().init()

    expect(lastSent().targetOrigin).toBe('http://portal.example.com')
    expect(init.domain).toBe('portal.example.com')
  })

  it('without frame parameters in window.name, takes DOMAIN/PROTOCOL/APP_SID from the URL query', async () => {
    win.name = 'some-unrelated-window-name'
    win.location.search = `?DOMAIN=portal.bitrix24.ru&PROTOCOL=1&LANG=ru&APP_SID=${APP_SID}`

    await new BXRestFrame().init()

    expect(lastSent()).toMatchObject({ appSid: APP_SID, targetOrigin: PORTAL_ORIGIN })
  })

  it('window.name wins over the URL query', async () => {
    win.location.search = '?DOMAIN=other.bitrix24.ru&PROTOCOL=1&APP_SID=other'

    await new BXRestFrame().init()

    expect(lastSent()).toMatchObject({ appSid: APP_SID, targetOrigin: PORTAL_ORIGIN })
  })

  it('without frame parameters fails right away with NOT_IN_FRAME, nothing is sent', async () => {
    win.name = ''
    const frame = new BXRestFrame()

    expect((await failureOf(frame.init())).code).toBe('NOT_IN_FRAME')
    expect((await failureOf(frame.reloadWindow())).code).toBe('NOT_IN_FRAME')
    expect(() => frame.placement.bindEvent('onChange', () => undefined)).toThrow(BXRestFrameError)
    expect(postMessage).not.toHaveBeenCalled()
  })

  it('in a top-level window (no parent) fails right away with NOT_IN_FRAME', async () => {
    win.parent = win

    expect((await failureOf(new BXRestFrame().refreshAuth())).code).toBe('NOT_IN_FRAME')
    expect(postMessage).not.toHaveBeenCalled()
  })

  it('a DOMAIN that is not a bare host is not trusted', async () => {
    for (const name of [`portal.bitrix24.ru/path|1|${APP_SID}`, `user@portal.bitrix24.ru|1|${APP_SID}`, 'portal.bitrix24.ru|1|']) {
      win.name = name

      expect((await failureOf(new BXRestFrame().getAuth())).code).toBe('NOT_IN_FRAME')
    }
    expect(postMessage).not.toHaveBeenCalled()
  })

  it('the constructor does not throw without window (SSR)', async () => {
    vi.stubGlobal('window', undefined)

    const frame = new BXRestFrame()
    vi.stubGlobal('window', win)

    expect((await failureOf(frame.getAuth())).code).toBe('NOT_IN_FRAME')
  })
})

describe('transport: message format', () => {
  it('a command with ":" in its name goes as an object, like in BX24.js', async () => {
    replies['custom:cmd'] = { done: true }

    await expect(new BXRestFrame().placement.call('custom:cmd', { a: 1 })).resolves.toEqual({ done: true })

    expect(postMessage.mock.calls[0][0]).toEqual({ method: 'custom:cmd', params: { a: 1 }, callback: expect.any(String), appSid: APP_SID })
  })

  it('params with ":" inside survive: the portal parses the string from the end', async () => {
    replies['setTitle'] = (params: unknown) => params

    await expect(new BXRestFrame().setTitle('Deals: week')).resolves.toEqual({ title: 'Deals: week' })
  })

  it('an empty answer ("callbackId:") resolves with undefined', async () => {
    replies['openApplication'] = undefined
    const opened = new BXRestFrame().openApplication()
    answer(lastSent().callbackId, undefined)

    await expect(opened).resolves.toBeUndefined()
  })

  it('an answer that is not JSON fails with BAD_RESPONSE, without the payload in the message', async () => {
    replies['getInitData'] = 'not json init-access'

    const err = await failureOf(new BXRestFrame().init())

    expect(err.code).toBe('BAD_RESPONSE')
    expect(err.message).not.toContain('init-access')
  })
})

describe('transport: who it listens to', () => {
  beforeEach(() => {
    replies = {}
    vi.useFakeTimers()
  })

  it('ignores answers from another origin, another window and with another callback id', async () => {
    const result = new BXRestFrame().getAuth()
    const { callbackId } = lastSent()
    const forged = { ...INIT_DATA, AUTH_ID: 'forged' }

    answer(callbackId, forged, { origin: 'https://evil.example.com' })
    answer(callbackId, forged, { origin: 'https://portal.bitrix24.ru.evil.example.com' })
    answer(callbackId, forged, { source: {} })
    answer(callbackId, forged, { source: null })
    answer('another', forged)
    win.dispatch({ source: win.parent, origin: PORTAL_ORIGIN, data: { not: 'a string' } })
    answer(callbackId, INIT_DATA)

    await expect(result).resolves.toMatchObject({ access_token: 'init-access' })
  })

  it('no answer within the timeout fails with TIMEOUT and removes the listener', async () => {
    const result = failureOf(new BXRestFrame({ timeout: 5000 }).init())

    await vi.advanceTimersByTimeAsync(4999)
    expect(win.listeners.size).toBe(1)
    await vi.advanceTimersByTimeAsync(1)

    const err = await result
    expect(err).toBeInstanceOf(BXRestFrameError)
    expect(err.code).toBe('TIMEOUT')
    expect(err.message).toContain('5000 ms')
    expect(win.listeners.size).toBe(0)
  })

  it('the default timeout is 10 seconds', async () => {
    const result = failureOf(new BXRestFrame().getAuth())

    await vi.advanceTimersByTimeAsync(10000)

    expect((await result).code).toBe('TIMEOUT')
  })
})

describe('BXRestFrame.init()', () => {
  it('maps the init data and leaves the tokens out', async () => {
    const init = await new BXRestFrame().init()

    expect(init).toEqual({
      domain: 'portal.bitrix24.ru',
      lang: 'ru',
      path: '/rest',
      https: true,
      memberId: 'member-42',
      isAdmin: false,
      install: false,
      firstRun: false,
      placement: 'CRM_DEAL_DETAIL_TAB',
      placementOptions: { ID: '7' },
      userOptions: { theme: 'dark' },
      appOptions: {},
    })
    expect(JSON.stringify(init)).not.toContain('init-access')
    expect(JSON.stringify(init)).not.toContain('init-refresh')
  })

  it('asks the portal once, also for concurrent calls', async () => {
    const frame = new BXRestFrame()

    await Promise.all([frame.init(), frame.init()])
    await frame.init()

    expect(sent().map(m => m.command)).toEqual(['getInitData'])
  })

  it('keeps firstRun of the first answer, even when getAuth() asked first', async () => {
    replies['getInitData'] = (() => {
      let answers = 0
      return () => ({ ...INIT_DATA, FIRST_RUN: answers++ === 0 })
    })()
    const frame = new BXRestFrame()

    await frame.getAuth()
    await frame.getAuth()

    expect((await frame.init()).firstRun).toBe(true)
  })
})

describe('BXRestFrame auth', () => {
  it('getAuth() returns BX24.getAuth()-like data, expires_in in milliseconds', async () => {
    const before = Date.now()
    const auth = await new BXRestFrame().getAuth()
    const after = Date.now()

    expect(auth).toMatchObject({
      access_token: 'init-access',
      refresh_token: 'init-refresh',
      domain: 'portal.bitrix24.ru',
      member_id: 'member-42',
    })
    // AUTH_EXPIRES — секунды; expires_in — момент истечения в миллисекундах
    expect(auth.expires_in).toBeGreaterThanOrEqual(before + 3600 * 1000)
    expect(auth.expires_in).toBeLessThanOrEqual(after + 3600 * 1000)
  })

  it('every getAuth() asks the portal again — tokens are not kept', async () => {
    const frame = new BXRestFrame()

    await frame.getAuth()
    await frame.getAuth()

    expect(sent().map(m => m.command)).toEqual(['getInitData', 'getInitData'])
  })

  it('refreshAuth() sends refreshAuth in the BX24.js format, member_id comes from getInitData once', async () => {
    const frame = new BXRestFrame()

    const auth = await frame.refreshAuth()
    await frame.refreshAuth()

    expect(sent().map(({ command, params }) => [command, params])).toEqual([
      ['getInitData', ''],
      ['refreshAuth', '{}'],
      ['refreshAuth', '{}'],
    ])
    expect(auth).toMatchObject({ access_token: 'new-access', refresh_token: 'new-refresh', member_id: 'member-42' })
  })

  it('a failed getInitData is not cached: the next refreshAuth asks again', async () => {
    replies['getInitData'] = 'broken'
    const frame = new BXRestFrame()

    await failureOf(frame.refreshAuth())
    replies['getInitData'] = INIT_DATA
    await expect(frame.refreshAuth()).resolves.toMatchObject({ member_id: 'member-42' })

    expect(sent().map(m => m.command)).toEqual(['getInitData', 'getInitData', 'refreshAuth'])
  })

  it('an answer without a token fails with NO_AUTH, without a usable AUTH_EXPIRES — with BAD_RESPONSE', async () => {
    replies['getInitData'] = { ...INIT_DATA, AUTH_ID: '' }
    expect((await failureOf(new BXRestFrame().getAuth())).code).toBe('NO_AUTH')

    replies['getInitData'] = { ...INIT_DATA, AUTH_EXPIRES: undefined }
    expect((await failureOf(new BXRestFrame().getAuth())).code).toBe('BAD_RESPONSE')

    replies['getInitData'] = '"init-access"'
    expect((await failureOf(new BXRestFrame().getAuth())).code).toBe('BAD_RESPONSE')
  })

  it('nothing goes to the console, on success and on failure', async () => {
    const spies = (['log', 'info', 'warn', 'error', 'debug'] as const).map(name => vi.spyOn(console, name))

    const frame = new BXRestFrame()
    await frame.getAuth()
    await frame.refreshAuth()
    replies['refreshAuth'] = 'broken new-access'
    await failureOf(frame.refreshAuth())

    for (const spy of spies) {
      expect(spy).not.toHaveBeenCalled()
    }
  })
})

describe('BXRestFrame window commands', () => {
  beforeEach(() => {
    for (const command of ['resizeWindow', 'setTitle', 'setScroll']) {
      replies[command] = (params: unknown) => params
    }
  })

  it('resizeWindow() sends integer sizes and resolves with the portal answer', async () => {
    replies['resizeWindow'] = { width: 980, height: 700 }

    await expect(new BXRestFrame().resizeWindow('980px', 700)).resolves.toEqual({ width: 980, height: 700 })
    expect(lastSent()).toMatchObject({ command: 'resizeWindow', params: '{"width":980,"height":700}' })
  })

  it('resizeWindow() with a wrong size fails with TypeError, nothing is sent', async () => {
    await expect(new BXRestFrame().resizeWindow(0, 100)).rejects.toThrow(TypeError)
    await expect(new BXRestFrame().resizeWindow('abc', 100)).rejects.toThrow(TypeError)
    expect(postMessage).not.toHaveBeenCalled()
  })

  it('fitWindow() asks for 100% width and the content height', async () => {
    vi.stubGlobal('document', { documentElement: { scrollHeight: 1579, offsetHeight: 1200 } })

    await new BXRestFrame().fitWindow()

    expect(lastSent()).toMatchObject({ command: 'resizeWindow', params: '{"width":"100%","height":1579}' })
  })

  it('scrollParentWindow() sends setScroll, a wrong value fails with TypeError', async () => {
    await expect(new BXRestFrame().scrollParentWindow('120')).resolves.toEqual({ scroll: 120 })
    expect(lastSent()).toMatchObject({ command: 'setScroll', params: '{"scroll":120}' })
    await expect(new BXRestFrame().scrollParentWindow('top')).rejects.toThrow(TypeError)
  })

  it('without a portal answer the window commands resolve with undefined, not with an error', async () => {
    vi.useFakeTimers()
    replies['setTitle'] = SILENT

    const result = new BXRestFrame({ timeout: 1000 }).setTitle('Report')
    await vi.advanceTimersByTimeAsync(1000)

    await expect(result).resolves.toBeUndefined()
    expect(win.listeners.size).toBe(0)
  })

  it('reloadWindow() is sent without a callback: the portal does not answer it', async () => {
    await new BXRestFrame().reloadWindow()

    expect(lastSent()).toMatchObject({ command: 'reloadWindow', params: '{}', callbackId: '' })
    expect(win.listeners.size).toBe(0)
  })
})

describe('BXRestFrame dialogs', () => {
  const USER = { id: '12', name: 'Anna Schmidt', sub: true, sup: false, position: 'Sales Manager', photo: '/upload/a.jpg', url: '' }

  beforeEach(() => {
    replies = { ...replies, selectUser: SILENT, selectAccess: SILENT, selectCRM: SILENT }
  })

  it('selectUser() / selectUsers() send the BX24.js params and resolve with the selection', async () => {
    const frame = new BXRestFrame()

    const one = frame.selectUser()
    expect(lastSent()).toMatchObject({ command: 'selectUser', params: '{"title":"","mult":false}' })
    answer(lastSent().callbackId, USER)
    await expect(one).resolves.toEqual(USER)

    const many = frame.selectUsers({ title: 'Team' })
    expect(lastSent()).toMatchObject({ command: 'selectUser', params: '{"title":"Team","mult":true}' })
    answer(lastSent().callbackId, [USER])
    await expect(many).resolves.toEqual([USER])
  })

  it('waits for the user without a timeout', async () => {
    vi.useFakeTimers()
    const selected = new BXRestFrame({ timeout: 1000 }).selectUser()

    await vi.advanceTimersByTimeAsync(60 * 60 * 1000)
    answer(lastSent().callbackId, USER)

    await expect(selected).resolves.toEqual(USER)
  })

  it('signal cancels waiting with CANCELLED and removes the listener', async () => {
    const controller = new AbortController()
    const selected = failureOf(new BXRestFrame().selectAccess({ signal: controller.signal }))

    controller.abort()

    expect((await selected).code).toBe('CANCELLED')
    expect(win.listeners.size).toBe(0)
  })

  it('an already aborted signal cancels right away', async () => {
    const controller = new AbortController()
    controller.abort()

    expect((await failureOf(new BXRestFrame().selectCRM({ signal: controller.signal }))).code).toBe('CANCELLED')
  })

  it('a new selectUsers() cancels a pending selectUser(): the portal keeps one callback for both', async () => {
    const frame = new BXRestFrame()

    const first = failureOf(frame.selectUser())
    const second = frame.selectUsers()
    answer(lastSent().callbackId, [USER])

    expect((await first).code).toBe('CANCELLED')
    await expect(second).resolves.toEqual([USER])
  })

  it('different dialogs do not cancel each other', async () => {
    const frame = new BXRestFrame()

    const user = frame.selectUser()
    const userCallback = lastSent().callbackId
    const access = frame.selectAccess({ value: ['AU'] })
    expect(lastSent()).toMatchObject({ command: 'selectAccess', params: '{"value":["AU"]}' })
    answer(lastSent().callbackId, [{ provider: 'group', id: 'AU', name: 'All users' }])
    answer(userCallback, USER)

    await expect(user).resolves.toEqual(USER)
    await expect(access).resolves.toEqual([{ provider: 'group', id: 'AU', name: 'All users' }])
  })

  it('selectCRM() sends the options as BX24.js does', async () => {
    const selected = new BXRestFrame().selectCRM({ entityType: ['deal'], multiple: true, value: { deal: [1] } })

    expect(lastSent()).toMatchObject({ command: 'selectCRM', params: '{"entityType":["deal"],"multiple":true,"value":{"deal":[1]}}' })
    answer(lastSent().callbackId, { deal: { 0: { id: 'D_1', type: 'deal', place: 'deal', title: 'Deal', desc: '' } } })
    await expect(selected).resolves.toMatchObject({ deal: { 0: { id: 'D_1' } } })
  })
})

describe('BXRestFrame navigation and messenger', () => {
  it('openApplication() puts the slider settings into bx24_* keys and resolves when the slider is closed', async () => {
    replies['openApplication'] = SILENT
    vi.useFakeTimers()

    const opened = new BXRestFrame({ timeout: 1000 }).openApplication({ deal: 7 }, { width: 900, title: 'Deal' })
    expect(JSON.parse(lastSent().params as string)).toEqual({ deal: 7, bx24_width: 900, bx24_title: 'Deal' })
    await vi.advanceTimersByTimeAsync(60 * 1000)
    answer(lastSent().callbackId, undefined)

    await expect(opened).resolves.toBeUndefined()
  })

  it('openPath() resolves with the portal result', async () => {
    replies['openPath'] = { result: 'error', errorCode: 'PATH_NOT_AVAILABLE' }

    await expect(new BXRestFrame().openPath('/bad/')).resolves.toEqual({ result: 'error', errorCode: 'PATH_NOT_AVAILABLE' })
    expect(lastSent()).toMatchObject({ command: 'openPath', params: '{"path":"/bad/"}' })
  })

  it('closeApplication() and the messenger commands are sent without a callback', async () => {
    const frame = new BXRestFrame()

    await frame.closeApplication()
    await frame.im.callTo(5, true)
    await frame.im.phoneTo('+71234567890')
    await frame.im.openMessenger('chat12')
    await frame.im.openHistory(5)

    expect(sent().map(({ command, params, callbackId }) => [command, params, callbackId])).toEqual([
      ['closeApplication', '', ''],
      ['imCallTo', '{"userId":5,"video":true}', ''],
      ['imPhoneTo', '{"phone":"+71234567890"}', ''],
      ['imOpenMessenger', '{"dialogId":"chat12"}', ''],
      ['imOpenHistory', '{"dialogId":5}', ''],
    ])
    expect(win.listeners.size).toBe(0)
  })
})

describe('BXRestFrame placement', () => {
  it('info() comes from the init data', async () => {
    await expect(new BXRestFrame().placement.info()).resolves.toEqual({ placement: 'CRM_DEAL_DETAIL_TAB', options: { ID: '7' } })
  })

  it('getInterface() resolves with the commands and events of the placement', async () => {
    replies['getInterface'] = { command: ['reloadData'], event: ['Tab:onChange'] }

    await expect(new BXRestFrame().placement.getInterface()).resolves.toEqual({ command: ['reloadData'], event: ['Tab:onChange'] })
    expect(lastSent()).toMatchObject({ command: 'getInterface', params: '' })
  })

  it('call() resolves with the answer, or with undefined when the portal does not answer', async () => {
    replies['reloadData'] = { ok: 1 }
    replies['silentCommand'] = SILENT
    vi.useFakeTimers()
    const frame = new BXRestFrame({ timeout: 1000 })

    await expect(frame.placement.call('reloadData', {})).resolves.toEqual({ ok: 1 })
    const silent = frame.placement.call('silentCommand')
    await vi.advanceTimersByTimeAsync(1000)
    await expect(silent).resolves.toBeUndefined()
  })

  it('bindEvent() calls the handler on every event until unsubscribed', async () => {
    const handler = vi.fn()

    const unsubscribe = new BXRestFrame().placement.bindEvent('Tab:onChange', handler)
    const { command, params, callbackId } = lastSent()
    answer(callbackId, { value: 1 })
    answer(callbackId, { value: 2 })
    answer(callbackId, { value: 3 }, { origin: 'https://evil.example.com' })
    unsubscribe()
    answer(callbackId, { value: 4 })

    expect([command, params]).toEqual(['placementBindEvent', '{"event":"Tab:onChange"}'])
    expect(handler.mock.calls).toEqual([[{ value: 1 }], [{ value: 2 }]])
    expect(win.listeners.size).toBe(0)
  })
})

describe('BXRestFrame options', () => {
  it('userOption: get reads the init data, set sends setUserOption and updates get', async () => {
    replies['setUserOption'] = (params: unknown) => params
    const frame = new BXRestFrame()

    await expect(frame.userOption.get('theme')).resolves.toBe('dark')
    await frame.userOption.set('theme', 'light')

    expect(lastSent()).toMatchObject({ command: 'setUserOption', params: '{"name":"theme","value":"light"}' })
    await expect(frame.userOption.get('theme')).resolves.toBe('light')
  })

  it('appOption.set: not an admin — ACCESS_DENIED and nothing is sent', async () => {
    const frame = new BXRestFrame()

    expect((await failureOf(frame.appOption.set('mode', 'full'))).code).toBe('ACCESS_DENIED')
    expect(sent().map(m => m.command)).toEqual(['getInitData'])
  })

  it('appOption.set: an admin sends setAppOption and gets the saved options', async () => {
    replies['getInitData'] = { ...INIT_DATA, IS_ADMIN: true }
    replies['setAppOption'] = { mode: 'full' }
    const frame = new BXRestFrame()

    await expect(frame.appOption.set('mode', 'full')).resolves.toEqual({ mode: 'full' })
    expect(lastSent()).toMatchObject({ command: 'setAppOption', params: '{"name":"mode","value":"full"}' })
    await expect(frame.appOption.get('mode')).resolves.toBe('full')
  })
})

describe('BXRestFrame installation', () => {
  it('installFinish() sends setInstallFinish only on the installer page', async () => {
    await new BXRestFrame().installFinish()
    expect(sent().map(m => m.command)).toEqual(['getInitData'])

    postMessage.mockClear()
    replies['getInitData'] = { ...INIT_DATA, INSTALL: true }
    await new BXRestFrame().installFinish()
    expect(sent().map(({ command, params, callbackId }) => [command, params, callbackId])).toEqual([
      ['getInitData', '', expect.any(String)],
      ['setInstallFinish', '{}', ''],
    ])
  })

  it('firstRunFinish() sends setInstall once, and only on the first run', async () => {
    replies['getInitData'] = { ...INIT_DATA, FIRST_RUN: true }
    replies['setInstall'] = (params: unknown) => params
    const frame = new BXRestFrame()

    await frame.firstRunFinish()
    await frame.firstRunFinish()

    expect(sent().map(({ command, params }) => [command, params])).toEqual([
      ['getInitData', ''],
      ['setInstall', '{"install":true}'],
    ])
    expect((await frame.init()).firstRun).toBe(false)
  })

  it('firstRunFinish() does nothing when it is not the first run', async () => {
    await new BXRestFrame().firstRunFinish()

    expect(sent().map(m => m.command)).toEqual(['getInitData'])
  })
})
