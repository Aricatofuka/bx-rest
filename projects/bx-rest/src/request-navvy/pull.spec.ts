import { describe, expect, it } from 'vitest'
import { firstValueFrom } from 'rxjs'
import { BXRestNavvy } from '../rest/navvy'
import { BXRestRequestConfig } from '../services/http/transport'
import { BXRestMapPullApplicationConfig } from '../map/pull/application/config'
import { BXRestMapPull } from '../map/pull'
import { iBXRestPullApplicationConfigGetHttp, iBXRestPullConfigGetHttp } from '../typification/rest/pull'

// Пример ответа pull.application.config.get из документации:
// https://apidocs.bitrix24.com/settings/interactivity/pull-application-config-get.html
const applicationConfig = (): iBXRestPullApplicationConfigGetHttp => ({
  server: {
    version: 4,
    server_enabled: true,
    mode: 'personal',
    hostname: 'your-account.bitrix24.com',
    long_polling: 'https://rtc-1.bitrix24.com/sub2/',
    long_pooling_secure: 'https://rtc-1.bitrix24.com/sub2/',
    websocket_enabled: true,
    websocket: 'wss://rtc-1.bitrix24.com/subws2/',
    websocket_secure: 'wss://rtc-1.bitrix24.com/subws2/',
    publish_enabled: true,
    publish: 'https://rtc-1.bitrix24.com/rest/',
    publish_secure: 'https://rtc-1.bitrix24.com/rest/',
    config_timestamp: 1774886062,
  },
  api: { revision_web: 19, revision_mobile: 3 },
  channels: {
    shared: { id: 'shared-id', start: '2026-03-31T17:05:18+02:00', end: '2026-04-01T05:05:23+02:00', type: 'shared' },
    private: { id: 'private-id', public_id: 'private-public', start: '2026-03-31T17:05:18+02:00', end: '2026-04-01T05:05:23+02:00', type: 'private' },
  },
  exp: 1775052318,
  publicChannels: {
    577: { user_id: 577, public_id: 'public-577', signature: 'sig', start: '2026-03-31T10:06:39+02:00', end: '2026-03-31T22:06:44+02:00' },
  },
})

/** Клиент, у которого вместо портала — свой транспорт: запоминает запросы и отдаёт `answer`. */
function client(answer: unknown) {
  const requests: BXRestRequestConfig[] = []
  const bx = new BXRestNavvy({
    auth: { source: () => 'T', key: 'auth' },
    urls: { source: 'string', key: 'https://portal.test', additional_part: 'rest' },
    middleware: [async config => { requests.push(config); return { result: answer } as never }],
  })
  return { bx, requests }
}

describe('pull: REST names and parameters', () => {
  it('pull.application.event.add sends COMMAND, PARAMS, MODULE_ID and USER_ID as given', async () => {
    const { bx, requests } = client(true)
    const param = { COMMAND: 'grid:update', PARAMS: { grid_id: 15 }, MODULE_ID: 'my_app', USER_ID: '577' }

    expect(await firstValueFrom(bx.pull.application.event.add(param).res())).toBe(true)
    expect(requests[0].url).toBe('https://portal.test/rest/pull.application.event.add')
    expect(requests[0].data).toMatchObject(param)
  })

  it('pull.application.push.add sends USER_ID, TEXT and AVATAR', async () => {
    const { bx, requests } = client(true)
    const param = { USER_ID: [1, 2], TEXT: 'Done', AVATAR: 'https://example.com/a.png' }

    expect(await firstValueFrom(bx.pull.application.push.add(param).res())).toBe(true)
    expect(requests[0].url).toBe('https://portal.test/rest/pull.application.push.add')
    expect(requests[0].data).toMatchObject(param)
  })

  it('pull.channel.public.get exposes its own REST name in url.get', async () => {
    const { bx, requests } = client({ user_id: 1, public_id: 'p', signature: 's', start: '2026-03-31T10:06:39+02:00', end: '2026-03-31T22:06:44+02:00' })

    expect(bx.pull.channel.public.url.get.join('.')).toBe('pull.channel.public.get')
    await firstValueFrom(bx.pull.channel.public.get().res())
    expect(requests[0].url).toBe('https://portal.test/rest/pull.channel.public.get')
  })

  it.each([
    ['pull.application.config.get', (bx: BXRestNavvy) => bx.pull.application.config.get({ CACHE: 'N' })],
    ['pull.config.get', (bx: BXRestNavvy) => bx.pull.config.get({ CACHE: 'N' })],
  ])('%s passes CACHE', async (method, call) => {
    const { bx, requests } = client(applicationConfig())

    await firstValueFrom(call(bx).res())

    expect(requests[0].url).toBe(`https://portal.test/rest/${method}`)
    expect(requests[0].data).toMatchObject({ CACHE: 'N' })
  })

  it('config methods still work without parameters', async () => {
    const { bx } = client(applicationConfig())

    const config = await firstValueFrom(bx.pull.application.config.get().res())

    expect(config?.channels.private.id).toBe('private-id')
  })
})

describe('BXRestMapPullApplicationConfig.get', () => {
  it('turns channel dates into Date and keeps exp, server and api as they are', () => {
    const config = BXRestMapPullApplicationConfig.get(applicationConfig())!

    expect(config.channels.shared.start).toEqual(new Date('2026-03-31T17:05:18+02:00'))
    expect(config.channels.private.end).toEqual(new Date('2026-04-01T05:05:23+02:00'))
    expect(config.publicChannels['577'].start).toEqual(new Date('2026-03-31T10:06:39+02:00'))
    expect(config.publicChannels['577'].signature).toBe('sig')
    expect(config.exp).toBe(1775052318)
    expect(config.server.websocket_secure).toBe('wss://rtc-1.bitrix24.com/subws2/')
    expect(config.api.revision_web).toBe(19)
  })

  it('keeps clientId and jwt', () => {
    const config = BXRestMapPullApplicationConfig.get({ ...applicationConfig(), clientId: 'client', jwt: 'token' })!

    expect(config.clientId).toBe('client')
    expect(config.jwt).toBe('token')
  })

  it('publicChannels: false (server version below 4) becomes an empty object', () => {
    const config = BXRestMapPullApplicationConfig.get({ ...applicationConfig(), publicChannels: false })!

    expect(config.publicChannels).toEqual({})
  })

  it('a response without publicChannels or a channel does not throw', () => {
    const value = applicationConfig() as Partial<iBXRestPullApplicationConfigGetHttp>
    delete value.publicChannels
    delete (value.channels as Partial<iBXRestPullApplicationConfigGetHttp['channels']>).shared

    const config = BXRestMapPullApplicationConfig.get(value as iBXRestPullApplicationConfigGetHttp)!

    expect(config.publicChannels).toEqual({})
    expect(config.channels.shared).toBeUndefined()
    expect(config.channels.private.id).toBe('private-id')
  })

  it('undefined stays undefined', () => {
    expect(BXRestMapPullApplicationConfig.get(undefined)).toBeUndefined()
  })
})

describe('BXRestMapPull.get', () => {
  it('adds serverTime as Date to the application config fields', () => {
    const value: iBXRestPullConfigGetHttp = { ...applicationConfig(), serverTime: '2026-03-31T17:05:18+02:00' }

    const config = BXRestMapPull.get(value)!

    expect(config.serverTime).toEqual(new Date('2026-03-31T17:05:18+02:00'))
    expect(config.channels.shared.start).toEqual(new Date('2026-03-31T17:05:18+02:00'))
  })

  it('a response without serverTime does not throw', () => {
    const value = applicationConfig() as iBXRestPullConfigGetHttp

    expect(BXRestMapPull.get(value)?.serverTime).toBeUndefined()
  })
})
