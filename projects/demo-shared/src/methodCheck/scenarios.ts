// Сценарии записи: что создать, как изменить и как удалить. Без сценария методы записи
// не проверяются: им нужны осмысленные данные, а по имени метода их не угадать.
//
// Все записи создаются с подписью в названии (см. ScenarioContext.label): если удаление
// не прошло, их легко найти на портале и удалить вручную.
import type { BXRestNavvy } from 'bx-rest'

/**
 * Объект запроса bx-rest, наследник NavvyPagBase. Тип не уточняется: у библиотеки и у демо
 * свои копии rxjs, и их `Observable` для TypeScript несовместимы. Проверяется при запуске
 */
export type CheckRequest = unknown

export interface ScenarioContext {
  bx: BXRestNavvy
  /** Текущий пользователь из `user.current`, 0 — если чтение его не вернуло */
  userId: number
  /** Подпись для названий создаваемых записей */
  label: string
  /** Что создали сценарии: id сценария → id записи */
  created: Record<string, number>
  /** Первые записи, найденные при чтении: раздел (`calendar.section`) → id записи */
  found: Record<string, number>
}

export interface ScenarioStep {
  /** REST-имя метода: по нему шаг попадает в строку таблицы */
  rest: string
  request(ctx: ScenarioContext, id: number): CheckRequest
}

export interface WriteScenario {
  id: string
  /** Сценарии, чьи записи нужны этому: например, комментарию — сделка */
  needs?: string[]
  /** Причина не запускать сценарий, если чего-то не хватает, или `undefined` */
  notReady?(ctx: ScenarioContext): string | undefined
  add: ScenarioStep & {
    /** Идентификатор созданной записи из `result` ответа */
    idOf(result: unknown): number | undefined
  }
  update?: ScenarioStep
  delete: ScenarioStep
}

const toId = (value: unknown): number | undefined => {
  const id = Number(value)
  return Number.isInteger(id) && id > 0 ? id : undefined
}

/** `{ item: { id } }`, `{ task: { id } }` — идентификатор под ключом */
const nestedId = (key: string) => (result: unknown) =>
  toId((result as Record<string, { id?: unknown } | undefined> | undefined)?.[key]?.id)

/** Тип сделки в универсальных методах CRM (`entityTypeId`) */
const DEAL_TYPE_ID = 2

const NO_USER = 'user.current returned no user'

const needsUser = (ctx: ScenarioContext) => (ctx.userId > 0 ? undefined : NO_USER)

/** Завтра в `hour`:00 по местному времени */
function tomorrowAt(hour: number): Date {
  const date = new Date()
  date.setDate(date.getDate() + 1)
  date.setHours(hour, 0, 0, 0)
  return date
}

export const WRITE_SCENARIOS: readonly WriteScenario[] = [
  {
    id: 'crm.lead',
    add: { rest: 'crm.lead.add', request: ctx => ctx.bx.crm.lead.add({ fields: { TITLE: ctx.label } }), idOf: toId },
    update: { rest: 'crm.lead.update', request: (ctx, id) => ctx.bx.crm.lead.update({ id, fields: { TITLE: `${ctx.label} (updated)` } }) },
    delete: { rest: 'crm.lead.delete', request: (ctx, id) => ctx.bx.crm.lead.delete({ id }) },
  },
  {
    id: 'crm.contact',
    add: { rest: 'crm.contact.add', request: ctx => ctx.bx.crm.contact.add({ fields: { NAME: ctx.label } }), idOf: toId },
    update: { rest: 'crm.contact.update', request: (ctx, id) => ctx.bx.crm.contact.update({ id, fields: { NAME: `${ctx.label} (updated)` } }) },
    delete: { rest: 'crm.contact.delete', request: (ctx, id) => ctx.bx.crm.contact.delete({ id }) },
  },
  {
    id: 'crm.company',
    add: { rest: 'crm.company.add', request: ctx => ctx.bx.crm.company.add({ fields: { TITLE: ctx.label } }), idOf: toId },
    update: { rest: 'crm.company.update', request: (ctx, id) => ctx.bx.crm.company.update({ id, fields: { TITLE: `${ctx.label} (updated)` } }) },
    delete: { rest: 'crm.company.delete', request: (ctx, id) => ctx.bx.crm.company.delete({ id }) },
  },
  {
    id: 'crm.deal',
    add: { rest: 'crm.deal.add', request: ctx => ctx.bx.crm.deal.add({ fields: { TITLE: ctx.label } }), idOf: toId },
    update: { rest: 'crm.deal.update', request: (ctx, id) => ctx.bx.crm.deal.update({ id, fields: { TITLE: `${ctx.label} (updated)` } }) },
    delete: { rest: 'crm.deal.delete', request: (ctx, id) => ctx.bx.crm.deal.delete({ id }) },
  },
  {
    id: 'crm.timeline.comment',
    needs: ['crm.deal'],
    add: {
      rest: 'crm.timeline.comment.add',
      request: ctx => ctx.bx.crm.timeline.comment.add({
        fields: { ENTITY_ID: ctx.created['crm.deal'], ENTITY_TYPE: 'deal', COMMENT: ctx.label },
      }),
      idOf: toId,
    },
    update: {
      rest: 'crm.timeline.comment.update',
      request: (ctx, id) => ctx.bx.crm.timeline.comment.update({
        id, ownerTypeId: DEAL_TYPE_ID, ownerId: ctx.created['crm.deal'], fields: { COMMENT: `${ctx.label} (updated)` },
      }),
    },
    delete: {
      rest: 'crm.timeline.comment.delete',
      request: (ctx, id) => ctx.bx.crm.timeline.comment.delete({ id, ownerTypeId: DEAL_TYPE_ID, ownerId: ctx.created['crm.deal'] }),
    },
  },
  {
    id: 'crm.item',
    add: {
      rest: 'crm.item.add',
      request: ctx => ctx.bx.crm.item.add({ entityTypeId: DEAL_TYPE_ID, fields: { title: ctx.label } }),
      idOf: nestedId('item'),
    },
    update: {
      rest: 'crm.item.update',
      request: (ctx, id) => ctx.bx.crm.item.update({ entityTypeId: DEAL_TYPE_ID, id, fields: { title: `${ctx.label} (updated)` } }),
    },
    delete: { rest: 'crm.item.delete', request: (ctx, id) => ctx.bx.crm.item.delete({ entityTypeId: DEAL_TYPE_ID, id }) },
  },
  {
    id: 'tasks.task',
    notReady: needsUser,
    add: {
      rest: 'tasks.task.add',
      request: ctx => ctx.bx.tasks.task.add({ fields: { TITLE: ctx.label, RESPONSIBLE_ID: ctx.userId } }),
      idOf: nestedId('task'),
    },
    update: {
      rest: 'tasks.task.update',
      request: (ctx, id) => ctx.bx.tasks.task.update({ id, title: `${ctx.label} (updated)` }, ['TITLE']),
    },
    delete: { rest: 'tasks.task.delete', request: (ctx, id) => ctx.bx.tasks.task.delete({ taskId: id }) },
  },
  {
    id: 'calendar.event',
    notReady: ctx => needsUser(ctx) ?? (ctx.found['calendar.section'] ? undefined : 'calendar.section.get found no calendar'),
    add: {
      rest: 'calendar.event.add',
      request: ctx => ctx.bx.calendar.event.add({
        type: 'user', ownerId: ctx.userId, section: ctx.found['calendar.section'], name: ctx.label, from: tomorrowAt(10), to: tomorrowAt(11),
      }),
      idOf: toId,
    },
    update: {
      rest: 'calendar.event.update',
      request: (ctx, id) => ctx.bx.calendar.event.update({
        id, type: 'user', ownerId: ctx.userId, name: `${ctx.label} (updated)`, from: tomorrowAt(10), to: tomorrowAt(11),
      }),
    },
    delete: { rest: 'calendar.event.delete', request: (ctx, id) => ctx.bx.calendar.event.delete({ id }) },
  },
]
