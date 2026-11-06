import { afterEach, describe, expect, it, vi } from 'vitest'
import { firstValueFrom } from 'rxjs'
import { HttpBXServices } from '../../../services/http/HttpBX'
import { BXRestNavvyElapsedItem } from '../elapseditem'

describe('BXRestNavvyOperationElapsedItem.getListByIDTask', () => {
  afterEach(() => vi.restoreAllMocks())

  it('empty list of tasks -> [] without a request, not EmptyError', async () => {
    const branch = vi.spyOn(HttpBXServices.prototype, 'branch')
    const operation = new BXRestNavvyElapsedItem().operation

    await expect(firstValueFrom(operation.getListByIDTask([]))).resolves.toEqual([])
    expect(branch).not.toHaveBeenCalled()
  })
})
