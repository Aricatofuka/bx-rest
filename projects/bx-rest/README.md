<img src="https://flagcdn.com/20x15/ru.png" width="20" height="15" alt="RU"> **Русский** | <img src="https://flagcdn.com/20x15/gb.png" width="20" height="15" alt="GB"> [English](README.en.md)

# bx-rest — REST API клиент Bitrix24 для TypeScript, Angular, Vue и React

[![npm version](https://img.shields.io/npm/v/bx-rest.svg)](https://www.npmjs.com/package/bx-rest)
[![npm downloads](https://img.shields.io/npm/dm/bx-rest.svg)](https://www.npmjs.com/package/bx-rest)
[![license](https://img.shields.io/npm/l/bx-rest.svg)](https://github.com/Aricatofuka/bx-rest/blob/main/LICENSE)

`bx-rest` — SDK на TypeScript для REST API Bitrix24. Помогает вызывать методы BX24 REST, работать с токенами авторизации, sessid, OAuth2, пагинацией, мапперами и типизированными API-запросами.

Также известен как: REST-клиент Bitrix24, BX24 REST SDK, API-клиент Bitrix24, Bitrix REST TypeScript библиотека.

## Содержание

- [Установка](#установка)
- [Требования](#требования)
- [Быстрый старт](#быстрый-старт)
  - [Режимы результата](#режимы-результата)
- [Аутентификация и OAuth2](#аутентификация-и-oauth2)
- [Обработка ошибок](#обработка-ошибок)
- [Использование в Angular](#использование-в-angular)
- [SessionKeyServices](#sessionkeyservices)
- [Использование в Vue](#использование-в-vue)
- [Использование в React](#использование-в-react)
- [Кастомные REST-методы](#кастомные-rest-методы)
  - [Mapper](#mapper)
  - [Кастомный метод с `simple()`](#кастомный-метод-с-simple)
  - [Пагинированный кастомный метод с `pagNav()`](#пагинированный-кастомный-метод-с-pagnav)
- [Специфичные методы](#специфичные-методы)
  - [`tasks.task.list`](#taskstasklist)
- [Парсинг дат](#парсинг-дат)
- [Планы на будущее](#планы-на-будущее)
- [Лицензия](#лицензия)

## Установка

```shell
npm install bx-rest
```

## Требования

- **Формат модулей:** `bx-rest` поставляется только в виде ES-модулей — сборки CommonJS/`require` нет. Используйте его через ESM-совместимый бандлер (Angular CLI, Vite, webpack 5+, Next.js, ...) или нативный `import()`. Обычный `require('bx-rest')` (старые конфигурации Jest без поддержки ESM, `ts-node` в режиме CJS и т.п.) пакет не разрешит.
- **TypeScript:** разработан под TypeScript 5.5+. Рекомендуется режим `strict` — встроенная типизация опирается на него для точных типов полей.
- **RxJS:** `rxjs` (^7.8) — обычная зависимость, поставляемая вместе с пакетом, а не `peerDependency`, поэтому конкретная версия у хоста не требуется. Каждый REST-вызов возвращает RxJS `Observable`.
- **Фреймворки:** примеры для Angular, Vue и React ниже написаны под API Angular 18/19, Vue 3 и React 18+ (версии, на которых собирается и тестируется библиотека). Ни один из этих фреймворков не объявлен как `peerDependencies` — `bx-rest` не имеет жёсткой зависимости ни от одного из них, — но показанные паттерны DI/композиции рассчитаны именно на эти мажорные версии.
- **Окружение:** `bx-rest` ориентирован на браузер. Источники авторизации `cookies`/`localStorage`/`sessid` и `SessionKeyServices` напрямую читают `window`, `document` и `localStorage`. В приложении с серверным рендерингом (Angular Universal, Next.js и т.п.) выполняйте эти участки кода только в браузере (например, под защитой `isPlatformBrowser`/`typeof window !== 'undefined'`), либо используйте источник авторизации, не обращающийся к браузерным глобальным объектам, например `source: () => accessToken` или `source: 'off'`.

## Быстрый старт

Один раз настройте URL портала и источник access-токена, затем создайте клиент и подпишитесь на возвращённый RxJS `Observable`. Указывайте полный URL, включая `https://`.

```typescript
import { firstValueFrom } from 'rxjs'
import { BXRestNavvy, BXRestSettings } from 'bx-rest'

const accessToken = 'YOUR_ACCESS_TOKEN'

BXRestSettings.update({
  auth: {
    source: () => accessToken,
    key: 'auth'
  },
  urls: {
    source: 'string',
    key: 'https://example.bitrix24.com',
    additional_part: 'rest'
  }
})

const bxRest = new BXRestNavvy()

const deals = await firstValueFrom(
  bxRest.crm.deal.list({
    select: ['ID', 'TITLE'],
    filter: {},
    start: 0
  }).res()
)

console.log(deals)
```

Не хардкодьте и не коммитьте боевой access-токен. Передавайте его из потока авторизации вашего приложения, ответа сервера или защищённой конфигурации времени выполнения.

### Режимы результата

REST-вызовы ленивые: запрос начинается, когда на возвращённый `Observable` подписываются или передают его в `firstValueFrom`.

| Метод | Результат |
| --- | --- |
| `.res(options?)` | Разворачивает ответ Bitrix и применяет настроенный маппер. Для пагинированных методов возвращает текущую страницу. |
| `.resAll()` | Загружает и объединяет все страницы. Доступен для пагинированных Navvy-хелперов. |
| `.resVanilla()` | Возвращает сырой ответ Bitrix, включая такие поля, как `result`, `total` и `next`. |
| `.mapForVanilla()` | Сохраняет исходную обёртку ответа, но применяет маппер к её `result`. |

`.res()` принимает необязательный объект опций:

| Опция | По умолчанию | Эффект |
| --- | --- | --- |
| `throwOnApiError` | `false` | При `true` ошибка API-уровня Bitrix приводит к тому, что возвращённый `Observable` завершается ошибкой `BXRestApiError` вместо резолва в `undefined`. См. [Обработка ошибок](#обработка-ошибок). |

## Аутентификация и OAuth2

`auth.source` определяет, откуда читаются учётные данные. `auth.key` определяет имя параметра запроса, за исключением специального режима учётных данных через куки `OAuth2`.

| Сценарий | `auth.source` | `auth.key` | Поведение |
| --- | --- | --- | --- |
| Access-токен из состояния приложения | `() => accessToken` | `auth` | Вызывает функцию перед каждым запросом и отправляет её значение в параметре `auth`. Рекомендуется для OAuth2 access-токенов, которыми управляет приложение. |
| Access-токен в local storage | `localStorage` | `auth` | Читает `localStorage["auth"]` и отправляет его как `auth`. |
| Access-токен в куке | `cookies` | `auth` | Читает куку `auth` и отправляет её как `auth`. |
| Встроенная страница Bitrix / локальная сессия | `cookies` | `sessid` | Пробует `window.BX.bitrix_sessid()`, query-параметр `sessid`, `localStorage.sessid`, затем куку `auth`. Отправляет полученное значение как `sessid`. |
| Входящий вебхук или URL, уже содержащий авторизацию | `off` | Любое значение | Пропускает поиск учётных данных и не добавляет параметр авторизации. |
| Запрос учётных данных через куки | Любой источник, возвращающий непустое значение | `OAuth2` | Не добавляет полученное значение в параметры запроса и включает `withCredentials` в Axios. Используйте только если портал и политика CORS поддерживают куки с учётными данными. |

Для обычного OAuth2 `access_token` Bitrix используйте `auth.key: 'auth'` и передавайте текущий токен через функцию или `localStorage`. Специальный режим `auth.key: 'OAuth2'` предназначен для куки с учётными данными; сам по себе он не отправляет OAuth access-токен.

Для URL входящего вебхука сохраните полный путь вебхука в `urls.key`, установите `additional_part` в пустую строку и отключите дополнительную авторизацию:

```typescript
BXRestSettings.update({
  auth: {
    source: 'off',
    key: 'auth'
  },
  urls: {
    source: 'string',
    key: 'https://example.bitrix24.com/rest/1/WEBHOOK_CODE',
    additional_part: ''
  }
})
```

## Обработка ошибок

`bx-rest` показывает два разных вида сбоев, и `.res()` реагирует только на один из них.

| Сбой | Когда происходит | Как проявляется в `.res()` |
| --- | --- | --- |
| Ошибки транспорта / конфигурации — сбой сети, отсутствие авторизации, отсутствие базового URL | До или во время HTTP-вызова | Возвращённый `Observable` завершается ошибкой. Обрабатывайте её через RxJS `catchError` или колбэк `error` у `subscribe()`. |
| Ошибки API Bitrix — `{ error, error_description }`, например `INSUFFICIENT_SCOPE`, `expired_token` | HTTP-ответ 200, тело которого не является успешным payload'ом | По умолчанию `.res()` резолвится обычным образом со значением `undefined` — **исключение не выбрасывается**. Передайте `{ throwOnApiError: true }`, чтобы вместо этого выбрасывалось `BXRestApiError`. |

Поскольку ошибка уровня Bitrix по умолчанию резолвится как `undefined`, а не как ошибка `Observable`, не полагайтесь только на голый `.res()`, чтобы отличить «нет записей» от «запрос не удался». Есть два варианта.

**Вариант 1 — включить выброс исключения через `.res({ throwOnApiError: true })`.** `Observable` завершается ошибкой `BXRestApiError`, предоставляющей `error` и `error_description`, поэтому её можно обработать вместе с транспортными ошибками в одном колбэке `catchError`/`error`:

```typescript
import { BXRestNavvy, BXRestApiError } from 'bx-rest'

const bxRest = new BXRestNavvy()

bxRest.crm.deal.list({
  select: ['ID', 'TITLE'],
  filter: {},
  start: 0
}).res({ throwOnApiError: true }).subscribe({
  next: deals => console.log(deals),
  error: err => {
    if (err instanceof BXRestApiError) {
      console.error('Bitrix API error:', err.error, err.error_description)
    } else {
      console.error('Request failed:', err.message)
    }
  }
})
```

**Вариант 2 — оставить поведение по умолчанию и проверять сырой ответ.** Вызовите `.resVanilla()` и проверьте ответ с помощью экспортируемого type guard `isBXRestAnswerSuccess()`:

```typescript
import { firstValueFrom } from 'rxjs'
import { BXRestNavvy, isBXRestAnswerSuccess } from 'bx-rest'

const bxRest = new BXRestNavvy()

const answer = await firstValueFrom(
  bxRest.crm.deal.list({
    select: ['ID', 'TITLE'],
    filter: {},
    start: 0
  }).resVanilla()
)

if (!answer || !isBXRestAnswerSuccess(answer)) {
  console.error('Bitrix API error:', answer?.error, answer?.error_description)
} else {
  console.log(answer.result)
}
```

Независимо от `throwOnApiError`, ошибки транспортного уровня всегда всплывают как ошибки `Observable` и могут быть перехвачены обычным способом RxJS:

```typescript
bxRest.crm.deal.list({
  select: ['ID', 'TITLE'],
  filter: {},
  start: 0
}).res().subscribe({
  next: deals => console.log(deals),
  error: err => console.error('Request failed:', err.message)
})
```

## Использование в Angular

Зарегистрируйте публичные клиенты и `Navvy`, когда нужно внедрять их в сервисы или компоненты Angular:

```typescript
import { ApplicationConfig, Provider } from '@angular/core'
import {
  BXRestMap,
  BXRestNavvy,
  BXRestRequest,
  Navvy
} from 'bx-rest'

export const BXRestNavvyProvider: Provider = {
  provide: BXRestNavvy,
  useFactory: () => new BXRestNavvy()
}

export const BXRestMapProvider: Provider = {
  provide: BXRestMap,
  useFactory: () => new BXRestMap()
}

export const BXRestRequestProvider: Provider = {
  provide: BXRestRequest,
  useFactory: () => new BXRestRequest()
}

export const NavvyProvider: Provider = {
  provide: Navvy,
  useFactory: () => new Navvy()
}

export const appConfig: ApplicationConfig = {
  providers: [
    BXRestNavvyProvider,
    BXRestMapProvider,
    BXRestRequestProvider,
    NavvyProvider
  ]
}
```

Пример компонента:

```typescript
import { Component, inject } from '@angular/core'
import { BXRestNavvy } from 'bx-rest'

@Component({
  selector: 'app-list',
  template: ''
})
export class ListComponent {
  private readonly bxRest = inject(BXRestNavvy)

  readonly listElements$ = this.bxRest.lists.element.get({
    IBLOCK_TYPE_ID: 'lists',
    IBLOCK_ID: 150,
    FILTER: {
      '>ID': 0
    }
  }).res()
}
```

## SessionKeyServices

`SessionKeyServices` доступен из публичного API и может использоваться, когда нужно проверить текущие данные авторизации перед выполнением REST-запросов.

```typescript
import { BXRestSettings, SessionKeyServices, SessionKeyError } from 'bx-rest'

BXRestSettings.update({
  auth: {
    source: 'cookies',
    key: 'auth'
  },
  urls: {
    source: 'string',
    key: 'https://example.bitrix24.com',
    additional_part: 'rest'
  }
})

const session = new SessionKeyServices()

const auth = session.getAuthParams()
const authKey = session.getKeyAuth()

if (!auth && session.getCheckAuthParamsIsOn()) {
  const error = session.getAuthError('manual auth check')
  if (error instanceof SessionKeyError) {
    console.error(error.message)
  }
  throw error
}

session.getBaseUrl().subscribe((baseUrl) => {
  if (!baseUrl) {
    throw session.getBaseUrlError('manual base url check')
  }

  console.log({ authKey, auth, baseUrl })
})
```

## Использование в Vue

```typescript
import type { Plugin } from 'vue'
import { BXRestSettings, BXRestMap, BXRestNavvy, BXRestRequest } from 'bx-rest'

const bxRestPlugin: Plugin = {
  install(app) {
    BXRestSettings.update({
      auth: {
        source: 'cookies',
        key: 'auth'
      },
      urls: {
        source: 'string',
        key: 'https://example.bitrix24.com',
        additional_part: 'rest'
      }
    })

    app.config.globalProperties.$bxRestNavvy = new BXRestNavvy()
    app.config.globalProperties.$bxRestMap = new BXRestMap()
    app.config.globalProperties.$bxRestRequest = new BXRestRequest()
  }
}

export default bxRestPlugin
```

```vue
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import bxRestPlugin from './bxRestPlugin'

const app = createApp(App)

app.use(bxRestPlugin)

app.mount('#app')
```

## Использование в React

Создавайте клиент вне компонента и отписывайтесь при размонтировании компонента:

```tsx
import { useEffect, useState } from 'react'
import { BXRestNavvy } from 'bx-rest'

const bxRest = new BXRestNavvy()

export function Deals() {
  const [deals, setDeals] = useState<unknown[]>([])

  useEffect(() => {
    const subscription = bxRest.crm.deal.list({
      select: ['ID', 'TITLE'],
      filter: {},
      start: 0
    }).res().subscribe({
      next: value => setDeals(value ?? []),
      error: error => console.error(error)
    })

    return () => subscription.unsubscribe()
  }, [])

  return <pre>{JSON.stringify(deals, null, 2)}</pre>
}
```

## Кастомные REST-методы

`Navvy` экспортируется из `bx-rest`. В Angular зарегистрируйте показанный выше `NavvyProvider` и внедрите `Navvy` в ваш кастомный API-сервис. URL метода представлен массивом и перед отправкой запроса соединяется точками.

Для регистрации кастомных REST-методов см. [документацию Bitrix24](https://dev.1c-bitrix.ru/learning/course/index.php?COURSE_ID=99&LESSON_ID=7985).

### Mapper

Маппер — это обычная функция. Ей не нужно наследоваться от `BXRestMap`.

```typescript
import {
  iBXRestCustomBlogGet,
  iBXRestCustomBlogGetHttp
} from '../type/blog'

export class BXCustomBlogMap {
  static get(
    value: iBXRestCustomBlogGetHttp[] | undefined
  ): iBXRestCustomBlogGet[] {
    return (value ?? []).map(item => ({
      id: Number(item.ID),
      title: item.TITLE
    }))
  }
}
```

### Кастомный метод с `simple()`

Используйте `simple()`, когда метод возвращает один ответ без автоматической пагинации:

```typescript
import { inject, Injectable } from '@angular/core'
import { Navvy, partNameMethods as PNM } from 'bx-rest'
import { BXCustomBlogMap } from '../map/blog'
import {
  iBXRestCustomBlogGet,
  iBXRestCustomBlogGetHttp,
  iBXRestCustomParamBlogGet
} from '../type/blog'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyCustomApiBlog {
  private readonly url = {
    get: ['blog', PNM.$get]
  }

  private readonly navvy = inject(Navvy)

  get(param: iBXRestCustomParamBlogGet) {
    return this.navvy.simple<
      iBXRestCustomBlogGetHttp[],
      iBXRestCustomBlogGet[],
      iBXRestCustomParamBlogGet
    >(
      this.url.get,
      param,
      BXCustomBlogMap.get
    )
  }
}
```

Возвращённый хелпер поддерживает `.res()`, `.resVanilla()` и `.mapForVanilla()`.

### Пагинированный кастомный метод с `pagNav()`

Используйте `pagNav()`, когда ответ Bitrix содержит массив и стандартные поля пагинации `start`, `next` и `total`. Тип параметра должен поддерживать `start?: number`.

```typescript
import { inject, Injectable } from '@angular/core'
import { Navvy, partNameMethods as PNM } from 'bx-rest'
import type { iBXRestPagination } from 'bx-rest/typification/base'
import { BXCustomBlogMap } from '../map/blog'
import {
  iBXRestCustomBlogGet,
  iBXRestCustomBlogGetHttp
} from '../type/blog'

export interface iBXRestCustomParamBlogList extends iBXRestPagination {
  filter?: Record<string, unknown>
}

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyCustomApiBlogList {
  private readonly url = {
    list: ['blog', PNM.$list]
  }

  private readonly navvy = inject(Navvy)

  list(param: iBXRestCustomParamBlogList) {
    return this.navvy.pagNav<
      iBXRestCustomBlogGetHttp,
      iBXRestCustomBlogGet,
      iBXRestCustomParamBlogList
    >(
      this.url.list,
      param,
      BXCustomBlogMap.get
    )
  }
}
```

Возвращённый хелпер дополнительно поддерживает `.resAll()` для загрузки и объединения всех страниц.

## Специфичные методы

### `tasks.task.list`

Первый generic-аргумент выбирает встроенные поля задачи. Второй добавляет пользовательские поля, специфичные для проекта:

```typescript
import { BXRestNavvy } from 'bx-rest'
import type { iBXRestTaskFieldsName } from 'bx-rest/typification/tasks'

type SelectedTaskField = Extract<
  iBXRestTaskFieldsName,
  'ID' | 'TITLE' | 'GROUP_ID' | 'TIME_ESTIMATE' | 'CREATED_DATE' | 'CLOSED_DATE' | 'DURATION_FACT' | 'TIME_SPENT_IN_LOGS'
>

type CustomTaskFields = {
  ufListDiscipline: string
  ufListSubdiscipline: string
  ufList1: string
}

const selectedTaskFields: SelectedTaskField[] = [
  'ID',
  'TITLE',
  'GROUP_ID',
  'CREATED_DATE'
]

const selectedCustomFields = [
  'UF_LIST_DISCIPLINE',
  'UF_LIST_SUBDISCIPLINE',
  'UF_LIST_1'
] as const

const bxRest = new BXRestNavvy()

const tasks$ = bxRest.tasks.task.list<
  SelectedTaskField[],
  CustomTaskFields
>({
  order: {
    ID: 'DESC'
  },
  filter: {
    CREATED_BY: [1]
  },
  select: [...selectedTaskFields, ...selectedCustomFields],
  start: 0
}).res()
```

## Парсинг дат

Некоторые REST-поля Bitrix24 (в частности `calendar.section.get`, `calendar.event.get` и `crm.calllist.*`) возвращают даты в виде обычных строк, отформатированных согласно собственным настройкам даты/времени портала (Настройки → формат даты и времени), а не в фиксированном формате ISO. Поскольку этот формат — настройка конкретного портала, `bx-rest` не может знать его заранее, поэтому `BXBaseServices.toDate()` (используется этими мапперами внутренне) разрешает неоднозначную строку в три шага, по порядку:

1. **Формат, который вы указали.** Если вы (или маппер) передаёте явный `format` (например, `'dd.MM.yyyy HH:mm:ss'`), он проверяется первым, токен за токеном (`yyyy`, `MM`, `dd`, `HH`, `mm`, `ss` и их однобуквенные варианты) с буквальными разделителями из строки формата.
2. **Небольшой список известных форматов Bitrix24** (`'dd.MM.yyyy HH:mm:ss'`, `'yyyy-MM-dd HH:mm:ss'`, `'dd.MM.yyyy'`, `'yyyy-MM-dd'`) — проверяется, если шаг 1 не подошёл, поскольку разные порталы обычно присылают один из этих форматов.
3. **Позиционная эвристика** как последний вариант — она находит год по его однозначной 4-значной длине (независимо от того, на каком конце даты он стоит), считает средний сегмент месяцем (это верно и для ISO, и для европейского формата даты) и распознаёт любой разделитель (`.`, `-`, `/`, пробел...). Она **не** пытается угадать в единственном действительно неоднозначном случае — чисто числовой порядок `MM/dd` против `dd/MM`, когда оба сегмента ≤ 12, — и проверяет диапазоны значений (месяц 1-12, день 1-31, час/минута/секунда), а не позволяет `Date` молча перевести некорректное значение на следующий месяц/год.

Если вы точно знаете формат вашего портала, передавайте его явно вместо того, чтобы полагаться на автоопределение — он всегда проверяется первым и полностью пропускает шаги 2-3. Мапперы календаря и списка звонков принимают его как единственный необязательный завершающий аргумент `dateTimeFormat`, и он также передаётся через соответствующие методы `BXRestNavvy`. Там, где у маппера есть ещё и поля только с датой (`EXDATE`/`RRULE.UNTIL` у `calendar.event`), их формат выводится из `dateTimeFormat` отбрасыванием `HH:mm:ss` — порядок день/месяц/год всегда одинаков для обоих на конкретном портале, поэтому передавать дополнительно нечего:

```typescript
import { BXRestNavvy } from 'bx-rest'

const bxRest = new BXRestNavvy()

// Формат даты/времени конкретного портала, например из Настройки → формат даты и времени.
const dateTimeFormat = 'yyyy-MM-dd HH:mm:ss'

bxRest.calendar.event.get({ FROM: '01.01.2026', TO: '31.01.2026' }, dateTimeFormat).res()
bxRest.calendar.section.get({}, dateTimeFormat).res()
bxRest.crm.callList.get({ ID: 1 }, dateTimeFormat).res()
```

## Планы на будущее
- Автоматическое получение токена
- Мапперы для типов нормализации

Есть предложение по функциональности или нашли баг? Посмотрите [существующие issues](https://github.com/Aricatofuka/bx-rest/issues) или создайте новый.

## Лицензия

[MIT](https://github.com/Aricatofuka/bx-rest/blob/main/LICENSE) © Aricatofuka
