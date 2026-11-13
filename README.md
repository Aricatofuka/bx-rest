<!-- This file is generated from projects/bx-rest/README.md by `npm run sync-readme`. Do not edit directly. -->

<img src="https://flagcdn.com/20x15/ru.png" width="20" height="15" alt="RU"> **Русский** | <img src="https://flagcdn.com/20x15/gb.png" width="20" height="15" alt="GB"> [English](README.en.md)

# bx-rest — REST API клиент Bitrix24 для TypeScript, Angular, Vue и React

[![npm version](https://img.shields.io/npm/v/bx-rest.svg)](https://www.npmjs.com/package/bx-rest)
[![npm downloads](https://img.shields.io/npm/dm/bx-rest.svg)](https://www.npmjs.com/package/bx-rest)
[![license](https://img.shields.io/npm/l/bx-rest.svg)](https://github.com/Aricatofuka/bx-rest/blob/main/LICENSE)

`bx-rest` — TypeScript SDK для REST API Bitrix24. Методы портала вызываются как типизированные функции, а библиотека берёт на себя авторизацию (OAuth 2.0, вебхук, sessid), загрузку всех страниц списка и преобразование ответов мапперами.

**Попробовать в браузере:** [демо на Vue, React и Angular](https://aricatofuka.github.io/bx-rest/). Подключите тестовый портал и выполните код прямо на странице, редактор подсказывает методы по типам библиотеки.

## Содержание

- [Установка](#установка)
  - [Требования](#требования)
- [Быстрый старт](#быстрый-старт)
  - [Входящий вебхук](#входящий-вебхук)
  - [Режимы результата](#режимы-результата)
- [Использование в Angular](#использование-в-angular)
- [Использование в Vue](#использование-в-vue)
- [Использование в React](#использование-в-react)
- [Аутентификация и OAuth2](#аутентификация-и-oauth2)
  - [`withCredentials`](#withcredentials)
- [Обработка ошибок](#обработка-ошибок)
  - [Какие бывают ошибки](#какие-бывают-ошибки)
  - [Поля `BXRestApiError`](#поля-bxrestapierror)
  - [Токен в ошибках](#токен-в-ошибках)
  - [Сырой ответ](#сырой-ответ)
- [Продление авторизации](#продление-авторизации)
  - [Токен от портала без BX24.js](#токен-от-портала-без-bx24js)
  - [Рецепт: напрямую в портал](#рецепт-напрямую-в-портал)
  - [Рецепт: через бэкенд-прокси](#рецепт-через-бэкенд-прокси)
- [Несколько порталов](#несколько-порталов)
- [HTTP-заголовки](#http-заголовки)
- [Повтор, таймаут и очередь запросов](#повтор-таймаут-и-очередь-запросов)
  - [Журнал запросов](#журнал-запросов)
  - [Транспорт fetch](#транспорт-fetch)
  - [Свои middleware](#свои-middleware)
- [Работа в iframe без BX24.js](#работа-в-iframe-без-bx24js)
- [Кастомные REST-методы](#кастомные-rest-методы)
  - [Mapper](#mapper)
  - [Кастомный метод с `simple()`](#кастомный-метод-с-simple)
  - [Пагинированный кастомный метод с `pagNav()`](#пагинированный-кастомный-метод-с-pagnav)
- [Специфичные методы](#специфичные-методы)
  - [`tasks.task.list`](#taskstasklist)
  - [Push & Pull](#push--pull)
- [Парсинг дат](#парсинг-дат)
- [SessionKeyServices](#sessionkeyservices)
- [Демо](#демо)
- [Планы на будущее](#планы-на-будущее)
- [Лицензия](#лицензия)

## Установка

```shell
npm install bx-rest
```

### Требования

- **ES Modules.** Сборки CommonJS нет, поэтому `require('bx-rest')` не сработает, в том числе в старых настройках Jest без ESM и в `ts-node` в режиме CommonJS. Подойдёт бандлер с поддержкой ESM (Angular CLI, Vite, webpack 5+, Next.js) или `import()`.
- **TypeScript 5.5+**, лучше в режиме `strict`: типы библиотеки рассчитаны на строгую проверку.
- **RxJS** отдельно ставить не нужно: `rxjs ^7.8` — обычная зависимость пакета. Все запросы возвращают `Observable`.
- **Фреймворк** не нужен: Angular, Vue и React не объявлены в `peerDependencies`. Примеры ниже написаны для Angular 18/19, Vue 3 и React 18+, с этими версиями библиотеку собирают и проверяют.
- **Браузер и SSR.** Источники авторизации `cookies`, `localStorage`, `sessid` и `SessionKeyServices` обращаются к `window`, `document` и `localStorage`. При SSR (Angular Universal, Next.js) вызывайте их только в браузере, например за проверкой `isPlatformBrowser` или `typeof window !== 'undefined'`. Или берите источник, которому браузер не нужен: `source: () => accessToken` или `source: 'off'`.

## Быстрый старт

Задайте адрес портала и источник токена, создайте клиент и вызовите метод. Адрес указывайте полностью, с `https://`.

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

Не храните боевой токен в коде и в репозитории. Передавайте его из авторизации приложения, ответа сервера или защищённой конфигурации.

### Входящий вебхук

С вебхуком токен не нужен: секрет уже в адресе. Укажите адрес вебхука целиком, `additional_part` оставьте пустым и отключите поиск токена:

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

Адрес для методов [REST v3](https://apidocs.bitrix24.ru/api-reference/rest-v3.html#call) библиотека строит из этого же адреса сама: `https://example.bitrix24.com/rest/api/1/WEBHOOK_CODE/<метод>`.

### Режимы результата

Запрос уходит, когда на `Observable` подписываются или передают его в `firstValueFrom`. Отписка до ответа отменяет HTTP-запрос: на этом построены `switchMap`, `takeUntil` и оператор `timeout` из RxJS. Отмена не откатывает то, что портал уже сделал: если `crm.deal.add` дошёл до сервера, сделка может быть создана.

| Метод | Что возвращает |
| --- | --- |
| `.res(options?)` | Результат из ответа Bitrix, обработанный маппером. У списочных методов — одну страницу. |
| `.resAll()` | Записи всех страниц вместе. Есть у списочных методов с постраничной навигацией, подробнее ниже. |
| `.resVanilla()` | Ответ Bitrix как есть, с полями `result`, `total`, `next`. |
| `.mapForVanilla()` | Ответ Bitrix как есть, но маппер применён к его `result`. |

У `.res()` одна опция — `throwOnApiError`, по умолчанию `false`. С `true` ошибка Bitrix в ответе 2xx приходит как `BXRestApiError`, а не как `undefined`. Подробнее — в разделе [Обработка ошибок](#обработка-ошибок).

`.resAll()` есть у списочных методов с постраничной навигацией. Результат той же формы, что у `.res()`:

- если метод отдаёт массив (`crm.deal.list`, `crm.activity.list`), `.resAll()` отдаёт массив всех записей;
- если `result` — объект со списком под ключом, как у `catalog.product.list` (`{ products: [...] }`), `sale.order.list` (`{ orders: [...] }`) или методов REST v3 (`{ items: [...] }`), `.resAll()` отдаёт такой же объект, где под ключом собраны записи всех страниц.

Как `.resAll()` листает, зависит от метода:

| Как листается метод | Методы | Запросы `.resAll()` |
| --- | --- | --- |
| `start`, в ответе есть `total` | Большинство `*.list` | Первая страница, остальные пакетами через `batch` |
| `OFFSET`/`LIMIT`, в ответе есть `total` | `im.dialog.users.list`, `im.department.colleagues.list`, `im.search.{chat,department,user}.list` | Так же |
| `OFFSET`/`LIMIT` или номер страницы, `total` нет | `im.recent.list`, `imbot.v2.Bot.list`, `sign.b2e.company.provider.list`, `biconnector.{connector,dataset,source}.list` | По одной странице, пока портал не ответит, что страниц больше нет, или не отдаст неполную |
| Объект `pagination` REST v3 | `mail.mailbox.list`, `mail.message.list`, `main.eventlog.list`, `timeman.record.list`, `note.collection.list` (курсор) | По одной странице, так же |

Размер страницы `.resAll()` берёт из запроса. Если в запросе его нет, `.resAll()` явно передаёт умолчание метода из документации, а если он больше, чем принимает метод, уменьшает его. Чем крупнее страница, тем меньше запросов, а при обходе по одной странице это заметно.

При обходе по одной странице поля `result` кроме списков (`hasMore`, `nextCursor`) берутся с последней страницы. У `imbot.v2.Bot.list` собираются оба списка, `bots` и `users`. Страницы `im.recent.list` на портале перекрываются, повторы чатов `.resAll()` убирает.

У методов, которые отдают весь список одним ответом, `.resAll()` нет. Они и другие исключения перечислены с причинами в [list-pagination.spec.ts](https://github.com/Aricatofuka/bx-rest/blob/main/projects/bx-rest/src/rest/list-pagination.spec.ts). Например, `note.document.search.list` отдаёт только первую страницу: ссылки на следующую в ответе нет.

## Использование в Angular

Зарегистрируйте клиенты провайдерами и внедряйте через `inject()`. Настройки задайте через `BXRestSettings.update()` до первого запроса, например в `main.ts`.

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

Компонент:

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

## Использование в Vue

Плагин задаёт настройки и кладёт клиенты в глобальные свойства приложения:

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

Подключение в `main.ts`:

```typescript
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import bxRestPlugin from './bxRestPlugin'

const app = createApp(App)

app.use(bxRestPlugin)

app.mount('#app')
```

## Использование в React

Создайте клиент вне компонента, а при размонтировании отпишитесь:

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

## Аутентификация и OAuth2

`auth.source` задаёт, откуда брать токен, а `auth.key` — под каким именем отправить его в запросе. Исключение — `auth.key: 'OAuth2'`, он описан в последней строке таблицы.

| Сценарий | `auth.source` | `auth.key` | Что происходит |
| --- | --- | --- | --- |
| Токен из состояния приложения (рекомендуется) | `() => accessToken` | `auth` | Функция вызывается перед каждым запросом, её значение уходит в параметре `auth`. |
| Токен в `localStorage` | `localStorage` | `auth` | Берёт `localStorage["auth"]` и отправляет как `auth`. |
| Токен в куке | `cookies` | `auth` | Берёт куку `auth` из `document.cookie` и отправляет как `auth`. |
| Страница внутри Bitrix24 или локальная сессия | `cookies` | `sessid` | Ищет по очереди: `window.BX.bitrix_sessid()`, параметр `sessid` в адресе страницы, `localStorage.sessid`, куку `auth`. Отправляет найденное как `sessid`. |
| Входящий вебхук или свой прокси | `off` | любое | Токен не ищется и не отправляется: у вебхука секрет уже в адресе, у прокси он хранится на сервере, и браузер его не видит. |
| Куки с учётными данными | любой, лишь бы значение было непустым | `OAuth2` | Значение в запрос не добавляется, зато включается `withCredentials`, если его не переопределили (см. ниже). |

- **`localStorage` и куки** удобны для разработки. Но токен в них может прочитать любой скрипт на странице, в том числе через XSS. Куку, которую читает JS, нельзя сделать `HttpOnly`, поэтому она не безопаснее `localStorage`. В продакшене передавайте токен функцией.
- **Обычный OAuth2 `access_token`** Bitrix отправляйте с `auth.key: 'auth'`, функцией или через `localStorage`. Режим `auth.key: 'OAuth2'` нужен только для кук с учётными данными и сам токен не отправляет. Он работает, если портал и политика CORS разрешают такие куки, а браузеры всё чаще блокируют сторонние куки по умолчанию.
- **Свой прокси с cookie-сессией:** см. `withCredentials` ниже.

### `withCredentials`

Опция axios `withCredentials` решает, прикладывать ли к запросу куки браузера. По умолчанию она включена только при `auth.key: 'OAuth2'`. Явное значение в настройках важнее этого правила. Например, запросы идут через ваш прокси (`auth.source: 'off'`), и браузер должен приложить куку сессии этого прокси, а не Bitrix24:

```typescript
BXRestSettings.update({
  auth: {
    source: 'off',
    key: 'auth'
  },
  urls: {
    source: 'string',
    key: 'https://your-proxy.example.com/bitrix-proxy',
    additional_part: ''
  },
  withCredentials: true
})
```

Так же `withCredentials: false` выключает его при `auth.key: 'OAuth2'`.

## Обработка ошибок

Вызывайте `.res({ throwOnApiError: true })`. Тогда любая ошибка Bitrix приходит как `BXRestApiError`, какой бы ни был HTTP-статус, и её можно обработать вместе с сетевыми ошибками в одном колбэке `error` или в `catchError`:

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
      console.error('Bitrix API error:', err.status, err.error, err.error_description)
      if (err.error === 'expired_token') {
        // auth.refresh не задан или не помог — см. «Продление авторизации»
      }
    } else {
      console.error('Request failed:', err.message)
    }
  }
})
```

Без `throwOnApiError` ошибка в ответе 2xx превращается в `undefined`, и её не отличить от пустого результата.

### Какие бывают ошибки

| Что случилось | Что получает `.res()` |
| --- | --- |
| Ошибка Bitrix со статусом не 2xx. Так приходит большинство ошибок: `expired_token` (401), `ERROR_METHOD_NOT_FOUND` (404), `QUERY_LIMIT_EXCEEDED` (503), `Not found` у `crm.*.get` (400) | Ошибку `BXRestApiError`, с `throwOnApiError` и без. |
| Ошибка Bitrix в теле ответа со статусом 2xx | По умолчанию значение `undefined`, **исключения нет**. С `{ throwOnApiError: true }` — ошибку `BXRestApiError`. |
| Сбой сети, превышен [`timeout`](#повтор-таймаут-и-очередь-запросов), нет авторизации, пустой базовый адрес (см. ниже), ответ не от Bitrix (например, HTML-страница ошибки прокси) | Обычную ошибку `Error`. Исходная ошибка — в её `cause`: для ответа не от Bitrix это ошибка axios, HTTP-статус — в `cause.response.status`; для `timeout` — `BXRestTimeoutError`. |

**Базовый адрес.** Адрес запроса складывается из адреса портала и `urls.additional_part`. Адрес портала — это `urls.key`, а при `urls.source: 'localStorage'` — значение в `localStorage` под ключом `urls.key`.

- Ошибка `Base URL was not resolved` возникает, только если пусты обе части.
- Если пуст только адрес портала, а `additional_part` равен `'rest'` (так в настройках по умолчанию), запрос уходит на `rest/<метод>` относительно текущей страницы. Это нужно страницам, открытым на домене самого портала.
- Туда же уйдёт запрос, если в `localStorage` под ключом ничего не оказалось. Проверяйте значение заранее.

### Поля `BXRestApiError`

| Поле | Значение |
| --- | --- |
| `error` | Код ошибки Bitrix, например `expired_token`. Может быть пустой строкой: на несуществующий ID `crm.*.get` отвечает пустым кодом и `Not found` в описании. |
| `error_description` | Описание ошибки Bitrix; оно же используется как `message`. |
| `status` | HTTP-статус, например `401`; `undefined`, если ошибка пришла в теле ответа со статусом 2xx. |
| `method` | REST-метод, например `crm.deal.get`. |
| `cause` | Исходная ошибка axios, если статус был не 2xx; полное тело ответа — в `cause.response.data` (для REST v3 — в том числе `validation`). |

Для методов REST v3 в `error` попадает `code` ошибки, а в `error_description` — её `message`.

### Токен в ошибках

Ошибка axios хранит весь отправленный запрос: в `config.url` — адрес, а с ним и секрет вебхука, в `config.data` — тело с токеном. Библиотека отдаёт эту ошибку как есть: в `err.cause` у `.res()` и саму ошибку у `.resVanilla()`. Поэтому `console.error(err)` или отправка ошибки в систему сбора ошибок передаёт и токен. Если ошибки уходят в логи, выбирайте из них нужные поля, например `err.status`, `err.error` и `err.cause?.response?.data`.

### Сырой ответ

`.resVanilla()` отдаёт тело ответа Bitrix как есть. Проверяйте его функцией `isBXRestAnswerSuccess()`:

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

`.resVanilla()`, `.mapForVanilla()` и `.resAll()` ошибки не преобразуют:

- на ошибку Bitrix со статусом не 2xx все три завершаются исходной ошибкой axios, тело ответа — в `err.response.data`;
- ошибку в теле ответа 2xx `.resVanilla()` и `.mapForVanilla()` отдают как есть;
- `.resAll()` на такую ошибку завершается `BXRestApiError`: опции `throwOnApiError` у него нет. Так же он завершается, если ошибку вернула любая следующая страница, отдельным запросом или внутри batch-запроса (`result_error`). Неполный список `.resAll()` не отдаёт.
- Если при обходе по одной странице портал дважды подряд отдал одну и ту же страницу, значит, параметр пагинации он не понял. `.resAll()` тогда завершается ошибкой, а не запрашивает страницы бесконечно.

## Продление авторизации

Если задать `auth.refresh`, библиотека сама продлевает истёкшую авторизацию. Когда запрос падает с ошибкой авторизации, она вызывает `auth.refresh()` и повторяет запрос, а ваш код получает обычный результат.

```typescript
BXRestSettings.update({
  auth: {
    source: () => accessToken,
    key: 'auth',
    // получить новую авторизацию и положить её туда, откуда её читает source
    refresh: async () => {
      accessToken = await getNewToken()
    }
  },
  // ...
})
```

| Поле `auth` | Значение |
| --- | --- |
| `refresh` | `() => Promise<unknown>`. Получает новую авторизацию. Значение промиса не используется: повтор заново читает токен, адрес и заголовки из настроек. Поэтому функция должна положить новый токен туда, откуда его читает `auth.source`, а при работе через прокси — передать его на сервер. |
| `isAuthError` | `(error: unknown) => boolean`, необязательно. Какую ошибку запроса считать ошибкой авторизации. Получает исходную ошибку HTTP-запроса, обычно `AxiosError`. По умолчанию — экспортируемая `isBXRestAuthError`, её удобно дополнять: `error => isBXRestAuthError(error) \|\| myCheck(error)`. |

Без `auth.refresh` запросы не повторяются. `update()` сливает настройки только на верхнем уровне, поэтому `BXRestSettings.update({ auth: {...} })` заменяет `auth` целиком, вместе с `refresh`. Если меняете `auth`, передайте `refresh` снова.

Как работает повтор:

- **Что считается ошибкой авторизации** (`isBXRestAuthError`): ошибка Bitrix `expired_token` или `invalid_token` при любом HTTP-статусе и ответ 401 без тела ошибки Bitrix, например пустой 401 от бэкенд-прокси без действующего токена. Остальные системные ошибки Bitrix тоже приходят со статусом 401 (`insufficient_scope`, `NO_AUTH_FOUND`, `ACCESS_DENIED`, `INVALID_CREDENTIALS`, `user_access_error`, `OVERLOAD_LIMIT`), но новый токен их не исправит, поэтому они не повторяются.
- **Один повтор.** Если и повтор упал, наружу уходит его ошибка, второго продления не будет.
- **Одно продление на всех.** Если одновременно упало несколько запросов, `refresh()` вызывается один раз, а повторяются все. Запрос, который был в пути, пока токен продлевали, повторяется без нового продления.
- **Продление упало** (`refresh()` отклонил промис или бросил исключение). Наружу уходит исходная ошибка запроса, а причина сбоя продления — в её поле `authRefreshError`. Достать её из любой ошибки можно через `getAuthRefreshError(err)`:

  ```typescript
  import { BXRestApiError, getAuthRefreshError } from 'bx-rest'

  bxRest.crm.deal.get({ ID: 1 }).res().subscribe({
    error: err => {
      if (err instanceof BXRestApiError && err.error === 'expired_token') {
        console.error('Авторизацию продлить не удалось:', getAuthRefreshError(err))
      }
    }
  })
  ```

- **Где работает.** Во всех запросах библиотеки: `.res()`, `.resAll()` (и первая страница, и каждый batch-запрос), `.resVanilla()`, `.mapForVanilla()`, `BXRestRequest.post()`/`.get()`. Повтор встроен в HTTP-слой, поэтому `.res()` получает уже результат повтора.
- **Что не повторяется:** ошибки в теле ответа со статусом 2xx (Bitrix отдаёт `expired_token` со статусом 401) и ошибки отдельных команд внутри успешного batch-ответа (`result_error`). Повторяется только HTTP-запрос целиком.

### Токен от портала без BX24.js

Обновить токен по OAuth прямо в браузере нельзя: для этого нужен `client_secret`. Но приложение открыто в iframe портала, пользователь в портале залогинен, и портал сам выдаёт приложению токен по postMessage. Так работают `BX24.getAuth()` и `BX24.refreshAuth()`. `BXRestFrame` делает то же самое без подключения BX24.js. Остальные команды BX24.js — в разделе [Работа в iframe без BX24.js](#работа-в-iframe-без-bx24js).

```typescript
import { BXRestFrame } from 'bx-rest'

const frame = new BXRestFrame()         // необязательно: { timeout: 10000 }

const auth = await frame.getAuth()      // текущая авторизация — как BX24.getAuth()
const fresh = await frame.refreshAuth() // новая авторизация — как BX24.refreshAuth()
// { access_token, refresh_token, expires_in, domain, member_id }
```

| Поле результата | Значение |
| --- | --- |
| `access_token`, `refresh_token` | Токены приложения. |
| `expires_in` | Момент истечения `access_token` — **миллисекунды** с 1 января 1970 года, как у `BX24.getAuth()`. Не срок жизни в секундах, как в ответе OAuth-сервера. |
| `domain` | Адрес портала без протокола, например `mycompany.bitrix24.ru`. |
| `member_id` | Постоянный идентификатор портала. |

- **Токены** `BXRestFrame` не логирует и никуда не сохраняет: каждый вызов `getAuth()` и `refreshAuth()` спрашивает портал заново, результат получает ваш код.
- **Ошибки** — `BXRestFrameError` с полем `code`:
  - `NOT_IN_FRAME` — страница открыта не в iframe приложения, ошибка сразу;
  - `TIMEOUT` — портал не ответил за `timeout`, по умолчанию 10 секунд;
  - `NO_AUTH` — портал ответил без токена;
  - `BAD_RESPONSE` — ответ не удалось разобрать.

  Если портал не может выдать новый токен (например, у приложения закончился пробный или платный период), он показывает `alert` «Unable to get new token!» и не отвечает вовсе. Такой отказ приходит как `TIMEOUT`.
- **`getAuth()` и срок действия.** Портал отдаёт срок жизни токена на момент выдачи, а не остаток. Поэтому на давно открытой странице `expires_in` от `getAuth()` завышен, у BX24.js так же. Для свежего токена используйте `refreshAuth()`.
- **Домен портала** `BXRestFrame`, как и BX24.js, удостоверить не может: его задаёт тот, кто встроил страницу в iframe. Поэтому токен, пришедший из браузера, сервер должен проверить у портала, прежде чем ему доверять.

### Рецепт: напрямую в портал

Токен хранит фронтенд, запросы идут в `https://<портал>/rest/`. Функция продления берёт новый токен у портала и кладёт его туда, откуда его читает `auth.source`, здесь это переменная в памяти:

```typescript
import { BXRestSettings, BXRestFrame } from 'bx-rest'

const frame = new BXRestFrame()
const auth = await frame.getAuth()
let accessToken = auth.access_token

BXRestSettings.update({
  auth: {
    source: () => accessToken,
    key: 'auth',
    refresh: async () => {
      accessToken = (await frame.refreshAuth()).access_token
    }
  },
  urls: {
    source: 'string',
    key: `https://${auth.domain}`,
    additional_part: 'rest'
  }
})
```

С `auth.source: 'localStorage'` функция продления так же записывает токен в `localStorage[auth.key]`.

### Рецепт: через бэкенд-прокси

Токен хранит сервер, а браузер авторизуется у прокси cookie-сессией (`auth.source: 'off'`). Прокси без действующего токена отвечает 401 с пустым телом, и это по умолчанию считается ошибкой авторизации. Функция продления берёт новый токен у портала и отправляет его на сервер:

```typescript
import { BXRestSettings, BXRestFrame } from 'bx-rest'

const APP = 'smart-process-pro'
const frame = new BXRestFrame()

BXRestSettings.update({
  auth: {
    source: 'off',
    key: 'auth',
    refresh: async () => {
      const { access_token, refresh_token, expires_in } = await frame.refreshAuth()
      const response = await fetch(`/api/bitrix/token/${APP}`, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ access_token, refresh_token, expires_in })
      })
      if (!response.ok) {
        // без тела запроса в сообщении — в нём токены
        throw new Error(`Token upload failed: HTTP ${response.status}`)
      }
    }
  },
  urls: {
    source: 'string',
    key: '/api/bitrix/rest/',
    additional_part: '' // иначе к адресу добавится ещё один `rest/`
  },
  headers: {
    'X-Bitrix-App': APP
  }
})
```

Ошибка функции продления попадает в `authRefreshError` исходной ошибки, а приложение может вывести её в консоль или отправить в систему сбора ошибок. Поэтому не кладите токены в текст ошибок функции продления.

## Несколько порталов

`BXRestSettings` — общие настройки на всё приложение. Если в одном процессе нужно работать с несколькими порталами, например на сервере, который обслуживает разных клиентов, передайте настройки в конструктор `BXRestNavvy`. У такого клиента настройки свои: все его запросы идут на его портал с его токеном, а `BXRestSettings` на него не влияют.

```typescript
import { BXRestNavvy } from 'bx-rest'
import { firstValueFrom } from 'rxjs'

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

- **Без аргумента** `new BXRestNavvy()` работает с глобальными `BXRestSettings`.
- **Формат** тот же, что у `BXRestSettings.update()`, но настройки передаются целиком: `auth` и `urls` обязательны, с глобальными настройками они не смешиваются.
- **Смена токена у готового клиента.** Функцию `auth.source` библиотека вызывает перед каждым запросом, в момент подписки. Чтобы сменить токен, поменяйте значение, которое она возвращает. Новый токен получат и запросы, созданные раньше, но ещё не запущенные:

  ```typescript
  let token = await getToken()
  const portal = new BXRestNavvy({
    auth: {
      source: () => token,
      key: 'auth',
      refresh: async () => { token = await getNewToken() } // необязательно
    },
    urls: { source: 'string', key: 'https://a.bitrix24.ru', additional_part: 'rest' }
  })

  token = newToken // следующий запрос уйдёт с новым токеном
  ```

- **Другой портал или другие заголовки** — создайте новый клиент, это занимает доли миллисекунды.
- **Продление авторизации** у каждого клиента своё: `auth.refresh` клиента вызывается только для его запросов.
- **`auth.source: 'cookies'` и `'localStorage'`** читают общее хранилище браузера, поэтому два клиента с одним ключом получат один и тот же токен. Для нескольких порталов задавайте `source` функцией.
- **Объекты, созданные напрямую**, — `new Navvy()` и `new BXRestRequest()` — без аргумента работают с глобальными `BXRestSettings`. Им тоже можно передать свои настройки: `new Navvy(settings)`, `new BXRestRequest(settings)`. Очередь `throttle` и продление авторизации у такого объекта свои, даже если у клиента `BXRestNavvy` те же настройки. `new SessionKeyServices()` всегда работает с глобальными.

## HTTP-заголовки

Заголовки, которые нужны в каждом запросе, задайте в `BXRestSettings.headers`:

```typescript
BXRestSettings.update({
  headers: {
    'X-Bitrix-App': 'smart-process-pro'
  }
})
```

Они прикладываются ко всем запросам библиотеки, включая batch-запросы `.resAll()`, и, как и остальные настройки, читаются в момент подписки. `update()` сливает настройки только на верхнем уровне, поэтому `headers` заменяется целиком. Чтобы добавить заголовок к уже заданным, передайте весь набор.

Для одного запроса используйте `.withHeaders()`. Его заголовки добавляются поверх `BXRestSettings.headers`, а при совпадении имени (без учёта регистра) побеждает `.withHeaders()`. Работает с `.res()`, `.resAll()`, `.resVanilla()` и `.mapForVanilla()`:

```typescript
const deals = await firstValueFrom(
  bxRest.crm.deal.list({ select: ['ID', 'TITLE'], filter: {}, start: 0 })
    .withHeaders({ 'X-Request-Source': 'report' })
    .resAll()
)
```

- **`Content-Type`** библиотека всегда ставит сама: `application/json`, а для `auth.key: 'sessid'` — `application/x-www-form-urlencoded`. От него зависит, как сервер разберёт тело запроса, поэтому заголовками он не перебивается.
- **CORS.** Для запросов на другой домен сервер — портал или ваш прокси — должен разрешить нестандартный заголовок в `Access-Control-Allow-Headers` ответа на preflight (`OPTIONS`), иначе браузер заблокирует запрос. Лишнего запроса заголовок не добавляет: JSON-запросы библиотеки и так проходят через preflight из-за `Content-Type: application/json`.

## Повтор, таймаут и очередь запросов

Три необязательные настройки защищают от лимита частоты запросов Bitrix24 и от зависших запросов. Задайте их в `BXRestSettings.update()` для всего приложения или в настройках клиента `new BXRestNavvy(settings)`. `true` включает значения по умолчанию, число или объект задают свои. Пока настройка не задана, она не действует.

```typescript
BXRestSettings.update({
  retryOnQueryLimit: true,      // 3 попытки, пауза от 1000 мс
  timeout: 30_000,              // мс
  throttle: { perSecond: 2 },
})
```

| Настройка | `true` означает | Что делает |
| --- | --- | --- |
| `retryOnQueryLimit` | `{ attempts: 3, delay: 1000 }` | Повторяет запрос, если портал ответил `QUERY_LIMIT_EXCEEDED` (HTTP 503, превышен лимит частоты запросов). `attempts` — сколько всего попыток вместе с первой, `delay` — пауза перед второй попыткой в мс, дальше она растёт вдвое: 1000, 2000, 4000... Другие ошибки не повторяются. Когда попытки кончились, наружу уходит ошибка последней, в `.res()` это `BXRestApiError` с `error: 'QUERY_LIMIT_EXCEEDED'`. |
| `timeout` | `60000` | Предельное время одного HTTP-запроса в мс. Не уложился — запрос отменяется с ошибкой `BXRestTimeoutError` (поле `timeout` — заданное время). В `.res()` она лежит в `cause`, а `.resVanilla()`, `.mapForVanilla()` и `.resAll()` завершаются ей самой. |
| `throttle` | `{ perSecond: 2 }` | Не больше `perSecond` запросов в секунду, остальные ждут своей очереди. 2 запроса в секунду — лимит Bitrix24 на обычных тарифах. |

В объекте можно задать только часть полей: `retryOnQueryLimit: { attempts: 5 }` оставит `delay: 1000`.

- **Порядок:** повтор, очередь, таймаут, [журнал](#журнал-запросов), [свои middleware](#свои-middleware), [транспорт](#транспорт-fetch). Каждая попытка повтора заново встаёт в очередь и получает своё время `timeout`. Ожидание в очереди и паузы перед повтором в `timeout` не входят.
- **Очередь** своя у каждого клиента `new BXRestNavvy(settings)` и общая у всех, кто работает с глобальными `BXRestSettings`. Через неё проходит каждый запрос, в том числе каждый batch-запрос `.resAll()`.
- **`throttle` строже портала.** Bitrix24 пропускает короткие всплески сверх лимита, а `throttle` равномерно распределяет все запросы. Если важна скорость коротких пачек запросов, хватит одного `retryOnQueryLimit`.
- **Отписка** прерывает и ожидание в очереди, и паузу перед повтором: такой запрос уже не уйдёт.
- **Настройки читаются в момент подписки**, как и остальные.
- **Неверное значение** — например, `throttle: { perSecond: 0 }` или отрицательный `timeout` — завершает запрос ошибкой `TypeError` с описанием, на портал ничего не уходит.

### Журнал запросов

`logRequests` — функция, которая получает запись о каждом HTTP-запросе после его завершения. Задаётся так же, глобально или у клиента:

```typescript
BXRestSettings.update({
  logRequests: entry => console.debug(entry.method, entry.url, `${entry.duration} ms`, entry.failed ? entry.error : 'ok'),
})
```

| Поле | Что в нём |
| --- | --- |
| `method` | `'GET'` или `'POST'`. |
| `url` | Полный адрес запроса. |
| `duration` | Время от отправки до ответа или ошибки, мс. |
| `failed` | `true`, если запрос завершился ошибкой: ответ не 2xx, сбой сети, таймаут или отмена. |
| `status` | HTTP-статус ответа с ошибкой. У успешного ответа транспорт статус не сообщает. |
| `error` | Код ошибки Bitrix из тела ответа, например `QUERY_LIMIT_EXCEEDED`, в том числе из ответа 2xx. Если портал кода не прислал — текст ошибки. |

- **Запись на каждый HTTP-запрос:** каждая попытка `retryOnQueryLimit` и каждый batch-запрос `.resAll()` — отдельная запись. Ожидание в очереди `throttle` в `duration` не входит.
- **Адрес — как есть.** Тела запроса в записи нет, но у вебхука секрет лежит в адресе, а у GET-запроса в адресе токен. Если журнал уходит в стороннюю систему, уберите их сами.
- **Исключение из функции** на запрос не влияет.

### Транспорт fetch

По умолчанию запросы отправляет axios. С `transport: 'fetch'` их отправляет глобальный `fetch` браузера или Node 18+:

```typescript
const portal = new BXRestNavvy({ ...settings, transport: 'fetch' })
```

Результат тот же, что с axios, разница только в ошибках транспорта:

- на ответ не 2xx `.resVanilla()` завершается ошибкой `BXRestHttpError` с полем `response: { status, data }`, как у `AxiosError`; в `.res()` она лежит в `cause` у `BXRestApiError`;
- сбой сети приходит ошибкой самого `fetch` (обычно `TypeError`), поля `request`, как у axios, у неё нет.

### Свои middleware

Middleware — функция, через которую проходит каждый запрос перед отправкой: логирование, метрики, подмена заголовков, свой транспорт вместо axios. Задаётся в `middleware`, так же глобально или у клиента:

```typescript
import { BXRestMiddleware, BXRestSettings } from 'bx-rest'

const logDuration: BXRestMiddleware = async (config, next) => {
  const started = Date.now()
  try {
    return await next(config)
  } finally {
    console.debug(config.method, Date.now() - started, 'ms')
  }
}

BXRestSettings.update({ middleware: [logDuration] })
```

- **`config`** — запрос: `method` (`'GET'` или `'POST'`), `url` (у GET вместе с параметрами), `data` (тело POST), `headers`, `withCredentials`, `signal`. `next(config)` отправляет его дальше и возвращает тело ответа.
- **Порядок:** первый в списке — внешний, он первым видит запрос и последним — ответ. Все свои middleware идут после `retryOnQueryLimit`, `throttle`, `timeout` и `logRequests`, поэтому видят каждую попытку повтора. Повтор после `auth.refresh` идёт снаружи всех шагов: при продлении авторизации запрос пройдёт через них ещё раз.
- **Изменить запрос** — передать дальше новый объект: `next({ ...config, headers: { ...config.headers, 'X-Trace': id } })`.
- **Свой транспорт** — middleware, который не зовёт `next`: он сам отправляет запрос и возвращает тело ответа. На ответ не 2xx он должен отклонить промис ошибкой с полем `response: { status, data }`, как это делает axios. По этому полю библиотека узнаёт ошибки Bitrix (`BXRestApiError`) и ошибки авторизации (`auth.refresh`).
- **`config.signal`** передавайте в свой транспорт: по нему запрос отменяется при отписке и по `timeout`.
- **`config.url` и `config.data`** содержат токен и секрет вебхука — не логируйте их как есть.

## Работа в iframe без BX24.js

`BXRestFrame` отправляет порталу команды из iframe приложения: размер фрейма, диалоги выбора, слайдеры, мессенджер, встраивания, настройки, установка. Команды и имена те же, что у BX24.js, но вместо колбэков — промисы, и BX24.js подключать не нужно. REST-запросы делает сама bx-rest, токен для них дают `getAuth()` и `refreshAuth()` (см. [Продление авторизации](#продление-авторизации)).

```typescript
import { BXRestFrame } from 'bx-rest'

const frame = new BXRestFrame()

const { lang, isAdmin, placement } = await frame.init()
await frame.fitWindow()
const user = await frame.selectUser()
const unsubscribe = frame.placement.bindEvent('Tab:onChange', data => console.log(data))
```

Создавайте один экземпляр на страницу, при старте приложения. Параметры портала читаются в конструкторе, а признак первого запуска портал сообщает только в первом ответе после загрузки страницы. По той же причине не используйте `BXRestFrame` и BX24.js на одной странице.

| BX24.js | `BXRestFrame` | Ответ |
| --- | --- | --- |
| `BX24.init()`, `isAdmin()`, `getLang()`, `getDomain()` | `init()` — `{ domain, lang, path, https, memberId, isAdmin, install, firstRun, placement, placementOptions, userOptions, appOptions }` | Запрашивается один раз, без токенов |
| `BX24.getAuth()`, `BX24.refreshAuth()` | `getAuth()`, `refreshAuth()` | Каждый раз у портала |
| `BX24.installFinish()` | `installFinish()` | Только на странице установщика (`install`); портал перезагружает страницу |
| конец цепочки `BX24.install()` | `firstRunFinish()` | Отмечает, что первый запуск пройден; без него `firstRun` останется `true` |
| `BX24.resizeWindow(w, h)`, `BX24.fitWindow()` | `resizeWindow(w, h)`, `fitWindow()` | `{ width, height }` или `undefined` |
| `BX24.setTitle(title)` | `setTitle(title)` | `{ title }` или `undefined` |
| `BX24.scrollParentWindow(scroll)` | `scrollParentWindow(scroll)` | `{ scroll }` или `undefined` |
| `BX24.reloadWindow()` | `reloadWindow()` | Без ответа |
| `BX24.selectUser()`, `BX24.selectUsers()` | `selectUser({ title?, signal? })`, `selectUsers(...)` | Сотрудник / массив сотрудников |
| `BX24.selectAccess(value)` | `selectAccess({ value?, signal? })` — `value`: коды, которые нельзя выбрать | Массив `{ provider, id, name }` |
| `BX24.selectCRM(params)` | `selectCRM({ entityType?, multiple?, value?, signal? })` | Объекты CRM по типам |
| `BX24.openApplication(params, cb, settings)` | `openApplication(params?, settings?, { signal? })` | Когда слайдер закрыли |
| `BX24.openPath(path)` | `openPath(path, { signal? })` | `{ result: 'close' }` или `{ result: 'error', errorCode }` |
| `BX24.closeApplication()` | `closeApplication()` | Без ответа |
| `BX24.im.callTo/phoneTo/openMessenger/openHistory` | `im.callTo/phoneTo/openMessenger/openHistory` | Без ответа |
| `BX24.placement.info()` | `placement.info()` | `{ placement, options }` из `init()` |
| `BX24.placement.getInterface()` | `placement.getInterface()` | `{ command, event }` |
| `BX24.placement.call(cmd, params)` | `placement.call(cmd, params?, { timeout? })` | Ответ команды или `undefined` |
| `BX24.placement.bindEvent(event, cb)` | `placement.bindEvent(event, handler)` | `handler` на каждое событие; возвращает функцию отписки |
| `BX24.userOption.get/set` | `userOption.get/set` | Настройка пользователя |
| `BX24.appOption.get/set` | `appOption.get/set` | `set` — только администратору, иначе `ACCESS_DENIED` |

Когда завершается промис, зависит от того, как портал отвечает на команду:

- **С ответом** (`init()`, `getAuth()`, `refreshAuth()`, `placement.getInterface()`, `appOption.set()`). Нет ответа за `timeout` (по умолчанию 10 секунд) — ошибка `TIMEOUT`.
- **С подтверждением** (`resizeWindow()`, `fitWindow()`, `setTitle()`, `scrollParentWindow()`, `userOption.set()`, `firstRunFinish()`, `placement.call()`). В некоторых встраиваниях портал на них не отвечает, поэтому без ответа за `timeout` промис завершается с `undefined`, а не ошибкой.
- **Без ответа** (`reloadWindow()`, `closeApplication()`, `installFinish()`, `im.*`). Промис завершается сразу после отправки.
- **Ждут пользователя** (`select*()`, `openApplication()`, `openPath()`), без ограничения по времени. Если пользователь закрыл диалог, ничего не выбрав, портал не отвечает вовсе. Отменить ожидание можно через `signal` (`AbortController`). Повторный вызов того же диалога тоже отменяет прошлый: портал держит один обработчик на диалог. Отменённое ожидание — ошибка `CANCELLED`.

Ещё:

- **Отписка от `placement.bindEvent()`** только перестаёт вызывать `handler`: отменить подписку на стороне портала протокол не позволяет.
- **Где ищет портал.** Как BX24.js — в `window.name`: портал называет iframe приложения `DOMAIN|PROTOCOL|APP_SID`. Если там пусто — в параметрах адреса страницы (`?DOMAIN=…&PROTOCOL=…&APP_SID=…`), с которыми портал открывает обработчик приложения.
- **Безопасность.** Команды уходят только на origin портала (не `'*'`), ответы принимаются только от `window.parent` и только с origin портала.
- **Ошибки** — `BXRestFrameError` с полем `code`: `NOT_IN_FRAME` (страница открыта не в iframe приложения, ошибка сразу), `TIMEOUT`, `NO_AUTH`, `BAD_RESPONSE`, `CANCELLED`, `ACCESS_DENIED`. Неверные аргументы `resizeWindow()` и `scrollParentWindow()` — `TypeError`.

> **Протокол внутренний и недокументированный.** Обмен сообщениями между приложением и порталом Bitrix24 не описан в документации и может измениться без предупреждения. `BXRestFrame` проверен на поддельном портале в тестах, но не на живом портале.

<details>
<summary>По каким источникам сделан BXRestFrame</summary>

`BXRestFrame` повторяет BX24.js — `https://api.bitrix24.com/api/v1/`, скачан 2026-10-29, `Last-Modified: 2022-03-17`, SHA-256 `945ad491df8ffb7490b89f4914a439b5a3f575c950c3480562815716a3e07f23`. Он сверен с ответной стороной портала, `/bitrix/js/rest/applayout.js` (`Last-Modified: 2024-05-15`, SHA-256 `3efd6ab57a4778493a26d10ae0987a82e19fc012ed9935f5c6afa78c4052fcb5`), и с документацией BX24.js.

</details>

## Кастомные REST-методы

Свои методы вызываются через `Navvy`, он экспортируется из `bx-rest`. В Angular зарегистрируйте `NavvyProvider` из раздела [Использование в Angular](#использование-в-angular) и внедрите `Navvy` в свой сервис. Имя метода задаётся массивом частей, перед отправкой они соединяются точками.

Как зарегистрировать свой REST-метод на портале, описано в [документации Bitrix24](https://dev.1c-bitrix.ru/learning/course/index.php?COURSE_ID=99&LESSON_ID=7985).

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

`simple()` подходит, когда метод отдаёт один ответ без страниц:

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

У результата есть `.res()`, `.resVanilla()` и `.mapForVanilla()`.

### Пагинированный кастомный метод с `pagNav()`

`pagNav()` подходит, когда ответ Bitrix — массив со стандартными полями пагинации `start`, `next` и `total`. Тип параметра должен поддерживать `start?: number`.

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

У результата есть ещё и `.resAll()`, который загружает и объединяет все страницы.

Если `result` метода — объект со списком под ключом, например `{ items: [...] }`, используйте `pagNavKeyed()`, его третий аргумент — ключ списка. `.res()` отдаёт объект как есть, `.resAll()` — такой же объект с записями всех страниц под ключом:

```typescript
type BlogItems = { items?: iBXRestCustomBlogGetHttp[] }

this.navvy.pagNavKeyed<BlogItems, BlogItems, iBXRestCustomParamBlogList>(
  ['blog', 'item', PNM.$list],
  param,
  'items'
)
```

Если метод листается по смещению и отдаёт `total`, используйте `pagNavOffset()`. Его третий аргумент — имена параметров и размер страницы, остальные страницы `.resAll()` запросит пакетами:

```typescript
this.navvy.pagNavOffset<iBXRestCustomBlogGetHttp[], iBXRestCustomBlogGet[], { OFFSET?: number, LIMIT?: number }>(
  ['blog', 'post', PNM.$list],
  param,
  { offset: 'OFFSET', limit: 'LIMIT', pageSize: 50, maxPageSize: 200 },
  BXCustomBlogMap.get
)
```

Если следующая страница видна только из ответа на предыдущую (по флагу, курсору или неполной странице), используйте `pagNavSequential()`, а для REST v3 — `pagNavSequentialV3()`. Третий аргумент описывает обход: `next()` по параметрам и результату страницы возвращает параметры следующей или `undefined`, если страница последняя:

```typescript
type BlogFeed = { items: iBXRestCustomBlogGetHttp[], nextCursor: string | null }

this.navvy.pagNavSequential<BlogFeed, BlogFeed, { cursor?: string }>(
  ['blog', 'feed', PNM.$list],
  param,
  {
    next: (param, result) => (result.nextCursor ? { ...param, cursor: result.nextCursor } : undefined),
    keys: ['items'],
  }
)
```

- `keys` — ключи списков, если `result` — объект. Записи под ними собираются со всех страниц, остальные поля берутся с последней.
- `first()` — параметры первой страницы, например явный размер страницы.
- `unique` — поле записи, по которому убираются повторы, если страницы перекрываются.

Типы этих настроек — `BXRestOffsetNav` и `BXRestSequentialNav`.

## Специфичные методы

### `tasks.task.list`

Первый generic-аргумент выбирает встроенные поля задачи, второй добавляет пользовательские поля вашего портала:

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

### Push & Pull

Раздел `pull` отдаёт настройки подключения к серверу Push & Pull и отправляет события приложения. Клиента веб-сокета в библиотеке нет: подключайтесь своим клиентом по [описанию протокола](https://apidocs.bitrix24.com/settings/interactivity/custom-push-and-pull-client.html) или клиентом `PullClient` из [b24jssdk](https://github.com/bitrix24/b24jssdk).

```typescript
import { firstValueFrom } from 'rxjs'
import { BXRestNavvy } from 'bx-rest'

const bxRest = new BXRestNavvy()

// Адреса сервера и каналы для подключения клиента
const config = await firstValueFrom(bxRest.pull.application.config.get().res())
console.log(config?.server.websocket_secure, config?.channels.private.id, config?.exp)

// Событие в общий канал приложения: его получат все подписанные клиенты
await firstValueFrom(bxRest.pull.application.event.add({
  COMMAND: 'grid:update',
  PARAMS: { grid_id: 15 },
}).res())
```

| Метод | Что делает |
| --- | --- |
| `pull.application.config.get(param?)` | Настройки подключения для приложения: адреса сервера, каналы `shared` и `private`, публичные каналы, `exp`, при нужной версии сервера — `clientId` или `jwt`. Даты каналов — `Date`. |
| `pull.application.event.add(param)` | Событие в канал приложения: без `USER_ID` — в общий канал `shared`, с ним — в личные каналы пользователей. |
| `pull.application.push.add(param)` | Push-уведомление в мобильное приложение Bitrix24. Только для администратора портала. |
| `pull.config.get(param?)` | Настройки подключения для пользователя. Метода нет в документации Bitrix24, поэтому он помечен `@experimental`. |
| `pull.channel.public.get()` | Публичный канал Push & Pull. |

- **Методы `pull.application.*`** работают только в контексте приложения, с его OAuth-токеном. Через вебхук портал отвечает `WRONG_AUTH_TYPE`.
- **`true` в ответе** `event.add` и `push.add` значит «принято к отправке», а не «доставлено».
- **`USER_ID` у не администратора.** Отправить событие можно только себе, и `USER_ID` при этом — строка: `'577'`. Число или массив портал отклонит с ошибкой `USER_ID_ACCESS_ERROR`.
- **Настройки личные:** канал `private` принадлежит пользователю, с чьим токеном идёт запрос. Запрашивайте их заново, когда истекут `exp` или `end` каналов.

## Парсинг дат

Некоторые методы (`calendar.section.get`, `calendar.event.get`, `crm.calllist.*`) отдают даты строкой в формате из настроек портала (Настройки → формат даты и времени), а не в ISO. Заранее этот формат неизвестен. Если вы его знаете, передайте его последним аргументом `dateTimeFormat`:

```typescript
import { BXRestNavvy } from 'bx-rest'

const bxRest = new BXRestNavvy()

// Формат даты и времени конкретного портала, например из Настройки → формат даты и времени.
const dateTimeFormat = 'yyyy-MM-dd HH:mm:ss'

bxRest.calendar.event.get({ FROM: '01.01.2026', TO: '31.01.2026' }, dateTimeFormat).res()
bxRest.calendar.section.get({}, dateTimeFormat).res()
bxRest.crm.callList.get({ ID: 1 }, dateTimeFormat).res()
```

Формат полей только с датой (`EXDATE` и `RRULE.UNTIL` у `calendar.event`) библиотека получает из `dateTimeFormat`, отбросив `HH:mm:ss`: порядок дня, месяца и года на портале один и тот же.

Мапперы разбирают строку функцией `BXBaseServices.toDate()`, пробуя по очереди:

1. **Заданный формат:** `dateTimeFormat` или формат маппера по умолчанию. Понимает `yyyy`, `MM`, `dd`, `HH`, `mm`, `ss` и их однобуквенные варианты, разделители берёт из строки формата.
2. **Распространённые форматы Bitrix24:** `'dd.MM.yyyy HH:mm:ss'`, `'yyyy-MM-dd HH:mm:ss'`, `'dd.MM.yyyy'`, `'yyyy-MM-dd'`.
3. **Разбор по положению.** Год — четыре цифры в начале или в конце даты, месяц — всегда средняя часть, разделитель любой (`.`, `-`, `/`, пробел). Значения проверяются по диапазонам: месяц 1–12, день 1–31, часы, минуты и секунды. Несуществующая дата вроде 31 февраля не переносится молча на март, а считается ошибкой.

Американский порядок `MM/dd/yyyy` шаг 3 разбирает неверно: если день не больше 12, день и месяц молча поменяются местами, а если больше — строка не разберётся. Для порталов с таким форматом передавайте `dateTimeFormat`.

## SessionKeyServices

`SessionKeyServices` показывает, какие токен и адрес библиотека возьмёт из глобальных `BXRestSettings`. Пригодится, чтобы проверить авторизацию до запросов:

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

## Демо

Демо выложены на GitHub Pages: [стартовая страница](https://aricatofuka.github.io/bx-rest/), [Vue](https://aricatofuka.github.io/bx-rest/vue/), [React](https://aricatofuka.github.io/bx-rest/react/), [Angular](https://aricatofuka.github.io/bx-rest/angular/). Они собраны из последнего выпуска.

В каждом демо есть форма подключения со всеми вариантами из раздела [Аутентификация и OAuth2](#аутентификация-и-oauth2), редактор Monaco с подсказками по типам `bx-rest` и панель, которая выполняет ваш код на портале. Язык интерфейса — русский или английский, по языку браузера.

- **Подключайте тестовый портал** через вебхук или access-токен: подключение вместе с токеном сохраняется в `localStorage` браузера.
- **Установить демо в портал как приложение нельзя:** Bitrix24 открывает приложение POST-запросом, а GitHub Pages его не принимает.

Исходники лежат в [`projects/`](https://github.com/Aricatofuka/bx-rest/tree/main/projects): `demo-angular`, `demo-vue` и `demo-react`, общая часть — в `demo-shared`. Демо отличаются способом подключения клиента, как в разделах про Angular, Vue и React выше. Чтобы запустить их локально, выполните в корне репозитория:

```shell
npm run demo:bootstrap
```

Дальше в папке нужного демо: `npm run dev`, для Angular — `npm start`. Подробности — в README каждого демо.

`projects/demo-node` — демо для Node.js без интерфейса. Показывает два портала в одном процессе, `retryOnQueryLimit`, `throttle`, `timeout`, свой `middleware` для логирования и обработку `BXRestApiError`. `npm run mock` запускает его со встроенной заглушкой портала, `npm start` — с настоящим порталом по адресу входящего вебхука из `BX_WEBHOOK_A`. На портале демо только читает данные.

## Планы на будущее

- Автоматическое получение токена авторизации

Есть предложение по функциональности или нашли баг? Посмотрите [существующие issues](https://github.com/Aricatofuka/bx-rest/issues) или создайте новый.

## Лицензия

[MIT](https://github.com/Aricatofuka/bx-rest/blob/main/LICENSE) © Aricatofuka
