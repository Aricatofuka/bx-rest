# План развития bx-rest

Обновлён 2026-11-10. Собран по итогам аудита проекта и решений по нему.

1.5.1 выпущена 2026-11-06 (коммит `111a9c5`, тег `v1.5.1`). 1.6.0 подготовлена к выпуску 2026-11-10: клиент со своими настройками, транспорт, удаление мёртвого кода и мелкие правки, см. [раздел 3](#3-архитектура) и [CHANGELOG](projects/bx-rest/CHANGELOG.md). Тег `v1.6.0` ставится на коммит выпуска.

Что дальше — разделы 2 (CI и публикация демо), 4 (pull), 5 (учёт времени) и пагинация из 3.3.

| Раздел | Статус |
| --- | --- |
| [1. Мелкие правки](#1-мелкие-правки) | Сделаны в 1.6.0 (2026-11-10) |
| [2. CI и публикация демо](#2-ci-и-публикация-демо) | Предложение. Демо для Node (`projects/demo-node`, режим `npm run mock`) можно запускать в CI как проверку собранного пакета |
| [3. Архитектура](#3-архитектура) | 3.1, 3.2 и 3.4 вошли в 1.6.0, 3.3 (пагинация) — следующая |
| [4. Веб-сокеты: раздел pull](#4-веб-сокеты-раздел-pull) | Внесено в план, нужно решение по клиенту |
| [5. Учёт времени в задачах](#5-учёт-времени-в-задачах) | Безопасное вошло в 1.5.1, остальное ждёт проверки на портале |
| [6. Отложено](#6-отложено) | Публичный batch, типизация |
| [7. Закрыто без изменений](#7-закрыто-без-изменений) | Пустой `urls.key`, даты в формате США |
| [8. Без решения](#8-без-решения) | Пока не обсуждалось |

## 1. Мелкие правки

Сделаны 2026-11-10: уникальный `ELEMENT_CODE` с повтором при совпадении, текст ошибки в диске, уточнение README про базовый адрес (раздел «Обработка ошибок»). Попутно исправлена TS1479 под `nodenext`.

Исправление `getListByIDTask([])` отсюда уже вошло в 1.5.1, см. [раздел 5](#5-учёт-времени-в-задачах).

### Уникальный `ELEMENT_CODE` в `startProcFormNewsFeed`

[bizproc.ts:50](projects/bx-rest/src/request-navvy/bizproc.ts#L50). Сейчас код собирается как `'trace_studio_' + Date.now() + '_' + Math.random()`: префикс от другого приложения, а `Math.random()` не криптостойкий.

Случайное значение само по себе не даёт строгих 100%, поэтому нужны две части:

1. Код из 128 случайных бит. `crypto.randomUUID()` не подходит: на страницах по http его нет.

   ```ts
   function uniqueElementCode(): string {
     const bytes = crypto.getRandomValues(new Uint8Array(16))
     return 'bx_rest_' + Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('')
   }
   ```

2. Повтор при совпадении. Только портал знает занятые коды, поэтому на ответ `ERROR_ELEMENT_ALREADY_EXISTS` создаём новый код и повторяем запрос. Вызов идёт с `{ throwOnApiError: true }`, иначе ошибка в ответе 2xx превратится в `undefined`.

Что учесть:

- В Node 18, который разрешён в `engines`, нет глобального `crypto`, нужен запасной вариант.
- Код ошибки взят из [документации](https://apidocs.bitrix24.com/api-reference/lists/elements/lists-element-add.html) и на портале не проверялся.
- Документация не описывает допустимые символы кода, поэтому берём только латиницу, цифры и `_`.

### Чужой текст ошибки в диске

[operation.ts:103](projects/bx-rest/src/request-navvy/disk/operation.ts#L103). Если `getOfCreateRootFolderApp()` не получил хранилище приложения, он сообщает: «Отсутствуют права добавление записи затраченного времени». Текст скопирован из учёта времени ([elapseditem.ts:249](projects/bx-rest/src/request-navvy/task/operation/elapseditem.ts#L249), там в 1.5.1 исправлено «права на добавление»), к диску он не относится и уводит в сторону при разборе ошибки.

Сделано: текст заменён на `Could not get the app storage`. 2026-11-10 все сообщения ошибок, которые библиотека создаёт сама, переведены на английский.

### Токен внутри `BXRestApiError.cause` (решено: не маскировать)

Решено 2026-11-10: не маскировать. Как обращаться с токеном в ошибках, решает разработчик приложения, ошибка axios доходит до него как есть. Маскировку сделали в шаге 3 и убрали тем же днём: удаление `request` ломало обработку сетевых ошибок по образцу из документации axios. В README, в разделе «Обработка ошибок», есть предупреждение. Ниже — исходное описание проблемы.

Когда запрос падает, `BXRestApiError` хранит в `cause` исходную ошибку axios, а в ней лежит весь отправленный запрос. Проверено на ответе 401 `expired_token`:

| Что смотрим | Есть токен? |
| --- | --- |
| `err.message` | Нет |
| `err.cause.config.data` | Да: `{"select":["ID"],"filter":{},"start":0,"auth":"SECRET-TOKEN-123"}` |
| `console.error(err)` в Node | Да |
| `JSON.stringify(err.cause)` | Да |

Сама библиотека с 1.5.1 такие ошибки не логирует, но приложение вполне может написать `console.error(err)` или отправить ошибку в систему сбора ошибок, и токен уйдёт вместе с ней.

Предложение: в HTTP-слое заменять токен на `***` в `config.data` и `config.url` и убирать `request`, чтобы это работало и для сырой ошибки `.resVanilla()`. Документированный `cause.response` не меняется. Проверка: `inspect(err, { depth: null })` и `JSON.stringify(err.cause)` не содержат токена.

### Уточнить README про базовый URL

[README.md:209](projects/bx-rest/README.md#L209) обещает `Error` при «отсутствии базового URL». На деле ошибка возникает, только если пусты и `urls.key`, и `additional_part`. См. [раздел 7](#7-закрыто-без-изменений). То же в `README.en.md`.

## 2. CI и публикация демо

### Тесты уже запускаются

[ci.yml](.github/workflows/ci.yml) на каждый пуш в `main` и на каждый PR прогоняет линт, тесты и сборку на Node 20 и 22. Последние 6 запусков на GitHub успешны.

Чего в CI не хватает:

- сборки трёх демо;
- установки собранного пакета в чистый проект с проверкой типов под `bundler` и `nodenext`;
- контроля размера: бандл только с `BXRestFrame` должен оставаться около 8 КБ;
- снимка «метод и REST-имя» (1553 строки), который поймает случайное переименование;
- `npm audit --omit=dev`;
- проверки, что корневые README и CHANGELOG совпадают с исходными из `projects/bx-rest`.

### Куда выкладывать демо: GitHub Pages

Репозиторий публичный, Pages пока не включён. Это бесплатно, с HTTPS и без своего сервера, а демо полностью статические. Адреса будут такими:

- `https://aricatofuka.github.io/bx-rest/vue/`
- `https://aricatofuka.github.io/bx-rest/react/`
- `https://aricatofuka.github.io/bx-rest/angular/`

Проверено локально: демо собраны под этими подпутями и открыты в Chrome. Страница, редактор Monaco и его воркеры загружаются без ошибок, общий размер около 135 МБ. Запросы к порталу с такой страницы и сам workflow ниже ещё не запускались.

Что сделать:

1. Исправить Angular-демо. [app.config.ts:25](projects/demo-angular/src/app/app.config.ts#L25) строит путь к Monaco от корня домена, поэтому под подпутём редактор не загружается. Правка в одну строку, проверена на копии:

   ```ts
   baseUrl: new URL('assets/monaco/min/vs', document.baseURI).href,
   ```

2. Включить в настройках репозитория: Settings, Pages, Source: GitHub Actions.
3. Добавить `.github/workflows/demos.yml` и простую `index.html` со ссылками на три демо в корень `_site`:

   ```yaml
   name: Demos

   on:
     push:
       branches: [main]
     workflow_dispatch:

   permissions:
     contents: read
     pages: write
     id-token: write

   concurrency:
     group: pages
     cancel-in-progress: true

   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: actions/setup-node@v4
           with:
             node-version: 22.x
             cache: npm
         - run: npm ci
         - run: npm run demo:bootstrap
         - run: npm run build -- --base=/bx-rest/vue/
           working-directory: projects/demo-vue
         - run: npm run build -- --base=/bx-rest/react/
           working-directory: projects/demo-react
         - run: npm run build -- --base-href /bx-rest/angular/
           working-directory: projects/demo-angular
         - run: |
             mkdir -p _site
             cp -r projects/demo-vue/dist _site/vue
             cp -r projects/demo-react/dist _site/react
             cp -r projects/demo-angular/dist/demo-angular/browser _site/angular
         - uses: actions/upload-pages-artifact@v3
           with:
             path: _site

     deploy:
       needs: build
       runs-on: ubuntu-latest
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       steps:
         - id: deployment
           uses: actions/deploy-pages@v4
   ```

Ограничения:

- Установить такую страницу в портал как приложение не получится: Bitrix24 открывает приложение POST-запросом, а Pages отвечает на POST кодом 405 (проверено). Как отдельная страница с формой подключения демо работает, `BXRestFrame` оно не использует.
- Демо сохраняет подключение вместе с токеном в `localStorage` ([connection.ts:92](projects/demo-shared/src/connection.ts#L92)). На `aricatofuka.github.io` это хранилище общее для всех проектов Pages этого аккаунта. На странице стоит предупредить, что подключать нужно тестовый портал.

## 3. Архитектура

Клиента со своими настройками и транспорт логично делать вместе: транспорт живёт в том же контексте клиента. Старый API остаётся, поэтому это `1.6.0`, а не мажорная версия.

### 3.1 Клиент со своими настройками

Настройки глобальные, поэтому один процесс обслуживает один портал. Запрос, созданный для портала A, уходит на портал B с токеном B, если настройки успели смениться. На сервере с несколькими порталами это риск смешать токены клиентов.

Решено: настройки передаются в конструктор `BXRestNavvy`. Отдельной функции `createBXRest` не будет, чтобы у библиотеки осталась одна точка входа.

Как будет выглядеть в приложении:

```ts
// Как сейчас: один портал на процесс. Работает без изменений.
BXRestSettings.update({ auth: { /* ... */ }, urls: { /* ... */ } })
const bx = new BXRestNavvy()

// Новое: несколько порталов в одном процессе.
const portalA = new BXRestNavvy({
  auth: { source: () => tokenA, key: 'auth' },
  urls: { source: 'string', key: 'https://a.bitrix24.ru', additional_part: 'rest' }
})
const portalB = new BXRestNavvy({
  auth: { source: () => tokenB, key: 'auth' },
  urls: { source: 'string', key: 'https://b.bitrix24.ru', additional_part: 'rest' }
})

const deals = await firstValueFrom(
  portalA.crm.deal.list({ select: ['ID'], filter: {}, start: 0 }).resAll()
)
```

Как устроено внутри. Настройки читают всего два места, [sessionKey.ts:34](projects/bx-rest/src/services/http/sessionKey.ts#L34) и [authRefresh.ts:71](projects/bx-rest/src/services/http/authRefresh.ts#L71), поэтому им достаточно подставить контекст клиента:

```ts
// services/context.ts (новый файл)
export class BXRestContext {
  // Было модульными переменными в authRefresh.ts
  pendingRefresh: Promise<void> | undefined
  refreshCount = 0

  constructor(private readonly own?: iBXRestSettings) {}

  get settings(): iBXRestSettings {
    return this.own ?? BXRestSettings.value
  }
}

export const globalContext = /* @__PURE__ */ new BXRestContext()
let current = globalContext

export function currentContext(): BXRestContext {
  return current
}

export function runInContext<T>(ctx: BXRestContext, build: () => T): T {
  const previous = current
  current = ctx
  try {
    return build()
  } finally {
    current = previous
  }
}

// Для конструктора BXRestNavvy: там контекст включается и сбрасывается в разных местах
const previousContexts: BXRestContext[] = []

export function enterContext(ctx: BXRestContext): void {
  previousContexts.push(current)
  current = ctx
}

export function leaveContext(): void {
  current = previousContexts.pop() ?? globalContext
}
```

`BXRestNavvy` включает контекст через базовый класс. Поля с разделами (`crm`, `tasks` и остальные) создаются сразу после `super()`, раньше тела конструктора, поэтому к этому моменту контекст клиента уже должен быть включён. Набросок:

```ts
// rest/navvy.ts
class BXRestNavvyContext {
  constructor(settings?: iBXRestSettings) {
    // Без настроек — явно глобальный контекст, а не текущий: см. «Что учесть»
    enterContext(settings ? new BXRestContext(settings) : globalContext)
  }
}

export class BXRestNavvy extends BXRestNavvyContext {
  public readonly crm = new BXRestNavvyCrm()   // создаётся уже в контексте клиента
  // ... остальные поля без изменений

  constructor(settings?: iBXRestSettings) {
    super(settings)
    leaveContext()                              // поля уже созданы
  }
}
```

Такой порядок проверен на небольшом примере при обоих значениях `useDefineForClassFields`: вложенные объекты получают настройки клиента, а после конструктора контекст возвращается к прежнему. На коде библиотеки этот вариант ещё не запускался.

```diff
 // services/http/sessionKey.ts
 export class SessionKeyServices {
+  readonly ctx = currentContext()

   private get BX_REST_SETTINGS() {
-    return BXRestSettings.value
+    return this.ctx.settings
   }

 // services/navvy.ts
 export class Navvy {
+  private readonly ctx = currentContext()

   pagNav<T, R, A extends iBXRestPagination>(url: string[], arg: A, map?: (param: T[] | undefined) => R[] | undefined) {
-    return new NavvyPag(url, arg, map)
+    return runInContext(this.ctx, () => new NavvyPag(url, arg, map))
   }
```

Ещё `authRefresh.ts` берёт настройки и состояние продления из контекста, а [HttpBX.ts](projects/bx-rest/src/services/http/HttpBX.ts) передаёт туда `this.session.ctx`.

Файлы методов не меняются. [pull/config.ts](projects/bx-rest/src/request-navvy/pull/config.ts) остаётся как есть: его `new Navvy()` выполняется во время `new BXRestNavvy()` и сам подхватывает контекст клиента. Поэтому массовая правка 354 файлов не нужна.

**Логика вывода не меняется.** Мапперы и разбор ответа настроек не читают. Меняется только то, откуда `SessionKeyServices` берёт токен и адрес. Это проверено на прототипе вне репозитория. В прототипе контекст включала отдельная функция `createBXRest`, а не конструктор, но внутренняя часть та же: контекст, `SessionKeyServices`, `Navvy` и `authRefresh`.

| Проверка | Результат |
| --- | --- |
| Существующие 364 теста | Все прошли без правок |
| Инвентаризация методов: REST-имя, вид запроса, наличие маппера | 1553 строки, различий нет |
| `.res()`, `.resAll()`, `.resVanilla()`, `.mapForVanilla()` и `user.get` с маппером через глобальные настройки и через клиента со своими настройками | JSON совпадает полностью |
| Два клиента и глобальный клиент одновременно | Каждый запрос ушёл на свой адрес со своим токеном |
| `BXRestSettings.update()` между созданием запроса и подпиской | Применяется, как и раньше |
| Истёкший токен у одного из двух клиентов | `refresh` вызван один раз и только у него |
| Обход всех методов клиента | Ни один не привязан к чужому порталу |
| Объём правок | 5 файлов, 64 строки, и 2 новых файла |
| Создание одного клиента | Около 0,2 мс |
| Размер бандла только с `BXRestFrame` и с `BXRestNavvy` | Плюс 0,4 КБ и плюс 0,5 КБ |

Что учесть:

- `auth.source: 'localStorage'` и `'cookies'` читают общее хранилище браузера, поэтому два клиента с одним ключом получат один токен. Для нескольких порталов нужен `source` в виде функции.
- Объект, созданный вне `new BXRestNavvy()`, получает глобальный контекст. Для собственного `new Navvy()` у пользователя так и должно быть. Но если в методе библиотеки появится ленивый `new X()`, этот метод молча уйдёт на глобальные настройки. Поэтому обход всех методов надо добавить в тесты как обязательный.
- Контекст сбрасывается в конструкторе после создания полей, а не в `finally`: вокруг инициализаторов полей `try` не поставить. Если вложенный конструктор бросит исключение, контекст клиента останется текущим. Сейчас вложенные конструкторы только создают объекты и не падают. Чтобы такой сбой не увёл на чужой портал следующий клиент, `new BXRestNavvy()` без настроек явно включает глобальный контекст. Нужен тест: вложенный раздел падает при создании, а следующий `new BXRestNavvy()` всё равно идёт на глобальные настройки.
- Настройки получает только `BXRestNavvy`. Созданные пользователем напрямую `new Navvy()` и `new BXRestRequest()` работают с глобальными настройками. При необходимости им можно позже добавить такой же параметр.

Решено 2026-11-09: метода для смены настроек у готового клиента в 1.6.0 нет. Токен меняется через функцию `auth.source`, для другого портала создаётся новый клиент.

### 3.2 Транспорт: axios остаётся по умолчанию

Вошло в 1.6.0 (2026-11-10). Решения:

- `retryOnQueryLimit`, `timeout` и `throttle` — поля настроек: в `BXRestSettings` или у клиента `new BXRestNavvy(settings)`. `true` включает значения по умолчанию: 3 попытки с паузой от 1000 мс, 60 000 мс, 2 запроса в секунду. Число или объект задают свои значения. Пока поле не задано, всё работает как раньше.
- Порядок фиксирован: повтор, очередь `throttle`, таймаут, свои `middleware`, axios. Очередь `throttle` хранится в контексте клиента, поэтому разные порталы друг друга не ждут.
- `middleware` в настройках — для своих функций. Первая в списке — внешняя.
- Секреты в ошибках не маскируются: ошибка axios доходит как есть (решение 2026-11-10, см. раздел 1).
- Отписка отменяет HTTP-запрос.
- `logRequests` и `fetchTransport` из прототипа в 1.6.0 не вошли. Их можно добавить позже без поломок, а пока они пишутся как свои `middleware`.

Замеры по сравнению с 1.6.0 до транспорта (`9295477`):

| Проверка | Результат |
| --- | --- |
| Снимок методов | 1553 строки, без изменений |
| Вывод в 17 сценариях (успех, `.resAll()`, ошибки 400/401/404/502, ошибка в теле 2xx, сеть, `sessid`, GET) | Совпадает |
| Бандл только с `BXRestFrame`, `BXRestSettings`, `BXRestApiError` | Без изменений: 8310, 585, 647 Б |
| Бандл с `BXRestNavvy` | +3,1 КБ (+1,2%) |
| Создание объекта запроса | 10,7 → 0,1 мкс, `axios.create` один раз на клиента |
| Полный запрос к локальному серверу | 0,32 → 0,35 мс, почти всё — `AbortController` |

Ниже — исходный набросок, по которому делался прототип:

```ts
export interface BXRestRequestConfig {
  method: 'GET' | 'POST'
  url: string
  data?: unknown
  headers: Record<string, string>
  withCredentials: boolean
  signal?: AbortSignal
}

export type BXRestSend = <T>(config: BXRestRequestConfig) => Promise<T>
export type BXRestMiddleware = <T>(config: BXRestRequestConfig, next: BXRestSend) => Promise<T>

const bx = new BXRestNavvy({
  ...settings,
  // Необязательно. Без этого запросы идут напрямую через axios, как сейчас
  middleware: [retryOnQueryLimit({ attempts: 3 }), timeout(30_000)]
})
```

Что это даст:

- один экземпляр axios на клиента вместо одного на каждый запрос ([http.ts:17](projects/bx-rest/src/services/http/http.ts#L17));
- повтор при `QUERY_LIMIT_EXCEEDED`, таймаут и отмену через `AbortSignal`;
- общее логирование и возможность подменить транспорт в тестах или перейти на `fetch`.

Что учесть: [errors.ts:114](projects/bx-rest/src/functions/errors.ts#L114) и [authRefresh.ts:29](projects/bx-rest/src/services/http/authRefresh.ts#L29) распознают ошибки через `axios.isAxiosError`. С axios всё останется как есть. Свой транспорт должен будет отдавать ошибки с `response: { status, data }`, а эти проверки надо будет перевести на форму ошибки.

### 3.3 Пагинация

Около 150 списочных методов остались без `.resAll()`. Так быть не должно: это не замысел, а след одного коммита.

- [`b571b07`](https://github.com/Aricatofuka/bx-rest/commit/b571b07) (2026-08-07) добавил 372 файла методов по одному шаблону. В нём 1078 вызовов `simple` и `simpleV3` и только 10 с пагинацией, хотя класс `NavvyPag` существовал с января 2025 года.
- Итог: 142 метода REST v2 и 13 REST v3 с именами на `.list`, `.getlist` и `.items` без `.resAll()`, против 40 методов с ним. Из 142 методов REST v2 этот коммит добавил 123, остальные 19 появлялись понемногу начиная с 2023 года.
- Проверки этого не ловят: `simple` и пагинация компилируются одинаково, а параметры у таких методов часто `Record<string, unknown>`.

Для пользователя это выглядит так: `crm.activity.list().res()` отдаёт только первую страницу, а вызов `.resAll()` не компилируется. Листать можно вручную через `start` и `.resVanilla()`.

Подсчёт сделан по именам. Часть методов может не поддерживать страницы, у 8 нет параметров вообще (например, `bizProc.robot.list`).

Что сделать:

1. Сверить список с документацией Bitrix24.
2. Перевести подтверждённые методы на `pagNav` и родственные классы. `.res()` у них работает так же, `.resAll()` только добавляется, поэтому это не ломает совместимость.
3. Добавить тест: каждый метод с таким именем либо имеет `.resAll()`, либо стоит в явном списке исключений с причиной. Основа для теста уже есть, это снимок методов из раздела 2.

### 3.4 Мёртвый код

Решено удалить вместе с одной из работ выше. Предлагается сделать это первым коммитом транспорта, потому что часть кода лежит в том же слое.

Что удаляем:

- 57 модулей, недостижимых из `public-api`: большая часть `request/*`, `rest/base.ts`, `functions/errorHandler.ts`, `isEqual`, `isValidDate`, `consts/time`, `services/permission`;
- `serializeJavascript` вместе с обходом в `vitest.setup.ts`;
- неиспользуемую логику `HttpServices` и `HttpData`, `NavvySupport`;
- `typification/base/*` (2083 строки);
- около 540 строк закомментированного кода;
- ставшие лишними записи в `files` пакета.

Проверка: снимок методов и импорт в чистом проекте не меняются.

## 4. Веб-сокеты: раздел pull

Раздел помечен как экспериментальный ([pull/config.ts:17](projects/bx-rest/src/request-navvy/pull/config.ts#L17)) и сделан наполовину. Библиотека умеет получить настройки подключения к серверу Push & Pull, но сама к нему не подключается: клиента веб-сокета в ней нет. Раздел доступен как `new BXRestNavvy().pull` ([navvy.ts:90](projects/bx-rest/src/rest/navvy.ts#L90)).

| Метод | Состояние |
| --- | --- |
| `pull.config.get` | Работает, помечен `@experimental` |
| `pull.application.config.get` | Работает |
| `pull.channel.public.get` | Работает, но публичное поле `url.get` указывает на `log.blogpost.add` ([channel/public.ts:11](projects/bx-rest/src/request-navvy/pull/channel/public.ts#L11)), это копия из другого файла |
| `pull.application.event.add` | Заготовка с `TODO`, код закомментирован, к `BXRestNavvy` не подключена ([event.ts](projects/bx-rest/src/request-navvy/pull/application/event.ts)) |
| `pull.application.push.add` | То же ([push.ts](projects/bx-rest/src/request-navvy/pull/application/push.ts)) |

Ещё:

- Тестов на раздел нет, в README он не описан.
- Маппер настроек падает с `TypeError`, если в ответе нет `publicChannels` или одного из каналов ([map/pull/application/config.ts:29](projects/bx-rest/src/map/pull/application/config.ts#L29)). Бывает ли такой ответ на портале, не проверялось.
- В [map/pull.ts](projects/bx-rest/src/map/pull.ts) лежит закомментированный код.

**Что известно о протоколе.** Документация Bitrix24 по этому разделу сейчас недоступна: страницы отвечают 404, а в исходниках документации ([bitrix24/b24restdocs](https://github.com/bitrix24/b24restdocs)) раздела нет. Поэтому ориентир — официальный JS SDK, его клиент лежит в [b24jssdk/pullClient](https://github.com/bitrix24/b24jssdk/tree/main/packages/jssdk/src/pullClient):

- настройки он берёт через `pull.config.get`, а для приложения — через `pull.application.config.get`;
- подключается по веб-сокету, а если тот недоступен, переходит на long polling; сообщения идут в JSON-RPC и protobuf;
- сам переподключается, проверяет соединение пингом и раз в минуту перепроверяет настройки;
- клиент приложения только принимает события, а отправляет их приложение через `pull.application.event.add`;
- в его настройках есть поля `clientId`, `jwt` и `exp`, которых нет в наших типах;
- версия протокола закреплена в коде (`REVISION = 19`) и сверяется с сервером.

**Варианты (нужно решение):**

1. **Довести REST-методы, клиент не писать.** Для подключения к серверу README отправляет к клиенту из b24jssdk. Объём небольшой.
2. **Свой клиент:** `Observable` событий поверх настроек. Придётся повторить протокол SDK: веб-сокет и long polling, JSON-RPC, protobuf, переподключение, продление каналов. Протокол не описан в документации, его придётся восстанавливать по коду SDK и проверять на живом портале, а при смене ревизии на сервере — догонять.
3. **Обёртка над клиентом SDK.** bx-rest отдаёт настройки, а соединение держит `PullClient` из b24jssdk. Надо проверить, подключается ли он без остального SDK, сколько весит и подходит ли лицензия.

Предлагаю начать с варианта 1: эти шаги нужны при любом выборе. Выбирать между 2 и 3 после проверки на портале.

Что сделать в любом случае:

1. Получить на живом портале ответы `pull.config.get` и `pull.application.config.get` через вебхук и из приложения и сверить с типами. Заодно выяснить, доступен ли `pull.config.get` приложению.
2. Исправить `url.get` у `pull.channel.public.get`.
3. Реализовать `pull.application.event.add` и `pull.application.push.add` или удалить заготовки вместе с мёртвым кодом из 3.4.
4. Сделать маппер настроек устойчивым к отсутствующим полям, убрать закомментированный код.
5. Добавить тесты на мапперы и раздел в README, затем снять `@experimental`.

Новые методы — это минорная версия.

## 5. Учёт времени в задачах

`new BXRestNavvy().task.elapsedItem.operation` ([operation/elapseditem.ts](projects/bx-rest/src/request-navvy/task/operation/elapseditem.ts)) — методы учёта времени с предварительной проверкой прав.

В 1.5.1 уже поправлено то, что не меняет поведение:

- `getListByIDTask([])` отдаёт `[]` без запроса, раньше `firstValueFrom` падал с `EmptyError`;
- в ошибке `add()` исправлен текст: «права на добавление»;
- убран закомментированный код старого кэша прав. Сам кэш ([services/permission.ts](projects/bx-rest/src/services/permission.ts), `sessionStorage`) нигде не используется и уйдёт с мёртвым кодом из 3.4.

Число запросов в `add()`, `update()` и `del()` после чистки проверено на заглушке сервера, оно не изменилось. Остальное ниже меняет поведение или требует проверки на портале.

**Повторные запросы.** Проверено на заглушке сервера:

| Метод | Запросов | Из них повторных |
| --- | --- | --- |
| `add()` | 5 | 2: второй `user.current` и второй `tasks.task.getaccess` с теми же параметрами |
| `update()` | 4 | 0 |
| `del()` | 6 | 2: `isAllowedRemove` вызывает `isActionAllowed`, а тот ещё раз проверяет право на чтение ([строка 340](projects/bx-rest/src/request-navvy/task/operation/elapseditem.ts#L340)) |

Предложение: получать пользователя и ответ `getaccess` один раз и брать из него оба права, а в `del()` вызывать `isActionAllowed` без повторной проверки, как это уже делает `update()`. Тогда `add()` обойдётся тремя запросами, `del()` — четырьмя, а результат останется тем же. Заодно объединить почти одинаковые `checkPermissionReadTask` и `checkPermissionAddElapsedTimeToTask` ([строки 190–232](projects/bx-rest/src/request-navvy/task/operation/elapseditem.ts#L190-L232)).

**Ошибка без пользователя.** Если `user.current` не вернул пользователя, `add()`, `update()` и `del()` сообщают `No permission to read the task`. Причина другая, и текст уводит в сторону. Кроме того, `checkPermissionAddElapsedTimeToTask` в этом случае отдаёт `undefined`, а при отсутствии права — `false`. Предложение: отдельная ошибка. Это меняет текст ошибки.

**Формат даты в `getByInterval`** ([строка 42](projects/bx-rest/src/request-navvy/task/operation/elapseditem.ts#L42)). Фильтр уходит строкой из `toLocaleString('ru-RU')`, на этой машине это `01.11.2026, 0:00:00 GMT+3`. Строка зависит от часового пояса и версии ICU в браузере или Node, а разбирает ли её портал, не проверялось. Предложение: ISO 8601 со смещением через уже существующий `toISOStringWithTimezone` ([base.ts:295](projects/bx-rest/src/services/base.ts#L295)).

**`nPageSize: 99999` в `getListByIDTask`** ([строка 72](projects/bx-rest/src/request-navvy/task/operation/elapseditem.ts#L72)). Все записи задачи приходят одной страницей, только пока портал принимает такой размер. Если он его урежет, лишние записи пропадут без ошибки. Об этом предупреждает и комментарий в коде.

Что сделать:

1. На портале: сравнить результат `getByInterval` для одного интервала с текущим форматом даты и с ISO 8601; вызвать `getListByIDTask` для задачи, где больше 50 записей.
2. Убрать повторные запросы и объединить проверки прав. Добавить тесты на число запросов и на ветки ошибок, сейчас тест есть только на пустой список.
3. Решить, нужен ли кэш проверенных прав: об этом TODO в `add()` и `update()`. Если нужен, хранить его в памяти клиента, а не в `sessionStorage`. Если нет, убрать TODO.

## 6. Отложено

- **Публичный batch.** Пока неясно, проблема ли это. Вернёмся, если появится реальная потребность. Заготовка лежит в [rest/navvy.ts:134](projects/bx-rest/src/rest/navvy.ts#L134).
- **Типизация.** 720 из 1361 вызовов находятся в файлах с обобщёнными типами. Сделать лучше стоит, но после задач выше. Источник тот же, что у пагинации, поэтому при работе над 3.3 часть типов можно поправить попутно.

## 7. Закрыто без изменений

**Пустой `urls.key`.** Поведение верное, код не меняем, уточняем только [README](#уточнить-readme-про-базовый-url).

| `urls.key` | `additional_part` | Базовый адрес |
| --- | --- | --- |
| Пусто (настройки по умолчанию) | `rest` | `rest/`, запрос идёт относительно текущей страницы |
| Пусто | Пусто | Нет, запрос завершается ошибкой |

**Даты в формате США.** Не беремся. Строки в формате портала приходят только от отдельных методов (`calendar.section.get`, `calendar.event.get`, `crm.calllist.*`), а точный формат можно передать через `dateTimeFormat`. Глобальную настройку не добавляем. Если появится реальный случай, надо учесть, что токенов 12-часового формата у `dateTimeFormat` нет.

## 8. Без решения

Эти пункты пока не обсуждались:

- **Сборка.** ng-packagr и Angular 18 при отсутствии импортов `@angular` в коде, TypeScript закреплён на 5.5, в dev-зависимостях 62 уязвимости (5 критических, 28 высоких). Вариант: `tsup` или аналог, `isolatedModules` уже проходит.
- **Умолчание `.res()`.** Ошибка в ответе 2xx молча становится `undefined`. Смена умолчания `throwOnApiError` ломает совместимость, это единственный мажорный пункт в плане.
- **Единообразие API.** Имена (`sonet_group`, `socialNetWork`, `del` и `delete`, `map/im/gialog`, `getOfCreate…`, `startProcForm…`) и ошибки на разных языках.
- **Мелочи в коде:**
  - `?sessid=` из адреса сохраняется в `localStorage` прямо в геттере ([sessionKey.ts:98](projects/bx-rest/src/services/http/sessionKey.ts#L98));
  - `getAuthParams` проглатывает исключения из `source()` ([sessionKey.ts:113](projects/bx-rest/src/services/http/sessionKey.ts#L113));
  - одно плохое значение в строгих `toBool` и `toDate` роняет весь список, а `toNum(null)` даёт 0.
- **Уязвимости демо.** Vue: 1 высокая (`source-map-js`). Angular: 4 высокие и 5 средних.
- **Сверка с документацией.** Параметры и типы результатов 1402 методов не сверялись, только имена.
