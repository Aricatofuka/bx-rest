/** Секрет входящего вебхука — сегмент адреса после `/rest/<ID пользователя>/`. */
const WEBHOOK_SECRET = /(\/rest\/\d+\/)[^/?#]+(?=\/)/g

/** Заменяет токен и секрет вебхука на `***`. */
export function maskText(text: string, token: string | undefined): string {
  let masked = text
  if (token) {
    masked = masked.split(token).join('***')
    const encoded = encodeURIComponent(token)
    if (encoded !== token) {
      masked = masked.split(encoded).join('***')
    }
  }
  return masked.replace(WEBHOOK_SECRET, '$1***')
}

type Config = Record<string, unknown>

/**
 * Убирает секреты из ошибки транспорта, прежде чем она уйдёт в приложение.
 * axios кладёт в ошибку весь запрос: адрес (секрет вебхука, токен в GET) и
 * тело (токен в POST), а в `request` — объект запроса со строкой заголовков.
 * Ответ портала (`response.status`, `response.data`) не меняется.
 */
export function maskSecrets(error: unknown, token: string | undefined): unknown {
  if (!error || typeof error !== 'object') {
    return error
  }
  const e = error as { config?: Config, request?: unknown, response?: { config?: Config, request?: unknown } }
  for (const config of new Set([e.config, e.response?.config])) {
    if (!config || typeof config !== 'object') {
      continue
    }
    for (const key of ['url', 'baseURL', 'data']) {
      if (typeof config[key] === 'string') {
        config[key] = maskText(config[key] as string, token)
      }
    }
  }
  if ('request' in e) {
    delete e.request
  }
  if (e.response && typeof e.response === 'object' && 'request' in e.response) {
    delete e.response.request
  }
  return error
}
