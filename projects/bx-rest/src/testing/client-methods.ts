// Только для тестов, в пакет не входит: файл не импортируется из public-api.ts.
//
// Обходит все публичные методы клиента BXRestNavvy и вызывает каждый с аргументами-заглушками.
// Метод REST возвращает объект запроса (NavvyPagBase), из него берутся REST-имя и класс
// пагинации. Запрос никуда не уходит: middleware клиента его не отправляет.
import { BXRestNavvy } from '../rest/navvy'
import { NavvyPagBase } from '../services/navvy/extends/navvy-pag-base'
import { Navvy } from '../services/navvy'
import { HttpServices } from '../services/http/http'

export interface ClientMethod {
  /** Путь от клиента: `crm.deal.list` */
  path: string
  /** REST-имя, если метод вернул объект запроса: `crm.deal.list` */
  rest?: string
  /**
   * Класс объекта запроса (`NavvySimple`, `NavvyPagNav`…). Для остальных методов — что они
   * вернули (`Observable`, `undefined`), а `throws` — если метод упал на заглушках.
   */
  kind: string
  resAll: boolean
  /** Запрос уходит на адрес REST v3 `rest/api/` */
  restApi?: boolean
}

// private-поля с вложенными клиентами. Их методы уже есть в публичных разделах,
// а в снимке методов они дали бы дубли под внутренними именами.
const PRIVATE_FIELDS = ['delegate', 'BXRestNavvyElapsedItem', 'BXRestNavvyUser', 'BXRestNavvyTasks', 'BXRestNavvyLists', 'BXRestDiskStorage']

// Аргумент-заглушка: любое свойство и вызов дают новую заглушку
function stub(): any {
  const target = function () { /* callable */ }
  return new Proxy(target, {
    get: (_t, k) => (k === Symbol.toPrimitive ? () => 1 : k === Symbol.iterator ? [][Symbol.iterator].bind([]) : k === 'length' ? 0 : stub()),
    apply: () => stub(),
    ownKeys: () => ['prototype'],
    getOwnPropertyDescriptor: (_t, k) => (k === 'prototype' ? { configurable: false, enumerable: false, value: {}, writable: true } : undefined),
    has: () => true,
  })
}

/** Все публичные методы клиента в порядке обхода */
export function listClientMethods(): ClientMethod[] {
  const SKIP = new Set(['constructor', 'url', ...PRIVATE_FIELDS])
  const seen = new Set<object>()
  const methods: ClientMethod[] = []

  const walk = (obj: any, path: string) => {
    if (seen.has(obj)) return
    seen.add(obj)
    const names = new Set<string>(Object.getOwnPropertyNames(obj))
    for (let p = Object.getPrototypeOf(obj); p && p !== Object.prototype; p = Object.getPrototypeOf(p)) {
      for (const n of Object.getOwnPropertyNames(p)) names.add(n)
    }
    for (const name of names) {
      if (SKIP.has(name)) continue
      let value: any
      try { value = obj[name] } catch { continue }
      // Внутренние объекты запросов: их методы принимают адрес и тело, а не параметры метода REST
      if (value instanceof HttpServices || value instanceof Navvy) continue
      const fullPath = path ? `${path}.${name}` : name
      if (typeof value === 'function') {
        let result: unknown
        try {
          result = value.call(obj, stub(), stub(), stub())
        } catch {
          methods.push({ path: fullPath, kind: 'throws', resAll: false })
          continue
        }
        if (result instanceof NavvyPagBase) {
          methods.push({
            path: fullPath,
            rest: (result as unknown as { url: string[] }).url.join('.'),
            kind: result.constructor.name,
            resAll: typeof (result as unknown as { resAll?: unknown }).resAll === 'function',
            restApi: (result as unknown as { restApi: boolean }).restApi,
          })
        } else {
          const kind = result && typeof result === 'object' ? result.constructor.name : typeof result
          methods.push({ path: fullPath, kind, resAll: false })
        }
      } else if (value && typeof value === 'object' && !Array.isArray(value)) {
        walk(value, fullPath)
      }
    }
  }
  // Часть методов отправляет запрос сразу при вызове. Такой middleware его никуда не отправляет.
  const offline = new BXRestNavvy({
    auth: { source: () => 'token', key: 'auth' },
    urls: { source: 'string', key: 'https://portal.test', additional_part: 'rest' },
    middleware: [() => new Promise<never>(() => undefined)],
  })
  walk(offline, '')
  return methods
}
