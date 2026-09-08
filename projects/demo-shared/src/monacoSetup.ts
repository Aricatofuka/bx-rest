// Настройка Monaco под bx-rest: реальные типы библиотеки (не текстовое поле
// "угадай метод") + пара ambient-объявлений для песочницы (см. sandbox.ts).
// Зависимость от monaco-editor — только типовая (import type), сам пакет
// подключает и грузит конкретное демо-приложение (React/Vue/Angular).
import type * as Monaco from 'monaco-editor'
import { typeFiles } from './generated/typeFiles'

// declare-объявления для двух ambient-имён, которые видит код в редакторе:
// bxRest — уже настроенный клиент, show — вывод результата Observable в UI.
// Больше в песочнице ничего не объявлено умышленно: один явный способ
// получить результат вместо угадывания "что тут возвращается автоматически".
const SANDBOX_AMBIENT_LIB = `
declare const bxRest: import('bx-rest').BXRestNavvy
/** Подписывается на Observable и выводит его результат в панели ниже. */
declare function show<T>(source: import('rxjs').Observable<T>): void
`

let configured = false

/**
 * Регистрирует типы bx-rest (и нужный для его сигнатур кусок rxjs) в
 * Monaco как extra libs, плюс ambient-глобалы песочницы. Вызывать один раз
 * до создания редактора (повторные вызовы безопасны, но избыточны).
 */
export function configureBxRestTypes(monaco: typeof Monaco): void {
  if (configured) return
  configured = true

  const defaults = monaco.languages.typescript.typescriptDefaults

  defaults.setCompilerOptions({
    target: monaco.languages.typescript.ScriptTarget.ESNext,
    module: monaco.languages.typescript.ModuleKind.ESNext,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    allowNonTsExtensions: true,
    esModuleInterop: true,
    strict: true,
    skipLibCheck: true
  })

  defaults.setDiagnosticsOptions({
    noSemanticValidation: false,
    noSyntaxValidation: false
  })

  if (typeFiles.length === 0) {
    console.warn(
      '[bx-rest-demo] Типы bx-rest не сгенерированы (projects/demo-shared/src/generated/typeFiles.ts пуст). ' +
        'Выполните `npm run build` в projects/demo-shared (после `npm run build` в корне репозитория) — автодополнение в редакторе будет неполным.'
    )
  }

  for (const file of typeFiles) {
    defaults.addExtraLib(file.content, `file:///node_modules/${file.path}`)
  }

  defaults.addExtraLib(SANDBOX_AMBIENT_LIB, 'file:///bx-rest-demo-sandbox.d.ts')

  // Прогреваем TS-воркер сразу, а не откладываем это до первого набора текста
  // пользователем: ему придётся один раз проиндексировать ~1000 extra libs,
  // и лучше сделать это в фоне, пока человек ещё читает форму подключения.
  // getTypeScriptWorker() отклоняется с "TypeScript not registered!", пока
  // режим TypeScript не активирован созданием редактора/модели — вызывающий
  // код (React/Vue/Angular) не гарантирует такой порядок, поэтому пробуем
  // несколько раз вместо необработанного отказа промиса.
  void warmUpTypeScriptWorker(monaco)
}

async function warmUpTypeScriptWorker(monaco: typeof Monaco, attemptsLeft = 20): Promise<void> {
  try {
    const getWorker = await monaco.languages.typescript.getTypeScriptWorker()
    await getWorker()
  } catch {
    if (attemptsLeft <= 0) return
    await new Promise(resolve => setTimeout(resolve, 150))
    await warmUpTypeScriptWorker(monaco, attemptsLeft - 1)
  }
}

export const DEFAULT_EDITOR_OPTIONS: Monaco.editor.IStandaloneEditorConstructionOptions = {
  language: 'typescript',
  automaticLayout: true,
  minimap: { enabled: false },
  fontSize: 13,
  scrollBeyondLastLine: false,
  tabSize: 2
}
