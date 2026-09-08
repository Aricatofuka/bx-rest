// Небольшая шина уведомлений для предупреждений о сбоях записи в браузерное
// хранилище (localStorage/cookie) — например, в приватном режиме браузера.
// demo-shared не рисует UI сам, поэтому только публикует событие; каждое
// демо (React/Vue/Angular) подписывается один раз в корневом компоненте и
// показывает короткий тост, пока полная ошибка всегда уходит в консоль.
export interface StorageWarning {
  /** Короткое, уже локализованное сообщение для тоста. */
  message: string
  /** Исходная ошибка — только для консоли, в тост не попадает. */
  error: unknown
}

type StorageWarningListener = (warning: StorageWarning) => void

const listeners = new Set<StorageWarningListener>()

/** Подписывается на предупреждения о сбоях хранилища. Возвращает функцию отписки. */
export function onStorageWarning(listener: StorageWarningListener): () => void {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

/**
 * Сообщает о сбое записи/чтения хранилища: полная ошибка — всегда в
 * консоль (для отладки), плюс рассылка подписчикам для тоста в UI.
 */
export function emitStorageWarning(message: string, error: unknown): void {
  // eslint-disable-next-line no-console -- это и есть место, где ошибка должна быть видна разработчику
  console.error(`[bx-rest-demo] ${message}`, error)
  for (const listener of listeners) listener({ message, error })
}
