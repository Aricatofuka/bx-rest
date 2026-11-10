import { describe, expect, it } from 'vitest'
import { firstValueFrom } from 'rxjs'
import { BXRestNavvy } from '../../rest/navvy'
import { BXRestMiddleware } from '../../services/http/transport'

describe('BXRestNavvyDiskOperation.getOfCreateRootFolderApp', () => {
  it('says the app storage was not received when the portal returns none', async () => {
    const methods: string[] = []
    // Портал подменяется своим транспортом: хранилища приложения нет
    const transport: BXRestMiddleware = async config => {
      methods.push(config.url.replace(/^.*\/rest\//, ''))
      return { result: null }
    }
    const bx = new BXRestNavvy({
      auth: { source: () => 'T', key: 'auth' },
      urls: { source: 'string', key: 'https://portal.test', additional_part: 'rest' },
      middleware: [transport],
    })

    const err = await firstValueFrom(bx.disk.operation.getOfCreateRootFolderApp('Reports'))
      .then(() => { throw new Error('expected a failure') }, (e: Error) => e)

    expect(err.message).toBe('Не удалось получить хранилище приложения')
    expect(methods.map(m => m.toLowerCase())).toEqual(['disk.storage.getforapp', 'disk.storage.getforapp'])
  })
})
