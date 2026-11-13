import { defer, from, Observable, throwError } from 'rxjs'
import { catchError, switchMap } from 'rxjs/operators'
import { httpErrorResponse, parseBXRestErrorBody } from '../../functions/errors'
import { BXRestContext, globalContext } from '../context'

/**
 * Коды ошибок Bitrix, которые лечатся продлением токена. `expired_token` —
 * единственный системный код, для которого документация Bitrix24 советует
 * "обновить токены и повторить вызов". `invalid_token` в списке системных
 * ошибок документации нет, но так же считает официальный `@bitrix24/b24jssdk`.
 *
 * Остальные системные ошибки тоже приходят со статусом 401
 * (`insufficient_scope`, `NO_AUTH_FOUND`, `ACCESS_DENIED`,
 * `INVALID_CREDENTIALS`, `user_access_error`, ...), но новый токен их
 * не исправит — поэтому смотрим на код, а не только на статус.
 */
const AUTH_ERROR_CODES = ['expired_token', 'invalid_token']

/**
 * Условие продления по умолчанию (`BXRestSettings.auth.isAuthError`):
 * - ответ с ошибкой Bitrix `expired_token` или `invalid_token` — при любом статусе;
 * - ответ 401 без тела ошибки Bitrix — например, пустой ответ своего
 *   бэкенд-прокси, у которого нет действующего токена.
 *
 * Ответ 401 с другим кодом Bitrix ошибкой авторизации не считается
 */
export function isBXRestAuthError(error: unknown): boolean {
  const response = httpErrorResponse(error)
  if (!response) {
    return false
  }
  const parsed = parseBXRestErrorBody(response.data)
  if (parsed) {
    return AUTH_ERROR_CODES.includes(parsed.error)
  }
  return response.status === 401
}

// Состояние продления живёт в контексте клиента (BXRestContext): у глобальных
// настроек оно одно на всю библиотеку, у каждого new BXRestNavvy(settings) —
// своё. pendingRefresh — идущее сейчас продление, его ждут все упавшие
// запросы клиента; refreshCount — сколько продлений уже завершилось успешно.
function sharedRefresh(refresh: () => Promise<unknown>, ctx: BXRestContext): Promise<void> {
  if (!ctx.pendingRefresh) {
    ctx.pendingRefresh = Promise.resolve()
      // Через then, чтобы синхронное исключение в refresh() тоже стало
      // отклонённым промисом, а не вылетело из catchError
      .then(() => refresh())
      .then(() => {
        ctx.refreshCount++
      })
      .finally(() => {
        ctx.pendingRefresh = undefined
      })
  }
  return ctx.pendingRefresh
}

/**
 * Повтор запроса после продления авторизации (`BXRestSettings.auth.refresh`).
 *
 * `request$` должен быть "холодным" и читать настройки при подписке (как
 * `defer()` в HttpBXServices): повтор — это повторная подписка, поэтому
 * токен, адрес и заголовки берутся уже новые. На второй попытке ошибка не
 * перехватывается — запрос повторяется не больше одного раза.
 *
 * `ctx` — контекст клиента, из которого берутся `refresh`, `isAuthError` и
 * общее состояние продления
 */
export function withAuthRefresh<T>(request$: Observable<T>, ctx: BXRestContext = globalContext): Observable<T> {
  return defer(() => {
    const { refresh, isAuthError = isBXRestAuthError } = ctx.settings.auth
    if (!refresh) {
      return request$
    }

    const refreshCountAtStart = ctx.refreshCount
    return request$.pipe(
      catchError((error: unknown) => {
        if (!isAuthError(error)) {
          return throwError(() => error)
        }
        // Пока этот запрос был в пути, токен уже продлили по ошибке другого
        // запроса — повторяем без нового продления
        const refreshed = (ctx.refreshCount !== refreshCountAtStart)
          ? Promise.resolve()
          : sharedRefresh(refresh, ctx)

        return from(refreshed).pipe(
          catchError((refreshError: unknown) => {
            if (error && typeof error === 'object') {
              (error as { authRefreshError?: unknown }).authRefreshError = refreshError
            }
            return throwError(() => error)
          }),
          switchMap(() => request$)
        )
      })
    )
  })
}
