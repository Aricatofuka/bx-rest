/**
 * Символьный код нового элемента списка: `bx_rest_` и 128 случайных бит в hex.
 * Только латиница, цифры и `_`: допустимые символы документация Bitrix24 не
 * описывает.
 *
 * Случайные байты дают `crypto.getRandomValues` (в отличие от
 * `crypto.randomUUID`, он есть и на страницах по http). Глобального `crypto`
 * нет только в Node 18: там байты берутся из `Math.random`. Это не
 * криптостойко, но код нужен лишь уникальный, а совпадение с уже занятым кодом
 * ловит повтор в вызывающем методе
 */
export function uniqueElementCode(): string {
  const bytes = new Uint8Array(16)
  if (typeof globalThis.crypto?.getRandomValues === 'function') {
    globalThis.crypto.getRandomValues(bytes)
  } else {
    for (let i = 0; i < bytes.length; i++) {
      bytes[i] = Math.floor(Math.random() * 256)
    }
  }
  return 'bx_rest_' + Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('')
}
