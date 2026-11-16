// Отчёты о проверке для скачивания. Токена и адреса вебхука в них нет: строки хранят только
// параметры запроса и тело ответа, а не объект ошибки axios с адресом и токеном.
import { type CheckRow, summarize } from './runner'

/** Отчёт в JSON: сводка и все строки таблицы, ответы портала целиком */
export function checkReportJson(rows: readonly CheckRow[]): string {
  return JSON.stringify({ createdAt: new Date().toISOString(), summary: summarize(rows), rows }, null, 2)
}

/** Больше символов в ячейке Excel не показывает */
const CELL_LIMIT = 32_000

/** Колонки CSV: заголовок и значение из строки таблицы */
const CSV_COLUMNS: [string, (row: CheckRow) => unknown][] = [
  ['index', row => row.index],
  ['path', row => row.path],
  ['rest', row => row.rest],
  ['kind', row => row.kind],
  ['restApi', row => row.restApi],
  ['phase', row => row.phase],
  ['status', row => row.status],
  ['code', row => row.code],
  ['httpStatus', row => row.httpStatus],
  ['details', row => row.details],
  ['ms', row => row.ms],
  ['params', row => row.params],
  ['response', row => row.response],
  ['mapped', row => row.mapped],
  ['stack', row => row.stack],
]

/**
 * Отчёт в CSV для Excel: разделитель `;` и BOM, чтобы русский Excel сразу разложил колонки
 * и прочитал UTF-8. Объекты пишутся в JSON. Ячейка длиннее предела Excel обрезается
 * с пометкой: полный ответ есть в отчёте JSON
 */
export function checkReportCsv(rows: readonly CheckRow[]): string {
  const lines = [CSV_COLUMNS.map(([name]) => name).join(';')]
  for (const row of rows) {
    lines.push(CSV_COLUMNS.map(([, value]) => csvCell(value(row))).join(';'))
  }
  return '﻿' + lines.join('\r\n') + '\r\n'
}

function csvCell(value: unknown): string {
  if (value === undefined || value === null) return ''
  let text = typeof value === 'object' ? JSON.stringify(value) : String(value)
  if (text.length > CELL_LIMIT) {
    text = `${text.slice(0, CELL_LIMIT)}… [truncated, ${text.length} chars, full value in the JSON report]`
  }
  return /[";\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text
}
