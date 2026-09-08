import { iBXRestParamSort } from '../typification/rest/base/sort'

/**
 * crm.deal.list, crm.lead.list, crm.contact.list и crm.company.list — в
 * отличие от остального REST API Bitrix24 — принимают значения `order` в
 * нижнем регистре (`'asc'`/`'desc'`), а не в верхнем (`'ASC'`/`'DESC'`, как
 * везде остальном, см. {@link iBXRestParamSort}). Публичный тип этих
 * четырёх методов унифицирован на `iBXRestParamSort` ради единообразия
 * во всей библиотеке — эта функция перед отправкой запроса приводит
 * значения обратно к регистру, которого реально ожидает конкретно этот
 * метод, так что на бэкенд уходит то же самое, что уходило бы и без
 * унификации типов.
 *
 * @hidden
 */
export function lowerCaseOrder(
  order: Record<string, iBXRestParamSort> | undefined
): Record<string, 'asc' | 'desc'> | undefined {
  if (!order) return undefined

  const result: Record<string, 'asc' | 'desc'> = {}
  for (const field of Object.keys(order)) {
    result[field] = order[field].toLowerCase() as 'asc' | 'desc'
  }
  return result
}
