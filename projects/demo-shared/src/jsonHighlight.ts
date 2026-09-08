// Подсветка JSON-ответа в панели результата — теми же цветами, что и в
// самом редакторе Monaco (тема vs-dark), чтобы результат не выглядел
// "мертвым" plain-text куском рядом с подсвеченным кодом сверху.
//
// Возвращает HTML-строку (safe: сначала экранируем спецсимволы исходных
// данных, потом оборачиваем токены в <span>) — каждое демо вставляет её как
// innerHTML/v-html/dangerouslySetInnerHTML в свой <pre>.
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

const TOKEN_PATTERN = /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(?:true|false)\b|\bnull\b|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)/g

function highlightJsonText(json: string): string {
  return escapeHtml(json).replace(TOKEN_PATTERN, match => {
    let cls = 'json-number'
    if (match.startsWith('"')) {
      cls = match.endsWith(':') ? 'json-key' : 'json-string'
    } else if (match === 'true' || match === 'false') {
      cls = 'json-boolean'
    } else if (match === 'null') {
      cls = 'json-null'
    }
    return `<span class="${cls}">${match}</span>`
  })
}

/**
 * Готовит значение из show() для вывода в <pre>: JSON.stringify + подсветка
 * токенов. undefined — легитимный результат (см. README «Обработка
 * ошибок» — непойманная ошибка API молча резолвится как undefined), его
 * показываем явным текстом, а не пустой строкой.
 */
export function formatResultValueHtml(value: unknown): string {
  if (value === undefined) {
    return '<span class="json-undefined">undefined</span>'
  }
  return highlightJsonText(JSON.stringify(value, null, 2))
}
