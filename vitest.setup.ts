// Некоторые модули (например, src/functions/serializeJavascript.ts) на верхнем
// уровне обращаются к window.crypto, рассчитывая на браузерное окружение.
// Тесты гоняются в environment: 'node', поэтому здесь эмулируем минимально
// необходимую часть window, чтобы такие модули не падали при импорте.
if (typeof (globalThis as any).window === 'undefined') {
  ;(globalThis as any).window = { crypto: globalThis.crypto }
}
