import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest'
import { createServer, Server } from 'node:http'
import { AddressInfo } from 'node:net'
import { firstValueFrom } from 'rxjs'
import { HttpBXServices } from '../../../services/http/HttpBX'
import { BXRestNavvyElapsedItem } from '../elapseditem'
import { BXRestNavvy } from '../../../rest/navvy'

describe('BXRestNavvyOperationElapsedItem: permission errors', () => {
  it('without a current user every checked method fails with "No permission to read the task"', async () => {
    // Портал подменяется своим транспортом: user.current не вернул пользователя
    const bx = new BXRestNavvy({
      auth: { source: () => 'T', key: 'auth' },
      urls: { source: 'string', key: 'https://portal.test', additional_part: 'rest' },
      middleware: [async () => ({ result: null })],
    })
    const operation = bx.task.elapsedItem.operation
    const messageOf = (p: Promise<unknown>) => p.then(() => 'no error', (e: Error) => e.message)

    const messages = await Promise.all([
      messageOf(firstValueFrom(operation.add({ TASKID: 1, FIELDS: { SECONDS: 60 } } as never))),
      messageOf(firstValueFrom(operation.update({ TASKID: 1, ITEMID: 2, ARFIELDS: { SECONDS: 60 } } as never))),
      messageOf(firstValueFrom(operation.del({ TASKID: 1, ITEMID: 2 }))),
      messageOf(firstValueFrom(operation.isActionAllowed({ TASKID: 1, ITEMID: 2, ACTIONID: 2 }))),
    ])

    expect(messages).toEqual(Array(4).fill('No permission to read the task'))
  })
})

describe('BXRestNavvyOperationElapsedItem.getListByIDTask', () => {
  afterEach(() => vi.restoreAllMocks())

  it('empty list of tasks -> [] without a request, not EmptyError', async () => {
    const branch = vi.spyOn(HttpBXServices.prototype, 'branch')
    const operation = new BXRestNavvyElapsedItem().operation

    await expect(firstValueFrom(operation.getListByIDTask([]))).resolves.toEqual([])
    expect(branch).not.toHaveBeenCalled()
  })
})

describe('BXRestNavvyOperationElapsedItem.getListByIDTask: pages', () => {
  // Локальный «портал»: task.elapseditem.getlist отдаёт не больше 50 записей на страницу,
  // как обещает документация, и сообщает total в result_total ответа batch.
  const records: Record<number, number> = {}
  const batches: string[][] = []
  let server: Server
  let bx: BXRestNavvy

  const item = (task: number, n: number) => ({
    ID: String(task * 1000 + n), TASK_ID: String(task), USER_ID: '1', MINUTES: '1', SECONDS: '60', SOURCE: '1',
    COMMENT_TEXT: '', CREATED_DATE: '2026-11-01T10:00:00+03:00', DATE_START: '2026-11-01T09:59:00+03:00', DATE_STOP: '2026-11-01T10:00:00+03:00',
  })

  beforeAll(async () => {
    server = createServer((req, res) => {
      let raw = ''
      req.on('data', chunk => (raw += chunk))
      req.on('end', () => {
        const cmd = (JSON.parse(raw) as { cmd: Record<string, string> }).cmd
        batches.push(Object.values(cmd))
        const result: Record<string, unknown> = {}
        const total: Record<string, number> = {}
        for (const [key, command] of Object.entries(cmd)) {
          const query = new URLSearchParams(command.split('?')[1])
          const task = Number(query.get('TASKID'))
          const size = Math.min(Number(query.get('PARAMS[NAV_PARAMS][nPageSize]')), 50)
          const page = Number(query.get('PARAMS[NAV_PARAMS][iNumPage]'))
          const from = (page - 1) * size
          result[key] = Array.from({ length: Math.max(Math.min(size, (records[task] ?? 0) - from), 0) }, (_, i) => item(task, from + i + 1))
          total[key] = records[task] ?? 0
        }
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ result: { result, result_error: [], result_total: total, result_next: {} } }))
      })
    })
    await new Promise<void>(resolve => server.listen(0, '127.0.0.1', () => resolve()))
    const { port } = server.address() as AddressInfo
    bx = new BXRestNavvy({
      auth: { source: () => 'T', key: 'auth' },
      urls: { source: 'string', key: `http://127.0.0.1:${port}`, additional_part: 'rest' },
    })
  })

  afterAll(() => {
    server.close()
  })

  afterEach(() => {
    batches.length = 0
    for (const task of Object.keys(records)) delete records[Number(task)]
  })

  const ids = (list: { ID: number, TASK_ID: number }[] | undefined) => list?.map(row => row.ID)
  const expected = (task: number, count: number) => Array.from({ length: count }, (_, i) => task * 1000 + i + 1)

  it('returns all records of a task with more than 50 of them, task by task in order', async () => {
    Object.assign(records, { 1: 120, 2: 3, 3: 0, 4: 50 })

    const result = await firstValueFrom(bx.task.elapsedItem.operation.getListByIDTask([1, 2, 3, 4]))

    expect(ids(result)).toEqual([...expected(1, 120), ...expected(2, 3), ...expected(4, 50)])
    expect(result?.[0]).toMatchObject({ ID: 1001, TASK_ID: 1 })
  })

  it('asks for 50 records per page and loads further pages only for tasks that have them', async () => {
    Object.assign(records, { 1: 120, 2: 3, 4: 50 })

    await firstValueFrom(bx.task.elapsedItem.operation.getListByIDTask([1, 2, 4]))

    const pages = batches.map(batch => batch.map(command => {
      const query = new URLSearchParams(command.split('?')[1])
      expect(query.get('PARAMS[NAV_PARAMS][nPageSize]')).toBe('50')
      return `${query.get('TASKID')}:${query.get('PARAMS[NAV_PARAMS][iNumPage]')}`
    }))
    expect(pages).toEqual([['1:1', '2:1', '4:1'], ['1:2', '1:3']])
  })

  it('without tasks over 50 records makes one batch request, as before', async () => {
    Object.assign(records, { 1: 10, 2: 50 })

    await firstValueFrom(bx.task.elapsedItem.operation.getListByIDTask([1, 2]))

    expect(batches).toHaveLength(1)
  })

  it('more than 50 tasks are split into several batch requests', async () => {
    const tasks = Array.from({ length: 60 }, (_, i) => i + 1)
    for (const task of tasks) records[task] = 1

    const result = await firstValueFrom(bx.task.elapsedItem.operation.getListByIDTask(tasks))

    expect(ids(result)).toEqual(tasks.map(task => task * 1000 + 1))
    expect(batches.map(batch => batch.length)).toEqual([50, 10])
  })
})
