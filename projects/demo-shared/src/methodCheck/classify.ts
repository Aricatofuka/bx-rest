// К какой фазе проверки относится метод клиента. Фаза определяется по последней части
// REST-имени: `crm.deal.list` читает, `crm.deal.add` добавляет и так далее.

export type MethodPhase = 'read' | 'add' | 'update' | 'delete' | 'other'

/** Порядок фаз в проверке: сначала чтение, затем добавление, изменение и удаление */
export const PHASE_ORDER: readonly MethodPhase[] = ['read', 'add', 'update', 'delete', 'other']

/** Окончания имён методов, которые только читают данные */
const READ_ENDINGS = new Set([
  'get', 'list', 'getlist', 'fields', 'getfields', 'getfieldsbyfilter', 'search', 'getchildren',
  'types', 'tail', 'current', 'info', 'status', 'getversions', 'getmanifest', 'access',
])

/**
 * Методы, которые по имени читают, а на деле меняют данные на портале.
 * `im.notify.read.list` помечает уведомления прочитанными
 */
const NOT_READ = new Set(['im.notify.read.list'])

export function phaseOf(rest: string | undefined): MethodPhase {
  if (!rest || NOT_READ.has(rest)) {
    return 'other'
  }
  const ending = rest.slice(rest.lastIndexOf('.') + 1).toLowerCase()
  if (READ_ENDINGS.has(ending)) return 'read'
  if (ending === 'add') return 'add'
  if (ending === 'update') return 'update'
  if (ending === 'delete') return 'delete'
  return 'other'
}

/** Метод получения одной записи: ему нужен идентификатор из списка того же раздела */
export function isSingleGet(rest: string): boolean {
  return /\.get$/i.test(rest)
}

/** Метод списка, из ответа которого берётся идентификатор для `*.get` того же раздела */
export function isListMethod(rest: string): boolean {
  return /\.(list|getlist)$/i.test(rest)
}

/** Раздел метода: `crm.deal.get` → `crm.deal` */
export function sectionOf(rest: string): string {
  return rest.slice(0, rest.lastIndexOf('.')).toLowerCase()
}
