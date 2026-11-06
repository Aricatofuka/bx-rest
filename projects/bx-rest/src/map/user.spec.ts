import { describe, expect, it } from 'vitest'
import { BXRestMapUser } from './user'
import { iBXRestUserHttp } from '../typification/rest/user'

const http = (fields: Record<string, unknown>) => ({ ID: '1', NAME: 'Anna', IS_ONLINE: 'Y', ...fields }) as unknown as iBXRestUserHttp

describe('BXRestMapUser.userHttpToTrace', () => {
  it('converts the fields that are present', () => {
    const user = BXRestMapUser.userHttpToTrace(http({
      DATE_REGISTER: '2024-01-05T09:00:00+00:00',
      PERSONAL_BIRTHDAY: '1990-02-03T00:00:00+00:00',
    }))

    expect(user.ID).toBe(1)
    expect(user.IS_ONLINE).toBe(true)
    expect(user.DATE_REGISTER?.toISOString()).toBe('2024-01-05T09:00:00.000Z')
    expect(user.PERSONAL_BIRTHDAY?.toISOString()).toBe('1990-02-03T00:00:00.000Z')
  })

  it('an empty birthday gives undefined, not an Invalid Date', () => {
    const user = BXRestMapUser.userHttpToTrace(http({ DATE_REGISTER: '2024-01-05T09:00:00+00:00', PERSONAL_BIRTHDAY: '' }))

    expect(user.PERSONAL_BIRTHDAY).toBeUndefined()
  })

  it('a response without the date fields does not fail', () => {
    const user = BXRestMapUser.userHttpToTrace(http({}))

    expect(user.NAME).toBe('Anna')
    expect(user.DATE_REGISTER).toBeUndefined()
    expect(user.PERSONAL_BIRTHDAY).toBeUndefined()
  })
})

describe('BXRestMapUser.BXtoHttp', () => {
  it('a user without the date fields does not fail', () => {
    const user = BXRestMapUser.userHttpToTrace(http({}))

    expect(BXRestMapUser.BXtoHttp(user)).toMatchObject({ ID: '1', IS_ONLINE: 'Y', DATE_REGISTER: '', PERSONAL_BIRTHDAY: '' })
  })
})
