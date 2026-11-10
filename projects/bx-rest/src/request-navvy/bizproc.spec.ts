import { describe, expect, it } from 'vitest'
import { firstValueFrom } from 'rxjs'
import { BXRestNavvyBizProc } from './bizproc'
import { BXRestNavvy } from '../rest/navvy'
import { BXRestApiError } from '../functions/errors'
import { BXRestMiddleware } from '../services/http/transport'

// Портал подменяется своим транспортом (middleware, который не зовёт next)
function portal(handle: (method: string, data: any, call: number) => unknown) {
  const calls: { method: string, data: any }[] = []
  const transport: BXRestMiddleware = async config => {
    const method = config.url.replace(/^.*\/rest\//, '')
    calls.push({ method, data: config.data })
    return handle(method, config.data, calls.filter(c => c.method === method).length)
  }
  const bx = new BXRestNavvy({
    auth: { source: () => 'T', key: 'auth' },
    urls: { source: 'string', key: 'https://portal.test', additional_part: 'rest' },
    middleware: [transport],
  })
  return { bx, calls, adds: () => calls.filter(c => c.method === 'lists.element.add') }
}
const httpError = (status: number, data: object) =>
  Object.assign(new Error(`HTTP ${status}`), { response: { status, data } })
const taken = { error: 'ERROR_ELEMENT_ALREADY_EXISTS', error_description: 'Element with this code already exists' }
const failureOf = (p: Promise<unknown>) => p.then(() => { throw new Error('expected a failure') }, (e: any) => e)

describe('BXRestNavvyBizProc.startProcFormNewsFeed: ELEMENT_CODE', () => {
  it('sends a bx_rest_ code with 128 random bits and starts the workflows for the new element', async () => {
    const { bx, calls, adds } = portal(method => method === 'lists.element.add' ? { result: 42 } : { result: 'wf' })

    const result = await firstValueFrom(bx.bizProc.startProcFormNewsFeed(5, { NAME: 'Request' }, { P: '1' }, [7, 8]))

    expect(result).toEqual(['wf', 'wf'])
    expect(adds()).toHaveLength(1)
    expect(adds()[0].data).toMatchObject({ IBLOCK_TYPE_ID: 'bitrix_processes', IBLOCK_ID: 5, FIELDS: { NAME: 'Request' } })
    expect(adds()[0].data.ELEMENT_CODE).toMatch(/^bx_rest_[0-9a-f]{32}$/)
    expect(calls.filter(c => c.method === 'bizProc.workflow.start').map(c => c.data.DOCUMENT_ID))
      .toEqual([['lists', 'BizprocDocument', '42'], ['lists', 'BizprocDocument', '42']])
  })

  it('a taken code: retries with a new code', async () => {
    const { bx, adds } = portal((method, data, call) => {
      if (call === 1) throw httpError(400, taken)
      return { result: 42 }
    })

    await expect(firstValueFrom(bx.bizProc.startProcFormNewsFeed(5, { NAME: 'Request' }, {}))).resolves.toBe(true)

    expect(adds()).toHaveLength(2)
    expect(adds()[1].data.ELEMENT_CODE).not.toBe(adds()[0].data.ELEMENT_CODE)
  })

  it('a taken code reported in a 2xx answer is retried too', async () => {
    const { bx, adds } = portal((method, data, call) => call === 1 ? taken : { result: 42 })

    await expect(firstValueFrom(bx.bizProc.startProcFormNewsFeed(5, { NAME: 'Request' }, {}))).resolves.toBe(true)

    expect(adds()).toHaveLength(2)
  })

  it('gives up after 3 attempts with BXRestApiError ERROR_ELEMENT_ALREADY_EXISTS', async () => {
    const { bx, adds } = portal(() => { throw httpError(400, taken) })

    const err = await failureOf(firstValueFrom(bx.bizProc.startProcFormNewsFeed(5, { NAME: 'Request' }, {})))

    expect(err).toBeInstanceOf(BXRestApiError)
    expect(err.error).toBe('ERROR_ELEMENT_ALREADY_EXISTS')
    expect(adds()).toHaveLength(3)
  })

  it('other errors are not retried', async () => {
    const { bx, adds } = portal(() => ({ error: 'ACCESS_DENIED', error_description: 'Access denied' }))

    const err = await failureOf(firstValueFrom(bx.bizProc.startProcFormNewsFeed(5, { NAME: 'Request' }, {})))

    expect(err).toBeInstanceOf(BXRestApiError)
    expect(err.error).toBe('ACCESS_DENIED')
    expect(adds()).toHaveLength(1)
  })
})

describe('BXRestNavvyBizProc.startProcFormNewsFeed', () => {
  const start = (parameters: Record<string, string | Date>) => {
    new BXRestNavvyBizProc().startProcFormNewsFeed(1, parameters, {})
    return parameters['DATE_CREATE']
  }

  it('keeps a DATE_CREATE string given by the caller', () => {
    expect(start({ NAME: 'Request', DATE_CREATE: '01.02.2020' })).toBe('01.02.2020')
  })

  it('keeps a DATE_CREATE date given by the caller', () => {
    const date = new Date(2020, 1, 1)
    expect(start({ NAME: 'Request', DATE_CREATE: date })).toBe(date)
  })

  it.each([
    ['missing', { NAME: 'Request' }],
    ['blank', { NAME: 'Request', DATE_CREATE: '  ' }],
  ])('sets the current date when DATE_CREATE is %s', (_, parameters) => {
    expect(start(parameters)).toBeInstanceOf(Date)
  })
})
