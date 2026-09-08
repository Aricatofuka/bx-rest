// Настройка подключения демо-приложения к конкретному порталу Bitrix24.
// Логика одна для всех трёх фреймворков — форма подключения рисуется в
// каждом демо своя, но применяет настройки через эти функции.
//
// Покрывает все сценарии из README библиотеки, раздел «Аутентификация и
// OAuth2» (таблица auth.source/auth.key), а не только два самых очевидных —
// иначе демо честно не показывает часть реальной конфигурируемости bx-rest.
import { BXRestSettings } from 'bx-rest'
import { t, type AuthModeId } from './i18n'
import { emitStorageWarning } from './notifications'

export type { AuthModeId } from './i18n'

export interface Connection {
  /** URL портала, например https://example.bitrix24.ru — не нужен только для webhook (там свой полный URL). */
  portalUrl: string
  authMode: AuthModeId
  /** Смысл зависит от режима: токен, URL вебхука, либо не используется (embedded-sessid/oauth2-cookie). */
  value: string
}

export const EMPTY_CONNECTION: Connection = {
  portalUrl: '',
  authMode: 'token-function',
  value: ''
}

/** Порядок пунктов в выпадающем списке режима авторизации. */
export const AUTH_MODE_ORDER: AuthModeId[] = [
  'token-function',
  'token-localStorage',
  'token-cookie',
  'webhook',
  'embedded-sessid',
  'oauth2-cookie'
]

export type ValueKind = 'token' | 'webhookUrl' | 'none'

export interface AuthModeMeta {
  needsPortalUrl: boolean
  valueKind: ValueKind
}

/** Какие поля формы имеют смысл для каждого режима — используется и для валидации, и для рендера полей. */
export const AUTH_MODE_META: Record<AuthModeId, AuthModeMeta> = {
  'token-function': { needsPortalUrl: true, valueKind: 'token' },
  'token-localStorage': { needsPortalUrl: true, valueKind: 'token' },
  'token-cookie': { needsPortalUrl: true, valueKind: 'token' },
  webhook: { needsPortalUrl: false, valueKind: 'webhookUrl' },
  'embedded-sessid': { needsPortalUrl: true, valueKind: 'none' },
  'oauth2-cookie': { needsPortalUrl: true, valueKind: 'none' }
}

const STORAGE_KEY = 'bx-rest-demo:connection'

function isAuthModeId(value: unknown): value is AuthModeId {
  return typeof value === 'string' && (AUTH_MODE_ORDER as string[]).includes(value)
}

/**
 * Загружает последнее сохранённое подключение из localStorage браузера
 * (если есть). Вызывается автоматически при старте приложения, до всякого
 * действия пользователя — поэтому при сбое только пишем в консоль, без
 * тоста (навязчиво показывать предупреждение раньше, чем человек вообще
 * что-то сделал).
 */
export function loadConnection(): Connection | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<Connection>
    if (typeof parsed.value !== 'string' || typeof parsed.portalUrl !== 'string') return null
    return {
      portalUrl: parsed.portalUrl,
      authMode: isAuthModeId(parsed.authMode) ? parsed.authMode : 'token-function',
      value: parsed.value
    }
  } catch (error) {
    console.warn('[bx-rest-demo] Не удалось прочитать сохранённое подключение из localStorage', error)
    return null
  }
}

/**
 * Сохраняет подключение в localStorage браузера — только локально, никуда
 * не отправляется. Вызывается по явному действию пользователя (кнопка
 * «Подключить»), поэтому при сбое — и тост, и полная ошибка в консоль.
 */
export function saveConnection(connection: Connection): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(connection))
  } catch (error) {
    emitStorageWarning(t.errors.storageUnavailable, error)
  }
}

export function clearConnection(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    emitStorageWarning(t.errors.storageUnavailable, error)
  }
}

export function isConnectionValid(connection: Connection): boolean {
  const meta = AUTH_MODE_META[connection.authMode]
  if (meta.needsPortalUrl && connection.portalUrl.trim().length === 0) return false
  if (meta.valueKind !== 'none' && connection.value.trim().length === 0) return false
  return true
}

function urlsFor(connection: Connection) {
  return {
    source: 'string' as const,
    key: connection.portalUrl,
    additional_part: 'rest'
  }
}

/**
 * Применяет подключение к глобальным настройкам bx-rest (BXRestSettings.update).
 * Для localStorage/cookie-режимов демо само пишет введённое значение в
 * соответствующее хранилище — иначе показывать эти режимы в отдельном
 * (не встроенном в Bitrix) приложении было бы бессмысленно.
 */
export function applyConnection(connection: Connection): void {
  switch (connection.authMode) {
    case 'token-function':
      BXRestSettings.update({
        auth: { source: () => connection.value, key: 'auth' },
        urls: urlsFor(connection)
      })
      return

    case 'token-localStorage':
      try {
        localStorage.setItem('auth', connection.value)
      } catch (error) {
        emitStorageWarning(t.errors.storageUnavailable, error)
      }
      BXRestSettings.update({
        auth: { source: 'localStorage', key: 'auth' },
        urls: urlsFor(connection)
      })
      return

    case 'token-cookie':
      try {
        document.cookie = `auth=${encodeURIComponent(connection.value)}; path=/`
      } catch (error) {
        emitStorageWarning(t.errors.storageUnavailable, error)
      }
      BXRestSettings.update({
        auth: { source: 'cookies', key: 'auth' },
        urls: urlsFor(connection)
      })
      return

    case 'webhook':
      BXRestSettings.update({
        auth: { source: 'off', key: 'auth' },
        urls: { source: 'string', key: connection.value, additional_part: '' }
      })
      return

    case 'embedded-sessid':
      BXRestSettings.update({
        auth: { source: 'cookies', key: 'sessid' },
        urls: urlsFor(connection)
      })
      return

    case 'oauth2-cookie':
      // README: "любой источник, возвращающий непустое значение" — само
      // значение никуда не отправляется, только включает withCredentials.
      BXRestSettings.update({
        auth: { source: () => 'oauth2', key: 'OAuth2' },
        urls: urlsFor(connection)
      })
      return
  }
}
