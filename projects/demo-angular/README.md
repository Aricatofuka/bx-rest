# bx-rest — демо на Angular

Живой пример использования [`bx-rest`](../bx-rest) в Angular-приложении:
подключение к порталу Bitrix24, редактор кода на Monaco с 
автодополнением по типам библиотеки и панель результата, которая реально
выполняет написанный код против вашего портала.

Это отдельный Angular CLI workspace (свой `angular.json`), не зарегистрированный
в корневом `angular.json` репозитория — см. обоснование в README библиотеки,
раздел «Демо».

DI-провайдеры для `bx-rest` — как в README библиотеки, раздел «Использование
в Angular» ([src/app/bx-rest.providers.ts](src/app/bx-rest.providers.ts)).
В отличие от статичного примера в README, портал/токен здесь вводит
пользователь — `BXRestSettings.update(...)` вызывается не при старте
приложения, а реактивно, при нажатии «Подключить» (`applyConnection` из
`bx-rest-demo-shared`).

UI собран на [Angular Material](https://material.angular.io/) (`mat-form-field`,
`mat-select`, `mat-chip`, `mat-card`, `mat-button`) — идиоматичный выбор
именно для Angular, в отличие от простой разметки в React/Vue-демо.
Добавлен через `ng add @angular/material`, плюс `provideAnimationsAsync()`
в [src/app/app.config.ts](src/app/app.config.ts) (нужен Material-компонентам
для анимаций) и пакет `@angular/animations` (схема `ng add` не ставит его
сама — только настраивает провайдер).

Тема — не стандартная светлая заготовка (`prebuilt-themes/indigo-pink.css`),
а тёмная тема через системный API Material 3
([src/styles.scss](src/styles.scss), `@include mat.theme((color: (theme-type: dark, ...))`),
и она фиксированная (не подстраивается под системную light/dark, всегда
тёмная) — со светлой заготовкой поверх тёмного фона страницы получался
эффект «далматинца» (тёмная страница, но белые карточки Material). Все три
демо теперь тёмные для единообразия — см. переменные в `src/index.css`
(React) и `src/style.css` (Vue).

Редактор — [`ngx-monaco-editor-v2`](https://www.npmjs.com/package/ngx-monaco-editor-v2),
а не «сырой» `monaco-editor`: эта библиотека сама решает вопрос с воркерами
Monaco под esbuild-сборщиком Angular CLI (грузит monaco классическим
AMD-лоадером из `assets/monaco`, см. `angular.json`), поэтому не нужна
ручная настройка `new Worker(...)`, как в React/Vue-демо. Типы bx-rest
регистрируются в момент, когда библиотека сообщает, что `window.monaco`
готов — колбэк `onMonacoLoad` в [src/app/app.config.ts](src/app/app.config.ts).

## Запуск

Из корня репозитория (нужно один раз собрать библиотеку и общий пакет демо):

```shell
npm run demo:bootstrap
```

Либо вручную:

```shell
# из корня репозитория
npm run build

# здесь
npm install
npm start
```

## Как пользоваться

1. Выберите режим авторизации — доступны все варианты из README библиотеки,
   раздел «Аутентификация и OAuth2» (access-токен функцией/localStorage/cookie,
   входящий вебхук, встроенная сессия Bitrix, OAuth2 через cookie), а не
   только самые очевидные два. Для localStorage/cookie-режимов демо само
   пишет введённое значение в соответствующее хранилище браузера при
   подключении; «встроенная сессия» и «OAuth2 через cookie» по сути
   демонстрационные — по-настоящему работают только внутри iframe Bitrix24
   или с поддержкой credentialed CORS соответственно (об этом сказано в
   подсказке под выбором режима).
2. Укажите URL портала (кроме режима «Входящий вебхук» — там свой полный URL).
3. Нажмите «Подключить». Всё сохраняется только в localStorage браузера.
4. Выберите готовый пример над редактором или напишите свой код, используя
   `bxRest.*` — Monaco подскажет доступные методы и поля параметров.
5. Заверните результат в `show(...)` и нажмите «Запустить».

Язык интерфейса определяется автоматически по `navigator.language`
(русский — если он русский, иначе английский), без переключателя — см.
`bx-rest-demo-shared/src/i18n.ts`.

## Заметки для тех, кто будет это поддерживать

- Бюджет размера бандла в `angular.json` (`configurations.production.budgets`)
  сильно завышен относительно стандартного Angular-шаблона: в бандл попадает
  весь сгенерированный `bx-rest-demo-shared/src/generated/typeFiles.ts`
  (реальные `.d.ts` bx-rest и rxjs, нужны для автодополнения) и пакет
  `typescript` (нужен для выполнения кода из редактора, см.
  `bx-rest-demo-shared/src/sandbox.ts`). Для демо это нормально; для
  боевого приложения так делать не нужно.
- `source-map-support` — пакет `typescript` лениво делает
  `require('source-map-support').install()`, но только в Node-окружении (в
  браузере эта ветка не выполняется); тем не менее и dev-сервер, и `ng build`
  пытаются резолвить этот `require` и падают на Node-only `path` внутри
  самого `source-map-support`. Пришлось чинить по-разному для двух режимов
  сборки, потому что они резолвят зависимости по-разному:
  - **dev-сервер** (`ng serve`, Vite-based) применяет `paths` из
    `tsconfig.json` даже для require из вложенных зависимостей — поэтому там
    работает алиас на пустышку [src/shims/source-map-support.ts](src/shims/source-map-support.ts).
  - **`ng build`** (esbuild) этот алиас для require из чужого CJS-пакета
    игнорирует, зато `externalDependencies: ["source-map-support"]` в
    `configurations.production` там работает нормально — в продакшен-сборке
    недостижимый код всё равно удаляется как мёртвый, так что
    неразрешённый внешний импорт ни на что не влияет.
  - Именно поэтому `externalDependencies` объявлен только в
    `configurations.production`, а не в общих `options` — если добавить его
    туда, dev-сервер снова падает с `Failed to resolve module specifier
    "source-map-support"`.
- `baseUrl` в `provideMonacoEditor(...)` ([src/app/app.config.ts](src/app/app.config.ts))
  собран как **полный** URL (`window.location.origin + '/assets/monaco/min/vs'`),
  а не путь вида `/assets/...`. Воркер TypeScript сам порождает вложенный
  воркер и резолвит путь до его скрипта уже не от адреса страницы, а от
  собственного base — с относительным или даже корневым путём это падает с
  `Failed to parse URL`, помогает только полностью квалифицированный URL.
