// Готовые сниппеты для редактора — по клику подставляются в Monaco как
// рабочий, редактируемый пример (не выполняются сами по себе). Все примеры
// написаны на реальном API bx-rest, единственное отличие от кода в README —
// вместо `new BXRestNavvy()` доступна уже готовая ambient-переменная
// `bxRest`, а вместо `.subscribe(...)`/`firstValueFrom` — `show(...)`,
// которая сама подписывается и рисует результат в панели ниже.
//
// Заголовки/описания и комментарии в самом коде идут на текущем языке
// интерфейса (см. i18n.ts) — код при этом остаётся тем же валидным TS.
import { locale, t } from './i18n'

export interface Recipe {
  id: string
  title: string
  description: string
  code: string
}

const dealListCode = {
  ru: `show(
  bxRest.crm.deal.list({
    select: ['ID', 'TITLE', 'STAGE_ID'],
    filter: {},
    start: 0
  }).res()
)
`,
  en: `show(
  bxRest.crm.deal.list({
    select: ['ID', 'TITLE', 'STAGE_ID'],
    filter: {},
    start: 0
  }).res()
)
`
}

const contactAddCode = {
  ru: `show(
  bxRest.crm.contact.add({
    fields: {
      NAME: 'Иван',
      LAST_NAME: 'Петров'
    }
  }).res()
)
`,
  en: `show(
  bxRest.crm.contact.add({
    fields: {
      NAME: 'John',
      LAST_NAME: 'Doe'
    }
  }).res()
)
`
}

const tasksPaginatedCode = {
  ru: `show(
  bxRest.tasks.task.list({
    order: { ID: 'DESC' },
    filter: {},
    select: ['ID', 'TITLE', 'GROUP_ID', 'CREATED_DATE'],
    start: 0
  }).resAll()
)
`,
  en: `show(
  bxRest.tasks.task.list({
    order: { ID: 'DESC' },
    filter: {},
    select: ['ID', 'TITLE', 'GROUP_ID', 'CREATED_DATE'],
    start: 0
  }).resAll()
)
`
}

const errorHandlingCode = {
  ru: `// ID заведомо не существует — Bitrix ответит ошибкой API (HTTP 400,
// "Not found"), и show() покажет BXRestApiError с кодом, статусом и методом.
// throwOnApiError нужен для ошибок, которые Bitrix присылает в ответе 200:
// без него такие ошибки тихо резолвятся как undefined.
show(
  bxRest.crm.deal.get({ id: 999999999 }).res({ throwOnApiError: true })
)
`,
  en: `// This ID doesn't exist — Bitrix will respond with an API error (HTTP 400,
// "Not found"), and show() will display a BXRestApiError with code, status and method.
// throwOnApiError covers errors Bitrix sends in a 200 response:
// without it, those silently resolve as undefined.
show(
  bxRest.crm.deal.get({ id: 999999999 }).res({ throwOnApiError: true })
)
`
}

export const recipes: Recipe[] = [
  { id: 'crm-deal-list', title: t.recipes.dealList.title, description: t.recipes.dealList.description, code: dealListCode[locale] },
  { id: 'crm-contact-add', title: t.recipes.contactAdd.title, description: t.recipes.contactAdd.description, code: contactAddCode[locale] },
  { id: 'tasks-list-paginated', title: t.recipes.tasksPaginated.title, description: t.recipes.tasksPaginated.description, code: tasksPaginatedCode[locale] },
  { id: 'error-handling', title: t.recipes.errorHandling.title, description: t.recipes.errorHandling.description, code: errorHandlingCode[locale] }
]
