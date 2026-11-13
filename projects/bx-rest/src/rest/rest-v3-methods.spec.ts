import { describe, expect, it } from 'vitest'
import { listClientMethods } from '../testing/client-methods'

// Методы REST v3 должны уходить на `rest/api/`: по старому адресу `rest/` портал ищет метод
// старой версии, а если его нет, отвечает `ERROR_METHOD_NOT_FOUND`. Тест сверяет адрес каждого
// метода клиента со списками ниже в обе стороны.
//
// https://apidocs.bitrix24.ru/api-reference/rest-v3.html#call

// Есть только в REST v3: у страницы метода в документации пометка о REST 3.0, а страницы
// старой версии нет. Сверено с документацией Bitrix24 (github.com/bitrix24/b24restdocs) 2026-11-13.
//
// Методы, которые есть в обеих версиях (`tasks.task.get`, `crm.activity.list`, `catalog.price.*`…),
// клиент вызывает в старой версии: под неё написаны их типы.
const REST_V3_ONLY = [
  'mail.mailbox.field.get',
  'mail.mailbox.field.list',
  'mail.mailbox.get',
  'mail.mailbox.list',
  'mail.mailbox.senders',
  'mail.message.createcalendarevent',
  'mail.message.createchat',
  'mail.message.createcrmactivity',
  'mail.message.createfeedpost',
  'mail.message.createtask',
  'mail.message.field.get',
  'mail.message.field.list',
  'mail.message.forward',
  'mail.message.get',
  'mail.message.list',
  'mail.message.movetofolder',
  'mail.message.removecrmactivity',
  'mail.message.reply',
  'mail.message.send',
  'mail.message.thread',
  'mail.recipient.field.get',
  'mail.recipient.field.list',
  'mail.recipient.listcontacts',
  'mail.recipient.listemployees',
  'main.eventlog.field.get',
  'main.eventlog.field.list',
  'main.eventlog.get',
  'main.eventlog.list',
  'main.eventlog.tail',
  'note.collection.add',
  'note.collection.archive',
  'note.collection.delete',
  'note.collection.field.get',
  'note.collection.field.list',
  'note.collection.get',
  'note.collection.list',
  'note.collection.update',
  'note.document.add',
  'note.document.archive',
  'note.document.delete',
  'note.document.field.get',
  'note.document.field.list',
  'note.document.get',
  'note.document.search.field.get',
  'note.document.search.field.list',
  'note.document.search.list',
  'note.document.tree.field.get',
  'note.document.tree.field.list',
  'note.document.tree.list',
  'note.document.update',
  'note.file.add',
  'note.file.field.get',
  'note.file.field.list',
  'note.file.get',
  'tasks.task.access.get',
  'tasks.task.chat.message.field.get',
  'tasks.task.chat.message.field.list',
  'tasks.task.chat.message.send',
  'tasks.task.field.get',
  'tasks.task.field.list',
  'tasks.task.file.attach',
  'tasks.task.result.add',
  'tasks.task.result.addfromchatmessage',
  'tasks.task.result.delete',
  'tasks.task.result.update',
  'timeman.record.field.get',
  'timeman.record.field.list',
  'timeman.record.list',
]

// В документации нет, но названы по правилам REST v3: описание полей в нём — `*.field.*`,
// а в старой версии — `*.fields` или `getFields`
const REST_V3_BY_NAME = [
  'tasks.task.access.field.get',
  'tasks.task.access.field.list',
  'tasks.task.file.field.get',
  'tasks.task.file.field.list',
]

describe('REST v3 methods', () => {
  const calls = listClientMethods().filter(call => call.rest !== undefined)
  const v3 = new Set([...REST_V3_ONLY, ...REST_V3_BY_NAME])

  it('finds the REST v3 methods of the client', () => {
    expect(calls.filter(call => v3.has(call.rest!)).length).toBeGreaterThanOrEqual(v3.size)
  })

  it('every REST v3 method goes to rest/api/', () => {
    const wrong = calls.filter(call => v3.has(call.rest!) && !call.restApi).map(call => `${call.rest} (${call.path})`)

    expect(wrong).toEqual([])
  })

  it('only REST v3 methods go to rest/api/', () => {
    const wrong = calls.filter(call => call.restApi && !v3.has(call.rest!)).map(call => `${call.rest} (${call.path})`)

    expect(wrong).toEqual([])
  })

  it('the lists have no methods the client does not have', () => {
    const names = new Set(calls.map(call => call.rest))

    expect([...v3].filter(name => !names.has(name))).toEqual([])
  })
})
