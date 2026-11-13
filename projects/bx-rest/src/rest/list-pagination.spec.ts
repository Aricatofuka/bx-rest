import { describe, expect, it } from 'vitest'
import { listClientMethods } from '../testing/client-methods'

// Каждый списочный метод клиента (`*.list`, `*.getlist`, `*.items`) либо умеет `.resAll()`,
// либо стоит в списке ниже с причиной. Без этой проверки метод легко добавить через `simple`:
// он скомпилируется так же, как с пагинацией, но `.resAll()` у него не будет.
//
// Причины сверены с документацией Bitrix24 (github.com/bitrix24/b24restdocs) 2026-11-10.

const NO_PAGINATION = 'no pagination: the docs describe no start parameter, the whole list comes in one response'
const FIELDS = 'field descriptions, not a paged list'
const UNCONFIRMED = 'start is not confirmed by the docs (no total in the response or start only in examples): check on a portal'
const FIRST_PAGE_ONLY = 'only the first page: the response has hasMore but no cursor or offset for the next page'

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

  'note.document.search.list': FIRST_PAGE_ONLY,

  'im.notify.read.list': 'not a list: marks notifications as read',
}

const LIST_METHOD = /\.(list|getlist|items)$/i

/** REST-имя → где этот метод есть у клиента и умеет ли он там `.resAll()`. */
function listMethods() {
  const methods = new Map<string, { path: string, resAll: boolean }[]>()
  for (const { path, rest, resAll } of listClientMethods()) {
    if (rest !== undefined) methods.set(rest, [...methods.get(rest) ?? [], { path, resAll }])
  }
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
