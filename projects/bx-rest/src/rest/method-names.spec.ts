import { describe, expect, it } from 'vitest'
import { listClientMethods } from '../testing/client-methods'

// Снимок всех публичных методов клиента: путь, REST-имя и класс запроса. Переименование
// метода или опечатка в REST-имени компилируются и проходят остальные тесты, а снимок их ловит.
// У методов, которые не возвращают объект запроса (операции из нескольких запросов вроде
// task.elapsedItem.operation.add), в снимке только путь и что они вернули.
//
// Если изменение намеренное, обновите снимок и проверьте его diff:
//   npx vitest run -u projects/bx-rest/src/rest/method-names.spec.ts
// В CI (переменная окружения CI) снимок только сравнивается, новый не создаётся.

const SNAPSHOT = './__snapshots__/method-names.txt'

const HEADER = [
  '# Методы клиента BXRestNavvy: путь -> REST-имя (класс запроса).',
  '# Без REST-имени — методы, которые не возвращают объект запроса: путь (что вернул метод).',
  '# throws — метод упал на аргументах-заглушках, REST-имя у него не проверяется.',
  '# Файл пишет тест method-names.spec.ts, руками не править. Обновить:',
  '#   npx vitest run -u projects/bx-rest/src/rest/method-names.spec.ts',
]

describe('client methods', () => {
  it('match the snapshot of paths and REST names', async () => {
    const lines = listClientMethods()
      .map(method => method.rest === undefined
        ? `${method.path} (${method.kind})`
        : `${method.path} -> ${method.rest} (${method.kind})`)
      .sort()

    await expect([...HEADER, ...lines, ''].join('\n')).toMatchFileSnapshot(SNAPSHOT)
  })
})
