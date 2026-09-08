// Выполнение кода из редактора. Код в редакторе — это тело скрипта, а не
// ES-модуль: пользователь пишет обычные top-level выражения, используя
// ambient-переменные `bxRest`/`show`, объявленные для Monaco в
// monacoSetup.ts. Так не нужно городить import maps/blob-модули в браузере —
// достаточно ts.transpileModule (снять типы) + new Function (выполнить).
import * as ts from 'typescript'
import { locale } from './i18n'

const NOT_OBSERVABLE_MESSAGE = {
  ru: 'show() ожидает RxJS Observable — например, результат вызова .res() или .resAll()',
  en: 'show() expects an RxJS Observable — e.g. the result of calling .res() or .resAll()'
}

export type SandboxResultStatus = 'pending' | 'next' | 'error' | 'complete'

export interface SandboxResult {
  /** Порядковый номер вызова show() в рамках одного запуска — по нему UI группирует карточки результата. */
  callId: number
  status: SandboxResultStatus
  value?: unknown
}

export interface RunSnippetContext {
  /** Экземпляр BXRestNavvy, уже настроенный через applyConnection(). */
  bxRest: unknown
  onResult: (result: SandboxResult) => void
}

interface SubscribableLike {
  subscribe(observer: { next: (value: unknown) => void; error: (error: unknown) => void; complete: () => void }): unknown
}

function isSubscribable(value: unknown): value is SubscribableLike {
  return typeof value === 'object' && value !== null && typeof (value as SubscribableLike).subscribe === 'function'
}

function describeError(error: unknown): unknown {
  if (error instanceof Error) {
    const withApiFields = error as Error & { error?: unknown; error_description?: unknown }
    const described: Record<string, unknown> = { name: error.name, message: error.message }
    if (withApiFields.error !== undefined) described.error = withApiFields.error
    if (withApiFields.error_description !== undefined) described.error_description = withApiFields.error_description
    return described
  }
  return error
}

/**
 * Сворачивает поток событий show() в список «последнее известное состояние
 * на каждый callId» — так его удобно рендерить в UI. `complete` не несёт
 * значения (оно уже пришло раньше через `next`), поэтому явно сохраняем
 * последнее полученное значение, а не затираем его пустым — иначе после
 * завершения обычного одноразового REST-вызова карточка результата
 * показывала бы статус "Готово" без самого JSON-ответа.
 */
export function mergeSandboxResult(results: SandboxResult[], incoming: SandboxResult): SandboxResult[] {
  const index = results.findIndex(r => r.callId === incoming.callId)
  const previous = index === -1 ? undefined : results[index]
  const merged: SandboxResult = {
    ...incoming,
    value: incoming.status === 'complete' ? previous?.value : incoming.value
  }

  const next = index === -1 ? [...results, merged] : results.map((r, i) => (i === index ? merged : r))
  return next.sort((a, b) => a.callId - b.callId)
}

/**
 * Транспилирует и выполняет код из редактора. Ошибки транспорта и API
 * (BXRestApiError) приходят в onResult({ status: 'error' }) точно так же,
 * как в реальном приложении они пришли бы в колбэк `error` подписки —
 * это заодно демонстрирует раздел README «Обработка ошибок».
 */
export function runSnippet(code: string, ctx: RunSnippetContext): void {
  let callCounter = 0

  const show = (source: unknown): void => {
    const callId = ++callCounter
    if (!isSubscribable(source)) {
      ctx.onResult({
        callId,
        status: 'error',
        value: NOT_OBSERVABLE_MESSAGE[locale]
      })
      return
    }
    ctx.onResult({ callId, status: 'pending' })
    source.subscribe({
      next: value => ctx.onResult({ callId, status: 'next', value }),
      error: error => ctx.onResult({ callId, status: 'error', value: describeError(error) }),
      complete: () => ctx.onResult({ callId, status: 'complete' })
    })
  }

  let transpiled: string
  try {
    const result = ts.transpileModule(code, {
      compilerOptions: {
        target: ts.ScriptTarget.ES2022,
        module: ts.ModuleKind.ESNext
      },
      reportDiagnostics: false
    })
    transpiled = result.outputText
  } catch (error) {
    ctx.onResult({ callId: ++callCounter, status: 'error', value: describeError(error) })
    return
  }

  try {
    // eslint-disable-next-line no-new-func -- это и есть песочница демо: выполняем код из редактора
    const runner = new Function('bxRest', 'show', transpiled)
    runner(ctx.bxRest, show)
  } catch (error) {
    ctx.onResult({ callId: ++callCounter, status: 'error', value: describeError(error) })
  }
}
