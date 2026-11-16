// Проверка маппера: сравнивает `result` из ответа портала с тем, что из него сделал маппер.
// Маппер не должен падать, терять записи, отдавать `undefined` вместо данных,
// превращать даты в Invalid Date, а числа в NaN.

/** Больше проблем по одному методу не собираем: дальше обычно повторяется та же */
const ISSUE_LIMIT = 5

/** Глубже не спускаемся: ответы Bitrix24 бывают с циклическими по смыслу вложениями */
const DEPTH_LIMIT = 8

export function mappingIssues(raw: unknown, mapped: unknown): string[] {
  const issues: string[] = []
  if (raw !== undefined && raw !== null && mapped === undefined) {
    return ['the mapper returned undefined for a non-empty result']
  }
  walk(raw, mapped, 'result', 0, issues)
  return issues
}

function walk(raw: unknown, mapped: unknown, path: string, depth: number, issues: string[]): void {
  if (issues.length >= ISSUE_LIMIT || depth > DEPTH_LIMIT) {
    return
  }
  if (mapped instanceof Date) {
    if (Number.isNaN(mapped.getTime())) {
      issues.push(`${path}: Invalid Date from ${preview(raw)}`)
    }
    return
  }
  if (typeof mapped === 'number') {
    if (Number.isNaN(mapped) && !(typeof raw === 'number' && Number.isNaN(raw))) {
      issues.push(`${path}: NaN from ${preview(raw)}`)
    }
    return
  }
  if (Array.isArray(mapped)) {
    if (Array.isArray(raw) && raw.length !== mapped.length) {
      issues.push(`${path}: ${raw.length} records in the response, ${mapped.length} after the mapper`)
    }
    mapped.forEach((item, index) => walk(Array.isArray(raw) ? raw[index] : undefined, item, `${path}[${index}]`, depth + 1, issues))
    return
  }
  if (mapped && typeof mapped === 'object') {
    const rawObject = raw && typeof raw === 'object' ? raw as Record<string, unknown> : {}
    for (const [key, value] of Object.entries(mapped)) {
      walk(rawObject[key], value, `${path}.${key}`, depth + 1, issues)
    }
  }
}

function preview(value: unknown): string {
  const text = JSON.stringify(value)
  if (text === undefined) return String(value)
  return text.length > 40 ? `${text.slice(0, 40)}…` : text
}
