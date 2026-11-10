import { afterEach, describe, expect, it, vi } from 'vitest'
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
