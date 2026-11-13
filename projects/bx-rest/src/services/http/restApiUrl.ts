import { prepareBaseAddress } from '../base'

/**
 * Базовый адрес для метода REST v3. `api/` встаёт сразу после сегмента `rest/`, перед данными
 * вебхука, как требует документация:
 * - приложение: `https://portal/rest/` → `https://portal/rest/api/`;
 * - вебхук: `https://portal/rest/1/CODE/` → `https://portal/rest/api/1/CODE/`.
 *
 * Адрес, где `api/` после `rest/` уже есть, не меняется. Если сегмента `rest` в адресе нет
 * (например, свой прокси), `api/` добавляется в конец
 *
 * @see https://apidocs.bitrix24.ru/api-reference/rest-v3.html#call Как вызвать REST 3.0
 */
export function restApiBaseUrl(baseUrl: string): string {
  const base = prepareBaseAddress(baseUrl)
  // Сегмент ищется только в пути: в имени хоста `rest` тоже может встретиться
  const scheme = base.indexOf('://')
  const pathStart = scheme < 0 ? 0 : base.indexOf('/', scheme + 3)
  const origin = base.slice(0, pathStart)
  const path = base.slice(pathStart)

  const rest = /(^|\/)rest\/(api\/)?/.exec(path)
  if (!rest) {
    return base + 'api/'
  }
  if (rest[2]) {
    return base
  }
  const at = rest.index + rest[0].length
  return origin + path.slice(0, at) + 'api/' + path.slice(at)
}
