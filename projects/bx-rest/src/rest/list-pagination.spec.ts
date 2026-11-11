import { describe, expect, it } from 'vitest'
import { BXRestNavvy } from './navvy'
import { NavvyPagBase } from '../services/navvy/extends/navvy-pag-base'
import { Navvy } from '../services/navvy'
import { HttpServices } from '../services/http/http'

// Каждый списочный метод клиента (`*.list`, `*.getlist`, `*.items`) либо умеет `.resAll()`,
// либо стоит в списке ниже с причиной. Без этой проверки метод легко добавить через `simple`:
// он скомпилируется так же, как с пагинацией, но `.resAll()` у него не будет.
//
// Причины сверены с документацией Bitrix24 (github.com/bitrix24/b24restdocs) 2026-11-10.

const NO_PAGINATION = 'no pagination: the docs describe no start parameter, the whole list comes in one response'
const FIELDS = 'field descriptions, not a paged list'
const UNCONFIRMED = 'start is not confirmed by the docs (no total in the response or start only in examples): check on a portal'
const PAGE_NUMBER = 'page-number pagination (page) without total: .resAll() supports start only'
const OFFSET_LIMIT = 'OFFSET/LIMIT pagination: .resAll() supports start only'
const REST_V3 = 'REST v3 pagination object without total: .resAll() supports start only'

const WITHOUT_RES_ALL: Record<string, string> = {
  'ai.engine.list': NO_PAGINATION,
  'bizProc.activity.list': NO_PAGINATION,
  'bizProc.robot.list': NO_PAGINATION,
  'booking.v1.booking.client.list': NO_PAGINATION,
  'booking.v1.booking.externaldata.list': NO_PAGINATION,
  'booking.v1.clienttype.list': NO_PAGINATION,
  'booking.v1.resource.slots.list': NO_PAGINATION,
  'booking.v1.waitlist.client.list': NO_PAGINATION,
  'booking.v1.waitlist.externaldata.list': NO_PAGINATION,
  'booking.v1.waitlist.list': NO_PAGINATION,
  'calendar.resource.list': NO_PAGINATION,
  'catalog.productImage.list': NO_PAGINATION,
  'crm.activity.badge.list': NO_PAGINATION,
  'crm.activity.binding.list': NO_PAGINATION,
  'crm.activity.type.list': NO_PAGINATION,
  'crm.company.userfield.list': NO_PAGINATION,
  'crm.contact.userfield.list': NO_PAGINATION,
  'crm.currency.list': NO_PAGINATION,
  'crm.deal.userfield.list': NO_PAGINATION,
  'crm.duplicate.volatileType.list': NO_PAGINATION,
  'crm.item.delivery.list': NO_PAGINATION,
  'crm.item.payment.delivery.list': NO_PAGINATION,
  'crm.item.payment.list': NO_PAGINATION,
  'crm.item.payment.product.list': NO_PAGINATION,
  'crm.lead.userfield.list': NO_PAGINATION,
  'crm.quote.userfield.list': NO_PAGINATION,
  'crm.requisite.userfield.list': NO_PAGINATION,
  'crm.status.entity.items': NO_PAGINATION,
  'crm.timeline.icon.list': NO_PAGINATION,
  'crm.timeline.logo.list': NO_PAGINATION,
  'documentgenerator.region.list': NO_PAGINATION,
  'im.chat.user.list': NO_PAGINATION,
  'imbot.v2.Chat.user.list': NO_PAGINATION,
  'imbot.v2.Command.list': NO_PAGINATION,
  'imconnector.list': NO_PAGINATION,
  'landing.block.getList': NO_PAGINATION,
  'landing.demos.getList': NO_PAGINATION,
  'landing.landing.getList': NO_PAGINATION,
  'landing.repo.getList': NO_PAGINATION,
  'landing.repowidget.getlist': NO_PAGINATION,
  'landing.role.getList': NO_PAGINATION,
  'landing.site.getList': NO_PAGINATION,
  'landing.template.getList': NO_PAGINATION,
  'mailservice.list': NO_PAGINATION,
  'messageservice.sender.list': NO_PAGINATION,
  'note.document.tree.list': NO_PAGINATION,
  'placement.list': NO_PAGINATION,
  'sale.cashbox.handler.list': NO_PAGINATION,
  'sale.cashbox.list': NO_PAGINATION,
  'sale.delivery.getList': NO_PAGINATION,
  'sale.delivery.handler.list': NO_PAGINATION,
  'sale.paysystem.handler.list': NO_PAGINATION,
  'sale.paysystem.list': NO_PAGINATION,
  'task.checklistitem.getlist': NO_PAGINATION,
  'task.commentitem.getlist': NO_PAGINATION,
  'task.planner.getlist': NO_PAGINATION,
  'tasks.template.checklist.list': NO_PAGINATION,
  'user.userfield.list': NO_PAGINATION,
  'userconsent.agreement.list': NO_PAGINATION,

  'crm.requisite.preset.field.list': FIELDS,
  'mail.mailbox.field.list': FIELDS,
  'mail.message.field.list': FIELDS,
  'mail.recipient.field.list': FIELDS,
  'main.eventlog.field.list': FIELDS,
  'note.collection.field.list': FIELDS,
  'note.document.field.list': FIELDS,
  'note.document.search.field.list': FIELDS,
  'note.document.tree.field.list': FIELDS,
  'note.file.field.list': FIELDS,
  'tasks.task.access.field.list': FIELDS,
  'tasks.task.chat.message.field.list': FIELDS,
  'tasks.task.field.list': FIELDS,
  'tasks.task.file.field.list': FIELDS,
  'timeman.record.field.list': FIELDS,

  'booking.v1.booking.list': UNCONFIRMED,
  'crm.calllist.list': UNCONFIRMED,
  'sale.propertyGroup.list': UNCONFIRMED,
  'tasks.task.history.list': UNCONFIRMED,

  'biconnector.connector.list': PAGE_NUMBER,
  'biconnector.dataset.list': PAGE_NUMBER,
  'biconnector.source.list': PAGE_NUMBER,

  'im.department.colleagues.list': OFFSET_LIMIT,
  'im.dialog.users.list': OFFSET_LIMIT,
  'im.recent.list': OFFSET_LIMIT,
  'im.search.chat.list': OFFSET_LIMIT,
  'im.search.department.list': OFFSET_LIMIT,
  'im.search.user.list': OFFSET_LIMIT,
  'imbot.v2.Bot.list': OFFSET_LIMIT,
  'sign.b2e.company.provider.list': OFFSET_LIMIT,

  'mail.mailbox.list': REST_V3,
  'mail.message.list': REST_V3,
  'main.eventlog.list': REST_V3,
  'note.collection.list': REST_V3,
  'note.document.search.list': REST_V3,
  'timeman.record.list': REST_V3,

  'im.notify.read.list': 'not a list: marks notifications as read',
}

const LIST_METHOD = /\.(list|getlist|items)$/i

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

/** REST-имя и наличие `.resAll()` у каждого метода клиента. */
function listMethods() {
  const SKIP = new Set(['constructor', 'url'])
  const seen = new Set<object>()
  const methods = new Map<string, { path: string, resAll: boolean }[]>()

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
      if (typeof value === 'function') {
        let request: unknown
        try { request = value.call(obj, stub(), stub(), stub()) } catch { continue }
        if (request instanceof NavvyPagBase) {
          const rest = (request as unknown as { url: string[] }).url.join('.')
          const resAll = typeof (request as unknown as { resAll?: unknown }).resAll === 'function'
          methods.set(rest, [...methods.get(rest) ?? [], { path: `${path}.${name}`, resAll }])
        }
      } else if (value && typeof value === 'object' && !Array.isArray(value)) {
        walk(value, path ? `${path}.${name}` : name)
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

describe('list methods', () => {
  const methods = listMethods()

  it('finds the list methods of the client', () => {
    expect([...methods.keys()].filter(rest => LIST_METHOD.test(rest)).length).toBeGreaterThan(150)
  })

  it('every list method has .resAll() or a documented reason not to', () => {
    const missing = [...methods]
      .filter(([rest, calls]) => LIST_METHOD.test(rest) && !(rest in WITHOUT_RES_ALL) && calls.some(call => !call.resAll))
      .map(([rest, calls]) => `${rest} (${calls.map(call => call.path).join(', ')})`)

    expect(missing).toEqual([])
  })

  it('the exception list has no stale entries', () => {
    const stale = Object.keys(WITHOUT_RES_ALL)
      .filter(rest => !methods.has(rest) || methods.get(rest)!.some(call => call.resAll))

    expect(stale).toEqual([])
  })
})
